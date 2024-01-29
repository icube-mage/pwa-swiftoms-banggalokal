/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Header from '@modules/salesorder/pages/list/components/Header';

const SalesOrderListContent = (props) => {
    const { data, loading, getCompanyList } = props;
    const companyList = (data && data.getCompanyList && data.getCompanyList.items) || [];
    const companyTotal = (data && data.getCompanyList && data.getCompanyList.total_count) || 0;

    const columns = [
        { field: 'company_id', headerName: 'Order Increment ID' },
        { field: 'company_id', headerName: 'Channel Order Number' },
        { field: 'company_code', headerName: 'Purchase Date' },
        { field: 'company_name', headerName: 'Bill-to-name' },
        { field: 'company_name', headerName: 'Ship-to-name' },
        { field: 'company_code', headerName: 'Status Order' },
        { field: 'company_code', headerName: 'Status Shipment' },
        { field: 'company_code', headerName: 'Location' },
        { field: 'company_name', headerName: 'Grand Total(Purchased)' },
        { field: 'company_name', headerName: 'Grand Total (Based)' },
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

export default SalesOrderListContent;
