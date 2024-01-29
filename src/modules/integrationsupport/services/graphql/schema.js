import { gql } from '@apollo/client';

export const getMarketplaceIntegrationRequestList = gql`
    query getMarketplaceIntegrationRequestList(
        $pageSize: Int!,
        $currentPage: Int!,
        $filter: MarketplaceIntegrationRequestFilterInput,
        $sort: MarketplaceIntegrationRequestSortInput,
    ){
        getMarketplaceIntegrationRequestList(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter: $filter,
            sort: $sort,
        ){
            items {
                entity_id
                increment_id
                marketplace_data {
                    image_url
                    marketplace_code
                    marketplace_name
                }
                url_marketplace
                company_data {
                    company_id
                    company_name
                }
                requested_by
                requestor_data {
                    email
                    id
                    name
                    telephone
                }
                created_at
                status
                processor_data {
                    name
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

export const updateMarketplaceIntegrationRequest = gql`
    mutation updateMarketplaceIntegrationRequest($id: Int!, $status: String!){
        updateMarketplaceIntegrationRequest( id: $id, status:$status){
            entity_id
            increment_id
            marketplace_code
            company_data {
                company_name
            }
            status
        }
    }
`;

export const getSellerMpCredentials = gql`
query getSellerMpCredentials(
    $marketplace_code: String!
    $callback_url: String!
    $brand_id: String
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

export const integrateMarketplaceIntegrationRequest = gql`
    mutation integrateMarketplaceIntegrationRequest(
        $id: Int!
        $status: String!
        $credentials: String!
        $brand_id: String!
    ) {
    integrateMarketplaceIntegrationRequest(
      id: $id
      status: $status
      credentials: $credentials
      brand_id: $brand_id
    ) {
      status
    }
  }
`;

export const registerBrandByAdmin = gql`
  mutation registerBrandByAdmin($marketplace_code: String!, $remote_company_id: Int!) {
    registerBrandByAdmin(marketplace_code: $marketplace_code, remote_company_id: $remote_company_id)
  }
`;

export default {
    getMarketplaceIntegrationRequestList,
    updateMarketplaceIntegrationRequest,
    getSellerMpCredentials,
    integrateMarketplaceIntegrationRequest,
    registerBrandByAdmin,
};
