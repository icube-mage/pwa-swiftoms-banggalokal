import { useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/stocksummary/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getStockSummaryList = (variables) => useLazyQuery(Schema.getStockSummaryList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const exportStockSummaryList = (variables) => useMutation(Schema.exportStockSummaryList, {
    variables,
    ...context,
});

export const syncStockSummaryToMP = (variables) => useMutation(Schema.syncStockSummaryToMP, {
    variables,
    ...context,
});

export default {
    getStockSummaryList,
    exportStockSummaryList,
    syncStockSummaryToMP,
};
