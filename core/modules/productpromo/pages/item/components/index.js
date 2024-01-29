/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-expressions */
import React from 'react';
import Table from '@common_table';
import Header from '@modules/productpromo/pages/item/components/Header';
import TextField from '@common_textfield';
import useStyles from '@modules/productpromo/pages/list/components/style';

const ProductPromoItemListContent = (props) => {
    const { t } = props;
    const classes = useStyles();
    const { data, loading, getMarketplaceProductPromoItemsList } = props;
    const productPromoItemList = (data && data.getMarketplaceProductPromoItemsList && data.getMarketplaceProductPromoItemsList.items) || [];
    const productPromoItemTotal = (data && data.getMarketplaceProductPromoItemsList && data.getMarketplaceProductPromoItemsList.total_count) || 0;

    const columns = [
        { field: 'sku', headerName: t('marketplace:sku'), sortable: true, hideable: true },
        { field: 'channel_code', headerName: t('marketplace:channelCode'), sortable: true, hideable: true },
        { field: 'discount_type', headerName: t('marketplace:discountType'), sortable: true, hideable: true },
        { field: 'discount_value', headerName: t('marketplace:discountValue'), sortable: true, hideable: true },
        { field: 'max_order', headerName: t('marketplace:maxOrder'), sortable: true, hideable: true },
        { field: 'updated_at', headerName: t('marketplace:updatedAt'), sortable: true, hideable: true },
    ];

    const filters = [
        {
            field: 'updated_at',
            name: 'updated_at_from',
            type: 'from',
            label: t('marketplace:updatedAtFrom'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    id="date"
                    type="date"
                    value={filterValue?.split(' ').slice(0, 1).join('')}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(newValue) => {
                        newValue.target.value ? setFilterValue(`${newValue.target.value} 00:00:00`)
                            : setFilterValue(`${newValue.target.value}`);
                    }}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                />
            ),

        },
        {
            field: 'updated_at',
            name: 'updated_at_to',
            type: 'to',
            label: t('marketplace:updatedAtTo'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    id="date"
                    type="date"
                    value={filterValue?.split(' ').slice(0, 1).join('')}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(newValue) => {
                        newValue.target.value ? setFilterValue(`${newValue.target.value} 23:59:59`)
                            : setFilterValue(`${newValue.target.value}`);
                    }}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                />
            ),
        },
        { field: 'sku', name: 'sku', type: 'like', label: t('marketplace:sku'), initialValue: '' },
        { field: 'channel_code', name: 'channel_code', type: 'like', label: t('marketplace:channelCode'), initialValue: '' },
        { field: 'discount_type', name: 'discount_type', type: 'like', label: t('marketplace:discountType'), initialValue: '' },
        { field: 'max_order', name: 'max_order', type: 'like', label: t('marketplace:maxOrder'), initialValue: '' },
    ];

    const rows = productPromoItemList.map((productPromo) => ({
        ...productPromo,
        id: productPromo.entity_id,
    }));

    return (
        <>
            <Header t={t} />
            <Table
                filters={filters}
                rows={rows}
                getRows={getMarketplaceProductPromoItemsList}
                loading={loading}
                columns={columns}
                count={productPromoItemTotal}
                hideActions
            />
        </>
    );
};

export default ProductPromoItemListContent;
