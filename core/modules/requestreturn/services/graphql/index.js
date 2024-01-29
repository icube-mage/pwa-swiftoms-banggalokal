import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import * as Schema from '@modules/requestreturn/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getChannelOptions = (variables) => useLazyQuery(Schema.getChannelOptions, {
    variables, ...context, ...fetchPolicy,
});

export const getRequestReturnList = (options) => useLazyQuery(Schema.getRequestReturnList, {
    ...options, ...context, ...fetchPolicy,
});

export const getRequestReturnById = (variables) => useQuery(Schema.getRequestReturnById, {
    variables, ...context, ...fetchPolicy,
});

export const searchShipmentToReturn = (options) => useLazyQuery(Schema.searchShipmentToReturn, {
    ...options, ...context, ...fetchPolicy,
});

export const getShipmentItemToReturn = (options) => useQuery(Schema.getShipmentItemToReturn, {
    ...options, ...context, ...fetchPolicy,
});

export const getStoreConfig = (variables) => useQuery(Schema.getStoreConfig, {
    variables, ...context, ...fetchPolicy,
});

export const saveRequestReturn = (variables) => useMutation(Schema.saveRequestReturn, {
    variables, ...context,
});

export const saveRequestReturnSubmit = (variables) => useMutation(Schema.saveRequestReturnSubmit, {
    variables, ...context,
});

export const sendPackage = (variables) => useMutation(Schema.sendPackage, {
    variables, ...context,
});

export default {
    getChannelOptions,
    getRequestReturnList,
    getRequestReturnById,
    searchShipmentToReturn,
    getShipmentItemToReturn,
    getStoreConfig,
    saveRequestReturn,
    saveRequestReturnSubmit,
    sendPackage,
};
