import { useQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/configurationinventory/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'no-cache',
};

export const getInventoryConfiguration = (variables) => useQuery(Schema.getInventoryConfiguration, {
    variables, ...context, ...fetchPolicy,
});

export const saveStoreConfig = (variables) => useMutation(Schema.saveStoreConfig, {
    variables, ...context,
});

export default {
    getInventoryConfiguration,
    saveStoreConfig,
};
