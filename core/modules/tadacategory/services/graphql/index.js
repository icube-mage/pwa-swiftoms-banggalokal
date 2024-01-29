import { useLazyQuery } from '@apollo/client';
import * as Schema from '@modules/tadacategory/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getCategoryTadaList = (variables) => useLazyQuery(Schema.getCategoryTadaList, {
    variables, ...context, ...fetchPolicy,
});

export default {
    getCategoryTadaList,
};
