import { useLazyQuery } from '@apollo/client';
import * as Schema from '@modules/inventoryaudittrail/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getInventoryAuditTrailList = (variables) => useLazyQuery(Schema.getInventoryAuditTrailList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getInventoryAuditTrailEventOptions = (variables) => useLazyQuery(Schema.getInventoryAuditTrailEventOptions, {
    variables,
    ...context,
    ...fetchPolicy,
});

export default {
    getInventoryAuditTrailList,
    getInventoryAuditTrailEventOptions,
};
