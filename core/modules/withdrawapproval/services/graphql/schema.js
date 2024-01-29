import { gql } from '@apollo/client';

export const getVendorIrisPayoutApprovalList = gql`
    query getVendorIrisPayoutApprovalList(
        $filter: VendorIrisPayoutApprovalFilterInput
        $sort: VendorIrisPayoutApprovalSortInput
        $pageSize: Int
        $currentPage: Int
    ) {
        getVendorIrisPayoutApprovalList(filter: $filter, sort: $sort, pageSize: $pageSize, currentPage: $currentPage) {
            items {
                amount
                account_number
                beneficiary_id
                created_at
                entity_id
                no_reference
                notes
                status
                updated_at
                vendor_id
                vendor_name
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

export const vendorIrisPayoutApprove = gql`
    mutation vendorIrisPayoutApprove($ids: [Int!]!) {
        vendorIrisPayoutApprove(ids: $ids, action: "approve") {
            error
            message
        }
    }
`;

export const vendorIrisPayoutReject = gql`
    mutation vendorIrisPayoutReject($ids: [Int!]!) {
        vendorIrisPayoutReject(ids: $ids, action: "reject") {
            error
            message
        }
    }
`;

export const getAccountIrisBalance = gql`
query getAccountIrisBalance {
    getAccountIrisBalance
  }
`;

export default {
    getVendorIrisPayoutApprovalList,
    vendorIrisPayoutApprove,
    vendorIrisPayoutReject,
    getAccountIrisBalance,
};
