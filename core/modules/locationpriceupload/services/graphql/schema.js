import { gql } from '@apollo/client';

export const uploadPriceLocation = gql`
    mutation uploadPriceLocation($binary: String!) {
        uploadPriceLocation(input: { binary: $binary }) {
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

export const getPriceLocationList = gql`
    query getPriceLocationList(
        $pageSize: Int!
        $currentPage: Int!
        $filter: PriceLocationFilterInput
        $sort: PriceLocationSortInput
        $search: String
    ) {
        getPriceLocationList(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort, search: $search) {
            items {
                company_id
                company_name
                loc_id
                loc_name
                channel_id
                channel_name
                price
                entity_id
                sku
                special_from_date
                special_price
                special_to_date
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

export const getActivity = gql`
    query {
        getActivity(code: "upload_price", by_session: true) {
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

export const deleteProductPrice = gql`
    mutation deleteProductPrice($id: [Int!]!) {
        deleteProductPrice(id: $id)
    }
`;

export default {
    uploadPriceLocation,
    downloadSampleCsv,
    getPriceLocationList,
    getActivity,
    deleteProductPrice,
};
