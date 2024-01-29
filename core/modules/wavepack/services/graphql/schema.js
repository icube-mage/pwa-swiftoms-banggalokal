import { gql } from '@apollo/client';

export const getPickByWaveList = gql`
    query getPickByWaveList($pageSize: Int!, $currentPage: Int!, $filter: PickByWaveFilterInput, $sort: PickByWaveSortInput) {
        getPickByWaveList(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort) {
            items {
                entity_id
                started_at
                picked_by
                status {
                    label
                    value
                }
                increment_id
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

export const getPickByWavePacklist = gql`
    query getPickByWavePacklist($id: Int!) {
        getPickByWavePacklist(id: $id) {
            pick_by_wave {
                increment_id
                entity_id
                status {
                    value
                    label
                }
                started_at
                finished_at
                picked_by
                total_shipments
                total_items
                packlist {
                    shipment_id
                    shipment_inc_id
                    slot_no
                    status {
                        value
                        label
                    }
                }
            }
        }
    }
`;

export const startPickByWavePacking = gql`
    mutation startPickByWavePacking($id: Int!) {
        startPickByWavePacking(id: $id) {
            pick_by_wave {
                entity_id
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
            }
        }
    }
`;

export const donePickByWavePacking = gql`
    mutation donePickByWavePacking($id: Int!, $shipment_id: Int!) {
        donePickByWavePacking(id: $id, shipment_id: $shipment_id) {
            next_shipment_id_to_pack
        }
    }
`;

export const updatePickByWaveQtyPacked = gql`
    mutation updatePickByWaveQtyPacked($wave_id: Int!, $shipment_id: Int!, $barcode: String!) {
        updatePickByWaveQtyPacked(wave_id: $wave_id, shipment_id: $shipment_id, barcode: $barcode) {
            pick_by_wave_item {
                entity_id
                parent_id
                shipment_id
                sku
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

export const getStoreConfig = gql`
    query getStoreConfig($path: String!) {
        getStoreConfig(path: $path)
    }
`;

export const getPickByWaveById = gql`
    query getPickByWaveById($id: Int!) {
        getPickByWaveById(id: $id) {
            pick_by_wave {
                entity_id
                finished_at
                items {
                    barcode
                    entity_id
                    sku
                    is_confirmed
                    bin_code
                    qty_picked
                    qty_to_pick
                }
                picked_by
                started_at
                status {
                    label
                    value
                }
                total_items
                total_shipments
                total_items_left_to_pick
                increment_id
            }
        }
    }
`;

export default {
    getPickByWaveList,
    getPickByWavePacklist,
    getPackList,
    packShipment,
    donePickByWavePacking,
    updatePickByWaveQtyPacked,
    getStoreConfig,
};
