/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const getRmaConfiguration = gql`
    query{
        getRmaConfiguration{
          label
          fields{
              id
              type
              label
              options{
                value
                label
              }
              form_fields{
                id
                label
                is_disabled
              }
              upload_dir
              value
              is_default
              can_restore
              comment
              is_add
              is_delete
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
    getRmaConfiguration,
    saveStoreConfig,
};
