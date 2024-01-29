/* eslint-disable object-curly-newline */
import React from 'react';
import Link from 'next/link';

import Table from '@common_table';
import Autocomplete from '@common_autocomplete';
import Switch from '@common_switch';

import Header from '@modules/integrationthirdpartyapps/pages/list/components/Header';

const LocationListContent = (props) => {
    const { data, loading, getIntegrationAppList, deleteIntegrationApp, handleUpdateStatus, t } = props;
    const thirdPartyList = (data && data.getIntegrationAppList && data.getIntegrationAppList.items) || [];
    const thirdPartyTotal = (data && data.getIntegrationAppList && data.getIntegrationAppList.total_count) || 0;

    const columns = [
        { field: 'name', headerName: t('thirdpartyapps:Name'), sortable: true, hideable: true },
        { field: 'status', headerName: t('thirdpartyapps:Status'), sortable: true, hideable: true },
        { field: 'action', headerName: t('thirdpartyapps:Action') },
    ];

    const filters = [
        { field: 'name', name: 'name', type: 'like', label: t('integrationthirdpartyapps:Name'), initialValue: '' },
        {
            field: 'status',
            name: 'status',
            type: 'eq',
            label: t('integrationthirdpartyapps:Status'),
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
    ];

    const rows = thirdPartyList.map((row) => ({
        ...row,
        id: row.entity_id,
        name: row.name,
        status: () => (
            <Switch
                value={row.status}
                onChange={(e) => handleUpdateStatus(row, e.target.checked)}
                trueLabel=""
                falseLabel=""
            />
        ),
        action: () => (
            <Link href={`/integration/thirdpartyapps/edit/${row.entity_id}`}>
                <a className="link-button">{t('integrationthirdpartyapps:Edit')}</a>
            </Link>
        ),
    }));

    const actions = [
        {
            label: t('integrationthirdpartyapps:Delete'),
            message: t('integrationthirdpartyapps:Are_you_sure_want_to_delete_selected_items'),
            confirmDialog: true,
            onClick: async (checkedRows) => {
                const variables = { ids: checkedRows.map((checkedRow) => checkedRow.id) };
                await deleteIntegrationApp({ variables })
                    .then((res) => {
                        if (res.data.deleteIntegrationApp) {
                            window.backdropLoader(false);
                            window.toastMessage({
                                open: true,
                                text: t('integrationthirdpartyapps:Third_Party_Apps_has_been_deleted'),
                                variant: 'success',
                            });
                        } else {
                            throw new Error(t('integrationthirdpartyapps:Failed_to_delete_apps'));
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
    ];

    return (
        <>
            <Header t={t} />
            <Table
                filters={filters}
                rows={rows}
                getRows={getIntegrationAppList}
                loading={loading}
                columns={columns}
                count={thirdPartyTotal}
                showCheckbox
                actions={actions}
            />
        </>
    );
};

export default LocationListContent;
