import { gql } from '@apollo/client';

export const getLogistixProviderList = gql`
    query getLogistixProviderList(
        $pageSize: Int!,
        $currentPage: Int!,
        $filter: LogistixProviderFilterInput,
        $sort: LogistixProviderSortInput,
    ){
        getLogistixProviderList(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter: $filter,
            sort: $sort,
        ){
            items {
                entity_id
                channel_shipping_method
                provider
                service
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

export const getLogistixProviderById = gql`
    query getLogistixProviderById(
        $id: Int!
    ){
        getLogistixProviderById(
            id: $id
        ){
            entity_id
            channel_shipping_method
            provider
            service
        }
    }
`;

export const deleteLogistixProvider = gql`
    mutation deleteLogistixProvider(
        $id: [Int!],
    ){
        deleteLogistixProvider(
            id: $id
        )
    }
`;

export const saveLogistixProvider = gql`
    mutation saveLogistixProvider(
        $input: LogistixProviderInput!,
    ){
        saveLogistixProvider(
            input: $input
        ) {
            entity_id
            channel_shipping_method
            provider
            service
        }
    }
`;

export default {
    getLogistixProviderList,
    getLogistixProviderById,
    saveLogistixProvider,
    deleteLogistixProvider,
};
