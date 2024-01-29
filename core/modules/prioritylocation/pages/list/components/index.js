/* eslint-disable object-curly-newline */
import React from 'react';
import Router from 'next/router';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/prioritylocation/pages/list/components/Header';
import CustomList from '@common_customlist';
import { breakPointsUp } from '@helper_theme';

const PriorityLocationListContent = (props) => {
    const { data, loading, getPriorityLocationList, multideletePriorityLocation, t } = props;
    const priorityLocationList = (data && data.getPriorityLocationList && data.getPriorityLocationList.items) || [];
    const priorityLocationTotal = (data && data.getPriorityLocationList && data.getPriorityLocationList.total_count) || 0;

    const desktop = breakPointsUp('sm');

    const columns = [
        { field: 'id', headerName: t('prioritylocation:ID'), sortable: true, hideable: true, initialSort: 'ASC' },
        { field: 'channel_code', headerName: t('prioritylocation:Channel_Code'), sortable: true, hideable: true },
        { field: 'province', headerName: t('prioritylocation:Province'), sortable: true, hideable: true },
        { field: 'city', headerName: t('prioritylocation:City'), sortable: true, hideable: true },
        { field: 'priority', headerName: t('prioritylocation:Priority'), sortable: true, hideable: true },
        { field: 'loc_code', headerName: t('prioritylocation:Location_Code'), sortable: true, hideable: true },
        { field: 'actions', headerName: t('prioritylocation:Action'), hidden: !desktop },
    ];

    const filters = [
        { field: 'id', name: 'id_from', type: 'from', label: t('prioritylocation:ID_From'), initialValue: '' },
        { field: 'id', name: 'id_to', type: 'to', label: t('prioritylocation:ID_To'), initialValue: '' },
        { field: 'channel_code', name: 'channel_code', type: 'like', label: t('prioritylocation:Channel_Code'), initialValue: '' },
        { field: 'province', name: 'province', type: 'like', label: t('prioritylocation:Province'), initialValue: '' },
        { field: 'city', name: 'city', type: 'like', label: t('prioritylocation:City'), initialValue: '' },
        { field: 'priority', name: 'priority', type: 'eq', label: t('prioritylocation:Priority'), initialValue: '' },
        { field: 'loc_code', name: 'loc_code', type: 'like', label: t('prioritylocation:Location_Code'), initialValue: '' },
    ];

    const rows = priorityLocationList.map((priorityLocation) => ({
        ...priorityLocation,
        id: priorityLocation.id,
        channel_code: priorityLocation.channel_code,
        province: priorityLocation.province,
        city: priorityLocation.city,
        loc_code: priorityLocation.loc_code,
        actions: () => (
            <Link href={`/oms/prioritylocationbycity/edit/${priorityLocation.id}`}>
                <a className="link-button">{t('prioritylocation:View')}</a>
            </Link>
        ),
    }));

    return (
        <>
            <Header t={t} />
            {
                desktop ? (
                    <Table
                        filters={filters}
                        rows={rows}
                        getRows={getPriorityLocationList}
                        deleteRows={multideletePriorityLocation}
                        loading={loading}
                        columns={columns}
                        count={priorityLocationTotal}
                        showCheckbox
                        recordName="priority location"
                    />
                ) : (
                    <CustomList
                        filters={filters}
                        rows={rows}
                        getRows={getPriorityLocationList}
                        deleteRows={multideletePriorityLocation}
                        loading={loading}
                        columns={columns}
                        count={priorityLocationTotal}
                        showCheckbox
                        recordName="priority location"
                        hideColumn={false}
                        checkboxAll
                        twoColumns
                        handleClickRow={(id) => Router.push(`/oms/prioritylocationbycity/edit/${id}`)}
                        usePagination
                    />
                )
            }
        </>
    );
};

export default PriorityLocationListContent;
