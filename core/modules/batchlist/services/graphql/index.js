import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/batchlist/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getPickByBatchStatus = (variables) => useLazyQuery(Schema.getPickByBatchStatus, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getPickByBatchList = (variables) => useLazyQuery(Schema.getPickByBatchList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getPickByBatchById = (variables) => useQuery(Schema.getPickByBatchById, {
    variables,
    ...context,
    ...fetchPolicy,
});
export const getPickByBatchByIdLazy = (variables) => useLazyQuery(Schema.getPickByBatchById, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const startPickByBatchPicklist = (variables) => useMutation(Schema.startPickByBatchPicklist, {
    variables,
    ...context,
});

export const donePickByBatchPicklist = (variables) => useMutation(Schema.donePickByBatchPicklist, {
    variables,
    ...context,
});

export const getPickByBatchPicklist = (variables) => useQuery(Schema.getPickByBatchPicklist, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getPickByBatchItemById = (variables) => useQuery(Schema.getPickByBatchItemById, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const updatePickByBatchItem = (variables) => useMutation(Schema.updatePickByBatchItem, {
    variables,
    ...context,
});

export const startSortingPickByBatch = (variables) => useMutation(Schema.startSortingPickByBatch, {
    variables,
    ...context,
});

export const itemSortingPickByBatch = (variables) => useMutation(Schema.itemSortingPickByBatch, {
    variables,
    ...context,
});

export const doneSortingPickByBatch = (variables) => useMutation(Schema.doneSortingPickByBatch, {
    variables,
    ...context,
});

export const getStoreConfigSorting = (variables) => useQuery(Schema.getStoreConfigSorting, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const multipleItemSortingPickByBatch = (variables) => useMutation(Schema.multipleItemSortingPickByBatch, {
    variables,
    ...context,
});

export const getStoreConfig = (variables) => useQuery(Schema.getStoreConfig, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const cancelPickByBatch = (variables) => useMutation(Schema.cancelPickByBatch, {
    variables,
    ...context,
});

export const getPickByBatchSortList = (variables) => useLazyQuery(Schema.getPickByBatchSortList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export default {
    getPickByBatchStatus,
    getPickByBatchList,
    getPickByBatchById,
    getPickByBatchByIdLazy,
    startPickByBatchPicklist,
    donePickByBatchPicklist,
    getPickByBatchPicklist,
    getPickByBatchItemById,
    updatePickByBatchItem,
    startSortingPickByBatch,
    itemSortingPickByBatch,
    doneSortingPickByBatch,
    getStoreConfigSorting,
    multipleItemSortingPickByBatch,
    getStoreConfig,
    cancelPickByBatch,
    getPickByBatchSortList,
};
