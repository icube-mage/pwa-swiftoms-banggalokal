import { gql } from '@apollo/client';

export const getMarketplaceProductAttributeMappingList = gql`
    query getMarketplaceProductAttributeMappingList(
        $pageSize: Int!,
        $currentPage: Int!,
        $filter: MarketplaceProductAttributeFilterInput,
        $sort: MarketplaceProductAttributeSortInput
    ){
        getMarketplaceProductAttributeMappingList(
            pageSize: $pageSize,
            currentPage: $currentPage
            filter: $filter
            sort: $sort
        ){
            items {
                entity_id
                marketplace_code
                category_id
                marketplace_category_name
                marketplace_attribute_name
                attribute_code
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

export const deleteMarketplaceProductAttributeMapping = gql`
    mutation deleteMarketplaceProductAttributeMapping($id: [Int!]){
        deleteMarketplaceProductAttributeMapping(id: $id)
    }
`;

export const downloadMarketplaceProductAttribute = gql`
    mutation{
        downloadMarketplaceProductAttribute
    }
`;

export const uploadStatusProductCategory = gql`
    mutation uploadStatusProductCategory(
        $binary: String!,
    ){
        uploadStatusProductCategory(
            input: {
                binary: $binary,
            }
        )
    }
`;

export const downloadSampleCsv = gql`
    mutation downloadSampleCsv(
        $type: String!,
    ){
        downloadSampleCsv(
            type: $type,
        )
    }
`;

export const importMarketplaceProductAttributeMapping = gql`
    mutation importMarketplaceProductAttributeMapping(
        $binary: String!,
    ){
        importMarketplaceProductAttributeMapping(
            input: {
                binary: $binary,
            }
        )
    }
`;

export const getMpProductAttributeMappingMpOptions = gql`
query {
    getMpProductAttributeMappingMpOptions {
      label
      value
    }
  }  
`;

export const getMpProductAttributeMappingMpCategories = gql`
query getMpProductAttributeMappingMpCategories($marketplace_code: String!) {
    getMpProductAttributeMappingMpCategories(
      marketplace_code: $marketplace_code
    ) {
      entity_id
      marketplace_category_name
    }
  }
`;

export const getMarketplaceProductAttributeList = gql`
    query getMarketplaceProductAttributeList(
       $filter: MarketplaceProductAttributeFilterInput,
    ){
        getMarketplaceProductAttributeList(
            pageSize: 0,
            filter: $filter
        ){
            items{
                attribute_code
                attribute_id
                category_id
                entity_id
                is_mandatory
                is_variant_attribute
                marketplace_attribute_id
                marketplace_attribute_name
                marketplace_attribute_type
                marketplace_code
                marketplace_input_type
                marketplace_options
            }
            total_count
        }
    }
`;

export const getProductEavAttributeOptions = gql`
query {
    getProductEavAttributeOptions {
      label
      value
    }
  }  
`;

export const getMpProductVariantAttributeSetting = gql`
query getMpProductVariantAttributeSetting($marketplace_code: String!) {
    getMpProductVariantAttributeSetting(marketplace_code: $marketplace_code) {
      minimum_variant_attribute
      maximum_variant_attribute
    }
  }
`;

export const saveMarketplaceProductAttributeMapping = gql`
mutation saveMarketplaceProductAttributeMapping (
        $input: MarketplaceProductAttributeMappingInput
    ) {
        saveMarketplaceProductAttributeMapping(input: $input)
    }
`;

export default {
    getMarketplaceProductAttributeMappingList,
    deleteMarketplaceProductAttributeMapping,
    downloadMarketplaceProductAttribute,
    uploadStatusProductCategory,
    importMarketplaceProductAttributeMapping,
    downloadSampleCsv,
    getMpProductAttributeMappingMpOptions,
    getMpProductAttributeMappingMpCategories,
    getProductEavAttributeOptions,
    getMarketplaceProductAttributeList,
    getMpProductVariantAttributeSetting,
    saveMarketplaceProductAttributeMapping,
};
