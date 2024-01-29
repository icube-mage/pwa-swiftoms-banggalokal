import { useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/integrationsupport/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getMarketplaceIntegrationRequestList = (variables) => useLazyQuery(Schema.getMarketplaceIntegrationRequestList, {
    variables, ...context, ...fetchPolicy,
});

export const updateMarketplaceIntegrationRequest = (variables) => useMutation(Schema.updateMarketplaceIntegrationRequest, {
    variables, ...context,
});

export const getSellerMpCredentials = (options) => useLazyQuery(Schema.getSellerMpCredentials, {
    ...options,
    ...context,
    ...fetchPolicy,
});

export const integrateMarketplaceIntegrationRequest = (variables) => useMutation(Schema.integrateMarketplaceIntegrationRequest, {
    variables, ...context,
});

export const registerBrandByAdmin = (variables) => useMutation(Schema.registerBrandByAdmin, {
    variables, ...context,
});

export default {
    getMarketplaceIntegrationRequestList,
    updateMarketplaceIntegrationRequest,
    getSellerMpCredentials,
    integrateMarketplaceIntegrationRequest,
    registerBrandByAdmin,
};
