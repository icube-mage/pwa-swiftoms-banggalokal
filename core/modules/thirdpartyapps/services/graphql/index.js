import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/thirdpartyapps/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getThirdPartyAppList = (variables) => useLazyQuery(Schema.getThirdPartyAppList, {
    variables, ...context, ...fetchPolicy,
});

export const deleteThirdPartyApps = (variables) => useMutation(Schema.deleteThirdPartyApps, {
    variables, ...context,
});

export const createThirdPartyApp = (variables) => useMutation(Schema.createThirdPartyApp, {
    variables, ...context,
});

export const updateThirdPartyApp = (variables) => useMutation(Schema.updateThirdPartyApp, {
    variables, ...context,
});

export const getThirdPartyApp = (variables) => useQuery(Schema.getThirdPartyApp, {
    variables, ...context, ...fetchPolicy,
});

export const getThirdPartyAppModules = (variables) => useQuery(Schema.getThirdPartyAppModules, {
    variables, ...context, ...fetchPolicy,
});

export const generateThirdPartyAccessToken = (options) => useLazyQuery(Schema.generateThirdPartyAccessToken, {
    ...options, ...context, ...fetchPolicy,
});

export default {
    getThirdPartyAppList,
    deleteThirdPartyApps,
    updateThirdPartyApp,
    getThirdPartyApp,
    getThirdPartyAppModules,
    createThirdPartyApp,
    generateThirdPartyAccessToken,
};
