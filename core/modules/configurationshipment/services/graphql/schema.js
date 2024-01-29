import { gql } from '@apollo/client';

export const getConfigShippingMethod = gql`
    query {
        getConfigShippingMethod {
            path
            value
        }
    }
`;

export const updateStoreConfig = gql`
    mutation updateStoreConfig($input: StoreConfigInput!) {
        updateStoreConfig(input: $input) {
            __typename
        }
    }
`;

export const getShipmentConfiguration = gql`
    query {
        getShipmentConfiguration {
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
    getConfigShippingMethod,
    updateStoreConfig,
    getShipmentConfiguration,
    saveStoreConfig,
};
