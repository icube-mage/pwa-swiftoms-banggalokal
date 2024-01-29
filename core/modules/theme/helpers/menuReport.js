/* eslint-disable import/prefer-default-export */
export const optionsReport = (t) => [
    {
        aclCode: 'oms_lite_header_reports',
        key: 'reports',
        label: t('menu:Report'),
        children: [
            // {
            //     aclCode: 'oms_lite_reports_sales_order',
            //     key: 'salesorder',
            //     label: 'Sales Order',
            //     url: '/reports/salesorder',
            // },
            // {
            //     aclCode: 'oms_lite_reports_sales_overview',
            //     key: 'salesoverview',
            //     label: 'Sales Overview',
            //     url: '/reports/salesoverview',
            // },
            // {
            //     aclCode: 'oms_lite_reports_product_performance',
            //     key: 'productperformance',
            //     label: 'Product Performance',
            //     url: '/reports/productperformance',
            // },
            // {
            //     aclCode: 'oms_lite_reports_sales_by_payment',
            //     key: 'salesbypaymenttype',
            //     label: 'Sales By Payment Type',
            //     url: '/reports/salesbypaymenttype',
            // },
            // {
            //     aclCode: 'oms_lite_reports_sales_by_shipping',
            //     key: 'salesbyshippingtype',
            //     label: 'Sales by Shipping Type',
            //     url: '/reports/salesbyshippingtype',
            // },
            // {
            //     aclCode: 'oms_lite_reports_best_sku',
            //     key: 'bestperformingskus',
            //     label: 'Top 10 Best Performing SKUs',
            //     url: '/reports/bestperformingskus',
            // },
            {
                aclCode: 'oms_lite_order_report',
                key: 'orderreport',
                label: t('menu:Order_Report'),
                url: '/reports/orderreport',
            },
            {
                aclCode: 'order_sli_report',
                key: 'orderslireport',
                label: t('menu:Order_SLI_Report'),
                url: '/reports/orderslireport',
            },
        ],
    },
];
