/* eslint-disable object-curly-newline */
import React from 'react';
import Router from 'next/router';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/company/pages/list/components/Header';
import CustomList from '@common_customlist';
import { breakPointsUp } from '@helper_theme';

const CompanyListContent = (props) => {
    const { data, loading, getCompanyList, multideleteCompany, t } = props;
    const companyList = (data && data.getCompanyList && data.getCompanyList.items) || [];
    const companyTotal = (data && data.getCompanyList && data.getCompanyList.total_count) || 0;

    const desktop = breakPointsUp('sm');

    const columns = [
        { field: 'company_id', headerName: t('company:ID'), sortable: true, initialSort: 'ASC', hideable: true },
        { field: 'company_code', headerName: t('company:Company_Code'), sortable: true, hideable: true },
        { field: 'company_name', headerName: t('company:Company_Name'), sortable: true, hideable: true },
        { field: 'actions', headerName: t('company:Action'), hidden: !desktop },
    ];

    const filters = [
        { field: 'company_id', name: 'id_from', type: 'from', label: t('company:ID_From'), initialValue: '' },
        { field: 'company_id', name: 'id_to', type: 'to', label: t('company:ID_To'), initialValue: '' },
        { field: 'company_code', name: 'company_code', type: 'like', label: t('company:Company_Code'), initialValue: '' },
        { field: 'company_name', name: 'company_name', type: 'like', label: t('company:Company_Name'), initialValue: '' },
    ];

    const rows = companyList.map((company) => ({
        ...company,
        id: company.company_id,
        actions: () => (
            <Link href={`/oms/company/edit/${company.company_id}`}>
                <a className="link-button">{t('company:View')}</a>
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
                        getRows={getCompanyList}
                        deleteRows={multideleteCompany}
                        loading={loading}
                        columns={columns}
                        count={companyTotal}
                        showCheckbox
                        recordName="company"
                    />
                ) : (
                    <CustomList
                        filters={filters}
                        rows={rows}
                        getRows={getCompanyList}
                        deleteRows={multideleteCompany}
                        loading={loading}
                        columns={columns}
                        count={companyTotal}
                        showCheckbox
                        recordName="company"
                        hideColumn={false}
                        checkboxAll
                        twoColumns
                        handleClickRow={(id) => Router.push(`/oms/company/edit/${id}`)}
                        usePagination
                    />
                )
            }
        </>
    );
};

export default CompanyListContent;
