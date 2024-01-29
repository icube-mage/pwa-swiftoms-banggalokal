import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/adminstore/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getCompanyList = (variables) => useLazyQuery(Schema.getCompanyList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getCompanyById = (variables) => useQuery(Schema.getCompanyById, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const createCompany = (variables) => useMutation(Schema.createCompany, {
    variables,
    ...context,
});

export const updateCompany = (variables) => useMutation(Schema.updateCompany, {
    variables,
    ...context,
});

export const getAdminStoreList = (variables) => useLazyQuery(Schema.getAdminStoreList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getAdminStoreById = (variables) => useQuery(Schema.getAdminStoreById, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const createAdminStore = (variables) => useMutation(Schema.createAdminStore, {
    variables,
    ...context,
});

export const updateAdminStore = (variables) => useMutation(Schema.updateAdminStore, {
    variables,
    ...context,
});

export const getCompanyOptions = (variables) => useQuery(Schema.getCompanyOptions, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getLocationOptions = (variables) => useQuery(Schema.getLocationOptions, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getCustomerGroupOptions = (variables) => useQuery(Schema.getCustomerGroupOptions, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getAclTree = (variables) => useQuery(Schema.getAclTree, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getAclByCustomerId = (variables) => useQuery(Schema.getAclByCustomerId, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const deleteAdminStore = (variables) => useMutation(Schema.deleteAdminStore, {
    variables,
    ...context,
});

export const getAclByGroupIdLazy = (variables) => useLazyQuery(Schema.getAclByGroupId, {
    variables,
    ...context,
    ...fetchPolicy,
});

export default {
    getCompanyList,
    getCompanyById,
    createCompany,
    updateCompany,
    //
    getAdminStoreList,
    getAdminStoreById,
    createAdminStore,
    updateAdminStore,
    getCompanyOptions,
    getLocationOptions,
    getCustomerGroupOptions,
    getAclTree,
    getAclByCustomerId,
    deleteAdminStore,
    getAclByGroupIdLazy,
};
