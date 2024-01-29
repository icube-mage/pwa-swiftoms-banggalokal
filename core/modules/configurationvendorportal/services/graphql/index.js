import { useQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/configurationvendorportal/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'no-cache',
};

export const getVendorConfiguration = (variables) => useQuery(Schema.getVendorConfiguration, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const saveStoreConfig = (variables) => useMutation(Schema.saveStoreConfig, {
    variables,
    ...context,
});

export default {
    getVendorConfiguration,
    saveStoreConfig,
};
