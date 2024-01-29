import { gql } from '@apollo/client';

export const getStoreShipmentList = gql`
    query getStoreShipmentList($filter: ShipmentFilterInput, $sort: ShipmentSortInput) {
        getStoreShipmentList(filter: $filter, sort: $sort) {
            items {
                entity_id
                increment_id
                channel_order_date
                status {
                    value
                    label
                }
                allocation_status
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

export const getPackList = gql`
    query getPackList($id: [Int!]!) {
        getPackList(id: $id) {
            data {
                entity_id
                increment_id
                channel_order_increment_id
                status {
                    value
                    label
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
                channel_shipping_label
                items {
                    name
                    sku
                    qty
                    image_url
                    qty_picked
                    qty_packed
                }
                slot_no
                pick_id
                pick_increment_id
            }
        }
    }
`;

export const updatePickByBatchQtyPacked = gql`
    mutation updatePickByBatchQtyPacked($batch_id: Int!, $shipment_id: Int!, $barcode: String!) {
        updatePickByBatchQtyPacked(batch_id: $batch_id, shipment_id: $shipment_id, barcode: $barcode) {
            pick_by_batch_sort {
                entity_id
                parent_id
                shipment_id
                sku
                barcode
                qty_to_pick
                qty_picked
                qty_packed
                name
            }
        }
    }
`;

export const packShipment = gql`
    mutation packShipment($id: [Int!]) {
        packShipment(id: $id)
    }
`;

export const nextStoreShipmentList = gql`
    query getStoreShipmentList($pageSize: Int!, $currentPage: Int!, $filter: ShipmentFilterInput, $sort: ShipmentSortInput) {
        getStoreShipmentList(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort) {
            items {
                entity_id
                increment_id
                channel_order_date
                status {
                    value
                    label
                }
                allocation_status
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

export const getShipmentStatusByType = gql`
    query {
        getShipmentStatusByType(type: "pack_list") {
            value
            label
        }
    }
`;

export const getStoreConfig = gql`
    query getStoreConfig($path: String!) {
        getStoreConfig(path: $path)
    }
`;

export const getPickByBatchById = gql`
    query getPickByBatchById($id: Int!) {
        getPickByBatchById(id: $id) {
            pick_by_batch {
                entity_id
                status {
                    label
                    value
                }
                created_at
                total_shipments
                total_items
                increment_id
                picklist {
                    parent_id
                    entity_id
                    total_items
                    picked_by
                    status {
                        value
                    }
                    items {
                        barcode
                        bin_code
                        entity_id
                        image_url
                        is_confirmed
                        name
                        parent_id
                        qty_picked
                        qty_to_pick
                        sku
                        sort_no
                    }
                    increment_id
                }
            }
        }
    }
`;

export default {
    getStoreShipmentList,
    getPackList,
    updatePickByBatchQtyPacked,
    packShipment,
    nextStoreShipmentList,
    getShipmentStatusByType,
    getStoreConfig,
    getPickByBatchById,
};
