import { useLazyQuery } from '@apollo/client';
import * as Schema from '@modules/orderslireport/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getOrderSliReport = (options) => useLazyQuery(Schema.getOrderSliReport, {
    ...options, ...context, ...fetchPolicy,
});

export default {
    getOrderSliReport,
};
