/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-expressions */
import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import Table from '@common_table';
import CustomList from '@common_customlist';
import Autocomplete from '@common_autocomplete';

import { typeOptions } from '@modules/managebank/helpers';
import Header from '@modules/managebank/pages/list/components/Header';
import { breakPointsUp } from '@helper_theme';
import { thousandSeparator } from '@helper_regex';

const ManageBankListContent = (props) => {
    const { data, loading, getVendorBankListLazy, t } = props;
    const desktop = breakPointsUp('sm');

    const bankList = (data && data.getVendorBankList && data.getVendorBankList.items) || [];
    const bankTotal = (data && data.getVendorBankList && data.getVendorBankList.total_count) || 0;

    const columns = [
        { field: 'bank_code', headerName: t('managebank:Bank_Code'), hideable: true, sortable: true },
        { field: 'bank_name', headerName: t('managebank:Bank_Name'), hideable: true, sortable: true },
        { field: 'withdrawal_fee_type', headerName: t('managebank:Withdrawal_Fee_Type'), hideable: true, sortable: true },
        { field: 'withdrawal_fee', headerName: t('managebank:Withdrawal_Fee'), hideable: true, sortable: true },
        { field: 'actions', headerName: t('managebank:Action') },
    ];

    const filters = [
        { field: 'bank_code', name: 'bank_code', type: 'like', label: t('managebank:Bank_Code'), initialValue: '' },
        { field: 'bank_name', name: 'bank_name', type: 'like', label: t('managebank:Bank_Name'), initialValue: '' },
        {
            field: 'withdrawal_fee_type',
            name: 'withdrawal_fee_type',
            type: 'like',
            label: t('managebank:Withdrawal_Fee_Type'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <Autocomplete
                    value={typeOptions.find((e) => e.value === filterValue)}
                    onChange={(newValue) => setFilterValue(newValue && newValue.value)}
                    options={typeOptions}
                    primaryKey="value"
                    labelKey="label"
                />
            ),
        },
        { field: 'withdrawal_fee', name: 'withdrawal_fee', type: 'like', label: t('managebank:Withdrawal_Fee'), initialValue: '' },
    ];

    const rows = bankList.map((bank) => ({
        ...bank,
        withdrawal_fee_type: typeOptions.find((e) => e.value === bank.withdrawal_fee_type)?.label,
        withdrawal_fee: bank.withdrawal_fee_type === 'percent_of_amount'
            ? `${bank.withdrawal_fee || 0}%`
            : `Rp${(bank.withdrawal_fee || 0).toString().replace(thousandSeparator, ',')}.00`,
        actions: () => (
            <Link href={`/vendorportal/managebank/edit/${bank.bank_code}`}>
                <a className="link-button">{t('managebank:View')}</a>
            </Link>
        ),
    }));

    return (
        <>
            <Header t={t} />
            {desktop ? (
                <Table
                    filters={filters}
                    rows={rows}
                    getRows={getVendorBankListLazy}
                    loading={loading}
                    columns={columns}
                    count={bankTotal}
                    hideActions
                />
            )
                : (
                    <CustomList
                        primaryKey="bank_code"
                        filters={filters}
                        rows={rows}
                        getRows={getVendorBankListLazy}
                        loading={loading}
                        columns={columns}
                        count={bankTotal}
                        hideActions
                        hideColumn={false}
                        twoColumns
                        handleClickRow={(key) => Router.push(`/vendorportal/managebank/edit/${key}`)}
                        usePagination
                    />
                )}
        </>
    );
};

export default ManageBankListContent;
