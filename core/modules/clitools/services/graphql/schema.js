import { gql } from '@apollo/client';

export const getQueueList = gql`
    query getQueueList(
        $pageSize: Int!,
        $currentPage: Int!,
        $filter: QueueFilterInput,
        $sort: QueueSortInput
    ){
        getQueueList(
            pageSize: $pageSize,
            currentPage: $currentPage
            filter: $filter
            sort: $sort
        ){
            items {
                id
                title
                status
                created_at
                execute_at
                finish_at
                command
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

export const getIcubeCommandLineList = gql`
    query{
        getIcubeCommandLineList{
            entity_id
            command
            title
        }
    }
`;

export const addQueueJob = gql`
    mutation addQueueJob(
        $entity_id: Int!,
        $additional: String
    ){
        addQueueJob(
            input: {
                entity_id: $entity_id,
                additional: $additional
            }
        ){
            entity_id
        }
    }
`;

export const getJobStatusOptions = gql`
query{
    getJobStatusOptions{
      label
      value
    }
  }
`;

export default {
    getQueueList,
    getIcubeCommandLineList,
    addQueueJob,
    getJobStatusOptions,
};
