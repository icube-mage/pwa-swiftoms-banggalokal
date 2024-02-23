import { useQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/configurationpybmeta/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'no-cache',
};

export const getMetaAdsConfiguration = (variables) => useQuery(Schema.getMetaAdsConfiguration, {
    variables, ...context, ...fetchPolicy,
});

export const saveStoreConfig = (variables) => useMutation(Schema.saveStoreConfig, {
    variables, ...context,
});

export default {
    getMetaAdsConfiguration,
    saveStoreConfig,
};
