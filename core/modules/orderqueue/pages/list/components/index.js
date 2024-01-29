/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
import React from 'react';
import Router from 'next/router';
import Link from 'next/link';
import Table from '@common_table';
import CustomList from '@common_customlist';
import Autocomplete from '@common_autocomplete';
import TextField from '@common_textfield';
import channelGqlService from '@modules/channel/services/graphql';
import Header from '@modules/orderqueue/pages/list/components/Header';
import useStyles from '@modules/orderqueue/pages/list/components/style';
import { optionsStatus, optionsPaymentStatus } from '@modules/orderqueue/helpers';
import { breakPointsUp } from '@helper_theme';

const OrderQueueListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getOrderQueueList, varExport, handleExport, setVarExport, t } = props;
    const orderQueueList = (data && data.getOrderQueueList && data.getOrderQueueList.items) || [];
    const orderQueueTotal = (data && data.getOrderQueueList && data.getOrderQueueList.total_count) || 0;
    const desktop = breakPointsUp('sm');

    const columns = [
        { field: 'id', headerName: t('order:ID'), sortable: true, hidden: true },
        { field: 'channel_order_increment_id', headerName: t('order:Channel_Order_Number'), sortable: true, hideable: true },
        { field: 'channel_order_id', headerName: t('order:Marketplace_Order_Number'), sortable: true, hideable: true, hidden: true },
        { field: 'created_at', headerName: t('order:Channel_Order_Date'), sortable: true, hideable: true, initialSort: 'DESC' },
        { field: 'channel_order_status', headerName: t('order:Channel_Order_Status'), sortable: true, hideable: true },
        { field: 'last_updated', headerName: t('order:Last_Updated'), sortable: true, hideable: true },
        { field: 'channel_code', headerName: t('order:Channel_Code'), sortable: true, hideable: true },
        { field: 'status', headerName: t('order:Queue_Status'), sortable: true, hideable: true },
        { field: 'payment_confirmation_status', headerName: t('order:Payment_Confirmation_Status'), hideable: true, hidden: true },
        { field: 'error_log', headerName: t('order:Error_Log'), sortable: true, hideable: true },
        { field: 'actions', headerName: t('order:Action'), hidden: !desktop },
    ];

    const filters = [
        { field: 'channel_order_increment_id', name: 'channel_order_increment_id', type: 'like', label: t('order:Channel_Order_Number'), initialValue: '' },
        { field: 'channel_order_id', name: 'channel_order_id', type: 'like', label: t('order:Marketplace_Order_Number'), initialValue: '' },
        {
            field: 'channel_code',
            name: 'channel_code',
            type: 'eq',
            label: t('order:Channel_Code'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const [getChannelList, getChannelListRes] = channelGqlService.getChannelList();
                const channelOptions = (getChannelListRes
                    && getChannelListRes.data
                    && getChannelListRes.data.getChannelList
                    && getChannelListRes.data.getChannelList.items) || [];
                const primaryKey = 'channel_code';
                const labelKey = 'channel_name';
                return (
                    <Autocomplete
                        mode="lazy"
                        getOptions={getChannelList}
                        value={channelOptions.find((e) => e[primaryKey] === filterValue)}
                        onChange={(newValue) => setFilterValue(newValue && newValue[primaryKey])}
                        options={channelOptions}
                        primaryKey={primaryKey}
                        labelKey={labelKey}
                    />
                );
            },
        },
        {
            field: 'status',
            name: 'status',
            type: 'eq',
            label: t('order:Queue_Status'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <Autocomplete
                    value={optionsStatus.find((e) => e.idValue === filterValue)}
                    onChange={(newValue) => setFilterValue(newValue && newValue.idValue)}
                    options={optionsStatus}
                />
            ),
        },
        {
            field: 'payment_confirmation_status',
            name: 'payment_confirmation_status',
            type: 'eq',
            label: t('order:Payment_Confirmation_Status'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <Autocomplete
                    value={optionsPaymentStatus.find((e) => e.value === filterValue)}
                    onChange={(newValue) => setFilterValue(newValue && newValue.value)}
                    options={optionsPaymentStatus}
                />
            ),
        },
        { field: 'error_log', name: 'error_log', type: 'like', label: t('order:Error_Log'), initialValue: '' },
        {
            field: 'created_at',
            name: 'created_at_from',
            type: 'from',
            label: t('order:Channel_Order_Date_From'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    id="date"
                    type="date"
                    value={filterValue?.split(' ').slice(0, 1).join('')}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(newValue) => {
                        newValue.target.value ? setFilterValue(`${newValue.target.value} 00:00:00`)
                            : setFilterValue(`${newValue.target.value}`);
                    }}
                    InputProps={{
                        className: classes.fieldInputFilter,
                    }}
                />
            ),
        },
        {
            field: 'created_at',
            name: 'created_at_to',
            type: 'to',
            label: t('order:Channel_Order_Date_To'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    id="date"
                    type="date"
                    value={filterValue?.split(' ').slice(0, 1).join('')}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(newValue) => {
                        newValue.target.value ? setFilterValue(`${newValue.target.value} 23:59:59`)
                            : setFilterValue(`${newValue.target.value}`);
                    }}
                    InputProps={{
                        className: classes.fieldInputFilter,
                    }}
                />
            ),
        },
    ];

    const getClassByStatus = (status) => {
        if (status === 'failed') {
            return classes.statusFailed;
        }
        if (status === 'new') {
            return classes.statusProcessing;
        }
        if (status === 'allocating') {
            return classes.statusAllocating;
        }
        return classes.statusSuccess;
    };
    const getClassByChannelOrderStatus = (channel_order_status) => {
        if (channel_order_status === 'canceled') {
            return classes.statusFailed;
        }
        if (channel_order_status === 'processing') {
            return classes.statusProcessing;
        }
        if (channel_order_status === 'closed') {
            return classes.statusClosed;
        }
        return classes.statusSuccess;
    };

    const rows = orderQueueList.map((orderQueue) => ({
        ...orderQueue,
        id: orderQueue.id,
        actions: () => (
            <Link href={`/order/allorder/edit/${orderQueue.id}`}>
                <a className="link-button">{t('order:View')}</a>
            </Link>
        ),
        status: () => (
            <div className={getClassByStatus(orderQueue.status)} style={{ textTransform: 'capitalize' }}>
                {orderQueue.status}
            </div>
        ),
        channel_order_status: () => (
            <div className={getClassByChannelOrderStatus(orderQueue.channel_order_status)} style={{ textTransform: 'capitalize' }}>
                {orderQueue.channel_order_status}
            </div>
        ),
    }));

    return (
        <>
            <Header t={t} />
            {desktop
                ? (
                    <Table
                        filters={filters}
                        hideActions
                        rows={rows}
                        getRows={getOrderQueueList}
                        loading={loading}
                        columns={columns}
                        count={orderQueueTotal}
                        showCheckbox
                        handleExport={handleExport}
                        varExport={varExport}
                        setVarExport={setVarExport}
                        exportWithId
                    />
                )
                : (
                    <CustomList
                        filters={filters}
                        hideActions
                        rows={rows}
                        getRows={getOrderQueueList}
                        loading={loading}
                        columns={columns}
                        count={orderQueueTotal}
                        showCheckbox
                        handleExport={handleExport}
                        varExport={varExport}
                        setVarExport={setVarExport}
                        exportWithId
                        hideColumn={false}
                        checkboxAll
                        twoColumns
                        handleClickRow={(id) => Router.push(`/order/allorder/edit/${id}`)}
                        recordName="order(s)"
                        usePagination
                    />
                )}
        </>
    );
};

export default OrderQueueListContent;
