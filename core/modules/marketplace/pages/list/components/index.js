/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import Table from '@common_table';
import Header from '@modules/marketplace/pages/list/components/Header';
import Autocomplete from '@common_autocomplete';
import TextField from '@common_textfield';
import useStyles from '@modules/marketplace/pages/list/components/style';
import ApiModal from '@modules/marketplace/pages/list/components/apiModal';

const MarketplaceListContent = (props) => {
    const { data, loading, getMarketplaceList, t, open, setOpen } = props;
    const classes = useStyles();

    const marketplaceList = (data && data.getMarketplaceList && data.getMarketplaceList.items) || [];
    const marketplaceTotal = (data && data.getMarketplaceList && data.getMarketplaceList.total_count) || 0;

    const columns = [
        { field: 'marketplace_code', headerName: t('marketplace:Marketplace_Code'), sortable: true, hideable: true },
        { field: 'marketplace_name', headerName: t('marketplace:Marketplace_Name'), sortable: true, hideable: true },
        { field: 'is_active_label', headerName: t('marketplace:Status'), sortable: true, hideable: true },
        { field: 'created_at', headerName: t('marketplace:Created_At'), sortable: true, hideable: true, initialSort: 'DESC' },
        { field: 'actions', headerName: t('marketplace:Action') },
    ];

    const filters = [
        { field: 'marketplace_code', name: 'marketplace_code', type: 'like', label: t('marketplace:Marketplace_Code'), initialValue: '' },
        { field: 'marketplace_name', name: 'marketplace_name', type: 'like', label: t('marketplace:Marketplace_Name'), initialValue: '' },
        {
            field: 'is_active',
            name: 'is_active',
            type: 'eq',
            label: t('marketplace:Status'),
            component: ({ filterValue, setFilterValue }) => {
                const options = [
                    { name: t('marketplace:Active'), id: '1' },
                    { name: t('marketplace:Inactive'), id: '0' },
                ];
                return (
                    <Autocomplete
                        value={options.find((e) => e.id === filterValue)}
                        onChange={(newValue) => setFilterValue(newValue && newValue.id)}
                        options={options}
                    />
                );
            },
        },
        {
            field: 'created_at',
            name: 'created_at_from',
            type: 'from',
            label: t('marketplace:Created_From'),
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
            field: 'created_at',
            name: 'created_at_to',
            type: 'to',
            label: t('marketplace:Created_To'),
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

    const rows = marketplaceList.map((marketplace) => ({
        ...marketplace,
        is_active_label: (
            <div className={clsx(classes.status, marketplace.is_active && 'active')}>
                {marketplace.is_active ? t('marketplace:Active') : t('marketplace:Inactive')}
            </div>
        ),
        actions: () => (
            <Link href={`/marketplace/marketplace/edit/${marketplace.marketplace_code}`}>
                <a className="link-button">{t('order:View')}</a>
            </Link>
        ),
    }));
    return (
        <>
            <Header {...props} />
            <Table
                filters={filters}
                rows={rows}
                getRows={getMarketplaceList}
                loading={loading}
                columns={columns}
                count={marketplaceTotal}
                hideActions
            />
            <ApiModal
                open={open}
                handleClose={() => setOpen(false)}
                handleOpen={() => setOpen(true)}
                t={t}
            />
        </>
    );
};

export default MarketplaceListContent;
