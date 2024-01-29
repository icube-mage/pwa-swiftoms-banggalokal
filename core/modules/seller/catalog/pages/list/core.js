import React from 'react';
import Layout from '@layout';
import gqlService from '@sellermodules/catalog/services/graphql';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;
    const pageConfig = {
        title: t('sellercatalog:Catalog'),
    };

    const [getSellerProducts, { data, loading, refetch }] = gqlService.getSellerProducts();
    const [updateSellerProductStatus] = gqlService.updateSellerProductStatus();
    const [deleteSellerProductByIds] = gqlService.deleteSellerProductByIds();
    const [moveSellerProductEtalase] = gqlService.moveSellerProductEtalase();
    const { data: dataCat, loading: loadCat } = gqlService.getCategoryList();
    const { data: dataEtalase, loading: loadEtalase } = gqlService.getSellerEtalaseList({
        filter: {
            exclude_all_products: { eq: '1' },
        },
    });
    const { data: dataEtalaseMove, loading: loadEtalaseMove } = gqlService.getSellerEtalaseList({
        filter: {
            is_default: { eq: '0' },
        },
    });

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

    const handleDeleteProduct = (ids, before = () => {}, after = () => {}) => {
        before();
        window.backdropLoader(true);
        deleteSellerProductByIds({
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
        BackdropLoad(loadCat || loadEtalase || loadEtalaseMove);
    }, [loadCat, loadEtalase, loadEtalaseMove]);

    if (loadCat) {
        return <Layout pageConfig={pageConfig} seller />;
    }

    const contentProps = {
        ...props,
        getSellerProducts,
        data,
        loading,
        categories: dataCat?.getCategoryList,
        dataEtalase: dataEtalase?.getSellerEtalaseList?.items,
        handleUpdateStatus,
        handleDeleteProduct,
        handleMoveProduct,
        dataEtalaseMove: dataEtalaseMove?.getSellerEtalaseList?.items,
    };

    return (
        <Layout pageConfig={pageConfig} seller>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
