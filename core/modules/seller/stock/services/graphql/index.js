import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import * as Schema from '@sellermodules/stock/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getSellerStocks = (variables) => useLazyQuery(Schema.getSellerStocks, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const downloadSellerStocks = (variables) => useMutation(Schema.downloadSellerStocks, {
    variables,
    ...context,
});

export const editSellerStock = (variables) => useMutation(Schema.editSellerStock, {
    variables,
    ...context,
});

export const getActivity = (options) => useLazyQuery(Schema.getActivity, {
    ...context,
    ...options,
    fetchPolicy: 'no-cache',
});

export const uploadSellerStocks = (variables) => useMutation(Schema.uploadSellerStocks, {
    variables,
    ...context,
});

export const getSellerStoreOptions = (variables) => useQuery(Schema.getSellerStoreOptions, {
    variables, ...context, ...fetchPolicy,
});

export default {
    getSellerStocks,
    downloadSellerStocks,
    editSellerStock,
    getActivity,
    uploadSellerStocks,
    getSellerStoreOptions,
};
