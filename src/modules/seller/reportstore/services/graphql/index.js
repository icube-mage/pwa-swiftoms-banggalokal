import { useLazyQuery } from '@apollo/client';
import * as Schema from '@sellermodules/reportstore/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getSellerSummaryOrder = (variables) => useLazyQuery(Schema.getSellerSummaryOrder, {
    variables, ...context, ...fetchPolicy,
});
export const exportSellerSummaryOrder = (variables) => useLazyQuery(Schema.exportSellerSummaryOrder, {
    variables, ...context, ...fetchPolicy,
});

export default {
    getSellerSummaryOrder,
    exportSellerSummaryOrder,
};
