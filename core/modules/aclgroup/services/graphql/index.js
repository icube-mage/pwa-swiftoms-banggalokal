import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/aclgroup/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getCustomerGroupOptions = (variables) => useLazyQuery(Schema.getCustomerGroupOptions, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getCustomerGroupList = (variables) => useLazyQuery(Schema.getCustomerGroupList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getAclTree = (variables) => useQuery(Schema.getAclTree, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getAclByGroupId = (variables) => useQuery(Schema.getAclByGroupId, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const createUserGroup = (variables) => useMutation(Schema.createUserGroup, {
    variables,
    ...context,
});

export const updateUserGroup = (variables) => useMutation(Schema.updateUserGroup, {
    variables,
    ...context,
});

export const deleteUserGroup = (variables) => useMutation(Schema.deleteUserGroup, {
    variables,
    ...context,
});

export const getAclByGroupIdLazy = (variables) => useLazyQuery(Schema.getAclByGroupId, {
    variables,
    ...context,
    ...fetchPolicy,
});

export default {
    getCustomerGroupOptions,
    getCustomerGroupList,
    getAclTree,
    getAclByGroupId,
    createUserGroup,
    updateUserGroup,
    deleteUserGroup,
    getAclByGroupIdLazy,
};
