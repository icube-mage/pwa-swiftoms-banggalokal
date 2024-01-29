import { gql } from '@apollo/client';

export const getVendorBankList = gql`
query getVendorBankList(
    $filter: VendorBankListFilterInput
    $sort: VendorBankListSortInput
    $pageSize: Int
    $currentPage: Int
  ) {
    getVendorBankList(
      filter: $filter
      sort: $sort
      pageSize: $pageSize
      currentPage: $currentPage
    ) {
      items {
        bank_code
        bank_name
        logo
        withdrawal_fee
        withdrawal_fee_type
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

export const saveVendorBank = gql`
mutation saveVendorBank($input: InputVendorBank) {
    saveVendorBank(input: $input) {
      bank_code
      bank_name
      logo
      withdrawal_fee
      withdrawal_fee_type
    }
  }
`;

export const downloadWithdrawalFeeTemplate = gql`
mutation downloadWithdrawalFeeTemplate {
  downloadWithdrawalFeeTemplate
}
`;

export const uploadWithdrawalFee = gql`
    mutation uploadWithdrawalFee($binary: String!) {
        uploadWithdrawalFee(input: { binary: $binary }) {
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

export default {
    getVendorBankList,
    saveVendorBank,
    downloadWithdrawalFeeTemplate,
    uploadWithdrawalFee,
};
