/* eslint-disable object-curly-newline */
import React from 'react';
import Router from 'next/router';
import Table from '@common_table';
import Link from 'next/link';
import Autocomplete from '@common_autocomplete';
import gqlService from '@modules/prioritylocationbyzone/services/graphql';
import locationGqlService from '@modules/location/services/graphql';
import Header from '@modules/prioritylocationbyzone/pages/list/components/Header';
import CustomList from '@common_customlist';
import { breakPointsUp } from '@helper_theme';

const PriorityZoneListContent = (props) => {
    const { data, loading, getPriorityZoneList, deletePriorityZone, t } = props;
    const priorityZoneList = (data && data.getPriorityZoneList && data.getPriorityZoneList.items) || [];
    const priorityZoneTotal = (data && data.getPriorityZoneList && data.getPriorityZoneList.total_count) || 0;

    const desktop = breakPointsUp('sm');

    const columns = [
        { field: 'id', headerName: t('prioritylocationbyzone:ID'), sortable: true, initialSort: 'ASC', hideable: true },
        { field: 'country_name', headerName: t('prioritylocationbyzone:Country'), hideable: true },
        { field: 'code', headerName: t('prioritylocationbyzone:Region_Code'), sortable: true, hideable: true },
        { field: 'region_name', headerName: t('prioritylocationbyzone:Region_Name'), hideable: true },
        { field: 'zone', headerName: t('prioritylocationbyzone:Zone'), sortable: true, hideable: true },
        { field: 'actions', headerName: t('prioritylocationbyzone:Action'), hidden: !desktop },
    ];

    const filters = [
        {
            field: 'country_id',
            name: 'country_id',
            type: 'eq',
            label: t('prioritylocationbyzone:Country'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const [getCountries, getCountriesRes] = locationGqlService.getCountries();
                const zoneOptions = (getCountriesRes
                        && getCountriesRes.data
                        && getCountriesRes.data.countries)
                    || [];
                const primaryKey = 'id';
                const labelKey = 'full_name_english';
                return (
                    <Autocomplete
                        mode="lazy"
                        getOptions={getCountries}
                        value={zoneOptions.find((e) => e[primaryKey] === filterValue)}
                        onChange={(newValue) => setFilterValue(newValue && newValue[primaryKey])}
                        options={zoneOptions}
                        primaryKey={primaryKey}
                        labelKey={labelKey}
                    />
                );
            },
        },
        {
            field: 'code',
            name: 'code',
            type: 'eq',
            label: t('prioritylocationbyzone:Region'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const [getCountry, getCountryRes] = locationGqlService.getCountry();
                const zoneOptions = (getCountryRes
                        && getCountryRes.data
                        && getCountryRes.data.country
                        && getCountryRes.data.country.available_regions)
                    || [];
                const primaryKey = 'code';
                const labelKey = 'name';
                return (
                    <Autocomplete
                        mode="lazy"
                        getOptions={getCountry}
                        value={zoneOptions.find((e) => e[primaryKey] === filterValue)}
                        onChange={(newValue) => setFilterValue(newValue && newValue[primaryKey])}
                        options={zoneOptions}
                        getOptionsVariables={{
                            variables: { id: 'ID' },
                        }}
                        primaryKey={primaryKey}
                        labelKey={labelKey}
                    />
                );
            },
        },
        {
            field: 'zone',
            name: 'zone',
            type: 'eq',
            label: t('prioritylocationbyzone:Zone'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const [getZoneOptions, getZoneOptionsRes] = gqlService.getZoneOptions();
                const zoneOptions = (getZoneOptionsRes
                        && getZoneOptionsRes.data
                        && getZoneOptionsRes.data.getZoneOptions)
                    || [];
                const primaryKey = 'value';
                const labelKey = 'label';
                return (
                    <Autocomplete
                        mode="lazy"
                        getOptions={getZoneOptions}
                        value={zoneOptions.find((e) => e[primaryKey] === filterValue)}
                        onChange={(newValue) => setFilterValue(newValue && newValue[primaryKey])}
                        options={zoneOptions}
                        primaryKey={primaryKey}
                        labelKey={labelKey}
                    />
                );
            },
        },
    ];

    const rows = priorityZoneList.map((priorityzone) => ({
        ...priorityzone,
        id: priorityzone.id,
        actions: () => (
            <Link href={`/oms/prioritylocationbyzone/edit/${priorityzone.id}`}>
                <a className="link-button">{t('prioritylocationbyzone:View')}</a>
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
                        getRows={getPriorityZoneList}
                        deleteRows={deletePriorityZone}
                        loading={loading}
                        columns={columns}
                        count={priorityZoneTotal}
                        showCheckbox
                        recordName="Priority Location by Zone"
                    />
                ) : (
                    <CustomList
                        filters={filters}
                        rows={rows}
                        getRows={getPriorityZoneList}
                        deleteRows={deletePriorityZone}
                        loading={loading}
                        columns={columns}
                        count={priorityZoneTotal}
                        showCheckbox
                        recordName="Priority Location by Zone"
                        hideColumn={false}
                        checkboxAll
                        twoColumns
                        handleClickRow={(id) => Router.push(`/oms/prioritylocationbyzone/edit/${id}`)}
                        usePagination
                    />
                )
            }
        </>
    );
};

export default PriorityZoneListContent;
