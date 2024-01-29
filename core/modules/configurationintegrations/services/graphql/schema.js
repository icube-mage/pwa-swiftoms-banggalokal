import { gql } from '@apollo/client';

export const getIntegrationList = gql`
    query getIntegrationList($pageSize: Int!, $currentPage: Int!, $filter: IntegrationFilterInput, $sort: IntegrationSortInput) {
        getIntegrationList(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort) {
            items {
                integration_id
                name
                status
                status_label
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

export const deleteIntegration = gql`
    mutation deleteIntegration($id: [Int!]!) {
        deleteIntegration(id: $id)
    }
`;

export const getIntegrationById = gql`
    query getIntegrationById(
        $id: Int!,
    ){
        getIntegrationById(
            id: $id
        ){
            integration_id
            name
            email
            status
            callback_url
            identity_link_url
            consumer_key
            consumer_secret
            token
            token_secret
            all_resources
            resource
            conditions {
                attribute
                value
            }
        }
    }
`;

export const createIntegration = gql`
    mutation createIntegration($input: IntegrationInput!) {
        createIntegration(input: $input) {
        all_resources
        callback_url
        conditions {
            attribute
            operator
            value
        }
        consumer_key
        consumer_secret
        email
        identity_link_url
        integration_id
        name
        resource
        status
        status_label
        token
        token_secret
        }
    }
`;

export const updateIntegration = gql`
    mutation updateIntegration($input: IntegrationInput!) {
        updateIntegration(input: $input) {
        all_resources
        callback_url
        conditions {
            attribute
            operator
            value
        }
        consumer_key
        consumer_secret
        email
        identity_link_url
        integration_id
        name
        resource
        status
        status_label
        token
        token_secret
        }
    }
`;

export const generateIntegration = gql`
    mutation generateIntegration(
        $integration_id: Int,
        $clear_exist_token: Boolean
    ){
        generateIntegration(
            integration_id: $integration_id,
            clear_exist_token: $clear_exist_token
        ){
            consumer_key
            consumer_secret
            token
            token_secret
        }
    }
`;

export const getAclResource = gql`
query getAclResource {
    getAclResource {
      id
      title
      children {
        id
        title
        children {
          id
          title
          children {
            id
            title
            children {
                id
                title
            }
          }
        }
      }
    }
  }
`;

export default {
    getIntegrationList,
    deleteIntegration,
    getIntegrationById,
    createIntegration,
    updateIntegration,
    generateIntegration,
    getAclResource,
};
