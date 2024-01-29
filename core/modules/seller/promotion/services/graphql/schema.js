import { gql } from '@apollo/client';

export const getSellerPromotions = gql`
    query getSellerPromotions (
        $search: String, 
        $filter: SellerPromotionFilterInput, 
        $sort: SellerPromotionSortInput, 
        $pageSize: Int, 
        $currentPage: Int
        ) {
        getSellerPromotions (
            search: $search, 
            filter: $filter, 
            sort: $sort, 
            pageSize: $pageSize, 
            currentPage: $currentPage
            ) {
            items {
                rule_id
                name
                description
                discount_amount
                discount_step
                from_date
                max_y
                simple_action
                to_date
                coupon_code
                uses_per_coupon
                uses_per_customer
                is_active
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

export const getSellerPromotionsById = gql`
    query getSellerPromotions ($rule_id: FilterRangeTypeInput) {
        getSellerPromotions (filter: { rule_id : $rule_id}) {
            items {
                rule_id
                name
                description
                discount_amount
                discount_step
                from_date
                max_y
                simple_action
                to_date
                coupon_code
                uses_per_coupon
                uses_per_customer
                is_active
            }
        }
    }
`;

export const saveSellerPromotion = gql`
    mutation saveSellerPromotion ($input:SellerPromotionInput!) {
        saveSellerPromotion (input: $input) {
            rule_id
            name
            description
            from_date
            simple_action
            discount_amount
            discount_step
            max_y
            to_date
            coupon_code
            uses_per_coupon
            uses_per_customer
            is_active
        }
    }
`;

export const saveSellerPromotionCartFixed = gql`
    mutation saveSellerPromotion (
        $coupon_code: String!
        $description: String
        $from_date: String!
        $name: String!
        $simple_action: String!
        $discount_amount: Float
        $discount_step: Int
        $to_date: String!
        $uses_per_coupon: Int
        $uses_per_customer: Int
        $is_active: Boolean 
        ) {
        saveSellerPromotion (input: {
            coupon_code: $coupon_code
            description: $description
            from_date: $from_date
            name: $name
            simple_action: $simple_action
            discount_amount: $discount_amount
            discount_step: $discount_step
            to_date: $to_date
            uses_per_coupon: $uses_per_coupon
            uses_per_customer: $uses_per_customer
            is_active: $is_active
        }) {
            rule_id
            name
            description
            from_date
            simple_action
            discount_amount
            discount_step
            to_date
            coupon_code
            uses_per_coupon
            uses_per_customer
            is_active
        }
    }
`;

export const getSellerPromotionsBundle = gql`
query getSellerPromotionsBundle(
    $search: String
    $sort: SellerPromotionBundleSortInput
    $pageSize: Int
    $currentPage: Int
    $filter: SellerPromotionBundleFilterInput
  ) {
    getSellerPromotionsBundle(
      search: $search
      sort: $sort
      pageSize: $pageSize
      currentPage: $currentPage
      filter: $filter
    ) {
      items {
        end_period
        entity_id
        name
        start_period
        bundle_status {
          code
          label
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

export const getSellerProductPromotions = gql`
query getSellerProductPromotions(
    $search: String
    $filter: SellerProductFilterInput
    $sort: SellerProductSortInput
    $pageSize: Int
    $currentPage: Int
  ) {
    getSellerProductPromotions(
      search: $search
      filter: $filter
      sort: $sort
      pageSize: $pageSize
      currentPage: $currentPage
    ) {
      items {
        approval_status
        entity_id
        images {
          file
          id
          url
        }
        name
        price
        price_formatted
        sku
        stock
        vendor_sku
        variants {
          attributes {
            attribute_code
            attribute_id
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
          price_formatted
          sku
          status
          stock
          type_id
          vendor_sku
          weight
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

export const createSellerPromotionBundle = gql`
mutation createSellerPromotionBundle($input: SellerPromotionBundleInput!) {
    createSellerPromotionBundle(input: $input)
  }
`;

export const getSellerPromotionBundleById = gql`
query getSellerPromotionBundleById($id: Int!) {
  getSellerPromotionBundleById(id: $id) {
    entity_id
    name
    status
    bundle_status {
      code
      label
    }
    start_period
    end_period
    quota {
      loc_name
      quota
      stock
    }
    total_price
    total_price_formatted
    items {
      name
      price
      price_formatted
      qty
      sku
      image_url
      vendor_sku
      variants {
        entity_id
        image_url
        name
        price
        price_formatted
        price_origin
        qty
        sku
        vendor_sku
      }
    }
  }
}
`;

export const disablePromotionBundle = gql`
mutation disablePromotionBundle($id: Int!) {
  disablePromotionBundle(id: $id)
}
`;

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
      code
      id
      name
    }
  }
}
`;

export const deletePromotionBundle = gql`
mutation deletePromotionBundle($id: Int!) {
  deletePromotionBundle(id: $id)
}
`;

export const getSellerDiscountList = gql`
query getSellerDiscountList(
  $search: String
  $filter: SellerDiscountFilterInput
  $pageSize: Int
  $currentPage: Int
) {
  getSellerDiscountList(
    search: $search
    filter: $filter
    pageSize: $pageSize
    currentPage: $currentPage
  ) {
    items {
      discount
      discount_raw
      discount_from_date
      discount_price
      discount_price_raw
      discount_to_date
      entity_id
      image
      name
      price
      price_raw
      sku
      status
      type_id
      vendor_sku
      variants {
        discount
        discount_raw
        discount_from_date
        discount_price
        discount_price_raw
        discount_to_date
        entity_id
        image
        name
        price
        price_raw
        sku
        status
        type_id
        vendor_sku
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

export const saveSellerDiscount = gql`
mutation saveSellerDiscount($input: [SellerDiscountInput]!) {
  saveSellerDiscount(input: $input) {
    error_data {
      message
      sku
      discount_from_date
      discount_price
      discount_to_date
      variants {
        message
        sku
        discount_from_date
        discount_price
        discount_to_date
      }
    }
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

export const uplodSellerDiscount = gql`
    mutation uplodSellerDiscount($binary: String!) {
        uplodSellerDiscount(binary: $binary )
    }
`;

export const downloadSellerDiscTemplate = gql`
query downloadSellerDiscTemplate {
  downloadSellerDiscTemplate
}
`;

export const deleteSellerDiscount = gql`
    mutation deleteSellerDiscount($input: [DelSellerDiscountInput]!) {
        deleteSellerDiscount(input: $input )
    }
`;

export default {
    getSellerPromotions,
    getSellerPromotionsById,
    saveSellerPromotion,
    saveSellerPromotionCartFixed,
    getSellerPromotionsBundle,
    createSellerPromotionBundle,
    getSellerProductPromotions,
    getSellerPromotionBundleById,
    disablePromotionBundle,
    getSellerStores,
    deletePromotionBundle,
    getSellerDiscountList,
    saveSellerDiscount,
    downloadSellerDiscTemplate,
    uplodSellerDiscount,
    getActivity,
    deleteSellerDiscount,
};
