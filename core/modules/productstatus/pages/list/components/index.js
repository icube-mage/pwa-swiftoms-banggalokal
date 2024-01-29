/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
import React from 'react';
import Table from '@common_table';
import Header from '@modules/productstatus/pages/list/components/Header';
import formatDate from '@helper_date';
import TextField from '@common_textfield';
import useStyles from '@modules/productstatus/pages/list/components/style';

const ProductStatusListContent = (props) => {
    const { data, loading, getMarketplaceProductStatusList, t } = props;
    const classes = useStyles();
    const companyList = (data && data.getMarketplaceProductStatusList && data.getMarketplaceProductStatusList.items) || [];
    const companyTotal = (data && data.getMarketplaceProductStatusList && data.getMarketplaceProductStatusList.total_count) || 0;

    const columns = [
        { field: 'id', headerName: t('productstatus:ID'), hideable: true, sortable: true },
        { field: 'sku', headerName: t('productstatus:SKU'), hideable: true, sortable: true },
        { field: 'marketplace_code', headerName: t('productstatus:Marketplace_Code'), hideable: true, sortable: true },
        { field: 'marketplace_store_id', headerName: t('productstatus:Marketplace_Store_ID'), hideable: true, sortable: true },
        { field: 'marketplace_status', headerName: t('productstatus:Marketplace_Status'), hideable: true, sortable: true },
        { field: 'status', headerName: t('productstatus:Status'), hideable: true, sortable: true },
        { field: 'message', headerName: t('productstatus:Message'), hideable: true, sortable: true },
        { field: 'updated_at', headerName: t('productstatus:Updated_At'), hideable: true, sortable: true },
    ];

    const filters = [
        { field: 'id', name: 'id_from', type: 'from', label: t('productstatus:ID_From'), initialValue: '' },
        { field: 'id', name: 'id_to', type: 'to', label: t('productstatus:ID_To'), initialValue: '' },
        { field: 'updated_at',
            name: 'updated_at_from',
            type: 'from',
            label: t('productstatus:Updated_From'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    id="date"
                    type="date"
                    value={filterValue?.split(' ').slice(0, 1).join('')}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(newValue) => {
                        newValue.target.value ? setFilterValue(`${newValue.target.value} 00:00:00`)
                            : setFilterValue(`${newValue.target.value}`);
                    }}
                    InputProps={{
                        className: classes.fieldInputFilter,
                    }}
                />
            ) },
        { field: 'updated_at',
            name: 'updated_at_to',
            type: 'to',
            label: t('productstatus:Updated_To'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    id="date"
                    type="date"
                    value={filterValue?.split(' ').slice(0, 1).join('')}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(newValue) => {
                        newValue.target.value ? setFilterValue(`${newValue.target.value} 23:59:59`)
                            : setFilterValue(`${newValue.target.value}`);
                    }}
                    InputProps={{
                        className: classes.fieldInputFilter,
                    }}
                />
            ) },
        { field: 'sku', name: 'sku', type: 'like', label: t('productstatus:SKU'), initialValue: '' },
        { field: 'marketplace_code', name: 'marketplace_code', type: 'like', label: t('productstatus:Marketplace_Code'), initialValue: '' },
        { field: 'marketplace_store_id', name: 'marketplace_store_id', type: 'like', label: t('productstatus:Marketplace_Store_ID'), initialValue: '' },
        { field: 'marketplace_status', name: 'marketplace_status', type: 'like', label: t('productstatus:Marketplace_Status'), initialValue: '' },
        { field: 'status', name: 'status', type: 'like', label: t('productstatus:Status'), initialValue: '' },
        { field: 'message', name: 'message', type: 'like', label: t('productstatus:Message'), initialValue: '' },
    ];

    const rows = companyList.map((company) => ({
        ...company,
        id: company.id,
        updated_at: formatDate(company.updated_at, 'MMM D, YYYY h:mm:ss A'),
    }));

    return (
        <>
            <Header t={t} />
            <Table
                rows={rows}
                getRows={getMarketplaceProductStatusList}
                loading={loading}
                filters={filters}
                columns={columns}
                count={companyTotal}
                hideActions
            />
        </>
    );
};

export default ProductStatusListContent;
