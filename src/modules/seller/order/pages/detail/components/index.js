import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';

import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Hidden from '@material-ui/core/Hidden';

import Button from '@common_button';

import StepStatus from '@sellermodules/order/pages/detail/components/StepStatus';
import StepAction from '@sellermodules/order/pages/detail/components/StepAction';
import ItemsTable from '@sellermodules/order/pages/detail/components/ItemsTable';
import ItemsSummary from '@sellermodules/order/pages/detail/components/ItemsSummary';
import HistoryTable from '@sellermodules/order/pages/detail/components/HistoryTable';
import useStyles from '@sellermodules/order/pages/detail/components/style';

const dataEditContent = (props) => {
    const {
        t, data,
    } = props;
    const router = useRouter();
    const classes = useStyles();
    const {
        customer, shipping_address, expedition, channel,
    } = data;

    return (
        <div style={{ paddingBottom: 10 }}>
            <div className={clsx(classes.headerContainer, 'hidden-mobile')}>
                <div className="left">
                    <IconButton aria-label="back" onClick={() => router.push('/seller/order')}>
                        <ArrowBackOutlinedIcon />
                    </IconButton>
                    <h2 className={classes.title}>{t('sellerorder:Order_List')}</h2>
                </div>
            </div>

            <Paper className={clsx(classes.paper, 'nopadding')}>
                <StepStatus {...props} />
                <StepAction {...props} />
            </Paper>

            <Paper className={clsx(classes.paper, 'nopadding')}>
                <h2 className={clsx(classes.title, 'padding')}>{t('sellerorder:Items_Ordered')}</h2>
                <ItemsTable {...props} />
                <ItemsSummary {...props} />
            </Paper>

            <Paper className={classes.paper}>
                <h2 className={clsx(classes.title, 'paper')}>{t('sellerorder:Order_Information')}</h2>
                <Grid container spacing={3} className={clsx(classes.itemsGrid, 'nopadding')}>
                    <Grid item xs={12} sm={3}>
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
                    <Grid item xs={12} sm={3}>
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
                    <Grid item xs={12} sm={3}>
                        <div className={classes.subtitle}>{t('sellerorder:Shipping_Method')}</div>
                        <div className={clsx(classes.subText, 'dark')}>
                            {`${expedition.provider || ''} - ${expedition.service || ''}`}
                        </div>
                        {!!(expedition?.pickup_start_time || expedition?.pickup_end_time)
                            && (
                                <div className={clsx(classes.subText, 'dark')}>
                                    {`${t('sellerorder:Pickup_Time')}: ${expedition.pickup_start_time || ''} 
                                    - ${expedition.pickup_end_time || ''}`}
                                </div>
                            )}
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <div className={classes.subtitle}>{t('sellerorder:Channel')}</div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {channel?.logo && (
                                <div className={clsx(classes.divider, classes.channelLogo, 'content-center')}>
                                    <Tooltip title={channel?.name || 'channel-logo'}>
                                        <img src={channel.logo} alt={channel?.name || 'channel-logo'} />
                                    </Tooltip>
                                </div>
                            )}
                            <div className={clsx(classes.subText, 'dark')}>
                                {channel?.name || '-'}
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Paper>

            <Paper className={clsx(classes.paper, 'nopadding')}>
                <h2 className={clsx(classes.title, 'padding')}>{t('sellerorder:Status_History')}</h2>
                <HistoryTable {...props} />
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
            <Hidden smUp implementation="css">
                <div style={{ height: 60 }} />
            </Hidden>
        </div>
    );
};

export default dataEditContent;
