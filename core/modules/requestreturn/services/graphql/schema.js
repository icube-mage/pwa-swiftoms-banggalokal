import { gql } from '@apollo/client';

export const getChannelOptions = gql`
    query{
        getChannelOptions
        {
            label
            value
        }
    }
`;

export const getRequestReturnList = gql`
    query getRequestReturnList(
        $pageSize: Int,
        $currentPage: Int,
        $filter: RequestReturnFilterInput,
    ){
        getRequestReturnList(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter: $filter,
            sort: {
                id: ASC
            }
        ){
            items{
                id
                increment_id
                status_code
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

export const getRequestReturnById = gql`
    query getRequestReturnById(
        $id: Int!
    ){
        getRequestReturnById(
            id: $id
        ){
            id
            increment_id
            status_code
            status_label
            return_type_label
            channel_order_increment_id
            shipping_address{
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
            items{
                id
                image_url
                name
                price
                qty
                package_condition
                package_condition_label
                reason
                reason_label
                status_code
                status_label
                attachment{
                    filepath
                    filename
                }
            }
            message{
                id
                customer_name
                created_at
                text
                owner_type
            }
        }
    }
`;

export const searchShipmentToReturn = gql`
    query searchShipmentToReturn(
        $customer_email: String!,
        $channel_order_increment_id: String!,
        $channel_code: String!,
    ){
        searchShipmentToReturn(
            customer_email: $customer_email,
            channel_order_increment_id: $channel_order_increment_id,
            channel_code: $channel_code,
        ){
            entity_id
        }
    }
`;

export const getShipmentItemToReturn = gql`
    query getShipmentItemToReturn(
        $shipment_id: [Int!],
    ){
        getShipmentItemToReturn(
            shipment_id: $shipment_id,
        ){
            entity_id
            sku
            image_url
            name
            price
            qty
            is_allowed
            is_return_period_expired
            shipment_id
            parent_item_id
        }
    }
`;

export const getStoreConfig = gql`
    query getStoreConfig(
        $path: String!
    ){
        getStoreConfig(
            path: $path
        )
    }
`;

export const saveRequestReturn = gql`
    mutation saveRequestReturn(
        $input: RequestReturnInput!
    ){
        saveRequestReturn(
            input: $input
        ){
            id
            increment_id
            status_code
        }
    }
`;

export const saveRequestReturnSubmit = gql`
    mutation saveRequestReturn(
        $input: RequestReturnInput!
    ){
        saveRequestReturn(
            input: $input
        ){
            id
            increment_id
            status_code
        }
    }
`;

export const sendPackage = gql`
    mutation sendPackage(
        $id: Int!
    ){
        sendPackage(
            id: $id
        ){
            id
            increment_id
            status_code
        }
    }
`;

export default {
    getChannelOptions,
    getRequestReturnList,
    getRequestReturnById,
    searchShipmentToReturn,
    getShipmentItemToReturn,
    getStoreConfig,
    saveRequestReturn,
    saveRequestReturnSubmit,
    sendPackage,
};
