/* eslint-disable linebreak-style */
import { useQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/configurationautomation/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'no-cache',
};

export const getAutomationConfigurations = (variables) => useQuery(Schema.getAutomationConfigurations, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const saveStoreConfig = (variables) => useMutation(Schema.saveStoreConfig, {
    variables,
    ...context,
});

export default {
    getAutomationConfigurations,
    saveStoreConfig,
};
