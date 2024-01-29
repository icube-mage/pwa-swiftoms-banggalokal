import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/rmastatuses/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getRmaStatusList = (variables) => useLazyQuery(Schema.getRmaStatusList, {
    variables, ...context, ...fetchPolicy,
});

export const getRmaStatusByCode = (variables) => useQuery(Schema.getRmaStatusByCode, {
    variables, ...context, ...fetchPolicy,
});

export const updateRmaStatus = (variables) => useMutation(Schema.updateRmaStatus, {
    variables, ...context,
});

export const getCustomerGroupList = (variables) => useQuery(Schema.getCustomerGroupList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export default {
    getRmaStatusList,
    getRmaStatusByCode,
    updateRmaStatus,
    getCustomerGroupList,
};
