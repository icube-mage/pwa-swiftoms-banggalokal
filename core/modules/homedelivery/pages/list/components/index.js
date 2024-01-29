/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import clsx from 'clsx';

import Tabs from '@common_tabs';
import Table from '@common_table';
import Autocomplete from '@common_autocomplete';
import TextField from '@common_textfield';
import CustomList from '@common_customlist';

import Header from '@modules/homedelivery/pages/list/components/Header';
import TimeSlotModal from '@modules/homedelivery/pages/list/components/timeslotmodal';
import useStyles from '@modules/homedelivery/pages/list/components/style';
import { optionsAllocation, dataTabAll, dataTabNoPickPack } from '@modules/homedelivery/helpers';

import channelGqlService from '@modules/channel/services/graphql';
import locationGqlService from '@modules/location/services/graphql';
import { breakPointsUp } from '@helper_theme';

const HomeDeliveryListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getStoreShipmentList, confirmShipment, pickShipment, packShipment, bookCourier, optionsStatus,
        setVarExport, exportStoreShipmentToCsv, varExport, dataConfig, t, handleCourierComplete, varCourier,
        openTimeSlot, setOpenTimeSlot, doRefetch, setDoRefetch } = props;

    const storeShipmentList = (data && data.getStoreShipmentList && data.getStoreShipmentList.items) || [];
    const storeShipmentTotal = (data && data.getStoreShipmentList && data.getStoreShipmentList.total_count) || 0;
    const [tab, setTab] = React.useState('process_for_shipping');
    const [load, setLoad] = React.useState(false);
    const [indexType, setIndexType] = React.useState({
        allocation_status: 0,
    });
    const desktop = breakPointsUp('sm');

    const columns = [
        { field: 'increment_id', headerName: t('homedelivery:Shipment_Number'), sortable: true, initialSort: 'DESC', hideable: true },
        { field: 'channel_order_increment_id', headerName: t('homedelivery:Channel_Order_Number'), sortable: true, hideable: true },
        { field: 'status', headerName: t('homedelivery:Status'), sortable: true, hideable: true },
        { field: 'channel_order_date', headerName: t('homedelivery:Channel_Order_Date'), hideable: true },
        { field: 'shipping_name', headerName: t('homedelivery:Recipient_Name'), hideable: true },
        { field: 'channel_name', headerName: t('homedelivery:Channel_Name'), sortable: true, hideable: true },
        { field: 'channel_shipping_label', headerName: t('homedelivery:Shipping_Method'), hideable: true },
        { field: 'location', headerName: t('homedelivery:Location'), hideable: true },
        { field: 'track_number', headerName: t('homedelivery:Airway_Bill'), hideable: true },
        { field: 'allocation_status', headerName: t('homedelivery:Allocation_Status'), sortable: true, hideable: true, hidden: true },
        { field: 'email', headerName: t('homedelivery:EmailMobile'), hideable: true, hidden: true },
        { field: 'action', headerName: t('homedelivery:Action'), hidden: !desktop },
    ];

    const filters = [
        { field: 'increment_id', name: 'increment_id', type: 'like', label: t('homedelivery:Shipment_Number'), initialValue: '' },
        {
            field: 'channel_order_increment_id',
            name: 'channel_order_increment_id',
            type: 'like',
            label: t('homedelivery:Channel_Order_Number'),
            initialValue: '',
        },
        {
            field: 'status',
            name: 'status',
            type: 'like',
            label: t('homedelivery:Status'),
            initialValue: tab !== 0 ? tab : '',
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
        { field: 'shipping_name', name: 'shipping_name', type: 'like', label: t('homedelivery:Recipient_Name'), initialValue: '' },
        {
            field: 'channel_order_date',
            name: 'channel_order_date_from',
            type: 'from',
            label: t('homedelivery:Channel_Order_Date_From'),
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
            label: t('homedelivery:Channel_Order_Date_To'),
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
            field: 'channel_code',
            name: 'channel_code',
            type: 'eq',
            label: t('homedelivery:Channel_Name'),
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
            label: t('homedelivery:Shipping_Method'),
            initialValue: '',
        },
        {
            field: 'loc_name',
            name: 'loc_name',
            type: 'eq',
            label: t('homedelivery:Location'),
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
        { field: 'track_number', name: 'track_number', type: 'like', label: t('homedelivery:Airway_Bill'), initialValue: '' },
        {
            field: 'allocation_status',
            name: 'allocation_status',
            type: ['in', 'null'],
            label: t('homedelivery:Allocation_Status'),
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
        { field: 'framework', name: 'framework', type: 'neq', label: 'Framework', class: 'fixed', initialValue: 'Marketplace', hidden: true },
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

    const rows = storeShipmentList.map((homedelivery) => ({
        ...homedelivery,
        id: homedelivery.entity_id,
        channel_name: homedelivery.channel.channel_name,
        location: homedelivery?.location?.loc_name || '-',
        email: `${homedelivery.shipping_email} ${homedelivery.shipping_telephone}`,
        action: () => (
            <Link href={`/shipment/homedelivery/edit/${homedelivery.entity_id}`}>
                <a className="link-button">{t('homedelivery:View')}</a>
            </Link>
        ),
        status: () => (
            <div className={classes.statusRow}>
                <img src={getIconByStatus(homedelivery.status)} alt="" className={classes.statusIcon} />
                {homedelivery.status.label}
            </div>
        ),
        allocation_status: () => (
            <div
                className={clsx(classes.statusRow, 'unbold')}
                style={{
                    textTransform: 'capitalize',
                }}
            >
                {homedelivery.allocation_status?.split('_').join(' ') || 'Unconfirmed'}
            </div>
        ),
        track_number: homedelivery.track_number || '-',
    }));

    const [actions, setActions] = React.useState([
        {
            label: t('homedelivery:Print_Pick_List'),
            message: t('homedelivery:Ready_for_print_'),
            onClick: (checkedRows) => {
                const idPrint = checkedRows.map((checkedRow) => checkedRow.id);
                window.open(`/printoms/pick/${idPrint.toString().replace(/,/g, '/')}`);
            },
            showMessage: false,
        },
        {
            label: t('homedelivery:Print_Pack_List'),
            message: t('homedelivery:Ready_for_print_'),
            onClick: (checkedRows) => {
                const idPrint = checkedRows.map((checkedRow) => checkedRow.id);
                window.open(`/printoms/pack/${idPrint.toString().replace(/,/g, '/')}`);
            },
            showMessage: false,
        },
        {
            label: t('homedelivery:Print_Shipping_Label'),
            message: t('homedelivery:Ready_for_print_'),
            onClick: (checkedRows) => {
                const idPrint = checkedRows.map((checkedRow) => checkedRow.id);
                window.open(`/printoms/shippinglabel/${idPrint.toString().replace(/,/g, '/')}`);
            },
            showMessage: false,
        },
        {
            label: t('homedelivery:Mark_Confirm_Complete'),
            message: t('homedelivery:Are_you_sure_to_confirm_'),
            onClick: async (checkedRows) => {
                const variables = { id: checkedRows.map((checkedRow) => checkedRow.id) };
                window.backdropLoader(true);
                await confirmShipment({ variables });
            },
        },
        {
            label: t('homedelivery:Mark_Booking_Courier_Complete'),
            message: t('homedelivery:Are_you_sure_to_confirm_'),
            onClick: async (checkedRows) => {
                const variables = { id: checkedRows.map((checkedRow) => checkedRow.id) };
                window.backdropLoader(true);
                await bookCourier({ variables });
            },
        },
    ]);

    React.useEffect(() => {
        if (dataConfig) {
            setActions([
                {
                    label: t('homedelivery:Print_Pick_List'),
                    message: t('homedelivery:Ready_for_print_'),
                    onClick: (checkedRows) => {
                        const idPrint = checkedRows.map((checkedRow) => checkedRow.id);
                        window.open(`/printoms/pick/${idPrint.toString().replace(/,/g, '/')}`);
                    },
                    showMessage: false,
                },
                {
                    label: t('homedelivery:Print_Pack_List'),
                    message: t('homedelivery:Ready_for_print_'),
                    onClick: (checkedRows) => {
                        const idPrint = checkedRows.map((checkedRow) => checkedRow.id);
                        window.open(`/printoms/pack/${idPrint.toString().replace(/,/g, '/')}`);
                    },
                    showMessage: false,
                },
                {
                    label: t('homedelivery:Print_Shipping_Label'),
                    message: t('homedelivery:Ready_for_print_'),
                    onClick: (checkedRows) => {
                        const idPrint = checkedRows.map((checkedRow) => checkedRow.id);
                        window.open(`/printoms/shippinglabel/${idPrint.toString().replace(/,/g, '/')}`);
                    },
                    showMessage: false,
                },
                {
                    label: t('homedelivery:Mark_Confirm_Complete'),
                    message: t('homedelivery:Are_you_sure_to_confirm_'),
                    onClick: async (checkedRows) => {
                        const variables = { id: checkedRows.map((checkedRow) => checkedRow.id) };
                        window.backdropLoader(true);
                        await confirmShipment({ variables });
                    },
                },
                {
                    label: t('homedelivery:Mark_Pick_Complete'),
                    message: t('homedelivery:Are_you_sure_to_confirm_'),
                    onClick: async (checkedRows) => {
                        const variables = { id: checkedRows.map((checkedRow) => checkedRow.id) };
                        window.backdropLoader(true);
                        await pickShipment({ variables });
                    },
                },
                {
                    label: t('homedelivery:Mark_Pack_Complete'),
                    message: t('homedelivery:Are_you_sure_to_confirm_'),
                    onClick: async (checkedRows) => {
                        const variables = { id: checkedRows.map((checkedRow) => checkedRow.id) };
                        window.backdropLoader(true);
                        await packShipment({ variables });
                    },
                },
                {
                    label: t('homedelivery:Mark_Booking_Courier_Complete'),
                    message: t('homedelivery:Are_you_sure_to_confirm_'),
                    onClick: async (checkedRows) => {
                        const variables = { id: checkedRows.map((checkedRow) => checkedRow.id) };
                        window.backdropLoader(true);
                        await handleCourierComplete({ variables });
                    },
                    refetch: false,
                },
            ]);
        }
    }, []);

    const exports = [
        {
            label: t('homedelivery:Export_Without_Items'),
            message: t('homedelivery:Ready_for_print_'),
            onClick: async (checkedRows) => {
                const incrementIds = checkedRows.map((checkedRow) => String(checkedRow.increment_id));
                const variables = {
                    type: 'delivery',
                    ...varExport,
                    filter: {
                        ...varExport.filter,
                    },
                };
                if (incrementIds.length) {
                    variables.filter = {
                        ...variables.filter,
                        increment_id: {
                            in: incrementIds,
                        },
                    };
                }
                window.backdropLoader(true);
                await exportStoreShipmentToCsv({ variables });
            },
        },
        {
            label: t('homedelivery:Export_With_Items'),
            onClick: async (checkedRows) => {
                const incrementIds = checkedRows.map((checkedRow) => String(checkedRow.increment_id));
                window.backdropLoader(true);
                await exportStoreShipmentToCsv({
                    variables: {
                        type: 'delivery',
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
    ];

    const onChangeTab = async (e, v) => {
        setLoad(true);
        await setTab(v);
        setLoad(false);
    };

    const handleReset = () => {
        setIndexType({
            allocation_status: 0,
        });
        setTab(0);
    };

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
                            exports={exports}
                            setVarExport={setVarExport}
                            indexType={indexType}
                            doRefetch={doRefetch}
                            setDoRefetch={setDoRefetch}
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
                            exports={exports}
                            setVarExport={setVarExport}
                            indexType={indexType}
                            doRefetch={doRefetch}
                            setDoRefetch={setDoRefetch}
                            hideActions={false}
                            hideColumn={false}
                            checkboxAll
                            twoColumns
                            handleClickRow={(id) => Router.push(`/shipment/homedelivery/edit/${id}`)}
                            recordName="shipment(s)"
                            usePagination
                        />
                    )
            )}
            {openTimeSlot && (
                <TimeSlotModal
                    open={openTimeSlot}
                    handleClose={() => setOpenTimeSlot(false)}
                    handleOpen={() => setOpenTimeSlot(true)}
                    idCourier={varCourier?.variables?.id}
                    {...props}
                />
            )}
        </>
    );
};

export default HomeDeliveryListContent;
