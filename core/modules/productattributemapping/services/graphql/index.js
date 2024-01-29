import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import * as Schema from '@modules/productattributemapping/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getMarketplaceProductAttributeMappingList = (variables) => useLazyQuery(Schema.getMarketplaceProductAttributeMappingList, {
    variables, ...context, ...fetchPolicy,
});

export const deleteMarketplaceProductAttributeMapping = (variables) => useMutation(Schema.deleteMarketplaceProductAttributeMapping, {
    variables, ...context,
});

export const downloadMarketplaceProductAttribute = (variables) => useMutation(Schema.downloadMarketplaceProductAttribute, {
    variables, ...context,
});

export const uploadStatusProductCategory = (variables) => useMutation(Schema.uploadStatusProductCategory, {
    variables, ...context,
});

export const importMarketplaceProductAttributeMapping = (variables) => useMutation(Schema.importMarketplaceProductAttributeMapping, {
    variables, ...context,
});

export const downloadSampleCsv = (variables) => useMutation(Schema.downloadSampleCsv, {
    variables, ...context,
});

export const getMpProductAttributeMappingMpOptions = (variables) => useQuery(Schema.getMpProductAttributeMappingMpOptions, {
    variables, ...context, ...fetchPolicy,
});

export const getProductEavAttributeOptions = (variables) => useQuery(Schema.getProductEavAttributeOptions, {
    variables, ...context, ...fetchPolicy,
});

export const getMpProductAttributeMappingMpCategories = (variables) => useLazyQuery(Schema.getMpProductAttributeMappingMpCategories, {
    variables, ...context, ...fetchPolicy,
});

export const getMarketplaceProductAttributeList = (variables) => useLazyQuery(Schema.getMarketplaceProductAttributeList, {
    variables, ...context, ...fetchPolicy,
});

export const getMpProductVariantAttributeSetting = (variables) => useLazyQuery(Schema.getMpProductVariantAttributeSetting, {
    variables, ...context, ...fetchPolicy,
});

export const saveMarketplaceProductAttributeMapping = (variables) => useMutation(Schema.saveMarketplaceProductAttributeMapping, {
    variables, ...context,
});

export default {
    getMarketplaceProductAttributeMappingList,
    deleteMarketplaceProductAttributeMapping,
    downloadMarketplaceProductAttribute,
    uploadStatusProductCategory,
    downloadSampleCsv,
    getMpProductAttributeMappingMpOptions,
    getProductEavAttributeOptions,
    getMpProductAttributeMappingMpCategories,
    getMarketplaceProductAttributeList,
    getMpProductVariantAttributeSetting,
    saveMarketplaceProductAttributeMapping,
    importMarketplaceProductAttributeMapping,
};
