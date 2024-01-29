import { gql } from '@apollo/client';

export const getSellerReturnList = gql`
    query getSellerReturnList(
        $filter: RmaFilterInput
        $sort: RmaSortInput
        $pageSize: Int
        $currentPage: Int
        $search: String
    ) {
        getSellerReturnList(
        filter: $filter
        sort: $sort
        pageSize: $pageSize
        currentPage: $currentPage
        search: $search
        ) {
        items {
            channel_order_increment_id
            created_at
            creditmemo
            customer_email
            customer_name
            id
            increment_id
            loc_name
            order_created_at
            return_type
            status_label
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

export const getSellerReturnById = gql`
    query getSellerReturnById($id: Int!) {
        getSellerReturnById(id: $id) {
        base_grand_total
        channel_order_increment_id
        created_at
        creditmemo
        creditmemo_id
        id
        message {
            created_at
            customer_name
            id
            is_visible_on_front
            owner_label
            owner_type
            text
        }
        order_id
        package_received_by_loc
        refund_type
        replacement_order_type
        return_type
        rma_item {
            attachment {
            filename
            filepath
            } 
            id
            name
            package_condition
            price
            price_formatted
            qty
            reason
            return_stock
            sku
            status_code
            vendor_sku
        }
        shipping_address {
            city
            country_name
            firstname
            lastname
            postcode
            region
            street
            telephone
        }
        status_code
        }
    }
`;

export const getSellerStoreOptions = gql`
{
  getSellerStoreOptions {
    label
    value
  }
}
`;

export const getRmaStatusList = gql`
    query getRmaStatusList(
        $pageSize: Int!,
        $currentPage: Int!,
        $sort: RmaStatusSortInput,
    ){
        getRmaStatusList(
            pageSize: $pageSize,
            currentPage: $currentPage,
            sort: $sort,
        ){
            items {
                status_code
                status_label
            }
        }
    }
`;

export const saveSellerReturn = gql`
mutation saveSellerReturn($input: RmaInput!) {
    saveSellerReturn(input: $input)
  }
`;

export default {
    getSellerReturnList,
    getSellerReturnById,
    getSellerStoreOptions,
    getRmaStatusList,
    saveSellerReturn,
};
