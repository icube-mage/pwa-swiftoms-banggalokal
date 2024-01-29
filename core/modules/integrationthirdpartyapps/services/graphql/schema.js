import { gql } from '@apollo/client';

export const getIntegrationAppList = gql`
  query getIntegrationAppList(
    $filter: IntegrationAppFilterInput
    $sort: IntegrationAppSortInput
    $pageSize: Int
    $currentPage: Int
  ) {
    getIntegrationAppList(
      filter: $filter
      sort: $sort
      pageSize: $pageSize
      currentPage: $currentPage
    ) {
      items {
        channel_ids
        company_ids
        entity_id
        is_all_channels
        is_all_companies
        is_all_locations
        loc_ids
        modules {
          module_code
          module_id
          status
          webhook_secret_key
          webhook_url
          profile_id
        }
        name
        status
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

export const deleteIntegrationApp = gql`
mutation deleteIntegrationApp($ids: [Int]!) {
    deleteIntegrationApp(ids: $ids)
  }
`;

export const createIntegrationApp = gql`
mutation createIntegrationApp($input: IntegrationAppInput!) {
  createIntegrationApp(input: $input)
}
`;

export const updateIntegrationApp = gql`
mutation updateIntegrationApp($id: Int!, $input: IntegrationAppInput!) {
    updateIntegrationApp(id: $id, input: $input)
  }
`;

export const getXtentoProfile = gql`
query getXtentoProfile($profile_id: Int!) {
  getXtentoProfile(profile_id: $profile_id) {
    enabled
    entity
    name
    profile_id
    xsl_template
  }
}
`;

export const editXtentoProfile = gql`
mutation editXtentoProfile($profile_id: Int!, $input: EditXtentoProfileInput!) {
  editXtentoProfile(profile_id: $profile_id, input: $input)
}
`;

export const getWebhookOutputAvailableFields = gql`
query getWebhookOutputAvailableFields(
  $id: String!
  $profile_id: Int!
) {
  getWebhookOutputAvailableFields(
    id: $id
    type: shipment
    profile_id: $profile_id
  ) {
    key
    value
    is_leaf
    children {
      key
      value
      is_leaf
      children {
        key
        value
        is_leaf
        children {
          key
          value
          is_leaf
          children {
            key
            value
            is_leaf
            children {
              key
              value
              is_leaf
            }
          }
        }
      }
    }
  }
}
`;

export const testWebhookOutputTemplate = gql`
mutation testWebhookOutputTemplate($input: TestWebhookOutputTemplateInput!) {
  testWebhookOutputTemplate(input: $input)
}
`;

export const getIntegrationAppModules = gql`
{
  getIntegrationAppModules {
    group
    label
    modules {
      label
      module_code
    }
  }
}
`;

export default {
    getIntegrationAppList,
    deleteIntegrationApp,
    updateIntegrationApp,
    createIntegrationApp,
    getXtentoProfile,
    editXtentoProfile,
    getWebhookOutputAvailableFields,
    testWebhookOutputTemplate,
    getIntegrationAppModules,
};
