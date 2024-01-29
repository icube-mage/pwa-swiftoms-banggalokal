/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-newline */
import Table from '@sellermodules/storesetting/plugins/ProductTable/Table';

const ProductTableContent = (props) => {
    const { formik, t } = props;

    const productList = formik.values.products || [];

    const columns = [
        { field: 'name', headerName: t('storesetting:Product_Name') },
        { field: 'price_formatted', headerName: t('storesetting:Price') },
    ];

    const handleDeleteProduct = (ids) => {
        const temp = formik.values.products;
        formik.setFieldValue('products', temp.filter(({ entity_id }) => !ids.includes(entity_id)));
    };

    return (
        <Table
            header={t('storesetting:Catalog')}
            columns={columns}
            rows={productList}
            searchPlaceholder={t('storesetting:Search_product_name')}
            t={t}
            handleDeleteProduct={handleDeleteProduct}
        />
    );
};

export default ProductTableContent;
