/* eslint-disable import/prefer-default-export */
export const optionsIntegration = (t) => [
    {
        aclCode: 'header_integration',
        key: 'integration',
        label: t('menu:Integration'),
        children: [
            {
                aclCode: 'ecommerce_channels',
                key: 'ecommerce_channels',
                label: t('menu:Ecommerce_Channel'),
                url: '/integration/ecommercechannel',
            },
            {
                aclCode: 'offline_channels',
                key: 'offline_channels',
                label: t('menu:Offline_Channel'),
                url: '/integration/offlinechannel',
            },
            {
                aclCode: 'integration_third_party_apps',
                key: 'integration_app',
                label: t('menu:Third_Party_Apps'),
                url: '/integration/thirdpartyapps',
            },
            {
                aclCode: 'integration_automation',
                key: 'automation',
                label: t('menu:Automation'),
                url: '/integration/automation',
            },
        ],
    },
];
