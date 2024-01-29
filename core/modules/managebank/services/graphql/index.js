import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/managebank/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getVendorBankListLazy = (variables) => useLazyQuery(Schema.getVendorBankList, {
    variables, ...context, ...fetchPolicy,
});

export const getVendorBankList = (variables) => useQuery(Schema.getVendorBankList, {
    variables, ...context, ...fetchPolicy,
});

export const saveVendorBank = (variables) => useMutation(Schema.saveVendorBank, {
    variables, ...context,
});

export const downloadWithdrawalFeeTemplate = (variables) => useMutation(Schema.downloadWithdrawalFeeTemplate, {
    variables, ...context,
});

export const uploadWithdrawalFee = (variables) => useMutation(Schema.uploadWithdrawalFee, {
    variables, ...context,
});

export const getActivity = (options) => useLazyQuery(Schema.getActivity, {
    ...options,
    ...context,
    ...fetchPolicy,
});

export default {
    getVendorBankListLazy,
    getVendorBankList,
    saveVendorBank,
    downloadWithdrawalFeeTemplate,
    uploadWithdrawalFee,
    getActivity,
};
