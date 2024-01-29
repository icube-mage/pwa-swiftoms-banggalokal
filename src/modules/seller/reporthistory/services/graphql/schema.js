import { gql } from '@apollo/client';

export const getSellerExportHistory = gql`
    query getSellerExportHistory(
        $pageSize: Int,
        $currentPage: Int,
        $sort: ExportHistorySortInput,
    ) {
        getSellerExportHistory(pageSize: $pageSize, currentPage: $currentPage, sort: $sort) {
            items {
                data_count
                entity_id
                export_at
                export_type
                status
                url
                user
            }
            page_info {
                current_page
                page_size
                total_pages
            }
            total_count
        }
    }
`;

export default {
    getSellerExportHistory,
};
