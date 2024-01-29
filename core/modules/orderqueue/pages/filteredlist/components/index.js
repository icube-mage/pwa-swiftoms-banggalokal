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
import Header from '@modules/orderqueue/pages/filteredlist/components/Header';
import useStyles from '@modules/orderqueue/pages/filteredlist/components/style';
import { optionsPaymentStatus } from '@modules/orderqueue/helpers';
import { breakPointsUp } from '@helper_theme';

const OrderQueueListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getOrderQueueList, setReallocation, headerTitle,
        getSalesOrderList, dataSales, loadingSales, isSales, setOrderAsNew,
        varExport, setVarExport, tab_status, exportOrderToCsv, t } = props;

    const orderQueueList = isSales ? (dataSales && dataSales.getSalesOrderList && dataSales.getSalesOrderList.items) || []
        : (data && data.getOrderQueueList && data.getOrderQueueList.items) || [];
    const orderQueueTotal = isSales ? (dataSales && dataSales.getSalesOrderList && dataSales.getSalesOrderList.total_count) || 0
        : (data && data.getOrderQueueList && data.getOrderQueueList.total_count) || 0;

    const desktop = breakPointsUp('sm');

    const columns = [
        { field: isSales ? 'entity_id' : 'id', headerName: t('order:ID'), sortable: true, initialSort: 'DESC', hidden: true },
        { field: 'channel_order_increment_id', headerName: t('order:Channel_Order_Number'), sortable: true, hideable: true },
        { field: 'channel_order_id', headerName: t('order:Marketplace_Order_Number'), sortable: true, hideable: true, hidden: true },
        { field: isSales ? 'channel_order_date' : 'created_at', headerName: t('order:Channel_Order_Date'), sortable: true, hideable: true },
        { field: 'channel_order_status', headerName: t('order:Channel_Order_Status'), sortable: true, hideable: true },
        { field: isSales ? 'updated_at' : 'last_updated', headerName: t('order:Last_Updated'), sortable: true, hideable: true },
        { field: 'acceptance_deadline', headerName: t('order:Acceptance_Deadline'), sortable: true, hideable: true },
        { field: 'channel_code', headerName: t('order:Channel_Code'), sortable: true, hideable: true },
        { field: 'status', headerName: t('order:Queue_Status'), sortable: true, hideable: !isSales, hidden: !!isSales },
        { field: 'payment_confirmation_status', headerName: t('order:Payment_Confirmation_Status'), hideable: true, hidden: true },
        { field: 'error_log', headerName: t('order:Error_Log'), sortable: true, hideable: !isSales, hidden: !!isSales },
        { field: 'actions', headerName: t('order:Action'), hidden: !desktop },
    ];

    const filters = [
        { field: 'channel_order_increment_id', name: 'channel_order_increment_id', type: 'like', label: t('order:Channel_Order_Number'), initialValue: '' },
        { field: 'channel_order_id', name: 'channel_order_id', type: 'like', label: t('order:Marketplace_Order_Number'), initialValue: '', hidden: isSales },
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
        { field: 'error_log', name: 'error_log', type: 'like', label: t('order:Error_Log'), initialValue: '', hidden: isSales },
        { field: 'tab_status', name: 'tab_status', type: 'eq', label: t('order:Tab_Status'), class: 'fixed', initialValue: tab_status, hidden: true },
        {
            field: isSales ? 'channel_order_date' : 'created_at',
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
            field: isSales ? 'channel_order_date' : 'created_at',
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

    const capitalize = (text) => {
        const words = text?.split('_');
        if (words) {
            if (words?.length && words[0] === 'complete') {
                return 'Completed';
            }
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < words.length; i++) {
                words[i] = words[i][0].toUpperCase() + words[i].substr(1);
            }
            return `${words.join(' ')}`;
        }
        return '-';
    };

    const rows = orderQueueList.map((orderQueue) => ({
        ...orderQueue,
        id: isSales ? orderQueue.entity_id : orderQueue.id,
        actions: () => (
            <Link href={`/order/${tab_status}/edit/${isSales ? orderQueue.entity_id : orderQueue.id}`}>
                <a className="link-button">{t('order:View')}</a>
            </Link>
        ),
        status: () => (
            <div className={getClassByStatus(orderQueue.status)} style={{ textTransform: 'capitalize' }}>
                {capitalize(orderQueue.status)}
            </div>
        ),
        channel_order_status: () => {
            if (orderQueue.channel_order_status) {
                return (
                    <div className={getClassByChannelOrderStatus(orderQueue.channel_order_status)} style={{ textTransform: 'capitalize' }}>
                        {orderQueue.channel_order_status}
                    </div>
                );
            }
            return '-';
        },
    }));

    const actions = [
        {
            label: t('order:Set_As_New'),
            message: 'Are you sure to confirm ?',
            onClick: async (checkedRows) => {
                const id = checkedRows.map((checkedRow) => checkedRow.id);
                window.backdropLoader(true);
                await setOrderAsNew({
                    variables: {
                        id,
                    },
                });
            },
        },
        {
            label: t('order:Set_as_Reallocation'),
            message: 'Are you sure to confirm ?',
            onClick: async (checkedRows) => {
                const id = checkedRows.map((checkedRow) => checkedRow.id);
                window.backdropLoader(true);
                await setReallocation({
                    variables: {
                        id,
                    },
                });
            },
        },
    ];

    const exports = [
        {
            label: t('order:Export_No_Allocation'),
            message: 'ready for print?',
            onClick: async (checkedRows) => {
                const incrementIds = checkedRows.map((checkedRow) => Number(checkedRow.id));
                const variables = {
                    id: incrementIds,
                    filter: {
                        status: {
                            eq: 'failed',
                        },
                        error_log: {
                            eq: 'Allocation not found',
                        },
                    },
                };
                window.backdropLoader(true);
                await exportOrderToCsv({ variables });
            },
        },
        {
            label: t('order:Export_All'),
            message: 'ready for print?',
            onClick: async (checkedRows) => {
                const incrementIds = checkedRows.map((checkedRow) => Number(checkedRow.id));
                const variables = {
                    id: incrementIds,
                    filter: {
                        tab_status: { eq: 'failed' },
                    },
                };
                window.backdropLoader(true);
                await exportOrderToCsv({ variables });
            },
        },
    ];

    return (
        <>
            <Header t={t} showBulkButton={tab_status === 'failed'} headerTitle={headerTitle} />
            {desktop
                ? (
                    <Table
                        filters={filters}
                        actions={actions}
                        hideActions={tab_status !== 'failed'}
                        rows={rows}
                        getRows={isSales ? getSalesOrderList : getOrderQueueList}
                        loading={isSales ? loadingSales : loading}
                        columns={columns}
                        showCheckbox={tab_status === 'failed'}
                        count={orderQueueTotal}
                        varExport={varExport}
                        setVarExport={setVarExport}
                        exports={tab_status === 'failed' ? exports : []}
                    />
                )
                : (
                    <CustomList
                        filters={filters}
                        actions={actions}
                        hideActions={tab_status !== 'failed'}
                        rows={rows}
                        getRows={isSales ? getSalesOrderList : getOrderQueueList}
                        loading={isSales ? loadingSales : loading}
                        columns={columns}
                        showCheckbox={tab_status === 'failed'}
                        checkboxAll={tab_status === 'failed'}
                        count={orderQueueTotal}
                        varExport={varExport}
                        setVarExport={setVarExport}
                        exports={tab_status === 'failed' ? exports : []}
                        hideColumn={false}
                        twoColumns
                        handleClickRow={(id) => Router.push(`/order/${tab_status}/edit/${id}`)}
                        recordName="order(s)"
                        usePagination
                    />
                )}
        </>
    );
};

export default OrderQueueListContent;
