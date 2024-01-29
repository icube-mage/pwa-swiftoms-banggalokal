/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-newline */
import React from 'react';
import Box from '@material-ui/core/Box';

import Table from '@common_table';
import Button from '@common_button';

const ProductListContent = (props) => {
    const { data, loading, getBundleOptionList, t, handleClose, formik, openBundel } = props;

    const productList = (data && data.getBundleOptionList && data.getBundleOptionList.items) || [];
    const productTotal = (data && data.getBundleOptionList && data.getBundleOptionList.total_count) || 0;

    const [checked, setChecked] = React.useState([]);

    const columns = [
        { field: 'entity_id', headerName: t('productlist:ID'), hideable: true, sortable: true, initialSort: 'ASC' },
        { field: 'name', headerName: t('productlist:Product_Name'), hideable: true, sortable: true },
        { field: 'sku', headerName: t('productlist:SKU'), hideable: true, sortable: true },
        {
            field: 'product_price',
            headerName: t('productlist:Price'),
            hideable: true,
            hidden: !(!formik.values.is_fixed_bundle && !formik.values.price_type),
        },
    ];

    const filters = [
        { field: 'entity_id', name: 'entity_id_from', type: 'from', label: t('productlist:ID_From'), initialValue: '' },
        { field: 'entity_id', name: 'entity_id_to', type: 'to', label: t('productlist:ID_To'), initialValue: '' },
        { field: 'name', name: 'name', type: 'like', label: t('productlist:Product_Name'), initialValue: '' },
        { field: 'sku', name: 'sku', type: 'like', label: t('productlist:SKU'), initialValue: '' },
    ];

    const rows = productList.map((product) => ({
        ...product,
        id: product.entity_id,
    }));

    const addSelectedProducts = () => {
        const checkedMap = checked.map((el) => ({
            ...el,
            price: Number(el.product_price.replace(/[^0-9.-]+/g, '')),
            is_delete: false,
            is_default: true,
            qty: null,
            qty_edit: false,
        }));
        const temp = [...formik.values.bundle_options[openBundel].values, ...checkedMap];
        formik.setFieldValue(`bundle_options[${openBundel}].values`, temp);
        handleClose();
    };

    return (
        <>
            <Box sx={{
                display: 'flex', flexDirection: 'row', pt: 2, mb: 2, justifyContent: 'end',
            }}
            >
                <Button
                    buttonType="link"
                    onClick={handleClose}
                >
                    {t('productList:Cancel')}
                </Button>
                <Button
                    buttonType="primary-rounded"
                    onClick={addSelectedProducts}
                >
                    {t('productList:Add_Selected_Products')}
                </Button>
            </Box>
            <Table
                filters={filters}
                rows={rows}
                getRows={getBundleOptionList}
                loading={loading}
                columns={columns}
                count={productTotal}
                showCheckbox
                hideActions
                hideColumns
                handleChecked={(e) => setChecked(e)}
                recordName="product"
            />
        </>
    );
};

export default ProductListContent;
