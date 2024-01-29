import { gql } from '@apollo/client';

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

export const downloadSampleCsv = gql`
    mutation downloadSampleCsv($type: String!) {
        downloadSampleCsv(type: $type)
    }
`;

export const vendorCategoryUpload = gql`
    mutation vendorCategoryUpload($binary: String!, $channelCode: String!) {
        vendorCategoryUpload(binary: $binary, channelCode: $channelCode) {
            attachment_url
            is_success
            message
            status
        }
    }
`;

export const vendorProductMasterUpload = gql`
    mutation vendorProductMasterUpload($binary: String!) {
        vendorProductMasterUpload(binary: $binary) {
            attachment_url
            is_success
            message
            status
        }
    }
`;

export const vendorProductConfigurableUpload = gql`
    mutation vendorProductConfigurableUpload($binary: String!) {
        vendorProductConfigurableUpload(binary: $binary) {
            attachment_url
            is_success
            message
            status
        }
    }
`;
export const vendorProductBundleUpload = gql`
    mutation vendorProductBundleUpload($binary: String!) {
        vendorProductBundleUpload(binary: $binary) {
            attachment_url
            is_success
            message
            status
        }
    }
`;
export const vendorProductGroupedUpload = gql`
    mutation vendorProductGroupedUpload($binary: String!) {
        vendorProductGroupedUpload(binary: $binary) {
            attachment_url
            is_success
            message
            status
        }
    }
`;
export const vendorProductPriceUpload = gql`
    mutation vendorProductPriceUpload($binary: String!) {
        vendorProductPriceUpload(binary: $binary) {
            attachment_url
            is_success
            message
            status
        }
    }
`;
export const vendorProductPriceLocationUpload = gql`
    mutation vendorProductPriceLocationUpload($binary: String!) {
        vendorProductPriceLocationUpload(binary: $binary) {
            attachment_url
            is_success
            message
            status
        }
    }
`;

export const vendorProductSimplifyUpload = gql`
    mutation vendorProductSimplifyUpload($binary: String!) {
        vendorProductSimplifyUpload(binary: $binary) {
            attachment_url
            is_success
            message
            status
        }
    }
`;

export const vendorProductStockUpload = gql`
    mutation vendorProductStockUpload($binary: String!) {
        vendorProductStockUpload(binary: $binary) {
            attachment_url
            is_success
            message
            status
        }
    }
`;

export const vendorCategoryAssignationUpload = gql`
    mutation vendorCategoryAssignationUpload($binary: String!) {
        vendorCategoryAssignationUpload(binary: $binary) {
            attachment_url
            is_success
            message
            status
        }
    }
`;

export const vendorProductImageUpload = gql`
    mutation vendorProductImageUpload($binary: String!) {
        vendorProductImageUpload(binary: $binary) {
            message_cpi
            message_pdi
            status_cpi
            status_pdi
        }
    }
`;

export const isAccessAllowed = gql`
    query isAccessAllowed($acl_code: String!) {
        isAccessAllowed(acl_code: $acl_code)
    }
`;

export const getVendorStockUploadSampleCsv = gql`
    mutation {
        getVendorStockUploadSampleCsv
    }
`;

export default {
    getActivity,
    downloadSampleCsv,
    vendorCategoryUpload,
    vendorProductMasterUpload,
    isAccessAllowed,
    vendorProductConfigurableUpload,
    vendorProductBundleUpload,
    vendorProductGroupedUpload,
    vendorProductPriceUpload,
    vendorProductPriceLocationUpload,
    vendorProductStockUpload,
    getVendorStockUploadSampleCsv,
    vendorProductSimplifyUpload,
    vendorCategoryAssignationUpload,
    vendorProductImageUpload,
};
