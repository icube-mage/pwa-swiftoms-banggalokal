import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import * as Schema from '@sellermodules/catalog/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getSellerProducts = (variables) => useLazyQuery(Schema.getSellerProducts, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getCategoryList = (variables) => useQuery(Schema.getCategoryList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const updateSellerProductStatus = (variables) => useMutation(Schema.updateSellerProductStatus, {
    variables,
    ...context,
});

export const deleteSellerProductByIds = (variables) => useMutation(Schema.deleteSellerProductByIds, {
    variables,
    ...context,
});

export const getStoreShippingMethod = (variables) => useQuery(Schema.getStoreShippingMethod, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const createSellerProduct = (variables) => useMutation(Schema.createSellerProduct, {
    variables,
    ...context,
});

export const getSellerProduct = (variables) => useQuery(Schema.getSellerProduct, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const updateSellerProduct = (variables) => useMutation(Schema.updateSellerProduct, {
    variables,
    ...context,
});

export const downloadProductCsvTemplate = (options) => useLazyQuery(Schema.downloadProductCsvTemplate, {
    ...options,
    ...context,
    ...fetchPolicy,
});

export const uploadSellerProduct = (variables) => useMutation(Schema.uploadSellerProduct, {
    variables,
    ...context,
});

export const getVoltwigActivity = (options) => useLazyQuery(Schema.getVoltwigActivity, {
    ...options,
    ...context,
    fetchPolicy: 'no-cache',
});

export const getActivity = (options) => useLazyQuery(Schema.getActivity, {
    ...options,
    ...context,
    ...fetchPolicy,
});

export const getStoreConfig = (variables) => useQuery(Schema.getStoreConfig, {
    variables, ...context, ...fetchPolicy,
});

export const getSellerVariantAttributes = (variables) => useQuery(Schema.getSellerVariantAttributes, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getSellerProductVariantItems = (variables) => useQuery(Schema.getSellerProductVariantItems, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getSellerEtalaseList = (variables) => useQuery(Schema.getSellerEtalaseList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const moveSellerProductEtalase = (variables) => useMutation(Schema.moveSellerProductEtalase, {
    variables,
    ...context,
});

export default {
    getSellerProducts,
    getCategoryList,
    updateSellerProductStatus,
    deleteSellerProductByIds,
    getStoreShippingMethod,
    createSellerProduct,
    getSellerProduct,
    updateSellerProduct,
    downloadProductCsvTemplate,
    uploadSellerProduct,
    getVoltwigActivity,
    getActivity,
    getStoreConfig,
    getSellerVariantAttributes,
    getSellerProductVariantItems,
    getSellerEtalaseList,
    moveSellerProductEtalase,
};
