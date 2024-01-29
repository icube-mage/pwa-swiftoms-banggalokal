import { useState } from 'react';
import Layout from '@layout';
import gqlService from '@modules/marketplace/services/graphql';
import themeService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [getMarketplaceList, { data, loading, refetch }] = gqlService.getMarketplaceList();
    const [syncMarketplace] = gqlService.syncMarketplace();

    const [getStoreConfig] = gqlService.getStoreConfigLazy({
        variables: { path: 'swiftoms_mpadapter/api_config/api_client_key' },
        onCompleted: (res) => {
            if (!(res && res.getStoreConfig)) {
                window.backdropLoader(false);
                setOpen(true);
            } else {
                syncMarketplace({
                    variables: {
                        callback_url: `${window.origin}${router.pathname}`,
                    },
                })
                    .then((resSync) => {
                        window.backdropLoader(false);
                        if (resSync.data.syncMarketplace) {
                            window.toastMessage({
                                open: true,
                                text: t('marketplace:Marketplace_has_been_sync'),
                                variant: 'success',
                            });
                            refetch();
                        } else {
                            throw new Error(t('marketplace:Something_went_wrong_while_sync_the_marketplace'));
                        }
                    })
                    .catch((e) => {
                        window.toastMessage({
                            open: true,
                            text: e.message,
                            variant: 'error',
                        });
                    });
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

    const handleSyncMarketplace = () => {
        window.backdropLoader(true);
        getStoreConfig();
    };

    const { loading: aclCheckLoading, data: aclCheckData } = themeService.isAccessAllowed({
        acl_code: 'oms_lite_marketplace',
    });

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading);
    }, [aclCheckLoading]);

    if (aclCheckLoading) {
        return <Layout />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        getMarketplaceList,
        data,
        loading,
        t,
        handleSyncMarketplace,
        open,
        setOpen,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
