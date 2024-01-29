/* eslint-disable import/prefer-default-export */
export const optionsStatus = [
    { idValue: 'shipment_booked', name: 'Shipment Booked' },
    { idValue: 'ready_for_ship', name: 'Ready for Ship' },
    { idValue: 'process_for_shipping', name: 'Process for Shipping' },
    { idValue: 'order_delivered', name: 'Order Delivered' },
    { idValue: 'customer_picked_up', name: 'Customer Picked Up' },
    { idValue: 'closed', name: 'Closed' },
    { idValue: 'canceled', name: 'Canceled' },
];

export const dataTab = [
    { label: 'All', value: 0 },
    { label: 'Unconfirmed', value: 'true' },
    { label: 'Cannot Fulfill', value: 'cannot_fulfill' },
];

export const getIconByStatus = (status, label) => {
    if (status === 'process_for_pack' || status === 'process_for_shipping'
    || status === 'pick_in_progress') {
        if (label === 'Cannot Fulfill') {
            return '/assets/img/order_status/cannotfulfill.svg';
        }
        return '/assets/img/order_status/processforpack.svg';
    }
    if (status === 'cannot_fulfill' || status === 'closed' || status === 'canceled') {
        return '/assets/img/order_status/cannotfulfill.svg';
    }
    if (status === 'ready_for_pack' || status === 'pick_uncomplete') {
        return '/assets/img/order_status/readyforpack.svg';
    }
    if (status === 'ready_for_pickup'
        || status === 'ready_for_ship'
        || status === 'shipment_booked'
        || status === 'gosend_rejected'
        || status === 'grabexpress_rejected') {
        return '/assets/img/order_status/readyforpickup.svg';
    }
    if (status === 'customer_picked_up'
        || status === 'customer_waiting'
        || status === 'order_delivered'
        || status === 'canceled'
        || status === 'closed') {
        return '/assets/img/order_status/customerpicked.svg';
    }
    return '/assets/img/order_status/ordershipped.svg';
};
