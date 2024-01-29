import { gql } from '@apollo/client';

export const getSellerBalanceHistory = gql`
    query getSellerBalanceHistory(
        $pageSize: Int,
        $currentPage: Int,
        $filter: SellerBalanceHistoryFilterInput,
        $sort: SellerBalanceHistorySortInput,
        $search: String
    ){
        getSellerBalanceHistory(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter: $filter,
            sort: $sort,
            search: $search,
        ){
          items {
            amount
            created_at
            id
            order_number
            platform_service_fee
            platform_service_fee_raw
            transaction_amount
            transaction_amount_raw
            service_fee_category
            service_fee_category_raw
            shipping_amount
            shipping_amount_raw
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

export const getSellerWithdrawalHistory = gql`
    query getSellerWithdrawalHistory(
        $pageSize: Int,
        $currentPage: Int,
        $filter: SellerWithdrawalHistoryFilterInput,
        $sort: SellerWithdrawalHistorySortInput,
        $search: String
    ){
        getSellerWithdrawalHistory(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter: $filter,
            sort: $sort,
            search: $search,
        ){
          items {
            account_number
            amount
            beneficiary_id
            created_at
            entity_id
            error_message
            fee
            no_reference
            notes
            status
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

export const getVendorIrisBalance = gql`
  {
    getVendorIrisBalance {
      balance
      balance_raw
    }
  }
`;

export const getVendorIrisBankList = gql`
  {
    getVendorIrisBankList {
      bank_code
      bank_name
    }
  }
`;

export const saveSellerBankAccount = gql`
  mutation saveSellerBankAccount($input: SellerBankAccountInput) {
    saveSellerBankAccount(input: $input) {
      account_number
      bank_code
      entity_id
      name
    }
  }
`;

export const deleteSellerBankAccount = gql`
  mutation deleteSellerBankAccount($id: Int!) {
    deleteSellerBankAccount(id: $id)
  }
`;

export const createVendorIrisPayout = gql`
  mutation createVendorIrisPayout($input: IrisPayoutInput!) {
    createVendorIrisPayout(input: $input)
  }
`;

export const isBankAccountValid = gql`
  mutation isBankAccountValid($bank_code: String, $account_number: String) {
    isBankAccountValid(bank_code: $bank_code, account_number: $account_number)
  }
`;

export const getSellerBankAccounts = gql`
{
  getSellerBankAccounts {
    account_number
    alias_name
    bank_code
    bank_name
    bank_logo
    entity_id
    name
    is_default
    withdrawal_fee
    withdrawal_fee_type
  }
}
`;

export const setSellerDefaultBank = gql`
  mutation setSellerDefaultBank($id: Int!){
    setSellerDefaultBank(id: $id)
  }
`;

export const getSellerWithdrawalSchedule = gql`
  query getSellerWithdrawalSchedule{
    getSellerWithdrawalSchedule
  }
`;

export const saveSellerWithdrawalSchedule = gql`
  mutation saveSellerWithdrawalSchedule($schedule: WithdrawalScehdule!){
    saveSellerWithdrawalSchedule(schedule: $schedule)
  }
`;

export const useBankValidation = gql`
  query useBankValidation{
    useBankValidation
  }
`;

export const downloadSellerBalanceHistory = gql`
  mutation downloadSellerBalanceHistory($date_from: String!, $date_to: String!) {
    downloadSellerBalanceHistory(date_from: $date_from, date_to: $date_to)
  }
`;

export const downloadSellerWithdrawalHistory = gql`
  mutation downloadSellerWithdrawalHistory($date_from: String!, $date_to: String!) {
    downloadSellerWithdrawalHistory(date_from: $date_from, date_to: $date_to)
  }
`;

export const getWithdrawalStatusOptions = gql`
query getWithdrawalStatusOptions {
  getWithdrawalStatusOptions {
    label
    value
  }
}
`;

export default {
    getSellerBalanceHistory,
    getSellerWithdrawalHistory,
    getVendorIrisBalance,
    getVendorIrisBankList,
    saveSellerBankAccount,
    deleteSellerBankAccount,
    createVendorIrisPayout,
    isBankAccountValid,
    getSellerBankAccounts,
    setSellerDefaultBank,
    getSellerWithdrawalSchedule,
    saveSellerWithdrawalSchedule,
    useBankValidation,
    downloadSellerBalanceHistory,
    downloadSellerWithdrawalHistory,
};
