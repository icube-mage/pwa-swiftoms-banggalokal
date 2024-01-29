/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
import { useQuery } from '@apollo/client';
import * as CategorySchema from '@services/graphql/schema/category';

export const getCategories = () => useQuery(CategorySchema.categories);
export const getVesMenu = (params = {}) => useQuery(CategorySchema.vesMenu, {
    ...params,
});
