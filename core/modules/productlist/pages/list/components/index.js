/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-newline */
import Router from 'next/router';
import Link from 'next/link';
import Table from '@common_table';
import CustomList from '@common_customlist';
import Header from '@modules/productlist/pages/list/components/Header';
import { breakPointsUp } from '@helper_theme';
import { optionsProductType } from '@modules/productlist/helpers';
import Autocomplete from '@common_autocomplete';

const ProductListContent = (props) => {
    const { data, loading, getProductList, syncToMarketplace, t,
        aclSyncToMp, deleteProducts, aclProductList, isAllowDeleteProduct } = props;
    const productList = (data && data.getProductList && data.getProductList.items) || [];
    const productTotal = (data && data.getProductList && data.getProductList.total_count) || 0;
    const desktop = breakPointsUp('sm');

    const columns = [
        { field: 'entity_id', headerName: t('productlist:ID'), hideable: true, sortable: true, initialSort: 'ASC' },
        { field: 'name', headerName: t('productlist:Product_Name'), hideable: true, sortable: true },
        { field: 'sku', headerName: t('productlist:SKU'), hideable: true, sortable: true },
        { field: 'type_id', headerName: t('productlist:Product_Type'), hideable: true, sortable: true },
        { field: 'product_price', headerName: t('productlist:Price'), hideable: true },
        { field: 'product_special_price', headerName: t('productlist:Special_Price'), hideable: true, hidden: true },
        { field: 'productStatus', headerName: t('productlist:Status'), hideable: true },
        { field: 'approval_status', headerName: t('productlist:Approval_Status'), hideable: true, hidden: true },
        { field: 'actions', headerName: t('productlist:Action'), hidden: !desktop },
    ];

    const filters = [
        { field: 'entity_id', name: 'entity_id_from', type: 'from', label: t('productlist:ID_From'), initialValue: '' },
        { field: 'entity_id', name: 'entity_id_to', type: 'to', label: t('productlist:ID_To'), initialValue: '' },
        { field: 'name', name: 'name', type: 'like', label: t('productlist:Product_Name'), initialValue: '' },
        { field: 'sku', name: 'sku', type: 'like', label: t('productlist:SKU'), initialValue: '' },
        {
            field: 'type_id',
            name: 'type_id',
            type: 'eq',
            label: t('productlist:Type'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <Autocomplete
                    value={optionsProductType.find((e) => e.value === filterValue)}
                    onChange={(newValue) => setFilterValue(newValue && newValue.value)}
                    options={optionsProductType}
                    primaryKey="value"
                    labelKey="label"
                />
            ),
        },
    ];

    const rows = productList.map((product) => ({
        ...product,
        id: product.entity_id,
        product_special_price: <div>{product.product_special_price || ''}</div>,
        productStatus: product.product_status.label,
        approval_status: product.approval_status === '1' ? t('productlist:Approved') : t('productlist:Not_Approved'),
        actions: () => {
            let valueType = optionsProductType.find((option) => product.type_id === option.label)?.value;
            if (!valueType) {
                valueType = 'simple';
            }
            return (
                <Link href={`/product/productlist/edit${valueType === 'simple' ? '' : valueType}/${product.entity_id}`}>
                    <a className="link-button">{t('productlist:View')}</a>
                </Link>
            );
        },
    }));

    const actions = [
        {
            label: t('productlist:Sync_To_Marketplace'),
            confirmDialog: true,
            onClick: async (checkedRows) => {
                const variables = { id: checkedRows.map((checkedRow) => checkedRow.id) };
                await syncToMarketplace({ variables }).then(() => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: t('productlist:A_total_of_valuescount_records_have_been_synced', { values: { count: checkedRows.length } }),
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
            hide: !aclSyncToMp,
            message: t('common:Are_you_sure_want_to_sync_selected_items'),
        },
        {
            label: t('productlist:Delete'),
            confirmDialog: true,
            onClick: async (checkedRows) => {
                const variables = { id: checkedRows.map((checkedRow) => Number(checkedRow.id)) };
                await deleteProducts({ variables }).then(() => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: t('productlist:A_total_of_valuescount_records_have_been_deleted', { values: { count: checkedRows.length } }),
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
            message: t('common:Are_you_sure_want_to_delete_selected_items'),
        },
    ];

    return (
        <>
            <Header {...props} aclProductList={aclProductList} />
            {desktop ? (
                <Table
                    filters={filters}
                    actions={actions}
                    rows={rows}
                    getRows={getProductList}
                    loading={loading}
                    columns={columns}
                    count={productTotal}
                    showCheckbox
                    hideActions={!isAllowDeleteProduct}
                    recordName="product"
                />
            )
                : (
                    <CustomList
                        filters={filters}
                        actions={actions}
                        rows={rows}
                        getRows={getProductList}
                        loading={loading}
                        columns={columns}
                        count={productTotal}
                        showCheckbox
                        hideActions={!isAllowDeleteProduct}
                        recordName="product"
                        hideColumn={false}
                        checkboxAll
                        twoColumns
                        handleClickRow={(id) => Router.push(`/product/productlist/edit/${id}`)}
                        usePagination
                    />
                )}
        </>
    );
};

export default ProductListContent;
