import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/virtualstock/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getVirtualStockList = (variables) => useLazyQuery(Schema.getVirtualStockList, {
    variables, ...context, ...fetchPolicy,
});

export const getVirtualStockById = (variables) => useQuery(Schema.getVirtualStockById, {
    variables, ...context, ...fetchPolicy,
});

export const createVirtualStock = (variables) => useMutation(Schema.createVirtualStock, {
    variables, ...context,
});

export const updateVirtualStock = (variables) => useMutation(Schema.updateVirtualStock, {
    variables, ...context,
});
export const getChannelList = (variables) => useLazyQuery(Schema.getChannelList, {
    variables, ...context, ...fetchPolicy,
});
export const getLocationList = (variables) => useLazyQuery(Schema.getLocationList, {
    variables, ...context, ...fetchPolicy,
});

export const deleteVirtualStock = (variables) => useMutation(Schema.deleteVirtualStock, {
    variables, ...context,
});
export const multideleteVirtualStock = (variables) => useMutation(Schema.multideleteVirtualStock, {
    variables, ...context,
});

export default {
    getVirtualStockList,
    getVirtualStockById,
    createVirtualStock,
    updateVirtualStock,
    getChannelList,
    getLocationList,
    deleteVirtualStock,
    multideleteVirtualStock,
};
