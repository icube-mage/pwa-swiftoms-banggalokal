import { gql } from '@apollo/client';

export const getSellerStores = gql`
query getSellerStores(
  $pageSize: Int!
  $currentPage: Int!
  $filter: SellerStoreFilterInput
  $sort: SellerStoreSortInput
  $search: String
) {
  getSellerStores(
    pageSize: $pageSize
    currentPage: $currentPage
    filter: $filter
    sort: $sort
    search: $search
  ) {
    items {
      city
      code
      country_id
      flatrate_price
      id
      is_active
      is_default
      latitude
      longitude
      name
      postcode
      region
      shipping_methods
      street
      telephone
      channels {
        channel_name
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

export const deleteSellerStore = gql`
mutation deleteSellerStore($id: Int!){
  deleteSellerStore(id: $id)
}
`;

export const updateSellerStoreStatus = gql`
mutation updateSellerStoreStatus($input: UpdateSellerStoreStatusInput!) {
  updateSellerStoreStatus(input: $input) {
    id
    is_active
  }
}
`;

export const saveSellerDefaultStore = gql`
mutation saveSellerDefaultStore($loc_id: Int!, $is_default: Boolean!) {
  saveSellerDefaultStore(loc_id: $loc_id, is_default: $is_default)
}
`;

export const saveSellerStore = gql`
mutation saveSellerStore($input: SellerStoreInput!) {
  saveSellerStore(input: $input) {
    id
  }
}
`;

export const getSellerShippingMethods = gql`
query getSellerShippingMethods {
  getSellerShippingMethods {
    credential_flag
    entity_id
    is_active
    provider
    service
    shipping_code
    shipping_method_logo_url
  }
}
`;

export default {
    getSellerStores,
    deleteSellerStore,
    updateSellerStoreStatus,
    saveSellerDefaultStore,
    saveSellerStore,
    getSellerShippingMethods,
};
