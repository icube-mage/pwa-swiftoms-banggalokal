import { useMutation, useLazyQuery, useQuery } from '@apollo/client';
import * as Schema from '@modules/login/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getToken = () => useMutation(Schema.getCustomerToken, {
    ...context,
});

export const removeToken = () => useMutation(Schema.removeToken, {
    ...context,
});

export const getCustomer = (options) => useLazyQuery(Schema.getCustomer, {
    ...options, ...context, fetchPolicy: 'no-cache',
});

export const getStoreConfig = (variables) => useQuery(Schema.getStoreConfig, {
    variables, ...context, ...fetchPolicy,
});

export default {
    getToken,
    removeToken,
    getCustomer,
    getStoreConfig,
};
