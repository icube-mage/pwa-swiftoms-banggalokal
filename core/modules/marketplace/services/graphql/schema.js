import { gql } from '@apollo/client';

export const getMarketplaceList = gql`
    query getMarketplaceList(
        $pageSize: Int!
        $currentPage: Int!
        $filter: MarketplaceFilterInput
        $sort: MarketplaceSortInput
    ) {
        getMarketplaceList(
        pageSize: $pageSize
        currentPage: $currentPage
        filter: $filter
        sort: $sort
        ) {
            items {
                created_at
                is_active
                marketplace_code
                marketplace_name
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

export const getMarketplace = gql`
    query getMarketplaceList(
        $pageSize: Int!
        $currentPage: Int!
        $filter: MarketplaceFilterInput
        $sort: MarketplaceSortInput
    ) {
        getMarketplaceList(
        pageSize: $pageSize
        currentPage: $currentPage
        filter: $filter
        sort: $sort
        ) {
            items {
                attributes_map {
                    attribute_code
                    description
                    is_identifier
                    marketplace_attribute
                    marketplace_code
                }
                can_accept_order
                can_cancel_order
                can_complete_order
                can_pack_order
                can_update_order
                country_id
                credentials {
                    credentials_field
                    description
                    is_identifier
                    marketplace_code
                }
                features
                image_url
                is_active
                is_open_api
                marketplace_code
                marketplace_name
            }
        }
    }  
`;

export const registerMpadapterClient = gql`
mutation registerMpadapterClient($input: RegisterMpadapterClientInput!) {
    registerMpadapterClient(input: $input)
  }
`;

export const updateMarketplace = gql`
mutation updateMarketplace($mp_code: String!, $input: MarketplaceInput!) {
    updateMarketplace(mp_code:$mp_code, input: $input) {
        marketplace_code
    }
  }
`;

export const syncMarketplace = gql`
mutation syncMarketplace($callback_url: String!) {
    syncMarketplace(callback_url: $callback_url)
  }
`;

export const getMarketplaceFeatureList = gql`
    query getMarketplaceFeatureList {
        getMarketplaceFeatureList {
        code
        is_default_disabled
        label
        name
        value
        }
    }
`;

export const getMarketplaceCapabilities = gql`
query getMarketplaceCapabilities {
    getMarketplaceCapabilities
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
    getMarketplaceList,
    getMarketplace,
    registerMpadapterClient,
    updateMarketplace,
    syncMarketplace,
    getMarketplaceFeatureList,
    getMarketplaceCapabilities,
    getStoreConfig,
};
