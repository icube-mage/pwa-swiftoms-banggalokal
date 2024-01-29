import { useMutation, useLazyQuery } from '@apollo/client';
import * as Schema from '@modules/registervendor/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const addNewVendorRequest = (variables) => useMutation(Schema.addNewVendorRequest, {
    variables, ...context,
});

export const getCountries = () => useLazyQuery(Schema.getCountries, {
    ...context, ...fetchPolicy,
});

export const getRegion = () => useLazyQuery(Schema.getRegion, {
    ...context, ...fetchPolicy,
});

export const getCityKecByRegionCode = () => useLazyQuery(Schema.getCityKecByRegionCode, {
    ...context, ...fetchPolicy,
});

export default {
    addNewVendorRequest,
    getCountries,
    getRegion,
    getCityKecByRegionCode,
};
