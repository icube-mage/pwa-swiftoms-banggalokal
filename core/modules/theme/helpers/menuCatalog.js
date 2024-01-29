/* eslint-disable import/prefer-default-export */
export const optionsCatalog = (t) => [
    {
        aclCode: 'header_product',
        key: 'catalog',
        label: t('menu:Catalog'),
        children: [
            {
                aclCode: 'oms_lite_product_list',
                key: 'productlist',
                label: t('menu:Products'),
                url: '/product/productlist',
            },
            {
                aclCode: 'product_bundle',
                key: 'productbundle',
                label: t('menu:Product_Bundle'),
                url: '/product/productbundle',
                hide: true,
            },
            {
                aclCode: 'product_category',
                key: 'productcategory',
                label: t('menu:Categories'),
                url: '/product/categories',
            },
            {
                aclCode: 'oms_lite_product_bin',
                key: 'productbin',
                label: t('menu:Product_Bin'),
                url: '/product/productbin',
            },
            {
                aclCode: 'product_bulk_tools',
                key: 'productbulktools',
                label: t('menu:Product_Bulk_Tools'),
                url: '/product/productbulktools',
            },
            {
                aclCode: 'product_attributes',
                key: 'productattributes',
                label: t('menu:Product_Attributes'),
                url: '/product/productattributes',
            },
        ],
    },
];
