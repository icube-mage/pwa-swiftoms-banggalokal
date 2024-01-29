import { useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/batchcreate/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getSummaryShipmentToPick = (variables) => useLazyQuery(Schema.getSummaryShipmentToPick, { variables, ...context, ...fetchPolicy });
export const createPickByBatch = (variables) => useMutation(Schema.createPickByBatch, { variables, ...context });

export const getStoreShipmentList = (variables) => useLazyQuery(Schema.getStoreShipmentList, {
    variables, ...context, ...fetchPolicy,
});

export const createPickByBatchManually = (variables) => useMutation(Schema.createPickByBatchManually, {
    variables, ...context,
});

export default {
    getSummaryShipmentToPick,
    createPickByBatch,
    getStoreShipmentList,
    createPickByBatchManually,
};
