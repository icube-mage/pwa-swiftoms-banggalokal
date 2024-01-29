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

import Table from '@sellermodules/promotion/pages/discount/list/components/ProductModal/Table';
import gqlService from '@sellermodules/promotion/services/graphql';
import useStyles from '@sellermodules/promotion/pages/discount/list/components/ProductModal/style';

const ProductModalContent = (props) => {
    const {
        t, open, onClose, dataCat, dataEtalase, handleSubmit,
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
        selected_variants: product.variants.map((variant) => ({
            ...variant,
            discount_price: '',
            discount: '',
            from: null,
            to: null,
            isChild: true,
        })),
        discount_price: '',
        discount: '',
        from: null,
        to: null,
        image: product.images?.[0]?.url,
    }));

    const disableSubmit = checkedRows.length === 0 || !checkedRows.every((row) => (row.isParent ? !!row.selected_variants?.length : true));

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
                    dataCat={dataCat}
                    dataEtalase={dataEtalase}
                    handleChecked={(e) => setCheckedRows(e)}
                    fetchMore={fetchMore}
                />
                <div className={classes.containerBtn}>
                    <Button
                        className={clsx(classes.btn, disableSubmit && 'disabled')}
                        onClick={() => handleSubmit(checkedRows)}
                        disabled={disableSubmit}
                    >
                        {t('sellerpromotion:Add_Product')}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProductModalContent;
