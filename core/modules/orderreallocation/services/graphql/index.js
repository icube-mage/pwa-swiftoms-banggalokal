import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/orderreallocation/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getOrderReallocationList = (variables) => useLazyQuery(Schema.getOrderReallocationList, {
    variables, ...context, ...fetchPolicy,
});

export const getOrderReallocationById = (variables) => useQuery(Schema.getOrderReallocationById, {
    variables, ...context, ...fetchPolicy,
});

export const updateReallocation = (variables) => useMutation(Schema.updateReallocation, {
    variables, ...context,
});

export const getCompanyReallocation = (variables) => useLazyQuery(Schema.getCompanyReallocation, {
    variables, ...context, ...fetchPolicy,
});

export const getLocationReallocation = (variables) => useLazyQuery(Schema.getLocationReallocation, {
    variables, ...context, ...fetchPolicy,
});

export const getAvailabilityPerSku = (variables) => useQuery(Schema.getAvailabilityPerSku, {
    variables, ...context, ...fetchPolicy,
});

export default {
    getOrderReallocationList,
    getOrderReallocationById,
    updateReallocation,
    getCompanyReallocation,
    getLocationReallocation,
    getAvailabilityPerSku,
};
