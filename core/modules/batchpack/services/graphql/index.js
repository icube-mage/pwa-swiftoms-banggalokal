import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/batchpack/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getStoreShipmentList = (variables) => useLazyQuery(Schema.getStoreShipmentList, {
    variables, ...context, ...fetchPolicy,
});

export const getPackList = (variables) => useQuery(Schema.getPackList, {
    variables, ...context, ...fetchPolicy,
});

export const updatePickByBatchQtyPacked = (options) => useMutation(Schema.updatePickByBatchQtyPacked, {
    ...options, ...context,
});

export const packShipment = (options) => useMutation(Schema.packShipment, {
    ...options, ...context,
});

export const nextStoreShipmentList = (options) => useLazyQuery(Schema.nextStoreShipmentList, {
    ...options, ...context, ...fetchPolicy,
});

export const getShipmentStatusByType = (variables) => useLazyQuery(Schema.getShipmentStatusByType, {
    variables, ...context, ...fetchPolicy,
});

export const getStoreConfig = (variables) => useQuery(Schema.getStoreConfig, {
    variables, ...context, ...fetchPolicy,
});

export const getPickByBatchById = (variables) => useQuery(Schema.getPickByBatchById, {
    variables,
    ...context,
    ...fetchPolicy,
});

export default {
    getStoreShipmentList,
    getPackList,
    updatePickByBatchQtyPacked,
    packShipment,
    nextStoreShipmentList,
    getShipmentStatusByType,
    getStoreConfig,
    getPickByBatchById,
};
