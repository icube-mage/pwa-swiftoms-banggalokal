import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/managevendor/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getCompanyList = (variables) => useLazyQuery(Schema.getCompanyList, {
    variables, ...context, ...fetchPolicy,
});

export const getCompanyById = (variables) => useQuery(Schema.getCompanyById, {
    variables, ...context, ...fetchPolicy,
});

export const updateCompany = (variables) => useMutation(Schema.updateCompany, {
    variables, ...context,
});

export const getVendorList = (variables) => useLazyQuery(Schema.getVendorList, {
    variables, ...context, ...fetchPolicy,
});

export const getVendorById = (variables) => useQuery(Schema.getVendorById, {
    variables, ...context, ...fetchPolicy,
});

export const getCourierOption = () => useQuery(Schema.getCourierOption, {
    ...context, ...fetchPolicy,
});

export const getShipperMethodOption = () => useQuery(Schema.getShipperMethodOption, {
    ...context, ...fetchPolicy,
});

export const vendorUpdate = (variables) => useMutation(Schema.vendorUpdate, {
    variables, ...context,
});

export const getStoreConfig = (variables) => useQuery(Schema.getStoreConfig, {
    variables, ...context, ...fetchPolicy,
});

export const getVendorIrisBankList = () => useQuery(Schema.getVendorIrisBankList, {
    ...context, ...fetchPolicy,
});

export const getVendorIrisPayoutSchedule = () => useQuery(Schema.getVendorIrisPayoutSchedule, {
    ...context, ...fetchPolicy,
});

export const getAutoApprovalOptions = () => useQuery(Schema.getAutoApprovalOptions, {
    ...context, ...fetchPolicy,
});

export const getCompanyListQuery = (variables) => useQuery(Schema.getCompanyList, {
    variables, ...context, ...fetchPolicy,
});

export default {
    getCompanyList,
    getCompanyById,
    updateCompany,
    getVendorList,
    getVendorById,
    getCourierOption,
    getShipperMethodOption,
    vendorUpdate,
    getStoreConfig,
    getVendorIrisBankList,
    getVendorIrisPayoutSchedule,
    getAutoApprovalOptions,
    getCompanyListQuery,
};
