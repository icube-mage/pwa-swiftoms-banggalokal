/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/categorybychannel/pages/list/components/Header';

const CategoryByChannelContent = (props) => {
    const { data, loading, getCategoryByChannelList } = props;
    const categoryByChannelList = (data && data.getCategoryByChannelList && data.getCategoryByChannelList.items) || [];
    const categoryByChannelTotal = (data && data.getCategoryByChannelList && data.getCategoryByChannelList.total_count) || 0;

    const columns = [
        { field: 'entity_id', headerName: 'ID', sortable: true, initialSort: 'ASC', hideable: true },
        { field: 'channel_code', headerName: 'Channel', sortable: true, hideable: true },
        { field: 'name', headerName: 'Name', sortable: true, hideable: true },
        { field: 'path', headerName: 'Path', sortable: true, hideable: true },
    ];

    const filters = [
        { field: 'entity_id', name: 'id_from', type: 'from', label: 'ID From', initialValue: '' },
        { field: 'entity_id', name: 'id_to', type: 'to', label: 'ID To', initialValue: '' },
        { field: 'channel_code', name: 'channel_code', type: 'like', label: 'Channel Code', initialValue: '' },
        { field: 'name', name: 'name', type: 'like', label: 'Name', initialValue: '' },
    ];

    const rows = categoryByChannelList.map((categorybychannel) => ({
        ...categorybychannel,
        id: categorybychannel.channel_code,
    }));

    return (
        <>
            <Header />
            <Table
                filters={filters}
                rows={rows}
                getRows={getCategoryByChannelList}
                loading={loading}
                columns={columns}
                count={categoryByChannelTotal}
                hideActions
            />
        </>
    );
};

export default CategoryByChannelContent;
