/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-expressions */
import React from 'react';
import Table from '@common_table';
import Header from '@modules/history/pages/list/components/Header';
import useStyles from '@modules/history/pages/list/components/style';
import TextField from '@common_textfield';

const UpdateStockHistoryListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getHistoryUpdateStockList, t } = props;
    const historyUpdateStockList = (data && data.getHistoryUpdateStockList && data.getHistoryUpdateStockList.items) || [];
    const historyUpdateStockTotal = (data && data.getHistoryUpdateStockList && data.getHistoryUpdateStockList.total_count) || 0;

    const columns = [
        { field: 'entity_id', headerName: t('history:ID') },
        { field: 'type', headerName: t('history:Type') },
        { field: 'sku', headerName: t('history:SKU'), hideable: true, sortable: true },
        { field: 'marketplace', headerName: t('history:Channel'), hideable: true, sortable: true },
        { field: 'channel_code', headerName: t('history:Channel_Code'), hideable: true, sortable: true },
        { field: 'message', headerName: t('history:Message'), hideable: true, sortable: true },
        { field: 'status', headerName: t('history:Status'), hideable: true, sortable: true },
        { field: 'created_at', headerName: t('history:Updated_At'), hideable: true, sortable: true },
        { field: 'last_trigered_by', headerName: t('history:Updated_By'), hideable: true, sortable: true },
    ];

    const filters = [
        { field: 'entity_id', name: 'entity_id_from', type: 'from', label: t('history:ID_From') },
        { field: 'entity_id', name: 'entity_id_to', type: 'to', label: t('history:ID_To') },
        { field: 'type', name: 'type', type: 'like', label: t('history:Type') },
        { field: 'message', name: 'message', type: 'like', label: t('history:Message') },
        { field: 'status', name: 'status', type: 'like', label: t('history:Status') },
        { field: 'sku', name: 'sku', type: 'like', label: t('history:SKU') },
        { field: 'marketplace', name: 'marketplace', type: 'like', label: t('history:Channel') },
        { field: 'channel_code', name: 'channel_code', type: 'like', label: t('history:Channel_Code') },
        {
            field: 'created_at',
            name: 'created_at_from',
            type: 'from',
            label: t('history:Created_At_From'),
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
                        className: classes.fieldInput,
                    }}
                />
            ),
        },
        {
            field: 'created_at',
            name: 'created_at_to',
            type: 'to',
            label: t('history:Created_At_To'),
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
                        className: classes.fieldInput,
                    }}
                />
            ),
        },
        { field: 'last_trigered_by', name: 'last_trigered_by', type: 'like', label: t('history:Last_Trigered_By') },
    ];

    const rows = historyUpdateStockList.map((history) => ({
        ...history,
        id: history.entity_id,
    }));

    return (
        <>
            <Header t={t} />
            <Table
                hideActions
                rows={rows}
                filters={filters}
                getRows={getHistoryUpdateStockList}
                loading={loading}
                columns={columns}
                count={historyUpdateStockTotal}
            />
        </>
    );
};

export default UpdateStockHistoryListContent;
