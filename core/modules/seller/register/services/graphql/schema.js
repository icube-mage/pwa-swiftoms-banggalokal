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

export default {
    createSeller,
};
