import { gql } from '@apollo/client';

export const requestResetPassword = gql`
    mutation requestResetPassword($email: String!, $callback_url: String!) {
        requestResetPassword(email: $email, callback_url: $callback_url)
    }
`;

export const setNewPassword = gql`
    mutation setNewPassword($input: NewPasswordInput!) {
        setNewPassword(input: $input)
    }
`;

export const validateResetPasswordLinkToken = gql`
    query validateResetPasswordLinkToken($token: String!, $email: String!) {
        validateResetPasswordLinkToken(token: $token, email: $email)
    }
`;

export const resetPassword = gql`
mutation resetPassword(
    $email: String!
    $resetPasswordToken: String!
    $newPassword: String!
  ) {
    resetPassword(
      email: $email
      resetPasswordToken: $resetPasswordToken
      newPassword: $newPassword
    )
  }  
`;

export default {
    requestResetPassword,
    setNewPassword,
    validateResetPasswordLinkToken,
    resetPassword,
};
