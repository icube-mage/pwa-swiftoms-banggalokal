import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@sellermodules/storelist/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getSellerChannelList = (options) => useLazyQuery(Schema.getSellerChannelList, {
    ...options,
    ...context,
    ...fetchPolicy,
});

export const updateConnectedSellerMp = (options) => useMutation(Schema.updateConnectedSellerMp, {
    ...options,
    ...context,
});

export const disconnectSellerMp = (options) => useMutation(Schema.disconnectSellerMp, {
    ...options,
    ...context,
});

export const reconnectSellerMp = (options) => useMutation(Schema.reconnectSellerMp, {
    ...options,
    ...context,
});

export const getSellerMarketplaceIntegrationRequestList = (options) => useLazyQuery(Schema.getSellerMarketplaceIntegrationRequestList, {
    ...options,
    ...context,
    ...fetchPolicy,
});

export const cancelSellerMarketplaceIntegrationRequest = (options) => useMutation(Schema.cancelSellerMarketplaceIntegrationRequest, {
    ...options,
    ...context,
});

export const getSellerChannelListQuery = (options) => useQuery(Schema.getSellerChannelList, {
    ...options,
    ...context,
    ...fetchPolicy,
});

export const getSellerStores = (options) => useLazyQuery(Schema.getSellerStores, {
    ...options,
    ...context,
    ...fetchPolicy,
});

export const getSellerStoresQuery = (options) => useQuery(Schema.getSellerStores, {
    ...options,
    ...context,
    ...fetchPolicy,
});

export const getMarketplaceWarehouse = (options) => useQuery(Schema.getMarketplaceWarehouse, {
    ...options,
    ...context,
    ...fetchPolicy,
});

export const saveSellerChannel = (options) => useMutation(Schema.saveSellerChannel, {
    ...options,
    ...context,
});

export const generateWebstoreUrl = (options) => useMutation(Schema.generateWebstoreUrl, {
    ...options,
    ...context,
});

export default {
    getSellerChannelList,
    updateConnectedSellerMp,
    disconnectSellerMp,
    reconnectSellerMp,
    getSellerMarketplaceIntegrationRequestList,
    cancelSellerMarketplaceIntegrationRequest,
    getSellerChannelListQuery,
    getSellerStores,
    getSellerStoresQuery,
    getMarketplaceWarehouse,
    saveSellerChannel,
    generateWebstoreUrl,
};
