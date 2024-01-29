import Header from '@modules/stockadjustment/pages/list/components/Header';
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';

const StockAdjustmentList = (props) => {
    const {
        data, loading, getStockAdjustmentList, t,
    } = props;
    const stockAdjustmentList = (data && data.getStockAdjustmentList && data.getStockAdjustmentList.items) || [];
    const stockAdjustmentTotal = (data && data.getStockAdjustmentList && data.getStockAdjustmentList.total_count) || 0;

    const columns = [
        {
            field: 'increment_id',
            headerName: t('stockadjustment:ID'),
            hideable: 'true',
            sortable: true,
            initialSort: 'DESC',
        },
        {
            field: 'loc_name',
            headerName: t('stockadjustment:Location'),
            hideable: 'true',
            sortable: true,
        },
        {
            field: 'created_by',
            headerName: t('stockadjustment:Created_By'),
            hideable: 'true',
            sortable: true,
        },
        {
            field: 'created_at',
            headerName: t('stockadjustment:Created_At'),
            hideable: 'true',
            sortable: true,
        },
        {
            field: 'status_label',
            headerName: t('stockadjustment:Status'),
            hideable: 'true',
            sortable: true,
        },
        { field: 'actions', headerName: t('stockadjustment:Action') },
    ];

    const filters = [
        {
            field: 'increment_id',
            name: 'increment_id',
            type: 'like',
            label: t('stockadjustment:ID'),
            initialValue: '',
        },
        {
            field: 'loc_name',
            name: 'loc_name',
            type: 'like',
            label: t('stockadjustment:Location'),
            initialValue: '',
        },
        {
            field: 'created_by',
            name: 'created_by',
            type: 'like',
            label: t('stockadjustment:Created_By'),
            initialValue: '',
        },
    ];

    const rows = stockAdjustmentList.map((stockAdjustment) => ({
        ...stockAdjustment,
        id: stockAdjustment.entity_id,
        actions: () => (
            <Link href={`/cataloginventory/stockadjustment/${stockAdjustment.entity_id}/edit`}>
                <a className="link-button">{t('stockadjustment:View')}</a>
            </Link>
        ),
    }));

    return (
        <>
            <Header t={t} />
            <Table
                hideActions
                filters={filters}
                rows={rows}
                getRows={getStockAdjustmentList}
                loading={loading}
                columns={columns}
                count={stockAdjustmentTotal}
            />
        </>
    );
};

export default StockAdjustmentList;
