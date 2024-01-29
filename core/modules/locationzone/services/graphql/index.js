import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/locationzone/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getZoneList = (variables) => useLazyQuery(Schema.getZoneList, {
    variables, ...context, ...fetchPolicy,
});

export const getZoneById = (variables) => useQuery(Schema.getZoneById, {
    variables, ...context, ...fetchPolicy,
});

export const createZone = (variables) => useMutation(Schema.createZone, {
    variables, ...context,
});

export const updateZone = (variables) => useMutation(Schema.updateZone, {
    variables, ...context,
});

export const deleteZone = (variables) => useMutation(Schema.deleteZone, {
    variables, ...context,
});

export const bulkCreateZone = (variables) => useMutation(Schema.bulkCreateZone, {
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

export default {
    getZoneList,
    getZoneById,
    createZone,
    updateZone,
    deleteZone,
    bulkCreateZone,
    downloadSampleCsv,
    getActivity,
};
