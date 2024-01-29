/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Header from '@modules/productcategory/pages/list/components/Header';
import MuiAlert from '@material-ui/lab/Alert';

const ProductCategoryListContent = (props) => {
    const { data, loading, getProductCategoryList, multidisableProductCategory, handlePull, dataPull, t } = props;
    const productCategoryList = (data && data.getProductCategoryList && data.getProductCategoryList.items) || [];
    const productCategoryTotal = (data && data.getProductCategoryList && data.getProductCategoryList.total_count) || 0;

    const columns = [
        { field: 'entity_id', headerName: t('productcategory:ID'), sortable: true, hideable: true, initialSort: 'ASC' },
        { field: 'marketplace_code', headerName: t('productcategory:Marketplace'), sortable: true, hideable: true },
        { field: 'marketplace_category_id', headerName: t('productcategory:Category_ID'), sortable: true, hideable: true },
        { field: 'marketplace_category_name', headerName: t('productcategory:Category_Name'), sortable: true, hideable: true },
    ];

    const filters = [
        { field: 'entity_id', name: 'entity_id', type: 'from', label: t('productcategory:ID'), initialValue: '' },
        { field: 'marketplace_code', name: 'marketplace_code', type: 'like', label: t('productcategory:Marketplace'), initialValue: '' },
        { field: 'marketplace_category_id', name: 'marketplace_category_id', type: 'like', label: t('productcategory:Category_ID'), initialValue: '' },
        { field: 'marketplace_category_name', name: 'marketplace_category_name', type: 'like', label: t('productcategory:Category_Name'), initialValue: '' },
        { field: 'is_active', type: 'eq', initialValue: '1', hidden: true },
    ];

    const actions = [
        {
            label: t('productcategory:Disable'),
            message: t('productcategory:Are_you_sure_you_want_to_disable'),
            onClick: async (_checkedRows) => {
                const variables = { id: _checkedRows.map((checkedRow) => checkedRow.id) };
                await multidisableProductCategory({ variables });
                window.toastMessage({
                    open: true,
                    text: t('productcategory:Disable_success'),
                    variant: 'success',
                });
            },
        },
    ];

    const rows = productCategoryList.map((productCategory) => ({
        ...productCategory,
        id: productCategory.entity_id,
    }));

    return (
        <>
            <Header handlePull={handlePull} t={t} />
            {dataPull && dataPull.pullProductCategory && (
                <MuiAlert icon={false} severity="success" style={{ marginBottom: '1rem' }}>
                    {t('productcategory:Process_is_in_progress_please_wait_Check_the_progress')}
                    {' '}
                    <a style={{ color: '#007bdb' }} href="/tools/clitools">
                        {t('productcategory:here')}
                    </a>
                    .
                </MuiAlert>
            )}
            <Table
                filters={filters}
                rows={rows}
                getRows={getProductCategoryList}
                loading={loading}
                columns={columns}
                count={productCategoryTotal}
                actions={actions}
                hideColumns
                showCheckbox
            />
        </>
    );
};

export default ProductCategoryListContent;
