import { useMutation, useLazyQuery } from '@apollo/client';
import * as Schema from '@sellermodules/register/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

export const createSeller = (variables) => useMutation(Schema.createSeller, {
    variables, ...context,
});

export const checkIfSellerEmailExist = (variables) => useLazyQuery(Schema.checkIfSellerEmailExist, {
    variables,
    fetchPolicy: 'cache-and-network',
    ...context,
});

export default {
    createSeller,
    checkIfSellerEmailExist,
};
