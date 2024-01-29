/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-expressions */
import React from 'react';
import Table from '@common_table';
import Header from '@modules/productprice/pages/list/components/Header';
import TextField from '@common_textfield';
import useStyles from '@modules/productprice/pages/list/components/Header/style';

const AttributeMappingListContent = (props) => {
    const { data, loading, getMarketplaceProductPriceList, updateMarketplaceProductPriceToMp,
        handleUpdateMarketplace, deleteProductPrice, t, aclSyncToMp } = props;
    const classes = useStyles();

    const productPriceList = (data && data.getMarketplaceProductPriceList && data.getMarketplaceProductPriceList.items) || [];
    const productPriceTotal = (data && data.getMarketplaceProductPriceList && data.getMarketplaceProductPriceList.total_count) || 0;

    const columns = [
        { field: 'entity_id', headerName: t('productprice:ID'), sortable: true, hideable: true },
        { field: 'sku', headerName: t('productprice:SKU'), sortable: true, hideable: true },
        { field: 'channel_code', headerName: t('productprice:Channel_Code'), sortable: true, hideable: true },
        { field: 'price', headerName: t('productprice:Price'), sortable: true, hideable: true },
        { field: 'updated_at', headerName: t('productprice:Updated_At'), sortable: true, hideable: true },
    ];

    const rows = productPriceList.map((price) => ({
        ...price,
        id: price.entity_id,
    }));

    const filters = [
        { field: 'entity_id', name: 'entity_id_from', type: 'from', label: t('productprice:ID_From'), initialValue: '' },
        { field: 'entity_id', name: 'entity_id_to', type: 'to', label: t('productprice:ID_To'), initialValue: '' },
        {
            field: 'updated_at',
            name: 'updated_at_from',
            type: 'from',
            label: t('productprice:Updated_From'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    id="date"
                    type="date"
                    value={filterValue?.split(' ').slice(0, 1).join('')}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(newValue) => {
                        newValue.target.value ? setFilterValue(`${newValue.target.value} 00:00:00`)
                            : setFilterValue(`${newValue.target.value}`);
                    }}
                    InputProps={{
                        className: classes.fieldInputFilter,
                    }}
                />
            ),
        },
        {
            field: 'updated_at',
            name: 'updated_at_to',
            type: 'to',
            label: t('productprice:Updated_To'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    id="date"
                    type="date"
                    value={filterValue?.split(' ').slice(0, 1).join('')}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(newValue) => {
                        newValue.target.value ? setFilterValue(`${newValue.target.value} 23:59:59`)
                            : setFilterValue(`${newValue.target.value}`);
                    }}
                    InputProps={{
                        className: classes.fieldInputFilter,
                    }}
                />
            ),
        },
        { field: 'sku', name: 'sku', type: 'like', label: t('productprice:SKU'), initialValue: '' },
        { field: 'channel_code', name: 'channel_code', type: 'like', label: t('productprice:Channel_Code'), initialValue: '' },
    ];

    const actions = [
        {
            label: t('productprice:Sync_To_Marketplace'),
            confirmDialog: true,
            onClick: async (checkedRows) => {
                const variables = { sku: checkedRows.map((checkedRow) => checkedRow.sku) };
                await updateMarketplaceProductPriceToMp({ variables }).then(() => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: t('productprice:Product_price_sync_to_marketplace_successfully'),
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
            },
        },
        {
            label: t('productprice:Delete'),
            confirmDialog: true,
            onClick: async (checkedRows) => {
                const variables = { id: checkedRows.map((checkedRow) => Number(checkedRow.id)) };
                await deleteProductPrice({ variables }).then(() => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: t('productprice:The_product_price_has_been_deleted'),
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
            },
        },
    ];

    return (
        <>
            <Header handleUpdateMarketplace={handleUpdateMarketplace} t={t} aclSyncToMp={aclSyncToMp} />
            <Table
                rows={rows}
                getRows={getMarketplaceProductPriceList}
                loading={loading}
                columns={columns}
                filters={filters}
                actions={actions}
                count={productPriceTotal}
                showCheckbox
            />
        </>
    );
};

export default AttributeMappingListContent;
