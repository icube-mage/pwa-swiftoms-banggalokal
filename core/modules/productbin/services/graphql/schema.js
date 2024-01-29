import { gql } from '@apollo/client';

export const getProductBinList = gql`
    query getProductBinList($pageSize: Int!, $currentPage: Int!, $filter: ProductBinFilterInput, $sort: ProductBinSortInput) {
        getProductBinList(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort) {
            items {
                entity_id
                loc_id
                loc_name
                sku
                bin_code
                sort_no
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

export const importProductBin = gql`
    mutation importProductBin($binary: String!) {
        importProductBin(input: { binary: $binary }) {
            attachment_url
            is_success
        }
    }
`;

export const downloadSampleCsvBinBySKU = gql`
    mutation {
        downloadSampleCsv(type: "product_bin_by_sku")
    }
`;
export const downloadSampleCsvBinBySKULoc = gql`
    mutation {
        downloadSampleCsv(type: "product_bin_by_sku_location")
    }
`;

export const massDeleteProductBin = gql`
    mutation massDeleteProductBin($id: [Int!]!) {
        massDeleteProductBin(id: $id)
    }
`;

export const getActivity = gql`
    query getActivity($code: String!, $by_session: Boolean!) {
        getActivity(code: $code, by_session: $by_session) {
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
            run_by_name
            attachment
            error_message
        }
    }
`;

export default {
    getProductBinList,
    importProductBin,
    downloadSampleCsvBinBySKU,
    downloadSampleCsvBinBySKULoc,
    massDeleteProductBin,
    getActivity,
};
