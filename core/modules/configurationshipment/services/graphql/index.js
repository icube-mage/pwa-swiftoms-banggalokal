/* eslint-disable no-unused-vars */
import { useQuery, useMutation } from '@apollo/client';
import * as Schema from '@root/core/modules/configurationshipment/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'no-cache',
};

export const getConfigShippingMethod = (variables) => useQuery(Schema.getConfigShippingMethod, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const updateStoreConfig = (variables) => useMutation(Schema.updateStoreConfig, {
    variables,
    ...context,
});

export const getShipmentConfiguration = (variables) => useQuery(Schema.getShipmentConfiguration, {
    variables, ...context, ...fetchPolicy,
});

export const saveStoreConfig = (variables) => useMutation(Schema.saveStoreConfig, {
    variables, ...context,
});

export default {
    getConfigShippingMethod,
    updateStoreConfig,
    getShipmentConfiguration,
    saveStoreConfig,
};
