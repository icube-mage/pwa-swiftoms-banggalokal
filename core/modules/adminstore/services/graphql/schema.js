import { gql } from '@apollo/client';

export const getCompanyList = gql`
    query getCompanyList($pageSize: Int!, $currentPage: Int!) {
        getCompanyList(pageSize: $pageSize, currentPage: $currentPage) {
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

export const getCompanyById = gql`
    query getCompanyById($id: Int!) {
        getCompanyById(id: $id) {
            company_code
            company_id
            company_name
            is_new_product
        }
    }
`;

export const createCompany = gql`
    mutation createCompany($company_code: String!, $company_name: String!) {
        createCompany(input: { company_code: $company_code, company_name: $company_name }) {
            company_code
            company_id
            company_name
            is_new_product
        }
    }
`;

export const updateCompany = gql`
    mutation updateCompany($id: Int!, $company_code: String!, $company_name: String!) {
        updateCompany(id: $id, input: { company_code: $company_code, company_name: $company_name }) {
            company_code
            company_id
            company_name
            is_new_product
        }
    }
`;

export const getAdminStoreList = gql`
    query getAdminStoreList($pageSize: Int!, $currentPage: Int!, $filter: AdminStoreFilterInput, $sort: AdminStoreSortInput) {
        getAdminStoreList(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort) {
            items {
                customer_loc_code
                email
                phone_number
                entity_id
                firstname
                lastname
                customer_company_code
                group_id
                group_label
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

export const getAdminStoreById = gql`
    query getAdminStoreById($id: Int!) {
        getAdminStoreById(id: $id) {
            entity_id
            firstname
            lastname
            email
            phone_number
            customer_loc_code
            group_id
            customer_company_code
            notif_error_order_queue
            notif_reallocation_order
            notif_new_order
            notif_rma
            notif_new_user
        }
    }
`;

export const createAdminStore = gql`
    mutation createAdminStore($input: AdminStoreInput!, $login_url: String!, $account_url: String!) {
        createAdminStore(input: $input, login_url: $login_url, account_url: $account_url) {
            id
        }
    }
`;

export const updateAdminStore = gql`
    mutation updateAdminStore($id: Int!, $input: AdminStoreInput!) {
        updateAdminStore(id: $id, input: $input)
    }
`;

export const getCompanyOptions = gql`
    query {
        getCompanyOptions {
            value
            label
        }
    }
`;

export const getLocationOptions = gql`
    query {
        getLocationOptions {
            value
            label
        }
    }
`;

export const getCustomerGroupOptions = gql`
    query {
        getCustomerGroupOptions {
            value
            label
        }
    }
`;

export const getAclTree = gql`
    query {
        getAclTree {
            children {
                label
                value
                children {
                    label
                    value
                }
            }
            label
            value
        }
    }
`;

export const getAclByCustomerId = gql`
    query getAclByCustomerId($customer_id: Int!) {
        getAclByCustomerId(customer_id: $customer_id) {
            acl_code
            use_group_acl
        }
    }
`;

export const deleteAdminStore = gql`
    mutation deleteAdminStore($id: [Int]!) {
        deleteAdminStore(id: $id)
    }
`;

export const getAclByGroupId = gql`
    query getAclByGroupId($group_id: Int!) {
        getAclByGroupId(group_id: $group_id) {
            acl_code
            is_all_acl
        }
    }
`;

export default {
    getCompanyList,
    getCompanyById,
    createCompany,
    updateCompany,
    //
    getAdminStoreList,
    getAdminStoreById,
    updateAdminStore,
    createAdminStore,
    getCompanyOptions,
    getLocationOptions,
    getCustomerGroupOptions,
    getAclTree,
    getAclByCustomerId,
    deleteAdminStore,
    getAclByGroupId,
};
