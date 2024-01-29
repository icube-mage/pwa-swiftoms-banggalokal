/* eslint-disable import/prefer-default-export */
export const optionsMasters = (t) => [
    {
        aclCode: 'oms_lite_header_oms',
        key: 'oms',
        label: t('menu:Masters'),
        children: [
            {
                aclCode: 'oms_lite_company',
                key: 'company',
                label: t('menu:Company'),
                url: '/oms/company',
            },
            {
                aclCode: 'oms_lite_channel',
                key: 'channel',
                label: t('menu:Channel'),
                url: '/oms/channel',
            },
            {
                aclCode: 'oms_lite_virtual_stock',
                key: 'virtualstock',
                label: t('menu:Virtual_Stock'),
                url: '/cataloginventory/virtualstock',
            },
            {
                aclCode: 'oms_lite_location',
                key: 'location',
                label: t('menu:Location'),
                url: '/oms/location',
            },
            {
                aclCode: 'oms_lite_location_pickup',
                key: 'locationpickup',
                label: t('menu:Location_Pickup'),
                url: '/oms/locationpickup',
            },
            {
                aclCode: 'oms_lite_virtual_location',
                key: 'virtuallocationinventory',
                label: t('menu:Virtual_Location'),
                url: '/cataloginventory/virtuallocationinventory',
            },
            {
                aclCode: 'location_zone',
                key: 'locationzone',
                label: t('menu:Location_Zone'),
                url: '/oms/locationzone',
            },
            {
                aclCode: 'priority_location_by_zone',
                key: 'prioritylocationbyzone',
                label: t('menu:Priority_Location_by_Zone'),
                url: '/oms/prioritylocationbyzone',
            },
            {
                aclCode: 'oms_lite_priority_location_by_city',
                key: 'prioritylocationbycity',
                label: t('menu:Priority_Location_by_City'),
                url: '/oms/prioritylocationbycity',
            },
        ],
    },
];
