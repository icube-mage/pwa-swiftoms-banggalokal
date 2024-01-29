import { gql } from '@apollo/client';

export const customerAccessControlList = gql`
    query{
        customerAccessControlList{
            acl_code
        }
    }
`;

export const getStoreConfig = gql`
    query getStoreConfig(
        $path: String!
    ){
        getStoreConfig(
            path: $path
        )
    }
`;

export const getStoreConfigWave = gql`
   {
        getStoreConfig(
            path: "swiftoms_pickpack/wave/enable"
        )
    }
`;

export const getStoreConfigBatch = gql`
   {
        getStoreConfig(
            path: "swiftoms_pickpack/batch/enable"
        )
    }
`;

export const getStoreConfigTada = gql`
   {
        getStoreConfig(
            path: "swiftoms_tada/general/enable"
        )
    }
`;

export const getStoreConfigVendor = gql`
   {
        getStoreConfig(
            path: "swiftoms_vendorportal/configuration/enable_vendor_portal"
        )
    }
`;

export const getStoreConfigBeneficiaries = gql`
   {
        getStoreConfig(
            path: "swiftoms_vendorportal/configuration/beneficiaries"
        )
    }
`;
export const isAccessAllowed = gql`
    query isAccessAllowed(
        $acl_code: String!
    ){
        isAccessAllowed(
            acl_code: $acl_code
        )
    }
`;

export const getStoreLogo = gql`
query{
    getStoreLogo{
      favicon
      logo
    }
  }
`;

export const getCurrency = gql`
query {
    currency {
      base_currency_code
      base_currency_symbol
      default_display_currency_code
      default_display_currency_symbol
      available_currency_codes
      exchange_rates {
        currency_to
        rate
      }
    }
  }
  `;

export default {
    customerAccessControlList,
    getStoreConfig,
    isAccessAllowed,
    getCurrency,
    getStoreConfigWave,
    getStoreConfigBatch,
    getStoreConfigTada,
    getStoreConfigVendor,
    getStoreConfigBeneficiaries,
};
