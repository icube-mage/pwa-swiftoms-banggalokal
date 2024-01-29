/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/configurationtaxrules/pages/list/components/Header';
import gqlService from '@modules/configurationtaxrules/services/graphql';
import Autocomplete from '@common_autocomplete';

const ProductListContent = (props) => {
    const { data, loading, getTaxRuleList, t } = props;
    const taxList = (data && data.getTaxRuleList && data.getTaxRuleList.items) || [];
    const taxTotal = (data && data.getTaxRuleList && data.getTaxRuleList.total_count) || 0;

    const columns = [
        { field: 'code', headerName: t('taxrulesconfiguration:Name'), hideable: false, sortable: true, initialSort: 'ASC' },
        { field: 'tax_customer_class', headerName: t('taxrulesconfiguration:Customer_Tax_Class'), hideable: true },
        { field: 'tax_product_class', headerName: t('taxrulesconfiguration:Product_Tax_Class'), hideable: true },
        { field: 'tax_rate', headerName: t('taxrulesconfiguration:Tax_Rate'), hideable: true },
        { field: 'priority', headerName: t('taxrulesconfiguration:Priority'), hideable: true, sortable: true },
        { field: 'calculate_subtotal', headerName: t('taxrulesconfiguration:Subtotal_Only'), hideable: true, sortable: true },
        { field: 'position', headerName: t('taxrulesconfiguration:Sort_Order'), hideable: true, sortable: true },
        { field: 'action', headerName: t('taxrulesconfiguration:Action') },
    ];

    const filters = [
        { field: 'code', name: 'code', type: 'like', label: t('taxrulesconfiguration:Name'), initialValue: '' },
        {
            field: 'tax_customer_class',
            name: 'tax_customer_class',
            type: 'eq',
            label: t('taxrulesconfiguration:Customer_Tax_Class'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const [getTaxClassList, { data: dataTax, loading: loadingTax }] = gqlService.getTaxClassList();
                const options = dataTax?.getTaxClassList || [];
                return (
                    <Autocomplete
                        mode="lazy"
                        loading={loadingTax}
                        value={options.find((e) => String(e.id) === filterValue)}
                        onChange={(newValue) => {
                            setFilterValue(newValue && newValue.id && String(newValue.id));
                        }}
                        getOptions={getTaxClassList}
                        getOptionsVariables={{
                            variables: {
                                filter: {
                                    class_type: { eq: 'CUSTOMER' } },
                            },
                        }}
                        options={options}
                        primaryKey="id"
                        labelKey="class_name"
                    />
                );
            },
        },
        { field: 'tax_product_class',
            name: 'tax_product_class',
            type: 'eq',
            label: t('taxrulesconfiguration:Product_Tax_Class'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const [getTaxClassList, { data: dataTax, loading: loadingTax }] = gqlService.getTaxClassList();
                const options = dataTax?.getTaxClassList || [];
                return (
                    <Autocomplete
                        mode="lazy"
                        loading={loadingTax}
                        value={options.find((e) => String(e.id) === filterValue)}
                        onChange={(newValue) => {
                            setFilterValue(newValue && newValue.id && String(newValue.id));
                        }}
                        getOptions={getTaxClassList}
                        getOptionsVariables={{
                            variables: {
                                filter: {
                                    class_type: { eq: 'PRODUCT' } },
                            },
                        }}
                        options={options}
                        primaryKey="id"
                        labelKey="class_name"
                    />
                );
            } },
        { field: 'tax_rate', name: 'tax_rate', type: 'like', label: t('taxrulesconfiguration:Tax_Rate'), initialValue: '' },
        { field: 'priority', name: 'priority', type: 'eq', label: t('taxrulesconfiguration:Priority'), initialValue: '' },
        {
            field: 'calculate_subtotal',
            name: 'calculate_subtotal',
            type: 'eq',
            label: t('taxrulesconfiguration:Subtotal_Only'),
            initialValue: '',
        },
        { field: 'position', name: 'position', type: 'eq', label: t('taxrulesconfiguration:Sort_Order'), initialValue: '' },
    ];

    const rows = taxList.map((tax) => ({
        ...tax,
        tax_customer_class: tax.tax_customer_class.length && tax.tax_customer_class.map((c) => c.class_name).join(', '),
        tax_product_class: tax.tax_product_class.length && tax.tax_product_class.map((c) => c.class_name).join(', '),
        tax_rate: tax.tax_rate.length && tax.tax_rate.map((c) => c.code).join(', '),
        calculate_subtotal: tax.calculate_subtotal ? '1' : '0',
        action: () => (
            <Link href={`/configurations/taxrules/edit/${tax.id}`}>
                <a className="link-button">{t('taxrulesconfiguration:View')}</a>
            </Link>
        ),
    }));

    return (
        <>
            <Header t={t} />
            <Table
                filters={filters}
                rows={rows}
                getRows={getTaxRuleList}
                loading={loading}
                columns={columns}
                count={taxTotal}
                hideActions
            />
        </>
    );
};

export default ProductListContent;
