import Layout from '@layout';
import gqlService from '@modules/productbundle/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const { Content, t } = props;
    const router = useRouter();

    const pageConfig = {
        title: t('productbundle:Product_Bundle'),
    };

    const [getProductBundleList, { data, loading }] = gqlService.getProductBundleList();
    const [deleteProductBundle] = gqlService.deleteProductBundle();

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'product_bundle',
    });

    const { loading: aclDeleteProductLoading, data: aclDeleteProductData } = aclService.isAccessAllowed({
        acl_code: 'product_bundle_delete',
    });

    const { loading: aclImportProductLoading, data: aclImportProductData } = aclService.isAccessAllowed({
        acl_code: 'product_bundle_import',
    });

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading || aclDeleteProductLoading || aclImportProductLoading);
    }, [aclCheckLoading, aclDeleteProductLoading, aclImportProductLoading]);

    if (aclCheckLoading || aclDeleteProductLoading || aclImportProductLoading) {
        return <Layout pageConfig={pageConfig} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        getProductBundleList,
        data,
        loading,
        isAllowDeleteProduct: (aclDeleteProductData && aclDeleteProductData.isAccessAllowed) || false,
        isAllowImport: (aclImportProductData && aclImportProductData.isAccessAllowed) || false,
        deleteProductBundle,
        ...props,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
