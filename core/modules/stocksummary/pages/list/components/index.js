import Header from '@modules/stocksummary/pages/list/components/Header';
import React from 'react';
import Table from '@common_table';
import Autocomplete from '@common_autocomplete';
import useStyles from '@modules/stocksummary/pages/list/components/style';
import gqlChannel from '@modules/channel/services/graphql';
import { optionsStatusSync } from '@modules/stocksummary/helpers';

const StockSummaryList = (props) => {
    const classes = useStyles();
    const {
        data, loading, getStockSummaryList, t,
    } = props;
    const stockSummaryList = (data && data.getStockSummaryList && data.getStockSummaryList.items) || [];
    const stockSummaryTotal = (data && data.getStockSummaryList && data.getStockSummaryList.total_count) || 0;

    const columns = [
        {
            field: 'sku',
            headerName: t('stocksummary:SKU'),
            hideable: 'true',
            sortable: true,
            initialSort: 'ASC',
        },
        {
            field: 'product_name',
            headerName: t('stocksummary:Name'),
            hideable: 'true',
            sortable: true,
            hiddenMobile: true,
        },
        {
            field: 'channel_name',
            headerName: t('stocksummary:Channel'),
            hideable: 'true',
            sortable: true,
        },
        {
            field: 'channel_stock',
            headerName: t('stocksummary:Stock'),
            hideable: 'true',
            sortable: true,
        },
        {
            field: 'updated_at',
            headerName: t('stocksummary:Updated_At'),
            hideable: 'true',
            sortable: true,
            hiddenMobile: true,
        },
        {
            field: 'last_sync_at',
            headerName: t('stocksummary:Last_Sync_at'),
            hideable: 'true',
            sortable: true,
            hiddenMobile: true,
        },
        {
            field: 'sync_status_label',
            headerName: t('stocksummary:Sync_Status'),
            hideable: 'true',
            sortable: true,
        },
        {
            field: 'sync_message',
            headerName: t('stocksummary:Sync_Message'),
            hideable: 'true',
            sortable: true,
            hiddenMobile: true,
        },
    ];

    const filters = [
        {
            field: 'sku',
            name: 'sku',
            type: 'like',
            label: t('stocksummary:SKU'),
            initialValue: '',
        },
        {
            field: 'product_name',
            name: 'product_name',
            type: 'like',
            label: t('stocksummary:Name'),
            initialValue: '',
        },
        {
            field: 'channel_code',
            name: 'channel_code',
            type: 'in',
            label: t('stocksummary:Channel'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const [getChannelList, getChannelListRes] = gqlChannel.getChannelList();
                const channelOptions = (getChannelListRes
                        && getChannelListRes.data
                        && getChannelListRes.data.getChannelList
                        && getChannelListRes.data.getChannelList.items)
                    || [];
                const primaryKey = 'channel_code';
                const labelKey = 'channel_name';
                return (
                    <Autocomplete
                        mode="lazy"
                        multiple
                        loading={getChannelListRes?.loading}
                        getOptions={getChannelList}
                        value={(filterValue || []).map((option) => channelOptions.find((e) => e[primaryKey] === option))}
                        onChange={(newValue) => setFilterValue((newValue || []).map((option) => option && option[primaryKey]))}
                        options={channelOptions}
                        primaryKey={primaryKey}
                        labelKey={labelKey}
                    />
                );
            },
        },
        {
            field: 'sync_status',
            name: 'sync_status',
            type: 'like',
            label: t('stocksummary:Sync_Status'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <Autocomplete
                    value={optionsStatusSync.find((e) => e.value === filterValue)}
                    onChange={(newValue) => setFilterValue(newValue && newValue.value)}
                    options={optionsStatusSync}
                    primaryKey="value"
                    labelKey="label"
                />
            ),
        },
        {
            field: 'sync_message',
            name: 'sync_message',
            type: 'like',
            label: t('stocksummary:Sync_Message'),
            initialValue: '',
        },
    ];

    const getStatusColor = (status) => {
        switch (status) {
        case 'pending':
            return classes.statusProcessing;
        case 'success':
            return classes.statusSuccess;
        case 'failed':
            return classes.statusFailed;
        default:
            return classes.statusClosed;
        }
    };

    const rows = stockSummaryList.map((stockSummary) => ({
        ...stockSummary,
        id: stockSummary.entity_id,
        sync_status_label: <div className={getStatusColor(stockSummary.sync_status)}>{stockSummary.sync_status_label ?? 'Unknown'}</div>,
    }));

    return (
        <>
            <Header t={t} />
            <Table
                hideActions
                filters={filters}
                rows={rows}
                getRows={getStockSummaryList}
                loading={loading}
                columns={columns}
                count={stockSummaryTotal}
            />
        </>
    );
};

export default StockSummaryList;
