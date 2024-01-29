/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import TextField from '@common_textfield';
import Autocomplete from '@common_autocomplete';
import { optionsStatus } from '@modules/orderreallocation/helpers';
import useStyles from '@modules/orderreallocation/pages/list/components/style';
import Header from '@modules/orderreallocation/pages/list/components/Header';

const OrderReallocationListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getOrderReallocationList } = props;
    const orderReallocationList = (data && data.getOrderReallocationList && data.getOrderReallocationList.items) || [];
    const orderReallocationTotal = (data && data.getOrderReallocationList && data.getOrderReallocationList.total_count) || 0;

    const columns = [
        { field: 'increment_id', headerName: 'Shipment Number', sortable: true, initialSort: 'DESC' },
        { field: 'order_increment_id', headerName: 'Order Number', hideable: true, sortable: true },
        { field: 'channel_order_increment_id', headerName: 'Channel Order Number', hideable: true, sortable: true },
        { field: 'created_at', headerName: 'Order Date', hideable: true, sortable: true },
        { field: 'shipping_name', headerName: 'Recipient Name', hideable: true, sortable: true },
        { field: 'billing_name', headerName: 'Billing Name', hideable: true, sortable: true },
        { field: 'shipping_email', headerName: 'Email Address', hideable: true, sortable: true },
        { field: 'shipping_telephone', headerName: 'Phone', hideable: true, sortable: true },
        { field: 'status', headerName: 'Status', hideable: true, sortable: true },
        { field: 'loc_name', headerName: 'Location Name', hideable: true, sortable: true },
        { field: 'actions', headerName: 'Actions', hideable: true },
    ];

    const filters = [
        {
            field: 'created_at',
            name: 'created_at_from',
            type: 'from',
            label: 'Order Date From',
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    id="date"
                    type="date"
                    value={filterValue}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(newValue) => {
                        setFilterValue(newValue.target.value);
                    }}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                />
            ),
        },
        {
            field: 'created_at',
            name: 'created_at_to',
            type: 'to',
            label: 'Order Date To',
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    id="date"
                    type="date"
                    value={filterValue}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(newValue) => {
                        setFilterValue(newValue.target.value);
                    }}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                />
            ),
        },
        { field: 'increment_id', name: 'increment_id', type: 'like', label: 'Shipment Number', initialValue: '' },
        { field: 'order_increment_id', name: 'order_increment_id', type: 'like', label: 'Order Number', initialValue: '' },
        { field: 'channel_order_increment_id', name: 'channel_order_increment_id', type: 'like', label: 'Channel Order Number', initialValue: '' },
        { field: 'shipping_name', name: 'shipping_name', type: 'like', label: 'Recepient Name', initialValue: '' },
        { field: 'billing_name', name: 'billing_name', type: 'like', label: 'Billing Name', initialValue: '' },
        { field: 'shipping_email', name: 'shipping_email', type: 'like', label: 'Email Address', initialValue: '' },
        { field: 'shipping_telephone', name: 'shipping_telephone', type: 'like', label: 'Phone', initialValue: '' },
        {
            field: 'status',
            name: 'status',
            type: 'eq',
            label: 'Status',
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <Autocomplete
                    value={optionsStatus.find((e) => e.idValue === filterValue)}
                    onChange={(newValue) => setFilterValue(newValue && newValue.idValue)}
                    options={optionsStatus}
                />
            ),
        },
        { field: 'loc_name', name: 'loc_name', type: 'like', label: 'Location Name', initialValue: '' },
    ];

    const rows = orderReallocationList.map((orderReallocation) => ({
        ...orderReallocation,
        id: orderReallocation.entity_id,
        status: orderReallocation.status.label,
        actions: () => (
            <Link href={`/sales/orderreallocation/edit/${orderReallocation.entity_id}`}>
                <a className="link-button">view</a>
            </Link>
        ),
    }));

    return (
        <>
            <Header />
            <Table
                filters={filters}
                rows={rows}
                getRows={getOrderReallocationList}
                loading={loading}
                columns={columns}
                count={orderReallocationTotal}
            />
        </>
    );
};

export default OrderReallocationListContent;
