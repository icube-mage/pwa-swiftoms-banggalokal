import { useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/productbundle/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getProductBundleList = (variables) => useLazyQuery(Schema.getProductBundleList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const deleteProductBundle = (variables) => useMutation(Schema.deleteProductBundle, {
    variables,
    ...context,
});

export const importProductBundle = (variables) => useMutation(Schema.importProductBundle, {
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

export default {
    getProductBundleList,
    deleteProductBundle,
    importProductBundle,
    downloadSampleCsv,
    getActivity,
};
