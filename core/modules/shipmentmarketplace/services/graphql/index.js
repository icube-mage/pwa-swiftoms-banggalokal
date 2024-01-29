import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/shipmentmarketplace/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getStoreShipmentList = (variables) => useLazyQuery(Schema.getStoreShipmentList, {
    variables, ...context, ...fetchPolicy,
});

export const getStoreShipmentById = (variables) => useQuery(Schema.getStoreShipmentById, {
    variables, ...context, ...fetchPolicy,
});

export const confirmMarketplaceShipment = (options) => useMutation(Schema.confirmMarketplaceShipment, {
    ...options, ...context,
});

export const cantFulfillShipment = (variables) => useMutation(Schema.cantFulfillShipment, {
    variables, ...context,
});

export const pickShipment = (options) => useMutation(Schema.pickShipment, {
    ...options, ...context,
});

export const canceledMarketplaceShipment = (variables) => useMutation(Schema.canceledMarketplaceShipment, {
    variables, ...context,
});

export const packShipment = (options) => useMutation(Schema.packShipment, {
    ...options, ...context,
});

export const shippedMarketplaceShipment = (variables) => useMutation(Schema.shippedMarketplaceShipment, {
    variables, ...context,
});

export const deliveredShipment = (variables) => useMutation(Schema.deliveredShipment, {
    variables, ...context,
});

export const exportStoreShipmentToCsv = (options) => useLazyQuery(Schema.exportStoreShipmentToCsv, {
    ...options, ...context, ...fetchPolicy,
});

export const saveShipmentNotes = (variables) => useMutation(Schema.saveShipmentNotes, {
    variables, ...context,
});

export const getCourierOption = (variables) => useLazyQuery(Schema.getCourierOption, {
    variables, ...context, ...fetchPolicy,
});

export const getMarketplaceCancelReason = (variables) => useLazyQuery(Schema.getMarketplaceCancelReason, {
    variables, ...context, ...fetchPolicy,
});

export const bulkShippedMarketplaceShipment = (variables) => useMutation(Schema.bulkShippedMarketplaceShipment, {
    variables, ...context,
});

export const bulkConfirmedMarketplaceShipment = (variables) => useMutation(Schema.bulkConfirmedMarketplaceShipment, {
    variables, ...context,
});

export const getExportStatusHistory = (options) => useLazyQuery(Schema.getExportStatusHistory, {
    ...options, ...context,
});

export const getActivity = (options) => useLazyQuery(Schema.getActivity, {
    ...context,
    ...options,
    fetchPolicy: 'no-cache',
});

export const getShipmentStatusByType = (variables) => useQuery(Schema.getShipmentStatusByType, {
    variables, ...context, ...fetchPolicy,
});

export const getStoreConfig = (variables) => useQuery(Schema.getStoreConfig, {
    variables, ...context, ...fetchPolicy,
});

export const bulkPortCodeUpload = (variables) => useMutation(Schema.bulkPortCodeUpload, {
    variables, ...context,
});

export default {
    getStoreShipmentList,
    getStoreShipmentById,
    confirmMarketplaceShipment,
    cantFulfillShipment,
    pickShipment,
    canceledMarketplaceShipment,
    packShipment,
    shippedMarketplaceShipment,
    deliveredShipment,
    exportStoreShipmentToCsv,
    saveShipmentNotes,
    getCourierOption,
    getMarketplaceCancelReason,
    bulkShippedMarketplaceShipment,
    bulkConfirmedMarketplaceShipment,
    getExportStatusHistory,
    getActivity,
    getShipmentStatusByType,
    getStoreConfig,
    bulkPortCodeUpload,
};
