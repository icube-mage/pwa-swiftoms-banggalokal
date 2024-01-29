import { useQuery } from '@apollo/client';
import * as Schema from '@sellermodules/creditmemo/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getSellerCreditMemoById = (variables) => useQuery(Schema.getSellerCreditMemoById, {
    variables,
    ...context,
    ...fetchPolicy,
});

export default {
    getSellerCreditMemoById,
};
