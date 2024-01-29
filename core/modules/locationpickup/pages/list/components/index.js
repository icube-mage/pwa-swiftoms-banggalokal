/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
import React from 'react';
import Router from 'next/router';
import Link from 'next/link';

import Header from '@modules/locationpickup/pages/list/components/Header';

import Table from '@common_table';
import CustomList from '@common_customlist';
import Autocomplete from '@common_autocomplete';
import { breakPointsUp } from '@helper_theme';

const LocationPickupListContent = (props) => {
    const { data, loading, getLocationPickupList, deleteMultipleRowsHandle, t } = props;
    const locationList = (data && data.getLocationPickupList && data.getLocationPickupList.items) || [];
    const locationTotal = (data && data.getLocationPickupList && data.getLocationPickupList.total_count) || 0;

    const desktop = breakPointsUp('sm');

    const columns = [
        { field: 'pickup_id', headerName: t('locationpickup:ID'), sortable: true, initialSort: 'ASC', hideable: true },
        { field: 'loc_name', headerName: t('locationpickup:Parent_Location'), sortable: true, hideable: true },
        { field: 'pickup_name', headerName: t('locationpickup:Pickup_Name'), sortable: true, hideable: true },
        { field: 'pickup_type', headerName: t('locationpickup:Pickup_Type'), sortable: true, hideable: true },
        { field: 'pickup_description', headerName: t('locationpickup:Pickup_Description'), sortable: true, hideable: true },
        { field: 'pickup_phone', headerName: t('locationpickup:Pickup_Phone'), sortable: true, hideable: true },
        { field: 'pickup_charge', headerName: t('locationpickup:Pickup_Charge'), sortable: true, hideable: true },
        { field: 'pickup_fulfillment_time', headerName: t('locationpickup:Pickup_Fulfillment_Time'), sortable: true, hideable: true },
        { field: 'status', headerName: t('locationpickup:Status'), sortable: true, hideable: true },
        { field: 'actions', headerName: t('locationpickup:Action'), hidden: !desktop },
    ];

    const filters = [
        { field: 'loc_name', name: 'loc_name', type: 'like', label: t('locationpickup:Parent_Location'), initialValue: '' },
        { field: 'pickup_name', name: 'pickup_name', type: 'like', label: t('locationpickup:Pickup_Name'), initialValue: '' },
        { field: 'pickup_type', name: 'pickup_type', type: 'like', label: t('locationpickup:Pickup_Type'), initialValue: '' },
        { field: 'pickup_description', name: 'pickup_description', type: 'like', label: t('locationpickup:Pickup_Description'), initialValue: '' },
        { field: 'pickup_phone', name: 'pickup_phone', type: 'like', label: t('locationpickup:Pickup_Phone'), initialValue: '' },
        { field: 'pickup_charge', name: 'pickup_charge', type: 'like', label: t('locationpickup:Pickup_Charge'), initialValue: '' },
        { field: 'pickup_fulfillment_time', name: 'pickup_fulfillment_time', type: 'like', label: t('locationpickup:Pickup_Fulfillment_Time'), initialValue: '' },
        {
            field: 'status',
            name: 'status',
            type: 'eq',
            label: t('locationpickup:Status'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const optionsStatus = [
                    { name: 'Active', idValue: 'Active' },
                    { name: 'Inactive', idValue: 'Inactive' },
                ];
                return (
                    <Autocomplete
                        value={optionsStatus.find((e) => e.idValue === filterValue)}
                        onChange={(newValue) => setFilterValue(newValue && newValue.idValue)}
                        options={optionsStatus}
                    />
                );
            },
        },
    ];

    const rows = locationList.map((locationpickup) => ({
        ...locationpickup,
        id: locationpickup.pickup_id,
        actions: () => (
            <Link href={`/oms/locationpickup/${locationpickup.pickup_id}/edit`}>
                <a className="link-button">{t('locationpickup:View')}</a>
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
                        getRows={getLocationPickupList}
                        deleteRows={deleteMultipleRowsHandle}
                        loading={loading}
                        columns={columns}
                        count={locationTotal}
                        showCheckbox
                        recordName="location pickup"
                    />
                ) : (
                    <CustomList
                        filters={filters}
                        rows={rows}
                        getRows={getLocationPickupList}
                        deleteRows={deleteMultipleRowsHandle}
                        loading={loading}
                        columns={columns}
                        count={locationTotal}
                        showCheckbox
                        recordName="location pickup"
                        hideColumn={false}
                        checkboxAll
                        twoColumns
                        handleClickRow={(id) => Router.push(`/oms/locationpickup/${id}/edit`)}
                        usePagination
                    />
                )
            }
        </>
    );
};

export default LocationPickupListContent;
