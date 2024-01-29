import { gql } from '@apollo/client';

export const getCategoryList = gql`
query getCategoryList($filter: CategoryFilterInput) {
    getCategoryList(filter: $filter) {
      id
      name
      description
      level
      is_active
      children {
        id
        name
        description
        level
        is_active
        children {
          id
          name
          description
          level
          is_active
          children {
            id
            name
            description
            level
            is_active
          }
        }
      }
    }
  }
`;

export const deleteCategory = gql`
    mutation deleteCategory($id: [Int]!) {
        deleteCategory(id: $id)
    }
`;

export const createCategory = gql`
    mutation createCategory($input: CategoryInput!) {
        createCategory(input: $input)
    }
`;

export const updateCategory = gql`
    mutation updateCategory($id: Int!, $input: CategoryInput!) {
        updateCategory(id: $id, input: $input)
    }
`;

export default {
    getCategoryList,
    deleteCategory,
    createCategory,
    updateCategory,
};
