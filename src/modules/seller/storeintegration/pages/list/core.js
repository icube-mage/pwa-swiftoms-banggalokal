import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

import ErrorRedirect from '@common_errorredirect';

import BackdropLoad from '@helper_backdropload';
import { getHost } from '@helper_config';
import { sendDataLayer } from '@helper_gtm';

import Layout from '@layout';
import themeService from '@modules/theme/services/graphql';
import gqlService from '@sellermodules/storeintegration/services/graphql';
import channelService from '@sellermodules/storelist/services/graphql';
import { setLocalStorage } from '@helper_localstorage';

const ContentWrapper = (props) => {
    const {
        Content, t,
    } = props;
    const router = useRouter();
    const url_referrer = router?.query?.url_referrer;
    const [connectSellerMp, connectSellerMpRes] = gqlService.connectSellerMp();
    const [getSellerChannelList, { data: dataChannel, loading: loadingChannel }] = channelService.getSellerChannelList();

    const [selectStoreModal, setSelectStoreModal] = React.useState(false);

    const loadParentChannel = async (marketplaceCode) => {
        setSelectStoreModal(true);
        await getSellerChannelList({
            variables: {
                filter: { channel_code: { like: marketplaceCode }, status: { eq: '1' } },
                pageSize: 100,
                currentPage: 1,
            },
        });
    };

    const [getSellerMpCredentials] = gqlService.getSellerMpCredentials({
        onCompleted: (res) => {
            const credType = res.getSellerMpCredentials.marketplaces[0]?.credentials.type;
            if (credType === 'oauth2') {
                window.backdropLoader(false);
                Cookies.set('marketplace_register_seller_brand_id', JSON.stringify(res.getSellerMpCredentials?.brand_id));
                router.push(res.getSellerMpCredentials.marketplaces[0]?.credentials.url);
            } else if (credType === 'secret_key') {
                router.push(`/seller/saleschannels/storeintegration/integrate/${res.getSellerMpCredentials.marketplaces[0]?.marketplace_code}`);
            }
        },
        onError: (e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        },
    });

    const [registerBrandMp] = gqlService.registerBrandMp();
    const [modal, setModal] = React.useState(false);
    const [urlEditMode, setUrlEditMode] = React.useState(false);
    const [creationStatus, setCreationStatus] = React.useState(null);
    const [selectedWebstore, setSelectedWebstore] = React.useState({});

    const features = [
        'Order Management',
        'Stock Management',
        'Create Product',
        'Update Price',
        'Update Description',
        'Promo/Slash Price',
    ];

    const { data: getWebstores } = gqlService.getWebstoreList();

    const getWebstoreList = getWebstores?.getWebstoreList?.map((webData) => webData.is_active === true && ({
        ...webData,
        features,
        marketplace_code: webData.webstore_code,
        marketplace_name: webData.webstore_name,
        marketplace_type: 'WEBSTORE',
    })).filter((e) => e !== false) || null;

    // eslint-disable-next-line consistent-return
    const handleIntegrate = async (marketplace_code = null, selectBrand = false) => {
        const [searchWebtoreItem] = getWebstoreList.filter((item) => marketplace_code === item.marketplace_code);

        if (marketplace_code && searchWebtoreItem?.marketplace_type !== 'WEBSTORE') {
            const isConnectChat = marketplace_code.toLowerCase().includes('-chat');
            if (isConnectChat && selectStoreModal === false) {
                loadParentChannel(marketplace_code?.toUpperCase()?.replace('-CHAT', ''));
                return false;
            }

            setSelectStoreModal(false);
            window.backdropLoader(true);
            const registerBrand = selectBrand === false ? await registerBrandMp({ variables: { marketplace_code } }) : selectBrand;

            Cookies.set('mp_integration_brand', JSON.stringify({
                brand_id: registerBrand?.data?.registerBrandMp || registerBrand,
                mp_code: marketplace_code?.toUpperCase(),
            }));

            await getSellerMpCredentials({
                variables: {
                    marketplace_code,
                    callback_url: `${getHost()}${router.asPath}?`,
                    brand_id: registerBrand?.data?.registerBrandMp || registerBrand,
                },
            });
        } else if (marketplace_code && searchWebtoreItem?.marketplace_type === 'WEBSTORE') {
            setSelectedWebstore(searchWebtoreItem);
            setModal(true);
            setUrlEditMode(false);
            setCreationStatus(null);
        }
    };

    useEffect(() => {
        if (url_referrer) {
            setLocalStorage('url_referrer', url_referrer);
        }

        if (typeof window !== 'undefined') {
            window.backdropLoader(true);
            const urlParams = router.query;
            const brand_id = Cookies.getJSON('marketplace_register_seller_brand_id');
            if (urlParams.status) {
                const credentials = { type: { data_type: 'string', value: 'oauth2' } };
                if (urlParams && urlParams.status === 'success' && urlParams.mpcode && brand_id) {
                    connectSellerMp({
                        variables: {
                            input: {
                                brand_id,
                                marketplace_code: urlParams.mpcode,
                                credentials: JSON.stringify(credentials),
                            },
                        },
                    }).then((res) => {
                        Cookies.remove('marketplace_register_seller_brand_id');
                        if (res?.data?.connectSellerMp) {
                            const dataLayer = {
                                event: 'store_integration',
                                eventLabel: 'Sales Channel - Store Integration',
                                event_data: {
                                    marketplace_code: urlParams.mpcode,
                                },
                            };
                            sendDataLayer(dataLayer);

                            window.toastMessage({
                                open: true,
                                text: t('sellerstoreintegration:The_store_has_been_successfully_integrated'),
                                variant: 'success',
                            });
                            router.push(url_referrer || '/seller/saleschannels/storelist');
                        } else {
                            throw new Error(t('sellerstoreintegration:Something_went_wrong_when_try_to_integrate_the_store'));
                        }
                    }).catch((e) => {
                        Cookies.remove('marketplace_register_seller_brand_id');
                        window.backdropLoader(false);
                        window.toastMessage({
                            open: true,
                            text: e.message,
                            variant: 'error',
                        });
                        router.push('/seller/saleschannels/storeintegration');
                    });
                } else {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: t('sellerstoreintegration:Something_went_wrong_when_try_to_integrate_the_store'),
                        variant: 'error',
                    });
                    router.push('/seller/saleschannels/storeintegration');
                }
            } else {
                window.backdropLoader(false);
            }
        }
    }, []);

    useEffect(() => {
        BackdropLoad(connectSellerMpRes.loading);
    }, [connectSellerMpRes.loading]);

    const brandId = Cookies.getJSON('mp_reintegration_brand') || '';

    const contentProps = {
        ...props,
        handleIntegrate,
        getWebstoreList,
        chatModal: {
            open: selectStoreModal,
            setOpen: setSelectStoreModal,
            loading: loadingChannel,
            channels: dataChannel?.getSellerChannelList?.items?.filter((e) => e.marketplace_chat_status === 0) || [],
        },
        webstoreInput: {
            urlEditMode,
            setUrlEditMode,
            creationStatus,
            setCreationStatus,
            selectedWebstore,
            setSelectedWebstore,
            modal,
            setModal,
            currentStore: router?.query?.mp_code?.toLowerCase() === 'shopify' && brandId?.brand_id ? brandId.brand_id : false,
        },
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const pageConfig = {
        title: t('sellerstoreintegration:Sales_Channels'),
    };

    const { loading: aclCheckLoading, data: aclCheckData } = themeService.isAccessAllowed({
        acl_code: 'seller_sales_channel_integration',
    });

    const { loading: aclChatLoading, data: aclChatData } = themeService.isAccessAllowed({
        acl_code: 'chat_commerce',
    });

    const { data, loading, error } = gqlService.getMarketplaceList({
        variables: {
            filter: {
                is_active: { eq: '1' },
            },
        },
    });

    useEffect(() => {
        BackdropLoad(aclCheckLoading || aclChatLoading || loading);
    }, [aclCheckLoading, aclChatLoading, loading]);

    if (aclCheckLoading || aclChatLoading || loading) {
        return <Layout pageConfig={pageConfig} seller />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/seller/dashboard');
        return <Layout pageConfig={pageConfig} seller />;
    }

    if (!data) {
        const errMsg = error?.message ?? t('sellerstoreintegration:Data_not_found');
        const redirect = '/seller/dashboard';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} isSeller />;
    }

    const contentProps = {
        ...props,
        data: data.getMarketplaceList?.items || [],
        isEnableChat: aclChatData && aclChatData.isAccessAllowed,
    };

    return (
        <Layout pageConfig={pageConfig} seller>
            <ContentWrapper {...contentProps} />
        </Layout>
    );
};

export default Core;
