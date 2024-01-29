/* eslint-disable object-curly-newline */
import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import BackHeader from '@common_backheaderseller';

import ListCard from '@sellermodules/stock/pages/list/components/ListCard';
import EditModal from '@sellermodules/stock/pages/list/components/EditModal';
import useStyles from '@sellermodules/stock/pages/list/components/style';
import SyncModal from '@sellermodules/stock/pages/list/components/SyncModal';

const StockListContent = (props) => {
    const {
        data, getSellerInventoryStockList, t,
        dataFailed, loadingFailed, formikEdit, setOpenEdit, dataLocDefault,
    } = props;

    const router = useRouter();
    const classes = useStyles();
    const { product_id } = router?.query;

    const [checked, setChecked] = React.useState([]);
    const stockList = (data && data.getSellerInventoryStockList && data.getSellerInventoryStockList.items) || [];
    const stockTotal = (data && data.getSellerInventoryStockList && data.getSellerInventoryStockList.total_count) || 0;

    const emptySyncHistory = [{ channel: { channel_name: '' }, inserted_at: '', qty_update: '' }];

    const rows = stockList.map((stock) => ({
        ...stock,
        id: stock.product?.entity_id,
        product_detail: () => (
            <div className={classes.imgContainer}>
                <div className={classes.imgContainerFlex}>
                    <div>
                        <div className={classes.imgBackContainer}>
                            <div
                                className={classes.imgBack}
                                style={{ backgroundImage: `url(${stock.product?.images?.[0]?.url || '/assets/img/placeholder_image.jpg'})` }}
                                alt="ord-img"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="parent-product">
                            <b>{stock.product_parent?.name}</b>
                        </div>
                        <div className="name-product">
                            <span>{stock.product?.name}</span>
                        </div>
                        <div className="sku-product">
                            SKU :
                            {' '}
                            {stock.product?.vendor_sku}
                        </div>
                    </div>
                </div>
            </div>
        ),
        stock: <b>{stock.product?.stock || 0}</b>,
        sync_history: stock.sync_history?.length ? stock.sync_history : emptySyncHistory,
    }));

    const filters = [
        { field: 'loc_id', name: 'loc_id', type: 'eq', initialValue: String(dataLocDefault.id), class: 'fixed' },
    ];

    const dataTabs = [
        { label: t('sellerstock:All_Products'), value: 'all' },
        {
            label: (
                <div className={classes.failedDiv}>
                    {t('sellerstock:Sync_Failed')}
                    {!loadingFailed
                        && (
                            <div className={clsx(classes.failedCount, router.query.status === 'failed' && 'active')}>
                                {dataFailed?.getSellerInventoryStockList?.total_count || 0}
                            </div>
                        )}
                </div>
            ),
            value: 'failed',
        },
    ];

    const actions = [
        {
            label: t('sellerstock:Edit'),
            onClick: () => {
                const ids = checked.map((check) => check.id);
                router.push('/seller/stock/edit', {
                    query: {
                        ids,
                    },
                });
            },
            showMessage: false,
        },
    ];

    const handleClickEdit = (row, loc) => {
        formikEdit.setValues({
            name: row.product?.name,
            sku: row.product?.sku,
            vendor_sku: row.product?.vendor_sku,
            loc_id: loc.loc_id,
            loc_name: loc.loc_name,
            sync: row.sync,
            qty_total: row.location_stock.filter((e) => e.loc_id === loc.loc_id).map((z) => (z.stock) || 0),
            qty_buffer: row.location_stock.filter((e) => e.loc_id === loc.loc_id).map((z) => z.qty_buffer || 0),
            channels: loc.channel_stock,
            sync_history: row.sync_history,
        });
        setOpenEdit(true);
    };

    return (
        <>
            {!!product_id
            && <BackHeader title={t('sellerstock:Product')} route={`/seller/catalog/product/edit/${product_id}?status=master`} />}
            <div className={classes.container}>
                <ListCard
                    {...props}
                    header={t('sellerstock:Stock_List')}
                    getRows={getSellerInventoryStockList}
                    rows={rows}
                    count={stockTotal}
                    showCheckbox
                    searchPlaceholder={t('common:Search_product_name_or_SKU')}
                    useTabs
                    dataTabs={dataTabs}
                    handleChecked={(row) => setChecked(row)}
                    actions={actions}
                    handleClickEdit={handleClickEdit}
                    filters={filters}
                />
                <EditModal {...props} />
            </div>
            <SyncModal {...props} />
        </>
    );
};

export default StockListContent;
