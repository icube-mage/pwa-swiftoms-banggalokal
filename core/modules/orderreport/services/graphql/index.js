import { useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/orderreport/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getSalesOrderReport = (options) => useLazyQuery(Schema.getSalesOrderReport, {
    ...options, ...context, ...fetchPolicy,
});

export const generateSalesOrderReport = (options) => useMutation(Schema.generateSalesOrderReport, {
    ...options, ...context,
});

export default {
    getSalesOrderReport,
    generateSalesOrderReport,
};
