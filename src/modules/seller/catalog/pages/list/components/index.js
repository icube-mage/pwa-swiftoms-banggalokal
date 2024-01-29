/* eslint-disable */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-await-in-loop */
import React from 'react';
import CatalogHeader from '@sellermodules/catalog/pages/list/components/CatalogHeader';
import Table from '@sellermodules/catalog/pages/list/components/Table/index';
import CatalogChannelSync from '@sellermodules/catalog/pages/list/components/CatalogChannelSync/index';
import CatalogSyncFromChannel from '@sellermodules/catalog/pages/list/components/CatalogSyncFromChannel/index';
import useStyles from '@modules/seller/catalog/pages/list/components/style';
import classNames from 'classnames';
import AppModal from '@common_appmodal/index';
import Hidden from '@material-ui/core/Hidden';
import { breakPointsUp } from '@helper_theme';

const CatalogListContent = ({
    t,
    data,
    loading,
    getSellerProducts,
    categories,
    dataEtalase,
    dataEtalaseMove,
    handleUpdateStatus,
    handleDeleteProduct,
    handleMoveProduct,
    handleRetryProduct,
    exportSellerProduct,
    exportSellerProductAll,
    catalogStatus,
    tabsMenu,
    isCatalogFailed,
    onReloadAllProductCount,
    refetchProductCountFailed,
    refetchProductCountAll,
    refetchProductCountInactive,
    refetchProductCountActive,
    dataSellerChannelList,
    statusSync,
    setStatusSync,
    modalType,
    setModalType,
}) => {
    const [showUploadProduct, setShowUploadProduct] = React.useState(false);
    const desktop = breakPointsUp('sm');
    const classes = useStyles();

    const productList = isCatalogFailed
        ? (data && data?.getSellerProductSyncStatusList && data?.getSellerProductSyncStatusList?.items) || []
        : (data && data?.getSellerProducts && data?.getSellerProducts?.items) || [];
    const productTotal = isCatalogFailed
        ? (data && data?.getSellerProductSyncStatusList && data?.getSellerProductSyncStatusList?.total_count) || 0
        : (data && data?.getSellerProducts && data?.getSellerProducts?.total_count) || 0;
    const columns = isCatalogFailed ? [
        { field: 'name', headerName: t('sellercatalog:Product_Name')},
        { field: 'vendor_sku', headerName: t('common:SKU')},
        { field: 'status_sync', headerName: t('Sync_Status')},
        { field: 'message', headerName: t('common:message_failed'), sortable: false },
        { field: 'updated_at', headerName: t('common:Updated_At'), sortable: true },
        { field: 'channel', headerName: t('common:channels'), sortable: false },
    ] : [
        { field: 'name', headerName: t('sellercatalog:Product_Name'), sortable: true },
        { field: 'status', headerName: t('publish') },
        { field: 'price', headerName: t('sellercatalog:Price'), sortable: true },
        { field: 'updated_at', headerName: t('common:Updated_At'), sortable: true },
        { field: 'channels', headerName: t('common:channels'), sortable: false },
    ];

    const isValidJson = (jsonString) => {
        try {
            JSON.parse(jsonString);
            return true;
        } catch (e) {}
        return false;
    };

    const getStatusSync = (product) => {
        const syncStatusCode = product?.status?.code?.toLowerCase();
        const mapSyncStatusCode = ['active', 'inactive', 'success'].includes(syncStatusCode) ? 'active' : syncStatusCode;
        const styleBadge = {
            active: classes.badgeActive,
            failed: classes.badgeFailed,
            queue: classes.badgeQueue,
        };
        return {
            style: styleBadge,
            status: mapSyncStatusCode,
        }
    };

    const rows = isCatalogFailed ? productList.map((product) => ({
        ...product,
        status_sync: () => {
            let syncData = getStatusSync(product);
            return (<span className={syncData.style[syncData.status]}>{t(`queue_${syncData.status}`)}</span>);
        },
        message: () => {
            const resultMessage = [];
            resultMessage.push(product.message);
            product?.message_format?.forEach((e) => {
                if (isValidJson(e)) {
                    resultMessage.push(`<pre style="border: 1px #ccc solid;padding: 10px; background: #fbfbf8">${JSON.stringify(JSON.parse(e), null, 2)}</pre>`);
                } else {
                    resultMessage.push(e);
                }
                
            });
            return <div style={{ maxWidth: 500, overflow: "hidden" }} dangerouslySetInnerHTML={{__html: resultMessage.join(`<br>`)}} />;
        },
        channel: () => {
            return (
                <div className={classes.logoChannel}>
                    <img src={product.channel.logo} alt={product.channel.logo} />
                    <span>{product.channel.name}</span>
                </div>
            );
        },
    })) : productList.map((product) => ({
        ...product,
        price: product.price_formatted,
    }));

    const onHandleClose = React.useCallback(() => {
        setShowUploadProduct(false);
    }, []);

    const [refresh, setRefresh] = React.useState(false);

    return (
        <div style={{ paddingBottom: desktop && 20 }}>
            <Hidden smDown>
                <CatalogHeader
                    t={t}
                    setShowUploadProduct={setShowUploadProduct}
                    catalogStatus={catalogStatus}
                    exportSellerProduct={exportSellerProduct}
                    exportSellerProductAll={exportSellerProductAll}
                    modalType={modalType}
                    setModalType={setModalType}
                    dataSellerChannelList={dataSellerChannelList}
                    refresh={{
                        refresh: refresh,
                        setRefresh: setRefresh,
                    }}
                />
            </Hidden>
            <div id="catalog-page-list" className={classNames('catalog-page-list-container', classes.catalogPageListContainer)}>
                <Table
                    t={t}
                    isCatalogFailed={isCatalogFailed}
                    catalogStatus={catalogStatus}
                    tabsMenu={tabsMenu}
                    header={t('sellerincome:Catalog')}
                    columns={columns}
                    getRows={getSellerProducts}
                    rows={rows}
                    loading={loading}
                    count={productTotal}
                    searchPlaceholder={t('common:Search_product_name_or_SKU')}
                    categories={categories}
                    dataEtalase={dataEtalase}
                    dataEtalaseMove={dataEtalaseMove}
                    handleUpdateStatus={handleUpdateStatus}
                    handleDeleteProduct={handleDeleteProduct}
                    handleMoveProduct={handleMoveProduct}
                    handleRetryProduct={handleRetryProduct}
                    onReloadAllProductCount={onReloadAllProductCount}
                    refetchProductCountFailed={refetchProductCountFailed}
                    refetchProductCountAll={refetchProductCountAll}
                    refetchProductCountInactive={refetchProductCountInactive}
                    refetchProductCountActive={refetchProductCountActive}
                    statusSync={statusSync}
                    setStatusSync={setStatusSync}
                    catalogHeaderMobile={(
                        <CatalogHeader
                            t={t}
                            setShowUploadProduct={setShowUploadProduct}
                            catalogStatus={catalogStatus}
                            exportSellerProduct={exportSellerProduct}
                            exportSellerProductAll={exportSellerProductAll}
                            modalType={modalType}
                            setModalType={setModalType}
                            dataSellerChannelList={dataSellerChannelList}
                            refresh={{
                                refresh: refresh,
                                setRefresh: setRefresh,
                            }}
                        />
                    )}
                    dataSellerChannelList={dataSellerChannelList}
                    refresh={{
                        refresh: refresh,
                        setRefresh: setRefresh,
                    }}
                />
                <AppModal
                    className={classes.appModalItemChannel}
                    show={showUploadProduct}
                    title={modalType === 'push' ? t('common:push_product_data') : t('common:pull_product')}
                    closeButton
                    onHandleClose={onHandleClose}
                >
                    { modalType === 'push' && (
                        <CatalogChannelSync t={t} classes={classes} />
                    )}

                    { modalType === 'pull' && (
                        <CatalogSyncFromChannel
                            t={t}
                            classes={classes}
                            refresh={{
                                refresh: refresh,
                                setRefresh: setRefresh,
                            }}
                        />
                    )}
                </AppModal>
            </div>
        </div>
    );
};

export default CatalogListContent;
