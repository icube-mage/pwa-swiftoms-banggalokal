import { gql } from '@apollo/client';

export const getSellerChannelList = gql`
    query getSellerChannelList(
        $search: String
        $filter: ChannelFilterInput
        $sort: ChannelSortInput
        $pageSize: Int
        $currentPage: Int
    ) {
        getSellerChannelList(
        search: $search
        filter: $filter
        sort: $sort
        pageSize: $pageSize
        currentPage: $currentPage
        ) {
        items {
            brand_id
            channel_id
            channel_name
            channel_code
            image_url
            integrated_at
            marketplace {
              is_multiwarehouse
              marketplace_name
            }
            marketplace_code
            marketplace_status
            marketplace_status_label
            locations {
              loc_id
              loc_code
              loc_name
              marketplace_wh {
                marketplace_warehouse_id
              }
            }
            framework
            webstore_status
            marketplace_chat_status
            marketplace_chat_status_label
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

export const updateConnectedSellerMp = gql`
    mutation {
        updateConnectedSellerMp {
            channel_code
        }
    }
`;
export const disconnectSellerMp = gql`
  mutation disconnectSellerMp(
    $brand_id: String!
    $mp_code: String!
  ) {
    disconnectSellerMp(
      brand_id: $brand_id
      mp_code: $mp_code
    )
  }
`;

export const reconnectSellerMp = gql`
  mutation reconnectSellerMp(
    $brand_id: String!
    $mp_code: String!
    $callback_url: String!
  ) {
    reconnectSellerMp(
      brand_id: $brand_id
      mp_code: $mp_code
      callback_url: $callback_url
    )
  }
`;

export const getSellerMarketplaceIntegrationRequestList = gql`
query getSellerMarketplaceIntegrationRequestList(
    $pageSize: Int!
    $currentPage: Int!
    $filter: MarketplaceIntegrationRequestFilterInput
    $sort: MarketplaceIntegrationRequestSortInput
    $search: String
  ) {
    getSellerMarketplaceIntegrationRequestList(
      pageSize: $pageSize
      currentPage: $currentPage
      filter: $filter
      sort: $sort
      search: $search
    ) {
      items {
        created_at
        email
        entity_id
        marketplace_code
        marketplace_data {
          image_url
          marketplace_name
        } 
        processed_by
        requested_by
        status
        updated_at
        url_marketplace
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

export const cancelSellerMarketplaceIntegrationRequest = gql`
mutation cancelSellerMarketplaceIntegrationRequest($id: Int!) {
  cancelSellerMarketplaceIntegrationRequest(id: $id) {
    entity_id
  }
}
`;

export const getSellerStores = gql`
query getSellerStores(
  $pageSize: Int!
  $currentPage: Int!
  $filter: SellerStoreFilterInput
  $sort: SellerStoreSortInput
  $search: String
) {
  getSellerStores(
    pageSize: $pageSize
    currentPage: $currentPage
    filter: $filter
    sort: $sort
    search: $search
  ) {
    items {
      id
      code
      name
    }
  }
}
`;

export const getMarketplaceWarehouse = gql`
query getMarketplaceWarehouse($channel_code: String!) {
  getMarketplaceWarehouse(channel_code: $channel_code) {
    address
    id
    name
  }
}
`;

export const saveSellerChannel = gql`
mutation saveSellerChannel($id: Int!, $input: SellerChannelInput!) {
  saveSellerChannel(id: $id, input: $input) {
    channel_id
  }
}
`;

export const generateWebstoreUrl = gql`
mutation generateWebstoreUrl($store_code: String!) {
  generateWebstoreUrl(store_code: $store_code) {
    sessioning_url
    store_domain
  }
}
`;

export default {
    getSellerChannelList,
    updateConnectedSellerMp,
    disconnectSellerMp,
    reconnectSellerMp,
    getSellerMarketplaceIntegrationRequestList,
    cancelSellerMarketplaceIntegrationRequest,
    getSellerStores,
    getMarketplaceWarehouse,
    saveSellerChannel,
    generateWebstoreUrl,
};
