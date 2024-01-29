import { useLazyQuery } from '@apollo/client';
import * as Schema from '@modules/attributesetmapping/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getCompanyList = (variables) => useLazyQuery(Schema.getCompanyList, {
    variables, ...context, ...fetchPolicy,
});

export default {
    getCompanyList,
};
