import { gql } from '@apollo/client';

export const getNotificationList = gql`
    query getNotificationList(
        $pageSize: Int!,
        $currentPage: Int!,
        $filter: NotificationFilterInput,
        $sort: NotificationSortInput,
    ){
        getNotificationList(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter: $filter,
            sort: $sort,
        ){
            items {
                id
                created_at
                entity_type
                status
                message
                attachment
                is_read
            }
            total_count
            page_info {
                page_size
                current_page
                total_pages
            }
        }
    }
`;

export const getNotificationById = gql`
    query getNotificationById(
        $id: Int!,
    ){
        getNotificationById(
            id: $id
        ){
            id
            created_at
            entity_type
            status
            message
            attachment
        }
    }
`;

export const multiReadNotification = gql`
    mutation multiReadNotification (
        $id: [Int!]!
    ){
        multireadNotification(
            id: $id
        )
    }
`;

export const readAllNotification = gql`
    mutation readAllNotification {
        readAllNotification
    }
`;

export default {
    getNotificationList,
    getNotificationById,
    multiReadNotification,
    readAllNotification,
};
