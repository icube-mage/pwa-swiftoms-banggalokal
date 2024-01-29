import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/configurationemailtemplate/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getEmailTemplateList = (variables) => useLazyQuery(Schema.getEmailTemplateList, {
    variables, ...context, ...fetchPolicy,
});

export const deleteEmailTemplate = (variables) => useMutation(Schema.deleteEmailTemplate, {
    variables, ...context,
});

export const getDefaultTemplateOption = (options) => useQuery(Schema.getDefaultTemplateOption, {
    ...options, ...context, ...fetchPolicy,
});

export const createEmailTemplate = (variables) => useMutation(Schema.createEmailTemplate, {
    variables, ...context,
});

export const loadTemplateById = (options) => useLazyQuery(Schema.loadTemplateById, {
    ...options, ...context, ...fetchPolicy,
});

export const getEmailTemplateById = (variables) => useQuery(Schema.getEmailTemplateById, {
    variables, ...context, ...fetchPolicy,
});

export const updateEmailTemplate = (variables) => useMutation(Schema.updateEmailTemplate, {
    variables, ...context,
});

export const previewTemplateById = (options) => useQuery(Schema.previewTemplateById, {
    ...options, ...context, ...fetchPolicy,
});

export default {
    getEmailTemplateList,
    deleteEmailTemplate,
    getDefaultTemplateOption,
    createEmailTemplate,
    loadTemplateById,
    getEmailTemplateById,
    updateEmailTemplate,
    previewTemplateById,
};
