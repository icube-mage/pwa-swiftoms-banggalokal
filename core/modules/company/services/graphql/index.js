import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/company/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getCompanyList = (variables) => useLazyQuery(Schema.getCompanyList, {
    variables, ...context, ...fetchPolicy,
});

export const getCompanyListQuery = (variables) => useQuery(Schema.getCompanyList, {
    variables, ...context, ...fetchPolicy,
});

export const getCompanyById = (variables) => useQuery(Schema.getCompanyById, {
    variables, ...context, ...fetchPolicy,
});

export const createCompany = (variables) => useMutation(Schema.createCompany, {
    variables, ...context,
});

export const updateCompany = (variables) => useMutation(Schema.updateCompany, {
    variables, ...context,
});

export const deleteCompany = (variables) => useMutation(Schema.deleteCompany, {
    variables, ...context,
});

export const multideleteCompany = (variables) => useMutation(Schema.multideleteCompany, {
    variables, ...context,
});

export const getStoreConfig = (variables) => useQuery(Schema.getStoreConfig, {
    variables,
    ...context,
    ...fetchPolicy,
});

export default {
    getCompanyList,
    getCompanyListQuery,
    getCompanyById,
    createCompany,
    updateCompany,
    deleteCompany,
    multideleteCompany,
    getStoreConfig,
};
