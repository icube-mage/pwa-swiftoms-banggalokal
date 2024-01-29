/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
import React from 'react';
import Router from 'next/router';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/virtuallocationinventory/pages/list/components/Header';
import CustomList from '@common_customlist';
import { breakPointsUp } from '@helper_theme';

const VirtualLocationListContent = (props) => {
    const { data, loading, getVirtualLocationList, deleteMultipleRowsHandle, t } = props;
    const virtualLocationList = (data && data.getVirtualLocationList && data.getVirtualLocationList.items) || [];
    const virtualLocationTotal = (data && data.getVirtualLocationList && data.getVirtualLocationList.total_count) || 0;

    const desktop = breakPointsUp('sm');

    const columns = [
        { field: 'vl_id', headerName: t('virtuallocationinventory:ID'), sortable: true, initialSort: 'ASC' },
        { field: 'parentLocation', headerName: t('virtuallocationinventory:Parent_Location'), hideable: true },
        { field: 'virtualLocation', headerName: t('virtuallocationinventory:Virtual_Location'), hideable: true },
        { field: 'percentage', headerName: t('virtuallocationinventory:Percentage'), hideable: true, sortable: true },
        { field: 'priority', headerName: t('virtuallocationinventory:Priority'), hideable: true, sortable: true },
        { field: 'actions', headerName: t('virtuallocationinventory:Action'), hidden: !desktop },
    ];

    const filters = [
        { field: 'vl_id', name: 'vl_id', type: 'like', label: t('virtuallocationinventory:ID'), initialValue: '' },
        { field: 'parent_location', name: 'parent_location', type: 'like', label: t('virtuallocationinventory:Parent_Location'), initialValue: '' },
        { field: 'virtual_location', name: 'virtual_location', type: 'like', label: t('virtuallocationinventory:Virtual_Location'), initialValue: '' },
        { field: 'percentage', name: 'percentage', type: 'like', label: t('virtuallocationinventory:Percentage'), initialValue: '' },
        { field: 'priority', name: 'priority', type: 'eq', label: t('virtuallocationinventory:Priority'), initialValue: '' },
    ];

    const rows = virtualLocationList.map((virtualLocation) => ({
        ...virtualLocation,
        id: virtualLocation.vl_id,
        parentLocation: virtualLocation.parent_label.label,
        virtualLocation: virtualLocation.virtual_label.label,
        actions: () => (
            <Link href={`/cataloginventory/virtuallocationinventory/edit/${virtualLocation.vl_id}`}>
                <a className="link-button">{t('virtuallocationinventory:View')}</a>
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
                        getRows={getVirtualLocationList}
                        loading={loading}
                        columns={columns}
                        count={virtualLocationTotal}
                        deleteRows={deleteMultipleRowsHandle}
                        showCheckbox
                        recordName="virtual location mapping"
                    />
                ) : (
                    <CustomList
                        filters={filters}
                        rows={rows}
                        getRows={getVirtualLocationList}
                        loading={loading}
                        columns={columns}
                        count={virtualLocationTotal}
                        deleteRows={deleteMultipleRowsHandle}
                        showCheckbox
                        recordName="virtual location mapping"
                        hideColumn={false}
                        checkboxAll
                        twoColumns
                        handleClickRow={(id) => Router.push(`/cataloginventory/virtuallocationinventory/edit/${id}`)}
                        usePagination
                    />
                )
            }
        </>
    );
};

export default VirtualLocationListContent;
