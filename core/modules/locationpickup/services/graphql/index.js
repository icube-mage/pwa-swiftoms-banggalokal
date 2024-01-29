import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/locationpickup/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getLocationPickupList = (variables) => useLazyQuery(Schema.getLocationPickupList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getLocationPickupById = (variables) => useQuery(Schema.getLocationPickupById, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const saveLocationPickup = (variables) => useMutation(Schema.saveLocationPickup, {
    variables,
    ...context,
});

export const deleteLocationPickup = (variables) => useMutation(Schema.deleteLocationPickup, {
    variables,
    ...context,
});

export default {
    getLocationPickupList,
    getLocationPickupById,
    saveLocationPickup,
    deleteLocationPickup,
};
