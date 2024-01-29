/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/managepromotion/pages/list/components/Header';

const VendorPromotionListContent = (props) => {
    const { data, loading, getVendorPromotionList, t } = props;
    const vendorPromotionList = (data && data.getVendorPromotionList && data.getVendorPromotionList.items) || [];
    const vendorPromotionTotal = (data && data.getVendorPromotionList && data.getVendorPromotionList.total_count) || 0;

    const columns = [
        { field: 'rule_id', headerName: t('managepromotion:ID'), sortable: true, initialSort: 'DESC', hideable: true },
        { field: 'name', headerName: t('managepromotion:Name'), sortable: true, hideable: true },
        { field: 'description', headerName: t('managepromotion:Description'), sortable: true, hideable: true },
        { field: 'coupon_code', headerName: t('managepromotion:Coupon_Code'), sortable: true, hideable: true },
        { field: 'from_date', headerName: t('managepromotion:From_Date'), hideable: true },
        { field: 'to_date', headerName: t('managepromotion:To_Date'), hideable: true },
        { field: 'actions', headerName: t('managepromotion:Action'), hideable: true },
    ];

    const filters = [
        { field: 'rule_id', name: 'rule_id_from', type: 'from', label: t('managepromotion:ID_From'), initialValue: '' },
        { field: 'rule_id', name: 'rule_id_to', type: 'to', label: t('managepromotion:ID_To'), initialValue: '' },
        { field: 'name', name: 'name', type: 'like', label: t('managepromotion:Name'), initialValue: '' },
        { field: 'description', name: 'description', type: 'like', label: t('managepromotion:Description'), initialValue: '' },
        { field: 'coupon_code', name: 'coupon_code', type: 'like', label: t('managepromotion:Coupon_Code'), initialValue: '' },
        { field: 'from_date', name: 'from_date', type: 'like', label: t('managepromotion:From_Date'), initialValue: '', typeInput: 'date' },
        { field: 'to_date', name: 'to_date', type: 'like', label: t('managepromotion:To_Date'), initialValue: '', typeInput: 'date' },
    ];

    const rows = vendorPromotionList.map((vendorPromotion) => ({
        ...vendorPromotion,
        id: vendorPromotion.rule_id,
        actions: () => (
            <Link href={`/vendorportal/managepromotion/edit/${vendorPromotion.rule_id}`}>
                <a className="link-button">{t('managepromotion:View')}</a>
            </Link>
        ),
    }));

    return (
        <>
            <Header t={t} />
            <Table
                filters={filters}
                rows={rows}
                getRows={getVendorPromotionList}
                loading={loading}
                columns={columns}
                count={vendorPromotionTotal}
                hideActions
            />
        </>
    );
};

export default VendorPromotionListContent;
