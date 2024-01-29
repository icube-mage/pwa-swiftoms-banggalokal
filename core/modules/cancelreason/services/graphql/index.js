import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/cancelreason/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getCancelReasonList = (variables) => useLazyQuery(Schema.getCancelReasonList, {
    variables, ...context, ...fetchPolicy,
});

export const getCancelReasonById = (variables) => useQuery(Schema.getCancelReasonById, {
    variables, ...context, ...fetchPolicy,
});

export const createCancelReason = (variables) => useMutation(Schema.createCancelReason, {
    variables, ...context,
});

export const updateCancelReason = (variables) => useMutation(Schema.updateCancelReason, {
    variables, ...context,
});

export const deleteCancelReason = (variables) => useMutation(Schema.deleteCancelReason, {
    variables, ...context,
});

export default {
    getCancelReasonList,
    getCancelReasonById,
    createCancelReason,
    updateCancelReason,
    deleteCancelReason,
};
