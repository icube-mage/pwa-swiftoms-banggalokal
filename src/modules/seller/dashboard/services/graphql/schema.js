import { gql } from '@apollo/client';

export const getSellerActivitySummary = gql`
query GetSellerActivitySummary {
    getSellerActivitySummary {
        home_delivery
        new_order
        pickup_in_store
        update_stock
    }
}
`;

export const getSellerStorePerformance = gql`
query GetSellerStorePerformance($days: Int!) {
    getSellerStorePerformance(days: $days) {
        shipping_amount
        sold_product
        total_amount
        transaction_amount
    }
}
`;

export const getSellerProducts = gql`
{
    getSellerProducts {
        items {
            name
        }
    }
}
`;

export default {
    getSellerActivitySummary,
    getSellerStorePerformance,
    getSellerProducts,
};
