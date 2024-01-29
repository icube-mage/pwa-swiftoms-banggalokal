import { useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/productprice/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getMarketplaceProductPriceList = (variables) => useLazyQuery(Schema.getMarketplaceProductPriceList, {
    variables, ...context, ...fetchPolicy,
});

export const downloadSampleCsv = (variables) => useMutation(Schema.downloadSampleCsv, {
    variables,
    ...context,
});

export const importMarketplaceProductPrice = (variables) => useMutation(Schema.importMarketplaceProductPrice, {
    variables,
    ...context,
});

export const updateMarketplaceProductPriceToMp = (variables) => useMutation(Schema.updateMarketplaceProductPriceToMp, {
    variables,
    ...context,
});

export const deleteProductPrice = (variables) => useMutation(Schema.deleteProductPrice, {
    variables,
    ...context,
});

export default {
    getMarketplaceProductPriceList,
    downloadSampleCsv,
    importMarketplaceProductPrice,
    updateMarketplaceProductPriceToMp,
    deleteProductPrice,
};
