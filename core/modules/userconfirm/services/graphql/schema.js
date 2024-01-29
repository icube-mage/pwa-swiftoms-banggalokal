import { gql } from '@apollo/client';

export const confirmUserAccount = gql`
mutation confirmUserAccount(
  $input: ConfirmUserAccountInput!
) {
  confirmUserAccount(input: $input)
  }
`;

export const sendConfirmationLink = gql`
mutation sendConfirmationLink(
  $email: String!,
  $confirm_url: String!
) {
  sendConfirmationLink(email: $email, confirm_url: $confirm_url)
  }
`;
export default {
    confirmUserAccount,
    sendConfirmationLink,
};
