import { gql } from '@apollo/client';

export const getAdminStoreList = gql`
query getAdminStoreList($filter: AdminStoreFilterInput) {
    getAdminStoreList(filter: $filter) {
      items {
        entity_id
        firstname
        lastname
        email
        customer_company_code
        group_id
        customer_loc_code
      }
    }
  }
  
`;

export const updateAdminStore = gql`
mutation updateAdminStore($id: Int!, $input: AdminStoreInput!) {
    updateAdminStore(id: $id, input: $input)
  }  
`;
