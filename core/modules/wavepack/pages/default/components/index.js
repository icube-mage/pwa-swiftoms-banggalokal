/* eslint-disable object-curly-newline */
import React from 'react';
import CustomList from '@common_customlist';
import Autocomplete from '@common_autocomplete';
import Header from '@modules/wavepack/pages/default/components/Header';
import useStyles from '@modules/wavepack/pages/default/components/style';
import Router from 'next/router';

const PickByWaveListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getPickByWaveList, t } = props;
    const PickByWaveList = (data && data.getPickByWaveList && data.getPickByWaveList.items) || [];
    const PickByWaveTotal = (data && data.getPickByWaveList && data.getPickByWaveList.total_count) || 0;

    const columns = [
        { field: 'increment_id', headerName: t('packlist:Wave_Number'), sortable: true, initialSort: 'DESC', hideable: true },
        { field: 'started_at', headerName: t('packlist:Date'), hideable: true },
        { field: 'picked_by', headerName: t('packlist:Picker'), sortable: true, hideable: true },
        { field: 'status', headerName: t('packlist:Status'), sortable: true, hideable: true },
    ];

    const optionsStatus = [
        { name: t('packlist:Pick_Uncomplete'), id: 'pick_uncomplete' },
        { name: t('packlist:Pick_Complete'), id: 'pick_complete' },
        { name: t('packlist:Pack_in_Progress'), id: 'pack_in_progress' },
        { name: t('packlist:Pack_Complete'), id: 'pack_complete' },
    ];

    const filters = [
        {
            field: 'status',
            name: 'status',
            type: 'eq',
            label: t('packlist:Status'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <Autocomplete
                    value={optionsStatus.find((e) => e.id === filterValue)}
                    onChange={(newValue) => {
                        setTimeout(() => {
                            setFilterValue(newValue && newValue.id);
                        }, 500);
                    }}
                    options={optionsStatus}
                />
            ),
        },
        {
            field: 'status',
            name: 'status',
            type: 'in',
            label: t('packlist:Status'),
            initialValue: ['pick_uncomplete', 'pick_complete', 'pack_in_progress'],
            hidden: true,
        },
    ];

    const getClassByStatus = (status) => {
        if (status.value === 'pick_uncomplete') {
            return classes.red;
        }
        if (status.value === 'pick_in_progress' || status.value === 'pack_in_progress') {
            return classes.orange;
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
                handleClickRow={(id) => Router.push(`/pickpack/wavepack/packlist/${id}`)}
                recordName="wave"
                hideActions
            />
        </>
    );
};

export default PickByWaveListContent;
