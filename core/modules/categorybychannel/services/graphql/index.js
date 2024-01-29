import { useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/categorybychannel/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getCategoryByChannelList = (variables) => useLazyQuery(Schema.getCategoryByChannelList, {
    variables, ...context, ...fetchPolicy,
});

export const vendorCategoryUpload = (variables) => useMutation(Schema.vendorCategoryUpload, {
    variables, ...context,
});

export const downloadSampleCsv = (variables) => useMutation(Schema.downloadSampleCsv, {
    variables, ...context,
});

export default {
    getCategoryByChannelList,
    vendorCategoryUpload,
    downloadSampleCsv,
};
