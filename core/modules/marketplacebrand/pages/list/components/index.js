/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/marketplacebrand/pages/list/components/Header';

const AdminStoreContent = (props) => {
    const { data, loading, getStoreList } = props;
    const storeList = (data && data.getStoreList && data.getStoreList.items) || [];
    const storeTotal = (data && data.getStoreList && data.getStoreList.total_count) || 0;

    const columns = [
        { field: 'channel_store_id', headerName: 'Channel Store Id', sortable: true },
        { field: 'name', headerName: 'Name', sortable: true },
        { field: 'actions', headerName: 'Action' },
    ];

    const rows = storeList.map((store) => ({
        ...store,
        actions: () => (
            <Link href={`/configurations/marketplacebrand/view/${store.id}`}>
                <a className="link-button">View</a>
            </Link>
        ),
    }));

    const filters = [
        { field: 'channel_store_id', name: 'channel_store_id_from', type: 'from', label: 'Channel Store Id from', initialValue: '' },
        { field: 'channel_store_id', name: 'channel_store_id_to', type: 'to', label: 'Channel Store Id to', initialValue: '' },
        { field: 'name', name: 'name', type: 'like', label: 'Name', initialValue: '' },
    ];

    return (
        <>
            <Header />
            <Table
                rows={rows}
                getRows={getStoreList}
                loading={loading}
                columns={columns}
                count={storeTotal}
                filters={filters}
                hideActions
                hideColumns
            />
        </>
    );
};

export default AdminStoreContent;
