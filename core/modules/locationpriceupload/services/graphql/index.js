import { useMutation, useLazyQuery } from '@apollo/client';
import * as Schema from '@modules/locationpriceupload/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};
const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const uploadPriceLocation = (variables) => useMutation(Schema.uploadPriceLocation, {
    variables,
    ...context,
});

export const downloadSampleCsv = (variables) => useMutation(Schema.downloadSampleCsv, {
    variables,
    ...context,
});

export const getPriceLocationList = (variables) => useLazyQuery(Schema.getPriceLocationList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getActivity = (options) => useLazyQuery(Schema.getActivity, {
    ...context,
    ...options,
    fetchPolicy: 'no-cache',
});

export const deleteProductPrice = (variables) => useMutation(Schema.deleteProductPrice, {
    variables,
    ...context,
});

export default {
    uploadPriceLocation,
    downloadSampleCsv,
    getPriceLocationList,
    getActivity,
    deleteProductPrice,
};
