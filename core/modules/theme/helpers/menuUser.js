/* eslint-disable import/prefer-default-export */
export const optionsUser = (t) => [
    {
        aclCode: 'oms_lite_header_user_data',
        key: 'userData',
        label: t('menu:User'),
        children: [
            {
                aclCode: 'oms_lite_admin_store',
                key: 'adminstore',
                label: t('menu:All_Users'),
                url: '/userdata/adminstore',
            },
            {
                aclCode: 'manage_user_group',
                key: 'usergroupacl',
                label: t('menu:User_Group'),
                url: '/userdata/group',
            },
        ],
    },
];
