import { gql } from '@apollo/client';

export const getSessionMessageListSchema = gql`
    query getSessionList(
        $agent_code: String
    ){
        getSessionMessageList(agent_code: $agent_code, pageSize: 1000, currentPage: 1) {
            answered
            # chat_session_id
            chat_id
            created_at
            customer_email
            customer_id
            customer_name
            ip_address
            is_read
            agent_code
            updated_at
            last_message{
                time
                message
            }
        }
    }
`;

export const getMessageListSchema = gql`
    query getMessageList(
        $chat_session_id: Int!
    ){
        getMessageList(
            chat_session_id: $chat_session_id, 
            pageSize: 1000, 
            currentPage: 1
        ) {
            # chat_session_id
            chat_id
            customer_email
            customer_id
            customer_name
            messages {
                body_message
                # chat_message_id
                message_id
                created_at
                is_robot
                question_id
                updated_at
                sender
                is_read
                is_read_customer
                filename
                filetype
            }
            agent_code
        }
    }
`;

export const addMessageSchema = gql`
    mutation sendMessage(
        $body_message: String!
        $chat_session_id: Int!
        $customer_email: String!
        $customer_id: Int
        $customer_name: String!
        $is_robot: Int!
        $agent_code: String!
        $sender: Int!
        $file: String
    ){
        addMessage(
            input: {
                body_message: $body_message
                chat_session_id: $chat_session_id
                customer_email: $customer_email
                customer_id: $customer_id
                customer_name: $customer_name
                is_robot: $is_robot
                agent_code: $agent_code
                sender: $sender
                file: $file
            }
        ) {
            body_message
            chat_message_id
            chat_session_id
            created_at
            customer_email
            customer_id
            customer_name
            is_robot
            product_id
            agent_code
            updated_at
        }
    }
`;

export const getStoreConfig = gql`
query getStoreConfig($path: String!){
        getStoreConfig(path: $path)
    }
`;

export const agentCodeSchema = gql`
    {
        customer{
            customer_company_code
        }
    }
`;
