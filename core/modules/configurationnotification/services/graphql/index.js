import { useQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/configurationnotification/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'no-cache',
};

export const getNotificationConfiguration = (variables) => useQuery(Schema.getNotificationConfiguration, {
    variables, ...context, ...fetchPolicy,
});

export const saveStoreConfig = (variables) => useMutation(Schema.saveStoreConfig, {
    variables, ...context,
});

export default {
    getNotificationConfiguration,
    saveStoreConfig,
};
