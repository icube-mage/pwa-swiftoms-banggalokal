import { gql } from '@apollo/client';

export const getMarketplaceList = gql`
    query getMarketplaceList($search: String, $filter: MarketplaceFilterInput) {
        getMarketplaceList(search: $search, pageSize: null, filter: $filter) {
            items {
                image_url
                marketplace_code
                marketplace_name
                features
                is_active
            }
        }
    }
`;

export const getSellerMpCredentials = gql`
query getSellerMpCredentials(
    $marketplace_code: String!
    $callback_url: String!
    $brand_id: String!
  ) {
    getSellerMpCredentials(
      marketplace_code: $marketplace_code
      callback_url: $callback_url
      brand_id: $brand_id
    ) {
      brand_id
      marketplaces {
        credentials {
          channel_code
          channel_name
          fields {
            description
            name
            tooltip
            required
            type
          }
          type
          url
          url_callback
        }
        features
        image_url
        marketplace_code
        marketplace_name
      }
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

export const connectSellerMp = gql`
  mutation connectSellerMp($input: IntegrateSellerMpInput!) {
    connectSellerMp(input: $input)
  }
`;

export const requestSellerMarketplaceIntegration = gql`
  mutation requestSellerMarketplaceIntegration($input: MarketplaceItegrationRequestInput!) {
    requestSellerMarketplaceIntegration(input: $input)
  }
`;

export const getWebstoreList = gql`
  query getWebstoreList {
    getWebstoreList {
      framework
      image_url
      is_active
      is_multiseller
      webstore_code
      webstore_name
      }
  }
`;

export const getWebstoreConfiguration = gql`
  query getWebstoreConfiguration {
    getWebstoreConfiguration {
      fields {
        id
        value
      }
    }
  }
`;

export const createWebstore = gql`
  mutation createWebstore($input: CreateWebStoreInput) {
    createWebstore( input: $input ) {
      message
      success
    }
  }
`;

export const registerBrandMp = gql`
  mutation registerBrandMp($marketplace_code: String!) {
    registerBrandMp(marketplace_code: $marketplace_code)
  }
`;

export default {
    getMarketplaceList,
    getSellerMpCredentials,
    getMarketplaceDefaultShippingMethods,
    connectSellerMp,
    requestSellerMarketplaceIntegration,
    getWebstoreList,
    getWebstoreConfiguration,
    createWebstore,
    registerBrandMp,
};
