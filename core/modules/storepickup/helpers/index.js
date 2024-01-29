export const optionsAllocation = [
    { name: 'Unconfirmed', id: 'true' },
    { name: 'Confirmed', id: 'confirmed' },
    { name: 'Cannot Fulfill', id: 'cannot_fulfill' },
];

export const optionsStatus = [
    { id: 'process_for_shipping', name: 'Process for Shipping' },
    { id: 'process_for_pack', name: 'Process for Pack' },
    { id: 'cannot_fulfill', name: 'Canonot Fulfill' },
    { id: 'ready_for_pack', name: 'Ready for Pack' },
    { id: 'ready_for_pickup', name: 'Ready for Pickup' },
    { id: 'customer_picked_up', name: 'Customer Picked Up' },
];

export const dataTab = [
    { label: 'Process for Shipping', value: 'process_for_shipping' },
    { label: 'Ready for Pack', value: 'ready_for_pack' },
    { label: 'Ready for Pickup', value: 'ready_for_pickup' },
    { label: 'Customer Picked Up', value: 'customer_picked_up' },
    { label: 'All', value: 0 },
];
