import { gql } from '@apollo/client';

export const getStoreShipmentList = gql`
    query getStoreShipmentList($pageSize: Int!, $currentPage: Int!, $filter: ShipmentFilterInput, $sort: ShipmentSortInput) {
        getStoreShipmentList(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort) {
            items {
                entity_id
                increment_id
                channel_order_increment_id
                channel_shipping_label
                allocation_status
                channel_order_date
                location {
                    loc_name
                }
                status {
                    value
                    label
                }
                track_number
                channel {
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

export const getStoreShipmentById = gql`
    query getStoreShipmentById($id: Int!) {
        getStoreShipmentById(id: $id) {
            entity_id
            increment_id
            channel_order_increment_id
            status {
                label
                value
            }
            is_book_courier_allowed
            allocation_status
            channel_order_date
            location {
                loc_name
            }
            customer_name
            shipping_telephone
            shipping_email
            updated_at
            all_track {
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
                telephone
                country_name
            }
            pickup_info {
                name
                loc_details
                vehicle_number
                vehicle_desc
                notes
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
            channel_shipping_label
            courier_title
            shipping_method_logo_url 
            channel_shipping_method
            pickup_start_time
            pickup_end_time
        }
    }
`;

export const confirmShipment = gql`
    mutation confirmShipment($id: [Int!]) {
        confirmShipment(id: $id)
    }
`;

export const cantFulfillShipment = gql`
    mutation cantFulfillShipment($id: [Int!]) {
        cantFulfillShipment(id: $id)
    }
`;

export const pickShipment = gql`
    mutation pickShipment($id: [Int!]) {
        pickShipment(id: $id)
    }
`;

export const cancelDelivery = gql`
    mutation cancelDelivery($id: Int!, $cancel_reason_id: String!) {
        cancelDelivery(id: $id, cancel_reason_id: $cancel_reason_id)
    }
`;

export const packShipment = gql`
    mutation packShipment($id: [Int!]) {
        packShipment(id: $id)
    }
`;

export const bookCourier = gql`
    mutation bookCourier($id: [Int!], $pickup_time: String) {
        bookCourier(id: $id, pickup_time: $pickup_time)
    }
`;

export const shipDelivery = gql`
    mutation shipDelivery($id: Int!, $carrier: String!, $name: String!, $reference: String!) {
        shipDelivery(id: $id, carrier: $carrier, name: $name, reference: $reference)
    }
`;

export const deliveredShipment = gql`
    mutation deliveredShipment($id: [Int!]) {
        deliveredShipment(id: $id)
    }
`;

export const exportStoreShipmentToCsv = gql`
    query exportStoreShipmentToCsv($type: String!, $with_items: Boolean, $filter: ShipmentFilterInput, $sort: ShipmentSortInput) {
        exportStoreShipmentToCsv(type: $type, with_items: $with_items, filter: $filter, sort: $sort)
    }
`;

export const saveShipmentNotes = gql`
    mutation saveShipmentNotes($id: Int!, $notes: String!) {
        saveShipmentNotes(id: $id, notes: $notes)
    }
`;

export const getCourierOption = gql`
    query {
        getCourierOption {
            label
            value
        }
    }
`;

export const getShipmentCancelReason = gql`
    query {
        getShipmentCancelReason {
            label
            value
        }
    }
`;

export const bulkShipment = gql`
    mutation bulkShipment($binary: String!) {
        bulkShipment(input: { binary: $binary }) {
            is_success
            attachment_url
        }
    }
`;

export const getActivity = gql`
    query {
        getActivity(code: "import_bulkshipment", by_session: true) {
            activity_id
            activity_code
            run_status
            data_total
            data_processed
            started_at
            snapshot_at
            finished_at
            run_by
            run_type
            attachment
            error_message
        }
    }
`;

export const getShipmentStatusByType = gql`
    query {
        getShipmentStatusByType(type: "home_delivery") {
            label
            value
        }
    }
`;

export const getStoreConfig = gql`
    query getStoreConfig($path: String!) {
        getStoreConfig(path: $path)
    }
`;

export const getTracking = gql`
    query getTracking($id: Int!, $airwaybill: String!) {
        getTracking(id: $id, airwaybill: $airwaybill ) {
            created_at
            description
        }
    }
`;

export const cancelCourier = gql`
mutation cancelCourier($id: Int!) {
    cancelCourier(id: $id)
  }
`;

export const getShipperPickupTimeslot = gql`
    query getShipperPickupTimeslot {
        getShipperPickupTimeslot {
        pickup_time
        }
    }
`;

export default {
    getStoreShipmentList,
    getStoreShipmentById,
    confirmShipment,
    cantFulfillShipment,
    pickShipment,
    cancelDelivery,
    packShipment,
    bookCourier,
    shipDelivery,
    deliveredShipment,
    exportStoreShipmentToCsv,
    saveShipmentNotes,
    getCourierOption,
    getShipmentCancelReason,
    bulkShipment,
    getActivity,
    getShipmentStatusByType,
    getStoreConfig,
    getTracking,
    cancelCourier,
    getShipperPickupTimeslot,
};
