import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/productattributes/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getConfigurableAttributes = (variables) => useLazyQuery(Schema.getConfigurableAttributes, {
    variables, ...context, ...fetchPolicy,
});

export const getConfigurableAttributeByIds = (variables) => useQuery(Schema.getConfigurableAttributeByIds, {
    variables, ...context, ...fetchPolicy,
});

export const saveProductAttribute = (variables) => useMutation(Schema.saveProductAttribute, {
    variables, ...context,
});

export const deleteConfigurableAttributes = (variables) => useMutation(Schema.deleteConfigurableAttributes, {
    variables, ...context,
});

export default {
    getConfigurableAttributes,
    getConfigurableAttributeByIds,
    saveProductAttribute,
    deleteConfigurableAttributes,
};
