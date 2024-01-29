import { gql } from '@apollo/client';

export const getCustomer = gql`
    query {
        customer {
            email
            firstname
            lastname
            customer_loc_code
            channel_code
            customer_company_code
            phone_number
        }
    }
`;

export const getDashboardData = gql`
    query {
        getDashboardData {
            order_new
            order_no_allocation
            order_failed
            shipment_unconfirmed_total
            shipment_unconfirmed_store_pickup
            shipment_unconfirmed_home_delivery
            shipment_unconfirmed_marketplace
            shipment_cannot_fulfill
            return_new
        }
    }
`;

export const getChannelList = gql`
    query {
        getChannelList(pageSize: null) {
            items {
                channel_id
                channel_code
                channel_name
                framework
                image_url
                virtual_stock_list
                location_list
            }
            total_count
            page_info {
                page_size
                current_page
                total_pages
            }
        }
    }
`;

export const changePassword = gql`
    mutation changeCustomerPassword($currentPassword: String!, $newPassword: String!) {
        changeCustomerPassword(currentPassword: $currentPassword, newPassword: $newPassword) {
            email
            firstname
            lastname
        }
    }
`;

export const changeEmail = gql`
    mutation updateCustomer($email: String, $password: String) {
        updateCustomer(input: { email: $email, password: $password }) {
            customer {
                id
                firstname
                email
            }
        }
    }
`;

export const changeName = gql`
    mutation updateCustomer($firstname: String, $lastname: String, $phone_number: String) {
        updateCustomer(input: { firstname: $firstname, lastname: $lastname, phone_number: $phone_number }) {
            customer {
                id
                firstname
                lastname
                email
            }
        }
    }
`;

export default {
    getCustomer,
    getDashboardData,
    getChannelList,
    changePassword,
    changeEmail,
    changeName,
};
