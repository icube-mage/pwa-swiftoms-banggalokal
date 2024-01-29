import { gql } from '@apollo/client';

export const getAcceptanceDeadlineList = gql`
  query getAcceptanceDeadlineList (
      $filter: AcceptanceDeadlineFilterInput
      $sort: AcceptanceDeadlineSortInput
      $pageSize: Int
      $currentPage: Int
    ) {
      getAcceptanceDeadlineList(
        filter: $filter
        sort: $sort
        pageSize: $pageSize
        currentPage: $currentPage
      ) {
        items {
          channel_code
          deadline
          id
          shipping_method
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

export const deleteAcceptanceDeadline = gql`
  mutation deleteAcceptanceDeadline($id: [Int!]!){
    deleteAcceptanceDeadline(id: $id)
  }
`;

export const getAcceptanceDeadlineById = gql`
  query getAcceptanceDeadlineById($id: Int!) {
    getAcceptanceDeadlineById(id: $id) {
      channel_code
      deadline
      id
      shipping_method
    }
}
`;

export const createAcceptanceDeadline = gql`
  mutation createAcceptanceDeadline($input: AcceptanceDeadlineInput!){
    createAcceptanceDeadline(input: $input) {
      channel_code
      deadline
      id
      shipping_method
    }
  }
`;

export const updateAcceptanceDeadline = gql`
  mutation updateAcceptanceDeadline($id: Int!, $input: AcceptanceDeadlineInput!){
    updateAcceptanceDeadline(id: $id, input: $input) {
      channel_code
      deadline
      id
      shipping_method
    }
  }
`;

export const getChannelList = gql`
    query getChannelList($pageSize: Int, $currentPage: Int!, $filter: ChannelFilterInput, $sort: ChannelSortInput, $search: String) {
        getChannelList(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort, search: $search) {
            items {
                channel_id
                channel_code
                channel_name
                channel_url
                token
                framework
                rule_type
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

export const downloadSampleCsv = gql`
    mutation downloadSampleCsv($type: String!) {
        downloadSampleCsv(type: $type)
    }
`;

export const getActivity = gql`
    query getActivity($code: String!) {
        getActivity(code: $code, by_session: true) {
            activity_id
            activity_code
            run_status
            data_total
            data_processed
            started_at
            snapshot_at
            finished_at
            run_by
            run_type
            attachment
            error_message
        }
    }
`;

export const bulkCreateAcceptanceDeadline = gql`
    mutation bulkCreateAcceptanceDeadline($binary: String!) {
        bulkCreateAcceptanceDeadline(input: { binary: $binary }) {
            is_success
            attachment_url
        }
    }
`;

export default {
    getAcceptanceDeadlineList,
    deleteAcceptanceDeadline,
    getAcceptanceDeadlineById,
    createAcceptanceDeadline,
    updateAcceptanceDeadline,
    getChannelList,
    downloadSampleCsv,
    getActivity,
    bulkCreateAcceptanceDeadline,
};
