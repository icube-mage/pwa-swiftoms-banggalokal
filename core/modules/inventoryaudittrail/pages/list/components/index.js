/* eslint-disable no-trailing-spaces */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import gqlService from '@modules/inventoryaudittrail/services/graphql';
import locationGqlService from '@modules/location/services/graphql';
import Table from '@common_table';
import Header from '@modules/inventoryaudittrail/pages/list/components/Header';
import useStyles from '@modules/inventoryaudittrail/pages/list/components/style';
import Autocomplete from '@common_autocomplete';
import TextField from '@common_textfield';

const InventoryAuditListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getInventoryAuditTrailList, t } = props;
    const inventoryAuditList = (data && data.getInventoryAuditTrailList && data.getInventoryAuditTrailList.items) || [];
    const inventoryAuditTotal = (data && data.getInventoryAuditTrailList && data.getInventoryAuditTrailList.total_count) || 0;

    const columns = [
        { field: 'entity_id', headerName: t('inventoryaudittrail:ID'), hideable: true },
        { field: 'created_at', headerName: t('inventoryaudittrail:Created_At'), sortable: true, initialSort: 'DESC', hideable: true },
        { field: 'sku', headerName: t('inventoryaudittrail:SKU'), hideable: true },
        { field: 'loc_name', headerName: t('inventoryaudittrail:Location'), hideable: true },
        { field: 'old_data', headerName: t('inventoryaudittrail:Old_Data'), hideable: true },
        { field: 'new_data', headerName: t('inventoryaudittrail:New_Data'), hideable: true },
        { field: 'table_name', headerName: t('inventoryaudittrail:Event'), hideable: true },
        { field: 'table_parent_id', headerName: t('inventoryaudittrail:Event_Ref_No'), hideable: true },
        { field: 'user', headerName: t('inventoryaudittrail:User'), hideable: true },
    ];

    const filters = [
        {
            field: 'created_at',
            name: 'from_date',
            type: 'from',
            label: t('inventoryaudittrail:Created_At_From'),
            initialValue: '',
            typeInput: 'date',
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
            name: 'to_date',
            type: 'to',
            label: t('inventoryaudittrail:Created_At_To'),
            initialValue: '',
            typeInput: 'date',
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
                        className: classes.fieldInputFilter,
                    }}
                />
            ),
        },
        { field: 'sku', name: 'sku', type: 'like', label: t('inventoryaudittrail:SKU'), initialValue: '' },
        {
            field: 'loc_id',
            name: 'loc_id',
            type: 'in',
            label: t('inventoryaudittrail:Location'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const [getLocationList, { data: dataLoc, loading: loadingLoc }] = locationGqlService.getLocationList();
                const [optionsLoc, setOptionsLoc] = useState([]);
                const [searchLoc, setSearchLoc] = useState('');
                const primaryKey = 'loc_id';
                const labelKey = 'loc_name';

                useEffect(() => {
                    const onChangeTimeOut = setTimeout(() => {
                        const isExist = searchLoc && optionsLoc.filter((elm) => elm?.[labelKey]?.toLowerCase().includes(searchLoc?.toLowerCase()));
                        if (searchLoc && isExist.length === 0) {
                            getLocationList({
                                variables: {
                                    search: searchLoc,
                                    pageSize: 20,
                                    currentPage: 1,
                                },
                            });
                        }
                        return null;
                    }, 500);

                    return () => clearTimeout(onChangeTimeOut);
                }, [searchLoc]);

                useEffect(() => {
                    if (dataLoc && dataLoc.getLocationList && dataLoc.getLocationList.items) {
                        const ids = new Set(optionsLoc.map((d) => d[primaryKey].toString()));
                        setOptionsLoc([...optionsLoc, ...dataLoc.getLocationList.items.filter((d) => !ids.has(d[primaryKey].toString()))]);
                    }
                }, [dataLoc]);

                return (
                    <Autocomplete
                        mode={loadingLoc.length > 0 ? 'default' : 'lazy'}
                        loading={loadingLoc}
                        getOptions={getLocationList}
                        multiple
                        value={(filterValue || []).map((option) => optionsLoc.find((e) => String(e[primaryKey]) === option))}
                        onChange={(newValue) => setFilterValue((newValue || []).map((option) => option && option[primaryKey] && String(option[primaryKey])))}
                        onInputChange={(e) => {
                            const val = e?.target?.value;
                            if (typeof val === 'string') {
                                setSearchLoc(val);
                            }
                        }}
                        onBlur={() => setSearchLoc('')}
                        inputValue={searchLoc}
                        options={optionsLoc}
                        primaryKey={primaryKey}
                        labelKey={labelKey}
                    />
                );
            },
        },
        {
            field: 'table_name',
            name: 'table_name',
            type: 'in',
            label: t('inventoryaudittrail:Event'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const [getInventoryAuditTrailEventOptions, getInventoryAuditTrailEventOptionsRes] = gqlService.getInventoryAuditTrailEventOptions();
                const getInventoryAuditTrailEventOptionsOptions = (getInventoryAuditTrailEventOptionsRes
                        && getInventoryAuditTrailEventOptionsRes.data
                        && getInventoryAuditTrailEventOptionsRes.data.getInventoryAuditTrailEventOptions)
                    || [];
                const primaryKey = 'value';
                const labelKey = 'label';

                return (
                    <Autocomplete
                        mode="lazy"
                        loading={getInventoryAuditTrailEventOptionsRes?.loading}
                        getOptions={getInventoryAuditTrailEventOptions}
                        multiple
                        value={(filterValue || []).map((option) => getInventoryAuditTrailEventOptionsOptions.find((e) => e[primaryKey] === option))}
                        onChange={(newValue) => setFilterValue((newValue || []).map((option) => option && option[primaryKey]))}
                        options={getInventoryAuditTrailEventOptionsOptions}
                        primaryKey={primaryKey}
                        labelKey={labelKey}
                    />
                );
            },
        },
        { field: 'table_parent_id', name: 'table_parent_id', type: 'like', label: t('inventoryaudittrail:Event_Ref_No'), initialValue: '' },
        { field: 'user', name: 'user', type: 'like', label: t('inventoryaudittrail:User'), initialValue: '' },
    ];

    const rows = inventoryAuditList.map((inventoryaudit) => ({
        ...inventoryaudit,
        id: inventoryaudit.entity_id,
        table_parent_id: inventoryaudit.table_parent_id || ' ',
        old_data: () => (
            <div className="old-data">
                <span>
                    {t('inventoryaudittrail:Qty_Buffer')}
:
                    {' '}
                </span>
                <span>{inventoryaudit.old_data.qty_buffer || '0'}</span>
                <span>
                    {t('inventoryaudittrail:Qty_Incoming')}
:
                    {' '}
                </span>
                <span>{inventoryaudit.old_data.qty_incoming || '0'}</span>
                <span>
                    {t('inventoryaudittrail:Qty_Reserved')}
:
                    {' '}
                </span>
                <span>{inventoryaudit.old_data.qty_reserved || '0'}</span>
                <span>
                    {t('inventoryaudittrail:Qty_Saleable')}
:
                    {' '}
                </span>
                <span>{inventoryaudit.old_data.qty_saleable || '0'}</span>
                <span>
                    {t('inventoryaudittrail:Qty_Total')}
:
                    {' '}
                </span>
                <span>{inventoryaudit.old_data.qty_total || '0'}</span>
            </div>
        ),
        new_data: () => (
            <div className="new-data">
                <span>
                    {t('inventoryaudittrail:Qty_Buffer')}
:
                    {' '}
                </span>
                <span>{inventoryaudit.new_data.qty_buffer || '0'}</span>
                <span>
                    {t('inventoryaudittrail:Qty_Incoming')}
:
                    {' '}
                </span>
                <span>{inventoryaudit.new_data.qty_incoming || '0'}</span>
                <span>
                    {t('inventoryaudittrail:Qty_Reserved')}
:
                    {' '}
                </span>
                <span>{inventoryaudit.new_data.qty_reserved || '0'}</span>
                <span>
                    {t('inventoryaudittrail:Qty_Saleable')}
:
                    {' '}
                </span>
                <span>{inventoryaudit.new_data.qty_saleable || '0'}</span>
                <span>
                    {t('inventoryaudittrail:Qty_Total')}
:
                    {' '}
                </span>
                <span>{inventoryaudit.new_data.qty_total || '0'}</span>
            </div>
        ),
    }));

    return (
        <>
            <Header t={t} />
            <div className={classes.wrapperMainTable}>
                <Table
                    filters={filters}
                    rows={rows}
                    getRows={getInventoryAuditTrailList}
                    loading={loading}
                    columns={columns}
                    count={inventoryAuditTotal}
                    hideActions
                />
            </div>
        </>
    );
};

export default InventoryAuditListContent;
