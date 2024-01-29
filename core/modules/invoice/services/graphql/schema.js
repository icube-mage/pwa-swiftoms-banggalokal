import { gql } from '@apollo/client';

export const getInvoiceList = gql`
    query getInvoiceList($pageSize: Int!, $currentPage: Int!, $filter: InvoiceFilterInput, $sort: InvoiceSortInput) {
        getInvoiceList(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort) {
            items {
                entity_id
                increment_id
                created_at
                channel_order_increment_id
                channel_order_date
                customer_name
                order {
                    increment_id
                    created_at
                }
                state
                state_label
                grand_total
                channel_name
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

export const getInvoiceById = gql`
    query getInvoiceById($id: Int!) {
        getInvoiceById(id: $id) {
            entity_id
            increment_id
            state
            state_label
            store_id
            channel_order_increment_id
            channel_order_date
            channel_code
            channel_name
            channel_image_url
            customer_name
            coupon_code
            discount
            only_free_shipping_coupon_code
            order {
                customer_email
                billing_address {
                    street
                    city
                    region
                    postcode
                    country_id
                }
                shipping_address {
                    street
                    city
                    region
                    postcode
                    country_id
                    telephone
                }
                payment_method
            }
            items {
                sku
                name
                price
                qty
                base_row_total
                discount_amount
                row_total
                subtotal
                entity_id
                parent_item_id
            }
            shipping_amount
            grand_total
            subtotal
            aw_store_credit_amount
        }
    }
`;

export const getInvoiceStateOptions = gql`
    query{
        getInvoiceStateOptions {
            label
            value
        }
    }
`;

export default {
    getInvoiceList,
    getInvoiceById,
    getInvoiceStateOptions,
};
