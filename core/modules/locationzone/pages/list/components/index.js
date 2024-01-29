/* eslint-disable object-curly-newline */
import React from 'react';
import Router from 'next/router';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/locationzone/pages/list/components/Header';
import CustomList from '@common_customlist';
import { breakPointsUp } from '@helper_theme';

const ZoneListContent = (props) => {
    const { data, loading, getZoneList, deleteZone, t } = props;
    const zoneList = (data && data.getZoneList && data.getZoneList.items) || [];
    const zoneTotal = (data && data.getZoneList && data.getZoneList.total_count) || 0;

    const desktop = breakPointsUp('sm');

    const columns = [
        { field: 'id', headerName: t('locationzone:ID'), sortable: true, initialSort: 'ASC' },
        { field: 'zone', headerName: t('locationzone:Zone'), sortable: true },
        { field: 'actions', headerName: t('locationzone:Action'), hidden: !desktop },
    ];

    const filters = [
        { field: 'zone', name: 'zone', type: 'like', label: t('locationzone:Zone'), initialValue: '' },
    ];

    const rows = zoneList.map((zone) => ({
        ...zone,
        id: zone.id,
        actions: () => (
            <Link href={`/oms/locationzone/edit/${zone.id}`}>
                <a className="link-button">{t('locationzone:View')}</a>
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
                        getRows={getZoneList}
                        deleteRows={deleteZone}
                        loading={loading}
                        columns={columns}
                        hideColumns
                        count={zoneTotal}
                        showCheckbox
                        recordName="Zone"
                    />
                ) : (
                    <CustomList
                        filters={filters}
                        rows={rows}
                        getRows={getZoneList}
                        deleteRows={deleteZone}
                        loading={loading}
                        columns={columns}
                        count={zoneTotal}
                        showCheckbox
                        recordName="Zone"
                        checkboxAll
                        twoColumns
                        handleClickRow={(id) => Router.push(`/oms/locationzone/edit/${id}`)}
                        usePagination
                    />
                )
            }
        </>
    );
};

export default ZoneListContent;
