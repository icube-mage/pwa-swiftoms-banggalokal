import { useLazyQuery } from '@apollo/client';
import * as Schema from '@modules/exportorder/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getOrderReportCsv = (options) => useLazyQuery(Schema.getOrderReportCsv, {
    ...options, ...context, ...fetchPolicy,
});

export const getOrderReportPdf = (options) => useLazyQuery(Schema.getOrderReportPdf, {
    ...options, ...context, ...fetchPolicy,
});

export default {
    getOrderReportCsv,
    getOrderReportPdf,
};
