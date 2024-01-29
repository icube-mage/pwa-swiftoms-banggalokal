import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import * as Schema from '@sellermodules/stock/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

const noCahcefetchPolicy = {
    fetchPolicy: 'no-cache',
};

export const getSellerInventoryStockList = (variables) => useLazyQuery(Schema.getSellerInventoryStockList, {
    variables, ...context, ...noCahcefetchPolicy,
});

export const getSellerStores = (variables) => useLazyQuery(Schema.getSellerStores, {
    variables, ...context, ...fetchPolicy,
});

export const getSellerStoresDefault = (variables) => useQuery(Schema.getSellerStoresDefault, {
    variables, ...context, ...fetchPolicy,
});

export const getSellerInventoryStockDetail = (variables) => useQuery(Schema.getSellerInventoryStockDetail, {
    variables, ...context, ...fetchPolicy,
});

export const syncStockToChannel = (variables) => useMutation(Schema.syncStockToChannel, {
    variables, ...context,
});

export const retrySyncStockToChannel = (variables) => useMutation(Schema.retrySyncStockToChannel, {
    variables, ...context,
});

export const getSellerInventoryStockFailedCount = (variables) => useLazyQuery(Schema.getSellerInventoryStockFailedCount, {
    variables, ...context, ...fetchPolicy,
});

export const uploadStockXlsx = (variables) => useMutation(Schema.uploadStockXlsx, {
    variables,
    ...context,
});

export const downloadStockUpdateTemplateXlsx = (options) => useLazyQuery(Schema.downloadStockUpdateTemplateXlsx, {
    ...options,
    ...context,
    ...noCahcefetchPolicy,
});

export const getActivity = (options) => useLazyQuery(Schema.getActivity, {
    ...options,
    ...context,
    ...fetchPolicy,
});

export const saveChannelStockConfig = (variables) => useMutation(Schema.saveChannelStockConfig, {
    variables,
    ...context,
});

export const getSellerChannelList = (variables) => useQuery(Schema.getSellerChannelList, {
    variables, ...context, ...fetchPolicy,
});

export const syncAllStockToChannel = (variables) => useMutation(Schema.syncAllStockToChannel, {
    variables,
    ...context,
});

export default {
    getSellerInventoryStockList,
    getSellerStores,
    getSellerStoresDefault,
    getSellerInventoryStockDetail,
    retrySyncStockToChannel,
    syncStockToChannel,
    getSellerInventoryStockFailedCount,
    uploadStockXlsx,
    downloadStockUpdateTemplateXlsx,
    getActivity,
    getSellerChannelList,
    saveChannelStockConfig,
    syncAllStockToChannel,
};
