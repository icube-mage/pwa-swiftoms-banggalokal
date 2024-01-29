import { gql } from '@apollo/client';

export const getOrderQueueList = gql`
    query getOrderQueueList($pageSize: Int!, $currentPage: Int!, $filter: OrderFilterInput, $sort: OrderSortInput) {
        getOrderQueueList(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort) {
            items {
                id
                channel_order_increment_id
                channel_order_id
                created_at
                channel_order_status
                last_updated
                acceptance_deadline
                channel_code
                status
                oms_order_status
                payment_confirmation_status
                error_log
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

export const getOrderQueueById = gql`
    query getOrderQueueById($id: Int!) {
        getOrderQueueById(id: $id) {
            id
            is_allow_to_reallocate_order
            is_allow_to_recreate_order
            last_updated
            status
            acceptance_deadline
            channel_order_increment_id
            channel_code
            email
            customer_group
            custom_order_attributes
            oms_order_id
            billing_address {
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
            channel_payment_method
            channel_shipping_cost
            channel_shipping_method
            channel_name
            channel_image_url
            channel_order_status
            created_at
            error_log
            coupon_code
            discount
            only_free_shipping_coupon_code
            order_item {
                id
                sku
                base_price
                sell_price
                qty
                discount_amount
                loc_code
                pickup_name
                replacement_for
                name
                parent_item_id
            }
            notes
            oms_order_status
            channel_grand_total
            subtotal
            aw_store_credit_amount
        }
    }
`;

export const setReallocation = gql`
    mutation setReallocation($id: [Int]) {
        setReallocation(id: $id)
    }
`;

export const exportOrderToCsv = gql`
    query exportOrderToCsv($id: [Int], $filter: OrderFilterInput, $sort: OrderSortInput) {
        exportOrderToCsv(id: $id, filter: $filter, sort: $sort)
    }
`;

export const bulkOrderReallocation = gql`
    mutation bulkOrderReallocation($binary: String!) {
        bulkOrderReallocation(input: { binary: $binary })
    }
`;

export const downloadSampleCsv = gql`
    mutation downloadSampleCsv($type: String!) {
        downloadSampleCsv(type: $type)
    }
`;

export const orderImport = gql`
    mutation orderImport($binary: String!) {
        orderImport(input: { binary: $binary }) {
            attachment_url
            is_success
        }
    }
`;

export const acceptMarketplaceOrderQueue = gql`
    mutation acceptMarketplaceOrderQueue($binary: String!) {
        acceptMarketplaceOrderQueue(input: { binary: $binary })
    }
`;

export const getActivity = gql`
    query getActivity($code: String!) {
        getActivity(code: $code, by_session: true) {
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

export const marketplaceFetchOrder = gql`
    mutation marketplaceFetchOrder($input: MarketplaceFetchOrderInput!) {
        marketplaceFetchOrder(input: $input)
    }
`;

export const editOrderItem = gql`
    mutation editOrderItem($order_id: Int!, $order_items: [EditOrderItemInput!]!) {
        editOrderItem(order_id: $order_id, order_items: $order_items)
    }
`;

export const cancelOrder = gql`
    mutation cancelOrder($id: Int!) {
        cancelOrder(id: $id) {
            status
        }
    }
`;
export const getLocationOptions = gql`
    query {
        getLocationOptions {
            label
            value
        }
    }
`;

export const getUniqueProductFromSource = gql`
    query getUniqueProductFromSource($pageSize: Int!, $currentPage: Int!, $filter: SourceFilterInput, $sort: SourceSortInput, $search: String) {
        getUniqueProductFromSource(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort, search: $search) {
            items {
                source_id
                loc_id
                loc_name
                sku
                bundle_children {
                    sku
                    qty
                }
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

export const getLocationBySourceAndChannel = gql`
    query getLocationBySourceAndChannel($sku: String!, $channel_code: String!) {
        getLocationBySourceAndChannel(sku: $sku, channel_code: $channel_code) {
            loc_code
            loc_id
            loc_name
        }
    }
`;

export const getHistoryOrderItemList = gql`
    query getHistoryOrderItemList($oms_order_id: Int!) {
        getHistoryOrderItemList(oms_order_id: $oms_order_id) {
            comment
            created_at
            created_by_name
            id
            oms_order_id
        }
    }
`;

export const getPaymentByOrderId = gql`
    query getPaymentByOrderId($order_id: Int!, $queue: Boolean){
        getPaymentByOrderId(order_id: $order_id, queue: $queue) {
            bank_name
            destination_account
            ref_number
            amount_paid
            attachment
            created_at
            approved_by
        }
    }
`;

export const paymentApproval = gql`
    mutation paymentApproval($order_id: Int!, $queue: Boolean) {
        paymentApproval(order_id: $order_id, queue: $queue)
    }
`;

export const getShipmentList = gql`
    query getShipmentList($filter: ShipmentFilterInput) {
        getShipmentList(filter: $filter) {
            items {
                entity_id
                increment_id
                status {
                    value
                    label
                }
                track_number
                channel {
                    channel_name
                }
                loc_code
                all_track {
                    entity_id
                    track_number
                }
            }
        }
    }
`;

export const getSalesOrderList = gql`
    query getSalesOrderList($pageSize: Int!, $currentPage: Int!, $filter: SalesOrderFilterInput, $sort: SalesOrderSortInput) {
        getSalesOrderList(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort) {
            items {
                entity_id
                channel_order_increment_id
                created_at
                channel_order_date
                channel_order_id
                channel_order_status
                updated_at
                acceptance_deadline
                channel_code
                status
                payment_confirmation_status
                error_log
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

export const getSalesOrderById = gql`
    query getSalesOrderById($id: Int!) {
        getSalesOrderById(id: $id) {
            entity_id
            updated_at
            status
            acceptance_deadline
            channel_order_increment_id
            channel_code
            customer_email
            customer_group
            billing_address {
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
            channel_payment_method
            shipping_amount
            channel_shipping_method
            channel_name
            channel_image_url
            channel_order_status
            created_at
            error_log
            order_item {
                id
                sku
                base_price
                sell_price
                qty
                discount_amount
                loc_code
                pickup_name
                replacement_for
                custom_item_attributes
                name
                shipment_item_id
                parent_item_id
            }
            notes
            grand_total
            subtotal
            aw_store_credit_amount
        }
    }
`;

export const editSalesOrderItem = gql`
mutation editSalesOrderItem($input: EditSalesOrderItemInput!) {
    editSalesOrderItem(input: $input) {
      message
      success
    }
  }
`;

export const setOrderAsNew = gql`
    mutation setOrderAsNew($id: [Int]) {
        setOrderAsNew(id: $id)
    }
`;

export default {
    getOrderQueueList,
    getOrderQueueById,
    setReallocation,
    exportOrderToCsv,
    bulkOrderReallocation,
    downloadSampleCsv,
    orderImport,
    acceptMarketplaceOrderQueue,
    getActivity,
    marketplaceFetchOrder,
    editOrderItem,
    cancelOrder,
    getLocationOptions,
    getUniqueProductFromSource,
    getLocationBySourceAndChannel,
    getHistoryOrderItemList,
    getPaymentByOrderId,
    paymentApproval,
    getShipmentList,
    getSalesOrderList,
    getSalesOrderById,
    editSalesOrderItem,
    setOrderAsNew,
};
