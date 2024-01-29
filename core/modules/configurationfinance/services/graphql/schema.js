import { gql } from '@apollo/client';

export const getFinanceConfiguration = gql`
    query {
        getFinanceConfiguration {
            label
            fields {
                id
                type
                label
                fields {
                    validate
                }
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
                validate
                depends {
                    field {
                        id
                        value
                    }
                }
                fields {
                    id
                    type
                    label
                    options {
                        label
                        value
                    }
                    form_fields {
                        id
                        label
                        type
                        options {
                            label
                            value
                        }
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
    getFinanceConfiguration,
    saveStoreConfig,
};
