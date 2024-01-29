import { useQuery } from '@apollo/client';
import * as Schema from '@sellermodules/dashboard/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getSellerActivitySummary = () => useQuery(Schema.getSellerActivitySummary, {
    ...context,
    ...fetchPolicy,
});

export const getSellerStorePerformance = (variables) => useQuery(Schema.getSellerStorePerformance, {
    variables,
    ...context,
    fetchPolicy: 'no-cache',
});

export const getSellerProducts = () => useQuery(Schema.getSellerProducts, {
    ...context,
    ...fetchPolicy,
});

export default {
    getSellerActivitySummary,
    getSellerStorePerformance,
    getSellerProducts,
};
