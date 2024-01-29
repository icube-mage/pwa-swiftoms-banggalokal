import { gql } from '@apollo/client';

export const getVendorPromotionList = gql`
    query getVendorPromotionList($pageSize: Int, $currentPage: Int, $filter: VendorPromotionFilterInput, $sort: VendorPromotionSortInput) {
        getVendorPromotionList(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort) {
            items {
                rule_id
                name
                description
                coupon_code
                from_date
                to_date 
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

export const saveVendorPromotion = gql`
    mutation saveVendorPromotion(
        $rule_id: Int,
        $name: String!
        $description: String!
        $from_date: String!
        $to_date: String!
        $simple_action: String!
        $discount_amount: String!
        $discount_step: String
        $max_y: String
        $coupon_code: String!
    ) {
        saveVendorPromotion(
            input: {
                rule_id: $rule_id
                name: $name
                description: $description
                from_date: $from_date
                to_date: $to_date
                simple_action: $simple_action
                discount_amount: $discount_amount
                discount_step: $discount_step
                max_y: $max_y
                coupon_code: $coupon_code
            }
        )
    }
`;

export const getVendorPromotionById = gql`
    query getVendorPromotionById($id: Int!) {
        getVendorPromotionById(id: $id) {
            rule_id
            name
            description
            from_date
            to_date
            simple_action
            discount_amount
            discount_step
            max_y
            coupon_code
        }
    }
`;

export default {
    getVendorPromotionList,
    saveVendorPromotion,
    getVendorPromotionById,
};
