import { gql } from '@apollo/client';

export const getStoreShipmentList = gql`
query getStoreShipment(
    $pageSize: Int!,
    $currentPage: Int!,
    $filter: ShipmentFilterInput,
    $sort: ShipmentSortInput,
){
    getStoreShipmentList(
        pageSize: $pageSize,
        currentPage: $currentPage,
        filter: $filter,
        sort: $sort,
    ){
        items {
            entity_id
            increment_id
            channel_order_increment_id
            allocation_status
            channel_order_date
            location {
                loc_name
            }
            status{
                value
                label
            }
            track_number
            channel{
                channel_code
                channel_name
              }
            shipping_name
            shipping_email
            shipping_telephone
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

export const getShipmentById = gql`
query getStoreShipmentId(
    $id: Int!
){
    getStoreShipmentById(
        id: $id
    ){
        entity_id
        increment_id
        channel_order_date
        channel_order_increment_id
        status {
            label
            value
        }
        allocation_status
        channel{
            channel_code
            channel_name
          }
        customer_name
        shipping_telephone
        shipping_email
        updated_at
        all_track{
            created_at
            title
            track_number
        }
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
        pickup_info {
            name
            email
            phone
        }
        order_item {
            entity_id
            sku
            name
            base_price
            qty_shipped
            row_total
            parent_item_id
        }
        subtotal
        status_history {
            created_at
            status
            comment
        }
        location{
            loc_code
            loc_name
          }
    }
}
`;

export const confirmShipmentPickup = gql`
    mutation confirmShipmentPickup(
        $id: [Int!],
    ){
        confirmShipment(
            id: $id
        )
    }
`;

export const cantFulfillShipmentPickup = gql`
    mutation cantFulfillShipmentPickup(
        $id: [Int!],
    ){
        cantFulfillShipment(
            id: $id
        )
    }
`;

export const pickShipmentPickup = gql`
    mutation pickShipmentPickup(
        $id: [Int!],
    ){
        pickShipment(
            id: $id
        )
    }
`;

export const packShipmentPickup = gql`
    mutation packShipmentPickup(
        $id: [Int!],
    ){
        packShipment(
            id: $id
        )
    }
`;

export const saveShipmentNotes = gql`
    mutation saveShipmentNotesPickup(
        $id: Int!,
        $notes: String!,
    ){
        saveShipmentNotes(
            id: $id
            notes: $notes
        )
    }
`;

export const pickedupShipment = gql`
    mutation pickedupShipmentPickup(
        $id: [Int!],
        $name: String!,
        $reference: String!,
    ){
        pickedupShipment(
            id: $id
            name: $name
            reference: $reference
        )
    }
`;

export const getShipmentStatusByType = gql`
    query{
        getShipmentStatusByType(type: "store_pickup"){
            label
            value
        }
    }
`;

export const getStoreConfig = gql`
  query getStoreConfig($path: String!){
    getStoreConfig(path: $path)
  }
`;

export const canceledShipment = gql`
    mutation canceledShipment(
        $id: Int!,
        $cancel_reason_id: String,
    ){
        canceledShipment(
            id: $id
            cancel_reason_id: $cancel_reason_id,
        )
    }
`;

export default {
    getStoreShipmentList,
    getShipmentById,
    confirmShipmentPickup,
    cantFulfillShipmentPickup,
    pickShipmentPickup,
    packShipmentPickup,
    pickedupShipment,
    saveShipmentNotes,
    getShipmentStatusByType,
    canceledShipment,
};
