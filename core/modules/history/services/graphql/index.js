import { useLazyQuery } from '@apollo/client';
import * as Schema from '@modules/history/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getHistoryUpdateStockList = (variables) => useLazyQuery(Schema.getHistoryUpdateStockList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export default {
    getHistoryUpdateStockList,
};
