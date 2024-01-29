import { gql } from '@apollo/client';

export const getOrderSliReport = gql`
query getOrderSliReport(
    $period: OrderSliPeriod!
    $date_from: String!
    $date_to: String!
    $channel_codes: [String]
  ) {
    getOrderSliReport(
      period: $period
      date_from: $date_from
      date_to: $date_to
      channel_codes: $channel_codes
    ) {
      avg_entry_time
      avg_order_allocation_time
      avg_order_cancellation_time
      avg_order_creation_time
      avg_shipment_awb_time
      avg_shipment_confirmation_time
      avg_shipment_creation_time
      avg_shipment_delivered_time
      channel_code
      channel_name
      period_interval
      total_order_allocated
      total_order_allocated_percent
      total_order_canceled
      total_order_canceled_percent
      total_order_created
      total_order_created_percent
      total_order_queue
      total_shipment_awb
      total_shipment_awb_percent
      total_shipment_confirmed
      total_shipment_confirmed_percent
      total_shipment_created
      total_shipment_created_percent
      total_shipment_delivered
      total_shipment_delivered_percent
    }
  }
  
`;

export default {
    getOrderSliReport,
};
