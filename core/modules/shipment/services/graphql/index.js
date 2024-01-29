import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/shipment/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getShipmentList = (variables) => useLazyQuery(Schema.getShipmentList, {
    variables, ...context, ...fetchPolicy,
});

export const getShipmentById = (variables) => useQuery(Schema.getShipmentById, {
    variables, ...context, ...fetchPolicy,
});

export const confirmShipment = (options) => useMutation(Schema.confirmShipment, {
    ...options, ...context,
});

export const cantFulfillShipment = (variables) => useMutation(Schema.cantFulfillShipment, {
    variables, ...context,
});

export const getShipmentStatus = (variables) => useQuery(Schema.getShipmentStatus, {
    variables, ...context, ...fetchPolicy,
});

export const saveShipmentNotes = (variables) => useMutation(Schema.saveShipmentNotes, {
    variables, ...context,
});

export const getShipmentAvailableCompany = (variables) => useQuery(Schema.getShipmentAvailableCompany, {
    variables, ...context, ...fetchPolicy,
});

export const getShipmentAvailableLocation = (options) => useLazyQuery(Schema.getShipmentAvailableLocation, {
    ...options, ...context, ...fetchPolicy,
});

export const getShipmentAvailableLocationSku = (variables) => useLazyQuery(Schema.getShipmentAvailableLocationSku, {
    variables, ...context, ...fetchPolicy,
});

export const shipmentRellocation = (variables) => useMutation(Schema.shipmentRellocation, {
    variables, ...context,
});

export default {
    getShipmentList,
    getShipmentById,
    confirmShipment,
    cantFulfillShipment,
    getShipmentStatus,
    saveShipmentNotes,
    getShipmentAvailableCompany,
    getShipmentAvailableLocation,
    getShipmentAvailableLocationSku,
    shipmentRellocation,

};
