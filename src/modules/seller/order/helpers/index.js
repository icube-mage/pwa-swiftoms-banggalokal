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

export const stepNumber = (code) => {
    switch (code) {
    case 'unconfirmed':
        return 0;
    case 'confirmed':
        return 1;
    case 'ready_for_ship':
        return 2;
    case 'order_shipped':
        return 3;
    case 'order_delivered':
        return 4;
    case 'closed':
    case 'canceled':
        return 5;
    default:
        return 0;
    }
};

export const transformArray = (arr = []) => {
    const res = arr.map((item) => {
        if (item.parent_item_id) {
            return { ...item, isChild: true };
        }
        return { ...item, isChild: false, bundle_children: [] };
    });
    arr.filter((item) => item.parent_item_id).forEach((item) => {
        const pIdx = res.findIndex((p) => p.entity_id === Number(item.parent_item_id));
        if (pIdx >= 0) {
            res[pIdx] = {
                ...res[pIdx],
                bundle_children: [...res[pIdx].bundle_children, { ...item }],
            };
        }
    });
    return res;
};
