import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/wavepack/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getPickByWaveList = (variables) => useLazyQuery(Schema.getPickByWaveList, {
    variables, ...context, ...fetchPolicy,
});

export const getPickByWavePacklist = (variables) => useQuery(Schema.getPickByWavePacklist, {
    variables, ...context, ...fetchPolicy,
});

export const startPickByWavePacking = (variables) => useMutation(Schema.startPickByWavePacking, {
    variables, ...context,
});

export const getPackList = (variables) => useQuery(Schema.getPackList, {
    variables, ...context, ...fetchPolicy,
});

export const donePickByWavePacking = (options) => useMutation(Schema.donePickByWavePacking, {
    ...options, ...context,
});

export const packShipment = (options) => useMutation(Schema.packShipment, {
    ...options, ...context,
});

export const updatePickByWaveQtyPacked = (options) => useMutation(Schema.updatePickByWaveQtyPacked, {
    ...options, ...context,
});

export const getStoreConfig = (variables) => useQuery(Schema.getStoreConfig, {
    variables, ...context, ...fetchPolicy,
});

export const getPickByWaveById = (variables) => useQuery(Schema.getPickByWaveById, {
    variables, ...context, ...fetchPolicy,
});

export default {
    getPickByWaveList,
    getPickByWavePacklist,
    startPickByWavePacking,
    getPackList,
    packShipment,
    donePickByWavePacking,
    updatePickByWaveQtyPacked,
    getStoreConfig,
    getPickByWaveById,
};
