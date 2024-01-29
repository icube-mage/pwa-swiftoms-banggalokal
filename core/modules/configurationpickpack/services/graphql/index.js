import { useQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/configurationpickpack/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'no-cache',
};

export const getPickPackConfigurations = (variables) => useQuery(Schema.getPickPackConfigurations, {
    variables, ...context, ...fetchPolicy,
});

export const saveStoreConfig = (variables) => useMutation(Schema.saveStoreConfig, {
    variables, ...context,
});

export default {
    getPickPackConfigurations,
    saveStoreConfig,
};
