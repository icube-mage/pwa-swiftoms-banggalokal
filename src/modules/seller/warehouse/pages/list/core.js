import { useEffect } from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';

import BackdropLoad from '@helper_backdropload';

import themeService from '@modules/theme/services/graphql';
import gqlService from '@sellermodules/warehouse/services/graphql';

const Core = (props) => {
    const {
        Content, t,
    } = props;
    const router = useRouter();
    const pageConfig = {
        title: t('sellerwarehouse:Warehouse'),
    };

    const [getSellerStores, { data, loading, refetch }] = gqlService.getSellerStores();
    const [deleteSellerStore] = gqlService.deleteSellerStore();
    const [updateSellerStoreStatus] = gqlService.updateSellerStoreStatus();
    const [saveSellerDefaultStore] = gqlService.saveSellerDefaultStore();

    const { loading: aclCheckLoading, data: aclCheckData } = themeService.isAccessAllowed({
        acl_code: 'seller_warehouse',
    });

    const handleAction = (variables, action) => {
        window.backdropLoader(true);
        const useMutation = {
            status: updateSellerStoreStatus,
            delete: deleteSellerStore,
            is_default: saveSellerDefaultStore,
        };
        const message = {
            status: t('sellerwarehouse:The_location_has_been_successfully_updated'),
            delete: t('sellerwarehouse:The_location_has_been_successfully_deleted'),
            is_default: t('sellerwarehouse:The_location_has_been_successfully_updated'),
        };
        useMutation[action]({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: message[action],
                variant: 'success',
            });
            refetch();
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    useEffect(() => {
        BackdropLoad(aclCheckLoading);
    }, [aclCheckLoading]);

    if (aclCheckLoading) {
        return <Layout pageConfig={pageConfig} seller />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/seller/dashboard');
        return <Layout pageConfig={pageConfig} seller />;
    }

    const contentProps = {
        ...props,
        getSellerStores,
        data,
        loading,
        handleAction,
    };

    return (
        <Layout pageConfig={pageConfig} seller>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
