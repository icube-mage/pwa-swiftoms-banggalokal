import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import * as Schema from '@sellermodules/income/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getSellerBalanceHistory = (variables) => useLazyQuery(Schema.getSellerBalanceHistory, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getSellerWithdrawalHistory = (variables) => useLazyQuery(Schema.getSellerWithdrawalHistory, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getVendorIrisBalance = (variables) => useQuery(Schema.getVendorIrisBalance, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getVendorIrisBankList = (variables) => useLazyQuery(Schema.getVendorIrisBankList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const saveSellerBankAccount = (variables) => useMutation(Schema.saveSellerBankAccount, {
    variables,
    ...context,
});

export const deleteSellerBankAccount = (variables) => useMutation(Schema.deleteSellerBankAccount, {
    variables,
    ...context,
});

export const createVendorIrisPayout = (variables) => useMutation(Schema.createVendorIrisPayout, {
    variables,
    ...context,
});

export const isBankAccountValid = (variables) => useMutation(Schema.isBankAccountValid, {
    variables,
    ...context,
});

export const setSellerDefaultBank = (variables) => useMutation(Schema.setSellerDefaultBank, {
    variables,
    ...context,
});

export const getSellerBankAccounts = (variables) => useQuery(Schema.getSellerBankAccounts, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getSellerWithdrawalSchedule = (variables) => useQuery(Schema.getSellerWithdrawalSchedule, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const saveSellerWithdrawalSchedule = (variables) => useMutation(Schema.saveSellerWithdrawalSchedule, {
    variables,
    ...context,
});

export const useBankValidation = (variables) => useQuery(Schema.useBankValidation, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const downloadSellerBalanceHistory = (variables) => useMutation(Schema.downloadSellerBalanceHistory, {
    variables,
    ...context,
});

export const downloadSellerWithdrawalHistory = (variables) => useMutation(Schema.downloadSellerWithdrawalHistory, {
    variables,
    ...context,
});

export const getWithdrawalStatusOptions = (variables) => useQuery(Schema.getWithdrawalStatusOptions, {
    variables,
    ...context,
    ...fetchPolicy,
});

export default {
    getSellerBalanceHistory,
    getSellerWithdrawalHistory,
    getVendorIrisBalance,
    getVendorIrisBankList,
    saveSellerBankAccount,
    deleteSellerBankAccount,
    createVendorIrisPayout,
    isBankAccountValid,
    getSellerBankAccounts,
    setSellerDefaultBank,
    getSellerWithdrawalSchedule,
    saveSellerWithdrawalSchedule,
    useBankValidation,
    downloadSellerBalanceHistory,
    downloadSellerWithdrawalHistory,
    getWithdrawalStatusOptions,
};
