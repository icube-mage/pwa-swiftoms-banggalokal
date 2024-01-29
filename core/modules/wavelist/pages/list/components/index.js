/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import CustomList from '@common_customlist';
import Link from 'next/link';
import Autocomplete from '@common_autocomplete';
import Header from '@modules/wavelist/pages/list/components/Header';
import useStyles from '@modules/wavelist/pages/list/components/style';
import Router from 'next/router';

const PickByWaveListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getPickByWaveList, optionsStatus, t } = props;
    const PickByWaveList = (data && data.getPickByWaveList && data.getPickByWaveList.items) || [];
    const PickByWaveTotal = (data && data.getPickByWaveList && data.getPickByWaveList.total_count) || 0;

    const columns = [
        { field: 'increment_id', headerName: t('picklist:Wave_Number'), sortable: true, initialSort: 'DESC', hideable: true },
        { field: 'started_at', headerName: t('picklist:Date'), hideable: true },
        { field: 'picked_by', headerName: t('picklist:Picker'), sortable: true, hideable: true },
        { field: 'status', headerName: t('picklist:Status'), sortable: true, hideable: true },
    ];

    const filters = [
        {
            field: 'status',
            name: 'status',
            type: 'eq',
            label: t('picklist:Status'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const options = optionsStatus.slice().map((item) => ({
                    name: item.label,
                    id: item.value,
                }));
                return (
                    <Autocomplete
                        value={options.find((e) => e.id === filterValue)}
                        onChange={(newValue) => {
                            setTimeout(() => {
                                setFilterValue(newValue && newValue.id);
                            }, 500);
                        }}
                        options={options}
                    />
                );
            },
        },
        {
            field: 'status',
            name: 'status',
            type: 'nin',
            label: t('picklist:Status'),
            initialValue: ['pick_complete', 'pack_in_progress', 'pack_complete '],
            hidden: true,
        },
    ];

    const getClassByStatus = (status) => {
        if (status.value === 'new') {
            return classes.green;
        }
        if (status.value === 'pick_in_progress' || status.value === 'sorting_in_progress') {
            return classes.orange;
        }
        if (status.value === 'pick_uncomplete') {
            return classes.red;
        }
        return classes.gray;
    };

    const rows = PickByWaveList.map((wavelist) => ({
        ...wavelist,
        id: wavelist.entity_id,
        status: () => <span className={getClassByStatus(wavelist.status)}>{wavelist.status.label}</span>,
        started_at: () => <span>{wavelist.started_at}</span>,
    }));
    return (
        <>
            <CustomList
                filters={filters}
                rows={rows}
                getRows={getPickByWaveList}
                loading={loading}
                columns={columns}
                count={PickByWaveTotal}
                header={() => <Header t={t} />}
                handleClickRow={(id) => Router.push(`/pickpack/wavelist/picklist/${id}`)}
                recordName="wave"
                hideActions
            />
        </>
    );
};

export default PickByWaveListContent;
