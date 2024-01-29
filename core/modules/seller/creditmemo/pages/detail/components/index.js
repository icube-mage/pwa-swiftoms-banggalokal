import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';

import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import Grid from '@material-ui/core/Grid';

import ItemsTable from '@sellermodules/creditmemo/pages/detail/components/ItemsTable';
import Information from '@sellermodules/creditmemo/pages/detail/components/Information';
import useStyles from '@sellermodules/creditmemo/pages/detail/components/style';

const dataEditContent = (props) => {
    const { t, data } = props;
    const { creditmemo, order } = data;

    const router = useRouter();
    const classes = useStyles();

    return (
        <div style={{ paddingBottom: 10 }}>
            <div className={classes.headerContainer}>
                <IconButton
                    aria-label="back"
                    onClick={() => router.push({
                        pathname: '/seller/return/detail/[id]',
                        query: { id: router.query.id },
                    })}
                >
                    <ArrowBackOutlinedIcon />
                </IconButton>
                <h2 className={clsx(classes.title, 'base')}>{t('sellerreturn:Return_Detail')}</h2>
            </div>

            <Paper className={classes.paper}>
                <h2 className={clsx(classes.title, 'padding')}>{t('sellerreturn:Items_Refunded')}</h2>
                <ItemsTable {...props} data={creditmemo} />
                <div className={classes.itemsGrid}>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={8} />

                        <Grid item xs={12} sm={4}>
                            <Grid item container spacing={3}>
                                <Grid item xs={6}>
                                    <div className={classes.subtitle}>{t('sellerreturn:Subtotal')}</div>
                                </Grid>
                                <Grid item xs={6} className="right">
                                    <div>{creditmemo.subtotal}</div>
                                </Grid>
                            </Grid>
                            <Grid item container spacing={3}>
                                <Grid item xs={6}>
                                    <div className={classes.subtitle}>
                                        {t('sellerreturn:Discount')}
                                        {order.coupon_code && !order.only_free_shipping_coupon_code
                                            && ` (${order.coupon_code})`}
                                    </div>
                                </Grid>
                                <Grid item xs={6} className="right">
                                    <div>{creditmemo.discount}</div>
                                </Grid>
                            </Grid>
                            <Grid item container spacing={3} alignItems="center">
                                <Grid item xs={6}>
                                    <div className={classes.subtitle}>
                                        {t('sellerreturn:Refund_Shipping')}
                                        {order.coupon_code && !!order.only_free_shipping_coupon_code
                                            && ` (${order.coupon_code})`}
                                    </div>
                                </Grid>
                                <Grid item xs={6} className="right">
                                    <div>{creditmemo.shipping_amount}</div>
                                </Grid>
                            </Grid>
                            <Grid item container spacing={3} alignItems="center">
                                <Grid item xs={6}>
                                    <div className={classes.subtitle}>{t('sellerreturn:Adjusment_Refund')}</div>
                                </Grid>
                                <Grid item xs={6} className="right">
                                    <div>{creditmemo.adjustment_refund}</div>
                                </Grid>
                            </Grid>
                            <Grid item container spacing={3} alignItems="center">
                                <Grid item xs={6}>
                                    <div className={classes.subtitle}>{t('sellerreturn:Adjusment_Fee')}</div>
                                </Grid>
                                <Grid item xs={6} className="right">
                                    <div>{creditmemo.adjustment_fee}</div>
                                </Grid>
                            </Grid>
                            <Grid item container spacing={3}>
                                <Grid item xs={6}>
                                    <div className={clsx(classes.subtitle, 'primaryText')}>{t('sellerreturn:Grand_Total')}</div>
                                </Grid>
                                <Grid item xs={6} className="right">
                                    <div className={clsx(classes.subtitle, 'primaryText')}>{creditmemo.grand_total}</div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </Paper>

            <Paper className={clsx(classes.paper, 'padding')}>
                <h2 className={clsx(classes.title)}>{t('sellerreturn:Order_Information')}</h2>
                <Information {...props} data={order} />
            </Paper>
        </div>
    );
};

export default dataEditContent;
