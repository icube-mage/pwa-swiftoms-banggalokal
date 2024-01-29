import { gql } from '@apollo/client';

export const getSellerStores = gql`
query getSellerStores(
  $search: String
  $filter: SellerStoreFilterInput
  $sort: SellerStoreSortInput
  $pageSize: Int
  $currentPage: Int
) {
  getSellerStores(
    search: $search
    filter: $filter
    sort: $sort
    pageSize: $pageSize
    currentPage: $currentPage
  ) {
    items {
      city
      code
      country_id
      flatrate_price
      id
      is_active
      latitude
      longitude
      name
      postcode
      region
      shipping_methods
      street
      telephone
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

export const getSeller = gql`
{
  getSeller {
    description
    id
    logo
    name
    status
  }
}
`;

export const saveSeller = gql`
mutation saveSeller($input: SaveSellerInput!) {
  saveSeller(input: $input) {
    description
    id
    logo
    name
    status
  }
}
`;

export const saveSellerStore = gql`
mutation saveSellerStore($input: SellerStoreInput!) {
  saveSellerStore(input: $input) {
    city
    code
    country_id
    flatrate_price
    id
    is_active
    latitude
    longitude
    name
    postcode
    region
    shipping_methods
    street
    telephone
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

export const getStoreConfig = gql`
query getStoreConfig($path: String!){
        getStoreConfig(path: $path)
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

export const deleteSellerStore = gql`
mutation deleteSellerStore($id: Int!) {
  deleteSellerStore(id: $id)
}
`;

export const getSellerBanners = gql`
query getSellerBanners {
  getSellerBanners {
    banner {
      hyperlink
      position
      type
      url
    }
    is_mobile
    position
    type
  }
}
`;

export const saveSellerBanner = gql`
mutation saveSellerBanner($input: [SellerBannerInput!]!) {
  saveSellerBanner(input: $input)
}
`;

export const getSellerEtalaseList = gql`
query getSellerEtalaseList(
  $pageSize: Int!
  $currentPage: Int!
  $filter: SellerEtalaseFilterInput
  $sort: SellerEtalaseSortInput
  $search: String
) {
  getSellerEtalaseList(
    pageSize: $pageSize
    currentPage: $currentPage
    filter: $filter
    sort: $sort
    search: $search
  ) {
    items {
      entity_id
      image
      is_default
      is_pinned
      name
      position
      total_product
      products {
        entity_id
        images {
          url
        }
        name
        vendor_sku
        price_formatted
        stock
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

export const createSellerEtalase = gql`
  mutation createSellerEtalase($input: SellerEtalaseInput!) {
    createSellerEtalase(input: $input)
  }
`;
export const deleteSellerEtalase = gql`
  mutation deleteSellerEtalase($id: Int!) {
    deleteSellerEtalase(id: $id)
  }
`;

export const updateSellerEtalase = gql`
  mutation updateSellerEtalase($id: Int!, $input: SellerEtalaseInput!) {
    updateSellerEtalase(id: $id, input: $input)
  }
`;

export default {
    getSeller,
    saveSeller,
    saveSellerStore,
    getSellerShippingMethods,
    getStoreConfig,
    getSellerStores,
    updateSellerStoreStatus,
    deleteSellerStore,
    saveSellerBanner,
    getSellerBanners,
    getSellerEtalaseList,
    createSellerEtalase,
    deleteSellerEtalase,
    updateSellerEtalase,
};
