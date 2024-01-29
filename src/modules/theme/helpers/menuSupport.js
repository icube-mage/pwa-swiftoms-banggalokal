/* eslint-disable import/prefer-default-export */
export const optionsSupport = (t) => [
    {
        aclCode: 'header_support',
        key: 'support',
        label: t('support'),
        children: [
            {
                aclCode: 'information_update',
                key: 'informationupdate',
                label: t('information_update'),
                url: '/support/informationupdate',
            },
        ],
    },
];
