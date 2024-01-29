import { gql } from '@apollo/client';

export const getSellerNotifications = gql`
    query getSellerNotifications(
        $pageSize: Int!,
        $currentPage: Int!,
        $filter: NotificationFilterInput,
        $sort: NotificationSortInput,
        $search: String
    ){
        getSellerNotifications(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter: $filter,
            sort: $sort,
            search: $search,
        ){
            items {
                attachment
                category
                category_ref_id
                created_at
                customer_id
                entity_type
                id
                is_read
                message
                status
                type
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

export const sellerNotificationRead = gql`
    mutation sellerNotificationRead (
        $ids: [Int]
    ){
        sellerNotificationRead(
            ids: $ids
        )
    }
`;

export default {
    getSellerNotifications,
    sellerNotificationRead,
};
