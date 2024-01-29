import { gql } from '@apollo/client';

export const getCancelReasonList = gql`
    query getCancelReasonList($pageSize: Int!, $currentPage: Int!, $filter: CancelReasonFilterInput, $sort: CancelReasonSortInput) {
        getCancelReasonList(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort) {
            items {
                entity_id
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

export const getCancelReasonById = gql`
    query getCancelReasonById($id: Int!) {
        getCancelReasonById(id: $id) {
            entity_id
            reason_code
            reason_label
        }
    }
`;

export const createCancelReason = gql`
    mutation createCancelReason($reason_code: String!, $reason_label: String) {
        createCancelReason(
            input: {
                reason_code: $reason_code
                reason_label: $reason_label
            }
        ) {
            entity_id
            reason_code
            reason_label
        }
    }
`;

export const updateCancelReason = gql`
    mutation updateCancelReason($id: Int!, $reason_code: String!, $reason_label: String) {
        updateCancelReason(
            id: $id
            input: {
                reason_code: $reason_code
                reason_label: $reason_label
            }
        ) {
            entity_id
            reason_code
            reason_label
        }
    }
`;

export const deleteCancelReason = gql`
    mutation deleteCancelReason($id: [Int!]!) {
        deleteCancelReason(id: $id)
    }
`;

export default {
    getCancelReasonList,
    getCancelReasonById,
    createCancelReason,
    updateCancelReason,
    deleteCancelReason,
};
