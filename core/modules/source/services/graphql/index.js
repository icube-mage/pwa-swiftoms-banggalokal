import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/source/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getSourceList = (variables) => useLazyQuery(Schema.getSourceList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getSourceById = (variables) => useQuery(Schema.getSourceById, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const createSource = (variables) => useMutation(Schema.createSource, {
    variables,
    ...context,
});

export const updateSource = (variables) => useMutation(Schema.updateSource, {
    variables,
    ...context,
});

export const downloadSampleCsv = (variables) => useMutation(Schema.downloadSampleCsv, {
    variables,
    ...context,
});

export const downloadSource = (variables) => useMutation(Schema.downloadSource, {
    variables,
    ...context,
});

export const getActivity = (options) => useLazyQuery(Schema.getActivity, {
    ...context,
    ...options,
    fetchPolicy: 'no-cache',
});

export const getLocationList = (variables) => useLazyQuery(Schema.getLocationList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const updateSourceById = (variables) => useMutation(Schema.updateSourceById, {
    variables,
    ...context,
});

export default {
    getSourceList,
    getSourceById,
    createSource,
    downloadSampleCsv,
    downloadSource,
    getActivity,
    updateSource,
    getLocationList,
    updateSourceById,
};
