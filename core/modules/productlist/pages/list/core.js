import React, { useEffect, useState } from 'react';
import Layout from '@layout';
import gqlService from '@modules/productlist/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;
    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_product_list',
    });
    const { loading: aclSyncLoading, data: aclSyncData } = aclService.isAccessAllowed({
        acl_code: 'product_sync_to_marketplace',
    });
    const { loading: aclDeleteProductLoading, data: aclDeleteProductData } = aclService.isAccessAllowed({
        acl_code: 'product_delete',
    });
    const { loading: aclFetchMarketplaceLoading, data: aclFetchMarketplaceData } = aclService.isAccessAllowed({
        acl_code: 'product_fetch_from_marketplace',
    });
    const { loading: aclCreateProductLoading, data: aclCreateProductData } = aclService.isAccessAllowed({
        acl_code: 'product_create',
    });
    const { loading: aclExportProductLoading, data: aclExportProductData } = aclService.isAccessAllowed({
        acl_code: 'product_export',
    });

    const [getProductList, { data, loading }] = gqlService.getProductList();
    const [productFetchManual] = gqlService.productFetchManual();
    const [syncToMarketplace] = gqlService.syncToMarketplace();
    const [deleteProducts] = gqlService.deleteProducts();

    const [aclProductList, setAclProductList] = useState({
        product_fetch_from_marketplace: false,
        product_create: false,
        product_export: false,
    });

    const handleFetchManual = () => {
        productFetchManual().then((res) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: res.data.productFetchManual,
                variant: 'success',
            });
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const handleSyncToMarketplace = () => {
        syncToMarketplace().then((res) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: res.data.syncToMarketplace,
                variant: 'success',
            });
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
        BackdropLoad(aclCheckLoading || aclSyncLoading || aclFetchMarketplaceLoading
            || aclCreateProductLoading || aclExportProductLoading || aclDeleteProductLoading);
    }, [aclCheckLoading, aclSyncLoading, aclFetchMarketplaceLoading, aclCreateProductLoading, aclExportProductLoading, aclDeleteProductLoading]);

    useEffect(() => {
        if (!aclFetchMarketplaceLoading && !aclCreateProductLoading && !aclExportProductLoading) {
            setAclProductList({
                product_fetch_from_marketplace: aclFetchMarketplaceData?.isAccessAllowed || false,
                product_create: aclCreateProductData?.isAccessAllowed || false,
                product_export: aclExportProductData?.isAccessAllowed || false,
            });
        }
    }, [aclFetchMarketplaceLoading, aclCreateProductLoading, aclExportProductLoading, aclDeleteProductLoading]);

    if (aclCheckLoading || aclSyncLoading || aclFetchMarketplaceLoading
        || aclCreateProductLoading || aclExportProductLoading || aclDeleteProductLoading) {
        return <Layout />;
    }
    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        getProductList,
        data,
        loading,
        handleFetchManual,
        handleSyncToMarketplace,
        syncToMarketplace,
        t,
        aclSyncToMp: aclSyncData?.isAccessAllowed,
        deleteProducts,
        aclProductList,
        isAllowDeleteProduct: (aclDeleteProductData && aclDeleteProductData.isAccessAllowed) || false,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
