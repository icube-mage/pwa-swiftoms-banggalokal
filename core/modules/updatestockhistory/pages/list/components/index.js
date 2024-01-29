/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/updatestockhistory/pages/list/components/Header';

const UpdateStockListContent = (props) => {
    const { data, loading, getCompanyList } = props;
    const companyList = (data && data.getCompanyList && data.getCompanyList.items) || [];
    const companyTotal = (data && data.getCompanyList && data.getCompanyList.total_count) || 0;

    const columns = [
        { field: 'company_id', headerName: 'Transaction Code' },
        { field: 'company_name', headerName: 'Created At' },
        { field: 'company_code', headerName: 'Status' },
        { field: 'company_id', headerName: 'Finished At' },
        { field: 'company_id', headerName: 'Total SKU' },
        { field: 'actions', headerName: 'Action', hideable: true },
    ];

    const rows = companyList.map((company) => ({
        ...company,
        id: company.company_id,
        actions: () => (
            <Link href={`/marketplace/updatestockhistory/detail/${company.company_id}`}>
                <a className="link-button">Detail</a>
            </Link>
        ),
    }));

    return (
        <>
            <Header />
            <Table rows={rows} getRows={getCompanyList} loading={loading} columns={columns} count={companyTotal} />
        </>
    );
};

export default UpdateStockListContent;
