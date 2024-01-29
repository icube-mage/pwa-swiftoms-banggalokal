import { gql } from '@apollo/client';

export const getUserConfiguration = gql`
    query {
        getUserConfiguration {
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
                comment
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
    getUserConfiguration,
    saveStoreConfig,
};
