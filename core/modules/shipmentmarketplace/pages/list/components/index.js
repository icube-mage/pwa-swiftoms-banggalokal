/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import Table from '@common_table';
import CustomList from '@common_customlist';
import Autocomplete from '@common_autocomplete';
import Tabs from '@common_tabs';
import { optionsAllocation, dataTabAll, dataTabNoPickPack } from '@modules/shipmentmarketplace/helpers';
import Header from '@modules/shipmentmarketplace/pages/list/components/Header';
import useStyles from '@modules/shipmentmarketplace/pages/list/components/style';
import clsx from 'clsx';
import TextField from '@common_textfield';
import channelGqlService from '@modules/channel/services/graphql';
import locationGqlService from '@modules/location/services/graphql';
import { breakPointsUp } from '@helper_theme';

const ShipmentMarketplaceListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getStoreShipmentList, confirmMarketplaceShipment,
        pickShipment, packShipment, setVarExport, varExport, exportStoreShipmentToCsv,
        getExportStatusHistory, optionsStatus, dataConfig, t } = props;
    const storeShipmentList = (data && data.getStoreShipmentList && data.getStoreShipmentList.items) || [];
    const storeShipmentTotal = (data && data.getStoreShipmentList && data.getStoreShipmentList.total_count) || 0;
    const [tab, setTab] = React.useState('process_for_shipping');
    const [load, setLoad] = React.useState(false);
    const [awbNull, setAwbNull] = React.useState('');
    const [indexType, setIndexType] = React.useState({
        track_number: 0,
        allocation_status: 0,
    });
    const desktop = breakPointsUp('sm');

    const columns = [
        { field: 'increment_id', headerName: t('shipmentmarketplace:Shipment_Number'), sortable: true, initialSort: 'DESC', hideable: true },
        { field: 'channel_order_increment_id', headerName: t('shipmentmarketplace:Channel_Order_Number'), sortable: true, hideable: true },
        { field: 'marketplace_order_number', headerName: t('shipmentmarketplace:Marketplace_Order_Number'), hideable: true },
        { field: 'status', headerName: t('shipmentmarketplace:Status'), sortable: true, hideable: true },
        { field: 'marketplace_order_status', headerName: t('shipmentmarketplace:Marketplace_Order_Status'), hideable: true },
        { field: 'port', headerName: t('shipmentmarketplace:Port'), hideable: true, hidden: true },
        { field: 'channel_order_date', headerName: t('shipmentmarketplace:Channel_Order_Date'), hideable: true },
        { field: 'shipping_name', headerName: t('shipmentmarketplace:Recipient_Name'), hideable: true },
        { field: 'channel_name', headerName: t('shipmentmarketplace:Channel_Name'), sortable: true, hideable: true },
        { field: 'channel_shipping_label', headerName: t('shipmentmarketplace:Shipping_Method'), hideable: true },
        { field: 'location', headerName: t('shipmentmarketplace:Location'), hideable: true },
        { field: 'track_number', headerName: t('shipmentmarketplace:Airway_Bill'), hideable: true },
        { field: 'allocation_status', headerName: t('shipmentmarketplace:Allocation_Status'), sortable: true, hideable: true, hidden: true },
        { field: 'action', headerName: t('shipmentmarketplace:Action'), hidden: !desktop },
    ];

    const awbInput = ['Null', 'Not Null'];
    const filters = [
        { field: 'increment_id', name: 'increment_id', type: 'like', label: t('shipmentmarketplace:Shipment_Number'), initialValue: '' },
        {
            field: 'channel_order_increment_id',
            name: 'channel_order_increment_id',
            type: 'like',
            label: t('shipmentmarketplace:Channel_Order_Number'),
            initialValue: '',
        },
        {
            field: 'marketplace_order_number',
            name: 'marketplace_order_number',
            type: 'like',
            label: t('shipmentmarketplace:Marketplace_Order_Number'),
            initialValue: '',
        },
        {
            field: 'status',
            name: 'status',
            type: 'like',
            label: t('shipmentmarketplace:Status'),
            // eslint-disable-next-line no-nested-ternary
            initialValue: tab !== 0 ? tab.includes('order_shipped') ? 'order_shipped' : tab : '',
            component: ({ filterValue, setFilterValue }) => {
                const options = optionsStatus.slice().map((item) => ({
                    name: item.label,
                    id: item.value,
                }));
                return (
                    <Autocomplete
                        value={options.find((e) => e.id === filterValue)}
                        onChange={(newValue) => setFilterValue(newValue && newValue.id)}
                        options={options}
                    />
                );
            },
        },
        {
            field: 'channel_order_date',
            name: 'channel_order_date_from',
            type: 'from',
            label: t('shipmentmarketplace:Channel_Order_Date_From'),
            initialValue: '',
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
            field: 'channel_order_date',
            name: 'channel_order_date_to',
            type: 'to',
            label: t('shipmentmarketplace:Channel_Order_Date_To'),
            initialValue: '',
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
        {
            field: 'allocation_status',
            name: 'allocation_status',
            type: ['in', 'null'],
            label: t('shipmentmarketplace:Allocation_Status'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <Autocomplete
                    value={optionsAllocation.find((e) => e.id === filterValue)}
                    onChange={(newValue) => {
                        if (newValue && newValue.id === 'true') {
                            setIndexType({ ...indexType, allocation_status: 1 });
                        } else {
                            setIndexType({ ...indexType, allocation_status: 0 });
                        }
                        setFilterValue(newValue && newValue.id);
                    }}
                    options={optionsAllocation}
                />
            ),
        },
        { field: 'shipping_name', name: 'shipping_name', type: 'like', label: t('shipmentmarketplace:Recipient_Name'), initialValue: '' },
        {
            field: 'channel_code',
            name: 'channel_code',
            type: 'eq',
            label: t('shipmentmarketplace:Channel_Name'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const [getChannelList, getChannelListRes] = channelGqlService.getChannelList();
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
                        getOptions={getChannelList}
                        value={channelOptions.find((e) => e[primaryKey] === filterValue)}
                        onChange={(newValue) => setFilterValue(newValue && newValue[primaryKey])}
                        options={channelOptions}
                        primaryKey={primaryKey}
                        labelKey={labelKey}
                    />
                );
            },
        },
        {
            field: 'channel_shipping_label',
            name: 'channel_shipping_label',
            type: 'like',
            label: t('shipmentmarketplace:Shipping_Method'),
            initialValue: '',
        },
        {
            field: 'loc_name',
            name: 'loc_name',
            type: 'eq',
            label: t('shipmentmarketplace:Location'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const [getStoreLocationList, { data: dataLoc, loading: loadingLoc }] = locationGqlService.getStoreLocationList();
                const [optionsLoc, setOptionsLoc] = useState([]);
                const [searchLoc, setSearchLoc] = useState('');
                const primaryKey = 'loc_code';
                const labelKey = 'loc_name';

                useEffect(() => {
                    const onChangeTimeOut = setTimeout(() => {
                        const isExist = searchLoc && optionsLoc.filter((elm) => elm?.[labelKey]?.toLowerCase().includes(searchLoc?.toLowerCase()));
                        if (searchLoc && isExist.length === 0) {
                            getStoreLocationList({
                                variables: {
                                    search: searchLoc,
                                    pageSize: 20,
                                    currentPage: 1,
                                },
                            });
                        }
                        return null;
                    }, 500);

                    return () => clearTimeout(onChangeTimeOut);
                }, [searchLoc]);

                useEffect(() => {
                    if (dataLoc && dataLoc.getStoreLocationList && dataLoc.getStoreLocationList.items) {
                        const ids = new Set(optionsLoc.map((d) => d[primaryKey]));
                        setOptionsLoc([...optionsLoc, ...dataLoc.getStoreLocationList.items.filter((d) => !ids.has(d[primaryKey]))]);
                    }
                }, [dataLoc]);

                return (
                    <Autocomplete
                        mode={loadingLoc.length > 0 ? 'default' : 'lazy'}
                        loading={loadingLoc}
                        getOptions={getStoreLocationList}
                        value={optionsLoc.find((e) => e[labelKey] === filterValue)}
                        onChange={(newValue) => {
                            setFilterValue(newValue && newValue[labelKey]);
                        }}
                        onInputChange={(e) => setSearchLoc(e && e.target && e.target.value)}
                        options={optionsLoc}
                        primaryKey={primaryKey}
                        labelKey={labelKey}
                    />
                );
            },
        },
        {
            field: 'framework',
            name: 'framework',
            type: 'eq',
            label: 'Framework',
            class: 'fixed',
            initialValue: 'Marketplace',
            hidden: true,
        },
        {
            field: 'track_number',
            name: 'track_number',
            type: ['like', 'null', 'notnull'],
            label: t('shipmentmarketplace:Airway_Bill'),
            initialValue: awbNull,
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    inputProps={{
                        className: classes.input,
                    }}
                    variant="outlined"
                    size="small"
                    value={awbNull ? awbInput[indexType.track_number - 1] : filterValue}
                    onChange={(e) => {
                        setFilterValue(e.target.value);
                    }}
                    disabled={!!awbNull}
                />
            ),
        },
        { field: 'is_pickup', name: 'is_pickup', type: 'eq', label: 'is Pickup', class: 'fixed', initialValue: '0', hidden: true },
    ];

    const getIconByStatus = (status) => {
        if (status.value === 'process_for_pack' || status.value === 'process_for_shipping'
            || status.value === 'pick_in_progress') {
            if (status.label === 'Cannot Fulfill') {
                return '/assets/img/order_status/cannotfulfill.svg';
            }
            return '/assets/img/order_status/processforpack.svg';
        }
        if (status.value === 'cannot_fulfill' || status.value === 'canceled' || status.value === 'closed') {
            return '/assets/img/order_status/cannotfulfill.svg';
        }
        if (status.value === 'ready_for_pack' || status.value === 'pick_uncomplete') {
            return '/assets/img/order_status/readyforpack.svg';
        }
        if (status.value === 'ready_for_pickup'
            || status.value === 'ready_for_ship'
            || status.value === 'shipment_booked'
            || status.value === 'gosend_rejected'
            || status.value === 'grabexpress_rejected') {
            return '/assets/img/order_status/readyforpickup.svg';
        }
        if (status.value === 'customer_picked_up'
            || status.value === 'customer_waiting'
            || status.value === 'order_delivered'
            || status.value === 'canceled'
            || status.value === 'closed') {
            return '/assets/img/order_status/customerpicked.svg';
        }
        return '/assets/img/order_status/ordershipped.svg';
    };

    const rows = storeShipmentList.map((shipmentmarketplace) => ({
        ...shipmentmarketplace,
        id: shipmentmarketplace.entity_id,
        channel_name: shipmentmarketplace?.channel?.channel_name || '-',
        action: () => (
            <Link href={`/shipment/shipmentmarketplace/edit/${shipmentmarketplace.entity_id}`}>
                <a className="link-button">{t('shipmentmarketplace:View')}</a>
            </Link>
        ),
        status: () => (
            <div className={classes.statusRow}>
                <img src={getIconByStatus(shipmentmarketplace.status)} alt="" className={classes.statusIcon} />
                {shipmentmarketplace.status.label}
            </div>
        ),
        location: shipmentmarketplace?.location?.loc_name || '-',
        allocation_status: () => (
            <div
                className={clsx(classes.statusRow, 'unbold')}
                style={{
                    textTransform: 'capitalize',
                }}
            >
                {shipmentmarketplace.allocation_status?.split('_').join(' ') || t('shipmentmarketplace:Unconfirmed')}
            </div>
        ),
        track_number: shipmentmarketplace?.track_number || '-',
    }));

    const [actions, setActions] = React.useState([
        {
            label: t('shipmentmarketplace:Print_Pick_List'),
            message: t('shipmentmarketplace:Ready_for_print_'),
            onClick: (checkedRows) => {
                const idPrint = checkedRows.map((checkedRow) => checkedRow.id);
                window.open(`/printoms/pick/${idPrint.toString().replace(/,/g, '/')}`);
            },
            showMessage: false,
        },
        {
            label: t('shipmentmarketplace:Print_Pack_List'),
            message: t('shipmentmarketplace:Ready_for_print_'),
            onClick: (checkedRows) => {
                const idPrint = checkedRows.map((checkedRow) => checkedRow.id);
                window.open(`/printoms/pack/${idPrint.toString().replace(/,/g, '/')}`);
            },
            showMessage: false,
        },
        {
            label: t('shipmentmarketplace:Print_Shipping_Label'),
            message: t('shipmentmarketplace:Ready_for_print_'),
            onClick: (checkedRows) => {
                const idPrint = checkedRows.map((checkedRow) => checkedRow.id);
                window.open(`/printoms/shippinglabel/${idPrint.toString().replace(/,/g, '/')}`);
            },
            showMessage: false,
        },
        {
            label: t('shipmentmarketplace:Mark_Confirm_Complete'),
            message: t('shipmentmarketplace:Are_you_sure_to_confirm_'),
            onClick: async (checkedRows) => {
                const variables = { id: checkedRows.map((checkedRow) => checkedRow.id) };
                window.backdropLoader(true);
                await confirmMarketplaceShipment({ variables });
            },
        },
    ]);

    const exports = [
        {
            label: t('shipmentmarketplace:Export_Without_Items'),
            message: t('shipmentmarketplace:Ready_for_print_'),
            onClick: async (checkedRows) => {
                const incrementIds = checkedRows.map((checkedRow) => String(checkedRow.increment_id));
                window.backdropLoader(true);
                await exportStoreShipmentToCsv({
                    variables: {
                        type: 'marketplace',
                        ...varExport,
                        filter: {
                            increment_id: {
                                in: incrementIds,
                            },
                            ...varExport.filter,
                        },
                    },
                });
            },
        },
        {
            label: t('shipmentmarketplace:Export_With_Items'),
            message: t('shipmentmarketplace:Ready_for_print_'),
            onClick: async (checkedRows) => {
                const incrementIds = checkedRows.map((checkedRow) => String(checkedRow.increment_id));
                window.backdropLoader(true);
                await exportStoreShipmentToCsv({
                    variables: {
                        type: 'marketplace',
                        with_items: true,
                        ...varExport,
                        filter: {
                            increment_id: {
                                in: incrementIds,
                            },
                            ...varExport.filter,
                        },
                    },
                });
            },
        },
        {
            label: t('shipmentmarketplace:Export_Status_History'),
            message: t('shipmentmarketplace:Ready_for_print_'),
            onClick: async (checkedRows) => {
                const variables = { id: checkedRows.map((checkedRow) => checkedRow.id) };
                await getExportStatusHistory({ variables });
            },
        },
    ];

    const onChangeTab = async (e, v) => {
        setLoad(true);
        if (e.target.innerHTML === 'Order Shipped - No AWB') {
            await setIndexType({ ...indexType, track_number: 1 });
            await setAwbNull('true');
        } else if (e.target.innerHTML === 'Order Shipped - AWB') {
            await setIndexType({ ...indexType, track_number: 2 });
            await setAwbNull('true');
        } else {
            setIndexType({ ...indexType, track_number: 0 });
            await setAwbNull('');
        }
        await setTab(v);
        setLoad(false);
    };

    const handleReset = () => {
        setIndexType({
            allocation_status: 0,
            track_number: 0,
        });
        setTab(0);
    };

    React.useEffect(() => {
        if (dataConfig) {
            setActions([
                ...actions,
                {
                    label: t('shipmentmarketplace:Mark_Pick_Complete'),
                    message: t('shipmentmarketplace:Are_you_sure_to_confirm_'),
                    onClick: async (checkedRows) => {
                        const variables = { id: checkedRows.map((checkedRow) => checkedRow.id) };
                        window.backdropLoader(true);
                        await pickShipment({ variables });
                    },
                },
                {
                    label: t('shipmentmarketplace:Mark_Pack_Complete'),
                    message: t('shipmentmarketplace:Are_you_sure_to_confirm_'),
                    onClick: async (checkedRows) => {
                        const variables = { id: checkedRows.map((checkedRow) => checkedRow.id) };
                        window.backdropLoader(true);
                        await packShipment({ variables });
                    },
                },
            ]);
        }
    }, []);

    return (
        <>
            <Header t={t} />
            <Tabs data={dataConfig ? dataTabAll : dataTabNoPickPack} onChange={onChangeTab} value={tab} allItems={false} />
            {!load && (
                desktop
                    ? (
                        <Table
                            filters={filters}
                            actions={actions}
                            rows={rows}
                            getRows={getStoreShipmentList}
                            loading={loading}
                            columns={columns}
                            count={storeShipmentTotal}
                            showCheckbox
                            handleReset={() => handleReset()}
                            setVarExport={setVarExport}
                            indexType={indexType}
                            exports={exports}
                        />
                    )
                    : (
                        <CustomList
                            filters={filters}
                            actions={actions}
                            rows={rows}
                            getRows={getStoreShipmentList}
                            loading={loading}
                            columns={columns}
                            count={storeShipmentTotal}
                            showCheckbox
                            handleReset={() => handleReset()}
                            setVarExport={setVarExport}
                            indexType={indexType}
                            exports={exports}
                            hideActions={false}
                            hideColumn={false}
                            checkboxAll
                            twoColumns
                            handleClickRow={(id) => Router.push(`/shipment/shipmentmarketplace/edit/${id}`)}
                            recordName="shipment(s)"
                            usePagination
                        />
                    )
            )}
        </>
    );
};

export default ShipmentMarketplaceListContent;
