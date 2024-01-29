import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from './schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getFormDataCurbPickup = (variables) => useQuery(Schema.getFormDataCurbPickup, {
    variables, ...context, ...fetchPolicy,
});

export const getLocation = (variables) => useLazyQuery(Schema.getLocation, {
    variables, ...context, ...fetchPolicy,
});

export const addCurbPickupInfo = (variables) => useMutation(Schema.addCurbPickupInfo, {
    variables, ...context,
});

export default {
    getFormDataCurbPickup,
    getLocation,
    addCurbPickupInfo,
};
