import { gql } from '@apollo/client';

export const getSellerStocks = gql`
query getSellerStocks(
  $pageSize: Int!
  $currentPage: Int!
  $filter: SellerStockFilterInput
  $sort: SellerStockSortInput
  $search: String
) {
  getSellerStocks(
    pageSize: $pageSize
    currentPage: $currentPage
    filter: $filter
    sort: $sort
    search: $search
  ) {
    items {
      product_name
      qty_saleable
      sku
      source_id
      vendor_sku
      location {
        loc_id
        loc_name
      }
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

export const downloadSellerStocks = gql`
mutation downloadSellerStocks($source_id: [Int!], $loc_id: [Int]) {
  downloadSellerStocks(source_id: $source_id, loc_id: $loc_id)
}
`;

export const editSellerStock = gql`
mutation editSellerStock($input: SellerStockInput!) {
  editSellerStock(input: $input) {
    product_name
    qty_saleable
    sku
    source_id
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

export const uploadSellerStocks = gql`
    mutation uploadSellerStocks($binary: String!) {
        uploadSellerStocks(input: { binary: $binary }) {
            attachment_url
            is_success
        }
    }
`;

export const getSellerStoreOptions = gql`
{
  getSellerStoreOptions {
    label
    value
  }
}
`;

export default {
    getSellerStocks,
    downloadSellerStocks,
    editSellerStock,
    getActivity,
    uploadSellerStocks,
    getSellerStoreOptions,
};
