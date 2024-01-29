import { gql } from '@apollo/client';

export const getSellerOrders = gql`
    query getSellerOrders($search: String, $filter: SellerFilterInput, $sort: SellerSortInput, $pageSize: Int, $currentPage: Int) {
        getSellerOrders(search: $search, filter: $filter, sort: $sort, pageSize: $pageSize, currentPage: $currentPage) {
            items {
                acceptance_deadline
                channel_payment_method
                customer {
                    email
                    name
                }
                entity_id
                expedition {
                    provider
                    service
                }
                grand_total
                item_preview {
                    items {
                        discount_amount
                        image
                        name
                        price
                        qty
                        remark
                        sku
                        item_bundle {
                            image
                            name
                            parent_item_id
                            vendor_sku
                        }
                    }
                    qty_more
                }
                items {
                    discount_amount
                    image
                    name
                    price
                    qty
                    remark
                    sku
                }
                order_date
                order_number
                remark
                shipping_address {
                    city
                    country_name
                    postcode
                    region
                    street
                    telephone
                }
                shipping_amount
                status {
                    code
                    label
                }
                total_item_count
                tracks {
                    carrier_code
                    created_at
                    description
                    status {
                        code
                        label
                    }
                    title
                    track_number
                }
                location {
                    loc_id
                    loc_name
                }
                channel {
                    framework
                    id
                    logo
                    name
                }
                channel_code
            }
            page_info {
                current_page
                page_size
                total_pages
            }
            total_count
        }
    }
`;

export const getSellerOrder = gql`
    query getSellerOrder($id: Int!) {
        getSellerOrder(id: $id) {
            channel_payment_method
            customer {
                email
                name
            }
            coupon_code
            only_free_shipping_coupon_code
            discount
            entity_id
            expedition {
                provider
                service
                pickup_start_time
                pickup_end_time
                shipping_code
            }
            extra_fee_amount
            grand_total
            history {
                comment
                created_at
                entity_id
                status {
                    code
                    label
                }
            }
            item_preview {
                items {
                    discount_amount
                    image
                    name
                    price
                    qty
                    remark
                    sku
                    subtotal
                }
                qty_more
            }
            items {
                discount_amount
                image
                name
                price
                qty
                remark
                sku
                subtotal
                variants {
                    label
                    value
                }
                vendor_sku
                parent_item_id
                entity_id
            }
            order_date
            order_number
            remark
            shipping_address {
                city
                country_name
                postcode
                region
                street
                telephone
            }
            shipping_amount
            status {
                code
                label
            }
            subtotal
            total_item_count
            tracks {
                carrier_code
                created_at
                description
                status {
                    code
                    label
                }
                title
                track_number
            }
            channel_code
            channel {
                framework
                id
                logo
                name
            }
        }
    }
`;

export const printSellerOrderLabel = gql`
    query printSellerOrderLabel($id: [Int!]) {
        printSellerOrderLabel(id: $id) {
            customer {
                email
                name
            }
            expedition {
                provider
                service
            }
            items {
                discount_amount
                image
                name
                price
                qty
                remark
                sku
                subtotal
                vendor_sku
                entity_id
                parent_item_id
            }
            order_number
            shipping_address {
                city
                country_name
                postcode
                region
                street
                telephone
            }
            shipping_amount
            shipping_method_logo_url
            store {
                category
                channel_store_id
                city
                country
                country_name
                hash_key
                id
                name
                partner_id
                post_code
                region
                street
                telephone
            }
            store_logo_url
            track_number
            track_number_barcode_url
            weight
        }
    }
`;

export const printSellerInvoice = gql`
    query printSellerInvoice($id: [Int!]!) {
        printSellerInvoice(id: $id) {
            channel_order_date
            coupon_code
            only_free_shipping_coupon_code
            discount
            customer {
                email
                name
            }
            expedition {
                provider
                service
            }
            grand_total
            items {
                price
                name
                qty
                row_total
                entity_id
                parent_item_id
            }
            order_number
            seller
            shipping_address {
                city
                country_name
                postcode
                region
                street
                telephone
            }
            store_logo_url
            subtotal
            total_items
            total_shipping_cost
            total_weight
            updated_at
        }
    }
`;

export const sellerCanceled = gql`
    mutation sellerCanceled($id: [Int!], $reason: String) {
        sellerCanceled(id: $id, reason: $reason)
    }
`;

export const sellerConfirm = gql`
    mutation sellerConfirm($id: [Int!]) {
        sellerConfirm(id: $id)
    }
`;

export const sellerOrderPacked = gql`
    mutation sellerOrderPacked($id: [Int!]) {
        sellerOrderPacked(id: $id)
    }
`;

export const sellerBookCourier = gql`
    mutation sellerBookCourier($id: [Int!], $pickup_time: String) {
        sellerBookCourier(id: $id, pickup_time: $pickup_time)
    }
`;

export const sellerReadyforShip = gql`
    mutation sellerReadyforShip($id: [Int!]) {
        sellerReadyforShip(id: $id)
    }
`;

export const sellerOrderDelivered = gql`
    mutation sellerOrderDelivered($id: [Int!]) {
        sellerOrderDelivered(id: $id)
    }
`;

export const sellerCancelOrderQueue = gql`
    mutation sellerCancelOrderQueue($id: [Int!], $reason: String) {
        sellerCancelOrderQueue(id: $id, reason: $reason)
    }
`;

export const reallocateSellerOrderQueue = gql`
    mutation reallocateSellerOrderQueue($id: Int!, $stock: [SellerReallocateOrderStockInput]) {
        reallocateSellerOrderQueue(id: $id, stock: $stock)
    }
`;

export const getGenerateAwbMethod = gql`
    query getGenerateAwbMethod($id: Int!) {
        getGenerateAwbMethod(id: $id)
    }
`;

export const sellerOrderInDelivery = gql`
    mutation sellerOrderInDelivery($id: [Int!], $awb_number: String) {
        sellerOrderInDelivery(id: $id, awb_number: $awb_number)
    }
`;

export const downloadSellerOrderReport = gql`
    mutation downloadSellerOrderReport($date_from: String!, $date_to: String!) {
        downloadSellerOrderReport(input: { date_from: $date_from, date_to: $date_to })
    }
`;

export const exportSelerOrder = gql`
    query exportSelerOrder($date_from: String!, $date_to: String!) {
        exportSelerOrder(filter: { channel_order_date: { from: $date_from, to: $date_to } }) {
            message
            success
        }
    }
`;

export const getSellerStoreOptions = gql`
    {
        getSellerStoreOptions {
            label
            value
        }
    }
`;

export const sellerCancelDelivery = gql`
    mutation sellerCancelDelivery($id: [Int!]) {
        sellerCancelDelivery(id: $id)
    }
`;

export const getPickupTimeslots = gql`
    query getPickupTimeslots($shipping_code: String!) {
        getPickupTimeslots(shipping_code: $shipping_code) {
            label
            value
        }
    }
`;

export const getSellerOrderQueueList = gql`
    query getSellerOrderQueueList(
        $search: String
        $filter: SellerOrderQueueFilterInput
        $sort: SellerOrderQueueSortInput
        $pageSize: Int
        $currentPage: Int
    ) {
        getSellerOrderQueueList(search: $search, filter: $filter, sort: $sort, pageSize: $pageSize, currentPage: $currentPage) {
            items {
                acceptance_deadline
                aw_giftcard_amount
                aw_store_credit_amount
                billing_address {
                    city
                    country_id
                    country_name
                    name
                    postcode
                    region
                    street
                    telephone
                }
                cancel_reason
                channel {
                    framework
                    id
                    logo
                    name
                }
                channel_code
                coupon_code
                custom_order_attributes
                customer {
                    email
                    name
                    telephone
                }
                discount
                error_log
                extra_fee_amount
                extra_fees
                grand_total
                id
                inserted_at
                is_import_csv
                items {
                    allocations {
                        location {
                            company {
                                company_code
                                company_id
                                company_margin
                                company_name
                            }
                            company_id
                            export_to_wms
                            is_active
                            is_manage_stock
                            is_shipment_auto_complete
                            is_sirclo_warehouse
                            is_virtual_location
                            is_warehouse
                            loc_city {
                                id
                                label
                            }
                            loc_code
                            loc_country {
                                id
                                label
                            }
                            loc_id
                            loc_name
                            loc_postcode
                            loc_region {
                                id
                                label
                            }
                            loc_street
                            loc_telephone
                            loc_zone
                            principal_code
                            priority
                            qty_buffer
                            quota
                            shipper_id
                            stock
                        }
                        qty
                        source_id
                    }
                    base_price
                    custom_item_attributes
                    discount_amount
                    id
                    image
                    is_indent
                    is_manage_stock
                    is_pickup
                    loc_code
                    name
                    parent_item_id
                    pickup_id
                    pickup_name
                    qty
                    qty_backorder
                    remote_order_item_id
                    replacement_for
                    sell_price
                    sku
                    vendor_sku
                    subtotal
                    failed {
                        reason_code
                        reason {
                            reason_label
                            actions {
                                action_id
                                action_value
                                reason_code
                                store_id
                                store_name
                            }
                        }
                    }
                }
                loc_code
                notes
                only_free_shipping_coupon_code
                order_date
                order_number
                order_status
                payment_confirmation_status
                payment_method
                provider
                sales_order_id
                service
                shipping_address {
                    city
                    country_id
                    country_name
                    name
                    postcode
                    region
                    street
                    telephone
                }
                shipping_cost
                status {
                    code
                    label
                }
                subtotal
                updated_at
                item_preview {
                    items {
                        base_price
                        custom_item_attributes
                        discount_amount
                        id
                        image
                        is_indent
                        is_manage_stock
                        is_pickup
                        item_bundle {
                            image
                            name
                            parent_item_id
                            vendor_sku
                        }
                        loc_code
                        name
                        parent_item_id
                        pickup_id
                        pickup_name
                        qty
                        qty_backorder
                        remark
                        remote_order_item_id
                        replacement_for
                        sell_price
                        sku
                        subtotal
                        vendor_sku
                    }
                    qty_more
                }
            }
            page_info {
                current_page
                page_size
                total_pages
            }
            total_count
        }
    }
`;

export const getSellerChannelList = gql`
    query getSellerChannelList {
        getSellerChannelList {
            items {
                channel_code
                channel_name
                image_url
            }
        }
    }
`;

export const getSellerOrderStatus = gql`
    query getSellerOrderStatus {
        getSellerOrderStatus {
            value
            label
        }
    }
`;

export const getOrderPaymentStatus = gql`
    query getOrderPaymentStatus {
        getOrderPaymentStatus {
            value
            label
        }
    }
`;

export const getSellerStocks = gql`
    query getSellerStocks($filter: SellerStockFilterInput) {
        getSellerStocks(filter: $filter) {
            items {
                sku
                qty_total
                qty_buffer
                qty_reserved
                qty_saleable
                vendor_sku
                location {
                    loc_id
                    loc_name
                }
                product_name
            }
        }
    }
`;

export const getSellerOrderSyncStatusList = gql`
query getSellerOrderSyncStatusList(
    $search: String
    $filter: OrderSyncStatusFilterInput
    $sort: OrderSyncStatusSortInput
    $pageSize: Int
    $currentPage: Int
  ) {
    getSellerOrderSyncStatusList(
      search: $search
      filter: $filter
      sort: $sort
      pageSize: $pageSize
      currentPage: $currentPage
    ) {
      items {
        channel {
          framework
          name
          logo
        }
        channel_code
        entity_id
        order_date
        order_number
        payment_status {
          code
          label
        }
        shipping_provider
        shipping_provider_service
        status {
          code
          label
        }
        sync_status {
          code
          label
        }
        table_source
      }
      page_info {
        current_page
        page_size
        total_pages
      }
      total_count
    }
  }
`;

export const retrySellerOrderSync = gql`
    mutation retrySellerOrderSync($input: [OrderToSync!]) {
        retrySellerOrderSync(input: $input)
    }
`;

export const getCancelReasonsByChannel = gql`
    query getCancelReasonsByChannel($channel_code: String!) {
        getCancelReasonsByChannel(channel_code: $channel_code) {
            input_type
            options {
                label
                value
            }
        }
    }
`;

export const sellerConfirmOrder = gql`
    mutation sellerConfirmOrder($id: [Int!]) {
        sellerConfirmOrder(id: $id)
    }
`;

export default {
    getSellerOrders,
    getSellerOrder,
    printSellerOrderLabel,
    printSellerInvoice,
    sellerCanceled,
    sellerConfirm,
    sellerOrderPacked,
    sellerBookCourier,
    sellerReadyforShip,
    sellerOrderDelivered,
    getGenerateAwbMethod,
    sellerOrderInDelivery,
    downloadSellerOrderReport,
    exportSelerOrder,
    getSellerStoreOptions,
    sellerCancelDelivery,
    getPickupTimeslots,
    getSellerOrderQueueList,
    getSellerChannelList,
    getSellerOrderStatus,
    sellerCancelOrderQueue,
    reallocateSellerOrderQueue,
    getSellerStocks,
    getSellerOrderSyncStatusList,
    retrySellerOrderSync,
    getCancelReasonsByChannel,
    sellerConfirmOrder,
};
