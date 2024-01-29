import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

import BackdropLoad from '@helper_backdropload';
import { getHost } from '@helper_config';
import { setLocalStorage } from '@helper_localstorage';
import { sendDataLayer } from '@helper_gtm';

import themeService from '@modules/theme/services/graphql';
import gqlService from '@sellermodules/storelist/services/graphql';
import gqlIntegration from '@sellermodules/storeintegration/services/graphql';

import Layout from '@layout';

const Core = (props) => {
    const {
        Content, t,
    } = props;
    const router = useRouter();
    const pageConfig = {
        title: t('sellerstorelist:Sales_Channels'),
    };

    const [openDialog, setOpenDialog] = useState({});

    const url_referrer = router?.query?.url_referrer;
    const [currentBrandId, setCurrentBrandId] = React.useState(null);
    const [connectSellerMp, connectSellerMpRes] = gqlIntegration.connectSellerMp();
    const [getSellerMpCredentials] = gqlIntegration.getSellerMpCredentials({
        onCompleted: (res) => {
            const credType = res.getSellerMpCredentials.marketplaces[0]?.credentials.type;
            if (credType === 'oauth2') {
                window.backdropLoader(false);
                Cookies.set('marketplace_register_seller_brand_id', JSON.stringify(res.getSellerMpCredentials?.brand_id));
                router.push(res.getSellerMpCredentials.marketplaces[0]?.credentials.url);
            } else if (credType === 'secret_key') {
                Cookies.set('mp_reintegration_brand', JSON.stringify({
                    brand_id: currentBrandId,
                    mp_code: res.getSellerMpCredentials.marketplaces[0]?.marketplace_code?.toUpperCase(),
                }));

                if (res.getSellerMpCredentials.marketplaces[0]?.marketplace_code?.toLowerCase() !== 'shopify') {
                    router.push(`/seller/saleschannels/storeintegration/reintegrate/${res.getSellerMpCredentials.marketplaces[0]?.marketplace_code}`);
                } else {
                    router.push(`/seller/saleschannels/storeintegration/${res.getSellerMpCredentials.marketplaces[0]?.marketplace_code}`);
                }
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

    const reIntegrate = async (marketplace_code, brand_id = null) => {
        window.backdropLoader(true);
        await getSellerMpCredentials({
            variables: {
                marketplace_code,
                callback_url: `${getHost()}${router.asPath}?`,
                brand_id,
            },
        });
    };

    React.useEffect(() => {
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

    React.useEffect(() => {
        window.backdropLoader(connectSellerMpRes.loading);
    }, [connectSellerMpRes.loading]);

    const [getSellerChannelList, { data, loading, refetch }] = gqlService.getSellerChannelList();
    const [getSellerMarketplaceIntegrationRequestList,
        { data: dataRequest, loading: loadingRequest, refetch: refetchRequest }] = gqlService.getSellerMarketplaceIntegrationRequestList();

    const [updateConnectedSellerMp, updateConnectedSellerMpRes] = gqlService.updateConnectedSellerMp();
    const { loading: aclCheckLoading, data: aclCheckData } = themeService.isAccessAllowed({
        acl_code: 'seller_sales_channel_list',
    });

    const { loading: aclChatLoading, data: aclChatData } = themeService.isAccessAllowed({
        acl_code: 'chat_commerce',
    });

    const [disconnectSellerMp] = gqlService.disconnectSellerMp();
    const [reconnectSellerMp] = gqlService.reconnectSellerMp();
    const [cancelSellerMarketplaceIntegrationRequest] = gqlService.cancelSellerMarketplaceIntegrationRequest();

    const handleSet = (brand_id, mp_code, status) => {
        window.backdropLoader(true);
        const useSetMutation = status ? disconnectSellerMp : reconnectSellerMp;
        setOpenDialog({});
        let dataLayer = {};
        if (status) {
            dataLayer = {
                event: 'disconnect_integration',
                eventLabel: 'Sales Channel - Disconnect Integration',
            };
        } else {
            dataLayer = {
                event: 'store_integration',
                eventLabel: 'Sales Channel - Store Integration',
                event_data: {
                    marketplace_code: mp_code,
                },
            };
        }
        sendDataLayer(dataLayer);
        useSetMutation({
            variables: {
                brand_id,
                mp_code,
                callback_url: `${getHost()}${router.asPath}?`,
            },
        }).then((res) => {
            if (status) {
                updateConnectedSellerMp();
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: status ? t('sellerstorelist:The_store_has_been_successfully_disconnect_the_integration')
                        : t('sellerstorelist:The_store_has_been_successfully_reintegrated'),
                    variant: 'success',
                });
                refetch();
            } else if (res.data.reconnectSellerMp.includes('http')) {
                router.push(res.data.reconnectSellerMp);
            } else {
                updateConnectedSellerMp();
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: res.data.reconnectSellerMp || t('sellerstorelist:The_store_has_been_successfully_reintegrated'),
                    variant: 'success',
                });
                refetch();
            }
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const handleCancelRequest = (id) => {
        window.backdropLoader(true);
        setOpenDialog({});
        cancelSellerMarketplaceIntegrationRequest({
            variables: { id },
        }).then(() => {
            updateConnectedSellerMp();
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('sellerstorelist:Request_has_been_canceled'),
                variant: 'success',
            });
            refetchRequest();
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message || t('sellerstorelist:Something_went_wrong_while_trying_to_cancel_the_request'),
                variant: 'error',
            });
        });
    };

    useEffect(async () => {
        await updateConnectedSellerMp();
        await refetch();
        BackdropLoad(false);
    }, []);

    useEffect(async () => {
        BackdropLoad(aclCheckLoading || aclChatLoading);
    }, [aclCheckLoading, aclChatLoading]);

    if (aclCheckLoading || aclChatLoading) {
        return <Layout pageConfig={pageConfig} seller />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/seller/dashboard');
        return <Layout pageConfig={pageConfig} seller />;
    }

    const contentProps = {
        ...props,
        getSellerChannelList,
        data,
        loading,
        updateConnectedSellerMpRes,
        handleSet,
        getSellerMarketplaceIntegrationRequestList,
        dataRequest,
        loadingRequest,
        handleCancelRequest,
        openDialog,
        setOpenDialog,
        reIntegrate,
        setCurrentBrandId,
        isEnableChat: aclChatData && aclChatData.isAccessAllowed,
    };

    return (
        <Layout pageConfig={pageConfig} seller>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
