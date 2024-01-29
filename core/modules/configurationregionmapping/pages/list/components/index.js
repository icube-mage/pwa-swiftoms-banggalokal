/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import TextField from '@common_textfield';
import Header from '@modules/configurationregionmapping/pages/list/components/Header';
import useStyles from '@modules/configurationregionmapping/pages/list/components/style';

const RegionChannelListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getChannelRegionList, deleteChannelRegions, t } = props;
    const regionList = (data && data.getChannelRegionList && data.getChannelRegionList.items) || [];
    const regionTotal = (data && data.getChannelRegionList && data.getChannelRegionList.total_count) || 0;

    const columns = [
        { field: 'id', headerName: t('regionmappingconfiguration:ID'), sortable: true, initialSort: 'DESC', hideable: true },
        { field: 'region_raw', headerName: t('regionmappingconfiguration:Region_Raw'), sortable: true, hideable: true },
        { field: 'code', headerName: t('regionmappingconfiguration:Code'), sortable: true, hideable: true },
        { field: 'created_at', headerName: t('regionmappingconfiguration:Created_At'), sortable: true, hideable: true },
        { field: 'actions', headerName: t('regionmappingconfiguration:Action'), hideable: true },
    ];

    const filters = [
        { field: 'id', name: 'id_from', type: 'from', label: t('regionmappingconfiguration:ID_from'), initialValue: '' },
        { field: 'id', name: 'id_to', type: 'to', label: t('regionmappingconfiguration:ID_to'), initialValue: '' },
        {
            field: 'created_at',
            name: 'created_at_from',
            type: 'from',
            label: t('regionmappingconfiguration:Created_From'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    id="date"
                    type="date"
                    value={filterValue?.split(' ').slice(0, 1).join('')}
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
            name: 'created_at_to',
            type: 'to',
            label: t('regionmappingconfiguration:Created_To'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    id="date"
                    type="date"
                    value={filterValue?.split(' ').slice(0, 1).join('')}
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
        { field: 'region_raw', name: 'region_raw', type: 'like', label: t('regionmappingconfiguration:Channel_Code'), initialValue: '' },
        { field: 'code', name: 'code', type: 'like', label: t('regionmappingconfiguration:Code'), initialValue: '' },
    ];

    const rows = regionList.map((region) => ({
        ...region,
        actions: () => (
            <Link href={`/configurations/regionmapping/edit/${region.id}`}>
                <a className="link-button">{t('regionmappingconfiguration:View')}</a>
            </Link>
        ),
    }));

    return (
        <>
            <Header t={t} />
            <Table
                filters={filters}
                rows={rows}
                getRows={getChannelRegionList}
                deleteRows={deleteChannelRegions}
                loading={loading}
                columns={columns}
                count={regionTotal}
                showCheckbox
                recordName="region"
            />
        </>
    );
};

export default RegionChannelListContent;
