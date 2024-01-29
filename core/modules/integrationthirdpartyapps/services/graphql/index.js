import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/integrationthirdpartyapps/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getIntegrationAppList = (variables) => useLazyQuery(Schema.getIntegrationAppList, {
    variables, ...context, ...fetchPolicy,
});

export const getIntegrationApp = (variables) => useQuery(Schema.getIntegrationAppList, {
    variables, ...context, ...fetchPolicy,
});

export const deleteIntegrationApp = (variables) => useMutation(Schema.deleteIntegrationApp, {
    variables, ...context,
});

export const createIntegrationApp = (variables) => useMutation(Schema.createIntegrationApp, {
    variables, ...context,
});

export const updateIntegrationApp = (variables) => useMutation(Schema.updateIntegrationApp, {
    variables, ...context,
});

export const getXtentoProfile = (options) => useQuery(Schema.getXtentoProfile, {
    ...options, ...context, ...fetchPolicy,
});

export const editXtentoProfile = (variables) => useMutation(Schema.editXtentoProfile, {
    variables, ...context,
});

export const getWebhookOutputAvailableFields = (options) => useQuery(Schema.getWebhookOutputAvailableFields, {
    ...options, ...context, ...fetchPolicy,
});

export const testWebhookOutputTemplate = (options) => useMutation(Schema.testWebhookOutputTemplate, {
    ...options, ...context,
});

export const getIntegrationAppModules = (options) => useQuery(Schema.getIntegrationAppModules, {
    ...options, ...context, ...fetchPolicy,
});

export default {
    getIntegrationAppList,
    getIntegrationApp,
    deleteIntegrationApp,
    updateIntegrationApp,
    createIntegrationApp,
    getXtentoProfile,
    editXtentoProfile,
    getWebhookOutputAvailableFields,
    testWebhookOutputTemplate,
    getIntegrationAppModules,
};
