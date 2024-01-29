import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/configuration/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getConfigurationTadaList = (variables) => useLazyQuery(Schema.getConfigurationTadaList, {
    variables, ...context, ...fetchPolicy,
});

export const getConfigurationTadaById = (variables) => useQuery(Schema.getConfigurationTadaById, {
    variables, ...context, ...fetchPolicy,
});

export const createConfigurationTada = (variables) => useMutation(Schema.createConfigurationTada, {
    variables, ...context,
});

export const updateConfigurationTada = (variables) => useMutation(Schema.updateConfigurationTada, {
    variables, ...context,
});

export const deleteConfigurationTada = (variables) => useMutation(Schema.deleteConfigurationTada, {
    variables, ...context,
});

export const multideleteConfigurationTada = (variables) => useMutation(Schema.multideleteConfigurationTada, {
    variables, ...context,
});

export default {
    getConfigurationTadaList,
    getConfigurationTadaById,
    createConfigurationTada,
    updateConfigurationTada,
    deleteConfigurationTada,
    multideleteConfigurationTada,
};
