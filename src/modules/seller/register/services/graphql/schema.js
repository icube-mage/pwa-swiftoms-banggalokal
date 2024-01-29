import { gql } from '@apollo/client';

export const createSeller = gql`
mutation createSeller(
    $input: SellerInput!
) {
  createSeller(input: $input){
      name
      status
    }
  }
`;

export const checkIfSellerEmailExist = gql`
  query checkIfSellerEmailExist( $email: String!) {
    checkIfSellerEmailExist( email: $email)
  }
`;

export default {
    createSeller,
    checkIfSellerEmailExist,
};
