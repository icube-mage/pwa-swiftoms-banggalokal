/* eslint-disable object-curly-newline */
import React from 'react';
import Router from 'next/router';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/location/pages/list/components/Header';
import CustomList from '@common_customlist';
import { breakPointsUp } from '@helper_theme';

const LocationListContent = (props) => {
    const { data, loading, getLocationList, multideleteLocation, t } = props;
    const locationList = (data && data.getLocationList && data.getLocationList.items) || [];
    const locationTotal = (data && data.getLocationList && data.getLocationList.total_count) || 0;

    const desktop = breakPointsUp('sm');

    const columns = [
        { field: 'loc_id', headerName: t('location:ID'), sortable: true, initialSort: 'ASC', hideable: true },
        { field: 'loc_code', headerName: t('location:Code'), sortable: true, hideable: true },
        { field: 'loc_name', headerName: t('location:Name'), hideable: true },
        { field: 'loc_city', headerName: t('location:City'), hideable: true },
        { field: 'loc_street', headerName: t('location:Address'), hideable: true },
        { field: 'actions', headerName: t('location:Action'), hidden: !desktop },
    ];

    const filters = [
        { field: 'loc_id', name: 'loc_id_from', type: 'from', label: t('location:ID_From'), initialValue: '' },
        { field: 'loc_id', name: 'loc_id_to', type: 'to', label: t('location:ID_To'), initialValue: '' },
        { field: 'loc_code', name: 'loc_code', type: 'like', label: t('location:Code'), initialValue: '' },
        { field: 'loc_name', name: 'loc_name', type: 'like', label: t('location:Name'), initialValue: '' },
        { field: 'loc_city', name: 'loc_city', type: 'like', label: t('location:City'), initialValue: '' },
        { field: 'loc_street', name: 'loc_street', type: 'like', label: t('location:Address'), initialValue: '' },
    ];

    const rows = locationList.map((location) => ({
        ...location,
        id: location.loc_id,
        loc_city: location.loc_city.label,
        actions: () => (
            <Link href={`/oms/location/edit/${location.loc_id}`}>
                <a className="link-button">{t('location:View')}</a>
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
                        getRows={getLocationList}
                        deleteRows={multideleteLocation}
                        loading={loading}
                        columns={columns}
                        count={locationTotal}
                        showCheckbox
                        recordName="location"
                    />
                ) : (
                    <CustomList
                        filters={filters}
                        rows={rows}
                        getRows={getLocationList}
                        deleteRows={multideleteLocation}
                        loading={loading}
                        columns={columns}
                        count={locationTotal}
                        showCheckbox
                        recordName="location"
                        hideColumn={false}
                        checkboxAll
                        twoColumns
                        handleClickRow={(id) => Router.push(`/oms/location/edit/${id}`)}
                        usePagination
                    />
                )
            }
        </>
    );
};

export default LocationListContent;
