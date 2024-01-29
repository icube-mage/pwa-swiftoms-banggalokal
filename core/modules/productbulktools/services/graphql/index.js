import { useMutation, useLazyQuery } from '@apollo/client';
import * as Schema from '@modules/productbulktools/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

export const mappingProductLocation = (variables) => useMutation(Schema.mappingProductLocation, {
    variables,
    ...context,
});

export const downloadSampleCsv = (variables) => useMutation(Schema.downloadSampleCsv, {
    variables,
    ...context,
});

export const getActivity = (options) => useLazyQuery(Schema.getActivity, {
    ...context,
    ...options,
    fetchPolicy: 'no-cache',
});

export const uploadProduct = (variables) => useMutation(Schema.uploadProduct, {
    variables,
    ...context,
});

export const uploadConfigurableProduct = (variables) => useMutation(Schema.uploadConfigurableProduct, {
    variables,
    ...context,
});

export const uploadProductImages = (variables) => useMutation(Schema.uploadProductImages, {
    variables,
    ...context,
});

export const uploadBundleProduct = (variables) => useMutation(Schema.uploadBundleProduct, {
    variables,
    ...context,
});

export const uploadFixedBundleProduct = (variables) => useMutation(Schema.uploadFixedBundleProduct, {
    variables,
    ...context,
});

export default {
    mappingProductLocation,
    downloadSampleCsv,
    getActivity,
    uploadProduct,
    uploadConfigurableProduct,
    uploadProductImages,
    uploadBundleProduct,
    uploadFixedBundleProduct,
};
