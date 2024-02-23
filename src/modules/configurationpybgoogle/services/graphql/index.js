import { useQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/configurationpybgoogle/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'no-cache',
};

export const getGoogleAdsConfiguration = (variables) => useQuery(Schema.getGoogleAdsConfiguration, {
    variables, ...context, ...fetchPolicy,
});

export const saveStoreConfig = (variables) => useMutation(Schema.saveStoreConfig, {
    variables, ...context,
});

export default {
    getGoogleAdsConfiguration,
    saveStoreConfig,
};
