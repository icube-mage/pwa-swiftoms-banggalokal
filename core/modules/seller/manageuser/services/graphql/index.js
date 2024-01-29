import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import * as Schema from '@sellermodules/manageuser/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getLazySellerUsers = (variables) => useLazyQuery(Schema.getSellerUsers, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getSellerUsers = (variables) => useQuery(Schema.getSellerUsers, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const createSellerUser = (variables) => useMutation(Schema.createSellerUser, {
    variables,
    ...context,
});

export const editSellerUser = (variables) => useMutation(Schema.editSellerUser, {
    variables,
    ...context,
});

export const deleteSellerUser = (variables) => useMutation(Schema.deleteSellerUser, {
    variables,
    ...context,
});

export const getSellerStores = (variables) => useQuery(Schema.getSellerStores, {
    variables, ...context, ...fetchPolicy,
});

export const getSellerStoreOptions = (variables) => useQuery(Schema.getSellerStoreOptions, {
    variables, ...context, ...fetchPolicy,
});

export const getSellerAclTree = (variables) => useQuery(Schema.getSellerAclTree, {
    variables, ...context, ...fetchPolicy,
});

export const getAclByCustomerId = (variables) => useQuery(Schema.getAclByCustomerId, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getLocationList = (variables) => useQuery(Schema.getLocationList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export default {
    getSellerUsers,
    getLazySellerUsers,
    createSellerUser,
    editSellerUser,
    deleteSellerUser,
    getSellerStores,
    getSellerStoreOptions,
    getSellerAclTree,
    getAclByCustomerId,
    getLocationList,
};
