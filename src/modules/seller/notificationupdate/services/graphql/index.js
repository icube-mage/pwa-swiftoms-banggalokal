import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import * as Schema from '@sellermodules/notificationupdate/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getInformationUpdateList = (variables) => useLazyQuery(Schema.getInformationUpdateList, {
    variables, ...context, ...fetchPolicy,
});

export const getInformationUpdateListQuery = (options) => useQuery(Schema.getInformationUpdateList, {
    ...options, ...context, ...fetchPolicy,
});

export const sellerNotificationRead = (variables) => useMutation(Schema.sellerNotificationRead, {
    variables, ...context,
});

export default {
    getInformationUpdateList,
    getInformationUpdateListQuery,
    sellerNotificationRead,
};
