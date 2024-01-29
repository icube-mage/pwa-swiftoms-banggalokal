import { gql } from '@apollo/client';

export const getSourceList = gql`
    query getSourceList($pageSize: Int!, $currentPage: Int!, $filter: SourceFilterInput, $sort: SourceSortInput, $search: String) {
        getSourceList(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort, search: $search) {
            items {
                source_id
                loc_id
                loc_name
                sku
                qty_total
                qty_reserved
                qty_incoming
                qty_saleable
                qty_buffer
                priority
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

export const getSourceById = gql`
    query getSourceById($id: Int!) {
        getSourceById(id: $id) {
            source_id
            loc_name
            sku
            qty_total
            qty_reserved
            qty_incoming
            qty_saleable
            qty_buffer
            priority
        }
    }
`;

export const createSource = gql`
    mutation createSource($binary: String!) {
        createSource(input: { binary: $binary }) {
            is_success
            attachment_url
        }
    }
`;

export const updateSource = gql`
    mutation updateSource($binary: String!) {
        updateSource(input: { binary: $binary }) {
            is_success
            attachment_url
        }
    }
`;

export const downloadSampleCsv = gql`
    mutation downloadSampleCsv($type: String!) {
        downloadSampleCsv(type: $type)
    }
`;

export const downloadSource = gql`
    mutation downloadSource($location_id: Int!) {
        downloadSource(location_id: $location_id)
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

export const getLocationList = gql`
    query getLocationList($pageSize: Int!, $currentPage: Int!, $filter: LocationFilterInput, $sort: LocationSortInput, $search: String) {
        getLocationList(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort, search: $search) {
            items {
                loc_id
                loc_name
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

export const updateSourceById = gql`
mutation updateSourceById($input: UpdateSourceInput!) {
    updateSourceById(input: $input) {
      company_id
      company_name
      loc_id
      loc_name
      priority
      qty_buffer
      qty_incoming
      qty_reserved
      qty_saleable
      qty_total
      sku
      source_id
    }
  }
`;

export default {
    getSourceList,
    getSourceById,
    createSource,
    downloadSampleCsv,
    downloadSource,
    getActivity,
    updateSource,
    getLocationList,
    updateSourceById,
};
