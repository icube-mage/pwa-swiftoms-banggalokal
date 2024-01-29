import { gql } from '@apollo/client';

export const getShipmentList = gql`
    query getShipmentList($pageSize: Int!, $currentPage: Int!, $filter: ShipmentFilterInput, $sort: ShipmentSortInput) {
        getStoreShipmentList(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort) {
            items {
                entity_id
                increment_id
                channel_order_increment_id
                marketplace_order_number
                allocation_status
                channel_order_date
                status {
                    value
                    label
                }
                track_number
                channel {
                    channel_name
                }
                location {
                    loc_name
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
    query getStoreShipmentById($id: Int!) {
        getStoreShipmentById(id: $id) {
            entity_id
            increment_id
            is_pickup
            channel_order_increment_id
            channel_shipping_label
            channel {
                channel_name
            }
            marketplace_order_number
            status {
                label
                value
            }
            allocation_status
            channel_order_date
            location {
                loc_name
            }
            awb_source
            customer_name
            shipping_telephone
            shipping_email
            email
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
            channel_shipping_label
            subtotal
            status_history {
                created_at
                status
                comment
            }
        }
    }
`;

export const confirmShipment = gql`
    mutation confirmShipmentAll($id: [Int!]) {
        confirmShipment(id: $id)
    }
`;

export const cantFulfillShipment = gql`
    mutation cantFulfillShipmentAll($id: [Int!]) {
        cantFulfillShipment(id: $id)
    }
`;

export const saveShipmentNotes = gql`
    mutation saveShipmentNotes($id: Int!, $notes: String!) {
        saveShipmentNotes(id: $id, notes: $notes)
    }
`;

export const getShipmentStatus = gql`
    query {
        getShipmentStatus {
            label
            value
        }
    }
`;

export const getShipmentAvailableCompany = gql`
    query getShipmentAvailableCompany($shipment_id: Int!) {
        getShipmentAvailableCompany(shipment_id: $shipment_id) {
            value
            label
        }
    }
`;

export const getShipmentAvailableLocation = gql`
    query getShipmentAvailableLocation($shipment_id: Int!, $company_id: Int) {
        getShipmentAvailableLocation(shipment_id: $shipment_id, company_id: $company_id) {
            value
            label
        }
    }
`;

export const getShipmentAvailableLocationSku = gql`
    query getShipmentAvailableLocationSku($shipment_id: Int!, $company_id: Int, $sku: String) {
        getShipmentAvailableLocation(shipment_id: $shipment_id, company_id: $company_id, sku: $sku) {
            value
            label
        }
    }
`;

export const shipmentRellocation = gql`
    mutation shipmentRellocation($shipment_id: Int!, $loc_code: String!) {
        shipmentRellocation(shipment_id: $shipment_id, loc_code: $loc_code)
    }
`;

export default {
    getShipmentList,
    getShipmentById,
    confirmShipment,
    getShipmentStatus,
    saveShipmentNotes,
    cantFulfillShipment,
    getShipmentAvailableCompany,
    getShipmentAvailableLocationSku,
    shipmentRellocation,
};
