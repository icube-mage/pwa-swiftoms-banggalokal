import { useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@sellermodules/notification/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getSellerNotifications = (variables) => useLazyQuery(Schema.getSellerNotifications, {
    variables, ...context, ...fetchPolicy,
});

export const sellerNotificationRead = (variables) => useMutation(Schema.sellerNotificationRead, {
    variables, ...context,
});

export default {
    getSellerNotifications,
    sellerNotificationRead,
};
