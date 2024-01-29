import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@sellermodules/storesetting/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getSeller = (variables) => useQuery(Schema.getSeller, {
    variables, ...context, ...fetchPolicy,
});

export const getSellerStores = (options) => useQuery(Schema.getSellerStores, {
    ...options, ...context, ...fetchPolicy,
});

export const getSellerStoresLazy = (variables) => useLazyQuery(Schema.getSellerStores, {
    variables, ...context, ...fetchPolicy,
});

export const saveSellerStore = (variables) => useMutation(Schema.saveSellerStore, {
    variables, ...context,
});

export const saveSeller = (variables) => useMutation(Schema.saveSeller, {
    variables, ...context,
});

export const getSellerShippingMethods = (variables) => useQuery(Schema.getSellerShippingMethods, {
    variables, ...context, ...fetchPolicy,
});

export const getStoreConfig = (variables) => useQuery(Schema.getStoreConfig, {
    variables, ...context, ...fetchPolicy,
});

export const updateSellerStoreStatus = (variables) => useMutation(Schema.updateSellerStoreStatus, {
    variables, ...context,
});

export const deleteSellerStore = (variables) => useMutation(Schema.deleteSellerStore, {
    variables, ...context,
});

export const getSellerBanners = (variables) => useQuery(Schema.getSellerBanners, {
    variables, ...context, ...fetchPolicy,
});

export const saveSellerBanner = (variables) => useMutation(Schema.saveSellerBanner, {
    variables, ...context,
});

export const getSellerEtalaseList = (variables) => useLazyQuery(Schema.getSellerEtalaseList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getSellerEtalaseQuery = (variables) => useQuery(Schema.getSellerEtalaseList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const createSellerEtalase = (variables) => useMutation(Schema.createSellerEtalase, {
    variables, ...context,
});

export const deleteSellerEtalase = (variables) => useMutation(Schema.deleteSellerEtalase, {
    variables, ...context,
});

export const updateSellerEtalase = (variables) => useMutation(Schema.updateSellerEtalase, {
    variables, ...context,
});

export default {
    getSeller,
    saveSeller,
    saveSellerStore,
    getSellerShippingMethods,
    getStoreConfig,
    getSellerStores,
    getSellerStoresLazy,
    updateSellerStoreStatus,
    deleteSellerStore,
    saveSellerBanner,
    getSellerBanners,
    getSellerEtalaseList,
    getSellerEtalaseQuery,
    createSellerEtalase,
    deleteSellerEtalase,
    updateSellerEtalase,
};
