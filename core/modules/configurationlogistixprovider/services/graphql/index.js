import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/configurationlogistixprovider/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getLogistixProviderList = (variables) => useLazyQuery(Schema.getLogistixProviderList, {
    variables, ...context, ...fetchPolicy,
});

export const getLogistixProviderById = (variables) => useQuery(Schema.getLogistixProviderById, {
    variables, ...context, ...fetchPolicy,
});

export const deleteLogistixProvider = (variables) => useMutation(Schema.deleteLogistixProvider, {
    variables, ...context,
});

export const saveLogistixProvider = (variables) => useMutation(Schema.saveLogistixProvider, {
    variables, ...context,
});

export default {
    getLogistixProviderList,
    getLogistixProviderById,
    deleteLogistixProvider,
    saveLogistixProvider,
};
