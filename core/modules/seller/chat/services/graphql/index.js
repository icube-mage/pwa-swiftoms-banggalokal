import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import * as Schema from '@sellermodules/chat/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getSessionMessageList = (options = {}) => useQuery(Schema.getSessionMessageListSchema, {
    ...options,
    ...context,
});

export const getMessageList = (options = {}) => useLazyQuery(Schema.getMessageListSchema, {
    ...options,
    ...context,
    fetchPolicy: 'network-only',
});

export const addMessage = (options = {}) => useMutation(Schema.addMessageSchema, {
    ...options,
    ...context,
});

export const getAgentCode = (options = {}) => useQuery(Schema.agentCodeSchema, {
    ...options,
    ...context,
});

export const getStoreConfig = (variables) => useQuery(Schema.getStoreConfig, {
    variables, ...context, ...fetchPolicy,
});
