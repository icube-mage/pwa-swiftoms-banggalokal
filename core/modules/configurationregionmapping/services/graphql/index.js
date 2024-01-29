import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/configurationregionmapping/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getChannelRegionList = (variables) => useLazyQuery(Schema.getChannelRegionList, {
    variables, ...context, ...fetchPolicy,
});

export const deleteChannelRegions = (variables) => useMutation(Schema.deleteChannelRegions, {
    variables, ...context,
});

export const saveChannelRegion = (variables) => useMutation(Schema.saveChannelRegion, {
    variables, ...context,
});

export const getChannelRegionById = (variables) => useQuery(Schema.getChannelRegionById, {
    variables, ...context, ...fetchPolicy,
});

export const getCountries = (variables) => useQuery(Schema.getCountries, {
    variables, ...context, ...fetchPolicy,
});

export default {
    getChannelRegionList,
    deleteChannelRegions,
    saveChannelRegion,
    getChannelRegionById,
    getCountries,
};
