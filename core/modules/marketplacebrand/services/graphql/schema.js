import { gql } from '@apollo/client';

export const getStoreList = gql`
    query getStoreList(
        $pageSize: Int!,
        $currentPage: Int!,
        $filter: StoreFilterInput,
        $sort: StoreSortInput
    ){
        getStoreList(
            pageSize: $pageSize,
            currentPage: $currentPage
            filter: $filter
            sort: $sort
        ){
            items {
                id
                channel_store_id
                name
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

export const registerMarketplaceBrand = gql`
    mutation registerMarketplaceBrand(
        $brand_id: String!
        $brand_name: String!
    ){
        registerMarketplaceBrand(
            input: {
                brand_id: $brand_id,
                brand_name: $brand_name,
            },
        )
    }
`;

export const getAvailableMpToConnect = gql`
    query getAvailableMpToConnect($store_id: Int!, $callback_url: String!){
        getAvailableMpToConnect(store_id: $store_id, callback_url: $callback_url){
            brand_id
            store_id
            marketplaces {
                features
                is_under_development
                config {
                    data_type
                    id
                    store_detail_id
                    type
                    value
                  }
                credentials {
                    channel_code
                    channel_name
                    fields {
                        description
                        name
                        type
                    }
                    type
                    url
                    url_info {
                        url_channel
                        url_help_page
                        url_logo_channel
                        url_oauth2
                        url_square_logo_channel
                      }
                  }
                image_path
                image_url
                marketplace_code
                marketplace_name
                status
                store_detail_id
              }
        }
    }
`;

export const getLocationList = gql`
    query {
        getLocationList(pageSize: 0) {
        items {
            loc_id
            loc_code
            loc_name
            loc_city {
            id
            label
            }
            loc_street
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

export const disconnectMarketplaceChannel = gql`
    mutation disconnectMarketplaceChannel(
        $input: DisconnectMarketplaceChannelInput!
    ) {
        disconnectMarketplaceChannel(input: $input)
    }  
`;

export const reconnectMarketplaceChannel = gql`
    mutation reconnectMarketplaceChannel(
        $input: ReconnectMarketplaceChannelInput!
    ) {
        reconnectMarketplaceChannel(input: $input)
    }  
`;

export const registerMarketplaceChannel = gql`
mutation registerMarketplaceChannel(
    $input: RegisterMarketplaceChannelInput!
) {
    registerMarketplaceChannel(input: $input)
}  
`;

export const updateMarketplaceLocation = gql`
    mutation updateMarketplaceLocation (
        $loc_id: [Int]!
        $brand_id: String!
        $marketplace_code: String!
    ){
        updateMarketplaceLocation (
            loc_id: $loc_id
            brand_id: $brand_id
            marketplace_code: $marketplace_code
        )
    }
`;

export const updateConnectedMarketplace = gql`
    mutation updateConnectedMarketplace (
        $store_id: Int!
    ){
        updateConnectedMarketplace(store_id: $store_id)
    }
`;

export const getMarketplaceCredentials = gql`
    query getMarketplaceCredentials($store_detail_id: Int!){
        getMarketplaceCredentials(store_detail_id: $store_detail_id){
            data_type
            id
            marketplace_code
            marketplace_name
            store_detail_id
            type
            value
        }
    }
`;

export const getMarketplaceDefaultShippingMethods = gql`
    query getMarketplaceDefaultShippingMethods($marketplace_code: String!){
        getMarketplaceDefaultShippingMethods(marketplace_code: $marketplace_code){
            label
            value
        }
    }
`;

export const saveMarketplaceCredentials = gql`
mutation saveMarketplaceCredentials($store_detail_id: Int!, $input: [MarketplaceCredentialsInput!]!){
        saveMarketplaceCredentials(store_detail_id: $store_detail_id, input: $input)
    }
`;

export default {
    getStoreList,
    registerMarketplaceBrand,
    getAvailableMpToConnect,
    getLocationList,
    reconnectMarketplaceChannel,
    disconnectMarketplaceChannel,
    registerMarketplaceChannel,
    updateMarketplaceLocation,
    getMarketplaceCredentials,
    updateConnectedMarketplace,
    saveMarketplaceCredentials,
};
