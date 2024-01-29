import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import * as Schema from '@sellermodules/catalog/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

const fetchPolicyNoCache = {
    fetchPolicy: 'no-cache',
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

export const deleteMultitenantProductByIds = (variables) => useMutation(Schema.deleteMultitenantProductByIds, {
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

export const downloadProductXlsxTemplate = (options) => useLazyQuery(Schema.downloadProductXlsxTemplate, {
    ...options,
    ...context,
    ...fetchPolicy,
});

export const uploadSellerProductXlsx = (variables) => useMutation(Schema.uploadSellerProductXlsx, {
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

export const getSellerChannelList = (variables) => useQuery(Schema.getSellerChannelList, {
    variables,
    ...context,
    ...fetchPolicy,
});
export const getSellerChannelListPushProduct = (variables) => useQuery(Schema.getSellerChannelListPushProduct, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getActivityItemChannel = (variables) => useLazyQuery(Schema.getActivityItemChannel, {
    variables,
    ...context,
    ...fetchPolicyNoCache,
});

export const getSellerProductsCount = (variables) => useQuery(Schema.getSellerProductsCount, {
    variables,
    ...context,
    ...fetchPolicyNoCache,
});

export const getSellerProductsCountFailed = (variables) => useQuery(Schema.getSellerProductsCountFailed, {
    variables,
    ...context,
    ...fetchPolicyNoCache,
});

export const getSellerProductsCountAll = (variables) => useQuery(Schema.getSellerProductsCountAll, {
    variables,
    ...context,
    ...fetchPolicyNoCache,
});

export const getSellerProductsFailed = (variables) => useLazyQuery(Schema.getSellerProductsFailed, {
    variables,
    ...context,
    ...fetchPolicyNoCache,
});

export const exportSellerProduct = (variables) => useLazyQuery(Schema.exportSellerProduct, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const exportSellerProductAll = (variables) => useLazyQuery(Schema.exportSellerProductAll, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getSellerChannelProduct = (variables) => useLazyQuery(Schema.getSellerChannelProduct, {
    variables,
    ...context,
    ...fetchPolicyNoCache,
});

export const getSellerChannelProductData = (variables) => useQuery(Schema.getSellerChannelProductData, {
    variables,
    ...context,
    ...fetchPolicyNoCache,
});

export const saveSellerChannelProduct = (variables) => useMutation(Schema.saveSellerChannelProduct, {
    variables,
    ...context,
});

export const getProductCategoryList = (variables) => useLazyQuery(Schema.getProductCategoryList, {
    variables,
    ...context,
    ...fetchPolicyNoCache,
});

export const deleteSellerChannelProduct = (variables) => useMutation(Schema.deleteSellerChannelProduct, {
    variables,
    ...context,
});

export const getProductCategoryListAttribute = (variables) => useLazyQuery(Schema.getProductCategoryListAttribute, {
    variables,
    ...context,
    ...fetchPolicyNoCache,
});

export const pullSellerProduct = (variables) => useMutation(Schema.pullSellerProduct, {
    variables,
    ...context,
});

export const pushSellerProduct = (variables) => useMutation(Schema.pushSellerProduct, {
    variables,
    ...context,
});

export const retryPushSellerProduct = (variables) => useMutation(Schema.retryPushSellerProduct, {
    variables,
    ...context,
});

export const getMarketplaceProductLimitation = (variables) => useQuery(Schema.getMarketplaceProductLimitation, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getSellerChannelListFetchProduct = (variables) => useQuery(Schema.getSellerChannelListFetchProduct, {
    variables,
    ...context,
    ...fetchPolicy,
});

export default {
    getSellerProducts,
    getCategoryList,
    updateSellerProductStatus,
    deleteMultitenantProductByIds,
    getStoreShippingMethod,
    createSellerProduct,
    getSellerProduct,
    updateSellerProduct,
    downloadProductXlsxTemplate,
    uploadSellerProductXlsx,
    getVoltwigActivity,
    getActivity,
    getStoreConfig,
    getSellerVariantAttributes,
    getSellerProductVariantItems,
    getSellerEtalaseList,
    moveSellerProductEtalase,
    getSellerChannelList,
    getSellerChannelListPushProduct,
    getActivityItemChannel,
    getSellerProductsCount,
    getSellerProductsCountAll,
    exportSellerProduct,
    exportSellerProductAll,
    getSellerChannelProduct,
    getSellerChannelProductData,
    saveSellerChannelProduct,
    getProductCategoryList,
    deleteSellerChannelProduct,
    getProductCategoryListAttribute,
    pullSellerProduct,
    pushSellerProduct,
    getSellerProductsCountFailed,
    getSellerProductsFailed,
    retryPushSellerProduct,
    getMarketplaceProductLimitation,
    getSellerChannelListFetchProduct,
};
