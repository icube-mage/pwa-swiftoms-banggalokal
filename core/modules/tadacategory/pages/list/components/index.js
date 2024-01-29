/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
import React from 'react';
import Table from '@common_table';
import Header from '@modules/tadacategory/pages/list/components/Header';

const CategoryTadaListContent = (props) => {
    const { data, loading, getCategoryTadaList, t } = props;
    const categoryTadaList = (data && data.getCategoryTadaList && data.getCategoryTadaList.items) || [];
    const categoryTadaTotal = (data && data.getCategoryTadaList && data.getCategoryTadaList.total_count) || 0;

    const columns = [
        { field: 'entity_id', headerName: t('tadacategory:ID'), sortable: true, hideable: true, initialSort: 'ASC' },
        { field: 'channel_category', headerName: t('tadacategory:Channel'), sortable: true, hideable: true },
        { field: 'name', headerName: t('tadacategory:Name'), sortable: true, hideable: true },
        { field: 'parent', headerName: t('tadacategory:Path'), hideable: true },
        { field: 'tada_category_id', headerName: t('tadacategory:TADA_Category_ID'), sortable: true, hideable: true },
        { field: 'tada_catalog_category_id', headerName: t('tadacategory:TADA_Catalog_Category_ID'), sortable: true, hideable: true },
    ];

    const filters = [
        { field: 'entity_id', name: 'entity_id', type: 'from', label: t('tadacategory:ID'), initialValue: '' },
        { field: 'channel_category', name: 'channel_category', type: 'like', label: t('tadacategory:Channel'), initialValue: '' },
        { field: 'name', name: 'name', type: 'like', label: t('tadacategory:Name'), initialValue: '' },
        { field: 'tada_category_id', name: 'tada_category_id', type: 'like', label: t('tadacategory:TADA_Category_ID'), initialValue: '' },
        { field: 'tada_catalog_category_id', name: 'tada_catalog_category_id', type: 'like', label: t('tadacategory:TADA_Catalog_Category_ID'), initialValue: '' },
    ];

    const rows = categoryTadaList.map((categoryTada) => ({
        ...categoryTada,
    }));

    return (
        <>
            <Header t={t} />
            <Table
                filters={filters}
                rows={rows}
                getRows={getCategoryTadaList}
                loading={loading}
                columns={columns}
                count={categoryTadaTotal}
                hideActions
            />
        </>
    );
};

export default CategoryTadaListContent;
