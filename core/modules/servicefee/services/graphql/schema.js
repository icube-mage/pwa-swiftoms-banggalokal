import { gql } from '@apollo/client';

export const getServiceFeeList = gql`
query getServiceFeeList(
  $filter: ServiceFeeFilterInput
  $sort: ServiceFeeSortInput
  $pageSize: Int
  $currentPage: Int
) {
  getServiceFeeList(
    filter: $filter
    sort: $sort
    pageSize: $pageSize
    currentPage: $currentPage
  ) {
    items {
      category {
        category_id
        name
      }
      fee_percent
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

export const saveServiceFee = gql`
mutation saveServiceFee($category_id: Int!, $fee_percent: Float!) {
  saveServiceFee(category_id: $category_id, fee_percent: $fee_percent)
}
`;

export default {
    getServiceFeeList,
    saveServiceFee,
};
