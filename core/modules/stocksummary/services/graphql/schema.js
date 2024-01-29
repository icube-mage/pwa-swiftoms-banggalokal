import { gql } from '@apollo/client';

export const getStockSummaryList = gql`
    query getStockSummaryList($pageSize: Int!, $currentPage: Int!, $filter: StockSummaryFilterInput, $sort: StockSummarySortInput) {
        getStockSummaryList(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort) {
            items {
                channel_code
                channel_id
                channel_name
                channel_stock
                last_sync_at
                product_name
                sku
                sync_message
                sync_status
                sync_status_label
                updated_at
            }
            total_count
            page_info {
                page_size
                current_page
                total_pages
            }
        }
    }
`;

export const exportStockSummaryList = gql`
    mutation {
        exportStockSummaryList
    }
`;

export const syncStockSummaryToMP = gql`
    mutation {
        syncStockSummaryToMP
    }
`;

export default {
    getStockSummaryList,
    exportStockSummaryList,
    syncStockSummaryToMP,
};
