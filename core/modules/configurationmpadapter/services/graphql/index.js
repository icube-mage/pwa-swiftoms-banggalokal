import { useQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/configurationmpadapter/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'no-cache',
};

export const getMpAdapterConfiguration = (variables) => useQuery(Schema.getMpAdapterConfiguration, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const saveStoreConfig = (variables) => useMutation(Schema.saveStoreConfig, {
    variables,
    ...context,
});

export default {
    getMpAdapterConfiguration,
    saveStoreConfig,
};
