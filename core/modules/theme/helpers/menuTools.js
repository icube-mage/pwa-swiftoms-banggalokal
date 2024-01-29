/* eslint-disable import/prefer-default-export */
export const optionsTools = (t) => [
    {
        aclCode: 'oms_lite_header_tools',
        key: 'tools',
        label: t('menu:Tools'),
        children: [
            {
                aclCode: 'oms_lite_tools_cli',
                key: 'clitools',
                label: t('menu:CLI_Tools'),
                url: '/tools/clitools',
            },
        ],
    },
];
