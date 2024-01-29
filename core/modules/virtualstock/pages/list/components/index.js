/* eslint-disable object-curly-newline */
import React from 'react';
import Router from 'next/router';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/virtualstock/pages/list/components/Header';
import CustomList from '@common_customlist';
import { breakPointsUp } from '@helper_theme';

const VirtualStockListContent = (props) => {
    const { data, loading, getVirtualStockList, multideleteVirtualStock, t } = props;
    const virtualStockList = (data && data.getVirtualStockList && data.getVirtualStockList.items) || [];
    const virtualStockTotal = (data && data.getVirtualStockList && data.getVirtualStockList.total_count) || 0;

    const desktop = breakPointsUp('sm');

    const columns = [
        { field: 'vs_id', headerName: t('virtualstock:ID'), sortable: true, initialSort: 'ASC' },
        { field: 'vs_name', headerName: t('virtualstock:Name'), sortable: true },
        { field: 'actions', headerName: t('virtualstock:Action'), hidden: !desktop },
    ];

    const filters = [
        { field: 'vs_id', name: 'vs_id_from', type: 'from', label: t('virtualstock:ID_From'), initialValue: '' },
        { field: 'vs_id', name: 'vs_id_to', type: 'to', label: t('virtualstock:ID_To'), initialValue: '' },
        { field: 'vs_name', name: 'vs_name', type: 'like', label: t('virtualstock:Name'), initialValue: '' },
    ];

    const rows = virtualStockList.map((virtualStock) => ({
        ...virtualStock,
        id: virtualStock.vs_id,
        actions: () => (
            <Link href={`/cataloginventory/virtualstock/edit/${virtualStock.vs_id}`}>
                <a className="link-button">{t('virtualstock:View')}</a>
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
                        getRows={getVirtualStockList}
                        deleteRows={multideleteVirtualStock}
                        loading={loading}
                        columns={columns}
                        hideColumns
                        count={virtualStockTotal}
                        showCheckbox
                        recordName="virtual stock"
                    />
                ) : (
                    <CustomList
                        filters={filters}
                        rows={rows}
                        getRows={getVirtualStockList}
                        deleteRows={multideleteVirtualStock}
                        loading={loading}
                        columns={columns}
                        count={virtualStockTotal}
                        showCheckbox
                        recordName="virtual stock"
                        checkboxAll
                        twoColumns={false}
                        handleClickRow={(id) => Router.push(`/cataloginventory/virtualstock/edit/${id}`)}
                        usePagination
                    />
                )
            }
        </>
    );
};

export default VirtualStockListContent;
