export const optionsAllocation = [
    { name: 'Unconfirmed', id: 'true' },
    { name: 'Confirmed', id: 'confirmed' },
    { name: 'Cannot Fulfill', id: 'cannot_fulfill' },
];

export const optionsStatus = [
    { id: 'canceled', name: 'Canceled' },
    { id: 'closed', name: 'Closed' },
    { id: 'customer_picked_up', name: 'Customer Picked Up' },
    { id: 'customer_waiting', name: 'Customer Waiting' },
    { id: 'gosend_rejected', name: 'GO-SEND Rejected' },
    { id: 'grabexpress_rejected', name: 'GrabExpress Rejected' },
    { id: 'order_delivered', name: 'Order Delivered' },
    { id: 'order_shipped', name: 'Order Shipped' },
    { id: 'process_for_shipping', name: 'Process for Shipping' },
    { id: 'ready_for_pack', name: 'Ready for Pack' },
    { id: 'ready_for_pick', name: 'Ready for Pick' },
    { id: 'ready_for_pickup', name: 'Ready for Pickup' },
    { id: 'ready_for_ship', name: 'Ready for Ship' },
    { id: 'shipment_booked', name: 'Shipment Booked' },
];

export const dataTabAll = [
    { label: 'Process for Shipping', value: 'process_for_shipping' },
    { label: 'Ready for Pack', value: 'ready_for_pack' },
    { label: 'Ready for Ship', value: 'ready_for_ship' },
    { label: 'Order Shipped - No AWB', value: 'order_shipped_no_awb' },
    { label: 'Order Shipped - AWB', value: 'order_shipped_awb' },
    { label: 'Order Delivered', value: 'order_delivered' },
    { label: 'All', value: 0 },
];

export const dataTabNoPickPack = [
    { label: 'Process for Shipping', value: 'process_for_shipping' },
    { label: 'Order Shipped - No AWB', value: 'order_shipped_no_awb' },
    { label: 'Order Shipped - AWB', value: 'order_shipped_awb' },
    { label: 'Order Delivered', value: 'order_delivered' },
    { label: 'All', value: 0 },
];
