import { gql } from '@apollo/client';

export const downloadSampleCsv = gql`
    mutation downloadSampleCsv($type: String!) {
        downloadSampleCsv(type: $type)
    }
`;

export const mappingProductLocation = gql`
    mutation mappingProductLocation($binary: String!) {
        mappingProductLocation(input: { binary: $binary }) {
            attachment_url
            is_success
        }
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

export const uploadProduct = gql`
    mutation uploadProduct($binary: String!) {
        uploadProduct(input: { binary: $binary }) {
            attachment_url
            is_success
            message
            status
        }
    }
`;

export const uploadConfigurableProduct = gql`
mutation uploadConfigurableProduct($binary: String!) {
    uploadConfigurableProduct(input: { binary: $binary }) {
        message
        status
    }
}
`;

export const uploadProductImages = gql`
    mutation uploadProductImages($binary: String!) {
        uploadProductImages(input: {binary: $binary}) {
            message
            status
        }
    }
`;

export const uploadBundleProduct = gql`
    mutation uploadBundleProduct($binary: String!) {
        uploadBundleProduct(input: {binary: $binary}) {
            message
            status
        }
    }
`;

export const uploadFixedBundleProduct = gql`
    mutation uploadFixedBundleProduct($binary: String!) {
        uploadFixedBundleProduct(input: {binary: $binary}) {
            message
            status
        }
    }
`;

export default {
    mappingProductLocation,
    downloadSampleCsv,
    getActivity,
    uploadProduct,
    uploadConfigurableProduct,
    uploadProductImages,
    uploadBundleProduct,
    uploadFixedBundleProduct,
};
