/* eslint-disable operator-linebreak */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import Table from '@common_table';
import CustomList from '@common_customlist';
import TextField from '@common_textfield';
import Autocomplete from '@common_autocomplete';
import channelGqlService from '@modules/channel/services/graphql';
import locationGqlService from '@modules/location/services/graphql';
import Tabs from '@common_tabs';
import { dataTab, getIconByStatus } from '@modules/shipment/helpers';
import useStyles from '@modules/shipment/pages/list/components/style';
import Header from '@modules/shipment/pages/list/components/Header';
import clsx from 'clsx';
import { breakPointsUp } from '@helper_theme';

const ShipmentListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getShipmentList, confirmShipment, optionsStatus, t } = props;
    const shipmentList = (data && data.getStoreShipmentList && data.getStoreShipmentList.items) || [];
    const shipmentTotal = (data && data.getStoreShipmentList && data.getStoreShipmentList.total_count) || 0;
    const [tab, setTab] = React.useState(0);
    const [load, setLoad] = React.useState(false);
    const desktop = breakPointsUp('sm');
    const [indexType, setIndexType] = React.useState({
        allocation_status: 0,
    });

    const columns = [
        { field: 'increment_id', headerName: t('allshipment:Shipment_Number'), sortable: true, initialSort: 'DESC', hideable: true },
        { field: 'channel_order_increment_id', headerName: t('allshipment:Channel_Order_Number'), sortable: true, hideable: true },
        { field: 'status', headerName: t('allshipment:Status'), sortable: true, hideable: true },
        { field: 'channel_order_date', headerName: t('allshipment:Channel_Order_Date'), sortable: true, hideable: true },
        { field: 'shipping_name', headerName: t('allshipment:Recipient_Name'), hideable: true },
        { field: 'channel_name', headerName: t('allshipment:Channel_Name'), sortable: true, hideable: true },
        { field: 'location', headerName: t('allshipment:Location'), hideable: true },
        { field: 'track_number', headerName: t('allshipment:Airway_Bill'), hideable: true },
        { field: 'allocation_status', headerName: t('allshipment:Allocation_Status'), sortable: true, hideable: true, hidden: true },
        { field: 'marketplace_order_number', headerName: t('allshipment:Marketplace_Order_Number'), hideable: true, hidden: true },
        { field: 'action', headerName: t('allshipment:Action'), hidden: !desktop },
    ];

    const filters = [
        { field: 'increment_id', name: 'increment_id', type: 'like', label: t('allshipment:Shipment_Number'), initialValue: '' },
        {
            field: 'channel_order_increment_id',
            name: 'channel_order_increment_id',
            type: 'like',
            label: t('allshipment:Channel_Order_Number'),
            initialValue: '',
        },
        {
            field: 'status',
            name: 'status',
            type: 'like',
            label: t('allshipment:Status'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const options = optionsStatus.slice().map((item) => ({
                    name: item.label,
                    id: item.value,
                }));
                return (
                    <Autocomplete
                        value={options.find((e) => e.id === filterValue)}
                        onChange={(newValue) => {
                            setFilterValue(newValue && newValue.id);
                        }}
                        options={options}
                    />
                );
            },
        },
        {
            field: 'channel_order_date',
            name: 'channel_order_date_from',
            type: 'from',
            label: t('allshipment:Channel_Order_Date_From'),
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
            label: t('allshipment:Channel_Order_Date_To'),
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
        { field: 'shipping_name', name: 'shipping_name', type: 'like', label: t('allshipment:Recipient_Name'), initialValue: '' },
        {
            field: 'channel_code',
            name: 'channel_code',
            type: 'eq',
            label: t('allshipment:Channel_Name'),
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
            field: 'loc_name',
            name: 'loc_name',
            type: 'eq',
            label: t('allshipment:Location'),
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
        { field: 'track_number', name: 'track_number', type: 'like', label: t('allshipment:Airway_Bill'), initialValue: '' },
        {
            field: 'allocation_status',
            name: 'allocation_status',
            type: ['null', 'eq'],
            label: t('allshipment:Allocation_Status'),
            initialValue: tab !== 0 ? tab : '',
            component: ({ filterValue, setFilterValue }) => {
                const optionsAllocation = dataTab.slice(1).map((item) => ({
                    name: item.label,
                    id: item.value,
                }));
                optionsAllocation.splice(1, 0, { name: t('allshipment:Confirmed'), id: 'confirmed' });
                return (
                    <Autocomplete
                        value={optionsAllocation.find((e) => e.id === filterValue)}
                        onChange={(newValue) => {
                            if (newValue && newValue.id === 'true') {
                                setIndexType({ ...indexType, allocation_status: 0 });
                            } else {
                                setIndexType({ ...indexType, allocation_status: 1 });
                            }
                            setFilterValue(newValue && newValue.id);
                        }}
                        options={optionsAllocation}
                    />
                );
            },
        },
        {
            field: 'marketplace_order_number',
            name: 'marketplace_order_number',
            type: 'like',
            label: t('allshipment:Marketplace_Order_Number'),
            initialValue: '',
        },
    ];

    const rows = shipmentList.map((shipment) => ({
        ...shipment,
        id: shipment.entity_id,
        email: `${shipment.shipping_email} ${shipment.shipping_telephone}`,
        location: shipment?.location?.loc_name || '-',
        status: () => (
            <div className={classes.statusRow}>
                <img src={getIconByStatus(shipment.status.value, shipment.status.label)} alt="" className={classes.statusIcon} />
                {shipment.status.label}
            </div>
        ),
        action: () => (
            <Link href={`/sales/shipment/edit/${shipment.entity_id}`}>
                <a className="link-button">{t('allshipment:View')}</a>
            </Link>
        ),
        allocation_status: () => (
            <div
                className={clsx(classes.statusRow, 'unbold')}
                style={{
                    textTransform: 'capitalize',
                }}
            >
                {shipment.allocation_status?.split('_').join(' ') || t('allshipment:Unconfirmed')}
            </div>
        ),
        marketplace_order_number: shipment?.marketplace_order_number || '-',
        channel_name: shipment?.channel?.channel_name || '-',
        track_number: shipment?.track_number || '-',
    }));

    const actions = [
        {
            label: t('allshipment:Mark_Confirm_Complete'),
            message: t('allshipment:Are_you_sure_to_confirm_'),
            onClick: async (checkedRows) => {
                const variables = { id: checkedRows.map((checkedRow) => checkedRow.id) };
                window.backdropLoader(true);
                await confirmShipment({ variables });
            },
        },
    ];

    const onChangeTab = async (e, v) => {
        setLoad(true);
        if (v === 'true') {
            setIndexType({ ...indexType, allocation_status: 0 });
        } else {
            setIndexType({ ...indexType, allocation_status: 1 });
        }
        await setTab(v);
        setLoad(false);
    };

    return (
        <>
            <Header t={t} />
            <Tabs data={dataTab} onChange={onChangeTab} value={tab} allItems={false} />
            {!load && (
                desktop ? (
                    <Table
                        filters={filters}
                        actions={actions}
                        rows={rows}
                        getRows={getShipmentList}
                        showCheckbox
                        loading={loading}
                        columns={columns}
                        count={shipmentTotal}
                        handleReset={() => setTab(0)}
                        indexType={indexType}
                    />
                )
                    : (
                        <CustomList
                            filters={filters}
                            actions={actions}
                            rows={rows}
                            getRows={getShipmentList}
                            loading={loading}
                            columns={columns}
                            count={shipmentTotal}
                            showCheckbox
                            handleReset={() => setTab(0)}
                            hideActions={false}
                            hideColumn={false}
                            checkboxAll
                            twoColumns
                            handleClickRow={(id) => Router.push(`/sales/shipment/edit/${id}`)}
                            recordName="shipment(s)"
                            usePagination
                            indexType={indexType}
                        />
                    )
            )}
        </>
    );
};

export default ShipmentListContent;
