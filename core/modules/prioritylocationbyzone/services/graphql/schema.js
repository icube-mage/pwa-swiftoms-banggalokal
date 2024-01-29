import { gql } from '@apollo/client';

export const getPriorityZoneList = gql`
    query getPriorityZoneList($pageSize: Int!, $currentPage: Int!, $filter: PriorityZoneFilterInput, $sort: PriorityZoneSortInput) {
        getPriorityZoneList(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort) {
            items {
                id
                country_id
                country_name
                code
                region_name
                zone
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

export const getPriorityZoneById = gql`
    query getPriorityZoneById($id: Int!) {
        getPriorityZoneById(id: $id) {
            id
            country_id
            country_name
            code
            zone
        }
    }
`;

export const createPriorityZone = gql`
    mutation createPriorityZone($country_id: String!, $code: String!, $zone: String!) {
        createPriorityZone(
            input: {
                country_id: $country_id
                code: $code
                zone: $zone
            }
        ) {
            id
            country_id
            country_name
            code
            zone
        }
    }
`;

export const updatePriorityZone = gql`
    mutation updatePriorityZone($id: Int!, $country_id: String!, $code: String!, $zone: String!) {
        updatePriorityZone(
            id: $id
            input: {
                country_id: $country_id
                code: $code
                zone: $zone
            }
        ) {
            id
            country_id
            country_name
            code
            zone
        }
    }
`;

export const deletePriorityZone = gql`
    mutation deletePriorityZone($id: [Int!]!) {
        deletePriorityZone(id: $id)
    }
`;

export const uploadPriorityZone = gql`
    mutation uploadPriorityZone($binary: String!) {
        uploadPriorityZone(input: { binary: $binary }) {
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

export const getActivity = gql`
    query {
        getActivity(code: "import_priority_loc_by_zone", by_session: true) {
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

export const getZoneOptions = gql`
    query {
        getZoneOptions {
            value
            label
        }
    }
`;

export default {
    getPriorityZoneList,
    getPriorityZoneById,
    createPriorityZone,
    updatePriorityZone,
    deletePriorityZone,
    uploadPriorityZone,
    downloadSampleCsv,
    getActivity,
    getZoneOptions,
};
