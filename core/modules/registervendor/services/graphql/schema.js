import { gql } from '@apollo/client';

export const addNewVendorRequest = gql`
mutation addNewVendorRequest(
    $input: VendorRequestInput!,
) {
  addNewVendorRequest(input: $input){
      status
    }
  }
`;

export const getCountries = gql`
query {
  countries {
    full_name_english
    id
  }
}
`;

export const getRegion = gql`
query country($id: String){
  country(id: $id){
    available_regions{
      code
      id
      name
    }
  }
}
`;

export const getCityKecByRegionCode = gql`
    query getCityKecByRegionCode($region_code: String!) {
        getCityKecByRegionCode(region_code: $region_code) {
            label
            value
        }
    }
`;

export default {
    addNewVendorRequest,
    getCountries,
    getCityKecByRegionCode,
};
