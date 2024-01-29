import { useQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/configurationfinance/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'no-cache',
};

export const getFinanceConfiguration = (variables) => useQuery(Schema.getFinanceConfiguration, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const saveStoreConfig = (variables) => useMutation(Schema.saveStoreConfig, {
    variables,
    ...context,
});

export default {
    getFinanceConfiguration,
    saveStoreConfig,
};
