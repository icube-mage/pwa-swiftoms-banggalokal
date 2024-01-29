/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable object-curly-newline */
import React from 'react';
import CustomList from '@common_customlist';
import Header from '@modules/batchcreate/pages/manualorder/components/Header';
import useStyles from '@modules/batchcreate/pages/manualorder/components/style';

const PickByBatchListContent = (props) => {
    const { data, loading, getStoreShipmentList, startPicking, t } = props;
    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);
    const PickByBatchList = (data && data.getStoreShipmentList && data.getStoreShipmentList.items) || [];
    const PickByBatchTotal = (data && data.getStoreShipmentList && data.getStoreShipmentList.total_count) || 0;

    const columns = [
        { field: 'order_number', headerName: t('createpickbybatch:Order_Number'), sortable: true, initialSort: 'DESC', hideable: true },
        { field: 'shipping_label', headerName: t('createpickbybatch:Shipping_Method'), hideable: true },
        { field: 'channel', headerName: t('createpickbybatch:Channel'), sortable: true, hideable: true },
    ];

    const filters = [
        {
            field: 'status',
            name: 'status',
            type: 'eq',
            label: t('createpickbybatch:Channel'),
            initialValue: 'process_for_shipping',
            hidden: true,
        },
        {
            field: 'allocation_status',
            name: 'allocation_status',
            type: 'eq',
            label: t('createpickbybatch:Allocation_Status'),
            initialValue: 'confirmed',
            hidden: true,
        },
        { field: 'channel_order_increment_id', name: 'channel_order_increment_id', type: 'like', label: t('createpickbybatch:Order_Number'), initialValue: '' },
        { field: 'channel_shipping_label', name: 'channel_shipping_label', type: 'like', label: t('createpickbybatch:Shipping_Method'), initialValue: '' },
        { field: 'channel_name', name: 'channel_name', type: 'like', label: t('createpickbybatch:Channel'), initialValue: '' },
    ];

    const rows = PickByBatchList.map((batchlist) => ({
        ...batchlist,
        id: batchlist.entity_id,
        order_number: batchlist.channel_order_increment_id,
        shipping_label: batchlist?.channel_shipping_label ?? '-',
        channel: batchlist.channel?.channel_name ?? '-',
    }));

    return (
        <>
            <CustomList
                filters={filters}
                rows={rows}
                getRows={getStoreShipmentList}
                loading={loading}
                columns={columns}
                count={PickByBatchTotal}
                header={() => <Header t={t} />}
                showCheckbox
                handleChecked={setChecked}
                recordName="batch"
                hideActions
            />
            <div className={classes.footer}>
                {checked.length !== 0 ? (
                    <button className={classes.btnFooter} type="submit" onClick={() => startPicking(checked)}>
                        {t('createpickbybatch:Start_Picking')}
                    </button>
                ) : (
                    <button className={classes.btnFooterDisabled} type="submit" disabled>
                        {t('createpickbybatch:Start_Picking')}
                    </button>
                )}
                <div style={{ width: '60%', display: 'inline-block', padding: 20 }}>
                    <span>{checked?.length} {t('createpickbybatch:Order_Selected')}</span>
                </div>
            </div>
        </>
    );
};

export default PickByBatchListContent;
