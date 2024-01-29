import { useQuery, useMutation } from '@apollo/client';
import * as Schema from '@sellermodules/manageaccount/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getUserProfilePicture = (variables) => useQuery(Schema.getUserProfilePicture, {
    variables, ...context, ...fetchPolicy,
});

export const getCustomer = (variables) => useQuery(Schema.getCustomer, {
    variables, ...context, fetchPolicy: 'no-cache',
});

export const saveUserProfilePicture = (variables) => useMutation(Schema.saveUserProfilePicture, {
    variables, ...context,
});

export const updateCustomer = (variables) => useMutation(Schema.updateCustomer, {
    variables, ...context,
});

export const updateCustomerEmail = (variables) => useMutation(Schema.updateCustomerEmail, {
    variables, ...context,
});

export const changeCustomerPassword = (variables) => useMutation(Schema.changeCustomerPassword, {
    variables, ...context,
});

export const getSellerStoreOptions = (variables) => useQuery(Schema.getSellerStoreOptions, {
    variables, ...context, ...fetchPolicy,
});

export default {
    getUserProfilePicture,
    getCustomer,
    saveUserProfilePicture,
    updateCustomer,
    updateCustomerEmail,
    changeCustomerPassword,
    getSellerStoreOptions,
};
