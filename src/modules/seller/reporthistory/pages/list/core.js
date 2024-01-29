import React from 'react';
import Layout from '@layout';
import gqlService from '@sellermodules/reporthistory/services/graphql';
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
        title: t('sellerreport:report_seller_history'),
    };
    const [getSellerExportHistory, { data, loading, refetch }] = gqlService.getSellerExportHistory();
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
        getSellerExportHistory,
        data,
        loading,
        refetch,
    };

    return (
        <Layout pageConfig={pageConfig} seller>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
