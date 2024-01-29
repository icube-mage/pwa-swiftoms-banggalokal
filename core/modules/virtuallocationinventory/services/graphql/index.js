import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/virtuallocationinventory/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getVirtualLocationList = (variables) => useLazyQuery(Schema.getVirtualLocationList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getVirtualLocationById = (variables) => useQuery(Schema.getVirtualLocationById, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const createVirtualLocation = (variables) => useMutation(Schema.createVirtualLocation, {
    variables,
    ...context,
});

export const updateVirtualLocation = (variables) => useMutation(Schema.updateVirtualLocation, {
    variables,
    ...context,
});

export const deleteVirtualLocation = (variables) => useMutation(Schema.deleteVirtualLocation, {
    variables,
    ...context,
});

export default {
    getVirtualLocationList,
    getVirtualLocationById,
    createVirtualLocation,
    updateVirtualLocation,
    deleteVirtualLocation,
};
