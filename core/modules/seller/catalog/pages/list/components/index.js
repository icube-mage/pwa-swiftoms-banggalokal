import Table from '@sellermodules/catalog/pages/list/components/Table';
import useStyles from '@modules/seller/catalog/pages/list/components/style';

const CatalogListContent = (props) => {
    const {
        data, loading, getSellerProducts, t, categories, dataEtalase, dataEtalaseMove,
        handleUpdateStatus, handleDeleteProduct,
        handleMoveProduct,
    } = props;
    const productList = (data && data.getSellerProducts && data.getSellerProducts.items) || [];
    const productTotal = (data && data.getSellerProducts && data.getSellerProducts.total_count) || 0;
    const classes = useStyles();

    const columns = [
        { field: 'name', headerName: t('sellercatalog:Product_Name'), sortable: true },
        { field: 'vendor_sku', headerName: t('sellercatalog:SKU') },
        { field: 'price', headerName: t('sellercatalog:Price'), sortable: true },
        { field: 'status', headerName: t('sellercatalog:Status') },
        { field: 'approval_status', headerName: t('sellercatalog:Approval_Status'), sortable: true },
        { field: 'stock', headerName: t('sellercatalog:Stock') },
    ];

    const rows = productList.map((product) => ({
        ...product,
        approval_status: product.approval_status ? t('sellercatalog:Approved') : t('sellercatalog:Not_Approved'),
        price: product.price_formatted,
        stock: () => (
            <>
                {product.location_stock.map((e) => (
                    <div className={classes.divStock}>
                        <span>{`${e.location.loc_name} : ${e.stock}`}</span>
                    </div>
                ))}
            </>
        ),
    }));

    return (
        <Table
            header={t('sellerincome:Catalog')}
            columns={columns}
            getRows={getSellerProducts}
            rows={rows}
            loading={loading}
            count={productTotal}
            searchPlaceholder={t('common:Search_product_name_or_SKU')}
            t={t}
            categories={categories}
            dataEtalase={dataEtalase}
            dataEtalaseMove={dataEtalaseMove}
            handleUpdateStatus={handleUpdateStatus}
            handleDeleteProduct={handleDeleteProduct}
            handleMoveProduct={handleMoveProduct}
        />
    );
};

export default CatalogListContent;
