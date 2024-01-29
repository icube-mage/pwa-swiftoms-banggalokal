import { useState, useEffect } from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';

import BackdropLoad from '@helper_backdropload';
import { sendDataLayer } from '@helper_gtm';

import ErrorRedirect from '@common_errorredirect';
import themeService from '@modules/theme/services/graphql';
import gqlService from '@sellermodules/storelist/services/graphql';

const generateLocationMapping = (data, dataWh) => {
    const res = [];
    if (data.length) {
        // function 1 : find getSellerChannelList thath have marketplace_warehouse_id
        data.forEach((dt) => {
            let marketplace_warehouse_id = null;
            let is_not_found = false;
            if (dt?.marketplace_wh?.marketplace_warehouse_id) {
                const warehouse_id = dataWh.find(({ id }) => Number(id) === Number(dt?.marketplace_wh?.marketplace_warehouse_id))?.id;
                if (warehouse_id) {
                    marketplace_warehouse_id = warehouse_id;
                } else {
                    is_not_found = true;
                }
                return res.push({
                    loc_id: dt.loc_id,
                    marketplace_warehouse_id,
                    is_not_found,
                });
            }
            return 0;
        });
    }

    // mapping warehouse which is not already mapped from function 1
    if (dataWh?.length && res.length < dataWh.length) {
        const alreadyMappingWh = res.map(({ marketplace_warehouse_id }) => marketplace_warehouse_id);
        dataWh.filter(({ id }) => !alreadyMappingWh.includes(id)).map(({ id }) => res.push({
            loc_id: !res.length ? data?.[0]?.loc_id || null : null,
            marketplace_warehouse_id: id,
        }));
    }

    // if data still not exist mapping data with default location and warehouse in empty
    if (!res.length) {
        data.forEach((dt) => {
            let marketplace_warehouse_id = null;
            let is_not_found = false;
            if (dt?.marketplace_wh?.marketplace_warehouse_id) {
                const warehouse_id = dataWh.find(({ id }) => Number(id) === Number(dt?.marketplace_wh?.marketplace_warehouse_id))?.id;
                if (warehouse_id) {
                    marketplace_warehouse_id = warehouse_id;
                } else {
                    is_not_found = true;
                }
            }
            return res.push({
                loc_id: dt.loc_id,
                marketplace_warehouse_id,
                is_not_found,
            });
        });
    }
    return res;
};

const ContentWrapper = (props) => {
    const {
        Content, t, data, dataWarehouse,
    } = props;
    const router = useRouter();

    const item = data?.getSellerChannelList?.items?.[0] || {};
    const isMultiWarehouse = item?.marketplace?.is_multiwarehouse ?? false;

    const [error, setError] = useState(false);
    const [locList, setLocList] = useState(generateLocationMapping(item.locations, dataWarehouse));

    const [saveSellerChannel] = gqlService.saveSellerChannel();

    const handleSubmit = () => {
        const dataLayer = {
            event: 'manage_store_location',
            eventLabel: 'Sales Channel - Manage Store Location',
            event_data: {
                channel_code: router.query.code,
            },
        };
        sendDataLayer(dataLayer);

        if (locList.some(({ loc_id }) => !loc_id)) {
            return setError(true);
        }

        const locations = locList.map(({ loc_id, marketplace_warehouse_id }) => ({
            loc_id: loc_id ? Number(loc_id) : null,
            ...(isMultiWarehouse && { marketplace_warehouse_id }),
        }));

        window.backdropLoader(true);
        return saveSellerChannel({
            variables: {
                id: Number(router.query.id),
                input: { locations },
            },
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('sellerstorelist:The_channel_location_has_been_successfully_updated'),
                variant: 'success',
            });
            router.push('/seller/saleschannels/storelist');
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const contentProps = {
        ...props,
        handleSubmit,
        locList,
        setLocList,
        error,
        setError,
        isMultiWarehouse,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const pageConfig = {
        title: t('sellerstorelist:Sales_Channels'),
        backUrl: '/seller/saleschannels/storelist',
        noPaddingContainer: true,
    };
    const { loading: aclCheckLoading, data: aclCheckData } = themeService.isAccessAllowed({
        acl_code: 'seller_sales_channel_list',
    });

    const { loading, data, error } = gqlService.getSellerChannelListQuery({
        variables: { pageSize: 1, currentPage: 1, filter: { channel_id: { eq: router.query.id } } },
    });

    const { data: dataWh, loading: loadingWh } = gqlService.getMarketplaceWarehouse({
        variables: { channel_code: router.query.code },
    });

    const { data: dataLoc, loading: loadingLoc } = gqlService.getSellerStoresQuery({
        variables: {
            pageSize: 1000,
            currentPage: 1,
        },
    });

    useEffect(() => {
        BackdropLoad(aclCheckLoading || loading || loadingWh || loadingLoc);
    }, [aclCheckLoading, loading, loadingWh, loadingLoc]);

    if (aclCheckLoading || loading || loadingWh || loadingLoc) {
        return <Layout pageConfig={pageConfig} seller hideMobileMenu />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/seller/saleschannel/storelist');
        return <Layout pageConfig={pageConfig} seller hideMobileMenu />;
    }

    if (!data || !router.query.id) {
        const errMsg = error?.message ?? t('sellerstoreintegration:Data_not_found');
        const redirect = '/seller/saleschannels/storelist';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} isSeller hideMobileMenu />;
    }

    const contentProps = {
        ...props,
        data,
        loading,
        dataWarehouse: dataWh?.getMarketplaceWarehouse || [],
        dataLoc: dataLoc?.getSellerStores?.items || [],
    };

    return (
        <Layout pageConfig={pageConfig} seller hideMobileMenu>
            <ContentWrapper {...contentProps} />
        </Layout>
    );
};

export default Core;
