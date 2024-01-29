import { gql } from '@apollo/client';

export const getMarketplaceProductStatusList = gql`
    query getMarketplaceProductStatusList(
        $pageSize: Int!,
        $currentPage: Int!,
        $filter: MarketplaceProductStatusFilterInput,
        $sort: MarketplaceProductStatusSortInput,
    ){
        getMarketplaceProductStatusList(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter: $filter,
            sort: $sort
        ){
            items{
                id
                sku
                marketplace_code
                marketplace_store_id
                marketplace_product_id
                marketplace_upload_id
                marketplace_status
                status
                message
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

export default {
    getMarketplaceProductStatusList,
};
