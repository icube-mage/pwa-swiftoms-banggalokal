import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import gqlService from '@modules/configurationacceptancedeadline/services/graphql';
import Header from '@modules/configurationacceptancedeadline/pages/list/components/Header';
import Autocomplete from '@common_autocomplete';

const ProductListContent = (props) => {
    const {
        data, loading, getAcceptanceDeadlineList, deleteAcceptanceDeadline, t,
    } = props;

    const accList = (data && data.getAcceptanceDeadlineList && data.getAcceptanceDeadlineList.items) || [];
    const accTotal = (data && data.getAcceptanceDeadlineList && data.getAcceptanceDeadlineList.total_count) || 0;

    const columns = [
        {
            field: 'id', headerName: t('acceptancedeadlineconfiguration:ID'), hideable: false, sortable: true, initialSort: 'ASC',
        },
        {
            field: 'channel_code', headerName: t('acceptancedeadlineconfiguration:Channel'), hideable: true, sortable: true,
        },
        {
            field: 'shipping_method', headerName: t('acceptancedeadlineconfiguration:Shipping_Method'), hideable: true, sortable: true,
        },
        {
            field: 'deadline', headerName: t('acceptancedeadlineconfiguration:Acceptance_Deadline_in_hour'), hideable: true, sortable: true,
        },
        { field: 'action', headerName: t('acceptancedeadlineconfiguration:Action') },
    ];

    const filters = [
        {
            field: 'channel_code',
            name: 'channel_code',
            type: 'like',
            label: t('acceptancedeadlineconfiguration:Channel'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const [getChannelList, { data: dataChannel, loading: loadingChannel }] = gqlService.getChannelList();
                const options = dataChannel?.getChannelList?.items || [];
                return (
                    <Autocomplete
                        mode="lazy"
                        loading={loadingChannel}
                        value={options.find((e) => e.channel_code === filterValue)}
                        onChange={(newValue) => {
                            setFilterValue(newValue && newValue.channel_code);
                        }}
                        getOptions={getChannelList}
                        getOptionsVariables={{
                            variables: {
                                pageSize: null,
                                currentPage: 1,
                            },
                        }}
                        options={options}
                        primaryKey="channel_code"
                        labelKey="channel_code"
                    />
                );
            },
        },
        {
            field: 'shipping_method',
            name: 'shipping_method',
            type: 'like',
            label: t('acceptancedeadlineconfiguration:Shipping_Method'),
            initialValue: '',
        },
        {
            field: 'deadline',
            name: 'deadline',
            type: 'like',
            label: t('acceptancedeadlineconfiguration:Acceptance_Deadline_in_hour'),
            initialValue: '',
        },
    ];

    const rows = accList.map((acc) => ({
        ...acc,
        action: () => (
            <Link href={`/configurations/acceptancedeadline/edit/${acc.id}`}>
                <a className="link-button">{t('acceptancedeadlineconfiguration:View')}</a>
            </Link>
        ),
    }));

    return (
        <>
            <Header t={t} />
            <Table
                filters={filters}
                rows={rows}
                getRows={getAcceptanceDeadlineList}
                deleteRows={deleteAcceptanceDeadline}
                loading={loading}
                columns={columns}
                count={accTotal}
                showCheckbox
            />
        </>
    );
};

export default ProductListContent;
