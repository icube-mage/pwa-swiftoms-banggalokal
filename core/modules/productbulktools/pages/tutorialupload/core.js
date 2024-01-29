import React, { useEffect } from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@modules/productbulktools/services/graphql';
import aclService from '@modules/theme/services/graphql';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const { Content, t } = props;
    const router = useRouter();

    const pageConfig = {
        title: t('productbulktools:Product_Import_Tutorial'),
    };

    const [downloadList, downloadListRes] = gqlService.downloadSampleCsv({ type: 'product' });

    useEffect(() => {
        downloadList();
    }, []);

    const urlDownload = downloadListRes && downloadListRes.data && downloadListRes.data.downloadSampleCsv;

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'product_upload',
    });

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading);
    }, [aclCheckLoading]);

    if (aclCheckLoading) {
        return <Layout />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/product/productbulktools');
    }

    const contentProps = {
        urlDownload,
        t,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
