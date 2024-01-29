import { gql } from '@apollo/client';

export const getVendorRequestList = gql`
    query getVendorRequestList(
        $pageSize: Int,
        $currentPage: Int,
        $filter: VendorRequestFilterInput,
        $sort: VendorRequestSortInput
        $search: String
    ){
        getVendorRequestList(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter: $filter,
            sort: $sort
            search: $search
        ){
            items {
                entity_id
                first_name
                last_name
                company_code
                company_name
                status
                status_label
                email
                no_telephone
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

export const getVendorRequestById = gql`
    query getVendorRequestById(
        $id: Int!,
    ){
        getVendorRequestById(
            id: $id
        ){
            company_city
            company_code
            company_country_id
            company_country_name
            company_name
            company_region
            company_street
            email
            entity_id
            first_name
            id_card_file
            id_card_number
            last_name
            no_telephone
            password
            status
            status_label
            taxpayer_file
            taxpayer_number
            post_code
            region_name
        }
    }
`;

export const updateCompany = gql`
    mutation updateCompany(
        $id: Int!,
        $company_code: String!,
        $company_name: String!,
    ){
        updateCompany(
            id: $id,
            input: {
                company_code: $company_code,
                company_name: $company_name
            }
        ){
            company_code
            company_id
            company_name
            is_new_product
        }
    }
`;

export const vendorRequestApprove = gql`
    mutation vendorRequestApprove(
        $id: Int!,
    ){
        vendorRequestApprove(
            id: $id
        )
    }
`;

export const vendorRequestNotApprove = gql`
    mutation vendorRequestNotApprove(
        $id: Int!,
    ){
        vendorRequestNotApprove(
            id: $id
        )
    }
`;

export const approveSellerRegistration = gql`
    mutation approveSellerRegistration(
        $id: Int!,
        $login_url: String!,
        $account_url: String!,
        $confirm_url: String!,
    ){
        approveSellerRegistration(
            id: $id
            login_url: $login_url,
            account_url: $account_url,
            confirm_url: $confirm_url,
        )
    }
`;

export default {
    getVendorRequestList,
    getVendorRequestById,
    updateCompany,
    vendorRequestApprove,
    vendorRequestNotApprove,
    approveSellerRegistration,
};
