import { gql } from '@apollo/client';

export const getCompanyList = gql`
    query getCompanyList(
        $pageSize: Int!,
        $currentPage: Int!,
        $search: String
    ){
        getCompanyList(
            pageSize: $pageSize,
            currentPage: $currentPage,
            search: $search
        ){
            items {
                company_id
                company_code
                company_name
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

export const getVendorProductApprovalList = gql`
    query getVendorProductApprovalList(
        $pageSize: Int!,
        $currentPage: Int!,
        $filter: VendorProductApprovalFilterInput,
        $sort: VendorProductApprovalSortInput,
    ){
        getVendorProductApprovalList(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter: $filter,
            sort: $sort,
        ){
            items{
                entity_id
                approval_status
                sku
                name
                vendor_name
                price
                special_price
                special_from_date
                special_to_date
                status
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

export const productsApprove = gql`
    mutation productsApprove($ids: [Int!]!){
        productsApprove(ids: $ids)
    }
`;

export default {
    getCompanyList,
    productsApprove,
};
