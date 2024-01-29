/* eslint-disable no-useless-escape */
/* eslint-disable object-curly-newline */
import React, { useState } from 'react';
import Link from 'next/link';

import Table from '@common_table';
import Autocomplete from '@common_autocomplete';
import Switch from '@common_switch';

import gqlService from '@modules/integrationautomation/services/graphql';
import Header from '@modules/integrationautomation/pages/list/components/Header';

const LocationListContent = (props) => {
    const { data, loading, getAutomationList, deleteAutomation, t, handleUpdateStatus } = props;
    const dataList = (data && data.getAutomationList && data.getAutomationList.items) || [];
    const dataTotal = (data && data.getAutomationList && data.getAutomationList.total_count) || 0;

    const columns = [
        { field: 'name', headerName: t('integrationautomation:Name'), sortable: true, hideable: true },
        { field: 'event', headerName: t('integrationautomation:Event'), hideable: true },
        { field: 'status', headerName: t('integrationautomation:Status'), hideable: true },
        { field: 'created_at', headerName: t('integrationautomation:Created_At'), sortable: true, hideable: true },
        { field: 'created_by', headerName: t('integrationautomation:Created_By'), hideable: true },
        { field: 'updated_at', headerName: t('integrationautomation:Updated_At'), sortable: true, hideable: true },
        { field: 'updated_by', headerName: t('integrationautomation:Updated_By'), hideable: true },
        { field: 'action', headerName: t('integrationautomation:Action') },
    ];

    const filters = [
        { field: 'name', name: 'name', type: 'like', label: t('integrationautomation:Name'), initialValue: '' },
        {
            field: 'event_id',
            name: 'event_id',
            type: 'eq',
            label: t('integrationautomation:Event'),
            component: ({ filterValue, setFilterValue }) => {
                const [getEventList, getEventListRes] = gqlService.getEventList();
                const [eventOption, setEventOption] = useState([]);
                const [searchEvent, setSearchEvent] = useState('');

                React.useEffect(() => {
                    if (
                        getEventListRes
                        && getEventListRes.data
                        && getEventListRes.data.getEventList
                        && getEventListRes.data.getEventList.items
                    ) {
                        const ids = new Set(eventOption.map((d) => d.event_id));
                        setEventOption([...eventOption, ...getEventListRes.data.getEventList.items.filter((d) => !ids.has(d.event_id))]);
                    }
                }, [getEventListRes.data]);

                React.useEffect(() => {
                    const onChangeTimeOut = setTimeout(() => {
                        if (searchEvent) {
                            getEventList({
                                variables: {
                                    filter: {
                                        event_label: {
                                            like: searchEvent,
                                        },
                                    },
                                    pageSize: 20,
                                    currentPage: 1,
                                },
                            });
                        }

                        return null;
                    }, 500);

                    return () => clearTimeout(onChangeTimeOut);
                }, [searchEvent]);
                const primaryKey = 'event_id';
                const labelKey = 'event_label';
                return (
                    <Autocomplete
                        mode={eventOption.length > 0 ? 'default' : 'lazy'}
                        value={eventOption.find((e) => String(e[primaryKey]) === filterValue)}
                        onChange={(newValue) => setFilterValue(newValue && String(newValue[primaryKey]))}
                        options={eventOption}
                        getOptions={getEventList}
                        getOptionsVariables={{
                            variables: {
                                pageSize: 20,
                                currentPage: 1,
                            },
                        }}
                        loading={getEventListRes.loading}
                        primaryKey={primaryKey}
                        labelKey={labelKey}
                        onInputChange={(e) => setSearchEvent(e && e.target && e.target.value)}
                    />
                );
            },
        },
        {
            field: 'status',
            name: 'status',
            type: 'eq',
            label: t('integrationautomation:Status'),
            component: ({ filterValue, setFilterValue }) => {
                const options = [
                    { name: 'Active', id: '1' },
                    { name: 'Inactive', id: '0' },
                ];
                return (
                    <Autocomplete
                        value={options.find((e) => e.id === filterValue)}
                        onChange={(newValue) => setFilterValue(newValue && newValue.id)}
                        options={options}
                    />
                );
            },
        },
        { field: 'created_by', name: 'created_by', type: 'like', label: t('integrationautomation:Created_By') },
        { field: 'updated_by', name: 'updated_by', type: 'like', label: t('integrationautomation:Updated_By') },
    ];

    const rows = dataList.map((row) => ({
        ...row,
        id: row.automation_id,
        name: row.name,
        status: () => (
            <Switch
                value={row.status}
                onChange={(e) => handleUpdateStatus([row.automation_id], e.target.checked)}
                trueLabel=""
                falseLabel=""
            />
        ),
        action: () => (
            <Link href={`/integration/automation/edit/${row.automation_id}`}>
                <a className="link-button">{t('integrationautomation:Edit')}</a>
            </Link>
        ),
    }));

    const actions = [
        {
            label: t('integrationautomation:Delete'),
            message: t('integrationautomation:Are_you_sure_want_to_delete_selected_items'),
            confirmDialog: true,
            onClick: async (checkedRows) => {
                const variables = { ids: checkedRows.map((checkedRow) => checkedRow.id) };
                await deleteAutomation({ variables })
                    .then((res) => {
                        if (res.data.deleteAutomation) {
                            window.backdropLoader(false);
                            window.toastMessage({
                                open: true,
                                text: t('integrationautomation:Integration_Automation_has_been_deleted'),
                                variant: 'success',
                            });
                        } else {
                            throw new Error(t('integrationautomation:Failed_to_delete_automation'));
                        }
                    }).catch((e) => {
                        window.backdropLoader(false);
                        window.toastMessage({
                            open: true,
                            text: e.message,
                            variant: 'error',
                        });
                    });
            },
        },
        {
            label: t('integrationautomation:Set_Status_to_\"Active\"'),
            confirmDialog: false,
            onClick: async (checkedRows) => {
                const ids = checkedRows.map((checkedRow) => checkedRow.id);
                handleUpdateStatus(ids, true);
            },
        },
        {
            label: t('integrationautomation:Set_Status_to_\"Inactive\"'),
            confirmDialog: false,
            onClick: async (checkedRows) => {
                const ids = checkedRows.map((checkedRow) => checkedRow.id);
                handleUpdateStatus(ids, false);
            },
        },
    ];

    return (
        <>
            <Header t={t} />
            <Table
                filters={filters}
                rows={rows}
                getRows={getAutomationList}
                loading={loading}
                columns={columns}
                count={dataTotal}
                showCheckbox
                actions={actions}
            />
        </>
    );
};

export default LocationListContent;
