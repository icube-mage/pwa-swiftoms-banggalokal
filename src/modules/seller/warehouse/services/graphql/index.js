import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@sellermodules/warehouse/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getSellerStores = (options) => useLazyQuery(Schema.getSellerStores, {
    ...options,
    ...context,
    ...fetchPolicy,
});

export const deleteSellerStore = (options) => useMutation(Schema.deleteSellerStore, {
    ...options,
    ...context,
});

export const updateSellerStoreStatus = (options) => useMutation(Schema.updateSellerStoreStatus, {
    ...options,
    ...context,
});

export const saveSellerDefaultStore = (options) => useMutation(Schema.saveSellerDefaultStore, {
    ...options,
    ...context,
});

export const saveSellerStore = (options) => useMutation(Schema.saveSellerStore, {
    ...options,
    ...context,
});

export const getSellerShippingMethods = (options) => useQuery(Schema.getSellerShippingMethods, {
    ...options,
    ...context,
    ...fetchPolicy,
});

export default {
    getSellerStores,
    deleteSellerStore,
    updateSellerStoreStatus,
    saveSellerDefaultStore,
    saveSellerStore,
    getSellerShippingMethods,
};
