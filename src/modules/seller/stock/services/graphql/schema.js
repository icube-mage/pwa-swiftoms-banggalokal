import { gql } from '@apollo/client';

export const getSellerInventoryStockList = gql`
query getSellerInventoryStockList(
  $pageSize: Int!
  $currentPage: Int!
  $filter: SellerInventoryStockFilter
  $sort: SellerInventoryStockSort
  $search: String
) {
  getSellerInventoryStockList(
    pageSize: $pageSize
    currentPage: $currentPage
    filter: $filter
    sort: $sort
    search: $search
  ) {
    items {
      location_stock {
        channel_stock {
          channel {
            channel_id
            channel_name
            image_url
          }
          channel_code
          qty
          sync_history {
            current_stock
            inserted_at
            status {
              code
              label
            }
          }
        }
        loc_id
        loc_name
        qty_buffer
        qty_total
        sku
        stock
      }
      product {
        entity_id
        images {
          id
          url
        }
        name
        sku
        stock
        vendor_sku
      }
      product_parent {
        name
      }
      sync
      sync_history {
        channel {
          channel_name
          image_url
        }
        current_stock
        channel_code
        inserted_at
        message
        qty_update
        status {
          code
          label
        }
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

export const getSellerInventoryStockDetail = gql`
query getSellerInventoryStockDetail ($id: Int!) {
  getSellerInventoryStockDetail (id: $id) {
    entity_id
    images {
      url
    }
    name
    vendor_sku
    qty_buffer
    qty_saleable
    qty_total
    sku
    sync
    channels {
      channel {
        channel_name
        channel_code
        channel_id
        image_url
      }
      qty
    }
  }
}
`;

export const retrySyncStockToChannel = gql`
  mutation retrySyncStockToChannel($sku: String!, $channel_code: String!) {
    retrySyncStockToChannel(sku: $sku, channel_code: $channel_code) {
      status
      message
    }
  }
`;

export const syncStockToChannel = gql`
  mutation syncStockToChannel($input: [SyncStockToChannelInput]) {
    syncStockToChannel(input: $input) {
      status
      message
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
        name
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

export const getSellerStoresDefault = gql`
query getSellerStoresDefault(
  $pageSize: Int!
  $currentPage: Int!
  $filter: SellerStoreFilterInput
) {
  getSellerStores(
    pageSize: $pageSize
    currentPage: $currentPage
    filter: $filter
  ) {
    items {
      id
      name
      is_default
    }
  }
}
`;

export const getSellerInventoryStockFailedCount = gql`
query getSellerInventoryStockFailedCount(
  $pageSize: Int!
  $currentPage: Int!
  $filter: SellerInventoryStockFilter
) {
  getSellerInventoryStockList(
    pageSize: $pageSize
    currentPage: $currentPage
    filter: $filter
  ) {
    total_count
  }
}
`;

export const uploadStockXlsx = gql`
  mutation uploadStockXlsx($binary: String!) {
    uploadStockXlsx(binary: $binary)
  }
`;

export const downloadStockUpdateTemplateXlsx = gql`
  query  downloadStockUpdateTemplateXlsx($loc_id: Int!) {
    downloadStockUpdateTemplateXlsx(loc_id: $loc_id)
  }
`;

export const getActivity = gql`
  query getActivity($code: String!, $by_session: Boolean!) {
    getActivity(code: $code, by_session: $by_session) {
      activity_id
      activity_code
      run_status
      data_total
      data_processed
      started_at
      snapshot_at
      finished_at
      run_by
      run_type
      run_by_name
      attachment
      error_message
    }
  }
`;

export const getSellerChannelList = gql`
  query getSellerChannelList ($filter: ChannelFilterInput) {
    getSellerChannelList(
      filter: $filter
      sort: {}
      pageSize: 200
      currentPage: 1
    ) {
      items {
        channel_code
        channel_name
        channel_stock_config {
          channel_code
          push_stock
        }
        marketplace {
          image_url
        }
      }
    }
  }
`;

export const saveChannelStockConfig = gql`
  mutation saveChannelStockConfig($channel_code: String!, $push_stock: Boolean!) {
    saveChannelStockConfig(input: [{
      channel_code: $channel_code,
      push_stock: $push_stock
    }])
  }
`;

export const syncAllStockToChannel = gql`
  mutation syncAllStockToChannel($channel_code: [String]) {
    syncAllStockToChannel(channel_code: $channel_code)
  }
`;

export default {
    getSellerInventoryStockList,
    getSellerInventoryStockDetail,
    retrySyncStockToChannel,
    syncStockToChannel,
    getSellerStores,
    getSellerStoresDefault,
    getSellerInventoryStockFailedCount,
    uploadStockXlsx,
    downloadStockUpdateTemplateXlsx,
    getActivity,
    getSellerChannelList,
    saveChannelStockConfig,
    syncAllStockToChannel,
};
