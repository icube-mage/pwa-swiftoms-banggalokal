/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import Table from '@common_table';
import CustomList from '@common_customlist';
import TextField from '@common_textfield';
import Autocomplete from '@common_autocomplete';
import { optionsStatus } from '@modules/creditmemos/helpers';
import useStyles from '@modules/creditmemos/pages/list/components/style';
import Header from '@modules/creditmemos/pages/list/components/Header';
import { breakPointsUp } from '@helper_theme';

const CreditmemoListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getCreditMemoList, t } = props;
    const creditmemoList = (data && data.getCreditMemoList && data.getCreditMemoList.items) || [];
    const creditmemoTotal = (data && data.getCreditMemoList && data.getCreditMemoList.total_count) || 0;
    const desktop = breakPointsUp('sm');

    const columns = [
        { field: 'increment_id', headerName: t('creditmemos:Credit_Memo'), hideable: true, sortable: true },
        { field: 'created_at', headerName: t('creditmemos:Created_At'), hideable: true, sortable: true, initialSort: 'DESC' },
        { field: 'channel_order_increment_id', headerName: t('creditmemos:Channel_Order_Number'), hideable: true, sortable: true },
        { field: 'channel_order_date', headerName: t('creditmemos:Channel_Order_Date'), hideable: true, sortable: true },
        { field: 'billing_name', headerName: t('creditmemos:Billto_Name'), hideable: true, sortable: true },
        { field: 'state', headerName: t('creditmemos:Status'), hideable: true, sortable: true },
        { field: 'grand_total', headerName: t('creditmemos:Refunded'), hideable: true, sortable: true },
        { field: 'actions', headerName: t('creditmemos:Action') },
    ];

    const filters = [
        {
            field: 'created_at',
            name: 'created_at_from',
            type: 'from',
            label: t('creditmemos:Created_From'),
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
                        className: classes.fieldInput,
                    }}
                />
            ),
        },
        {
            field: 'created_at',
            name: 'created_at_to',
            type: 'to',
            label: t('creditmemos:Created_To'),
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
                        newValue.target.value ? setFilterValue(`${newValue.target.value} 23:59:59`)
                            : setFilterValue(`${newValue.target.value}`);
                    }}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                />
            ),
        },
        {
            field: 'channel_order_date',
            name: 'channel_order_date_from',
            type: 'from',
            label: t('creditmemos:Channel_Order_Date_From'),
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
                        className: classes.fieldInput,
                    }}
                />
            ),
        },
        {
            field: 'channel_order_date',
            name: 'channel_order_date_to',
            type: 'to',
            label: t('creditmemos:Channel_Order_Date_To'),
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
                        newValue.target.value ? setFilterValue(`${newValue.target.value} 23:59:59`)
                            : setFilterValue(`${newValue.target.value}`);
                    }}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                />
            ),
        },
        { field: 'grand_total', name: 'grand_total_from', type: 'from', label: t('creditmemos:Refunded_From'), initialValue: '' },
        { field: 'grand_total', name: 'grand_total_to', type: 'to', label: t('creditmemos:Refunded_To'), initialValue: '' },
        { field: 'increment_id', name: 'increment_id', type: 'like', label: t('creditmemos:Credit_Memo'), initialValue: '' },
        { field: 'channel_order_increment_id', name: 'channel_order_increment_id', type: 'like', label: t('creditmemos:Channel_Order_Number'), initialValue: '' },
        { field: 'billing_name', name: 'billing_name', type: 'like', label: t('creditmemos:Billto_Name'), initialValue: '' },
        {
            field: 'state',
            name: 'state',
            type: 'eq',
            label: t('creditmemos:Status'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <Autocomplete
                    value={optionsStatus.find((e) => e.id === filterValue)}
                    onChange={(newValue) => setFilterValue(newValue && newValue.id)}
                    options={optionsStatus}
                />
            ),
        },
    ];

    const rows = creditmemoList.map((item) => ({
        ...item.creditmemo,
        ...item.order,
        id: item.creditmemo.entity_id,
        state: item.creditmemo.state_name,
        actions: () => (
            <Link href={`/return/creditmemos/edit/${item.creditmemo.entity_id}`}>
                <a className="link-button">{t('creditmemos:View')}</a>
            </Link>
        ),
    }));

    const actions = [
        {
            label: t('creditmemos:Print_Credit_Memo'),
            message: t('creditmemos:Ready_for_print_'),
            onClick: (checkedRows) => {
                const idPrint = checkedRows.map((checkedRow) => checkedRow.id);
                window.open(`/printoms/creditmemo/${idPrint.toString().replace(/,/g, '/')}`);
            },
            showMessage: false,
        },
    ];

    return (
        <>
            <Header t={t} />
            {desktop ? (
                <Table
                    filters={filters}
                    rows={rows}
                    getRows={getCreditMemoList}
                    loading={loading}
                    columns={columns}
                    count={creditmemoTotal}
                    actions={actions}
                    showCheckbox
                />
            )
                : (
                    <CustomList
                        filters={filters}
                        rows={rows}
                        getRows={getCreditMemoList}
                        loading={loading}
                        columns={columns}
                        count={creditmemoTotal}
                        actions={actions}
                        showCheckbox
                        hideActions={false}
                        hideColumn={false}
                        checkboxAll
                        twoColumns
                        handleClickRow={(id) => Router.push(`/return/creditmemos/edit/${id}`)}
                        usePagination
                    />
                )}
        </>
    );
};

export default CreditmemoListContent;
