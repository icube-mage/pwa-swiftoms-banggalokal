import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/requestvendor/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getVendorRequestList = (variables) => useLazyQuery(Schema.getVendorRequestList, {
    variables, ...context, ...fetchPolicy,
});

export const getVendorRequestById = (variables) => useQuery(Schema.getVendorRequestById, {
    variables, ...context, ...fetchPolicy,
});

export const updateCompany = (variables) => useMutation(Schema.updateCompany, {
    variables, ...context,
});

export const vendorRequestApprove = (variables) => useMutation(Schema.vendorRequestApprove, {
    variables, ...context,
});

export const vendorRequestNotApprove = (variables) => useMutation(Schema.vendorRequestNotApprove, {
    variables, ...context,
});

export const approveSellerRegistration = (variables) => useMutation(Schema.approveSellerRegistration, {
    variables, ...context,
});

export default {
    getVendorRequestList,
    getVendorRequestById,
    updateCompany,
    vendorRequestApprove,
    vendorRequestNotApprove,
    approveSellerRegistration,
};
