import { gql } from '@apollo/client';

export const getSellerProducts = gql`
query getSellerProducts(
  $pageSize: Int!
  $currentPage: Int!
  $filter: SellerProductFilterInput
  $sort: SellerProductSortInput
  $search: String
) {
  getSellerProducts(
    pageSize: $pageSize
    currentPage: $currentPage
    filter: $filter
    sort: $sort
    search: $search
  ) {
    items {
      brand
      category_id
      description
      dimension_package_height
      dimension_package_length
      dimension_package_width
      entity_id
      images {
        file
        id
        position
        types
        url
      }
      name
      price
      price_formatted
      shipping_method {
        entity_id
        provider
        service
      }
      sku
      vendor_sku
      status
      location_stock {
        location {
          loc_name
        }
        stock
      }
      weight
      approval_status
      etalase_ids
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

export const getCategoryList = gql`
query getCategoryList($filter: CategoryFilterInput) {
    getCategoryList(filter: $filter) {
      id
      name
      description
      level
      is_active
      children {
        id
        name
        description
        level
        is_active
        children {
          id
          name
          description
          level
          is_active
          children {
            id
            name
            description
            level
            is_active
          }
        }
      }
    }
  }
`;

export const updateSellerProductStatus = gql`
mutation updateSellerProductStatus($input: [SellerUpdateStatusInput]!){
  updateSellerProductStatus(input: $input)
}
`;

export const deleteSellerProductByIds = gql`
mutation deleteSellerProductByIds($ids: [Int]!){
  deleteSellerProductByIds(ids: $ids)
}
`;

export const getStoreShippingMethod = gql`
{
  getStoreShippingMethod {
    entity_id
    provider
    service
  }
}
`;

export const createSellerProduct = gql`
mutation createSellerProduct($input: SellerProductInput!) {
  createSellerProduct(input: $input)
}
`;

export const getSellerProduct = gql`
query getSellerProduct($id: Int!) {
  getSellerProduct(id: $id) {
    brand
    category_id
    description
    dimension_package_height
    dimension_package_length
    dimension_package_width
    entity_id
    images {
      file
      id
      position
      types
      url
    }
    etalase_ids
    name
    price
    shipping_method {
      entity_id
      provider
      service
    }
    sku
    vendor_sku
    short_description
    status
    stock
    weight
    minimum_order_quantity
  }
}
`;

export const updateSellerProduct = gql`
mutation updateSellerProduct($id: Int!, $input: SellerProductInput!) {
  updateSellerProduct(id: $id, input: $input)
}
`;

export const downloadProductCsvTemplate = gql`
query downloadProductCsvTemplate($type: ProductCsvTemplateType!) {
  downloadProductCsvTemplate(type: $type)
}
`;

export const uploadSellerProduct = gql`
mutation uploadSellerProduct($input: SellerUploadProductInput!) {
  uploadSellerProduct(input: $input)
}
`;

export const getVoltwigActivity = gql`
query getVoltwigActivity($title: String!) {
  getVoltwigActivity(title: $title) {
    activity
    percent
    rows_error
    rows_found
    rows_processed
    rows_success
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

export const getStoreConfig = gql`
query getStoreConfig($path: String!){
        getStoreConfig(path: $path)
    }
`;

export const getSellerVariantAttributes = gql`
query getSellerVariantAttributes {
  getSellerVariantAttributes {
    attribute_id
    attribute_code
    frontend_label
    attribute_options {
      label
      value
    }
    vendor_id
  }
}
`;

export const getSellerProductVariantItems = gql`
query getSellerProductVariantItems($id: Int!) {
  getSellerProductVariantItems(id: $id) {
    attributes {
      attribute_code
      attribute_id
      attribute_options {
        label
        value
      }
      attribute_value
      backend_type
      frontend_input
      frontend_label
      is_required
    }
    entity_id
    images {
      file
      id
      position
      types
      url
    }
    name
    price
    sku
    vendor_sku
    status
    type_id
    weight
    stock
  }
}
`;

export const getSellerEtalaseList = gql`
  query getSellerEtalaseList($filter: SellerEtalaseFilterInput) {
    getSellerEtalaseList(filter: $filter) {
      items {
        entity_id
        name
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

export const moveSellerProductEtalase = gql`
  mutation moveSellerProductEtalase($id: Int!, $product_ids: [Int]!) {
    moveSellerProductEtalase(id: $id, product_ids: $product_ids)
  }
`;

export default {
    getSellerProducts,
    getCategoryList,
    updateSellerProductStatus,
    deleteSellerProductByIds,
    getStoreShippingMethod,
    createSellerProduct,
    getSellerProduct,
    updateSellerProduct,
    downloadProductCsvTemplate,
    uploadSellerProduct,
    getVoltwigActivity,
    getActivity,
    getStoreConfig,
    getSellerVariantAttributes,
    getSellerProductVariantItems,
    getSellerEtalaseList,
    moveSellerProductEtalase,
};
