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

export const validateUsername = (variables) => useMutation(Schema.validateUsername, {
    variables, ...context,
});

export const GenerateSocialLoginToken = () => useMutation(Schema.GenerateSocialLoginToken, {
    ...context,
});

export const requestOtp = () => useMutation(Schema.requestOtp, {
    ...context,
});

export const verifyOtp = () => useMutation(Schema.verifyOtp, {
    ...context,
});

export const getOtpConfig = () => useLazyQuery(Schema.getOtpConfig, {
    ...context, fetchPolicy: 'no-cache',
});

export const getSeller = (options) => useLazyQuery(Schema.getSeller, {
    ...options, ...context, fetchPolicy: 'no-cache',
});

export default {
    getToken,
    removeToken,
    getCustomer,
    getStoreConfig,
    validateUsername,
    GenerateSocialLoginToken,
    requestOtp,
    verifyOtp,
    getOtpConfig,
    getSeller,
};
