/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import Table from '@common_table';
import Header from '@modules/locationpriceupload/pages/list/components/Header';
import useStyles from '@modules/locationpriceupload/pages/list/components/style';
import TextField from '@common_textfield';
import Autocomplete from '@common_autocomplete';
import locationGqlService from '@modules/location/services/graphql';
import channelGqlService from '@modules/channel/services/graphql';

const PriceLocationListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getPriceLocationList, deleteProductPrice, t } = props;
    const priceLocationList = (data && data.getPriceLocationList && data.getPriceLocationList.items) || [];
    const priceLlocationTotal = (data && data.getPriceLocationList && data.getPriceLocationList.total_count) || 0;

    const columns = [
        { field: 'entity_id', headerName: t('locationpriceupload:ID'), sortable: true, hideable: true },
        { field: 'loc_name', headerName: t('locationpriceupload:Location'), sortable: true, hideable: true },
        { field: 'channel_id', headerName: t('locationpriceupload:Channel'), sortable: true, hideable: true },
        { field: 'sku', headerName: t('locationpriceupload:SKU'), sortable: true, hideable: true },
        { field: 'price', headerName: t('locationpriceupload:Price'), sortable: true, hideable: true },
        { field: 'special_price', headerName: t('locationpriceupload:Special_Price'), sortable: true, hideable: true },
        { field: 'special_from_date', headerName: t('locationpriceupload:Special_Price_From'), sortable: true, hideable: true },
        { field: 'special_to_date', headerName: t('locationpriceupload:Special_Price_To'), sortable: true, hideable: true },
    ];

    const filters = [
        {
            field: 'loc_id',
            name: 'loc_id',
            type: 'in',
            label: t('locationpriceupload:Location'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const [getLocationList, { data: dataLoc, loading: loadingLoc }] = locationGqlService.getLocationList();
                const [optionsLoc, setOptionsLoc] = useState([]);
                const [searchLoc, setSearchLoc] = useState('');
                const primaryKey = 'loc_id';
                const labelKey = 'loc_name';

                useEffect(() => {
                    const onChangeTimeOut = setTimeout(() => {
                        const isExist = searchLoc && optionsLoc.filter((elm) => elm?.[labelKey]?.toLowerCase().includes(searchLoc?.toLowerCase()));
                        if (searchLoc && isExist.length === 0) {
                            getLocationList({
                                variables: {
                                    search: searchLoc,
                                    pageSize: 35,
                                    currentPage: 1,
                                },
                            });
                        }
                        return null;
                    }, 500);

                    return () => clearTimeout(onChangeTimeOut);
                }, [searchLoc]);

                useEffect(() => {
                    if (dataLoc && dataLoc.getLocationList && dataLoc.getLocationList.items) {
                        const ids = new Set(optionsLoc.map((d) => d[primaryKey].toString()));
                        setOptionsLoc([...optionsLoc, ...dataLoc.getLocationList.items.filter((d) => !ids.has(d[primaryKey].toString()))]);
                    }
                }, [dataLoc]);

                return (
                    <Autocomplete
                        mode={loadingLoc.length > 0 ? 'default' : 'lazy'}
                        loading={loadingLoc}
                        getOptions={getLocationList}
                        multiple
                        value={(filterValue || []).map((option) => optionsLoc.find((e) => String(e[primaryKey]) === option))}
                        onChange={(newValue) => setFilterValue((newValue || []).map((option) => option && option[primaryKey] && String(option[primaryKey])))}
                        onInputChange={(e) => {
                            const val = e?.target?.value;
                            if (typeof val === 'string') {
                                setSearchLoc(val);
                            }
                        }}
                        onBlur={() => setSearchLoc('')}
                        inputValue={searchLoc}
                        options={optionsLoc}
                        primaryKey={primaryKey}
                        labelKey={labelKey}
                    />
                );
            },
        },
        {
            field: 'channel_id',
            name: 'channel_id',
            type: 'in',
            label: t('locationpriceupload:Channel'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const [getChannelList, { data: dataChannel, loading: loadingChannel }] = channelGqlService.getChannelList();
                const [optionsChannel, setOptionsChannel] = useState([]);
                const [searchChannel, setSearchChannel] = useState('');
                const primaryKey = 'channel_id';
                const labelKey = 'channel_name';

                useEffect(() => {
                    const onChangeTimeOut = setTimeout(() => {
                        const isExist = searchChannel && optionsChannel.filter((elm) => elm?.[labelKey]?.toLowerCase().includes(searchChannel?.toLowerCase()));
                        if (searchChannel && isExist.length === 0) {
                            getChannelList({
                                variables: {
                                    search: searchChannel,
                                    pageSize: 35,
                                    currentPage: 1,
                                },
                            });
                        }
                        return null;
                    }, 500);

                    return () => clearTimeout(onChangeTimeOut);
                }, [searchChannel]);

                useEffect(() => {
                    if (dataChannel && dataChannel.getChannelList && dataChannel.getChannelList.items) {
                        const ids = new Set(optionsChannel.map((d) => d[primaryKey].toString()));
                        setOptionsChannel([...optionsChannel, ...dataChannel.getChannelList.items.filter((d) => !ids.has(d[primaryKey].toString()))]);
                    }
                }, [dataChannel]);

                return (
                    <Autocomplete
                        mode={loadingChannel.length > 0 ? 'default' : 'lazy'}
                        loading={loadingChannel}
                        getOptions={getChannelList}
                        multiple
                        value={(filterValue || []).map((option) => optionsChannel.find((e) => String(e[primaryKey]) === option))}
                        onChange={(newValue) => setFilterValue((newValue || []).map((option) => option && option[primaryKey] && String(option[primaryKey])))}
                        onInputChange={(e) => {
                            const val = e?.target?.value;
                            if (typeof val === 'string') {
                                setSearchChannel(val);
                            }
                        }}
                        onBlur={() => setSearchChannel('')}
                        inputValue={searchChannel}
                        options={optionsChannel}
                        primaryKey={primaryKey}
                        labelKey={labelKey}
                    />
                );
            },
        },
        { field: 'sku', name: 'sku', type: 'like', label: t('locationpriceupload:SKU'), initialValue: '' },
        { field: 'price', name: 'price', type: 'eq', label: t('locationpriceupload:Price'), initialValue: '' },
        { field: 'special_price', name: 'special_price', type: 'eq', label: t('locationpriceupload:Special_Price'), initialValue: '' },
        {
            field: 'special_from_date',
            name: 'special_from_date',
            type: 'like',
            label: t('locationpriceupload:Special_Price_From'),
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    id="date"
                    type="date"
                    value={filterValue}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(newValue) => {
                        setFilterValue(newValue.target.value);
                    }}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                />
            ),
        },
        {
            field: 'special_to_date',
            name: 'special_to_date',
            type: 'like',
            label: t('locationpriceupload:Special_Price_To'),
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    id="date"
                    type="date"
                    value={filterValue}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(newValue) => {
                        setFilterValue(newValue.target.value);
                    }}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                />
            ),
        },
    ];

    const rows = priceLocationList.map((priceLocation) => ({
        ...priceLocation,
        id: priceLocation.entity_id,
        channel_id: priceLocation.channel_name,
    }));

    return (
        <>
            <Header t={t} />
            <Table
                filters={filters}
                rows={rows}
                deleteRows={deleteProductPrice}
                getRows={getPriceLocationList}
                loading={loading}
                columns={columns}
                count={priceLlocationTotal}
                showCheckbox
            />
        </>
    );
};

export default PriceLocationListContent;
