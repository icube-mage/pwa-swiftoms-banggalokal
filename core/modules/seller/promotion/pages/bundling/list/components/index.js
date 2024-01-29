/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-newline */
import Table from '@sellermodules/promotion/pages/bundling/list/components/Table';

const CatalogListContent = (props) => {
    const { data, loading, getSellerPromotionsBundle, t, handleStopBundling, handleDeleteBundling } = props;
    const promotionList = (data && data.getSellerPromotionsBundle && data.getSellerPromotionsBundle.items) || [];
    const promotionTotal = (data && data.getSellerPromotionsBundle && data.getSellerPromotionsBundle.total_count) || 0;

    const columns = [
        { field: 'name', headerName: t('sellerpromotion:Name'), sortable: true },
        { field: 'entity_id', headerName: t('sellerpromotion:Bundling_ID'), sortable: true },
        { field: 'bundle_status', headerName: t('sellerpromotion:Status') },
        { field: 'start_period', headerName: t('sellerpromotion:Start'), sortable: true },
        { field: 'end_period', headerName: t('sellerpromotion:End'), sortable: true },
    ];

    const rows = promotionList.map((promo) => ({
        ...promo,
        bundle_status: promo.bundle_status.label,
    }));

    return (
        <Table
            header={t('sellerpromotion:Bundling')}
            loading={loading}
            columns={columns}
            getRows={getSellerPromotionsBundle}
            rows={rows}
            count={promotionTotal}
            searchPlaceholder={t('sellerpromotion:Search_bundle')}
            t={t}
            handleStopBundling={handleStopBundling}
            handleDeleteBundling={handleDeleteBundling}
        />
    );
};

export default CatalogListContent;
