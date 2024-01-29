import { gql } from '@apollo/client';

export const getGeneralConfiguration = gql`
    query {
        getGeneralConfiguration {
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
                upload_dir
                value
                is_default
                comment
                depends {
                    field {
                        id
                        value
                    }
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
        }
    }
`;

export const saveStoreConfig = gql`
    mutation saveStoreConfig($input: [SaveStoreConfigInput]!) {
        saveStoreConfig(input: $input)
    }
`;

export default {
    getGeneralConfiguration,
    saveStoreConfig,
};
