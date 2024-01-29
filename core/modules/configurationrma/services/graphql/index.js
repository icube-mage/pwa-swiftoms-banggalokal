/* eslint-disable linebreak-style */
import { useQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/configurationrma/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'no-cache',
};

export const getRmaConfiguration = (variables) => useQuery(Schema.getRmaConfiguration, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const saveStoreConfig = (variables) => useMutation(Schema.saveStoreConfig, {
    variables,
    ...context,
});

export default {
    getRmaConfiguration,
    saveStoreConfig,
};
