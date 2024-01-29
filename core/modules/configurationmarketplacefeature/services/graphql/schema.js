import { gql } from '@apollo/client';

export const getMarketplaceFeatureList = gql`
    query {
        getMarketplaceFeatureList {
            code
            label
            name
            value
            is_default_disabled
        }
    }
`;

export const addMarketplaceFeature = gql`
    mutation addMarketplaceFeature($features: [String]!) {
        addMarketplaceFeature(features: $features)
    }
`;

export default {
    getMarketplaceFeatureList,
    addMarketplaceFeature,
};
