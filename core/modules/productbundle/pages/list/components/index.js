/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-expressions */
import React from 'react';
import Table from '@common_table';
import CustomList from '@common_customlist';
import TextField from '@common_textfield';
import Header from '@modules/productbundle/pages/list/components/Header';
import useStyles from '@modules/clitools/pages/list/components/style';
import { breakPointsUp } from '@helper_theme';

const ProductListContent = (props) => {
    const { data, loading, getProductBundleList, t, deleteProductBundle } = props;
    const classes = useStyles();
    const desktop = breakPointsUp('sm');

    const productList = (data && data.getProductBundleList && data.getProductBundleList.items) || [];
    const productTotal = (data && data.getProductBundleList && data.getProductBundleList.total_count) || 0;

    const columns = [
        { field: 'sku', headerName: t('productbundle:Bundle_SKU'), hideable: true, sortable: true, initialSort: 'ASC' },
        { field: 'product_bundle_item', headerName: t('productbundle:Bundle_Items'), hideable: true },
        { field: 'updated_at', headerName: t('productbundle:Updated'), hideable: true },
    ];

    const filters = [
        { field: 'sku', name: 'sku', type: 'like', label: t('productbundle:Bundle_SKU'), initialValue: '' },
        {
            field: 'product_bundle_item',
            name: 'product_bundle_item',
            type: 'like',
            label: t('productbundle:Bundle_Items'),
            initialValue: '',
        },
        {
            field: 'updated_at',
            name: 'updated_at_from',
            type: 'from',
            label: t('productbundle:Updated_From'),
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
            label: t('productbundle:Updated_To'),
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
    ];

    const rows = productList.map((product) => ({
        ...product,
        id: product.entity_id,
        product_bundle_item: () => {
            const itemToMap = product.items.map((item) => `SKU: ${item.sku}, ${t('productbundle:Quantity')}: ${item.qty}`);
            return (
                <>
                    {itemToMap.map((item) => (
                        <div>
                            {item}
                        </div>
                    ))}
                </>
            );
        },
    }));

    return (
        <>
            <Header {...props} />
            {desktop ? (
                <Table
                    deleteRows={deleteProductBundle}
                    filters={filters}
                    rows={rows}
                    getRows={getProductBundleList}
                    loading={loading}
                    columns={columns}
                    count={productTotal}
                    showCheckbox
                    recordName={t('productbundle:Bundle')}
                />
            )
                : (
                    <CustomList
                        deleteRows={deleteProductBundle}
                        filters={filters}
                        rows={rows}
                        getRows={getProductBundleList}
                        loading={loading}
                        columns={columns}
                        count={productTotal}
                        showCheckbox
                        recordName={t('productbundle:Bundle')}
                        hideColumn={false}
                        checkboxAll
                        twoColumns
                        usePagination
                    />
                )}
        </>
    );
};

export default ProductListContent;
