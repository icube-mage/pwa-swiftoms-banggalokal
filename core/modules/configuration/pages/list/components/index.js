/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Autocomplete from '@common_autocomplete';
import channelGqlService from '@modules/channel/services/graphql';
import Header from '@modules/configuration/pages/list/components/Header';

const ConfigurationTadaListContent = (props) => {
    const { data, loading, getConfigurationTadaList, multideleteConfigurationTada, t } = props;
    const configurationTadaList = (data && data.getConfigurationTadaList && data.getConfigurationTadaList.items) || [];
    const configurationTadaTotal = (data && data.getConfigurationTadaList && data.getConfigurationTadaList.total_count) || 0;

    const columns = [
        { field: 'id', headerName: t('configuration:ID'), sortable: true, initialSort: 'ASC' },
        { field: 'channel_name', headerName: t('configuration:Sales_Channel'), sortable: true, hideable: true },
        { field: 'username', headerName: t('configuration:Username'), sortable: true, hideable: true },
        { field: 'password', headerName: t('configuration:Password'), sortable: true, hideable: true },
        { field: 'api_key', headerName: t('configuration:Api_Key'), sortable: true, hideable: true },
        { field: 'api_secret', headerName: t('configuration:Api_Secret'), sortable: true, hideable: true },
        { field: 'program_id', headerName: t('configuration:Program_ID'), sortable: true, hideable: true },
        { field: 'actions', headerName: t('configuration:Action') },
    ];

    const filters = [
        { field: 'id', name: 'id_from', type: 'from', label: t('configuration:ID_From'), initialValue: '' },
        { field: 'id', name: 'id_to', type: 'to', label: t('configuration:ID_To'), initialValue: '' },
        {
            field: 'channel_name',
            name: 'channel_name',
            type: 'eq',
            label: t('configuration:Sales_Channel'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const [getChannelList, getChannelListRes] = channelGqlService.getChannelList();
                const channelOptions = (getChannelListRes
                        && getChannelListRes.data
                        && getChannelListRes.data.getChannelList
                        && getChannelListRes.data.getChannelList.items)
                    || [];
                const primaryKey = 'channel_name';
                const labelKey = 'channel_name';
                return (
                    <Autocomplete
                        mode="lazy"
                        getOptions={getChannelList}
                        value={channelOptions.find((e) => e[primaryKey] === filterValue)}
                        onChange={(newValue) => setFilterValue(newValue && newValue[primaryKey])}
                        options={channelOptions}
                        getOptionsVariables={{
                            variables: {
                                pageSize: null,
                                currentPage: 1,
                            },
                        }}
                        primaryKey={primaryKey}
                        labelKey={labelKey}
                    />
                );
            },
        },
        { field: 'username', name: 'username', type: 'like', label: t('configuration:Username'), initialValue: '' },
        { field: 'password', name: 'password', type: 'like', label: t('configuration:Password'), initialValue: '' },
        { field: 'api_key', name: 'api_key', type: 'like', label: t('configuration:Api_Key'), initialValue: '' },
        { field: 'api_secret', name: 'api_secret', type: 'like', label: t('configuration:Api_Secret'), initialValue: '' },
        { field: 'program_id', name: 'program_id', type: 'like', label: t('configuration:Program_ID'), initialValue: '' },
    ];

    const rows = configurationTadaList.map((configurationTada) => ({
        ...configurationTada,
        id: configurationTada.id,
        actions: () => (
            <Link href={`/tada/configuration/edit/${configurationTada.id}`}>
                <a className="link-button">{t('configuration:View')}</a>
            </Link>
        ),
    }));

    return (
        <>
            <Header t={t} />
            <Table
                filters={filters}
                rows={rows}
                getRows={getConfigurationTadaList}
                deleteRows={multideleteConfigurationTada}
                loading={loading}
                columns={columns}
                count={configurationTadaTotal}
                showCheckbox
                recordName="configuration"
            />
        </>
    );
};

export default ConfigurationTadaListContent;
