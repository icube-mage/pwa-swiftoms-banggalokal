import React, { useEffect } from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';

import BackdropLoad from '@helper_backdropload';

import ErrorRedirect from '@common_errorredirect';
import themeService from '@modules/theme/services/graphql';
import gqlService from '@sellermodules/storelist/services/graphql';

const ContentWrapper = (props) => {
    const {
        Content,
    } = props;
    const router = useRouter();
    const { store_code } = router.query;

    const [generateWebstoreUrl] = gqlService.generateWebstoreUrl();

    const handleManageStore = () => {
        window.backdropLoader(true);
        generateWebstoreUrl({ variables: { store_code } })
            .then((res) => {
                window.backdropLoader(false);
                window.open(res.data.generateWebstoreUrl.sessioning_url);
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

    const contentProps = {
        ...props,
        handleManageStore,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const { store_code } = router.query;

    const pageConfig = {
        title: t('sellermanagestore:Sales_Channels'),
        backUrl: '/seller/saleschannels/storelist',
    };

    const { loading: aclCheckLoading, data: aclCheckData } = themeService.isAccessAllowed({
        acl_code: 'seller_sales_channel_list',
    });
    const [generateWebstoreUrl, { loading, data, error }] = gqlService.generateWebstoreUrl();

    useEffect(() => {
        generateWebstoreUrl({ variables: { store_code } });
    }, []);

    useEffect(() => {
        BackdropLoad(aclCheckLoading || loading);
    }, [aclCheckLoading, loading]);

    if (aclCheckLoading || loading) {
        return <Layout pageConfig={pageConfig} seller />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/seller/saleschannel/storelist');
        return <Layout pageConfig={pageConfig} seller />;
    }

    if (!store_code || !data) {
        const errMsg = (error?.message) ?? t('sellermanagestore:Data_not_found');
        const redirect = '/seller/saleschannels/storelist';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} isSeller />;
    }

    const contentProps = {
        ...props,
        data: data.generateWebstoreUrl,
    };

    return (
        <Layout pageConfig={pageConfig} seller>
            <ContentWrapper {...contentProps} />
        </Layout>
    );
};

export default Core;
