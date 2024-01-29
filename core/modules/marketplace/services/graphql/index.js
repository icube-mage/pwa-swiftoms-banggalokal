import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import * as Schema from '@modules/marketplace/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getMarketplaceList = (variables) => useLazyQuery(Schema.getMarketplaceList, {
    variables, ...context, ...fetchPolicy,
});

export const getMarketplace = (variables) => useQuery(Schema.getMarketplace, {
    variables, ...context, ...fetchPolicy,
});

export const registerMpadapterClient = (variables) => useMutation(Schema.registerMpadapterClient, {
    variables, ...context,
});

export const updateMarketplace = (variables) => useMutation(Schema.updateMarketplace, {
    variables, ...context,
});

export const syncMarketplace = (variables) => useMutation(Schema.syncMarketplace, {
    variables, ...context,
});

export const getMarketplaceFeatureList = () => useQuery(Schema.getMarketplaceFeatureList, {
    ...context, ...fetchPolicy,
});

export const getMarketplaceCapabilities = () => useQuery(Schema.getMarketplaceCapabilities, {
    ...context, ...fetchPolicy,
});

export const getStoreConfigLazy = (options) => useLazyQuery(Schema.getStoreConfig, {
    ...options, ...context, ...fetchPolicy,
});

export default {
    getMarketplaceList,
    getMarketplace,
    registerMpadapterClient,
    updateMarketplace,
    syncMarketplace,
    getMarketplaceFeatureList,
    getMarketplaceCapabilities,
    getStoreConfigLazy,
};
