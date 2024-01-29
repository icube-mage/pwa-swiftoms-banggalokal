import { gql } from '@apollo/client';

export const getOrderFailedReasonList = gql`
    query getOrderFailedReasonList($pageSize: Int, $currentPage: Int, $filter: OrderFailedReasonFilterInput, $sort: OrderFailedReasonSortInput) {
        getOrderFailedReasonList(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort) {
            items {
                actions {
                    action_id
                    action_value
                    store_id
                    store_name
                }
                reason_code
                reason_label
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

export const updateOrderFailedReason = gql`
    mutation updateOrderFailedReason($input: OrderFailedReasonInput) {
        updateOrderFailedReason(input: $input) {
            actions {
                action_id
                action_value
                reason_code
                store_id
                store_name
            }
            reason_code
            reason_label
        }
    }
`;

export const availableStores = gql`
    query AvailableStores {
        availableStores {
            id
            store_code
            store_name
            locale
            is_default_store
        }
    }
`;

export default {
    getOrderFailedReasonList,
    updateOrderFailedReason,
    availableStores,
};
