/* eslint-disable import/prefer-default-export */
export const optionsStatus = [
    {
        name: 'Allocating',
        idValue: 'allocating',
    },
    {
        name: 'Failed',
        idValue: 'failed',
    },
    {
        name: 'New',
        idValue: 'new',
    },
    {
        name: 'Processing',
        idValue: 'processing',
    },
];

export const bulkToolsOptions = [
    {
        name: 'Accept Marketplace Order',
        acl: 'sales_order_queue_marketplace_accept',
        sample: 'bulk_accept_order_marketplace',
        activity: 'accept_marketplace_order_queue',
    },
    {
        name: 'Order Import',
        acl: 'sales_order_import',
        sample: 'order_import',
        activity: 'import_order',
    },
];

export const optionsPaymentStatus = [
    {
        name: 'Pending',
        value: 'pending',
    },
    {
        name: 'Approved',
        value: 'approved',
    },
];
