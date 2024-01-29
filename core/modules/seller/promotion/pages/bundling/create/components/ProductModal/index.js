/* eslint-disable object-curly-newline */
/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import ImageIcon from '@material-ui/icons/Image';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Button from '@common_button';

import Table from '@sellermodules/promotion/pages/bundling/create/components/ProductModal/Table';
import gqlService from '@sellermodules/promotion/services/graphql';
import useStyles from '@sellermodules/promotion/pages/bundling/create/components/ProductModal/style';

const ProductModalContent = (props) => {
    const {
        t, open, onClose, categories, formik, setActiveStep, setChecked, setField,
    } = props;
    const classes = useStyles();
    const [checkedRows, setCheckedRows] = useState([]);
    const [getSellerProductPromotions, { data, loading, fetchMore }] = gqlService.getSellerProductPromotions();

    const productList = (data && data.getSellerProductPromotions && data.getSellerProductPromotions.items) || [];
    const productTotal = (data && data.getSellerProductPromotions && data.getSellerProductPromotions.total_count) || 0;

    const columns = [
        { field: 'product_information', headerName: t('sellerpromotion:Product_Information'), initialSort: 'ASC' },
        { field: 'price_formatted', headerName: t('sellerpromotion:Price') },
    ];

    const rows = productList.map((product) => ({
        ...product,
        product_information: () => (
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
        isParent: !!product.variants?.length,
        selectedVariant: product.variants.map((variant) => ({
            ...variant,
            package_price: '',
            discount: '',
        })),
        package_price: '',
        discount: '',
    }));

    const disableSubmit = checkedRows.length < 2 || !checkedRows.every((row) => (row.isParent ? !!row.selectedVariant?.length : true));

    const handleSubmit = () => {
        setActiveStep(1);
        formik.setFieldValue('bundle_options', checkedRows);
        onClose();
        setCheckedRows([]);
        setChecked([]);
        setField({
            package_price: '',
            discount: '',
        });
    };

    useEffect(() => { setCheckedRows([]); }, [open]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            classes={{ paper: classes.dialogContainer }}
            fullWidth
            maxWidth="lg"
        >
            <DialogTitle className={classes.dialogTitleContainer}>
                {t('sellerpromotion:Select_Product')}
                <IconButton className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.content}>
                <Table
                    columns={columns}
                    getRows={getSellerProductPromotions}
                    rows={rows}
                    loading={loading}
                    count={productTotal}
                    searchPlaceholder={t('sellerpromotion:Search_product_name_or_SKU')}
                    t={t}
                    categories={categories}
                    handleChecked={(e) => setCheckedRows(e)}
                    fetchMore={fetchMore}
                />
                <div className={classes.containerImg}>
                    <div className={classes.containerImg}>
                        <div>
                            {t('sellerpromotion:Bundling')}
                            {' '}
                            :
                            {' '}
                        </div>
                        <div className="flex">
                            {[...Array(3).keys()]?.map((idx) => {
                                const product = checkedRows[idx];
                                const image = product?.images?.[0]?.url;
                                return (
                                    product?.sku
                                        ? (
                                            <div className={classes.group} key={idx}>
                                                <div className={classes.imgGroup}>
                                                    <div className={classes.imgContainer}>
                                                        <img
                                                            className={classes.imgThumb}
                                                            src={image || '/assets/img/placeholder_image.jpg'}
                                                            alt="media_img"
                                                        />
                                                    </div>
                                                </div>
                                                {(idx !== 2) && '+'}
                                            </div>
                                        )
                                        : (
                                            <div className={classes.group} key={idx}>
                                                <div className={classes.imgGroup}>
                                                    <div className={classes.btnImg}>
                                                        <ImageIcon className={classes.icon} />
                                                    </div>
                                                </div>
                                                {(idx !== 2) && '+'}
                                            </div>
                                        )
                                );
                            })}
                        </div>
                    </div>
                    <Button
                        className={clsx(classes.btn, disableSubmit && 'disabled')}
                        onClick={handleSubmit}
                        disabled={disableSubmit}
                    >
                        {t('sellerpromotion:Submit')}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProductModalContent;
