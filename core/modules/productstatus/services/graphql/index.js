import { useLazyQuery } from '@apollo/client';
import * as Schema from '@modules/productstatus/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getMarketplaceProductStatusList = (variables) => useLazyQuery(Schema.getMarketplaceProductStatusList, {
    variables, ...context, ...fetchPolicy,
});

export default {
    getMarketplaceProductStatusList,
};
