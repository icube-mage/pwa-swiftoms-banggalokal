import { gql } from '@apollo/client';

export const getThirdPartyAppList = gql`
query getThirdPartyAppList(
    $pageSize: Int
    $currentPage: Int!
    $filter: ThirdPartyAppFilterInput
    $sort: ThirdPartyAppSortInput
  ) {
    getThirdPartyAppList(
      pageSize: $pageSize
      currentPage: $currentPage
      filter: $filter
      sort: $sort
    ) {
      items {
        entity_id
        status
        vendor {
          company_id
          company_name
          company_code
        }
        vendor_id
        integration_status
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

export const deleteThirdPartyApps = gql`
mutation deleteThirdPartyApps($ids: [Int]!) {
    deleteThirdPartyApps(ids: $ids)
  }
`;

export const createThirdPartyApp = gql`
mutation createThirdPartyApp($input: ThirdPartyAppInput!) {
    createThirdPartyApp(input: $input)
  }
`;

export const updateThirdPartyApp = gql`
mutation updateThirdPartyApp($id: Int!, $input: ThirdPartyAppInput!) {
    updateThirdPartyApp(id: $id, input: $input)
  }
`;

export const getThirdPartyApp = gql`
query getThirdPartyApp($id: Int!) {
    getThirdPartyApp(id: $id) {
      access_token
      entity_id
      integration_status
      app_type
      modules {
        module_code
        module_id
        status
        webhook_secret_key
        webhook_url
      }
      status
      vendor {
        company_id
        company_name
      }
      vendor_id
    }
  }
`;

export const getThirdPartyAppModules = gql`
{
  getThirdPartyAppModules {
    group
    label
    modules {
      label
      module_code
    }
  }
}
`;

export const generateThirdPartyAccessToken = gql`
{
  generateThirdPartyAccessToken
}
`;

export default {
    getThirdPartyAppList,
    deleteThirdPartyApps,
    updateThirdPartyApp,
    createThirdPartyApp,
    getThirdPartyApp,
    getThirdPartyAppModules,
    generateThirdPartyAccessToken,
};
