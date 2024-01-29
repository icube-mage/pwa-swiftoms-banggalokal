import { gql } from '@apollo/client';

export const getInformationUpdateList = gql`
query getInformationUpdateList(
    $search: String
    $filter: InformationUpdateFilterInput
    $sort: InformationUpdateSortInput
    $pageSize: Int
    $currentPage: Int
  ) {
    getInformationUpdateList(
      search: $search
      filter: $filter
      sort: $sort
      pageSize: $pageSize
      currentPage: $currentPage
    ) {
      items {
        content
        short_content
        entity_id
        inserted_at
        title
        image
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

export const sellerNotificationRead = gql`
    mutation sellerNotificationRead (
        $ids: [Int]
    ){
        sellerNotificationRead(
            ids: $ids
        )
    }
`;

export default {
    getInformationUpdateList,
    sellerNotificationRead,
};
