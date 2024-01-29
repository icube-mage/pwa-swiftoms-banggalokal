/* eslint-disable object-curly-newline */
import React, { useState, useEffect } from 'react';
import Table from '@common_table';
import Header from '@modules/productapproval/pages/list/components/Header';
import gqlService from '@modules/productapproval/services/graphql';
import Autocomplete from '@common_autocomplete';

const ProductApprovalListContent = (props) => {
    const { data, loading, getVendorProductApprovalList, productsApprove, t } = props;
    const productList = (data && data.getVendorProductApprovalList && data.getVendorProductApprovalList.items) || [];
    const productTotal = (data && data.getVendorProductApprovalList && data.getVendorProductApprovalList.total_count) || 0;

    const columns = [
        { field: 'entity_id', headerName: t('productapproval:ID'), sortable: true, hideable: true },
        { field: 'approval_status', headerName: t('productapproval:Approval_status'), hideable: true },
        { field: 'sku', headerName: t('productapproval:SKU'), sortable: true, hideable: true },
        { field: 'name', headerName: t('productapproval:Product_Name'), sortable: true, hideable: true },
        { field: 'vendor_name', headerName: t('productapproval:Vendor'), sortable: true, hideable: true },
        { field: 'price', headerName: t('productapproval:Price'), hideable: true },
        { field: 'special_price', headerName: t('productapproval:Special_Price'), hideable: true },
        { field: 'special_from_date', headerName: t('productapproval:Special_Price_From'), hideable: true, hidden: true },
        { field: 'special_to_date', headerName: t('productapproval:Special_Price_To'), hideable: true, hidden: true },
        { field: 'status', headerName: t('productapproval:Status'), hideable: true },
    ];

    const rows = productList.map((product) => ({
        ...product,
        id: product.entity_id,
        approval_status: product.approval_status === '1' ? t('productapproval:Approve') : t('productapproval:Not_Approve'),
    }));

    const filters = [
        { field: 'entity_id', name: 'entity_id_from', type: 'from', label: t('productapproval:ID_From'), initialValue: '' },
        { field: 'entity_id', name: 'entity_id_to', type: 'to', label: t('productapproval:ID_To'), initialValue: '' },
        { field: 'sku', name: 'sku', type: 'like', label: t('productapproval:SKU'), initialValue: '' },
        { field: 'name', name: 'name', type: 'like', label: t('productapproval:Product_Name'), initialValue: '' },
        {
            field: 'vendor_id',
            name: 'vendor_id',
            type: 'eq',
            label: t('productapproval:Vendor'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const [getCompanyList, { data: dataComp, loading: loadingComp }] = gqlService.getCompanyList();
                const [optionsComp, setOptionsComp] = useState([]);
                const [searchComp, setSearchComp] = useState('');
                const primaryKey = 'company_code';
                const labelKey = 'company_name';

                useEffect(() => {
                    const onChangeTimeOut = setTimeout(() => {
                        const isExist = searchComp && optionsComp.filter((elm) => elm?.[labelKey]?.toLowerCase().includes(searchComp?.toLowerCase()));
                        if (searchComp && isExist.length === 0) {
                            getCompanyList({
                                variables: {
                                    search: searchComp,
                                    pageSize: 20,
                                    currentPage: 1,
                                },
                            });
                        }
                        return null;
                    }, 500);

                    return () => clearTimeout(onChangeTimeOut);
                }, [searchComp]);

                useEffect(() => {
                    if (dataComp && dataComp.getCompanyList && dataComp.getCompanyList.items) {
                        const ids = new Set(optionsComp.map((d) => d[primaryKey]));
                        setOptionsComp([...optionsComp, ...dataComp.getCompanyList.items.filter((d) => !ids.has(d[primaryKey]))]);
                    }
                }, [dataComp]);

                return (
                    <Autocomplete
                        mode={optionsComp.length > 0 ? 'default' : 'lazy'}
                        loading={loadingComp}
                        getOptions={getCompanyList}
                        value={optionsComp.find((e) => e[primaryKey] === filterValue)}
                        onChange={(newValue) => setFilterValue(newValue && newValue[primaryKey])}
                        onInputChange={(e) => setSearchComp(e && e.target && e.target.value)}
                        options={optionsComp}
                        primaryKey={primaryKey}
                        labelKey={labelKey}
                    />
                );
            },
        }];

    const actions = [
        {
            label: t('productapproval:Approve'),
            message: t('productapproval:Are_you_sure_to_confirm_'),
            onClick: async (checkedRows) => {
                const variables = { ids: checkedRows.map((checkedRow) => checkedRow.id) };
                await productsApprove({ variables });
            },
            showMessage: true,
        },
    ];

    return (
        <>
            <Header t={t} />
            <Table
                rows={rows}
                getRows={getVendorProductApprovalList}
                loading={loading}
                columns={columns}
                count={productTotal}
                filters={filters}
                actions={actions}
                showCheckbox
            />
        </>
    );
};

export default ProductApprovalListContent;
