import { gql } from '@apollo/client';

export const createInformationUpdate = gql`
  mutation createInformationUpdate($message: InformationUpdateInput){
    createInformationUpdate(message: $message) {
        result
        status
    }
  }
`;

export const getInformationUpdateList = gql`
    query getInformationUpdateList (
        $pageSize: Int
        $currentPage: Int
        $filter: InformationUpdateFilterInput
        $sort: InformationUpdateSortInput
    ) {
        getInformationUpdateList(
            pageSize: $pageSize
            currentPage: $currentPage
            filter: $filter
            sort: $sort
        ) {
            items {
                content
                entity_id
                firebase_response
                image
                inserted_at
                path
                short_content
                title
                topic
            }
            page_info {
                current_page
                page_size
                total_pages
            }
            total_count
        }
    }
`;

export const deleteInformationUpdate = gql`
    mutation deleteInformationUpdate($id: [Int!]!) {
        deleteInformationUpdate(id: $id)
    }
`;

export default {
    createInformationUpdate,
    getInformationUpdateList,
    deleteInformationUpdate,
};
