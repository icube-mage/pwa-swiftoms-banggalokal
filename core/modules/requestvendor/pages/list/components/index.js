/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Autocomplete from '@common_autocomplete';
import Tabs from '@common_tabs';
import Header from '@modules/requestvendor/pages/list/components/Header';
import { optionsStatus, dataTab } from '@modules/requestvendor/helpers';

const RequestVendorListContent = (props) => {
    const { data, loading, getVendorRequestList, t } = props;
    const vendorRequestList = (data && data.getVendorRequestList && data.getVendorRequestList.items) || [];
    const vendorRequestTotal = (data && data.getVendorRequestList && data.getVendorRequestList.total_count) || 0;
    const [tab, setTab] = React.useState('pending');
    const [load, setLoad] = React.useState(false);

    const columns = [
        { field: 'first_name', headerName: t('requestvendor:Name'), sortable: true },
        { field: 'email', headerName: t('requestvendor:Email'), sortable: true },
        { field: 'no_telephone', headerName: t('requestvendor:Phone_Number'), sortable: true },
        { field: 'company_name', headerName: t('requestvendor:Store_Name'), sortable: true },
        { field: 'actions', headerName: t('requestvendor:Action'), hideable: true },
    ];

    const filters = [
        { field: 'status',
            name: 'status',
            type: 'eq',
            label: t('requestvendor:Status'),
            initialValue: tab,
        },
    ];

    const rows = vendorRequestList.map((vendorRequest) => ({
        ...vendorRequest,
        actions: () => (
            <Link href={`/vendorportal/requestvendor/edit/${vendorRequest.entity_id}`}>
                <a className="link-button">{t('requestvendor:View')}</a>
            </Link>
        ),
    }));

    const onChangeTab = async (e, v) => {
        setLoad(true);
        await setTab(v);
        setLoad(false);
    };

    return (
        <>
            <Header t={t} />
            <Tabs data={dataTab} onChange={onChangeTab} value={tab} allItems={false} />
            {!load && (
                <Table
                    hideFilters
                    filters={filters}
                    rows={rows}
                    getRows={getVendorRequestList}
                    loading={loading}
                    columns={columns}
                    count={vendorRequestTotal}
                    hideActions
                    hideColumns
                    searchable
                    searchPlaceholder={t('requestvendor:Search_by_name_or_email')}
                />
            )}
        </>
    );
};

export default RequestVendorListContent;
