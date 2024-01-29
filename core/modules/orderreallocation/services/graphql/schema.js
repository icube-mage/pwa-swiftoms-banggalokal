import { gql } from '@apollo/client';

export const getOrderReallocationList = gql`
    query getOrderReallocationList(
        $pageSize: Int!,
        $currentPage: Int!,
        $filter: ShipmentFilterInput,
        $sort: ShipmentSortInput
    ){
        getOrderReallocationList(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter: $filter,
            sort: $sort
        ){
            items {
                entity_id
                increment_id
                order_increment_id
                channel_order_increment_id
                created_at
                shipping_name
                billing_name
                shipping_email
                shipping_telephone
                status{
                    label
                }
                loc_name
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

export const getOrderReallocationById = gql`
    query getOrderReallocationById(
        $id: Int!,
    ){
        getOrderReallocationById(
            id: $id
        ){
            entity_id
            increment_id
            status{
                label
            }
            created_at
            order_increment_id
            channel_order_increment_id
            loc_code
            loc_name
            company{
                company_id
                company_code
                company_name
            }
            order_item {
                sku
                name
                qty
            }
            status_history {
                created_at
                status
                comment
            }
        }
    }
`;

export const updateReallocation = gql`
    mutation updateReallocation(
        $id: Int!,
        $company_id: Int,
        $loc_code: String!,
    ){
        updateReallocation(
            id: $id,
            company_id: $company_id,
                loc_code: $loc_code
        )
    }
`;

export const getCompanyReallocation = gql`
    query getCompanyReallocation(
        $id: Int!,
    ){
        getCompanyReallocation(
            id: $id,
        ){
            company_id
            company_code
            company_name
        }
    }
`;

export const getLocationReallocation = gql`
    query getLocationReallocation(
        $id: Int!,
        $company_id: Int!,
    ){
        getLocationReallocation(
            id: $id,
            company_id: $company_id,
        ){
            loc_id
            loc_code
            loc_name
        }
    }
`;

export const getAvailabilityPerSku = gql`
    query getAvailabilityPerSku(
        $id: Int!,
        $sku: String!,
    ){
        getAvailabilityPerSku(
            id: $id,
            sku: $sku,
        ){
            loc_id
            loc_code
            loc_name
        }
    }
`;

export default {
    getOrderReallocationList,
    getOrderReallocationById,
    updateReallocation,
    getCompanyReallocation,
    getLocationReallocation,
    getAvailabilityPerSku,
};
