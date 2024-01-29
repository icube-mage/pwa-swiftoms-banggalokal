import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/creditmemos/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getCreditMemoList = (variables) => useLazyQuery(Schema.getCreditMemoList, {
    variables, ...context, ...fetchPolicy,
});

export const getCreditMemoById = (variables) => useQuery(Schema.getCreditMemoById, {
    variables, ...context, ...fetchPolicy,
});

export const createCreditMemo = (variables) => useMutation(Schema.createCreditMemo, {
    variables, ...context,
});

export const prepareNewMemo = (variables) => useQuery(Schema.prepareNewMemo, {
    variables, ...context, ...fetchPolicy,
});

export const calculateCreditMemoTotals = (variables) => useMutation(Schema.calculateCreditMemoTotals, {
    variables, ...context,
});

export const getStoreConfig = (variables) => useQuery(Schema.getStoreConfig, {
    variables, ...context, ...fetchPolicy,
});

export default {
    getCreditMemoList,
    getCreditMemoById,
    createCreditMemo,
    prepareNewMemo,
    calculateCreditMemoTotals,
    getStoreConfig,
};
