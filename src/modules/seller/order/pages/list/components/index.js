/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';

import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Grid from '@material-ui/core/Grid';

import CardList from '@sellermodules/order/pages/list/components/ListCard';
import useStyles from '@sellermodules/order/pages/list/components/style';

import Tooltip from '@material-ui/core/Tooltip';

const transformOrderList = (status = 'success', data) => {
    switch (status) {
    case 'success':
        return {
            orderList: data?.getSellerOrders?.items || [],
            orderTotal: data?.getSellerOrders?.total_count || 0,
        };
    case 'failed':
        return {
            orderList: data?.getSellerOrderQueueList?.items || [],
            orderTotal: data?.getSellerOrderQueueList?.total_count || 0,
        };
    case 'sync_failed':
        return {
            orderList: data?.getSellerOrderSyncStatusList?.items || [],
            orderTotal: data?.getSellerOrderSyncStatusList?.total_count || 0,
        };
    default:
        return {
            orderList: [],
            orderTotal: [],
        };
    }
};

const OrderListContent = (props) => {
    const router = useRouter();
    const classes = useStyles();
    const { status } = router.query;
    const isFailedAllocation = status?.includes('failed');

    const {
        data, loading, getSellerOrders, t, dataProvider, dataLocation, dataSellerChannelList, dataSellerOrderStatus, dataOrderPaymentStatus,
        checked, setChecked, handleRetry, doRefetch, setDoRefetch, ...other
    } = props;

    const transformedOrderList = transformOrderList(status, data);

    const columns = [
        { field: 'id', hidden: true },
        { field: 'order_date', sortable: true, hidden: true, initialSort: 'DESC' },
        { field: 'picture' },
        { field: 'location', headerName: t('sellerorder:Order_Location'), hidden: isFailedAllocation },
        { field: 'address', headerName: t('sellerorder:Address') },
        { field: 'total', headerName: t('sellerorder:Order_Total') },
        { field: 'expedition', headerName: t('sellerorder:Expedition') },
        { field: 'receipt', headerName: t('sellerorder:Receipt_Number') },
    ];

    const columnsSyncFailed = [
        { field: 'id', hidden: true },
        { field: 'order_number', sortable: true, headerName: t('sellerorder:Order_Number') },
        { field: 'order_date', sortable: true, headerName: t('sellerorder:Order_Date'), initialSort: 'DESC' },
        { field: 'status', headerName: t('sellerorder:Order_Status') },
        { field: 'channel', headerName: t('sellerorder:Sales_Channels') },
    ];

    const rows = transformedOrderList.orderList.map((order) => ({
        ...order,
        id: !isFailedAllocation ? order.entity_id : order.id,
        header: () => (
            <div className={classes.head}>
                <div className={clsx(classes.orderStatusLabel, order?.status?.code || '')}>{order?.status?.label || '-'}</div>
                <div className={clsx(classes.divider, 'slash')} />
                <span className={clsx(classes.divider, 'primary')}>{order.order_number}</span>
                <div className={clsx(classes.divider, 'slash')} />
                <div className={clsx(classes.divider, 'slash')}>
                    <PersonOutlineIcon />
                    <div className={clsx(classes.divider, 'space')} />
                    {order.customer.name}
                </div>
                <div
                    className={clsx(classes.divider, {
                        slash: !!order.acceptance_deadline || !!order.channel?.logo,
                    })}
                >
                    <ScheduleIcon />
                    <div className={clsx(classes.divider, 'space')} />
                    {order.order_date}
                </div>
                {!!order.acceptance_deadline && (
                    <div
                        className={clsx(classes.divider, {
                            slash: !!order.channel?.logo,
                        })}
                    >
                        {t('sellerorder:Acceptance_Deadline')}
                        <div className={clsx(classes.divider, 'space')} />
                        -
                        <div className={clsx(classes.divider, 'space')} />
                        <span style={{ color: 'red' }}>
                            {order.acceptance_deadline}
                        </span>
                    </div>
                )}
                {!!order.channel?.logo && (
                    <div className={clsx(classes.divider, classes.channelLogo, 'content-center')}>
                        <Tooltip title={order.channel?.name || 'channel-logo'}>
                            <img src={order.channel.logo} alt={order.channel?.name || 'channel-logo'} />
                        </Tooltip>
                    </div>
                )}
            </div>
        ),
        picture: () => {
            const itemPreview = order.item_preview.items;
            if (itemPreview.item_bundle) {
                return (
                    <Grid container className={classes.imgContainer} alignItems="center">
                        <Grid item xs={12} md="auto">
                            <div className={classes.flex}>
                                {itemPreview.item_bundle.map((item, idx) => (
                                    <div className={classes.flex}>
                                        <div
                                            className={classes.imgGrid}
                                            style={{ backgroundImage: `url(${item.image || '/assets/img/placeholder_image.jpg'})` }}
                                            alt="ord-img"
                                        />

                                        <div className={classes.plus}>
                                            {(idx !== (itemPreview.item_bundle?.length - 1)) && '+'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            {itemPreview.name}
                        </Grid>
                        <Grid item xs={12}>
                            {`${itemPreview.qty} x ${itemPreview.price}`}
                        </Grid>
                    </Grid>
                );
            }
            return (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Grid container className={classes.imgContainer}>
                        <Grid item xs={12} md={4} style={{ marginRight: 10 }}>
                            <div
                                className={classes.img}
                                style={{ backgroundImage: `url(${itemPreview.image || '/assets/img/placeholder_image.jpg'})` }}
                                alt="ord-img"
                            />
                        </Grid>
                        <Grid item xs={12} md={8} container direction="column" spacing={2}>
                            <Grid item xs>
                                {itemPreview.name || '-'}
                            </Grid>
                            <Grid item>
                                {`${itemPreview.qty} x ${!isFailedAllocation ? itemPreview.price : itemPreview.sell_price}`}
                            </Grid>
                        </Grid>
                    </Grid>
                    {order.item_preview.qty_more >= 1 ? (
                        <span style={{ marginTop: 10, fontWeight: 'bold' }}>
                            {`+ ${order.item_preview.qty_more} Other Products`}
                        </span>
                    ) : null}
                </div>
            );
        },
        address: () => (
            <div>
                {order.customer.name}
                <br />
                {order.shipping_address.region}
            </div>
        ),
        total: order.grand_total,
        expedition: () => {
            if (isFailedAllocation) {
                return `${order?.provider || ''} - ${order?.service || ''}`;
            }
            return `${order?.expedition?.provider || ''} - ${order?.expedition?.service || ''}`;
        },
        receipt: order.tracks?.track_number,
        location: !isFailedAllocation ? order.location.loc_name : '',
    }));

    const rowsSyncFailed = transformedOrderList.orderList.map((order) => ({
        ...order,
        id: order.entity_id,
        status: order.status?.label || '-',
        channel: (
            <div className={classes.channelContainer}>
                <div
                    className={classes.channelIcon}
                    style={{ backgroundImage: `url(${order.channel?.logo || '/assets/img/placeholder_image.jpg'})` }}
                />
                {order.channel?.name || '-'}
            </div>
        ),
    }));

    const actions = [
        {
            label: t('sellerorder:Print_Label'),
            message: t('sellerorder:Ready_for_print_'),
            onClick: () => {
                const checkedIds = checked.map((check) => check.id);
                window.open(`/seller/order/printlabel/${checkedIds.join('/')}`);
            },
            showMessage: false,
        },
        {
            label: t('sellerorder:Print_Invoice'),
            message: t('sellerorder:Ready_for_print_'),
            onClick: () => {
                const checkedIds = checked.map((check) => check.id);
                window.open(`/seller/order/printinvoice/${checkedIds.join('/')}`);
            },
            showMessage: false,
        },
    ];

    const actionsCheck = [
        {
            label: t('sellerorder:Resync'),
            onClick: () => {
                const input = checked.map(({ channel_code, id, table_source }) => ({ channel_code, id: String(id), table_source }));
                handleRetry(input);
            },
            showMessage: false,
        },
    ];

    return (
        <>
            <CardList
                columns={columns}
                getRows={getSellerOrders}
                actions={actions}
                rows={rows}
                loading={loading}
                count={transformedOrderList.orderTotal}
                showCheckbox={status !== 'failed'}
                useTabs
                handleClickRow={(row) => router.push({
                    pathname: `/seller/order/${isFailedAllocation ? 'failed/' : ''}detail/[id]`,
                    query: { id: row.id },
                })}
                t={t}
                dataProvider={dataProvider}
                dataLocation={dataLocation}
                dataSellerChannelList={dataSellerChannelList}
                dataSellerOrderStatus={dataSellerOrderStatus}
                dataOrderPaymentStatus={dataOrderPaymentStatus}
                handleChecked={(row) => setChecked(row)}
                columnsSyncFailed={columnsSyncFailed}
                rowsSyncFailed={rowsSyncFailed}
                actionsCheck={actionsCheck}
                doRefetch={doRefetch}
                setDoRefetch={setDoRefetch}
                {...other}
            />
        </>
    );
};

export default OrderListContent;
