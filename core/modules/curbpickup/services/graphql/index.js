import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/curbpickup/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getStoreShipmentById = (variables) => useQuery(Schema.getStoreShipmentById, {
    variables, ...context, ...fetchPolicy,
});

export const getStoreShipmentList = (variables) => useLazyQuery(Schema.getStoreShipmentList, {
    variables, ...context, ...fetchPolicy,
});

export const confirmShipment = (options) => useMutation(Schema.confirmShipment, {
    ...options, ...context,
});

export const cantFulfillShipment = (variables) => useMutation(Schema.cantFulfillShipment, {
    variables, ...context,
});

export const pickShipment = (options) => useMutation(Schema.pickShipment, {
    ...options, ...context,
});

export const packShipment = (options) => useMutation(Schema.packShipment, {
    ...options, ...context,
});

export const pickedupShipment = (options) => useMutation(Schema.pickedupShipment, {
    ...options, ...context,
});

export const getPickList = (variables) => useQuery(Schema.getPickList, {
    variables, ...context, ...fetchPolicy,
});

export const getPackList = (variables) => useQuery(Schema.getPackList, {
    variables, ...context, ...fetchPolicy,
});

export const getShipmentStatusByType = (variables) => useQuery(Schema.getShipmentStatusByType, {
    variables, ...context, ...fetchPolicy,
});

export default {
    getStoreShipmentById,
    getStoreShipmentList,
    confirmShipment,
    cantFulfillShipment,
    pickShipment,
    packShipment,
    pickedupShipment,
    getPickList,
    getPackList,
    getShipmentStatusByType,
};
