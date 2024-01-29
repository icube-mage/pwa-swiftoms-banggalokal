/* eslint-disable object-curly-newline */
/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Button from '@common_button';

import Table from '@sellermodules/storesetting/plugins/ProductModal/Table';
import gqlProduct from '@sellermodules/catalog/services/graphql';
import useStyles from '@sellermodules/storesetting/plugins/ProductModal/style';

const ProductModalContent = (props) => {
    const {
        t, open, onClose, formik,
    } = props;
    const classes = useStyles();
    const [checkedRows, setCheckedRows] = useState([]);
    const [getSellerProducts, { data, loading }] = gqlProduct.getSellerProducts();

    const productList = (data && data.getSellerProducts && data.getSellerProducts.items) || [];
    const productTotal = (data && data.getSellerProducts && data.getSellerProducts.total_count) || 0;

    const columns = [
        { field: 'product_name', headerName: t('storesetting:Product_Name') },
        { field: 'price_formatted', headerName: t('storesetting:Price') },
    ];

    const rows = productList.map((product) => ({
        entity_id: product.entity_id,
        product_name: () => (
            <div className={classes.infoDiv}>
                <Grid container spacing={3} justifyContent="center" alignItems="center">
                    <Grid item xs={12} sm={2}>
                        <div
                            className={classes.img}
                            style={{
                                backgroundImage: `url(${product.images?.[0]?.url || '/assets/img/placeholder_image.jpg'})`,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <div>{product.name}</div>
                        <div>{`SKU : ${product.vendor_sku}`}</div>
                    </Grid>
                </Grid>
            </div>
        ),
        price_formatted: product.price_formatted,
        images: product.images,
        name: product.name,
    }));

    const disableSubmit = !checkedRows.length;

    const handleSubmit = () => {
        formik.setFieldValue('products', checkedRows.map((item) => ({ ...item, image: item.images?.[0]?.url })));
        onClose();
        setCheckedRows([]);
    };

    useEffect(() => { setCheckedRows([]); }, [open]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            classes={{ paper: classes.dialogContainer }}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle className={classes.dialogTitleContainer}>
                {t('storesetting:Select_Product')}
                <IconButton className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.content}>
                <Table
                    columns={columns}
                    getRows={getSellerProducts}
                    rows={rows}
                    loading={loading}
                    count={productTotal}
                    searchPlaceholder={t('storesetting:Search_product_name_or_SKU')}
                    t={t}
                    handleChecked={(e) => setCheckedRows(e)}
                    defaultChecked={formik.values.products}
                />
                <div className={classes.containerBtn}>
                    <Button
                        className={clsx(classes.btn, disableSubmit && 'disabled')}
                        onClick={handleSubmit}
                        disabled={disableSubmit}
                    >
                        {t('storesetting:Submit')}
                    </Button>
                </div>
            </DialogContent>
            {/* <DialogContent className={clsx(classes.content, 'full')}>
                <div className={classes.containerBtn}>
                    <Button
                        className={clsx(classes.btn, disableSubmit && 'disabled')}
                        onClick={handleSubmit}
                        disabled={disableSubmit}
                    >
                        {t('storesetting:Submit')}
                    </Button>
                </div>
            </DialogContent> */}
        </Dialog>
    );
};

export default ProductModalContent;
