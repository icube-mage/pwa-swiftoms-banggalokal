/* eslint-disable object-curly-newline */
import React from 'react';
import CustomList from '@common_customlist';
import Header from '@modules/wavecreate/pages/manualorder/components/Header';
import useStyles from '@modules/wavecreate/pages/manualorder/components/style';

const PickByWaveListContent = (props) => {
    const { data, loading, getStoreShipmentList, startPicking, t } = props;
    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);
    const PickByWaveList = (data && data.getStoreShipmentList && data.getStoreShipmentList.items) || [];
    const PickByWaveTotal = (data && data.getStoreShipmentList && data.getStoreShipmentList.total_count) || 0;

    const columns = [
        { field: 'order_number', headerName: t('createpickbywave:Order_Number'), sortable: true, initialSort: 'DESC', hideable: true },
        { field: 'shipping_label', headerName: t('createpickbywave:Shipping_Method'), hideable: true },
        { field: 'channel', headerName: t('createpickbywave:Channel'), sortable: true, hideable: true },
    ];

    const filters = [
        {
            field: 'status',
            name: 'status',
            type: 'eq',
            label: t('createpickbywave:Status'),
            initialValue: 'process_for_shipping',
            hidden: true,
        },
        {
            field: 'allocation_status',
            name: 'allocation_status',
            type: 'eq',
            label: 'allocation_status',
            initialValue: 'confirmed',
            hidden: true,
        },
        {
            field: 'channel_order_increment_id',
            name: 'channel_order_increment_id',
            type: 'like',
            label: t('createpickbywave:Order_Number'),
            initialValue: '',
        },
        {
            field: 'channel_shipping_label',
            name: 'channel_shipping_label',
            type: 'like',
            label: t('createpickbywave:Shipping_Method'),
            initialValue: '',
        },
        {
            field: 'channel_name',
            name: 'channel_name',
            type: 'like',
            label: t('createpickbywave:Channel'),
            initialValue: '',
        },
    ];

    const rows = PickByWaveList.map((wavelist) => ({
        ...wavelist,
        id: wavelist.entity_id,
        order_number: wavelist?.channel_order_increment_id ?? '-',
        shipping_label: wavelist?.channel_shipping_label?.split('_')?.join(' ') ?? '-',
        channel: wavelist?.channel?.channel_name ?? '-',
    }));

    return (
        <>
            <CustomList
                filters={filters}
                rows={rows}
                getRows={getStoreShipmentList}
                loading={loading}
                columns={columns}
                count={PickByWaveTotal}
                header={() => <Header t={t} />}
                showCheckbox
                handleChecked={setChecked}
                recordName="wave"
                hideActions
            />
            <div className={classes.footer}>
                {checked.length !== 0 ? (
                    <button className={classes.btnFooter} type="submit" onClick={() => startPicking(checked)}>
                        {t('createpickbywave:Start_Picking')}
                    </button>
                ) : (
                    <button className={classes.btnFooterDisabled} type="submit" disabled>
                        {t('createpickbywave:Start_Picking')}
                    </button>
                )}
                <div style={{ width: '60%', display: 'inline-block', padding: 20 }}>
                    <span>
                        {checked.length}
                        {' '}
                        {t('createpickbywave:Order_Selected')}
                    </span>
                </div>
            </div>
        </>
    );
};

export default PickByWaveListContent;
