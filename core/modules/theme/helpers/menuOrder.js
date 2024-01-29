/* eslint-disable import/prefer-default-export */
export const optionsOrder = (t) => [
    {
        aclCode: 'oms_lite_header_sales',
        key: 'order',
        label: t('menu:Order'),
        children: [
            {
                aclCode: 'oms_lite_sales_order_queue',
                key: 'orderqueue_all',
                label: t('menu:All_Orders'),
                url: '/order/allorder',
            },
            {
                aclCode: 'oms_lite_sales_order_queue',
                key: 'orderqueue_allocating',
                label: t('menu:Allocating'),
                url: '/order/allocating',
            },
            {
                aclCode: 'oms_lite_sales_order_queue',
                key: 'orderqueue_failed',
                label: t('menu:Failed'),
                url: '/order/failed',
            },
            {
                aclCode: 'oms_lite_sales_order_queue',
                key: 'orderqueue_order_processing',
                label: t('menu:Order_Processing'),
                url: '/order/order_processing',
            },
            {
                aclCode: 'oms_lite_sales_order_queue',
                key: 'orderqueue_shipment_processing',
                label: t('menu:Shipment_Processing'),
                url: '/order/shipment_processing',
            },
            {
                aclCode: 'oms_lite_sales_order_queue',
                key: 'orderqueue_complete',
                label: t('menu:Completed'),
                url: '/order/complete',
            },
            {
                aclCode: 'oms_lite_sales_order_queue',
                key: 'orderqueue_canceled',
                label: t('menu:Canceled'),
                url: '/order/canceled',
            },
            {
                aclCode: 'sales_order_invoice',
                key: 'orderqueue_invoice',
                label: t('menu:Invoice'),
                url: '/order/invoice',
            },
            {
                aclCode: 'sales_order_queue_bulk_tools',
                key: 'orderqueue_bulk_tools',
                label: t('menu:Bulk_Tools'),
                url: '/order/bulktools',
            },
            {
                aclCode: 'export_order',
                key: 'exportorder',
                label: t('menu:Export_Order'),
                url: '/order/exportorder',
            },
            // { aclCode: 'orderreallocation', label: 'Order Reallocation', url: '/sales/orderreallocation' },
        ],
    },
];
