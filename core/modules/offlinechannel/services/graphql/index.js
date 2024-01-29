import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/offlinechannel/services/graphql/schema';

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

export const deleteChannel = (options) => useMutation(Schema.deleteChannel, {
    ...options,
    ...context,
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

export const createWebstoreChannel = (options) => useMutation(Schema.createWebstoreChannel, {
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
    deleteChannel,
    getCountryForMarketplace,
    getWebstoreCapability,
    createWebstoreChannel,
    getStoreConfig,
};
