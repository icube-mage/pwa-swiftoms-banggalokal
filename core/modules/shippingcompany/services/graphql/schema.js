import { gql } from '@apollo/client';

export const getTadaShippingCompanyList = gql`
    query getTadaShippingCompanyList($pageSize: Int!, $currentPage: Int!, $filter: ShippingCompanyInputFilter, $sort: ShippingCompanySort) {
        getTadaShippingCompanyList(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort) {
            items {
                id
                company_id
                brand
                shipping_method
                is_active
                is_active_label
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

export const getShippingCompanyById = gql`
    query getShippingCompanyById($id: Int!) {
        getShippingCompanyById(id: $id) {
            id
            company_id
            brand
            shipping_method
            is_active
        }
    }
`;

export const createShippingCompany = gql`
    mutation createShippingCompany($company_id: Int!, $brand: String!, $shipping_method: String!, $is_active: Int!) {
        createShippingCompany(input: { company_id: $company_id, brand: $brand, shipping_method: $shipping_method, is_active: $is_active }) {
            company_id
            brand
            shipping_method
            is_active
        }
    }
`;

export const updateShippingCompany = gql`
    mutation updateShippingCompany($id: Int!, $company_id: Int!, $brand: String!, $shipping_method: String!, $is_active: Int!) {
        updateShippingCompany(id: $id, input: { company_id: $company_id, brand: $brand, shipping_method: $shipping_method, is_active: $is_active }) {
            id
            company_id
            brand
            shipping_method
            is_active
        }
    }
`;

export const deleteShippingCompany = gql`
    mutation deleteShippingCompany($id: Int!) {
        deleteShippingCompany(id: $id)
    }
`;

export const multideleteShippingCompany = gql`
    mutation multideleteShippingCompany($id: [Int!]!) {
        multideleteShippingCompany(id: $id)
    }
`;

export default {
    getTadaShippingCompanyList,
    getShippingCompanyById,
    createShippingCompany,
    updateShippingCompany,
    deleteShippingCompany,
    multideleteShippingCompany,
};
