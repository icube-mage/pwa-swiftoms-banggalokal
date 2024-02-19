/* eslint-disable import/prefer-default-export */
export const optionsSeller = (t) => [
    {
        aclCode: 'seller_catalog',
        key: 'dashboard',
        label: t('menu:beranda'),
        url: '/seller/dashboard',
    },
    {
        aclCode: 'seller_catalog',
        key: 'catalog',
        label: t('menu:Catalog'),
        children: [
            {
                aclCode: 'seller_catalog',
                key: 'cataloglist',
                label: t('menu:Product_List'),
                url: '/seller/catalog',
            },
            {
                aclCode: 'seller_catalog',
                key: 'catalogtambah',
                label: t('menu:tambah_massal'),
                url: '/seller/catalog/organize/add',
            },
            {
                aclCode: 'seller_catalog',
                key: 'catalogubah',
                label: t('menu:ubah_massal'),
                url: '/seller/catalog/organize/change',
            },
        ],
    },
    {
        aclCode: 'seller_order',
        key: 'order',
        label: t('menu:Order'),
        url: '/seller/order',
    },
    {
        aclCode: 'seller_stock',
        key: 'stock',
        label: t('menu:Stock'),
        children: [
            {
                aclCode: 'seller_stock',
                key: 'stock',
                label: t('menu:Stock_List'),
                url: '/seller/stock',
            },
            {
                aclCode: 'seller_stock_bulk_edit',
                key: 'stockbulkedit',
                label: t('menu:ubah_massal'),
                url: '/seller/stock/organize',
            },
        ],
    },
    {
        aclCode: 'seller_sales_channel',
        key: 'channelseller',
        label: t('menu:channel_seller'),
        children: [
            {
                aclCode: 'seller_sales_channel_list',
                key: 'channelseller_storelist',
                label: t('menu:Store_List'),
                url: '/seller/saleschannels/storelist',
            },
            {
                aclCode: 'seller_sales_channel_integration',
                key: 'channelseller_storeintegration',
                label: t('menu:Store_Integration'),
                url: '/seller/saleschannels/storeintegration',
            },
        ],
    },
    {
        aclCode: 'seller_report',
        key: 'reportseller',
        label: t('menu:report_seller'),
        children: [
            {
                aclCode: 'seller_store_report',
                key: 'reportsellerstore',
                label: t('menu:report_seller_store'),
                url: '/seller/report/store',
            },
            {
                aclCode: 'seller_history_report',
                key: 'reportsellerhistory',
                label: t('menu:report_seller_history'),
                url: '/seller/report/history',
            },
        ],
    },
    {
        aclCode: 'chat_commerce',
        key: 'chatcommerce',
        label: t('menu:chat_commerce'),
        url: '/seller/chatcommerce',
    },
    {
        aclCode: 'seller_store',
        key: 'storesetting',
        label: t('menu:Store_Setting'),
        children: [
            {
                aclCode: 'seller_store',
                key: 'profilebrand',
                label: t('menu:profile_brand'),
                url: '/seller/storesetting',
            },
            {
                aclCode: 'seller_warehouse',
                key: 'warehouse',
                label: t('menu:Warehouse'),
                url: '/seller/warehouse',
            },
            {
                aclCode: 'seller_user',
                key: 'manageuser',
                label: t('menu:config_admin'),
                url: '/seller/manageuser',
            },
        ],
    },
    {
        aclCode: 'seller_store',
        key: 'pyb',
        label: t('menu:PYB'),
        children: [
            {
                // aclCode: 'pyb_facebook_ads',
                aclCode: 'seller_user',
                key: 'facebookads',
                label: t('menu:facebook_ads'),
                url: '/seller/pyb/facebookads',
            },
            {
                // aclCode: 'pyb_facebook_catalog_feed',
                aclCode: 'seller_user',
                key: 'facebookcatalogfeed',
                label: t('menu:facebook_catalog_feed'),
                url: '/seller/pyb/facebook_catalog_feed',
            },
            {
                // aclCode: 'pyb_google_ads',
                aclCode: 'seller_user',
                key: 'googleads',
                label: t('menu:google_ads'),
                url: '/seller/pyb/google_ads',
            },
            {
                // aclCode: 'pyb_google_ads',
                aclCode: 'seller_user',
                key: 'googlecatalogfeed',
                label: t('menu:google_catalog_feed'),
                url: '/seller/pyb/google_catalog_feed',
            },
        ],
    },
];

export default optionsSeller;
