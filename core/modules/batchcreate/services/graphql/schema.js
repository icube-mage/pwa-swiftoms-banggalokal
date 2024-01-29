import { gql } from '@apollo/client';

export const getSummaryShipmentToPick = gql`
    query getSummaryShipmentToPick{
        getSummaryShipmentToPick{
            total_items
            total_shipments
        }
    }
`;

export const createPickByBatch = gql`
    mutation createPickByBatch(
        $type: String!,
        $number_of_picker: Int,
        $number_of_sku: Int,
    ){
        createPickByBatch(type: $type, number_of_picker: $number_of_picker, number_of_sku: $number_of_sku){
            pick_by_batch {
                created_at
                created_by
                entity_id
                total_items
                total_shipments
            }
        }
    }
`;

export const getStoreShipmentList = gql`
    query getStoreShipmentList(
        $filter: ShipmentFilterInput,
    ) {
        getStoreShipmentList(
            filter: $filter,
        ) {
            items {
                entity_id
                increment_id
                channel_order_increment_id
                channel_shipping_label
                channel {
                    channel_code
                    channel_name
                }
            }
            total_count
        }
    }
`;

export const createPickByBatchManually = gql`
    mutation createPickByBatch(
        $type: String!,
        $shipment_id: [Int],
    ){
        createPickByBatch(type: $type, shipment_id: $shipment_id){
            pick_by_batch{
                entity_id
                picklist{
                    entity_id
                }
            }
        }
    }
`;

export default {
    getSummaryShipmentToPick,
    createPickByBatch,
    getStoreShipmentList,
    createPickByBatchManually,
};
