/* eslint-disable object-curly-newline */
import Table from '@sellermodules/reportstore/pages/list/components/Table';

const ReportStoreListContent = (props) => {
    const { data, loading, getSellerSummaryOrder, t } = props;

    const reportList = (data && data.getSellerSummaryOrder && data.getSellerSummaryOrder.items) || [];
    const reportTotal = (data && data.getSellerSummaryOrder && data.getSellerSummaryOrder.total_count) || 0;

    const columns = [
        { field: 'period', headerName: t('sellerreport:Month'), sortable: true, initialSort: 'DESC' },
        { field: 'grand_total', headerName: t('sellerreport:Sales_Total'), sortable: true },
        { field: 'total_item_qty', headerName: t('sellerreport:total_item'), sortable: true },
        { field: 'total_shipping', headerName: t('sellerreport:Total_Shipping_Cost'), sortable: true },
        { field: 'total_discount', headerName: t('sellerreport:Total_Discount'), sortable: true },
        { field: 'total_net', headerName: t('sellerreport:total_net_price'), sortable: true },
    ];

    const rows = reportList.map((item) => ({
        ...item,
    }));

    return (
        <Table
            rows={rows}
            getRows={getSellerSummaryOrder}
            loading={loading}
            columns={columns}
            count={reportTotal}
        />
    );
};

export default ReportStoreListContent;
