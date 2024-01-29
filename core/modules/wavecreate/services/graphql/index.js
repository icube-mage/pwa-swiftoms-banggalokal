import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import * as Schema from '@modules/wavecreate/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getSummaryShipmentToPick = (variables) => useQuery(Schema.getSummaryShipmentToPick, {
    variables, ...context, ...fetchPolicy,
});

export const createPickByWave = (variables) => useMutation(Schema.createPickByWave, {
    variables, ...context,
});

export const getStoreShipmentList = (variables) => useLazyQuery(Schema.getStoreShipmentList, {
    variables, ...context, ...fetchPolicy,
});

export default {
    getSummaryShipmentToPick,
    createPickByWave,
    getStoreShipmentList,
};
