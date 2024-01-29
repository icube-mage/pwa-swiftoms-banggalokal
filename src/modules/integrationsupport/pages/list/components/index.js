/* eslint-disable no-unused-expressions */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import CustomList from '@common_customlist';
import Button from '@common_button';
import Autocomplete from '@common_autocomplete';
import TextField from '@common_textfield';
import Header from '@modules/integrationsupport/pages/list/components/Header';
import useStyles from '@modules/integrationsupport/pages/list/components/style';
import clsx from 'clsx';
import { breakPointsUp } from '@helper_theme';

import gqlMarketplace from '@modules/marketplace/services/graphql';
import gqlCompany from '@modules/company/services/graphql';
import gqlAdminStore from '@modules/adminstore/services/graphql';
import { optionsStatus } from '@modules/integrationsupport/helpers';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import AppModal from '@common_appmodal/index';
import IntegrationForm from './Integration';

const IntegrationSupportListContent = (props) => {
    const {
        data, loading, getMarketplaceIntegrationRequestList, handleUpdateStatus, t, marketplace_data, open,
        setOpen, marketplace, setMarketplace, integrateMarketplaceIntegrationRequest, refetch, setRemoteCompanyId, setActionStatus,
        actionStatus, brandId, setBrandId,
    } = props;
    const classes = useStyles();
    const integrationList = (data && data.getMarketplaceIntegrationRequestList && data.getMarketplaceIntegrationRequestList.items) || [];
    const integrationTotal = (data && data.getMarketplaceIntegrationRequestList && data.getMarketplaceIntegrationRequestList.total_count) || 0;

    const desktop = breakPointsUp('sm');

    const handleStatus = (status) => {
        switch (status) {
        case 'pending':
            return <RemoveCircleIcon className="icon pending" />;
        case 'processing':
            return <WatchLaterIcon className="icon processing" />;
        case 'complete':
            return <CheckCircleIcon className="icon complete" />;
        default:
            return <CancelIcon className="icon cancel" />;
        }
    };

    const handleActionStatus = (integration) => {
        const id = integration?.entity_id;
        const status = integration?.status;
        const mp = {
            id,
            marketplace_code: integration?.marketplace_data.marketplace_code,
            marketplace_name: integration?.marketplace_data.marketplace_name,
        };

        switch (status) {
        case 'pending':
            return (
                <Button
                    className={clsx(classes.btnAction, 'processing')}
                    buttonType="primary-rounded"
                    onClick={() => handleUpdateStatus(id, 'processing')}
                >
                    {t('process')}
                </Button>
            );
        case 'processing':
            return (
                <Button
                    className={clsx(classes.btnAction, 'integration')}
                    buttonType="primary-rounded"
                    onClick={() => {
                        handleUpdateStatus(id, 'integration');
                        setMarketplace(mp);
                        setRemoteCompanyId(integration.company_data.company_id);
                    }}
                >
                    {t('integration')}
                </Button>
            );
        default:
            return <span>-</span>;
        }
    };

    const columns = [
        { field: 'marketplace_code', headerName: t('integrationsupport:Marketplace'), hideable: true },
        { field: 'url_marketplace', headerName: t('integrationsupport:Marketplace_Url'), hideable: true },
        { field: 'company_id', headerName: t('integrationsupport:Company'), hideable: true },
        { field: 'requested_by', headerName: t('integrationsupport:Request_By'), hideable: true },
        { field: 'created_at', headerName: t('integrationsupport:Request_At'), sortable: true, hideable: true },
        { field: 'status', headerName: t('integrationsupport:Status'), sortable: true, hideable: true },
        { field: 'processed_by', headerName: t('integrationsupport:Processed_By'), hideable: true },
        { field: 'action', headerName: t('integrationsupport:Action') },
    ];

    const filters = [
        {
            field: 'marketplace_code',
            name: 'marketplace_code',
            type: 'eq',
            label: t('integrationsupport:Marketplace'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const [getMarketplaceList, getMarketplaceListRes] = gqlMarketplace.getMarketplaceList();
                const getMarketplaceListOptions = (getMarketplaceListRes
                        && getMarketplaceListRes.data
                        && getMarketplaceListRes.data.getMarketplaceList
                        && getMarketplaceListRes.data.getMarketplaceList.items)
                    || [];
                const primaryKey = 'marketplace_code';
                const labelKey = 'marketplace_name';

                return (
                    <Autocomplete
                        mode="lazy"
                        loading={getMarketplaceListRes?.loading}
                        getOptions={getMarketplaceList}
                        value={getMarketplaceListOptions.find((e) => e[primaryKey] === filterValue)}
                        onChange={(newValue) => {
                            setFilterValue(newValue && newValue[primaryKey]);
                        }}
                        options={getMarketplaceListOptions}
                        primaryKey={primaryKey}
                        labelKey={labelKey}
                    />
                );
            },
        },
        {
            field: 'company_id',
            name: 'company_id',
            type: 'eq',
            label: t('integrationsupport:Company'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const [getCompanyList, getCompanyListRes] = gqlCompany.getCompanyList();
                const getCompanyListOptions = (getCompanyListRes
                        && getCompanyListRes.data
                        && getCompanyListRes.data.getCompanyList
                        && getCompanyListRes.data.getCompanyList.items)
                    || [];
                const primaryKey = 'company_id';
                const labelKey = 'company_name';

                return (
                    <Autocomplete
                        mode="lazy"
                        loading={getCompanyListRes?.loading}
                        getOptions={getCompanyList}
                        value={getCompanyListOptions.find((e) => e[primaryKey].toString() === filterValue)}
                        onChange={(newValue) => {
                            setFilterValue(newValue && newValue[primaryKey].toString());
                        }}
                        options={getCompanyListOptions}
                        primaryKey={primaryKey}
                        labelKey={labelKey}
                    />
                );
            },
        },
        {
            field: 'requested_by',
            name: 'requested_by',
            type: 'eq',
            label: t('integrationsupport:Request_By'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const [getAdminStoreList, getAdminStoreListRes] = gqlAdminStore.getAdminStoreList();
                const getAdminStoreListOptions = (getAdminStoreListRes
                        && getAdminStoreListRes.data
                        && getAdminStoreListRes.data.getAdminStoreList
                        && getAdminStoreListRes.data.getAdminStoreList.items)
                    || [];
                const primaryKey = 'entity_id';
                const labelKey = 'email';

                return (
                    <Autocomplete
                        mode="lazy"
                        loading={getAdminStoreListRes?.loading}
                        getOptions={getAdminStoreList}
                        value={getAdminStoreListOptions.find((e) => e[primaryKey].toString() === filterValue)}
                        onChange={(newValue) => {
                            setFilterValue(newValue && newValue[primaryKey].toString());
                        }}
                        options={getAdminStoreListOptions}
                        primaryKey={primaryKey}
                        labelKey={labelKey}
                    />
                );
            },
        },
        {
            field: 'created_at',
            name: 'created_at_from',
            type: 'from',
            label: t('integrationsupport:Request_At_From'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    id="date"
                    type="date"
                    value={filterValue?.split(' ').slice(0, 1).join('')}
                    className={classes.textField}
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
            label: t('integrationsupport:Request_At_To'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    id="date"
                    type="date"
                    value={filterValue?.split(' ').slice(0, 1).join('')}
                    className={classes.textField}
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
        {
            field: 'status',
            name: 'status',
            type: 'eq',
            label: t('integrationsupport:Status'),
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
        marketplace_code: () => (
            <div className={classes.divImg}>
                <img src={integration.marketplace_data.image_url} alt={integration.marketplace_data.marketplace_name} />
            </div>
        ),
        company_id: integration.company_data.company_name,
        requested_by: () => (
            <div>
                <span>{integration.requestor_data.name}</span>
                <div className={classes.divRequest}>
                    <span>e: </span>
                    <span>{integration.requestor_data.email}</span>
                    <span>t : </span>
                    <span>{integration.requestor_data.telephone}</span>
                </div>
            </div>
        ),
        created_at: integration.created_at,
        status: () => (
            <div className={classes.divStatus}>
                {handleStatus(integration.status)}
                {integration.status}
            </div>
        ),
        processed_by: integration.processor_data?.name || '-',
        action: () => (
            <>{handleActionStatus(integration)}</>
        ),
    }));
    return (
        <>
            <Header t={t} />
            {desktop ? (
                <Table
                    filters={filters}
                    rows={rows}
                    getRows={getMarketplaceIntegrationRequestList}
                    loading={loading}
                    columns={columns}
                    count={integrationTotal}
                    hideActions
                />
            ) : (
                <CustomList
                    filters={filters}
                    rows={rows}
                    getRows={getMarketplaceIntegrationRequestList}
                    loading={loading}
                    columns={columns}
                    count={integrationTotal}
                    hideActions
                    hideColumn={false}
                    twoColumns
                    usePagination
                />
            )}

            <AppModal
                title={marketplace?.marketplace_name}
                show={open}
                onHandleClose={() => {
                    setOpen(false);
                    setBrandId(null);
                    setActionStatus(0);
                }}
                closeButton="x"
            >
                <div style={{ marginTop: 20 }}>
                    { actionStatus === 2 && marketplace_data && marketplace_data.marketplace_code ? (
                        <IntegrationForm
                            marketplace={marketplace}
                            reIntegrate={integrateMarketplaceIntegrationRequest}
                            data={marketplace_data}
                            refetch={refetch}
                            modal={setOpen}
                            brandId={brandId}
                            t={t}
                        />
                    ) : (
                        <>
                            <center>Please wait ...</center>
                        </>
                    )}
                </div>
            </AppModal>
        </>
    );
};

export default IntegrationSupportListContent;
