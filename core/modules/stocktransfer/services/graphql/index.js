import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/stocktransfer/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const createStockTransfer = (variables) => useMutation(Schema.createStockTransfer, {
    variables,
    ...context,
});

export const updateStockTransfer = (variables) => useMutation(Schema.updateStockTransfer, {
    variables,
    ...context,
});

export const getStockTransferList = (variables) => useLazyQuery(Schema.getStockTransferList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getStockTransferById = (variables) => useQuery(Schema.getStockTransferById, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const uploadStockTransfer = (variables) => useMutation(Schema.uploadStockTransfer, {
    variables,
    ...context,
});

export const downloadSampleCsv = (variables) => useMutation(Schema.downloadSampleCsv, {
    variables,
    ...context,
});

export const getUploadStockTransferList = (variables) => useLazyQuery(Schema.getUploadStockTransferList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getUploadStockTransferItems = (variables) => useQuery(Schema.getUploadStockTransferItems, {
    variables,
    ...context,
    ...fetchPolicy,
});

export default {
    getStockTransferList,
    getStockTransferById,
    uploadStockTransfer,
    downloadSampleCsv,
    createStockTransfer,
    updateStockTransfer,
    getUploadStockTransferList,
    getUploadStockTransferItems,
};
