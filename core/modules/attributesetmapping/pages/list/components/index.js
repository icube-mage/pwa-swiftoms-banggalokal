/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Header from '@modules/attributesetmapping/pages/list/components/Header';

const AttributeMappingListContent = (props) => {
    const { data, loading, getCompanyList } = props;
    const companyList = (data && data.getCompanyList && data.getCompanyList.items) || [];
    const companyTotal = (data && data.getCompanyList && data.getCompanyList.total_count) || 0;

    const columns = [
        { field: 'company_id', headerName: 'ID' },
        { field: 'company_name', headerName: 'Attribute Set Name' },
        { field: 'company_code', headerName: 'Marketplace' },
        { field: 'company_name', headerName: 'Category Name' },
    ];

    const rows = companyList.map((company) => ({
        ...company,
        id: company.company_id,
    }));

    return (
        <>
            <Header />
            <Table rows={rows} getRows={getCompanyList} loading={loading} columns={columns} count={companyTotal} showCheckbox />
        </>
    );
};

export default AttributeMappingListContent;
