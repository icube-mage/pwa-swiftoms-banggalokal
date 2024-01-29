/* eslint-disable import/prefer-default-export */
export const optionsReturn = (t) => [
    {
        aclCode: 'header_sales_return',
        key: 'salesreturn',
        label: t('menu:Return'),
        children: [
            {
                aclCode: 'oms_lite_credit_memos',
                key: 'creditmemos',
                label: t('menu:Credit_Memos'),
                url: '/return/creditmemos',
            },
            {
                aclCode: 'oms_lite_rma_manage',
                key: 'managerma',
                label: t('menu:Manage_RMA'),
                url: '/return/managerma',
            },
            {
                aclCode: 'oms_lite_rma_statuses',
                key: 'rmastatuses',
                label: t('menu:RMA_Statuses'),
                url: '/return/rmastatuses',
            },
        ],
    },
];
