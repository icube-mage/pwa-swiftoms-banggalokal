/* eslint-disable no-unused-expressions */
/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
import React from 'react';
import Router from 'next/router';
import Link from 'next/link';
import Table from '@common_table';
import CustomList from '@common_customlist';
import Autocomplete from '@common_autocomplete';
import Header from '@modules/invoice/pages/list/components/Header';
import useStyles from '@modules/invoice/pages/list/components/style';
import channelGqlService from '@modules/channel/services/graphql';
import gqlService from '@modules/invoice/services/graphql';
import { breakPointsUp } from '@helper_theme';
import TextField from '@common_textfield';

const InvoiceListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getInvoiceList, t } = props;
    const invoiceList = (data && data.getInvoiceList && data.getInvoiceList.items) || [];
    const invoiceTotal = (data && data.getInvoiceList && data.getInvoiceList.total_count) || 0;
    const desktop = breakPointsUp('sm');

    const columns = [
        { field: 'increment_id', headerName: t('invoice:Invoice'), sortable: true, hideable: true, initialSort: 'ASC' },
        { field: 'created_at', headerName: t('invoice:Invoice_Date'), sortable: true, hideable: true },
        { field: 'channel_order_increment_id', headerName: t('invoice:Channel_Order_Number'), sortable: true, hideable: true },
        { field: 'channel_order_date', headerName: t('invoice:Channel_Order_Date'), hideable: true },
        { field: 'customer_name', headerName: t('invoice:Customer_Name'), sortable: true, hideable: true },
        { field: 'state', headerName: t('invoice:Status'), sortable: true, hideable: true },
        { field: 'grand_total', headerName: t('invoice:Grand_Total'), sortable: true, hideable: true },
        { field: 'channel_name', headerName: t('invoice:Channel'), sortable: true, hideable: true },
        { field: 'action', headerName: t('invoice:Action'), hidden: !desktop },
    ];

    const filters = [
        { field: 'increment_id', name: 'increment_id', type: 'like', label: t('invoice:Invoice'), initialValue: '' },
        { field: 'channel_order_increment_id', name: 'channel_order_increment_id', type: 'like', label: t('invoice:Channel_Order_Number'), initialValue: '' },
        {
            field: 'created_at',
            name: 'from_date',
            type: 'from',
            label: t('invoice:From_Invoice_Date'),
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
                        newValue.target.value ? setFilterValue(`${newValue.target.value} 00:00:00`)
                            : setFilterValue(`${newValue.target.value}`);
                    }}
                    InputProps={{
                        className: classes.fieldInputFilter,
                    }}
                />
            ) },
        {
            field: 'created_at',
            name: 'to_date',
            type: 'to',
            label: t('invoice:To_Invoice_Date'),
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
            ) },
        {
            field: 'channel_code',
            name: 'channel_code',
            type: 'eq',
            label: t('invoice:Channel'),
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
            field: 'state',
            name: 'state',
            type: 'eq',
            label: t('invoice:Status'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const [getInvoiceStateOptions, getInvoiceStateOptionsRes] = gqlService.getInvoiceStateOptions();
                const channelOptions = (getInvoiceStateOptionsRes
                    && getInvoiceStateOptionsRes.data
                    && getInvoiceStateOptionsRes.data.getInvoiceStateOptions) || [];
                const primaryKey = 'value';
                const labelKey = 'label';
                return (
                    <Autocomplete
                        mode="lazy"
                        getOptions={getInvoiceStateOptions}
                        value={channelOptions.find((e) => e[primaryKey].toString() === filterValue)}
                        onChange={(newValue) => setFilterValue(newValue && newValue[primaryKey].toString())}
                        options={channelOptions}
                        primaryKey={primaryKey}
                        labelKey={labelKey}
                    />
                );
            },
        },
        { field: 'customer_name', name: 'customer_name', type: 'like', label: t('invoice:Customer_Name'), initialValue: '' },
        { field: 'grand_total', name: 'from_grand_total', type: 'from', label: t('invoice:From_Grand_Total'), initialValue: '' },
        { field: 'grand_total', name: 'to_grand_total', type: 'to', label: t('invoice:To_Grand_Total'), initialValue: '' },
    ];

    const getClassByStatus = (state) => {
        if (state === 1) {
            return classes.statusSuccess;
        }
        if (state === 2) {
            return classes.statusAllocating;
        }
        return classes.statusFailed;
    };

    const rows = invoiceList.map((invoice) => ({
        ...invoice,
        id: invoice.entity_id,
        action: () => (
            <Link href={`/order/invoice/edit/${invoice.entity_id}`}>
                <a className="link-button">{t('invoice:View')}</a>
            </Link>
        ),
        state: () => (
            <div className={getClassByStatus(invoice.state)} style={{ textTransform: 'capitalize' }}>
                {invoice.state_label}
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
                        rows={rows}
                        getRows={getInvoiceList}
                        loading={loading}
                        columns={columns}
                        count={invoiceTotal}
                        hideActions
                    />
                )
                : (
                    <CustomList
                        filters={filters}
                        rows={rows}
                        getRows={getInvoiceList}
                        loading={loading}
                        columns={columns}
                        count={invoiceTotal}
                        hideActions
                        hideColumn={false}
                        twoColumns
                        handleClickRow={(id) => Router.push(`/order/invoice/edit/${id}`)}
                        recordName="invoice(s)"
                        usePagination
                    />
                )}
        </>
    );
};

export default InvoiceListContent;
