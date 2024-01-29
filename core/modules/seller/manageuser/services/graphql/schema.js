import { gql } from '@apollo/client';

export const getSellerUsers = gql`
query getSellerUsers(
  $pageSize: Int!
  $currentPage: Int!
  $filter: SellerUserFilterInput
  $sort: SellerUserSortInput
  $search: String
) {
  getSellerUsers(
    pageSize: $pageSize
    currentPage: $currentPage
    filter: $filter
    sort: $sort
    search: $search
  ) {
    items {
      customer_loc_code
      email
      id
      locations {
        loc_code
        loc_name
      }
      name
      telephone
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

export const createSellerUser = gql`
mutation createSellerUser($input: SellerUserInput!) {
  createSellerUser(input: $input) {
    customer_loc_code
    email
    id
    name
    telephone
  }
}
`;

export const editSellerUser = gql`
mutation editSellerUser($input: EditSellerUserInput!) {
  editSellerUser(input: $input) {
    customer_loc_code
    email
    id
    name
    telephone
  }
}
`;

export const deleteSellerUser = gql`
mutation deleteSellerUser($ids: [Int!]!) {
  deleteSellerUser(ids: $ids)
}
`;

export const getSellerStores = gql`
query {
  getSellerStores {
    items {
      id
      code
      name
    }
  }
}
`;

export const getSellerStoreOptions = gql`
{
  getSellerStoreOptions {
    label
    value
  }
}
`;

export const getSellerAclTree = gql`
query getSellerAclTree {
  getSellerAclTree {
    children {
      children {
        label
        value
      }
      label
      value
    }
    label
    value
  }
}
`;

export const getAclByCustomerId = gql`
    query getAclByCustomerId($customer_id: Int!) {
        getAclByCustomerId(customer_id: $customer_id) {
            acl_code
            use_group_acl
        }
    }
`;

export const getLocationList = gql`
    query getLocationList($pageSize: Int!, $currentPage: Int!, $filter: LocationFilterInput, $sort: LocationSortInput, $search: String) {
        getLocationList(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort, search: $search) {
            items {
                loc_id
                loc_code
                loc_name
                loc_city {
                    id
                    label
                }
                loc_street
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

export default {
    getSellerUsers,
    createSellerUser,
    deleteSellerUser,
    getSellerStores,
    getSellerStoreOptions,
    getLocationList,
    getSellerAclTree,
    editSellerUser,
    getAclByCustomerId,
};
