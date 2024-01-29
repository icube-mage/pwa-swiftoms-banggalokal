import { useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/productpromo/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getMarketplaceProductPromoList = (variables) => useLazyQuery(Schema.getMarketplaceProductPromoList, {
    variables, ...context, ...fetchPolicy,
});

export const getMarketplaceProductPromoItemsList = (variables) => useLazyQuery(Schema.getMarketplaceProductPromoItemsList, {
    variables, ...context, ...fetchPolicy,
});

export const updateMarketplaceProductPromoToMp = (variables) => useMutation(Schema.updateMarketplaceProductPromoToMp, {
    variables, ...context,
});

export default {
    getMarketplaceProductPromoList,
    getMarketplaceProductPromoItemsList,
    updateMarketplaceProductPromoToMp,
};
