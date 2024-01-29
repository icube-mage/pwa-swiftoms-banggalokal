import { gql } from '@apollo/client';

const bundleItems = `
    items {
        created_at
        entity_id
        items {
            qty
            sku
        }
        sku
        updated_at
        updated_by
    }
    total_count
    page_info {
        page_size
        current_page
        total_pages
    }
`;

export const getProductBundleList = gql`
    query getProductBundleList(
        $pageSize: Int,
        $currentPage: Int,
        $filter: ProductBundleFilterInput,
        $sort: ProductBundleSortInput,
    ){
        getProductBundleList(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter: $filter,
            sort: $sort,
        ){
            ${bundleItems}
        }
    }
`;

export const deleteProductBundle = gql`
    mutation deleteProductBundle($id: [Int!]!) {
        deleteProductBundle(id: $id)
    }
`;

export const importProductBundle = gql`
    mutation importProductBundle($binary: String!) {
        importProductBundle(input: { binary: $binary }) {
            attachment_url
            is_success
        }
    }
`;

export const downloadSampleCsv = gql`
    mutation downloadSampleCsv($type: String!) {
        downloadSampleCsv(type: $type)
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
    getProductBundleList,
    deleteProductBundle,
    importProductBundle,
    downloadSampleCsv,
    getActivity,
};
