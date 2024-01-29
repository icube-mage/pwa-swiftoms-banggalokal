import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/stockadjustment/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getStockAdjustmentList = (variables) => useLazyQuery(Schema.getStockAdjustmentList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getStockAdjustmentById = (variables) => useQuery(Schema.getStockAdjustmentById, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const addStockAdjustment = (variables) => useMutation(Schema.addStockAdjustment, {
    variables,
    ...context,
});

export const csvToArrayOfObject = (variables) => useMutation(Schema.csvToArrayOfObject, {
    variables,
    ...context,
});

export const downloadSampleCsv = (variables) => useMutation(Schema.downloadSampleCsv, {
    variables,
    ...context,
});

export default {
    getStockAdjustmentList,
    getStockAdjustmentById,
    addStockAdjustment,
    csvToArrayOfObject,
    downloadSampleCsv,
};
