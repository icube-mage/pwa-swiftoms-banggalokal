import { gql } from '@apollo/client';

export const getMpAdapterConfiguration = gql`
    query {
        getMpAdapterConfiguration {
            fields {
              type
              id
              value
              is_default
              comment
              label
              can_restore
              options {
                value
                label
              }
              depends {
                field {
                  id
                  value
                }
              }
              form_fields {
                id
                label
              }
              fields {
                form_fields {
                  id
                  label
                }
                depends {
                  field {
                    id
                    value
                  }
                }
                can_restore
                value
                type
                id
                value
                is_default
                label
                comment
                options {
                    value
                    label
                }
              }
            }
            label
        }
    }
`;

export const saveStoreConfig = gql`
    mutation saveStoreConfig($input: [SaveStoreConfigInput]!) {
        saveStoreConfig(input: $input)
    }
`;

export default {
    getMpAdapterConfiguration,
    saveStoreConfig,
};
