import { gql } from '@apollo/client';

export const getCompanyList = gql`
    query getCompanyList($pageSize: Int!, $currentPage: Int!, $filter: CompanyFilterInput, $sort: CompanySortInput, $search: String) {
        getCompanyList(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort, search: $search) {
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
            logistix_credentials_flag
            netsuite_id
        }
    }
`;

export const createCompany = gql`
    mutation createCompany($company_code: String!, $company_name: String!, $logistix_credentials_flag: String, $netsuite_id: Int) {
        createCompany(
            input: {
                company_code: $company_code
                company_name: $company_name
                logistix_credentials_flag: $logistix_credentials_flag
                netsuite_id: $netsuite_id
            }
        ) {
            company_code
            company_id
            company_name
            is_new_product
            logistix_credentials_flag
            netsuite_id
        }
    }
`;

export const updateCompany = gql`
    mutation updateCompany($id: Int!, $company_code: String!, $company_name: String!, $logistix_credentials_flag: String, $netsuite_id: Int) {
        updateCompany(
            id: $id
            input: {
                company_code: $company_code
                company_name: $company_name
                logistix_credentials_flag: $logistix_credentials_flag
                netsuite_id: $netsuite_id
            }
        ) {
            company_code
            company_id
            company_name
            is_new_product
            logistix_credentials_flag
            netsuite_id
        }
    }
`;

export const deleteCompany = gql`
    mutation deleteCompany($id: Int!) {
        deleteCompany(id: $id)
    }
`;

export const multideleteCompany = gql`
    mutation multideleteCompany($id: [Int!]!) {
        multideleteCompany(id: $id)
    }
`;

export const getStoreConfig = gql`
    query getStoreConfig(
        $path: String!
    ){
        getStoreConfig(
            path: $path
        )
    }
`;

export default {
    getCompanyList,
    getCompanyById,
    createCompany,
    updateCompany,
    deleteCompany,
    multideleteCompany,
    getStoreConfig,
};
