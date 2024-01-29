import { gql } from '@apollo/client';

const queryItemDetail = `
    entity_id
    parent_id
    slot_no
    shipment_id
    sku
    bin_code
    qty_to_pick
    qty_picked
    is_confirmed
    name
`;

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

export const getPickByWaveById = gql`
    query getPickByWaveById($id: Int!) {
        getPickByWaveById(id: $id) {
            pick_by_wave {
                entity_id
                finished_at
                items {
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

export const getPickByWaveItemById = gql`
    query getPickByWaveItemById($item_id: Int!) {
        getPickByWaveItemById(item_id: $item_id) {
            pick_by_wave_item {
                entity_id
                parent_id
                slot_no
                image_url
                shipment_id
                sku
                bin_code
                qty_to_pick
                qty_picked
                is_confirmed
                name
                barcode
            }
        }
    }
`;

export const updatePickByWaveItem = gql`
    mutation updatePickByWaveItem(
        $item_id: Int!,
        $qty_picked: Int!,
    ){
        updatePickByWaveItem(
            item_id: $item_id,
            qty_picked: $qty_picked
        ){
            pick_by_wave_item {
                ${queryItemDetail}
            }
        }
    }
`;

export const donePickByWave = gql`
    mutation donePickByWave($id: Int!) {
        donePickByWave(id: $id) {
            pick_by_wave {
                entity_id
            }
        }
    }
`;

export const getPickByWaveStatus = gql`
    query {
        getPickByWaveStatus {
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

export default {
    getPickByWaveList,
    getPickByWaveById,
    getPickByWaveItemById,
    donePickByWave,
    updatePickByWaveItem,
    getPickByWaveStatus,
    getStoreConfig,
};
