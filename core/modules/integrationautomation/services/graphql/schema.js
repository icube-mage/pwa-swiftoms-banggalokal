import { gql } from '@apollo/client';

export const getAutomationList = gql`
query getAutomationList(
  $filter: AutomationFilterInput
  $sort: AutomationSortInput
  $pageSize: Int
  $currentPage: Int
) {
  getAutomationList(
    filter: $filter
    sort: $sort
    pageSize: $pageSize
    currentPage: $currentPage
  ) {
    items {
      actions {
        action_id
        action_type
        connection_detail {
          key
          value
        }
        credential_id
        template
      }
      conditions
      created_at
      created_by
      automation_id
      event
      event_id
      name
      status
      updated_at
      updated_by
      execute_per_entity
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

export const deleteAutomation = gql`
mutation deleteAutomation($ids: [Int]!) {
    deleteAutomation(ids: $ids)
  }
`;

export const createAutomation = gql`
mutation createAutomation($input: AutomationInput!) {
  createAutomation(input: $input) {
    automation_id
  }
}
`;

export const updateAutomation = gql`
mutation updateAutomation($id: Int!, $input: AutomationInput!) {
    updateAutomation(id: $id, input: $input) {
      automation_id
    }
  }
`;

export const getCredentialList = gql`
query getCredentialList(
  $filter: CredentialFilterInput
  $sort: CredentialSortInput
  $pageSize: Int
  $currentPage: Int
) {
  getCredentialList(
    filter: $filter
    sort: $sort
    pageSize: $pageSize
    currentPage: $currentPage
  ) {
    items {
      credential_detail {
        key
        value
      }
      credential_id
      credential_name
      credential_type
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

export const addCredential = gql`
mutation addCredential(
  $credential_detail: [CredentialDetailInput]
  $credential_name: String!
) {
  addCredential(
    input: {
      credential_detail: $credential_detail
      credential_name: $credential_name
      credential_type: rabbitmq
    }
  ) {
    credential_detail {
      key
      value
    }
    credential_id
    credential_name
    credential_type
  }
}
`;

export const updateCredential = gql`
mutation updateCredential(
  $id: Int!
  $credential_detail: [CredentialDetailInput]
  $credential_name: String!
) {
  updateCredential(
    id: $id
    input: {
      credential_detail: $credential_detail
      credential_name: $credential_name
      credential_type: rabbitmq
    }
  ) {
    credential_detail {
      key
      value
    }
    credential_id
    credential_name
    credential_type
  }
}
`;

export const deleteCredential = gql`
mutation deleteCredential($id: Int!) {
  deleteCredential(id: $id)
}
`;

export const getEventList = gql`
query getEventList(
  $filter: EventFilterInput
  $sort: EventSortInput
  $pageSize: Int
  $currentPage: Int
) {
  getEventList(
    filter: $filter
    sort: $sort
    pageSize: $pageSize
    currentPage: $currentPage
  ) {
    items {
      conditions
      entity_name
      entity_type
      event_id
      event_label
      event_name
      use_rabbitmq
      entity_id_field_name
      template
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

export const getExportAvailableFields = gql`
query getExportAvailableFields($event_id: Int!, $export_id: String!) {
  getExportAvailableFields(event_id: $event_id, export_id: $export_id) {
    is_leaf
    key
    value
    children {
      is_leaf
      key
      value
      children {
        is_leaf
        key
        value
        children {
          is_leaf
          key
          value
          children {
            is_leaf
            key
            value
            children {
              is_leaf
              key
              value
              children {
                is_leaf
                key
                value
                children {
                  is_leaf
                  key
                  value
                  children {
                    is_leaf
                    key
                    value
                    children {
                      is_leaf
                      key
                      value
                      children {
                        is_leaf
                        key
                        value
                        children {
                          is_leaf
                          key
                          value
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

export const testExportTemplate = gql`
mutation testExportTemplate(
  $event_id: Int!
  $export_id: String!
  $xsl_template: String!
  $execute_per_entity: Boolean
) {
  testExportTemplate(
    input: {
      event_id: $event_id
      export_id: $export_id
      xsl_template: $xsl_template
      execute_per_entity: $execute_per_entity
    }
  )
}
`;

export const getEventConditions = gql`
query getEventConditions($event_id: Int!, $value: String, $attribute_code: String) {
  getEventConditions(event_id: $event_id, value: $value, attribute_code: $attribute_code) {
    aggregator_option {
      label
      value
    }
    conditions {
      attribute_code
      has_child
      label
      value
      children {
        attribute_code
        has_child
        label
        value
        children {
          attribute_code
          has_child
          label
          value
          children {
            attribute_code
            has_child
            label
            value
          }
        }
      }
    }
    operator_option {
      label
      value
    }
    value_option {
      label
      value
    }
    value_element_type
  }
}
`;

export const getAutomationLogList = gql`
  query getAutomationLogList(
    $filter: AutomationLogFilterInput
    $sort: AutomationLogSortInput
    $pageSize: Int
    $currentPage: Int
    $search: String
  ) {
    getAutomationLogList(
      filter: $filter
      sort: $sort
      pageSize: $pageSize
      currentPage: $currentPage
      search: $search
    ) {
      items {
        automation_id
        created_at
        event
        log_id
        result
        result_message
        triggered_by
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

export const getAutomationLog = gql`
  query getAutomationLogList(
    $filter: AutomationLogFilterInput
    $sort: AutomationLogSortInput
    $pageSize: Int
    $currentPage: Int
    $search: String
  ) {
    getAutomationLogList(
      filter: $filter
      sort: $sort
      pageSize: $pageSize
      currentPage: $currentPage
      search: $search
    ) {
      items {
        action
        payload
        result_message
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

export const manualExecution = gql`
mutation manualExecution($automation_id: Int!, $entity_id: String) {
  manualExecution(automation_id: $automation_id, entity_id: $entity_id)
}
`;

export const updateAutomationStatus = gql`
mutation updateAutomationStatus($ids: [Int]!, $status: Boolean!) {
  updateAutomationStatus(ids: $ids, status: $status)
}
`;

export default {
    getAutomationList,
    deleteAutomation,
    updateAutomation,
    createAutomation,
    getCredentialList,
    addCredential,
    updateCredential,
    deleteCredential,
    getEventList,
    getExportAvailableFields,
    testExportTemplate,
    getEventConditions,
    getAutomationLogList,
    manualExecution,
    updateAutomationStatus,
    getAutomationLog,
};
