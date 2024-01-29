/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React, { useEffect } from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/shippingcompany/pages/list/components/Header';
import Autocomplete from '@common_autocomplete';

const ShippingCompanyListContent = (props) => {
    const { data, loading, getTadaShippingCompanyList, multideleteShippingCompany, t } = props;
    const shippingCompanyList = (data && data.getTadaShippingCompanyList && data.getTadaShippingCompanyList.items) || [];
    const shippingCompanyTotal = (data && data.getTadaShippingCompanyList && data.getTadaShippingCompanyList.total_count) || 0;

    const columns = [
        { field: 'id', headerName: t('shippingcompany:ID'), hideable: true, sortable: true, initialSort: 'ASC' },
        { field: 'company_id', headerName: t('shippingcompany:Company_ID'), hideable: true, sortable: true },
        { field: 'brand', headerName: t('shippingcompany:Brand'), hideable: true, sortable: true },
        { field: 'shipping_method', headerName: t('shippingcompany:Shipping_Method'), hideable: true, sortable: true },
        { field: 'is_active_label', headerName: t('shippingcompany:Is_Active'), hideable: true, sortable: true },
        { field: 'actions', headerName: t('shippingcompany:Actions'), hideable: true },
    ];

    const filters = [
        {
            field: 'id',
            name: 'id_from',
            type: 'from',
            label: t('shippingcompany:ID_from'),
            initialValue: '',
        },
        {
            field: 'id',
            name: 'id_to',
            type: 'to',
            label: t('shippingcompany:ID_to'),
            initialValue: '',
        },
        {
            field: 'company_id',
            name: 'company_id_from',
            type: 'from',
            label: t('shippingcompany:Company_ID_From'),
            initialValue: '',
        },
        {
            field: 'company_id',
            name: 'company_id_to',
            type: 'to',
            label: t('shippingcompany:Company_ID_To'),
            initialValue: '',
        },
        {
            field: 'brand',
            name: 'brand',
            type: 'like',
            label: t('shippingcompany:Brand'),
            initialValue: '',
        },
        {
            field: 'shipping_method',
            name: 'shipping_method',
            type: 'like',
            label: t('shippingcompany:Shipping_Method'),
            initialValue: '',
        },
        {
            field: 'is_active',
            name: 'is_active',
            type: 'like',
            label: t('shippingcompany:Is_Active'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const primaryKey = 'value';
                const labelKey = 'name';
                const options = [
                    {
                        value: '0',
                        name: 'No',
                    },
                    {
                        value: '1',
                        name: 'Yes',
                    },
                ];
                return (
                    <Autocomplete
                        value={options.find((e) => e[primaryKey] === filterValue)}
                        onChange={(newValue) => {
                            setFilterValue(newValue && newValue[primaryKey]);
                        }}
                        options={options}
                        primaryKey={primaryKey}
                        labelKey={labelKey}
                    />
                );
            },
        },
    ];

    const rows = shippingCompanyList.map((shippingcompany) => ({
        ...shippingcompany,
        id: shippingcompany.id,
        actions: () => (
            <Link href={`/tada/shippingcompany/edit/${shippingcompany.id}`}>
                <a className="link-button">{t('shippingcompany:View')}</a>
            </Link>
        ),
    }));

    return (
        <>
            <Header t={t} />
            <Table
                rows={rows}
                getRows={getTadaShippingCompanyList}
                deleteRows={multideleteShippingCompany}
                loading={loading}
                columns={columns}
                count={shippingCompanyTotal}
                filters={filters}
                showCheckbox
                recordName="shipping company"
            />
        </>
    );
};

export default ShippingCompanyListContent;
