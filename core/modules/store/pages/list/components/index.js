/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/store/pages/list/components/Header';

const StoreListContent = (props) => {
    const { data, loading, getStoreList } = props;
    const storeList = (data && data.getStoreList && data.getStoreList.items) || [];
    const storeTotal = (data && data.getStoreList && data.getStoreList.total_count) || 0;

    const columns = [
        { field: 'id', headerName: 'ID', sortable: true, hideable: true, initialSort: 'ASC' },
        { field: 'channel_store_id', headerName: 'Store ID', sortable: true, hideable: true },
        { field: 'name', headerName: 'Name', sortable: true, hideable: true },
        { field: 'telephone', headerName: 'Telephone', sortable: true, hideable: true },
        { field: 'category', headerName: 'Category', sortable: true, hideable: true },
        { field: 'actions', headerName: 'Actions' },
    ];

    const filters = [
        { field: 'id', name: 'id', type: 'from', label: 'ID', initialValue: '' },
        { field: 'channel_store_id', name: 'channel_store_id', type: 'from', label: 'Store ID', initialValue: '' },
        { field: 'name', name: 'name', type: 'like', label: 'Name', initialValue: '' },
        { field: 'telephone', name: 'telephone', type: 'like', label: 'Telephone', initialValue: '' },
        { field: 'category', name: 'category', type: 'like', label: 'Category', initialValue: '' },
    ];

    const rows = storeList.map((store) => ({
        ...store,
        id: store.id,
        actions: () => (
            <Link href={`/marketplace/store/edit/${store.id}`}>
                <a className="link-button">View</a>
            </Link>
        ),
    }));

    return (
        <>
            <Header />
            <Table filters={filters} rows={rows} getRows={getStoreList} loading={loading} columns={columns} count={storeTotal} />
        </>
    );
};

export default StoreListContent;
