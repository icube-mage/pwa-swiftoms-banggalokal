import { useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/productapproval/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getCompanyList = (variables) => useLazyQuery(Schema.getCompanyList, {
    variables, ...context, ...fetchPolicy,
});

export const getVendorProductApprovalList = (variables) => useLazyQuery(Schema.getVendorProductApprovalList, {
    variables, ...context, ...fetchPolicy,
});

export const productsApprove = (variables) => useMutation(Schema.productsApprove, {
    variables, ...context,
});

export default {
    getCompanyList,
    getVendorProductApprovalList,
    productsApprove,
};
