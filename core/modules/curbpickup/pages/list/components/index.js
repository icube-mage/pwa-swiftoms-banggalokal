/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React, { useEffect, useState } from 'react';
import Autocomplete from '@common_autocomplete';
import CustomList from '@common_customlist';
import Router from 'next/router';
import Tabs from '@common_tabs';
import { dataTab } from '@modules/curbpickup/helpers';
import Header from '@modules/curbpickup/pages/list/components/Header';
import useStyles from '@modules/curbpickup/pages/list/components/style';
import locationGqlService from '@modules/location/services/graphql';

const CurbPickupListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getStoreShipmentList, confirmShipment, packShipment, pickedupShipment, optionsStatus, t } = props;
    const curbPickupList = (data && data.getStoreShipmentList && data.getStoreShipmentList.items) || [];
    const curbPickupTotal = (data && data.getStoreShipmentList && data.getStoreShipmentList.total_count) || 0;
    const [tab, setTab] = React.useState(0);
    const [load, setLoad] = React.useState(false);

    const columns = [
        { field: 'increment_id', headerName: t('curbsidepickup:Shipment_Number'), hideable: true },
        { field: 'status', headerName: t('curbsidepickup:Status'), hideable: true },
        { field: 'location', headerName: t('curbsidepickup:Location'), hideable: true },
        { field: 'shipping_telephone', headerName: t('curbsidepickup:Phone_Number'), hideable: true },
        { field: 'shipping_name', headerName: t('curbsidepickup:Recipient_Name'), hideable: true },
    ];

    const filters = [
        { field: 'increment_id', name: 'increment_id', type: 'like', label: t('curbsidepickup:Shipment_Number'), initialValue: '' },
        {
            field: 'loc_name',
            name: 'loc_name',
            type: 'eq',
            label: t('curbsidepickup:Location'),
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
        { field: 'shipping_name', name: 'shipping_name', type: 'like', label: t('curbsidepickup:Recipient_Name'), initialValue: '' },
        { field: 'is_pickup', name: 'is_pickup', type: 'eq', label: '', initialValue: '1', hidden: true },
        { field: 'pickup_id', name: 'pickup_id', type: 'notnull', label: '', initialValue: 'true', hidden: true },
        {
            field: 'status',
            name: 'status',
            type: tab === 'true' ? 'null' : 'eq',
            label: t('curbsidepickup:Status'),
            initialValue: tab !== 0 ? tab : '',
            component: ({ filterValue, setFilterValue }) => {
                const options = optionsStatus.slice().map((item) => ({
                    name: item.label,
                    id: item.value,
                }));
                return (
                    <Autocomplete
                        value={options.find((e) => e.id === filterValue)}
                        onChange={(newValue) => {
                            setTab(dataTab.find((e) => e.value === newValue && newValue.id) || 0);
                            setFilterValue(newValue && newValue.id);
                        }}
                        options={options}
                    />
                );
            },
        },
    ];

    const getIconByStatus = (status) => {
        if (status.value === 'process_for_pack' || status.value === 'process_for_shipping') {
            if (status.label === 'Cannot Fulfill') {
                return '/assets/img/order_status/cannotfulfill.svg';
            }
            return '/assets/img/order_status/processforpack.svg';
        }
        if (status.value === 'cannot_fulfill') {
            return '/assets/img/order_status/cannotfulfill.svg';
        }
        if (status.value === 'ready_for_pack') {
            return '/assets/img/order_status/readyforpack.svg';
        }
        if (status.value === 'ready_for_pickup') {
            return '/assets/img/order_status/readyforpickup.svg';
        }
        if (status.value === 'customer_waiting') {
            return '/assets/img/order_status/customerwaiting.svg';
        }
        if (status.value === 'customer_picked_up') {
            return '/assets/img/order_status/customerpicked.svg';
        }
        return '/assets/img/order_status/customerpicked.svg';
    };

    const actions = [
        {
            label: t('curbsidepickup:Mark_Confirm_Complete'),
            message: t('curbsidepickup:Are_you_sure_to_confirm_'),
            onClick: async (checkedRows) => {
                const variables = { id: checkedRows.map((checkedRow) => checkedRow.id) };
                window.backdropLoader(true);
                await confirmShipment({ variables });
            },
            showToast: false,
        },
        {
            label: t('curbsidepickup:Mark_Pack_Complete'),
            message: t('curbsidepickup:Are_you_ready_for_pack_'),
            onClick: async (checkedRows) => {
                const variables = { id: checkedRows.map((checkedRow) => checkedRow.id) };
                window.backdropLoader(true);
                await packShipment({ variables });
            },
            showToast: false,
        },
        {
            label: t('curbsidepickup:Mark_Picked_Up_Complete'),
            message: t('curbsidepickup:Are_you_sure_to_picked_up_this_order_'),
            onClick: async (checkedRows) => {
                const variables = { id: checkedRows.map((checkedRow) => checkedRow.id) };
                window.backdropLoader(true);
                await pickedupShipment({ variables });
            },
            showToast: false,
        },
        {
            label: t('curbsidepickup:Print_Pick_List'),
            message: t('curbsidepickup:Ready_for_print_'),
            onClick: (checkedRows) => {
                const idPrint = checkedRows.map((checkedRow) => checkedRow.id);
                window.open(`/printoms/pick/${ idPrint.toString().replace(/,/g, '/')}`);
            },
        },
        {
            label: t('curbsidepickup:Print_Pack_List'),
            message: t('curbsidepickup:Ready_for_print_'),
            onClick: (checkedRows) => {
                const idPrint = checkedRows.map((checkedRow) => checkedRow.id);
                window.open(`/printoms/pack/${ idPrint.toString().replace(/,/g, '/')}`);
            },
        },
    ];

    const rows = curbPickupList.map((curbPickup) => ({
        ...curbPickup,
        id: curbPickup.entity_id,
        location: curbPickup?.location?.loc_name || '-',
        status: () => (
            <div className={classes.statusRow}>
                <img src={getIconByStatus(curbPickup.status)} alt="" className={classes.statusIcon} />
                {curbPickup.status.label}
            </div>
        ),
    }));

    const onChangeTab = async (e, v) => {
        setLoad(true);
        await setTab(v);
        setLoad(false);
    };

    return (
        <>
            <Header t={t} />
            <Tabs data={dataTab} onChange={onChangeTab} value={tab} allItems={false} rounded />
            {!load && (
                <CustomList
                    filters={filters}
                    actions={actions}
                    hideActions={false}
                    rows={rows}
                    getRows={getStoreShipmentList}
                    loading={loading}
                    columns={columns}
                    count={curbPickupTotal}
                    handleReset={() => setTab(0)}
                    showCheckbox
                    checkboxAll
                    twoColumns
                    handleClickRow={(id) => Router.push(`/shipment/curbpickup/edit/${id}`)}
                    recordName="curbside pickup"
                />
            )}
        </>
    );
};

export default CurbPickupListContent;
