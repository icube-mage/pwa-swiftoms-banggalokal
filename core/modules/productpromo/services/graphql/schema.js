import { gql } from '@apollo/client';

export const getMarketplaceProductPromoList = gql`
    query getMarketplaceProductPromoList(
        $pageSize: Int,
        $currentPage: Int,
        $filter: MarketplaceProductPromoFilterInput,
        $sort: MarketplaceProductPromoSortInput,
    ){
        getMarketplaceProductPromoList(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter: $filter,
            sort: $sort,
        ){
            items {
                entity_id
                channel_store_id
                name
                start_date
                end_date
                name
                updated_at
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

export const getMarketplaceProductPromoItemsList = gql`
    query getMarketplaceProductPromoItemsList(
        $parent_id: Int!,
        $pageSize: Int,
        $currentPage: Int,
        $filter: MarketplaceProductPromoItemsFilterInput,
        $sort: MarketplaceProductPromoItemsSortInput,
    ){
        getMarketplaceProductPromoItemsList(
            parent_id: $parent_id,
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter: $filter,
            sort: $sort,
        ){
            items {
                entity_id
                sku
                channel_code
                discount_type
                discount_value
                max_order
                updated_at
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

export const updateMarketplaceProductPromoToMp = gql`
    mutation updateMarketplaceProductPromoToMp(
        $id: [Int!]
    ){
        updateMarketplaceProductPromoToMp(
            id: $id
        )
    }
`;

export default {
    getMarketplaceProductPromoList,
    getMarketplaceProductPromoItemsList,
    updateMarketplaceProductPromoToMp,
};
