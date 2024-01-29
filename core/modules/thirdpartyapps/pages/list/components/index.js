/* eslint-disable object-curly-newline */
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/thirdpartyapps/pages/list/components/Header';
import Switch from '@common_switch';
import Autocomplete from '@common_autocomplete';
import useStyles from '@modules/thirdpartyapps/pages/list/components/style';
import gqlVendor from '@modules/managevendor/services/graphql';

const ThirdPartyListContent = (props) => {
    const { data, loading, getThirdPartyAppList, handleUpdateStatus, deleteThirdPartyApps, t } = props;
    const classes = useStyles();
    const thirdPartyList = (data && data.getThirdPartyAppList && data.getThirdPartyAppList.items) || [];
    const thirdPartyTotal = (data && data.getThirdPartyAppList && data.getThirdPartyAppList.total_count) || 0;

    const columns = [
        { field: 'vendor_code', headerName: t('thirdpartyapps:Code'), hideable: true },
        { field: 'vendor', headerName: t('thirdpartyapps:Vendor'), hideable: true },
        { field: 'status', headerName: t('thirdpartyapps:Status'), sortable: true, hideable: true },
        { field: 'integration_status', headerName: t('thirdpartyapps:Integration_Status'), hideable: true },
        { field: 'action', headerName: t('thirdpartyapps:Action') },
    ];

    const filters = [
        {
            field: 'vendor_id',
            name: 'vendor_id',
            type: 'eq',
            label: t('thirdpartyapps:Vendor'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const [getVendorList, { data: dataVendor, loading: loadingVendor }] = gqlVendor.getVendorList();
                const [optionsVen, setOptionsVen] = useState([]);
                const [searchVen, setSearchVen] = useState('');
                const primaryKey = 'company_id';
                const labelKey = 'company_name';

                useEffect(() => {
                    const onChangeTimeOut = setTimeout(() => {
                        const isExist = searchVen && optionsVen.filter((elm) => elm?.[labelKey]?.toLowerCase().includes(searchVen?.toLowerCase()));
                        if (searchVen && isExist.length === 0) {
                            getVendorList({
                                variables: {
                                    filter: {
                                        company_name: {
                                            like: searchVen,
                                        },
                                    },
                                    pageSize: 35,
                                    currentPage: 1,
                                },
                            });
                        }
                        return null;
                    }, 500);

                    return () => clearTimeout(onChangeTimeOut);
                }, [searchVen]);

                useEffect(() => {
                    if (dataVendor && dataVendor.getVendorList && dataVendor.getVendorList.items) {
                        const ids = new Set(optionsVen.map((d) => d[primaryKey].toString()));
                        setOptionsVen([...optionsVen, ...dataVendor.getVendorList.items.filter((d) => !ids.has(d[primaryKey].toString()))]);
                    }
                }, [dataVendor]);

                return (
                    <Autocomplete
                        mode={optionsVen.length > 0 ? 'default' : 'lazy'}
                        loading={loadingVendor}
                        getOptions={getVendorList}
                        value={optionsVen.find((e) => String(e[primaryKey]) === filterValue)}
                        onChange={(newValue) => setFilterValue(newValue && newValue[primaryKey] && String(newValue[primaryKey]))}
                        onInputChange={(e) => {
                            const val = e?.target?.value;
                            if (typeof val === 'string') {
                                setSearchVen(val);
                            }
                        }}
                        getOptionsVariables={{
                            variables: {
                                filter: {
                                    company_name: {
                                        like: searchVen,
                                    },
                                },
                                pageSize: 20,
                                currentPage: 1,
                            },
                        }}
                        options={optionsVen}
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
            label: t('thirdpartyapps:Status'),
            component: ({ filterValue, setFilterValue }) => {
                const options = [
                    { name: 'Active', id: '1' },
                    { name: 'Inactive', id: '0' },
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
    ];

    const getClassByStatus = (status) => {
        if (status === 'connected') {
            return 'green';
        }
        if (status === 'disconnected') {
            return 'red';
        }
        return 'gray';
    };

    const rows = thirdPartyList.map((row) => ({
        ...row,
        id: row.entity_id,
        vendor_code: row.vendor.company_code,
        vendor: row.vendor.company_name,
        status: () => (
            <Switch
                value={row.status}
                onChange={(e) => handleUpdateStatus(row, e.target.checked)}
                trueLabel=""
                falseLabel=""
            />
        ),
        integration_status: () => (
            <div className={clsx(classes.statusContainer, getClassByStatus(row.integration_status))}>
                {row.integration_status || 'Idle'}
            </div>
        ),
        action: () => (
            <Link href={`/vendorportal/thirdpartyapps/edit/${row.entity_id}`}>
                <a className="link-button">{t('thirdpartyapps:Edit')}</a>
            </Link>
        ),
    }));

    return (
        <>
            <Header t={t} />
            <Table
                filters={filters}
                rows={rows}
                getRows={getThirdPartyAppList}
                loading={loading}
                columns={columns}
                count={thirdPartyTotal}
                showCheckbox
                deleteRows={(e) => deleteThirdPartyApps({ variables: { ids: e.variables.id } })}
            />
        </>
    );
};

export default ThirdPartyListContent;
