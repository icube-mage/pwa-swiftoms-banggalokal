import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/ecommercechannel/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getChannelList = (options) => useLazyQuery(Schema.getChannelList, {
    ...options,
    ...context,
    ...fetchPolicy,
});

export const updateConnectedMarketplace = (options) => useMutation(Schema.updateConnectedMarketplace, {
    ...options,
    ...context,
});

export const deleteChannel = (options) => useMutation(Schema.deleteChannel, {
    ...options,
    ...context,
});

export const disconnectMarketplaceChannel = (options) => useMutation(Schema.disconnectMarketplaceChannel, {
    ...options,
    ...context,
});

export const getMarketplaceList = (options) => useLazyQuery(Schema.getMarketplaceList, {
    ...options,
    ...context,
    ...fetchPolicy,
});

export const getWebstoreList = (options) => useLazyQuery(Schema.getWebstoreList, {
    ...options,
    ...context,
    ...fetchPolicy,
});

export const getCountryForMarketplace = (options) => useLazyQuery(Schema.getCountryForMarketplace, {
    ...options,
    ...context,
    ...fetchPolicy,
});

export const getWebstoreCapability = (options) => useQuery(Schema.getWebstoreCapability, {
    ...options,
    ...context,
    ...fetchPolicy,
});

export const getWebstoreCreds = (options) => useQuery(Schema.getWebstoreCreds, {
    ...options,
    ...context,
    ...fetchPolicy,
});

export const createWebstoreChannel = (options) => useMutation(Schema.createWebstoreChannel, {
    ...options,
    ...context,
});

export const getAvailableMpToConnect = (options) => useLazyQuery(Schema.getAvailableMpToConnect, {
    ...options,
    ...context,
    ...fetchPolicy,
});

export const registerMarketplaceBrand = (options) => useMutation(Schema.registerMarketplaceBrand, {
    ...options,
    ...context,
});

export const getMarketplaceCapability = (options) => useQuery(Schema.getMarketplaceCapability, {
    ...options,
    ...context,
    ...fetchPolicy,
});

export const registerMarketplaceChannel = (options) => useMutation(Schema.registerMarketplaceChannel, {
    ...options,
    ...context,
});

export const getJdidOauth = (options) => useLazyQuery(Schema.getJdidOauth, {
    ...options,
    ...context,
    ...fetchPolicy,
});

export const getMarketplaceDefaultShippingMethods = (options) => useLazyQuery(Schema.getMarketplaceDefaultShippingMethods, {
    ...options,
    ...context,
    ...fetchPolicy,
});

export const reconnectMarketplaceChannel = (options) => useMutation(Schema.reconnectMarketplaceChannel, {
    ...options,
    ...context,
});

export const getStoreConfigMp = (options) => useLazyQuery(Schema.getStoreConfigMp, {
    ...options,
    ...context,
    ...fetchPolicy,
});

export const registerMpadapterClient = (options) => useMutation(Schema.registerMpadapterClient, {
    ...options,
    ...context,
});

export const getStoreConfig = (variables) => useQuery(Schema.getStoreConfig, {
    variables,
    ...context,
    ...fetchPolicy,
});

export default {
    getChannelList,
    updateConnectedMarketplace,
    deleteChannel,
    disconnectMarketplaceChannel,
    getMarketplaceList,
    getWebstoreList,
    getCountryForMarketplace,
    getWebstoreCapability,
    getWebstoreCreds,
    createWebstoreChannel,
    getAvailableMpToConnect,
    registerMarketplaceBrand,
    getMarketplaceCapability,
    registerMarketplaceChannel,
    getJdidOauth,
    getMarketplaceDefaultShippingMethods,
    reconnectMarketplaceChannel,
    getStoreConfigMp,
    registerMpadapterClient,
    getStoreConfig,
};
