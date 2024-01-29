import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@sellermodules/return/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getSellerReturnList = (variables) => useLazyQuery(Schema.getSellerReturnList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getSellerReturnById = (variables) => useQuery(Schema.getSellerReturnById, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getSellerStoreOptions = (variables) => useQuery(Schema.getSellerStoreOptions, {
    variables, ...context, ...fetchPolicy,
});

export const getRmaStatusList = (variables) => useQuery(Schema.getRmaStatusList, {
    variables, ...context, ...fetchPolicy,
});

export const saveSellerReturn = (variables) => useMutation(Schema.saveSellerReturn, {
    variables, ...context,
});

export default {
    getSellerReturnList,
    getSellerReturnById,
    getSellerStoreOptions,
    getRmaStatusList,
    saveSellerReturn,
};
