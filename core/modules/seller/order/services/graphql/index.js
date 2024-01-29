import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@sellermodules/order/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getSellerOrders = (variables) => useLazyQuery(Schema.getSellerOrders, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getSellerOrder = (variables) => useQuery(Schema.getSellerOrder, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const printSellerOrderLabel = (variables) => useQuery(Schema.printSellerOrderLabel, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const printSellerInvoice = (variables) => useQuery(Schema.printSellerInvoice, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const sellerCanceled = (variables) => useMutation(Schema.sellerCanceled, {
    variables,
    ...context,
});

export const sellerConfirm = (variables) => useMutation(Schema.sellerConfirm, {
    variables,
    ...context,
});

export const sellerBookCourier = (variables) => useMutation(Schema.sellerBookCourier, {
    variables,
    ...context,
});

export const sellerReadyforShip = (variables) => useMutation(Schema.sellerReadyforShip, {
    variables,
    ...context,
});

export const sellerOrderDelivered = (variables) => useMutation(Schema.sellerOrderDelivered, {
    variables,
    ...context,
});

export const getGenerateAwbMethod = (variables) => useQuery(Schema.getGenerateAwbMethod, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const sellerOrderInDelivery = (variables) => useMutation(Schema.sellerOrderInDelivery, {
    variables,
    ...context,
});

export const downloadSellerOrderReport = (variables) => useMutation(Schema.downloadSellerOrderReport, {
    variables,
    ...context,
});

export const getSellerStoreOptions = (variables) => useQuery(Schema.getSellerStoreOptions, {
    variables, ...context, ...fetchPolicy,
});

export const sellerCancelDelivery = (variables) => useMutation(Schema.sellerCancelDelivery, {
    variables,
    ...context,
});

export const getPickupTimeslots = (options) => useLazyQuery(Schema.getPickupTimeslots, {
    ...options,
    ...context,
    ...fetchPolicy,
});

export default {
    getSellerOrders,
    getSellerOrder,
    printSellerOrderLabel,
    printSellerInvoice,
    sellerCanceled,
    sellerConfirm,
    sellerBookCourier,
    sellerReadyforShip,
    sellerOrderDelivered,
    getGenerateAwbMethod,
    sellerOrderInDelivery,
    downloadSellerOrderReport,
    getSellerStoreOptions,
    sellerCancelDelivery,
    getPickupTimeslots,
};
