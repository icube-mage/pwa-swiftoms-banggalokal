import { useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/productbin/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getProductBinList = (variables) => useLazyQuery(Schema.getProductBinList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const importProductBin = (variables) => useMutation(Schema.importProductBin, {
    variables,
    ...context,
});

export const downloadSampleCsvBinBySKU = (variables) => useMutation(Schema.downloadSampleCsvBinBySKU, {
    variables,
    ...context,
});

export const downloadSampleCsvBinBySKULoc = (variables) => useMutation(Schema.downloadSampleCsvBinBySKULoc, {
    variables,
    ...context,
});

export const massDeleteProductBin = (variables) => useMutation(Schema.massDeleteProductBin, {
    variables,
    ...context,
});

export const getActivity = (options) => useLazyQuery(Schema.getActivity, {
    ...context,
    ...options,
    fetchPolicy: 'no-cache',
});

export default {
    getProductBinList,
    importProductBin,
    downloadSampleCsvBinBySKU,
    downloadSampleCsvBinBySKULoc,
    massDeleteProductBin,
    getActivity,
};
