/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/stocktransfer/pages/list/components/Header';
import Autocomplete from '@common_autocomplete';
import gqlLocation from '@modules/location/services/graphql';
import TextField from '@common_textfield';
import useStyles from '@modules/stocktransfer/pages/list/components/style';

const StockTransferListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getStockTransferList, t } = props;
    const stockTransferList = (data && data.getStockTransferList && data.getStockTransferList.items) || [];
    const stockTransferTotal = (data && data.getStockTransferList && data.getStockTransferList.total_count) || 0;

    const columns = [
        { field: 'increment_id', headerName: t('stocktransfer:ID'), hideable: 'true', sortable: true, initialSort: 'DESC' },
        { field: 'source_loc_name', headerName: t('stocktransfer:Source_Location'), hideable: 'true', sortable: true },
        { field: 'target_loc_name', headerName: t('stocktransfer:Target_Location'), hideable: 'true', sortable: true },
        { field: 'status', headerName: t('stocktransfer:Status'), hideable: 'true', sortable: true },
        { field: 'created_by', headerName: t('stocktransfer:Created_By'), hideable: 'true', sortable: true },
        { field: 'created_at', headerName: t('stocktransfer:Created_At'), hideable: 'true', sortable: true },
        { field: 'actions', headerName: t('stocktransfer:Action') },
    ];

    const filters = [
        { field: 'increment_id', name: 'increment_id', type: 'like', label: t('stocktransfer:ID'), initialValue: '' },
        {
            field: 'source_loc_code',
            name: 'source_loc_code',
            type: 'eq',
            label: t('stocktransfer:Source_Location'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const [getStoreLocationList, { data: dataLoc, loading: loadingLoc }] = gqlLocation.getStoreLocationList();
                const [optionsLoc, setOptionsLoc] = useState([]);
                const [searchLoc, setSearchLoc] = useState('');
                const primaryKey = 'loc_code';
                const labelKey = 'loc_name';

                useEffect(() => {
                    const onChangeTimeOut = setTimeout(() => {
                        const isExist = searchLoc && optionsLoc.filter((elm) => elm?.[labelKey]?.toLowerCase().includes(searchLoc?.toLowerCase()));
                        if (searchLoc && isExist.length === 0) {
                            getStoreLocationList({
                                variables: {
                                    search: searchLoc,
                                    currentPage: 1,
                                },
                            });
                        }
                        return null;
                    }, 500);

                    return () => clearTimeout(onChangeTimeOut);
                }, [searchLoc]);

                useEffect(() => {
                    if (dataLoc && dataLoc.getStoreLocationList && dataLoc.getStoreLocationList.items) {
                        const ids = new Set(optionsLoc.map((d) => d[primaryKey]));
                        setOptionsLoc([...optionsLoc, ...dataLoc.getStoreLocationList.items.filter((d) => !ids.has(d[primaryKey]))]);
                    }
                }, [dataLoc]);

                return (
                    <Autocomplete
                        mode={loadingLoc.length > 0 ? 'default' : 'lazy'}
                        loading={loadingLoc}
                        getOptions={getStoreLocationList}
                        value={optionsLoc.find((e) => e[primaryKey] === filterValue)}
                        onChange={(newValue) => {
                            setFilterValue(newValue && newValue[primaryKey]);
                        }}
                        onInputChange={(e) => setSearchLoc(e && e.target && e.target.value)}
                        options={optionsLoc}
                        primaryKey={primaryKey}
                        labelKey={labelKey}
                    />
                );
            },
        },
        {
            field: 'target_loc_code',
            name: 'target_loc_code',
            type: 'eq',
            label: t('stocktransfer:Target_Location'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const [getStoreLocationList, { data: dataLoc, loading: loadingLoc }] = gqlLocation.getStoreLocationList();
                const [optionsLoc, setOptionsLoc] = useState([]);
                const [searchLoc, setSearchLoc] = useState('');
                const primaryKey = 'loc_code';
                const labelKey = 'loc_name';

                useEffect(() => {
                    const onChangeTimeOut = setTimeout(() => {
                        const isExist = searchLoc && optionsLoc.filter((elm) => elm?.[labelKey]?.toLowerCase().includes(searchLoc?.toLowerCase()));
                        if (searchLoc && isExist.length === 0) {
                            getStoreLocationList({
                                variables: {
                                    search: searchLoc,
                                    currentPage: 1,
                                },
                            });
                        }
                        return null;
                    }, 500);

                    return () => clearTimeout(onChangeTimeOut);
                }, [searchLoc]);

                useEffect(() => {
                    if (dataLoc && dataLoc.getStoreLocationList && dataLoc.getStoreLocationList.items) {
                        const ids = new Set(optionsLoc.map((d) => d[primaryKey]));
                        setOptionsLoc([...optionsLoc, ...dataLoc.getStoreLocationList.items.filter((d) => !ids.has(d[primaryKey]))]);
                    }
                }, [dataLoc]);

                return (
                    <Autocomplete
                        mode={loadingLoc.length > 0 ? 'default' : 'lazy'}
                        loading={loadingLoc}
                        getOptions={getStoreLocationList}
                        value={optionsLoc.find((e) => e[primaryKey] === filterValue)}
                        onChange={(newValue) => {
                            setFilterValue(newValue && newValue[primaryKey]);
                        }}
                        onInputChange={(e) => setSearchLoc(e && e.target && e.target.value)}
                        options={optionsLoc}
                        primaryKey={primaryKey}
                        labelKey={labelKey}
                    />
                );
            },
        },
        { field: 'created_by', name: 'created_by', type: 'like', label: t('stocktransfer:Created_By'), initialValue: '' },
        {
            field: 'created_at',
            name: 'created_at_from',
            type: 'from',
            label: t('stocktransfer:Created_At_From'),
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
            label: t('stocktransfer:Created_At_To'),
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
    ];

    const getStatus = (status) => {
        if (status === 1) {
            return t('stocktransfer:Enabled');
        }

        return t('stocktransfer:Disabled');
    };

    const rows = stockTransferList.map((stockTransfer) => ({
        ...stockTransfer,
        id: stockTransfer.entity_id,
        actions: () => (
            <Link href={`/cataloginventory/stocktransfer/${stockTransfer.entity_id}/edit`}>
                <a className="link-button">{t('stocktransfer:View')}</a>
            </Link>
        ),
        status: () => <>{getStatus(stockTransfer.status)}</>,
    }));

    return (
        <>
            <Header t={t} />
            <Table
                filters={filters}
                rows={rows}
                getRows={getStockTransferList}
                loading={loading}
                columns={columns}
                count={stockTransferTotal}
                hideActions
            />
        </>
    );
};

export default StockTransferListContent;
