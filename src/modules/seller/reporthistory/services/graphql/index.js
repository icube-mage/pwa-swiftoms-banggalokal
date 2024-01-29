import { useLazyQuery } from '@apollo/client';
import * as Schema from '@sellermodules/reporthistory/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getSellerExportHistory = (variables) => useLazyQuery(Schema.getSellerExportHistory, {
    variables, ...context, ...fetchPolicy,
});

export default {
    getSellerExportHistory,
};
