import { useQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/configurationgeneral/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'no-cache',
};

export const getGeneralConfiguration = (variables) => useQuery(Schema.getGeneralConfiguration, {
    variables, ...context, ...fetchPolicy,
});

export const saveStoreConfig = (variables) => useMutation(Schema.saveStoreConfig, {
    variables, ...context,
});

export default {
    getGeneralConfiguration,
    saveStoreConfig,
};
