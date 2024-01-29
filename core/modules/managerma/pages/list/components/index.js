/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-expressions */
import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import Table from '@common_table';
import CustomList from '@common_customlist';
import TextField from '@common_textfield';
import Autocomplete from '@common_autocomplete';
import statusGqlService from '@modules/rmastatuses/services/graphql';
import useStyles from '@modules/managerma/pages/list/components/style';
import Header from '@modules/managerma/pages/list/components/Header';
import Tabs from '@common_tabs';
import { breakPointsUp } from '@helper_theme';

const ManageRmaListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getRmaList, t } = props;
    const desktop = breakPointsUp('sm');

    const dataTab = [
        { label: t('managerma:Pending_Approval'), value: 'pending_approval' },
        { label: t('managerma:Approved'), value: 'approved' },
        { label: t('managerma:Package_Sent'), value: 'package_sent' },
        { label: t('managerma:Package_Received'), value: 'package_received' },
        { label: t('managerma:Proccessing'), value: 'processing' },
        { label: t('managerma:Complete'), value: 'complete' },
        { label: t('managerma:All'), value: 0 },
    ];
    const [tab, setTab] = React.useState('pending_approval');
    const [load, setLoad] = React.useState(false);

    const rmaList = (data && data.getRmaList && data.getRmaList.items) || [];
    const rmaTotal = (data && data.getRmaList && data.getRmaList.total_count) || 0;

    const columns = [
        { field: 'increment_id', headerName: t('managerma:Request'), hideable: true, sortable: true, initialSort: 'DESC' },
        { field: 'channel_order_increment_id', headerName: t('managerma:Channel_Order'), hideable: true, sortable: true },
        { field: 'status_label', headerName: t('managerma:Status'), hideable: true, sortable: true },
        { field: 'loc_name', headerName: t('managerma:Original_Locations'), hideable: true },
        { field: 'customer', headerName: t('managerma:Customer'), hideable: true },
        { field: 'created_at', headerName: t('managerma:Created_At'), hideable: true, sortable: true },
        { field: 'actions', headerName: t('managerma:Action') },
    ];

    const filters = [
        { field: 'increment_id', name: 'increment_id', type: 'like', label: t('managerma:Request'), initialValue: '' },
        { field: 'channel_order_increment_id',
            name: 'channel_order_increment_id',
            type: 'like',
            label: t('managerma:Channel_Order'),
            initialValue: '' },
        {
            field: 'status_code',
            name: 'status_code',
            type: 'eq',
            label: t('managerma:Status'),
            initialValue: tab !== 0 ? tab : '',
            component: ({ filterValue, setFilterValue }) => {
                const [getRmaStatusList, getRmaStatusListRes] = statusGqlService.getRmaStatusList();
                const channelOptions = (getRmaStatusListRes
                    && getRmaStatusListRes.data
                    && getRmaStatusListRes.data.getRmaStatusList
                    && getRmaStatusListRes.data.getRmaStatusList.items) || [];
                const primaryKey = 'status_code';
                const labelKey = 'status_label';
                return (
                    <Autocomplete
                        mode="lazy"
                        getOptions={getRmaStatusList}
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
            field: 'created_at',
            name: 'created_at_from',
            type: 'from',
            label: t('managerma:Created_From'),
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
            field: 'created_at',
            name: 'created_at_to',
            type: 'to',
            label: t('managerma:Created_To'),
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
    ];

    const rows = rmaList.map((rma) => ({
        ...rma,
        id: rma.id,
        actions: () => (
            <Link href={`/return/managerma/edit/${rma.id}`}>
                <a className="link-button">{t('managerma:View')}</a>
            </Link>
        ),
        customer: `${rma.customer_name}, ${rma.customer_email}`,
        loc_name: rma.loc_name?.join(', ') || '-',
    }));

    const onChangeTab = async (e, v) => {
        setLoad(true);
        await setTab(v);
        setLoad(false);
    };

    const handleReset = () => {
        setTab(0);
    };

    return (
        <>
            <Header t={t} />
            <Tabs data={dataTab} onChange={onChangeTab} value={tab} allItems={false} />
            {!load && (
                desktop ? (
                    <Table
                        filters={filters}
                        rows={rows}
                        getRows={getRmaList}
                        loading={loading}
                        columns={columns}
                        count={rmaTotal}
                        handleReset={() => handleReset()}
                        hideActions
                    />
                )
                    : (
                        <CustomList
                            filters={filters}
                            rows={rows}
                            getRows={getRmaList}
                            loading={loading}
                            columns={columns}
                            count={rmaTotal}
                            handleReset={() => handleReset()}
                            hideActions
                            hideColumn={false}
                            twoColumns
                            handleClickRow={(id) => Router.push(`/return/managerma/edit/${id}`)}
                            usePagination
                        />
                    )
            )}
        </>
    );
};

export default ManageRmaListContent;
