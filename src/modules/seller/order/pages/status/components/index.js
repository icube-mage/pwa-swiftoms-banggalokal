import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';

import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import Grid from '@material-ui/core/Grid';

import Button from '@common_button';
import { breakPointsUp } from '@helper_theme';

import ItemsTable from '@sellermodules/order/pages/status/components/ItemsTable';
import ItemsMobile from '@sellermodules/order/pages/status/components/ItemsMobile';
import ItemsSummary from '@sellermodules/order/pages/status/components/ItemsSummary';

import useStyles from '@sellermodules/order/pages/status/components/style';

const Content = (props) => {
    const {
        t, data,
    } = props;
    const router = useRouter();
    const classes = useStyles();
    const item = data?.items[0];
    const { customer, shipping_address, channel } = item;
    const isDesktop = breakPointsUp('sm');

    return (
        <div style={{ paddingBottom: 10 }}>
            <div className={classes.headerContainer}>
                <div className="left">
                    <IconButton aria-label="back" onClick={() => router.push('/seller/order/failed')}>
                        <ArrowBackOutlinedIcon />
                    </IconButton>
                    <h2 className={classes.title}>{t('sellerorder:Order_List')}</h2>
                </div>
            </div>

            {item.order_status === 'canceled' && (
                <Paper className={clsx(classes.paper, 'nopadding')}>
                    <div className={classes.flexCanceled}>
                        <div className={classes.divCanceled}>
                            <div className="icon" style={{ backgroundImage: 'url("/assets/img/seller_order_status/Confirm.svg")' }} />
                        </div>
                        <span className="status">{t('sellerorder:Canceled')}</span>
                    </div>
                </Paper>
            )}
            <Paper className={clsx(classes.paper, 'nopadding')}>
                <h2 className={clsx(classes.title, 'padding')}>{t('sellerorder:Items_Ordered')}</h2>
                {isDesktop ? <ItemsTable {...props} data={item} /> : <ItemsMobile {...props} data={item} /> }
                <ItemsSummary {...props} data={item} />
            </Paper>

            <Paper className={classes.paper}>
                <h2 className={clsx(classes.title, 'paper')}>{t('sellerorder:Order_Information')}</h2>
                <Grid container spacing={3} className={clsx(classes.itemsGrid, 'nopadding')}>
                    <Grid item xs={12} sm={4}>
                        <div className={classes.subtitle}>{t('sellerorder:Shipping_Address')}</div>
                        <div className={clsx(classes.subText, 'dark')}>
                            {customer.name}
                            <br />
                            {shipping_address.street}
                            <br />
                            {`${shipping_address.city} ${shipping_address.postcode}`}
                            <br />
                            {shipping_address.telephone}
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <div className={classes.subtitle}>{t('sellerorder:Billing_Address')}</div>
                        <div className={clsx(classes.subText, 'dark')}>
                            {customer.name}
                            <br />
                            {shipping_address.street}
                            <br />
                            {`${shipping_address.city} ${shipping_address.postcode}`}
                            <br />
                            {shipping_address.telephone}
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <div className={classes.subtitle}>{t('sellerorder:Channel')}</div>
                        <div className={clsx(classes.subText, 'dark')}>
                            {channel?.name || '-'}
                        </div>
                    </Grid>
                </Grid>
            </Paper>

            <Grid container className={classes.btnContainer}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Button
                        variant="contained"
                        className={classes.btn}
                        onClick={() => router.push('/seller/order')}
                    >
                        <span className={classes.btnText}>
                            {t('registerseller:Back_to_Order_List')}
                        </span>
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default Content;
