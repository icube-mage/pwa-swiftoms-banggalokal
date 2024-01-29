/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/configurationlogistixprovider/pages/list/components/Header';

const LogistixProviderListContent = (props) => {
    const { getLogistixProviderList, data, loading, deleteLogistixProvider, t } = props;
    const logistixProviderList = (data && data.getLogistixProviderList && data.getLogistixProviderList.items) || [];
    const logistixProviderTotal = (data && data.getLogistixProviderList && data.getLogistixProviderList.total_count) || 0;

    const columns = [
        { field: 'entity_id', headerName: t('logistixproviderconfiguration:ID'), sortable: true, initialSort: 'DESC', hideable: true },
        { field: 'channel_shipping_method', headerName: t('logistixproviderconfiguration:Channel_Shipping_Method'), sortable: true, hideable: true },
        { field: 'provider', headerName: t('logistixproviderconfiguration:Provider'), sortable: true, hideable: true },
        { field: 'service', headerName: t('logistixproviderconfiguration:Service'), hideable: true },
        { field: 'action', headerName: t('logistixproviderconfiguration:Action'), hideable: true },
    ];

    const filters = [
        { field: 'entity_id', name: 'entity_id', type: 'eq', label: 'ID', initialValue: '' },
        { field: 'channel_shipping_method', name: 'channel_shipping_method', type: 'like', label: t('logistixproviderconfiguration:Channel_Shipping_Method'), initialValue: '' },
        { field: 'provider', name: 'provider', type: 'like', label: 'Provider', initialValue: '' },
        { field: 'service', name: 'service', type: 'like', label: 'Service', initialValue: '' },
    ];

    const rows = logistixProviderList.map((logistix) => ({
        ...logistix,
        id: logistix.entity_id,
        action: () => (
            <Link href={`/configurations/logistixprovider/edit/${logistix.entity_id}`}>
                <a className="link-button">{t('logistixproviderconfiguration:view')}</a>
            </Link>
        ),
    }));

    return (
        <>
            <Header t={t} />
            <Table
                filters={filters}
                rows={rows}
                getRows={getLogistixProviderList}
                loading={loading}
                columns={columns}
                count={logistixProviderTotal}
                deleteRows={deleteLogistixProvider}
                showCheckbox
                recordName="logistix provider"
            />
        </>
    );
};

export default LogistixProviderListContent;
