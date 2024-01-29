import { gql } from '@apollo/client';

export const getUserProfilePicture = gql`
    query {
        getUserProfilePicture
    }
`;

export const getCustomer = gql`
    query {
        customer {
            firstname
            customer_loc_code
            phone_number
            email
        }
    }
`;

export const saveUserProfilePicture = gql`
    mutation saveUserProfilePicture ($profile_picture: String!)  {
        saveUserProfilePicture (profile_picture: $profile_picture)
    }
`;

export const updateCustomer = gql`
    mutation updateCustomer($firstname: String, $phone_number: String) {
        updateCustomer(input: { firstname: $firstname, phone_number: $phone_number }) {
            customer {
                firstname
                phone_number
                email
            }
        }
    }  
`;

export const updateCustomerEmail = gql`
    mutation updateCustomer($email: String, $password: String) {
        updateCustomer(input: { email: $email, password: $password }) {
            customer {
                email
            }
        }
    }
`;
export const changeCustomerPassword = gql`
    mutation changeCustomerPassword($currentPassword: String!, $newPassword: String!){
        changeCustomerPassword (currentPassword: $currentPassword, newPassword: $newPassword){
            email
            firstname
            phone_number
        }
    }
`;

export const getSellerStoreOptions = gql`
{
    getSellerStoreOptions {
      label
      value
    }
  }
`;

export default {
    getUserProfilePicture,
    getCustomer,
    saveUserProfilePicture,
    updateCustomer,
    updateCustomerEmail,
    changeCustomerPassword,
    getSellerStoreOptions,
};
