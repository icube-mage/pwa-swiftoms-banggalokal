/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/vendoririspayout/pages/list/components/Header';
import useStyles from '@modules/vendoririspayout/pages/list/components/style';
import TextField from '@common_textfield';

const VendorIrisPayoutListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getVendorIrisPayoutHistory, t } = props;
    const vendorIrisPayoutList = (data && data.getVendorIrisPayoutHistory && data.getVendorIrisPayoutHistory.items) || [];
    const vendorIrisPayoutTotal = (data && data.getVendorIrisPayoutHistory && data.getVendorIrisPayoutHistory.total_count) || 0;

    const columns = [
        { field: 'id', headerName: t('vendoririspayout:ID'), sortable: true, hideable: true },
        { field: 'create_at', headerName: t('vendoririspayout:Created_At'), sortable: true, hideable: true, initialSort: 'DESC' },
        { field: 'action', headerName: t('vendoririspayout:Action'), sortable: true, hideable: true },
        { field: 'request', headerName: t('vendoririspayout:Request'), sortable: true, hideable: true },
        { field: 'response', headerName: t('vendoririspayout:Response'), sortable: true, hideable: true },
        { field: 'amount', headerName: t('vendoririspayout:Amount'), sortable: true, hideable: true },
    ];

    const filters = [
        { field: 'id', name: 'id_from', type: 'from', label: t('vendoririspayout:ID_From'), initialValue: '' },
        { field: 'id', name: 'id_to', type: 'to', label: t('vendoririspayout:ID_To'), initialValue: '' },
        {
            field: 'create_at',
            name: 'create_at_from',
            type: 'from',
            label: t('vendoririspayout:Created_At_From'),
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
            ),
        },
        {
            field: 'create_at',
            name: 'create_at_to',
            type: 'to',
            label: t('vendoririspayout:Created_At_To'),
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
        { field: 'amount', name: 'amount_from', type: 'from', label: t('vendoririspayout:Amount_From'), initialValue: '' },
        { field: 'amount', name: 'amount_to', type: 'to', label: t('vendoririspayout:Amount_To'), initialValue: '' },
        { field: 'action', name: 'action', type: 'like', label: t('vendoririspayout:Action'), initialValue: '' },
        { field: 'request', name: 'request', type: 'like', label: t('vendoririspayout:Request'), initialValue: '' },
        { field: 'response', name: 'response', type: 'like', label: t('vendoririspayout:Response'), initialValue: '' },
    ];

    const rows = vendorIrisPayoutList.map((vendoririspayout) => ({
        ...vendoririspayout,
        id: vendoririspayout.id,
    }));

    return (
        <>
            <Header t={t} />
            <Table
                filters={filters}
                rows={rows}
                getRows={getVendorIrisPayoutHistory}
                loading={loading}
                columns={columns}
                count={vendorIrisPayoutTotal}
                hideActions
            />
        </>
    );
};

export default VendorIrisPayoutListContent;
