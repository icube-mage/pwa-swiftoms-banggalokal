import { useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/vendoririspayout/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getVendorIrisPayoutHistory = (variables) => useLazyQuery(Schema.getVendorIrisPayoutHistory, {
    variables, ...context, ...fetchPolicy,
});

export const createVendorIrisPayout = (variables) => useMutation(Schema.createVendorIrisPayout, {
    variables, ...context,
});

export const getVendorIrisBeneficiariesList = (variables) => useLazyQuery(Schema.getVendorIrisBeneficiariesList, {
    variables, ...context, ...fetchPolicy,
});

export const getVendorIrisBalance = () => useLazyQuery(Schema.getVendorIrisBalance, {
    ...context, ...fetchPolicy,
});

export default {
    getVendorIrisPayoutHistory,
    createVendorIrisPayout,
    getVendorIrisBeneficiariesList,
    getVendorIrisBalance,
};
