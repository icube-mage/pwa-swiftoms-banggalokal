import { useQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/configurationtada/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'no-cache',
};

export const getTadaConfiguration = (variables) => useQuery(Schema.getTadaConfiguration, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const saveStoreConfig = (variables) => useMutation(Schema.saveStoreConfig, {
    variables,
    ...context,
});

export default {
    getTadaConfiguration,
    saveStoreConfig,
};
