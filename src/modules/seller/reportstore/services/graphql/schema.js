import { gql } from '@apollo/client';

export const getSellerSummaryOrder = gql`
    query getSellerSummaryOrder($pageSize: Int!, $currentPage: Int!, $filter: SellerSummaryOrderFilter, $sort: SellerSummaryOrderSortInput) {
        getSellerSummaryOrder(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort) {
            items {
                period
                grand_total
                total_item_qty
                total_shipping
                total_discount
                total_net
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

export const exportSellerSummaryOrder = gql`
    query exportSellerSummaryOrder($filter: SellerSummaryOrderFilter) {
        exportSellerSummaryOrder(filter: $filter) {
            message
            success
        }
    }
`;

export default {
    getSellerSummaryOrder,
    exportSellerSummaryOrder,
};
