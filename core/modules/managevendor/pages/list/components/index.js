/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/managevendor/pages/list/components/Header';

const ManageVendorListContent = (props) => {
    const { data, loading, getCompanyList, t } = props;
    const vendorList = (data && data.getVendorList && data.getVendorList.items) || [];
    const vendorTotal = (data && data.getVendorList && data.getVendorList.total_count) || 0;

    const columns = [
        { field: 'company_id', headerName: t('managevendor:ID'), hideable: true, sortable: true, initialSort: 'ASC' },
        { field: 'company_code', headerName: t('managevendor:Vendor_Code'), hideable: true, sortable: true },
        { field: 'company_name', headerName: t('managevendor:Vendor_Name'), hideable: true, sortable: true },
        { field: 'email', headerName: t('managevendor:Email'), hideable: true, sortable: true },
        { field: 'actions', headerName: t('managevendor:Action') },
    ];

    const filters = [
        { field: 'company_id', name: 'company_id_from', type: 'from', label: t('managevendor:ID_from'), initialValue: '' },
        { field: 'company_id', name: 'company_id_to', type: 'to', label: t('managevendor:ID_to'), initialValue: '' },
        { field: 'company_code', name: 'company_code', type: 'like', label: t('managevendor:Vendor_Code'), initialValue: '' },
        { field: 'company_name', name: 'company_name', type: 'like', label: t('managevendor:Vendor_Name'), initialValue: '' },
        { field: 'email', name: 'email', type: 'like', label: t('managevendor:Email'), initialValue: '' },
    ];

    const rows = vendorList.map((vendor) => ({
        ...vendor,
        id: vendor.company_id,
        actions: () => (
            <Link href={`/vendorportal/managevendor/edit/${vendor.company_id}`}>
                <a className="link-button">{t('managevendor:View')}</a>
            </Link>
        ),
    }));

    return (
        <>
            <Header t={t} />
            <Table rows={rows} getRows={getCompanyList} loading={loading} columns={columns} count={vendorTotal} filters={filters} hideActions />
        </>
    );
};

export default ManageVendorListContent;
