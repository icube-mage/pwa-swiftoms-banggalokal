import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/orderqueue/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getOrderQueueList = (variables) => useLazyQuery(Schema.getOrderQueueList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getOrderQueueById = (variables) => useQuery(Schema.getOrderQueueById, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const setReallocation = (options) => useMutation(Schema.setReallocation, {
    ...options,
    ...context,
});

export const exportOrderToCsv = (options) => useLazyQuery(Schema.exportOrderToCsv, {
    ...options,
    ...context,
    ...fetchPolicy,
});

export const bulkOrderReallocation = (variables) => useMutation(Schema.bulkOrderReallocation, {
    variables,
    ...context,
});

export const downloadSampleCsv = (variables) => useMutation(Schema.downloadSampleCsv, {
    variables,
    ...context,
});

export const orderImport = (variables) => useMutation(Schema.orderImport, {
    variables,
    ...context,
});

export const acceptMarketplaceOrderQueue = (variables) => useMutation(Schema.acceptMarketplaceOrderQueue, {
    variables,
    ...context,
});

export const getActivity = (options) => useLazyQuery(Schema.getActivity, {
    ...context,
    ...options,
    fetchPolicy: 'no-cache',
});

export const marketplaceFetchOrder = (variables) => useMutation(Schema.marketplaceFetchOrder, {
    variables,
    ...context,
});

export const editOrderItem = (variables) => useMutation(Schema.editOrderItem, {
    variables,
    ...context,
});

export const cancelOrder = (variables) => useMutation(Schema.cancelOrder, {
    variables,
    ...context,
});

export const getLocationOptions = (options) => useLazyQuery(Schema.getLocationOptions, {
    ...options,
    ...context,
    ...fetchPolicy,
});

export const getUniqueProductFromSource = (variables) => useLazyQuery(Schema.getUniqueProductFromSource, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getLocationBySourceAndChannel = (variables) => useLazyQuery(Schema.getLocationBySourceAndChannel, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getHistoryOrderItemList = (variables) => useLazyQuery(Schema.getHistoryOrderItemList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getPaymentByOrderId = (variables) => useLazyQuery(Schema.getPaymentByOrderId, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const paymentApproval = (variables) => useMutation(Schema.paymentApproval, {
    variables,
    ...context,
});

export const getShipmentList = (variables) => useLazyQuery(Schema.getShipmentList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getSalesOrderList = (variables) => useLazyQuery(Schema.getSalesOrderList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getSalesOrderById = (variables) => useQuery(Schema.getSalesOrderById, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const editSalesOrderItem = (variables) => useMutation(Schema.editSalesOrderItem, {
    variables,
    ...context,
});

export const setOrderAsNew = (options) => useMutation(Schema.setOrderAsNew, {
    ...options,
    ...context,
});

export default {
    getOrderQueueList,
    getOrderQueueById,
    setReallocation,
    exportOrderToCsv,
    bulkOrderReallocation,
    downloadSampleCsv,
    orderImport,
    acceptMarketplaceOrderQueue,
    getActivity,
    marketplaceFetchOrder,
    editOrderItem,
    cancelOrder,
    getLocationOptions,
    getUniqueProductFromSource,
    getLocationBySourceAndChannel,
    getHistoryOrderItemList,
    getPaymentByOrderId,
    paymentApproval,
    getShipmentList,
    getSalesOrderList,
    getSalesOrderById,
    editSalesOrderItem,
    setOrderAsNew,
};
