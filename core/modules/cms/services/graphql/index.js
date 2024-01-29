import { useQuery } from '@apollo/client';
import * as Schema from '@modules/cms/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getCmsPage = (variables) => useQuery(Schema.getCmsPage, {
    variables, ...context, ...fetchPolicy,
});

export default { getCmsPage };
