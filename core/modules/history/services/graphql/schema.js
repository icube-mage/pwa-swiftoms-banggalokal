import { gql } from '@apollo/client';

export const getHistoryUpdateStockList = gql`
    query getHistoryUpdateStockList(
        $filter: HistoryUpdateStockListFilterInput
        $sort: HistoryUpdateStockListSortInput
        $pageSize: Int!
        $currentPage: Int!
    ) {
        getHistoryUpdateStockList(filter: $filter, sort: $sort, pageSize: $pageSize, currentPage: $currentPage) {
            items {
                created_at
                entity_id
                last_trigered_by
                message
                status
                type
                sku
                channel_code
                marketplace
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

export default {
    getHistoryUpdateStockList,
};
