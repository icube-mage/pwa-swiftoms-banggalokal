import { gql } from '@apollo/client';

export const getConfigurationTadaList = gql`
    query getConfigurationTadaList(
        $pageSize: Int!,
        $currentPage: Int!,
        $filter: ConfigurationTadaInputFilter,
        $sort: ConfigurationTadaSort
    ){
        getConfigurationTadaList(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter: $filter,
            sort: $sort
        ){
            items {
                id
                channel_name
                username
                password
                api_key
                api_secret
                program_id
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

export const getConfigurationTadaById = gql`
    query getConfigurationTadaById(
        $id: Int!,
    ){
        getConfigurationTadaById(
            id: $id
        ){
            id
            channel_name
            username
            password
            api_key
            api_secret
            program_id
            catalog_id
        }
    }
`;

export const createConfigurationTada = gql`
    mutation createConfigurationTada(
        $channel_name: String!,
        $username: String!,
        $password: String!,
        $api_key: String!,
        $api_secret: String!,
        $program_id: String!,
        $catalog_id: String!,
    ){
        createConfigurationTada(
            input: {
                channel_name: $channel_name,
                username: $username,
                password: $password,
                api_key: $api_key,
                api_secret: $api_secret,
                program_id: $program_id,
                catalog_id: $catalog_id,
            }
        ){
            channel_name
            username
            password
            api_key
            api_secret
            program_id
            catalog_id
        }
    }
`;

export const updateConfigurationTada = gql`
    mutation updateConfigurationTada(
        $id: Int!,
        $channel_name: String!,
        $username: String!,
        $password: String!,
        $api_key: String!,
        $api_secret: String!,
        $program_id: String!,
        $catalog_id: String!,
    ){
        updateConfigurationTada(
            id: $id,
            input: {
                channel_name: $channel_name,
                username: $username,
                password: $password,
                api_key: $api_key,
                api_secret: $api_secret,
                program_id: $program_id,
                catalog_id: $catalog_id,
            }
        ){
            id
            channel_name
            username
            password
            api_key
            api_secret
            program_id
            catalog_id
        }
    }
`;

export const deleteConfigurationTada = gql`
    mutation deleteConfigurationTada (
        $id: Int!
    ){
        deleteConfigurationTada(
            id: $id
        )
    }
`;

export const multideleteConfigurationTada = gql`
    mutation multideleteConfigurationTada (
        $id: [Int!]!
    ){
        multideleteConfigurationTada(
            id: $id
        )
    }
`;

export default {
    getConfigurationTadaList,
    getConfigurationTadaById,
    createConfigurationTada,
    updateConfigurationTada,
    deleteConfigurationTada,
    multideleteConfigurationTada,
};
