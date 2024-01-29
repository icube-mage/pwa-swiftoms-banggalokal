import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { sendDataLayer } from '@helper_gtm';
import Layout from '@layout';
import BackdropLoad from '@helper_backdropload';

import themeService from '@modules/theme/services/graphql';
import gqlService from '../../services/graphql';

const ContentWrapper = (props) => {
    const {
        Content,
        t,
    } = props;
    const router = useRouter();

    const [getSellerInventoryStockList, { data, loading }] = gqlService.getSellerInventoryStockList();
    const [retrySyncStockToChannel] = gqlService.retrySyncStockToChannel();
    const [syncStockToChannel] = gqlService.syncStockToChannel();
    const [getSellerInventoryStockFailedCount, { data: dataFailed, loading: loadingFailed }] = gqlService.getSellerInventoryStockFailedCount();
    const [getSellerStores, { data: dataLoc, loading: loadingLoc }] = gqlService.getSellerStores();
    const { data: getSellerChannelList, refetch: updateChannelList } = gqlService.getSellerChannelList({
        filter: {
            framework: { eq: 'Marketplace' },
            status: { eq: '1' },
        },
    });
    const [saveChannelStockConfig] = gqlService.saveChannelStockConfig();
    const [syncAllStockToChannel] = gqlService.syncAllStockToChannel();

    const [doRefetch, setDoRefetch] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [searchLoc, setSearchLoc] = useState('');
    const [openSyncModal, setOpenSyncModal] = useState(false);

    const handleRetry = (sku, channel_code) => {
        window.backdropLoader(true);
        retrySyncStockToChannel({
            variables: { sku, channel_code },
        })
            .then((res) => {
                window.backdropLoader(false);
                const { status, message } = res.data?.retrySyncStockToChannel;
                if (status) {
                    window.toastMessage({
                        open: true,
                        text: message,
                        variant: status,
                    });
                    setTimeout(() => setDoRefetch(true), 250);
                } else {
                    throw new Error(t('sellerstock:Something_went_wrong_when_try_to_sync_stock'));
                }
            })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
    };

    const formikEdit = useFormik({
        initialValues: {
            entity_id: null,
            name: null,
            sku: null,
            vendor_sku: null,
            images: null,
            qty_total: null,
            qty_buffer: null,
            sync_stock: null,
            channels: [],
            produk_diff: 0,
        },
        validationSchema: Yup.object().shape({
            sync_stock: Yup.boolean(),
            qty_total: Yup.number()
                .integer(t('sellerstock:Value_must_be_an_integer'))
                .min(0, t('sellerstock:Minimum_value_is_min', { min: 0 }))
                .max(99999, t('sellerstock:Maximum_value_is_max', { max: 99999 }))
                .typeError(t('sellerstock:Value_must_be_a_number'))
                .required(t('sellerstock:This_is_a_Required_field')),
            qty_buffer: Yup.number()
                .integer(t('sellerstock:Value_must_be_an_integer'))
                .min(0, t('sellerstock:Minimum_value_is_min', { min: 0 }))
                .max(99999, t('sellerstock:Maximum_value_is_max', { max: 99999 }))
                .typeError(t('sellerstock:Value_must_be_a_number'))
                .required(t('sellerstock:This_is_a_Required_field')),
            produk_diff: Yup.number().min(0),
        }),
        onSubmit: (values, { resetForm, setStatus, setSubmitting }) => {
            const {
                qty_total, qty_buffer, channels, sync, loc_id,
            } = values;

            const totalChannelsStock = channels.reduce((acc, cV) => acc + Number(cV.qty), 0);
            if (!sync && (Number(qty_total) - Number(qty_buffer) - totalChannelsStock) < 0) {
                setStatus({
                    error: t('sellerstock:The_Warehouse_Stock_of_a_product_must_be_equal_to_or_greater_than_the_total_stock_in_all_MPchannels'),
                });
                return setSubmitting(false);
            }

            if (channels.some((channel) => Number(channel.qty) >= 100000)) {
                setStatus({
                    error: t('sellerstock:Maximum_value_is_max', { max: 99999 }),
                });
                return setSubmitting(false);
            }

            setStatus({ error: '' });
            const input = [{
                channels: channels?.map((channel) => ({
                    channel_code: channel.channel_code,
                    qty: sync ? 0 : Number(channel.qty || 0),
                })),
                qty_buffer: Number(values.qty_buffer || 0),
                qty_total: (Number(values.qty_total || 0) + Number(values.qty_buffer || 0)),
                sku: values.sku,
                sync,
                loc_id,
            }];

            setOpenEdit(false);
            window.backdropLoader(true);

            const dataLayer = {
                event: 'single_update_stock',
                eventLabel: 'Stock - Single Update',
            };
            sendDataLayer(dataLayer);

            return syncStockToChannel({
                variables: { input },
            })
                .then((res) => {
                    window.backdropLoader(false);
                    const { status, message } = res.data?.syncStockToChannel;
                    if (status) {
                        window.toastMessage({
                            open: true,
                            text: message,
                            variant: status,
                        });
                        resetForm();
                        setTimeout(() => setDoRefetch(true), 250);
                    } else {
                        throw new Error(t('sellerstock:Something_went_wrong_when_try_to_sync_stock'));
                    }
                })
                .catch((e) => {
                    window.backdropLoader(false);
                    setOpenEdit(true);
                    window.toastMessage({
                        open: true,
                        text: e.message,
                        variant: 'error',
                    });
                });
        },
    });

    const contentProps = {
        ...props,
        getSellerInventoryStockList,
        data,
        loading,
        handleRetry,
        doRefetch,
        setDoRefetch,
        formikEdit,
        openEdit,
        setOpenEdit,
        dataFailed,
        loadingFailed,
        dataLocations: dataLoc?.getSellerStores?.items || [],
        loadingLoc,
        searchLoc,
        setSearchLoc,
        openSyncModal,
        setOpenSyncModal,
        getSellerChannelList,
        updateChannelList,
        saveChannelStockConfig,
        syncAllStockToChannel,
    };

    useEffect(() => getSellerInventoryStockFailedCount({
        variables: {
            pageSize: 1000,
            currentPage: 1,
            filter: { sync_stock_status: { eq: 'failed' } },
        },
    }), [router]);

    useEffect(() => getSellerStores({
        variables: {
            pageSize: 10,
            currentPage: 1,
        },
    }), []);

    useEffect(() => getSellerStores({
        variables: {
            pageSize: 10,
            currentPage: 1,
            search: searchLoc,
        },
    }), [searchLoc]);

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const pageConfig = {
        title: t('sellerstock:Stock'),
    };

    const { loading: aclCheckLoading, data: aclCheckData } = themeService.isAccessAllowed({
        acl_code: 'seller_stock',
    });

    const { data: dataLocDefault, loading: loadLocDefault } = gqlService.getSellerStoresDefault({
        pageSize: 1000,
        currentPage: 1,
        filter: { is_default: { eq: '1' } },
    });

    useEffect(() => {
        BackdropLoad(aclCheckLoading || loadLocDefault);
    }, [aclCheckLoading, loadLocDefault]);

    if (aclCheckLoading || loadLocDefault) {
        return <Layout pageConfig={pageConfig} seller />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/seller/dashboard');
        return <Layout pageConfig={pageConfig} seller />;
    }

    return (
        <Layout pageConfig={pageConfig} seller>
            <ContentWrapper
                {...props}
                dataLocDefault={dataLocDefault?.getSellerStores?.items?.[0] || {}}
            />
        </Layout>
    );
};

export default Core;
