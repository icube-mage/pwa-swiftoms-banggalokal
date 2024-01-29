import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/wavelist/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getPickByWaveList = (variables) => useLazyQuery(Schema.getPickByWaveList, {
    variables, ...context, ...fetchPolicy,
});

export const getPickByWaveById = (variables) => useQuery(Schema.getPickByWaveById, {
    variables, ...context, ...fetchPolicy,
});

export const getPickByWaveItemById = (variables) => useQuery(Schema.getPickByWaveItemById, {
    variables, ...context, ...fetchPolicy,
});

export const updatePickByWaveItem = (variables) => useMutation(Schema.updatePickByWaveItem, {
    variables, ...context,
});

export const donePickByWave = (variables) => useMutation(Schema.donePickByWave, {
    variables, ...context,
});

export const getPickByWaveStatus = (variables) => useQuery(Schema.getPickByWaveStatus, {
    variables, ...context, ...fetchPolicy,
});

export const getStoreConfig = (variables) => useQuery(Schema.getStoreConfig, {
    variables, ...context, ...fetchPolicy,
});

export default {
    getPickByWaveList,
    getPickByWaveById,
    getPickByWaveItemById,
    updatePickByWaveItem,
    donePickByWave,
    getPickByWaveStatus,
    getStoreConfig,
};
