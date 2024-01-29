/* eslint-disable no-prototype-builtins */
/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-newline */

import Table from '@sellermodules/stock/pages/list/components/Table';
import EditDialog from '@sellermodules/stock/pages/list/components/EditDialog';
import DownloadDialog from '@sellermodules/stock/pages/list/components/DownloadDialog';
import useStyles from '@sellermodules/stock/pages/list/components/style';

const CatalogListContent = (props) => {
    const { data, getSellerStocks, t, detail, setDetail, dataLocations } = props;
    const classes = useStyles();

    const stockList = (data && data.getSellerStocks && data.getSellerStocks.items) || [];
    const stockTotal = (data && data.getSellerStocks && data.getSellerStocks.total_count) || 0;

    const columns = [
        { field: 'product_name', headerName: t('sellerstock:Product_Name'), sortable: true, initialSort: 'ASC' },
        { field: 'vendor_sku', headerName: t('sellerstock:SKU') },
        { field: 'location', headerName: t('sellerstock:Location') },
        { field: 'qty_saleable', headerName: t('sellerstock:Stock') },
        { field: 'action', headerName: t('sellerstock:Action') },
    ];

    const rows = stockList.map((stock) => ({
        ...stock,
        location: stock.location.loc_name,
        action: () => (
            <span className={classes.link} aria-hidden="true" onClick={() => setDetail(stock)}>
                {t('sellerstock:Edit_Stock')}
            </span>
        ),
    }));

    return (
        <>
            <Table
                {...props}
                header={t('sellerincome:Stock')}
                columns={columns}
                getRows={getSellerStocks}
                rows={rows}
                count={stockTotal}
                searchPlaceholder={t('sellerstock:Search_product_name_or_SKU')}
                dataLocations={dataLocations}
            />
            <EditDialog {...props} open={detail.hasOwnProperty('source_id')} onClose={() => setDetail({})} />
            <DownloadDialog {...props} title="stock" />
        </>
    );
};

export default CatalogListContent;
