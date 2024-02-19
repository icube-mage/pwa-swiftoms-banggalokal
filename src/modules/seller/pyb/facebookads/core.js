import React from 'react';
import Layout from '@layout';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;
    const router = useRouter();
    const pageConfig = {
        title: t('menu:facebook_ads'),
    };
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'seller_history_report',
    });

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading);
    }, [aclCheckLoading]);

    if (aclCheckLoading) {
        return <Layout pageConfig={pageConfig} seller />;
    }
    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/seller/dashboard');
    }

    const contentProps = {
        ...props,
    };

    return (
        <Layout pageConfig={pageConfig} seller>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
