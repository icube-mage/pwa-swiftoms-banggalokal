import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/failedreason/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getOrderFailedReasonList = (variables) => useLazyQuery(Schema.getOrderFailedReasonList, {
    variables, ...context, ...fetchPolicy,
});

export const getOrderFailedReasonDetail = (variables) => useQuery(Schema.getOrderFailedReasonList, {
    variables, ...context, ...fetchPolicy,
});

export const updateOrderFailedReason = (variables) => useMutation(Schema.updateOrderFailedReason, {
    variables, ...context,
});

export const availableStores = (variables) => useQuery(Schema.availableStores, {
    variables, ...context, ...fetchPolicy,
});

export default {
    getOrderFailedReasonList,
    getOrderFailedReasonDetail,
    updateOrderFailedReason,
    availableStores,
};
