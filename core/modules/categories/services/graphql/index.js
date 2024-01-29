import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/categories/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getCategoryList = (variables) => useLazyQuery(Schema.getCategoryList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getCategoryListQuery = (variables) => useQuery(Schema.getCategoryList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const deleteCategory = (variables) => useMutation(Schema.deleteCategory, {
    variables,
    ...context,
});

export const createCategory = (variables) => useMutation(Schema.createCategory, {
    variables,
    ...context,
});

export const updateCategory = (variables) => useMutation(Schema.updateCategory, {
    variables,
    ...context,
});

export default {
    getCategoryList,
    getCategoryListQuery,
    deleteCategory,
    createCategory,
    updateCategory,
};
