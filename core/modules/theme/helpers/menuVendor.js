/* eslint-disable import/prefer-default-export */
export const optionsVendor = (t) => [
    {
        aclCode: 'oms_lite_header_vendor_portal',
        key: 'vendor',
        label: t('menu:Vendor'),
        children: [
            {
                aclCode: 'oms_lite_vendor_request',
                key: 'requestvendor',
                label: t('menu:Manage_Vendor_Request'),
                url: '/vendorportal/requestvendor',
            },
            {
                aclCode: 'oms_lite_vendor_manage',
                key: 'managevendor',
                label: t('menu:Manage_Vendor'),
                url: '/vendorportal/managevendor',
            },
            // {
            //     aclCode: 'vendor_bulk_tools',
            //     key: 'vendorbulktools',
            //     label: t('menu:Product_Bulk_Tools'),
            //     url: '/vendorportal/bulktools',
            // },
            {
                aclCode: 'oms_lite_vendor_product_approval',
                key: 'productapproval',
                label: t('menu:Product_Approval'),
                url: '/vendorportal/productapproval',
            },
            // {
            //     aclCode: 'vendor_manage_promotion',
            //     key: 'managepromotion',
            //     label: t('menu:Manage_Promotion'),
            //     url: '/vendorportal/managepromotion',
            // },
            // {
            //     aclCode: 'vendor_manage_iris',
            //     key: 'vendoririspayout',
            //     label: t('menu:Iris_Payout'),
            //     url: '/vendorportal/vendoririspayout',
            // },
            {
                aclCode: 'oms_lite_vendor_iris',
                key: 'withdrawapproval',
                label: t('menu:Withdraw_Approval'),
                url: '/vendorportal/withdrawapproval',
            },
            {
                aclCode: 'vendor_manage_bank',
                key: 'managebank',
                label: t('menu:Manage_Bank'),
                url: '/vendorportal/managebank',
            },
            {
                aclCode: 'vendor_service_fees',
                key: 'servicefee',
                label: t('menu:Service_Fee'),
                url: '/vendorportal/servicefee',
            },
            {
                aclCode: 'vendor_third_party_apps',
                key: 'thirdpartyapps',
                label: t('menu:Third_Party_Apps'),
                url: '/vendorportal/thirdpartyapps',
            },
        ],
    },
];
