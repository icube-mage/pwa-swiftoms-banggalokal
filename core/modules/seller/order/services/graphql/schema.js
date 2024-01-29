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
mutation sellerCanceled($id: Int!) {
    sellerCanceled(id: $id)
   }
`;

export const sellerConfirm = gql`
mutation sellerConfirm($id: [Int!]) {
    sellerConfirm(id: $id)
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
mutation sellerOrderDelivered($id:[Int!]) {
    sellerOrderDelivered(id: $id)
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
    mutation downloadSellerOrderReport (
            $date_from: String!,
            $date_to: String!
    ) {
        downloadSellerOrderReport(
            input: {
                date_from: $date_from,
                date_to: $date_to
            }
        )
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

export default {
    getSellerOrders,
    getSellerOrder,
    printSellerOrderLabel,
    printSellerInvoice,
    sellerCanceled,
    sellerConfirm,
    sellerBookCourier,
    sellerReadyforShip,
    sellerOrderDelivered,
    getGenerateAwbMethod,
    sellerOrderInDelivery,
    downloadSellerOrderReport,
    getSellerStoreOptions,
    sellerCancelDelivery,
    getPickupTimeslots,
};
