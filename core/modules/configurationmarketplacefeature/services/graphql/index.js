import { useQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/configurationmarketplacefeature/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getMarketplaceFeatureList = (variables) => useQuery(Schema.getMarketplaceFeatureList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const addMarketplaceFeature = (variables) => useMutation(Schema.addMarketplaceFeature, {
    variables,
    ...context,
});

export default {
    getMarketplaceFeatureList,
    addMarketplaceFeature,
};
