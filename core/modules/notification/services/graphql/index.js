import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/notification/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getNotificationList = (variables) => useLazyQuery(Schema.getNotificationList, {
    variables, ...context, ...fetchPolicy,
});

export const getNotificationById = (variables) => useQuery(Schema.getNotificationById, {
    variables, ...context, ...fetchPolicy,
});

export const multiReadNotification = (variables) => useMutation(Schema.multiReadNotification, {
    variables, ...context,
});

export const readAllNotification = (variables) => useMutation(Schema.readAllNotification, {
    variables,
    ...context,
});

export default {
    getNotificationList,
    getNotificationById,
    multiReadNotification,
    readAllNotification,
};
