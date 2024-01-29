import { gql } from '@apollo/client';

export const getStoreList = gql`
    query getStoreList(
        $pageSize: Int!,
        $currentPage: Int!,
        $filter: StoreFilterInput,
        $sort: StoreSortInput,
        $search: String
    ){
        getStoreList(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter: $filter,
            sort: $sort,
            search: $search
        ){
            items {
                id
                channel_store_id
                name
                telephone
                category
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

export const getCompanyById = gql`
    query getCompanyById(
        $id: Int!,
    ){
        getCompanyById(
            id: $id
        ){
            company_code
            company_id
            company_name
            is_new_product
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

export default {
    getStoreList,
    getCompanyById,
    updateCompany,
};
