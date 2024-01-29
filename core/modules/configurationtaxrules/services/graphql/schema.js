import { gql } from '@apollo/client';

export const getTaxRuleList = gql`
query getTaxRuleList (
    $filter: TaxRuleFilterInput
    $sort: TaxRuleSortInput
    $pageSize: Int
    $currentPage: Int
  ) {
    getTaxRuleList(
      filter: $filter
      sort: $sort
      pageSize: $pageSize
      currentPage: $currentPage
    ) {
      items {
        calculate_subtotal
        code
        id
        position
        priority
        tax_customer_class {
          class_name
          class_type
          id
        }
        tax_product_class {
          class_name
          class_type
          id
        }
        tax_rate {
          code
          id
          rate
          tax_country_id
          tax_postcode
          tax_region_id
          zip_from
          zip_is_range
          zip_to
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

export const getTaxClassList = gql`
query getTaxClassList($filter: TaxClassFilterInput){
    getTaxClassList(filter: $filter) {
      class_name
      class_type
      id
    }
  }
  
`;

export const createTaxRule = gql`
mutation createTaxRule($input: TaxRuleInput) {
  createTaxRule(input: $input) {
    code
    id
  }
}
`;

export const getTaxRateList = gql`
query getTaxRateList(
  $filter: TaxRateFilterInput
  $pageSize: Int
  $currentPage: Int
) {
  getTaxRateList(
    filter: $filter
    pageSize: $pageSize
    currentPage: $currentPage
  ) {
    items {
      code
      id
      rate
      tax_country_id
      tax_postcode
      tax_region_id
      zip_from
      zip_is_range
      zip_to
    }
  }
}
`;

export const createTaxRate = gql`
mutation createTaxRate($input: TaxRateInput){
  createTaxRate(input: $input){
    code
    id
  }
}
`;

export const updateTaxRate = gql`
mutation updateTaxRate($id: Int!, $input: TaxRateInput){
  updateTaxRate(id: $id, input: $input){
    code
    id
  }
}
`;

export const deleteTaxRate = gql`
mutation deleteTaxRate($id: Int!){
  deleteTaxRate(id: $id)
}
`;

export const createTaxClass = gql`
mutation createTaxClass($input: TaxClassInput){
  createTaxClass(input: $input){
    class_name
    class_type
    id
  }
}
`;

export const updateTaxClass = gql`
mutation updateTaxClass($id: Int!, $input: TaxClassInput) {
  updateTaxClass(id: $id, input: $input) {
    class_name
    class_type
    id
  }
}
`;

export const deleteTaxClass = gql`
mutation deleteTaxClass($id: Int!){
  deleteTaxClass(id: $id)
}
`;

export const getTaxRuleById = gql`
query getTaxRuleById($id: Int!) {
  getTaxRuleById(id: $id) {
    code
    id
    calculate_subtotal
    code
    id
    position
    priority
    tax_customer_class {
      class_name
      class_type
      id
    }
    tax_product_class {
      class_name
      class_type
      id
    }
    tax_rate {
      code
      id
      rate
      tax_country_id
      tax_postcode
      tax_region_id
      zip_from
      zip_is_range
      zip_to
    }
  }
}
`;

export const updateTaxRule = gql`
mutation updateTaxRule($id: Int!, $input: TaxRuleInput) {
  updateTaxRule(id: $id, input: $input) {
    code
    id
  }
}
`;

export default {
    getTaxRuleList,
    getTaxClassList,
    createTaxRule,
    getTaxRateList,
    createTaxRate,
    updateTaxRate,
    deleteTaxRate,
    createTaxClass,
    updateTaxClass,
    deleteTaxClass,
    getTaxRuleById,
    updateTaxRule,
};
