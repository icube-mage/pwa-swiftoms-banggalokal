import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import * as Schema from '@modules/clitools/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getQueueList = (variables) => useLazyQuery(Schema.getQueueList, {
    variables, ...context, ...fetchPolicy,
});

export const getIcubeCommandLineList = (variables) => useLazyQuery(Schema.getIcubeCommandLineList, {
    variables, ...context, ...fetchPolicy,
});

export const addQueueJob = (variables) => useMutation(Schema.addQueueJob, {
    variables, ...context,
});

export const getJobStatusOptions = (variables) => useQuery(Schema.getJobStatusOptions, {
    variables, ...context, ...fetchPolicy,
});

export default {
    getQueueList,
    getIcubeCommandLineList,
    addQueueJob,
    getJobStatusOptions,
};
