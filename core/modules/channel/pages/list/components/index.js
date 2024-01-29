/* eslint-disable object-curly-newline */
import React from 'react';
import Router from 'next/router';
import Table from '@common_table';
import Link from 'next/link';
import Autocomplete from '@common_autocomplete';
import Header from '@modules/channel/pages/list/components/Header';
import gqlService from '@modules/channel/services/graphql';
import CustomList from '@common_customlist';
import { breakPointsUp } from '@helper_theme';

const ChannelListContent = (props) => {
    const { t } = props;
    const { data, loading, getChannelList, multideleteChannel } = props;
    const channelList = (data && data.getChannelList && data.getChannelList.items) || [];
    const channelTotal = (data && data.getChannelList && data.getChannelList.total_count) || 0;

    const desktop = breakPointsUp('sm');

    const columns = [
        { field: 'channel_id', headerName: t('channel:ID'), sortable: true, initialSort: 'ASC', hideable: true },
        { field: 'channel_code', headerName: t('channel:Channel_Code'), hideable: true },
        { field: 'channel_name', headerName: t('channel:Channel_Name'), sortable: true, hideable: true },
        { field: 'framework', headerName: t('channel:Framework'), hideable: true },
        { field: 'rule_type', headerName: t('channel:Rule_Type'), hideable: true },
        { field: 'actions', headerName: t('channel:Action'), hidden: !desktop },
    ];

    const filters = [
        { field: 'channel_id', name: 'channel_id_from', type: 'from', label: t('channel:ID_From'), initialValue: '' },
        { field: 'channel_id', name: 'channel_id_to', type: 'to', label: t('channel:ID_To'), initialValue: '' },
        { field: 'channel_code', name: 'channel_code', type: 'like', label: t('channel:Channel_Code'), initialValue: '' },
        { field: 'channel_name', name: 'channel_name', type: 'like', label: t('channel:Channel_Name'), initialValue: '' },
        {
            field: 'framework',
            name: 'framework',
            type: 'in',
            label: t('channel:Framework'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const [getChannelFrameworkOptions, getChannelFrameworkOptionsRes] = gqlService.getChannelFrameworkOptions();
                const getChannelFrameworkOptionsOptions = (getChannelFrameworkOptionsRes
                        && getChannelFrameworkOptionsRes.data
                        && getChannelFrameworkOptionsRes.data.getChannelFrameworkOptions)
                    || [];
                const primaryKey = 'value';
                const labelKey = 'label';

                return (
                    <Autocomplete
                        mode="lazy"
                        loading={getChannelFrameworkOptionsRes?.loading}
                        getOptions={getChannelFrameworkOptions}
                        multiple
                        value={(filterValue || []).map((option) => getChannelFrameworkOptionsOptions.find((e) => e[primaryKey] === option))}
                        onChange={(newValue) => setFilterValue((newValue || []).map((option) => option && option[primaryKey]))}
                        options={getChannelFrameworkOptionsOptions}
                        primaryKey={primaryKey}
                        labelKey={labelKey}
                    />
                );
            },
        },
        {
            field: 'rule_type',
            name: 'rule_type',
            type: 'eq',
            label: t('channel:Rule_Type'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const [getChannelRuleTypeOptions, getChannelRuleTypeOptionsRes] = gqlService.getChannelRuleTypeOptions();
                const getChannelRuleTypeOptionsOptions = (getChannelRuleTypeOptionsRes
                        && getChannelRuleTypeOptionsRes.data
                        && getChannelRuleTypeOptionsRes.data.getChannelRuleTypeOptions)
                    || [];
                const primaryKey = 'value';
                const labelKey = 'label';

                return (
                    <Autocomplete
                        mode="lazy"
                        loading={getChannelRuleTypeOptionsRes.loading}
                        getOptions={getChannelRuleTypeOptions}
                        value={getChannelRuleTypeOptionsOptions.find((e) => e[labelKey] === filterValue)}
                        onChange={(newValue) => {
                            setFilterValue(newValue && newValue[labelKey]);
                        }}
                        options={getChannelRuleTypeOptionsOptions}
                        primaryKey={primaryKey}
                        labelKey={labelKey}
                    />
                );
            },
        },
    ];

    const rows = channelList.map((channel) => ({
        ...channel,
        id: channel.channel_id,
        actions: () => (
            <Link href={`/oms/channel/edit/${channel.channel_id}`}>
                <a className="link-button">{t('channel:View')}</a>
            </Link>
        ),
    }));

    return (
        <>
            <Header t={t} />
            {
                desktop ? (
                    <Table
                        filters={filters}
                        rows={rows}
                        getRows={getChannelList}
                        deleteRows={multideleteChannel}
                        loading={loading}
                        columns={columns}
                        count={channelTotal}
                        showCheckbox
                        recordName="channel"
                    />
                ) : (
                    <CustomList
                        filters={filters}
                        rows={rows}
                        getRows={getChannelList}
                        deleteRows={multideleteChannel}
                        loading={loading}
                        columns={columns}
                        count={channelTotal}
                        showCheckbox
                        recordName="channel"
                        hideColumn={false}
                        checkboxAll
                        twoColumns
                        handleClickRow={(id) => Router.push(`/oms/channel/edit/${id}`)}
                        usePagination
                    />
                )
            }
        </>
    );
};

export default ChannelListContent;
