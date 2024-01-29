import React, { useState } from 'react';
import { useRouter } from 'next/router';

import Layout from '@layout';
import BackdropLoad from '@helper_backdropload';
import ErrorRedirect from '@common_errorredirect';

import gqlService from '@sellermodules/promotion/services/graphql';
import themeService from '@modules/theme/services/graphql';

const Core = (props) => {
    const {
        Content, t,
    } = props;

    const router = useRouter();
    const { id } = router.query;
    const pageConfig = {
        title: t('sellerpromotion:Bundling_Detail'),
    };

    const { loading: aclCheckLoading, data: aclCheckData } = themeService.isAccessAllowed({
        acl_code: 'seller_promotion_bundling',
    });
    const {
        data, loading, error,
    } = gqlService.getSellerPromotionBundleById({
        id: Number(id),
    });
    const [disablePromotionBundle] = gqlService.disablePromotionBundle();
    const [open, setOpen] = useState(false);

    const handleStopBundling = () => {
        setOpen(false);
        window.backdropLoader(true);
        disablePromotionBundle({
            variables: { id: Number(id) },
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('sellercatalog:Bundling_promotion_has_been_stopped'),
                variant: 'success',
            });
            setTimeout(() => router.push('/seller/promotion/bundling'), 250);
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading);
    }, [loading, aclCheckLoading]);

    if (loading || aclCheckLoading) {
        return <Layout pageConfig={pageConfig} seller />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/seller/unauthorized');
        return <Layout pageConfig={pageConfig} seller />;
    }

    if (!data) {
        const errMsg = error?.message ?? t('alluser:Data_not_found');
        const redirect = '/seller/promotion/bundling';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} isSeller />;
    }

    const contentProps = {
        ...props,
        data: data.getSellerPromotionBundleById,
        handleStopBundling,
        open,
        setOpen,
    };

    return (
        <Layout pageConfig={pageConfig} seller>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
