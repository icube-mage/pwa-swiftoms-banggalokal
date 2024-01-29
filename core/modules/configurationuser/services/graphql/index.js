import { useQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/configurationuser/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'no-cache',
};

export const getUserConfiguration = (variables) => useQuery(Schema.getUserConfiguration, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const saveStoreConfig = (variables) => useMutation(Schema.saveStoreConfig, {
    variables,
    ...context,
});

export default {
    getUserConfiguration,
    saveStoreConfig,
};
