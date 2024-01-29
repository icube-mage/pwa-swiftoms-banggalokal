import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/storepickup/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getStoreShipmentList = (variables) => useLazyQuery(Schema.getStoreShipmentList, {
    variables, ...context, ...fetchPolicy,
});

export const getShipmentById = (variables) => useQuery(Schema.getShipmentById, {
    variables, ...context, ...fetchPolicy,
});

export const confirmShipment = (options) => useMutation(Schema.confirmShipmentPickup, {
    ...options, ...context,
});

export const cantFulfillShipment = (variables) => useMutation(Schema.cantFulfillShipmentPickup, {
    variables, ...context,
});

export const pickShipment = (options) => useMutation(Schema.pickShipmentPickup, {
    ...options, ...context,
});

export const packShipment = (options) => useMutation(Schema.packShipmentPickup, {
    ...options, ...context,
});

export const pickedupShipment = (variables) => useMutation(Schema.pickedupShipment, {
    variables, ...context,
});

export const saveShipmentNotes = (variables) => useMutation(Schema.saveShipmentNotes, {
    variables, ...context,
});

export const getShipmentStatusByType = (variables) => useQuery(Schema.getShipmentStatusByType, {
    variables, ...context, ...fetchPolicy,
});

export const getStoreConfig = (variables) => useQuery(Schema.getStoreConfig, {
    variables, ...context, ...fetchPolicy,
});

export const canceledShipment = (variables) => useMutation(Schema.canceledShipment, {
    variables, ...context,
});

export default {
    getStoreShipmentList,
    getShipmentById,
    confirmShipment,
    cantFulfillShipment,
    pickShipment,
    packShipment,
    pickedupShipment,
    saveShipmentNotes,
    getShipmentStatusByType,
    getStoreConfig,
    canceledShipment,
};
