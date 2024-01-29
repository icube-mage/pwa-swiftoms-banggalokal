import { gql } from '@apollo/client';

export const getChannelList = gql`
query getChannelList($search: String) {
    getChannelList(
      search: $search
      pageSize: null
      filter: {
        framework: {eq: "Offline"}
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

export const deleteChannel = gql`
    mutation deleteChannel($id: Int!) {
        deleteChannel(id: $id)
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

export const createWebstoreChannel = gql`
    mutation createWebstoreChannel(
        $input: WebstoreInput!
    ) {
        createWebstoreChannel(input: $input)
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
    getCountryForMarketplace,
    getWebstoreCapability,
    createWebstoreChannel,
    getStoreConfig,
};
