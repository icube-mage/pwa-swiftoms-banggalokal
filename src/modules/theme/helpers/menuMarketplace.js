/* eslint-disable import/prefer-default-export */
export const optionsMarketplace = (t) => [
    {
        aclCode: 'oms_lite_header_marketplace',
        key: 'marketplace',
        label: t('menu:Marketplace'),
        children: [
            {
                aclCode: 'oms_lite_marketplace',
                key: 'marketplaces',
                label: t('menu:Marketplace'),
                url: '/marketplace/marketplace',
            },
            {
                aclCode: 'oms_lite_marketplace_warehouse',
                key: 'warehouse',
                label: t('menu:Warehouse'),
                url: '/marketplace/warehouse',
            },
            {
                aclCode: 'oms_lite_marketplace_product_categories',
                key: 'productcategory',
                label: t('menu:Product_Category'),
                url: '/marketplace/productcategory',
            },
            {
                aclCode: 'oms_lite_mapping_product_attribute',
                key: 'productattributemapping',
                label: t('menu:Product_Attribute_Mapping'),
                url: '/marketplace/productattributemapping',
            },
            {
                aclCode: 'oms_lite_marketplace_product_status',
                key: 'productstatus',
                label: t('menu:Product_Status'),
                url: '/marketplace/productstatus',
            },
            {
                aclCode: 'oms_lite_marketplace_product_price',
                key: 'productprice',
                label: t('menu:Product_Price'),
                url: '/marketplace/productprice',
            },
            {
                aclCode: 'oms_lite_marketplace_product_promo',
                key: 'productpromo',
                label: t('menu:Product_Promo'),
                url: '/marketplace/productpromo',
            },
            {
                aclCode: 'marketplace_integration_support',
                key: 'integrationsupport',
                label: t('menu:integration_support'),
                url: '/marketplace/integrationsupport',
            },
        ],
    },
];
