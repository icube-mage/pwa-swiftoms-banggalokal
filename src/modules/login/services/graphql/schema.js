import { gql } from '@apollo/client';

export const getCustomerToken = gql`
mutation getToken(
    $email: String!,
    $password: String!,
) {
  internalGenerateCustomerToken(email: $email, password: $password){
      token
    }
  }
`;

export const removeToken = gql`
mutation {
  internalDeleteCustomerToken{
    result
  }
}
`;

export const getCustomer = gql`
  query{
    customer{
      email
      firstname
      lastname
      customer_loc_code
      channel_code
      group{
        id
        code
      }
      customer_company_code
      login_method
    }
  }
`;

export const getStoreConfig = gql`
  query getStoreConfig($path: String!){
    getStoreConfig(path: $path)
  }
`;

export const validateUsername = gql`
  mutation ValidateUsername( $username: String! ) {
    validateUsername(username: $username) {
      isExists
      isSocialLogin
      isInternalLogin
      storeName
      email
    }
  }
`;

export const GenerateSocialLoginToken = gql`
  mutation GenerateSocialLoginToken (
    $email: String!
    $social_token : String!
    $otp_code: String
  ) {
    internalGenerateSocialLoginToken (
      email: $email,
      social_token: $social_token
      otp_code: $otp_code
    ) {
      token
    }
  }
`;

export const requestOtp = gql`
  mutation requestOtp(
    $phone_number: String!
    $email: String
    $store_name: String
  ){
    requestOtp(
      phone_number: $phone_number, 
      email: $email, 
      store_name: $store_name
    )
  }
`;

export const verifyOtp = gql`
  mutation verifyOtp(
    $phone_number: String!
    $email: String
    $otp_number: String!
  ){
    verifyOtp(
      phone_number: $phone_number, 
      email: $email, 
      otp_number: $otp_number
    )
  }
`;

export const getOtpConfig = gql`
  query { 
    getOtpConfig { 
      fields { 
        id
        value 
      } 
      label 
    } 
  }
`;

export const getSeller = gql`
query {
  getSeller {
    id
    name
    subscribtion_plan {
      company_id
      end_date
      limit_day
      limit_order
      start_date
      subscribtion_code
      subscribtion_name
      limit_user
      service_information_url
      billing_message
    }
  }
}
`;

export default {
    getCustomerToken,
    removeToken,
    getCustomer,
    getStoreConfig,
    validateUsername,
    GenerateSocialLoginToken,
    requestOtp,
    verifyOtp,
    getOtpConfig,
    getSeller,
};
