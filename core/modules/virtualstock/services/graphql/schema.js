import { gql } from '@apollo/client';

export const getVirtualStockList = gql`
    query getVirtualStockList($pageSize: Int, $currentPage: Int!, $filter: VirtualStockFilterInput, $sort: VirtualStockSortInput) {
        getVirtualStockList(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort) {
            items {
                vs_id
                vs_name
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

export const getVirtualStockById = gql`
    query getVirtualStockById($id: Int!) {
        getVirtualStockById(id: $id) {
            vs_id
            vs_name
            notes
            is_priority_enable
            priority_type
            channel_priority {
                channel_id
                channel_code
                channel_name
            }
            framework_priority
            min_stock
            location {
                loc_id
                loc_code
                loc_name
            }
        }
    }
`;

export const createVirtualStock = gql`
    mutation createVirtualStock($vs_name: String!, $notes: String, $location: [AssignLocation]) {
        createVirtualStock(input: { vs_name: $vs_name, notes: $notes, location: $location }) {
            vs_name
            notes
            location {
                loc_id
                loc_code
                loc_name
            }
        }
    }
`;

export const updateVirtualStock = gql`
    mutation updateVirtualStock(
        $id: Int!
        $vs_name: String!
        $notes: String
        $is_priority_enable: Int
        $priority_type: String
        $framework_priority: String
        $channel_priority: String
        $min_stock: Int
        $location: [AssignLocation]
    ) {
        updateVirtualStock(
            id: $id
            input: {
                vs_name: $vs_name
                notes: $notes
                location: $location
                is_priority_enable: $is_priority_enable
                priority_type: $priority_type
                framework_priority: $framework_priority
                channel_priority: $channel_priority
                min_stock: $min_stock
            }
        ) {
            vs_name
            notes
            is_priority_enable
            priority_type
            channel_priority {
                channel_id
                channel_code
                channel_name
            }
            framework_priority
            min_stock
            location {
                loc_id
                loc_code
                loc_name
            }
        }
    }
`;

export const getChannelList = gql`
    query getChannelList($pageSize: Int!, $currentPage: Int!) {
        getChannelList(pageSize: $pageSize, currentPage: $currentPage) {
            items {
                channel_id
                channel_code
                channel_name
                channel_url
                token
                framework
                rule_type
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

export const getLocationList = gql`
    query getLocationList(
        $pageSize: Int!,
        $currentPage: Int!,
        $search: String,
    ){
        getLocationList(
            pageSize: $pageSize,
            currentPage: $currentPage
            search: $search
        ){
            items {
                loc_id
                loc_code
                loc_name
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

export const deleteVirtualStock = gql`
    mutation deleteVirtualStock($id: Int!) {
        deleteVirtualStock(id: $id)
    }
`;

export const multideleteVirtualStock = gql`
    mutation multideleteVirtualStock($id: [Int!]!) {
        multideleteVirtualStock(id: $id)
    }
`;

export default {
    getVirtualStockList,
    getVirtualStockById,
    createVirtualStock,
    updateVirtualStock,
    getChannelList,
    getLocationList,
    deleteVirtualStock,
    multideleteVirtualStock,
};
