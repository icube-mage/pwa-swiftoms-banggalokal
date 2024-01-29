/* eslint-disable object-curly-newline */
import Table from '@sellermodules/reporthistory/pages/list/components/Table';
import formatDate from '@helper_date';
import useStyles from '@sellermodules/reporthistory/pages/list/components/style';

const ReportHistoryListContent = (props) => {
    const { data, getSellerExportHistory, t } = props;
    const classes = useStyles();

    const historyList = (data && data.getSellerExportHistory && data.getSellerExportHistory.items) || [];
    const historyTotal = (data && data.getSellerExportHistory && data.getSellerExportHistory.total_count) || 0;

    const columns = [
        { field: 'export_type', headerName: t('sellerreport:export_file_type') },
        { field: 'export_at', headerName: t('sellerreport:export_date_user'), sortable: true, initialSort: 'DESC' },
        { field: 'user', headerName: t('sellerreport:admin_user') },
        { field: 'data_count', headerName: t('sellerreport:total_data') },
        { field: 'action', headerName: t('sellerreport:export_link') },
    ];

    const rows = historyList.map((history) => ({
        ...history,
        export_at: () => (
            <>{formatDate(history.export_at, 'D MMM YYYY HH:mm:ss')}</>
        ),
        action: () => (
            <a className={classes.link} href={history.url} rel="noreferrer" target="_blank">
                <span>
                    {t('sellerreport:Download')}
                </span>
            </a>
        ),
    }));

    return (
        <>
            <Table
                {...props}
                header={t('sellerreport:list_export')}
                columns={columns}
                getRows={getSellerExportHistory}
                rows={rows}
                count={historyTotal}
            />
        </>
    );
};

export default ReportHistoryListContent;
