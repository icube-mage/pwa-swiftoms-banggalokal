import { gql } from '@apollo/client';

export const getSummaryShipmentToPick = gql`
    query{
        getSummaryShipmentToPick{
            total_shipments
        }
    }
`;

export const createPickByWave = gql`
    mutation createPickByWave(
        $is_auto: Boolean!
        $shipment_id: [Int]
    ) {
        createPickByWave(is_auto: $is_auto, shipment_id: $shipment_id) {
        pick_by_wave {
            entity_id
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

export default {
    getSummaryShipmentToPick,
    createPickByWave,
    getStoreShipmentList,
};
