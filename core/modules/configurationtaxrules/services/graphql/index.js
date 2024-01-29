import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/configurationtaxrules/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getTaxRuleList = (variables) => useLazyQuery(Schema.getTaxRuleList, {
    variables, ...context, ...fetchPolicy,
});

export const getTaxClassList = (variables) => useLazyQuery(Schema.getTaxClassList, {
    variables, ...context, ...fetchPolicy,
});

export const createTaxRule = (variables) => useMutation(Schema.createTaxRule, {
    variables, ...context,
});

export const getTaxRateList = (variables) => useLazyQuery(Schema.getTaxRateList, {
    variables, ...context, ...fetchPolicy,
});

export const createTaxRate = (variables) => useMutation(Schema.createTaxRate, {
    variables, ...context,
});

export const updateTaxRate = (variables) => useMutation(Schema.updateTaxRate, {
    variables, ...context,
});

export const deleteTaxRate = (variables) => useMutation(Schema.deleteTaxRate, {
    variables, ...context,
});

export const createTaxClass = (variables) => useMutation(Schema.createTaxClass, {
    variables, ...context,
});

export const updateTaxClass = (variables) => useMutation(Schema.updateTaxClass, {
    variables, ...context,
});

export const deleteTaxClass = (variables) => useMutation(Schema.deleteTaxClass, {
    variables, ...context,
});

export const getTaxRuleById = (options) => useQuery(Schema.getTaxRuleById, {
    ...options, ...context, ...fetchPolicy,
});

export const updateTaxRule = (variables) => useMutation(Schema.updateTaxRule, {
    variables, ...context,
});

export default {
    getTaxRuleList,
    getTaxClassList,
    createTaxRule,
    getTaxRateList,
    createTaxRate,
    updateTaxRate,
    deleteTaxRate,
    createTaxClass,
    updateTaxClass,
    deleteTaxClass,
    getTaxRuleById,
    updateTaxRule,
};
