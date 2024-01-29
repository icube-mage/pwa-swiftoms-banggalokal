import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@sellermodules/storeintegration/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getMarketplaceList = (options) => useQuery(Schema.getMarketplaceList, {
    ...options,
    ...context,
    ...fetchPolicy,
});

export const getSellerMpCredentials = (options) => useLazyQuery(Schema.getSellerMpCredentials, {
    ...options,
    ...context,
    ...fetchPolicy,
});

export const getSellerMpCredentialsQuery = (options) => useQuery(Schema.getSellerMpCredentials, {
    ...options,
    ...context,
    ...fetchPolicy,
});

export const getMarketplaceDefaultShippingMethods = (options) => useLazyQuery(Schema.getMarketplaceDefaultShippingMethods, {
    ...options,
    ...context,
    ...fetchPolicy,
});

export const connectSellerMp = (options) => useMutation(Schema.connectSellerMp, {
    ...options,
    ...context,
});

export const requestSellerMarketplaceIntegration = (options) => useMutation(Schema.requestSellerMarketplaceIntegration, {
    ...options,
    ...context,
});

export const getWebstoreList = (options) => useQuery(Schema.getWebstoreList, {
    ...options,
    ...context,
    ...fetchPolicy,
});

export const getWebstoreConfiguration = (options) => useQuery(Schema.getWebstoreConfiguration, {
    ...options,
    ...context,
    ...fetchPolicy,
});

export const createWebstore = (options) => useMutation(Schema.createWebstore, {
    ...options,
    ...context,
});

export const registerBrandMp = (options) => useMutation(Schema.registerBrandMp, {
    ...options,
    ...context,
});

export default {
    getMarketplaceList,
    getSellerMpCredentials,
    getSellerMpCredentialsQuery,
    getMarketplaceDefaultShippingMethods,
    connectSellerMp,
    requestSellerMarketplaceIntegration,
    getWebstoreList,
    getWebstoreConfiguration,
    createWebstore,
    registerBrandMp,
};
