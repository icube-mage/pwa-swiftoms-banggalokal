import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/location/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getLocationList = (variables) => useLazyQuery(Schema.getLocationList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getStoreLocationList = (variables) => useLazyQuery(Schema.getStoreLocationList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getLocationById = (variables) => useQuery(Schema.getLocationById, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const createLocation = (variables) => useMutation(Schema.createLocation, {
    variables,
    ...context,
});

export const updateLocation = (variables) => useMutation(Schema.updateLocation, {
    variables,
    ...context,
});

export const getCountries = () => useLazyQuery(Schema.getCountries, {
    ...context,
    ...fetchPolicy,
});

export const getCountry = (variables) => useLazyQuery(Schema.getCountry, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getCityListByRegionCode = (variables) => useLazyQuery(Schema.getCityListByRegionCode, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getCityList = (variables) => useLazyQuery(Schema.getCityList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const multideleteLocation = (variables) => useMutation(Schema.multideleteLocation, {
    variables,
    ...context,
});

export const getCityKecByRegionCode = (variables) => useLazyQuery(Schema.getCityKecByRegionCode, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getStoreConfig = (variables) => useQuery(Schema.getStoreConfig, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getZoneList = (variables) => useLazyQuery(Schema.getZoneList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getLocationListQuery = (variables) => useQuery(Schema.getLocationList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export default {
    getLocationList,
    getLocationById,
    createLocation,
    updateLocation,
    getCountries,
    getCountry,
    getCityListByRegionCode,
    getCityList,
    multideleteLocation,
    getCityKecByRegionCode,
    getStoreLocationList,
    getStoreConfig,
    getZoneList,
    getLocationListQuery,
};
