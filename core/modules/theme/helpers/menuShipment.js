/* eslint-disable import/prefer-default-export */
export const optionsShipment = (t) => [
    {
        aclCode: 'header_shipment',
        key: 'shipment',
        label: t('menu:Shipment'),
        children: [
            {
                aclCode: 'oms_lite_sales_shipment',
                key: 'allshipment',
                label: t('menu:All_Shipment'),
                url: '/sales/shipment',
            },
            {
                aclCode: 'shipment_pickup_dashboard',
                key: 'storepickup',
                label: t('menu:Store_Pickup'),
                url: '/shipment/storepickup',
            },
            {
                aclCode: 'shipment_curbside_pickup',
                key: 'curbpickup',
                label: t('menu:Curbside_Pickup'),
                url: '/shipment/curbpickup',
            },
            {
                aclCode: 'shipment_delivery_dashboard',
                key: 'homedelivery',
                label: t('menu:Home_Delivery'),
                url: '/shipment/homedelivery',
            },
            {
                aclCode: 'shipment_marketplace_dashboard',
                key: 'shipmentmarketplace',
                label: t('menu:Marketplace'),
                url: '/shipment/shipmentmarketplace',
            },
        ],
    },
];
