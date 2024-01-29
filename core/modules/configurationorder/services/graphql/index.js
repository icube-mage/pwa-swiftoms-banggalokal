import { useQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/configurationorder/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'no-cache',
};

export const getOrderConfiguration = (variables) => useQuery(Schema.getOrderConfiguration, {
    variables, ...context, ...fetchPolicy,
});

export const saveStoreConfig = (variables) => useMutation(Schema.saveStoreConfig, {
    variables, ...context,
});

export default {
    getOrderConfiguration,
    saveStoreConfig,
};
