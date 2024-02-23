import { gql } from '@apollo/client';

export const getMetaAdsConfiguration = gql`
query {
    getMetaAdsConfiguration {
      label
      fields {
        id
        type
        label
        options {
          value
          label
        }
        form_fields {
          id
          label
        }
        can_restore
        value
        is_default
      }
    }
  }
`;

export const saveStoreConfig = gql`
    mutation saveStoreConfig($input: [SaveStoreConfigInput]!) {
        saveStoreConfig(input: $input)
    }
`;

export default {
    getMetaAdsConfiguration,
    saveStoreConfig,
};
