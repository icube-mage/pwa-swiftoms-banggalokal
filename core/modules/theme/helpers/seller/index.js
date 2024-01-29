/* eslint-disable import/prefer-default-export */
export const optionsSeller = (t) => [
    {
        aclCode: 'seller_order',
        key: 'order',
        label: t('menu:Order_List'),
        url: '/seller/order',
    },
    {
        aclCode: 'seller_catalog',
        key: 'catalog',
        label: t('menu:Catalog'),
        url: '/seller/catalog',
    },
    {
        aclCode: 'seller_stock',
        key: 'stock',
        label: t('menu:Stock'),
        url: '/seller/stock',
    },
    // {
    //     key: 'discussion',
    //     label: t('menu:Discussion'),
    //     url: '/seller/discussion',
    // },
    // {
    //     key: 'review',
    //     label: t('menu:Review'),
    //     url: '/seller/review',
    // },
    {
        aclCode: 'seller_return',
        key: 'returns',
        label: t('menu:Return'),
        url: '/seller/return',
    },
    {
        aclCode: 'seller_store',
        key: 'storesetting',
        label: t('menu:Store_Setting'),
        url: '/seller/storesetting',
    },
    {
        aclCode: 'seller_income',
        key: 'income',
        label: t('menu:Income'),
        url: '/seller/income/balance',
    },
    {
        aclCode: 'seller_promotion',
        key: 'promotion',
        label: t('menu:Promotion'),
        url: '/seller/promotion',
    },
    {
        aclCode: 'seller_user',
        key: 'manageuser',
        label: t('menu:Manage_User'),
        url: '/seller/manageuser',
    },
];

export default optionsSeller;
