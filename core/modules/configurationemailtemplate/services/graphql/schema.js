import { gql } from '@apollo/client';

export const getEmailTemplateList = gql`
  query getEmailTemplateList (
      $filter: EmailTemplateFilterInput
      $sort: EmailTemplateSortInput
      $pageSize: Int
      $currentPage: Int
    ) {
      getEmailTemplateList(
        filter: $filter
        sort: $sort
        pageSize: $pageSize
        currentPage: $currentPage
      ) {
        items {
          template_id
          template_code
          template_subject
          template_type
          added_at
          modified_at
          template_text
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

export const deleteEmailTemplate = gql`
  mutation deleteEmailTemplate($id: [Int!]!){
    deleteEmailTemplate(id: $id)
  }
`;

export const getDefaultTemplateOption = gql`
  query getDefaultTemplateOption {
    getDefaultTemplateOption {
      group
      label
      value
    }
  }
`;

export const createEmailTemplate = gql`
  mutation createEmailTemplate($input: EmailTemplateInput!) {
    createEmailTemplate(input: $input)
  }
`;

export const loadTemplateById = gql`
  query loadTemplateById($id: String!){
    loadTemplateById(id: $id)
  }
`;

export const getEmailTemplateById = gql`
  query getEmailTemplateById($id: Int!) {
    getEmailTemplateById(id: $id) {
      added_at
      modified_at
      template_code
      template_id
      template_subject
      template_text
      template_type
      template_styles
    }
  }
`;

export const updateEmailTemplate = gql`
  mutation updateEmailTemplate($id: Int!, $input: EmailTemplateInput!) {
    updateEmailTemplate(id: $id, input: $input)
  }
`;

export const previewTemplateById = gql`
  query previewTemplateById($id: Int!){
    previewTemplateById(id: $id)
  }
`;

export default {
    getEmailTemplateList,
    deleteEmailTemplate,
    getDefaultTemplateOption,
    createEmailTemplate,
    loadTemplateById,
    getEmailTemplateById,
    updateEmailTemplate,
    previewTemplateById,
};
