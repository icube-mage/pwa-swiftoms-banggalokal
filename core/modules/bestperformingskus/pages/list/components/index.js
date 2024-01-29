/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Header from '@modules/bestperformingskus/pages/list/components/Header';

const BestPerformingSkuContent = (props) => {
    const { data, loading, getCompanyList } = props;
    const companyList = (data && data.getCompanyList && data.getCompanyList.items) || [];
    const companyTotal = (data && data.getCompanyList && data.getCompanyList.total_count) || 0;

    const columns = [
        { field: 'company_id', headerName: 'SKU' },
        { field: 'company_name', headerName: 'Product Name' },
        { field: 'company_code', headerName: 'Product Price' },
        { field: 'company_code', headerName: 'Items Sold' },
    ];

    const rows = companyList.map((company) => ({
        ...company,
        id: company.company_id,
    }));

    return (
        <>
            <Header />
            <Table rows={rows} getRows={getCompanyList} loading={loading} columns={columns} count={companyTotal} />
        </>
    );
};

export default BestPerformingSkuContent;
