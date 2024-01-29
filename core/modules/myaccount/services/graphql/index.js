import { useQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/myaccount/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getAdminStoreList = (variables) => useQuery(Schema.getAdminStoreList, {
    variables, ...context, ...fetchPolicy,
});

export const updateAdminStore = (variables) => useMutation(Schema.updateAdminStore, {
    variables, ...context,
});

export default {
    getAdminStoreList,
    updateAdminStore,
};
