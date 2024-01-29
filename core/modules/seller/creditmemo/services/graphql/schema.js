import { gql } from '@apollo/client';

export const getSellerCreditMemoById = gql`
    query getSellerCreditMemoById($id: Int!) {
        getSellerCreditMemoById(id: $id) {
        creditmemo {
            adjustment_fee
            adjustment_refund
            discount
            entity_id
            grand_total
            items {
                discount_amount
                entity_id
                name
                order_item {
                    qty_canceled
                    qty_invoiced
                    qty_ordered
                    qty_refunded
                    qty_shipped
                }
                price
                qty_to_refund
                row_total
                sku
                tax_amount
                total_amount
                vendor_sku
            }
            shipping_amount
            subtotal
        }
        order {
            billing_address {
                city
                country_name
                firstname
                lastname
                postcode
                region
                street
                telephone
            }
            channel_order_date
            channel_order_increment_id
            channel_payment_method
            channel_shipping_method
            coupon_code
            entity_id
            only_free_shipping_coupon_code
            shipping_address {
                city
                country_name
                firstname
                lastname
                postcode
                region
                street
                telephone
            }
        }
        }
    }
`;

export default {
    getSellerCreditMemoById,
};
