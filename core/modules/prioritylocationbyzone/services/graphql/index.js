import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/prioritylocationbyzone/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getPriorityZoneList = (variables) => useLazyQuery(Schema.getPriorityZoneList, {
    variables, ...context, ...fetchPolicy,
});

export const getPriorityZoneById = (variables) => useQuery(Schema.getPriorityZoneById, {
    variables, ...context, ...fetchPolicy,
});

export const createPriorityZone = (variables) => useMutation(Schema.createPriorityZone, {
    variables, ...context,
});

export const updatePriorityZone = (variables) => useMutation(Schema.updatePriorityZone, {
    variables, ...context,
});

export const deletePriorityZone = (variables) => useMutation(Schema.deletePriorityZone, {
    variables, ...context,
});

export const uploadPriorityZone = (variables) => useMutation(Schema.uploadPriorityZone, {
    variables,
    ...context,
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

export const getZoneOptions = (variables) => useLazyQuery(Schema.getZoneOptions, {
    variables,
    ...context,
    ...fetchPolicy,
});

export default {
    getPriorityZoneList,
    getPriorityZoneById,
    createPriorityZone,
    updatePriorityZone,
    deletePriorityZone,
    uploadPriorityZone,
    downloadSampleCsv,
    getActivity,
    getZoneOptions,
};
