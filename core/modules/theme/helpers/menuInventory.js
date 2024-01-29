/* eslint-disable import/prefer-default-export */
export const optionsInventory = (t) => [
    {
        aclCode: 'oms_lite_header_catalog_inventory',
        key: 'inventory',
        label: t('menu:Inventory'),
        children: [
            {
                aclCode: 'oms_lite_source',
                key: 'source',
                label: t('menu:Manage_Stock'),
                url: '/cataloginventory/managestock',
            },
            {
                aclCode: 'stock_summary',
                key: 'stocksummary',
                label: t('menu:Channel_Stock_Summary'),
                url: '/cataloginventory/channelstocksummary',
            },
            {
                aclCode: 'oms_lite_stock_transfer',
                key: 'stocktransfer',
                label: t('menu:Stock_Transfer'),
                url: '/cataloginventory/stocktransfer',
            },
            {
                aclCode: 'inventory_adjustment_dashboard',
                key: 'stockadjustment',
                label: t('menu:Stock_Adjustment'),
                url: '/cataloginventory/stockadjustment',
            },
            {
                aclCode: 'oms_lite_location_price_upload',
                key: 'locationpriceupload',
                label: t('menu:Manage_Price'),
                url: '/cataloginventory/locationpriceupload',
            },
            // {
            //     aclCode: 'oms_lite_tools_history',
            //     key: 'toolshistory',
            //     label: t('menu:Update_Stock_History'),
            //     url: '/tools/history',
            // },
            {
                aclCode: 'inventory_audit_trail',
                key: 'inventoryaudittrail',
                label: t('menu:Inventory_Audit_Trail'),
                url: '/cataloginventory/inventoryaudittrail',
            },
        ],
    },
];
