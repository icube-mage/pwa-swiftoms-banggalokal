/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Header from '@modules/productattributemapping/pages/list/components/Header';

const ProductMappingListContent = (props) => {
    const { data, loading, getMarketplaceProductAttributeMappingList, deleteMarketplaceProductAttributeMapping,
        handleExport, t } = props;
    const productAttributeList = (data && data.getMarketplaceProductAttributeMappingList
        && data.getMarketplaceProductAttributeMappingList.items) || [];
    const productAttributeTotal = (data && data.getMarketplaceProductAttributeMappingList
        && data.getMarketplaceProductAttributeMappingList.total_count) || 0;

    const columns = [
        { field: 'entity_id', headerName: t('productattributemapping:ID'), sortable: true, initialSort: 'ASC' },
        { field: 'marketplace_code', headerName: t('productattributemapping:Marketplace_Code'), sortable: true },
        { field: 'marketplace_category_name', headerName: t('productattributemapping:Marketplace_Category'), sortable: true },
        { field: 'marketplace_attribute_name', headerName: t('productattributemapping:Marketplace_Attribute_Name'), sortable: true },
        { field: 'attribute_code', headerName: t('productattributemapping:Attribute_Code'), sortable: true },
    ];

    const rows = productAttributeList.map((productAttribute) => ({
        ...productAttribute,
        id: productAttribute.entity_id,
    }));

    const filters = [
        { field: 'entity_id', name: 'entity_id_from', type: 'from', label: t('productattributemapping:ID_From'), initialValue: '' },
        { field: 'entity_id', name: 'entity_id_to', type: 'to', label: t('productattributemapping:ID_To'), initialValue: '' },
        { field: 'marketplace_code', marketplace_code: 'marketplace_code', type: 'like', label: t('productattributemapping:Marketplace_Code'), initialValue: '' },
        { field: 'marketplace_category_name', name: 'marketplace_category_name', type: 'like', label: t('productattributemapping:Marketplace_Category'), initialValue: '' },
        {
            field: 'marketplace_attribute_name',
            name: 'marketplace_attribute_name',
            type: 'like',
            label: t('productattributemapping:Marketplace_Attribute_Name'),
            initialValue: '',
        },
        { field: 'attribute_code', name: 'attribute_code', type: 'like', label: t('productattributemapping:Attribute_Code'), initialValue: '' },
    ];

    return (
        <>
            <Header handleExport={handleExport} t={t} />
            <Table
                rows={rows}
                getRows={getMarketplaceProductAttributeMappingList}
                deleteLabel={t('productattributemapping:Delete_Mapping')}
                deleteRows={deleteMarketplaceProductAttributeMapping}
                loading={loading}
                columns={columns}
                count={productAttributeTotal}
                filters={filters}
                showCheckbox
                hideColumns
                recordName="marketplace product attribute"
            />
        </>
    );
};

export default ProductMappingListContent;
