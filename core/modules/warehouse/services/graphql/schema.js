import { gql } from '@apollo/client';

export const getWarehouseList = gql`
    query getWarehouseList(
        $pageSize: Int!,
        $currentPage: Int!,
        $filter: WarehouseFilterInput,
        $sort: WarehouseSortInput,
    ){
        getWarehouseList(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter: $filter,
            sort: $sort,
        ){
            items {
                id
                channel_code{
                    channel_code
                    channel_name
                }
                marketplace_warehouse_id     
                loc_id {
                    loc_id
                    loc_code
                    loc_name
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

export const getWarehouseById = gql`
    query getWarehouseById(
        $id: Int!,
    ){
        getWarehouseById(
            id: $id
        ){
            id
            channel_code{
                channel_id
                channel_code
                channel_name
            }
            marketplace_warehouse_id
            loc_id{
                loc_id
                loc_code
                loc_name
            }
        }
    }
`;

export const createWarehouse = gql`
    mutation createWarehouse(
        $channel_code: String!,
        $marketplace_warehouse_id: String!,
        $loc_id: Int!,
    ){
        createWarehouse(
            input: {
                channel_code: $channel_code,
                marketplace_warehouse_id: $marketplace_warehouse_id,
                loc_id: $loc_id,
            }
        ){
            channel_code{
                channel_code
            }
            marketplace_warehouse_id
            loc_id{
                loc_id
            }
        }
    }
`;

export const updateWarehouse = gql`
    mutation updateWarehouse(
        $id: Int!,
        $channel_code: String!,
        $marketplace_warehouse_id: String!,
        $loc_id: Int!,
    ){
        updateWarehouse(
            id: $id,
            input: {
                channel_code: $channel_code,
                marketplace_warehouse_id: $marketplace_warehouse_id,
                loc_id: $loc_id,
            }
        ){
            channel_code{
                channel_code
            }
            marketplace_warehouse_id
            loc_id{
                loc_id
            }
        }
    }
`;

export const multideleteWarehouse = gql`
    mutation multideleteWarehouse (
        $id: [Int!]!
    ){
        multideleteWarehouse(
            id: $id
        )
    }
`;

export const getMarketplaceWarehouse = gql`
    query getMarketplaceWarehouse (
        $channel_code: String!
    ){
        getMarketplaceWarehouse(
            channel_code: $channel_code
        ){
            id
            address
            name
        }
    }
`;

export const getChannelById = gql`
    query getChannelById($id: Int!) {
        getChannelById(id: $id) {
            locations{
                loc_id
                loc_code
                loc_name
            }
        }
    }
`;

export default {
    getWarehouseList,
    getWarehouseById,
    createWarehouse,
    updateWarehouse,
    multideleteWarehouse,
    getMarketplaceWarehouse,
    getChannelById,
};
