/* eslint-disable no-unused-vars */
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/configurationintegrations/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getIntegrationList = (variables) => useLazyQuery(Schema.getIntegrationList, {
    variables, ...context, ...fetchPolicy,
});

export const deleteIntegration = (variables) => useMutation(Schema.deleteIntegration, {
    variables, ...context,
});

export const getIntegrationById = (variables) => useQuery(Schema.getIntegrationById, {
    variables, ...context, ...fetchPolicy,
});

export const createIntegration = (variables) => useMutation(Schema.createIntegration, {
    variables, ...context,
});

export const updateIntegration = (variables) => useMutation(Schema.updateIntegration, {
    variables, ...context,
});

export const generateIntegration = (variables) => useMutation(Schema.generateIntegration, {
    variables, ...context,
});

export const getAclResource = (variables) => useQuery(Schema.getAclResource, {
    variables, ...context, ...fetchPolicy,
});

export default {
    getIntegrationList,
    deleteIntegration,
    getIntegrationById,
    createIntegration,
    updateIntegration,
    generateIntegration,
    getAclResource,
};
