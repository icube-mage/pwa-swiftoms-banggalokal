import { useQuery, useLazyQuery } from '@apollo/client';
import * as Schema from '@modules/theme/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const customerAccessControlList = (variables) => useQuery(Schema.customerAccessControlList, {
    variables, ...context, ...fetchPolicy,
});

export const customerAccessControlListLazy = (variables) => useLazyQuery(Schema.customerAccessControlList, {
    variables, ...context, ...fetchPolicy,
});

export const getStoreConfig = (variables) => useQuery(Schema.getStoreConfig, {
    variables, ...context, ...fetchPolicy,
});

export const getStoreConfigLazy = (options) => useLazyQuery(Schema.getStoreConfig, {
    ...options, ...context, ...fetchPolicy,
});

export const getStoreConfigWave = () => useLazyQuery(Schema.getStoreConfigWave, {
    ...context, ...fetchPolicy,
});

export const getStoreConfigBatch = () => useLazyQuery(Schema.getStoreConfigBatch, {
    ...context, ...fetchPolicy,
});

export const getStoreConfigTada = () => useLazyQuery(Schema.getStoreConfigTada, {
    ...context, ...fetchPolicy,
});

export const getStoreConfigVendor = () => useLazyQuery(Schema.getStoreConfigVendor, {
    ...context, ...fetchPolicy,
});

export const getStoreConfigBeneficiaries = () => useLazyQuery(Schema.getStoreConfigBeneficiaries, {
    ...context, ...fetchPolicy,
});

export const isAccessAllowed = (variables) => useQuery(Schema.isAccessAllowed, {
    variables, ...context, fetchPolicy: 'no-cache',
});

export const isAccessAllowedLazy = (options) => useLazyQuery(Schema.isAccessAllowed, {
    ...options,
    ...context,
    ...fetchPolicy,
});

export const getStoreLogo = (variables) => useQuery(Schema.getStoreLogo, {
    variables, ...context, ...fetchPolicy,
});

export const getCurrency = (variables) => useQuery(Schema.getCurrency, {
    variables, ...context, ...fetchPolicy,
});

export default {
    customerAccessControlList,
    customerAccessControlListLazy,
    getStoreConfig,
    getStoreConfigLazy,
    isAccessAllowed,
    isAccessAllowedLazy,
    getStoreLogo,
    getCurrency,
    getStoreConfigWave,
    getStoreConfigBatch,
    getStoreConfigTada,
    getStoreConfigVendor,
    getStoreConfigBeneficiaries,
};
