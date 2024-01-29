import { useQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/configurationwebstore/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'no-cache',
};

export const getWebstoreConfiguration = (variables) => useQuery(Schema.getWebstoreConfiguration, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const saveStoreConfig = (variables) => useMutation(Schema.saveStoreConfig, {
    variables,
    ...context,
});

export default {
    getWebstoreConfiguration,
    saveStoreConfig,
};
