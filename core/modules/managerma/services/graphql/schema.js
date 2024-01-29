import { gql } from '@apollo/client';

export const getRmaList = gql`
    query getRmaList(
        $pageSize: Int!,
        $currentPage: Int!,
        $filter: RmaFilterInput,
        $sort: RmaSortInput,
    ){
        getRmaList(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter: $filter,
            sort: $sort,
        ){
            items {
                id
                increment_id
                channel_order_increment_id
                status_label
                status_code
                loc_name
                customer_name
                created_at
                channel_order_increment_id
                created_at
                customer_email
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

export const getRmaById = gql`
    query getRmaById(
        $id: Int!,
    ){
        getRmaById(
            id: $id
        ){
            id
            increment_id
            status_code
            status_label
            customer_name
            created_at
            customer_email
            updated_at
            shipping_address {
                firstname
                lastname
                street
                city
                region
                postcode
                country_id
                country_name
                telephone
            }
            channel_order_increment_id
            return_type
            refund_type
            replacement_order_type
            package_received_by_loc
            package_received_by_loc_name
            creditmemo
            rma_item {
                id
                name
                sku
                price
                qty
                package_condition
                reason
                status_code
                status_label
                return_stock
                attachment {
                    filename
                    filepath
                }
            }
            message {
                id
                customer_name
                created_at
                text
                owner_type
            }
        }
    }
`;

export const refundRma = gql`
    mutation refundRma(
        $id: Int!,
    ){
        refundRma(
            id: $id,
        )
    }
`;

export const getRmaItemStatusOptions = gql`
    query{
        getRmaItemStatusOptions{
            value
            label
        }
    }
`;

export const getStoreConfig = gql`
    query getStoreConfig(
        $path: String!,
    ){
        getStoreConfig(
            path: $path,
        )
    }
`;

export const saveRma = gql`
    mutation saveRma(
        $input: RmaInput!,
    ){
        saveRma(
            input: $input,
        )
    }
`;

export default {
    getRmaList,
    getRmaById,
    refundRma,
    getRmaItemStatusOptions,
    getStoreConfig,
    saveRma,
};
