import { gql } from '@apollo/client';

export const getZoneList = gql`
    query getZoneList($pageSize: Int!, $currentPage: Int!, $filter: ZoneFilterInput, $sort: ZoneSortInput) {
        getZoneList(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort) {
            items {
                id
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

export const getZoneById = gql`
    query getZoneById($id: Int!) {
        getZoneById(id: $id) {
            id
            zone
        }
    }
`;

export const createZone = gql`
    mutation createZone($zone: String!) {
        createZone(
            zone: $zone
        ) {
            id
            zone
        }
    }
`;

export const updateZone = gql`
    mutation updateZone($id: Int!, $zone: String!) {
        updateZone(
            id: $id
            zone: $zone
        ) {
            id
            zone
        }
    }
`;

export const deleteZone = gql`
    mutation deleteZone($id: [Int!]!) {
        deleteZone(id: $id)
    }
`;

export const bulkCreateZone = gql`
    mutation bulkCreateZone($binary: String!) {
        bulkCreateZone(input: { binary: $binary }) {
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
        getActivity(code: "import_zone", by_session: true) {
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

export default {
    getZoneList,
    getZoneById,
    createZone,
    updateZone,
    deleteZone,
    bulkCreateZone,
    downloadSampleCsv,
    getActivity,
};
