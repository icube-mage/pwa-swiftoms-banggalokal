import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/productlist/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getProductList = (variables) => useLazyQuery(Schema.getProductList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getProductById = (variables) => useQuery(Schema.getProductById, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const updateProduct = (variables) => useMutation(Schema.updateProduct, {
    variables,
    ...context,
});

export const uploadProduct = (variables) => useMutation(Schema.uploadProduct, {
    variables,
    ...context,
});

export const downloadSampleCsv = (variables) => useMutation(Schema.downloadSampleCsv, {
    variables,
    ...context,
});

export const getProductListBySku = (variables) => useLazyQuery(Schema.getProductListBySku, {
    variables,
    ...context,
    fetchPolicy: 'no-cache',
});

export const getProductAttributes = (variables) => useLazyQuery(Schema.getProductAttributes, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const productFetchManual = (variables) => useMutation(Schema.productFetchManual, {
    variables,
    ...context,
});

export const getProductAttributeSetOptions = (variables) => useQuery(Schema.getProductAttributeSetOptions, {
    variables,
    ...context,
});

export const getNewProductAttributes = (variables) => useLazyQuery(Schema.getNewProductAttributes, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const createProduct = (variables) => useMutation(Schema.createProduct, {
    variables,
    ...context,
});

export const deleteProducts = (variables) => useMutation(Schema.deleteProducts, {
    variables,
    ...context,
});

export const syncToMarketplace = (variables) => useMutation(Schema.syncToMarketplace, {
    variables,
    ...context,
});

export const getExportProductDefaultAttributes = (variables) => useQuery(Schema.getExportProductDefaultAttributes, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getExportProductAttributeOptions = (variables) => useQuery(Schema.getExportProductAttributeOptions, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const exportProduct = (variables) => useMutation(Schema.exportProduct, {
    variables,
    ...context,
});

export const getAllProductHasOptions = (variables) => useLazyQuery(Schema.getAllProductHasOptions, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const createConfigurableAttributes = (variables) => useMutation(Schema.createConfigurableAttributes, {
    variables,
    ...context,
});

export const getInputTypeAttribute = (variables) => useLazyQuery(Schema.getInputTypeAttribute, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getConfigurableAttributes = (variables) => useLazyQuery(Schema.getConfigurableAttributes, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getConfigurableProductAssociated = (variables) => useLazyQuery(Schema.getConfigurableProductAssociated, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const createAttributeOptions = (variables) => useMutation(Schema.createAttributeOptions, {
    variables,
    ...context,
});

export const getConfigurableProductVariant = (variables) => useQuery(Schema.getConfigurableProductVariant, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getConfigurableAttributeByIds = (options) => useQuery(Schema.getConfigurableAttributeByIds, {
    ...options,
    ...context,
    ...fetchPolicy,
});

export const getBundleOptionList = (variables) => useLazyQuery(Schema.getBundleOptionList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export default {
    getProductList,
    getProductById,
    updateProduct,
    uploadProduct,
    downloadSampleCsv,
    getProductListBySku,
    getProductAttributes,
    productFetchManual,
    getProductAttributeSetOptions,
    getNewProductAttributes,
    createProduct,
    deleteProducts,
    syncToMarketplace,
    getExportProductDefaultAttributes,
    getExportProductAttributeOptions,
    exportProduct,
    getAllProductHasOptions,
    createConfigurableAttributes,
    getInputTypeAttribute,
    getConfigurableAttributes,
    getConfigurableProductAssociated,
    createAttributeOptions,
    getConfigurableProductVariant,
    getConfigurableAttributeByIds,
    getBundleOptionList,
};
