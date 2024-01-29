import { useQuery, useLazyQuery } from '@apollo/client';
import * as Schema from '@modules/invoice/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getInvoiceList = (variables) => useLazyQuery(Schema.getInvoiceList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getInvoiceById = (variables) => useQuery(Schema.getInvoiceById, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getInvoiceStateOptions = (variables) => useLazyQuery(Schema.getInvoiceStateOptions, {
    variables,
    ...context,
    ...fetchPolicy,
});

export default {
    getInvoiceList,
    getInvoiceById,
    getInvoiceStateOptions,
};
