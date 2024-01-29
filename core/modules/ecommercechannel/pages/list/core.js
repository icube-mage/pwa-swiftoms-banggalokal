/* eslint-disable no-trailing-spaces */
import Layout from '@layout';
import gqlService from '@modules/ecommercechannel/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;
    const router = useRouter();
    const [firstLoad, setFirstLoad] = React.useState(true);

    const [getChannelList, { data, loading, error }] = gqlService.getChannelList();
    const [updateConnectedMarketplace, updateConnectedMarketplaceRes] = gqlService.updateConnectedMarketplace();

    const [deleteChannel] = gqlService.deleteChannel({
        onCompleted: () => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('ecommercechannel:The_channel_has_been_removed'),
                variant: 'success',
            });
            getChannelList();
            updateConnectedMarketplace();
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

    const [disconnectMarketplaceChannel] = gqlService.disconnectMarketplaceChannel({
        onCompleted: () => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('ecommercechannel:The_channel_has_been_disconnected'),
                variant: 'success',
            });
            getChannelList();
            updateConnectedMarketplace();
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

    const [reconnectMarketplaceChannel] = gqlService.reconnectMarketplaceChannel({
        onCompleted: (res) => {
            window.backdropLoader(false);
            if (res?.reconnectMarketplaceChannel.includes('http')) {
                router.push(res.reconnectMarketplaceChannel);
            } else {
                window.toastMessage({
                    open: true,
                    text: res.reconnectMarketplaceChannel || t('ecommercechannel:The_channel_has_been_reconnected'),
                    variant: 'success',
                });
                getChannelList();
                updateConnectedMarketplace();
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

    React.useEffect(() => {
        getChannelList();
        updateConnectedMarketplace();
    }, []);

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const urlParams = router.query;
            if (urlParams && urlParams.status && urlParams.status === 'success') {
                window.toastMessage({
                    open: true,
                    text: t('ecommercechannel:The_channel_has_been_reconnected'),
                    variant: 'success',
                });
                router.push('/integration/ecommercechannel');
            }
            if (urlParams && urlParams.status && urlParams.status !== 'success') {
                window.toastMessage({
                    open: true,
                    text: t('ecommercechannel:Error_when_reconnecting_with_markeplaces'),
                    variant: 'error',
                });
                router.push('/integration/ecommercechannel');
            }
        }
    }, []);

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'ecommerce_channels',
    });
    
    React.useEffect(() => {
        BackdropLoad((firstLoad && loading) || aclCheckLoading);
    }, [firstLoad, loading, aclCheckLoading]);

    const pageConfig = {
        title: t('ecommercechannel:Ecommerce_Channel'),
    };

    if ((firstLoad && loading) || aclCheckLoading) {
        return <Layout />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    if (firstLoad && (error || !data)) {
        const errMsg = error?.message ?? t('ecommercechannel:Data_not_found');
        const redirect = '/';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} />;
    }

    const contentProps = {
        data,
        loading,
        getChannelList,
        updateConnectedMarketplaceRes,
        firstLoad,
        setFirstLoad,
        deleteChannel,
        disconnectMarketplaceChannel,
        reconnectMarketplaceChannel,
        t,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
