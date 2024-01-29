/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React, { useEffect, useState } from 'react';
import gqlService from '@modules/source/services/graphql';
import Table from '@common_table';
import Header from '@modules/source/pages/list/components/Header';
import useStyles from '@modules/source/pages/list/components/style';
import Autocomplete from '@common_autocomplete';
import EditModal from '@modules/source/pages/list/components/editModal';

const SourceListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getSourceList, t, isAllowUpdateSource, refetch } = props;
    const sourceList = (data && data.getSourceList && data.getSourceList.items) || [];
    const sourceTotal = (data && data.getSourceList && data.getSourceList.total_count) || 0;

    const [sourceEdit, setSourceEdit] = React.useState({});
    const [open, setOpen] = React.useState(false);

    let columns = [
        { field: 'source_id', headerName: t('source:ID'), sortable: true, hideable: true },
        { field: 'loc_name', headerName: t('source:Location'), sortable: true, hideable: true },
        { field: 'sku', headerName: t('source:SKU'), sortable: true, hideable: true },
        { field: 'qty_total', headerName: t('source:Qty_Total'), hideable: true },
        { field: 'qty_reserved', headerName: t('source:Qty_Reserved'), hideable: true },
        { field: 'qty_incoming', headerName: t('source:Qty_Incoming'), hideable: true },
        { field: 'qty_saleable', headerName: t('source:Qty_Saleable'), hideable: true },
        { field: 'qty_buffer', headerName: t('source:Qty_Buffer'), hideable: true },
        { field: 'priority', headerName: t('source:Priority'), hideable: true },
    ];

    if (isAllowUpdateSource) {
        columns = [
            ...columns,
            { field: 'action', headerName: t('source:Action') },
        ];
    }

    const filters = [
        { field: 'sku', name: 'sku', type: 'like', label: t('source:SKU'), initialValue: '' },
        {
            field: 'loc_id',
            name: 'loc_id',
            type: 'in',
            label: t('source:Location'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const [getLocationList, { data: dataLoc, loading: loadingLoc }] = gqlService.getLocationList();
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
                        value={(filterValue || []).map((option) => optionsLoc.find((e) => String(e.loc_id) === option))}
                        onChange={(newValue) => setFilterValue((newValue || []).map((option) => option && option.loc_id && String(option.loc_id)))}
                        onInputChange={(e) => {
                            const val = e?.target?.value;
                            if (typeof val === 'string') {
                                setSearchLoc(val);
                            }
                        }}
                        getOptionsVariables={{
                            variables: {
                                search: searchLoc,
                                pageSize: 20,
                                currentPage: 1,
                            },
                        }}
                        onBlur={() => setSearchLoc('')}
                        inputValue={searchLoc}
                        options={optionsLoc}
                        primaryKey="loc_id"
                        labelKey="loc_name"
                    />
                );
            },
        },
    ];

    const rows = sourceList.map((source) => ({
        ...source,
        id: source.source_id,
        action: () => (
            <div
                className={classes.edit}
                onClick={() => {
                    setSourceEdit(source);
                    setTimeout(() => { setOpen(true); }, 100);
                }}
            >
                {t('source:Edit')}
            </div>
        ),
    }));

    return (
        <>
            {open
            && (
                <EditModal
                    open={open}
                    handleClose={() => setOpen(false)}
                    handleOpen={() => setOpen(true)}
                    t={t}
                    source={sourceEdit}
                    refetch={refetch}
                />
            )}
            <Header t={t} {...props} />
            <Table filters={filters} rows={rows} getRows={getSourceList} loading={loading} columns={columns} count={sourceTotal} hideActions />
        </>
    );
};

export default SourceListContent;
