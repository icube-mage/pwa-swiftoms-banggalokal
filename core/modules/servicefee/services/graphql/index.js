import { useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/servicefee/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getServiceFeeList = (variables) => useLazyQuery(Schema.getServiceFeeList, {
    variables, ...context, ...fetchPolicy,
});

export const saveServiceFee = (variables) => useMutation(Schema.saveServiceFee, {
    variables, ...context,
});

export default {
    getServiceFeeList,
    saveServiceFee,
};
