import { gql } from '@apollo/client';

const productList = `
    items {
        entity_id
        name
        sku
        product_price
        product_special_price
        product_status {
            label
        }
        approval_status
        type_id
    }
    total_count
    page_info {
        page_size
        current_page
        total_pages
    }
`;

export const getProductList = gql`
    query getProductList(
        $pageSize: Int!,
        $currentPage: Int!,
        $filter: ProductFilterInput,
        $sort: ProductSortInput,
    ){
        getProductList(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter: $filter,
            sort: $sort,
        ){
            ${productList}
        }
    }
`;

export const getProductById = gql`
    query getProductById($id: Int!) {
        getProductById(id: $id) {
            id
            product_status {
                value
                label
            }
            attribute_set_name
            name
            sku
            price_range {
                maximum_price {
                    regular_price {
                        value
                    }
                }
            }
            special_price
            special_from_date
            special_to_date
            weight
            visibility
            description {
                html
            }
            sourcing {
                loc_name
                qty_total
                qty_reserved
                qty_saleable
            }
        }
    }
`;

export const updateProduct = gql`
    mutation updateProduct(
        $id: Int!,
        $input: [ProductInput],
        $input_image: [ProductImageInput],
        $product_location: [Int],
        $options: [ProductCustomizeOptions],
        $bundle_options: [ProductBundleOptionsInput],
        $configurable: ProductConfigurable
    ) {
        updateProduct(
            id: $id,
            input: $input,
            input_image: $input_image,
            product_location: $product_location,
            configurable: $configurable,
            options: $options,
            bundle_options: $bundle_options,
        )
    }
`;

export const uploadProduct = gql`
    mutation uploadProduct($binary: String!) {
        uploadProduct(input: { binary: $binary }) {
            attachment_url
            is_success
            message
            status
        }
    }
`;

export const downloadSampleCsv = gql`
    mutation downloadSampleCsv($type: String!) {
        downloadSampleCsv(type: $type)
    }
`;

export const getProductListBySku = gql`
    query getProductList(
        $pageSize: Int!,
        $currentPage:Int!,
        $querySearch: String,
    ){
        getProductList(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter:{
                sku:{
                    like: $querySearch
                }
            },
        ){
            ${productList}
        }
    }
`;

export const getProductAttributes = gql`
query getProductAttributes($id: Int!, $attribute_set_id: Int) {
    getProductAttributes(id: $id, attribute_set_id: $attribute_set_id) {
      entity_id
      attribute_set_id
      type_id
      attribute_set_options {
        value
        label
      }
      product_location {
        loc_code
        loc_id
        loc_name
      }
      groups {
        attribute_group_id
        attribute_group_name
        attribute_group_code
        sort_order
        attributes {
          attribute_code
          frontend_label
          frontend_input
          backend_type
          is_required
          is_readonly
          attribute_value
          attribute_options {
            value
            label
          }
          images {
            file
            id
            position
            types
            url
          }
        }
      }
      sourcing {
        source_id
        loc_id
        loc_name
        company_id
        company_name
        sku
        qty_total
        qty_reserved
        qty_incoming
        qty_saleable
        qty_buffer
        priority
      }
      company_price {
        channels {
          channel_id
          channel_name
          locations {
            loc_id
            loc_name
            price
            special_from_date
            special_price
            special_to_date
          }
        }
        company_id
        company_name
      }
      options {
        option_id
        required
        sort_order
        title
        value {
          option_type_id
          price
          price_type
          sku
          sort_order
          title
        }
      }
      bundle_options {
        option_id
        parent_id
        position
        product_links {
          entity_id
          is_default
          option_id
          position
          price
          price_type
          product_name
          qty
          selection_can_change_quantity
          selection_id
          sku
        }
        required
        title
        type
      }
    }
  }
`;

export const productFetchManual = gql`
    mutation productFetchManual {
        productFetchManual
    }
`;

export const getProductAttributeSetOptions = gql`
    query {
        getProductAttributeSetOptions {
            label
            value
        }
    }
`;

export const getNewProductAttributes = gql`
    query getNewProductAttributes($attribute_set_id: Int!) {
        getNewProductAttributes(attribute_set_id: $attribute_set_id) {
            attribute_set_id
            attribute_set_options {
                label
                value
            }
            groups {
                attribute_group_code
                attribute_group_id
                attribute_group_name
                attributes {
                    attribute_code
                    attribute_options {
                        label
                        value
                    }
                    frontend_input
                    frontend_label
                    backend_type
                    is_readonly
                    is_required
                    attribute_value
                }
                sort_order
            }
        }
    }
`;

export const createProduct = gql`
    mutation createProduct(
        $type: String,
        $input: [ProductInput],
        $input_image: [ProductImageInput],
        $product_location: [Int],
        $options: [ProductCustomizeOptions],
        $bundle_options: [ProductBundleOptionsInput],
        $configurable: ProductConfigurable
    ) {
        createProduct(
            type: $type,
            input: $input,
            input_image: $input_image,
            product_location: $product_location,
            configurable: $configurable,
            options: $options,
            bundle_options: $bundle_options,
        )
    }
`;

export const deleteProducts = gql`
    mutation deleteProducts($id: [Int]!) {
        deleteProducts(id: $id)
    }
`;

export const syncToMarketplace = gql`
    mutation syncToMarketplace($id: [Int]) {
        syncToMarketplace(id: $id)
    }
`;

export const getExportProductDefaultAttributes = gql`
{
    getExportProductDefaultAttributes {
      source_data_export
      source_data_replace
      source_data_system
    }
  }
`;

export const getExportProductAttributeOptions = gql`
{
    getExportProductAttributeOptions
  }
`;

export const exportProduct = gql`
mutation exportProduct ($input: ProductExportInput) {
    exportProduct(input: $input)
  }
`;

export const getAllProductHasOptions = gql`
  query getAllProductHasOptions(
    $excluded_ids: [Int],
    $pageSize: Int,
    $currentPage: Int,
    $filter: ProductFilterInput,
    $sort: ProductSortInput,
  ){
    getAllProductHasOptions(
      excluded_ids: $excluded_ids,
      pageSize: $pageSize,
      currentPage: $currentPage,
      filter: $filter,
      sort: $sort,
    ){
      items {
        entity_id
        name
        options {
          option_id
          required
          sort_order
          title
          value {
            option_type_id
            price
            price_type
            sku
            sort_order
            title
          }
        }
        price
        sku
        status
        type_id
        vendor_id
        vendor_sku
        weight
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

export const createConfigurableAttributes = gql`
    mutation createConfigurableAttributes(
        $attribute_code: String!
        $frontend_input: String!
        $frontend_label: String!
    ) {
        createConfigurableAttributes(
            input: {
                attribute_code: $attribute_code
                frontend_input: $frontend_input
                frontend_label: $frontend_label
            }
        ) {
            attribute_id
            attribute_code
            frontend_input
            frontend_label
        }
    }
`;

export const getInputTypeAttribute = gql`
    query {
        getInputTypeAttribute {
            value
            label
        }
    }
`;

export const getConfigurableProductAssociated = gql`
query getConfigurableProductAssociated(
    $id: Int!,
    $variant_id: Int,
    $pageSize: Int,
    $currentPage: Int,
    $filter: ProductFilterInput,
    $sort: ProductSortInput,
  ){
    getConfigurableProductAssociated(
      id: $id,
      variant_id: $variant_id,
      pageSize: $pageSize,
      currentPage: $currentPage,
      filter: $filter,
      sort: $sort,
    ){
      items {
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
        status
        type_id
        weight
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

export const createAttributeOptions = gql`
mutation createAttributeOptions(
    $attribute_code: String!
    $input: [OptionInput]
  ) {
    createAttributeOptions(attribute_code: $attribute_code, input: $input) {
      attribute_code
      attribute_options {
        value
        label
      }
    }
  }
  `;

export const getConfigurableProductVariant = gql`
query getConfigurableProductVariant($id: Int!) {
    getConfigurableProductVariant(id: $id) {
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
        status
        type_id
        weight
        attributes {
          attribute_code
          attribute_id
          attribute_options {
            label
            value
          }
          attribute_value
          frontend_input
          frontend_label
          is_required
        }
      }
    }
`;

export const getConfigurableAttributes = gql`
    query getConfigurableAttributes(
        $filter: ConfigurableAttributeFilterInput
        $sort: ConfigurableAttributeSortInput
        $pageSize: Int!,
        $currentPage:Int!,
    ){
        getConfigurableAttributes(
            filter: $filter,
            sort: $sort,
            pageSize: $pageSize,
            currentPage: $currentPage,
        ){
          items {
            attribute_id
            attribute_code
            attribute_options {
              label
              value
            }
            backend_type
            frontend_input
            frontend_label
            is_required
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

export const getConfigurableAttributeByIds = gql`
query getConfigurableAttributeByIds($attribute_ids: [Int]) {
  getConfigurableAttributeByIds(attribute_ids: $attribute_ids) {
    attribute_id
    attribute_code
    attribute_options {
      value
      label
    }
    frontend_label
  }
}
`;
export const getBundleOptionList = gql`
    query getBundleOptionList(
        $filter: ProductFilterInput
        $sort: ProductSortInput
        $pageSize: Int!,
        $currentPage:Int!,
    ){
        getBundleOptionList(
            filter: $filter,
            sort: $sort,
            pageSize: $pageSize,
            currentPage: $currentPage,
        ){
          items {
            entity_id
            name
            product_price
            sku
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

export default {
    getProductList,
    getProductById,
    updateProduct,
    uploadProduct,
    downloadSampleCsv,
    getProductListBySku,
    getProductAttributes,
    productFetchManual,
    getProductAttributeSetOptions,
    getNewProductAttributes,
    createProduct,
    deleteProducts,
    syncToMarketplace,
    getExportProductDefaultAttributes,
    getExportProductAttributeOptions,
    exportProduct,
    getAllProductHasOptions,
    createConfigurableAttributes,
    getInputTypeAttribute,
    getConfigurableAttributes,
    getConfigurableProductAssociated,
    createAttributeOptions,
    getConfigurableProductVariant,
    getConfigurableAttributeByIds,
};
