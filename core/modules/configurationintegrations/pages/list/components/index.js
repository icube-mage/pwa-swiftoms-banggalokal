/* eslint-disable object-curly-newline */
import React from 'react';
import Router from 'next/router';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/configurationintegrations/pages/list/components/Header';
import CustomList from '@common_customlist';
import Autocomplete from '@common_autocomplete';
import { optionsStatus } from '@modules/configurationintegrations/helpers';
import { breakPointsUp } from '@helper_theme';
import useStyles from '@modules/configurationintegrations/pages/list/components/Header/style';

const CompanyListContent = (props) => {
    const { data, loading, getIntegrationList, deleteIntegration, handleReauthorize, handleActivate, t } = props;
    const integrationList = (data && data.getIntegrationList && data.getIntegrationList.items) || [];
    const integrationTotal = (data && data.getIntegrationList && data.getIntegrationList.total_count) || 0;

    const desktop = breakPointsUp('sm');
    const classes = useStyles();

    const columns = [
        { field: 'name', headerName: t('configurationintegrations:Name'), sortable: true, initialSort: 'ASC', hideable: true },
        { field: 'status', headerName: t('configurationintegrations:Status'), sortable: true, hideable: true },
        { field: 'activate', headerName: t('configurationintegrations:Activate'), hideable: true },
        { field: 'actions', headerName: t('configurationintegrations:Action'), hideable: true, hidden: !desktop },
    ];

    const filters = [
        { field: 'name', name: 'name', type: 'like', label: t('configurationintegrations:Name'), initialValue: '' },
        {
            field: 'status',
            name: 'status',
            type: 'eq',
            label: t('configurationintegrations:Status'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <Autocomplete
                    value={optionsStatus.find((e) => e.id === filterValue)}
                    onChange={(newValue) => setFilterValue(newValue && newValue.id)}
                    options={optionsStatus}
                />
            ),
        },
    ];

    const rows = integrationList.map((integration) => ({
        ...integration,
        id: integration.integration_id,
        status: integration.status_label,
        activate: () => (
            <div>
                {integration.status === 1 ? (
                    <button
                        className={classes.buttonHandle}
                        type="submit"
                        onClick={() => {
                            handleReauthorize(integration.integration_id, true);
                        }}
                    >
                        {t('configurationintegrations:Reauthorize')}
                    </button>
                ) : (
                    <button
                        className={classes.buttonHandle}
                        type="submit"
                        onClick={() => {
                            handleActivate(integration.integration_id, false);
                        }}
                    >
                        {t('configurationintegrations:Activate')}
                    </button>
                )}
            </div>
        ),
        actions: () => (
            <Link href={`/configurations/integrations/edit/${integration.integration_id}`}>
                <a className="link-button">{t('configurationintegrations:Edit')}</a>
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
                        getRows={getIntegrationList}
                        deleteRows={deleteIntegration}
                        loading={loading}
                        columns={columns}
                        count={integrationTotal}
                        showCheckbox
                    />
                ) : (
                    <CustomList
                        filters={filters}
                        rows={rows}
                        getRows={getIntegrationList}
                        deleteRows={deleteIntegration}
                        loading={loading}
                        columns={columns}
                        count={integrationTotal}
                        showCheckbox
                        hideColumn={false}
                        checkboxAll
                        twoColumns
                        handleClickRow={(id) => Router.push(`/configurations/integrations/edit/${id}`)}
                        usePagination
                    />
                )
            }
        </>
    );
};

export default CompanyListContent;
