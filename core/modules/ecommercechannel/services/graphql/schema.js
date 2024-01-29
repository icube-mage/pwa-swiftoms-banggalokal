import { gql } from '@apollo/client';

export const getChannelList = gql`
    query getChannelList($search: String) {
        getChannelList(
            search: $search,
            pageSize: null,
            filter: {
                framework: {neq: "Offline"}
              }
            ) {
            items {
                brand_id
                brand_name
                channel_id
                channel_code
                channel_name
                framework
                image_url
                marketplace_status
                marketplace_code
            }
        }
    }
`;

export const updateConnectedMarketplace = gql`
    mutation {
        updateConnectedMarketplace {
            channel_code
        }
    }
`;

export const deleteChannel = gql`
    mutation deleteChannel($id: Int!) {
        deleteChannel(id: $id)
    }
`;

export const disconnectMarketplaceChannel = gql`
    mutation disconnectMarketplaceChannel(
        $input: DisconnectMarketplaceChannelInput!
    ) {
        disconnectMarketplaceChannel(input: $input)
    }  
`;

export const getMarketplaceList = gql`
    query getMarketplaceList($search: String, $filter: MarketplaceFilterInput) {
        getMarketplaceList(search: $search, pageSize: null, filter: $filter) {
            items {
                country_id
                country_name
                image_url
                marketplace_code
                marketplace_name
            }
        }
    }
`;

export const getWebstoreList = gql`
{
    getWebstoreList {
      framework
      image_url
      webstore_code
      webstore_name
      is_multiseller
    }
  }
`;

export const getCountryForMarketplace = gql`
{
    getCountryForMarketplace {
      country_id
      country_name
    }
  }
`;

export const getWebstoreCapability = gql`
    query getWebstoreCapability(
        $framework: String!
    ) {
        getWebstoreCapability(framework: $framework) {
            capabilities
            image_url
            name
        }
    }  
`;

export const getWebstoreCreds = gql`
    query getWebstoreCreds(
        $framework: String!
    ) {
        getWebstoreCreds(framework: $framework) {
            fields {
                description
                name
                type
              }
            framework
        }
    }  
`;

export const createWebstoreChannel = gql`
    mutation createWebstoreChannel(
        $input: WebstoreInput!
    ) {
        createWebstoreChannel(input: $input)
    }  
`;

export const getAvailableMpToConnect = gql`
query getAvailableMpToConnect(
    $store_id: Int!
    $marketplace_code: String!
    $callback_url: String!
  ) {
    getAvailableMpToConnect(
      store_id: $store_id
      marketplace_code: $marketplace_code
      callback_url: $callback_url
    ) {
      brand_id
      marketplaces {
        config {
          data_type
          id
          marketplace_code
          marketplace_name
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
            tooltip
            required
          }
          type
          url
          url_callback
          url_info {
            url_channel
            url_help_page
            url_logo_channel
            url_oauth2
            url_square_logo_channel
          }
        }
        features
        image_path
        image_url
        is_under_development
        marketplace_code
        marketplace_name
        status
        store_detail_id
      }
      store_id
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

export const getMarketplaceCapability = gql`
    query getMarketplaceCapability(
        $marketplace_code: String!
    ) {
        getMarketplaceCapability(marketplace_code: $marketplace_code) {
            capabilities
            image_url
            name
        }
    }  
`;

export const registerMarketplaceChannel = gql`
mutation registerMarketplaceChannel($input: RegisterMarketplaceChannelInput!) {
    registerMarketplaceChannel(input: $input)
  }
`;

export const getJdidOauth = gql`
query getJdidOauth($input: JdidOauthInput!) {
    getJdidOauth(input: $input)
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

export const reconnectMarketplaceChannel = gql`
mutation reconnectMarketplaceChannel($input: ReconnectMarketplaceChannelInput!) {
    reconnectMarketplaceChannel(input: $input)
  }
`;

export const getStoreConfigMp = gql`
    query {
        getStoreConfig(path: "swiftoms_mpadapter/api_config/api_client_key")
    }
`;

export const registerMpadapterClient = gql`
mutation registerMpadapterClient($input: RegisterMpadapterClientInput!) {
    registerMpadapterClient(input: $input)
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
    getChannelList,
    deleteChannel,
    updateConnectedMarketplace,
    disconnectMarketplaceChannel,
    getMarketplaceList,
    getWebstoreList,
    getCountryForMarketplace,
    getWebstoreCapability,
    getWebstoreCreds,
    createWebstoreChannel,
    getAvailableMpToConnect,
    registerMarketplaceBrand,
    getMarketplaceCapability,
    registerMarketplaceChannel,
    getJdidOauth,
    getMarketplaceDefaultShippingMethods,
    reconnectMarketplaceChannel,
    getStoreConfigMp,
    registerMpadapterClient,
    getStoreConfig,
};
