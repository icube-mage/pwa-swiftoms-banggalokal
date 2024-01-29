import { gql } from '@apollo/client';

export const getOrderReportCsv = gql`
    query getOrderReportCsv(
        $export: String,
        $date_from: String!,
        $date_to: String!,
        $status: String,
    ){
        getOrderReportCsv(
            input: {
                date_from: $date_from
                date_to: $date_to
                status: $status
            },
            export: $export
        )
    }
`;

export const getOrderReportPdf = gql`
    query getOrderReportPdf(
        $export: String,
        $date_from: String!,
        $date_to: String!,
        $status: String,
    ){
        getOrderReportPdf(
            input: {
                date_from: $date_from
                date_to: $date_to
                status: $status
            },
            export: $export
        ){
            print_date
            data {
                created_at
                channel_order_increment_id
                channel_order_status
                billing_firstname
                billing_lastname
                billing_street
                billing_city
                billing_telephone
                shipping_firstname
                shipping_lastname
                shipping_street
                shipping_city
                shipping_telephone
                items {
                    id
                    sku
                    name
                    qty
                    base_price
                    sell_price
                    discount_amount
                    custom_item_attributes
                }
                payment_method
                shipping_method
                channel_grand_total
                channel_shipping_cost
                coupon_code
                discount
                only_free_shipping_coupon_code
                subtotal
            }
        }
    }
`;

export default {
    getOrderReportCsv,
    getOrderReportPdf,
};
