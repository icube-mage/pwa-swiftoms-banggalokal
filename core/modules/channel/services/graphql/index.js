import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import * as Schema from '@modules/channel/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getChannelList = (variables) => useLazyQuery(Schema.getChannelList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getChannelById = (variables) => useQuery(Schema.getChannelById, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const createChannel = (variables) => useMutation(Schema.createChannel, {
    variables,
    ...context,
});

export const updateChannel = (variables) => useMutation(Schema.updateChannel, {
    variables,
    ...context,
});

export const getVirtualStockList = (variables) => useLazyQuery(Schema.getVirtualStockList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getShipmentStatus = (variables) => useLazyQuery(Schema.getShipmentStatus, { variables, ...context, ...fetchPolicy });

export const getReleaseStockOptions = (variables) => useLazyQuery(Schema.getReleaseStockOptions, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const deleteChannel = (variables) => useMutation(Schema.deleteChannel, {
    variables,
    ...context,
});
export const multideleteChannel = (variables) => useMutation(Schema.multideleteChannel, {
    variables,
    ...context,
});

export const getChannelFrameworkOptions = (variables) => useLazyQuery(Schema.getChannelFrameworkOptions, { variables, ...context, ...fetchPolicy });

export const getChannelRuleTypeOptions = (variables) => useLazyQuery(Schema.getChannelRuleTypeOptions, { variables, ...context, ...fetchPolicy });

export const getChannelListQuery = (variables) => useQuery(Schema.getChannelList, {
    variables, ...context, ...fetchPolicy,
});

export default {
    getChannelList,
    getChannelById,
    createChannel,
    updateChannel,
    getVirtualStockList,
    deleteChannel,
    multideleteChannel,
    getShipmentStatus,
    getReleaseStockOptions,
    getChannelFrameworkOptions,
    getChannelRuleTypeOptions,
    getChannelListQuery,
};
