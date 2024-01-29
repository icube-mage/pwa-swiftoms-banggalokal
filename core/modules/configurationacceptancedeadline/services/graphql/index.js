import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/configurationacceptancedeadline/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getAcceptanceDeadlineList = (variables) => useLazyQuery(Schema.getAcceptanceDeadlineList, {
    variables, ...context, ...fetchPolicy,
});

export const deleteAcceptanceDeadline = (variables) => useMutation(Schema.deleteAcceptanceDeadline, {
    variables, ...context,
});

export const getAcceptanceDeadlineById = (options) => useQuery(Schema.getAcceptanceDeadlineById, {
    ...options, ...context, ...fetchPolicy,
});

export const createAcceptanceDeadline = (variables) => useMutation(Schema.createAcceptanceDeadline, {
    variables, ...context,
});

export const updateAcceptanceDeadline = (variables) => useMutation(Schema.updateAcceptanceDeadline, {
    variables, ...context,
});

export const getChannelList = (variables) => useLazyQuery(Schema.getChannelList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const downloadSampleCsv = (variables) => useMutation(Schema.downloadSampleCsv, {
    variables,
    ...context,
});

export const getActivity = (options) => useLazyQuery(Schema.getActivity, {
    ...context,
    ...options,
    fetchPolicy: 'no-cache',
});

export const bulkCreateAcceptanceDeadline = (variables) => useMutation(Schema.bulkCreateAcceptanceDeadline, {
    variables,
    ...context,
});

export default {
    getAcceptanceDeadlineList,
    deleteAcceptanceDeadline,
    getAcceptanceDeadlineById,
    createAcceptanceDeadline,
    updateAcceptanceDeadline,
    getChannelList,
    downloadSampleCsv,
    getActivity,
    bulkCreateAcceptanceDeadline,
};
