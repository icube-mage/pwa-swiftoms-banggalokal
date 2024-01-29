import { useQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/configurationopenapi/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'no-cache',
};

export const getOpenApiConfiguration = (variables) => useQuery(Schema.getOpenApiConfiguration, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const saveStoreConfig = (variables) => useMutation(Schema.saveStoreConfig, {
    variables,
    ...context,
});

export default {
    getOpenApiConfiguration,
    saveStoreConfig,
};
