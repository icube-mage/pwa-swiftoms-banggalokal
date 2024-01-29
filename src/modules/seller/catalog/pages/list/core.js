/* eslint-disable max-len */
/* eslint-disable prefer-const */
import React from 'react';
import Layout from '@layout';
import gqlService from '@sellermodules/catalog/services/graphql/index';
import BackdropLoad from '@helper_backdropload';
import { useRouter } from 'next/router';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;
    const pageConfig = {
        title: t('sellercatalog:Catalog'),
    };

    let data; let loading; let
        refetch;
    const router = useRouter();
    const routerQuery = router?.query;
    const [statusSync, setStatusSync] = React.useState([]);
    const [modalType, setModalType] = React.useState(null);
    const [getSellerProducts, { data: dataProducts, loading: loadingProducts, refetch: refetchProducts }] = gqlService.getSellerProducts();
    const [getSellerProductsFailed, { data: dataProductsFailed, loading: loadingProductsFailed, refetch: refetchProductsFailed }] = gqlService.getSellerProductsFailed();
    const { data: dataProductFailed, refetch: refetchProductCountFailed } = gqlService.getSellerProductsCountFailed({ status: statusSync?.length > 0 ? statusSync : ['active', 'queue', 'failed'] });
    const { data: dataProductsAll, refetch: refetchProductCountAll } = gqlService.getSellerProductsCountAll();
    const { data: dataProductActive, refetch: refetchProductCountActive } = gqlService.getSellerProductsCount({ status: '1' });
    const { data: dataProductInactive, refetch: refetchProductCountInactive } = gqlService.getSellerProductsCount({ status: '2' });
    const [onRetryPushSellerProduct] = gqlService.retryPushSellerProduct();
    const [exportSellerProduct] = gqlService.exportSellerProduct();
    const [exportSellerProductAll] = gqlService.exportSellerProductAll();
    const [updateSellerProductStatus] = gqlService.updateSellerProductStatus();
    const [deleteMultitenantProductByIds] = gqlService.deleteMultitenantProductByIds();
    const [moveSellerProductEtalase] = gqlService.moveSellerProductEtalase();
    const { data: dataCat, loading: loadCat } = gqlService.getCategoryList();

    const { data: dataSellerChannelList, loading: loadSellerChannelList } = gqlService.getSellerChannelList();

    const isLoading = loadCat || loadSellerChannelList;

    const dataProductCount = {
        all: dataProductsAll?.getSellerProducts?.total_count ?? 0,
        active: dataProductActive?.getSellerProducts?.total_count ?? 0,
        inactive: dataProductInactive?.getSellerProducts?.total_count ?? 0,
        failed: dataProductFailed?.getSellerProductSyncStatusList?.total_count ?? 0,
    };

    const tabsMenu = React.useMemo(() => [
        {
            id: 1,
            name: t('common:all_product'),
            count: dataProductCount?.all?.toString(),
            query: { status: 'all' },
        },
        {
            id: 3,
            name: t('draft'),
            count: dataProductCount?.inactive?.toString(),
            query: { status: 'inactive' },
        },
        {
            id: 4,
            name: t('common:Sync_Status'),
            count: dataProductCount?.failed?.toString(),
            query: { status: 'list' },
        },
    ], [dataProductCount]);

    const catalogStatus = routerQuery?.status ?? tabsMenu[0].query.status;
    const isCatalogFailed = catalogStatus === 'list';

    data = !isCatalogFailed ? dataProducts : dataProductsFailed;
    loading = !isCatalogFailed ? loadingProducts : loadingProductsFailed;
    refetch = !isCatalogFailed ? refetchProducts : refetchProductsFailed;

    const onReloadAllProductCount = () => {
        refetchProductCountFailed();
        refetchProductCountAll();
        refetchProductCountInactive();
        refetchProductCountActive();
    };

    const handleUpdateStatus = (input, afterRefetch = () => {}) => {
        window.backdropLoader(true);
        updateSellerProductStatus({
            variables: { input },
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('sellercatalog:Products_has_been_updated'),
                variant: 'success',
            });
            refetch();
            onReloadAllProductCount();
            afterRefetch();
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const handleRetryProduct = (variables, before = () => {}, after = () => {}) => {
        before();
        window.backdropLoader(true);
        onRetryPushSellerProduct({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('common:sync_retry_success', { name: variables.sku }),
                variant: 'success',
            });
            refetch();
            onReloadAllProductCount();
            after();
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const handleDeleteProduct = (ids, before = () => {}, after = () => {}) => {
        before();
        window.backdropLoader(true);
        deleteMultitenantProductByIds({
            variables: { ids },
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('sellercatalog:Products_has_been_deleted'),
                variant: 'success',
            });
            refetch();
            after();
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const handleMoveProduct = (displayWindow, dataProductSelected) => {
        moveSellerProductEtalase({
            variables: { id: displayWindow, product_ids: dataProductSelected },
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('sellercatalog:Products_has_been_moved'),
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

    React.useEffect(() => {
        BackdropLoad(isLoading);
    }, [isLoading]);

    if (loadCat) {
        return <Layout pageConfig={pageConfig} seller />;
    }

    const contentProps = {
        ...props,
        isCatalogFailed,
        getSellerProducts: !isCatalogFailed ? getSellerProducts : getSellerProductsFailed,
        data,
        loading,
        categories: dataCat?.getCategoryList,
        dataEtalase: [],
        handleUpdateStatus,
        handleDeleteProduct,
        handleMoveProduct,
        handleRetryProduct,
        dataEtalaseMove: [],
        exportSellerProduct,
        exportSellerProductAll,
        tabsMenu,
        dataProductCount,
        catalogStatus,
        onReloadAllProductCount,
        refetchProductCountFailed,
        refetchProductCountAll,
        refetchProductCountInactive,
        refetchProductCountActive,
        dataSellerChannelList: dataSellerChannelList?.getSellerChannelList?.items || [],
        statusSync,
        setStatusSync,
        modalType,
        setModalType,
    };

    return (
        <Layout pageConfig={pageConfig} seller>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
