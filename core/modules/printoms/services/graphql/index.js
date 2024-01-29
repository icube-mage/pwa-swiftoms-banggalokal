import { useQuery } from '@apollo/client';
import * as Schema from '@modules/printoms/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getPickList = (variables) => useQuery(Schema.getPickList, {
    variables, ...context, ...fetchPolicy,
});

export const getPackList = (variables) => useQuery(Schema.getPackList, {
    variables, ...context, ...fetchPolicy,
});

export const getAddress = (variables) => useQuery(Schema.getAddress, {
    variables, ...context, ...fetchPolicy,
});

export const getInvoice = (variables) => useQuery(Schema.getInvoice, {
    variables, ...context, ...fetchPolicy,
});

export const printShippingLabel = (variables) => useQuery(Schema.printShippingLabel, {
    variables, ...context, ...fetchPolicy,
});

export const printCreditMemo = (variables) => useQuery(Schema.printCreditMemo, {
    variables, ...context, ...fetchPolicy,
});

export default {
    getPickList,
    getPackList,
    getAddress,
    getInvoice,
    printShippingLabel,
    printCreditMemo,
};
