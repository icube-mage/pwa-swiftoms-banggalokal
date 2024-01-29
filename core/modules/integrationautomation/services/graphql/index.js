import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/integrationautomation/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getAutomationList = (variables) => useLazyQuery(Schema.getAutomationList, {
    variables, ...context, ...fetchPolicy,
});

export const getAutomation = (variables) => useQuery(Schema.getAutomationList, {
    variables, ...context, ...fetchPolicy,
});

export const deleteAutomation = (variables) => useMutation(Schema.deleteAutomation, {
    variables, ...context,
});

export const createAutomation = (variables) => useMutation(Schema.createAutomation, {
    variables, ...context,
});

export const updateAutomation = (variables) => useMutation(Schema.updateAutomation, {
    variables, ...context,
});

export const getCredentialList = (options) => useLazyQuery(Schema.getCredentialList, {
    ...options, ...context, ...fetchPolicy,
});

export const getCredentialListQuery = (variables) => useQuery(Schema.getCredentialList, {
    variables, ...context, ...fetchPolicy,
});

export const addCredential = (options) => useMutation(Schema.addCredential, {
    ...options, ...context,
});

export const updateCredential = (options) => useMutation(Schema.updateCredential, {
    ...options, ...context,
});

export const deleteCredential = (options) => useMutation(Schema.deleteCredential, {
    ...options, ...context,
});

export const getEventList = (options) => useLazyQuery(Schema.getEventList, {
    ...options, ...context, ...fetchPolicy,
});

export const getEventListQuery = (variables) => useQuery(Schema.getEventList, {
    variables, ...context, ...fetchPolicy,
});

export const getExportAvailableFields = (options) => useQuery(Schema.getExportAvailableFields, {
    ...options, ...context, ...fetchPolicy,
});

export const testExportTemplate = (options) => useMutation(Schema.testExportTemplate, {
    ...options, ...context,
});

export const getEventConditions = (variables) => useLazyQuery(Schema.getEventConditions, {
    variables, ...context, ...fetchPolicy,
});

export const getAutomationLogList = (variables) => useLazyQuery(Schema.getAutomationLogList, {
    variables, ...context, ...fetchPolicy,
});

export const getAutomationLog = (variables) => useQuery(Schema.getAutomationLog, {
    variables, ...context, ...fetchPolicy,
});

export const manualExecution = (options) => useMutation(Schema.manualExecution, {
    ...options, ...context,
});

export const updateAutomationStatus = (options) => useMutation(Schema.updateAutomationStatus, {
    ...options, ...context,
});

export default {
    getAutomationList,
    getAutomation,
    deleteAutomation,
    updateAutomation,
    createAutomation,
    getCredentialList,
    addCredential,
    updateCredential,
    deleteCredential,
    getEventList,
    getEventListQuery,
    getCredentialListQuery,
    getExportAvailableFields,
    testExportTemplate,
    getEventConditions,
    getAutomationLogList,
    getAutomationLog,
    manualExecution,
    updateAutomationStatus,
};
