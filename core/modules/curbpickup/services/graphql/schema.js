import { gql } from '@apollo/client';

export const getStoreShipmentById = gql`
    query getStoreShipmentById(
        $id: Int!
    ){
        getStoreShipmentById(
            id: $id
        ){
            entity_id
            increment_id
            channel_order_increment_id
            allocation_status
            status{
                label
                value
            }
            all_track {
                created_at
                description
                entity_id
                title
                track_number
            }
            customer_name
            shipping_telephone
            shipping_address {
                firstname
                lastname
                street
                city
                region
                postcode
                telephone
                country_id
            }
            pickup_info{
                created_at
                name
                phone
                loc_details
                vehicle_number
                vehicle_desc
                notes
            }
            loc_code
            items {
                entity_id
                sku
                name
                price
                qty
                row_total
                parent_item_id
            }
            subtotal
        }
    }
`;

export const getStoreShipmentList = gql`
    query getStoreShipmentList(
        $filter: ShipmentFilterInput,
    ){
        getStoreShipmentList(
            filter: $filter,
            sort: {
                priority_status: ASC
            }
        ){
            items {
                entity_id
                increment_id
                status {
                  label
                  value
                }
                location{
                    loc_name
                }
                priority_status
                shipping_telephone
                shipping_name
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

export const confirmShipment = gql`
    mutation confirmShipment(
        $id: [Int!],
    ){
        confirmShipment(
            id: $id
        )
    }
`;

export const cantFulfillShipment = gql`
    mutation cantFulfillShipment(
        $id: [Int!],
    ){
        cantFulfillShipment(
            id: $id
        )
    }
`;

export const pickShipment = gql`
    mutation pickShipment(
        $id: [Int!],
    ){
        pickShipment(
            id: $id
        )
    }
`;

export const packShipment = gql`
    mutation packShipment(
        $id: [Int!],
    ){
        packShipment(
            id: $id
        )
    }
`;

export const pickedupShipment = gql`
    mutation pickedupShipment(
        $id: [Int!],
    ){
        pickedupShipment(
            id: $id
        )
    }
`;

export const getPickList = gql`
    query getPickList(
        $id: [Int!]!,
    ){
        getPickList(
            id: $id
        ){
            print_date
            data {
                sku
                name
                qty
            }
        }
    }
`;

export const getPackList = gql`
    query getPackList(
        $id: [Int!]!,
    ){
        getPackList(
            id: $id
        ){
            title
            data{
                created_at
                increment_id
                channel_order_increment_id
                shipping_address{
                    firstname
                    lastname
                    street
                    city
                    region
                    postcode
                    country_name
                    telephone
                }
                pickup_info {
                    created_at
                    name
                    phone
                    loc_details
                    vehicle_number
                    vehicle_desc
                    notes
                }
                channel_shipping_label
                items{
                    sku
                    name
                    qty
                }
            }
            created_by
            checked_by
            approved_by
            received_by
        }
    }
`;

export const getShipmentStatusByType = gql`
    query{
        getShipmentStatusByType(type: "curbside_pickup"){
            label
            value
        }
    }
`;

export default {
    getStoreShipmentById,
    getStoreShipmentList,
    confirmShipment,
    cantFulfillShipment,
    pickShipment,
    packShipment,
    pickedupShipment,
    getPickList,
    getPackList,
    getShipmentStatusByType,
};
