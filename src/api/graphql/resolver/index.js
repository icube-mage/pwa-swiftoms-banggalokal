/* eslint-disable no-param-reassign */
const internalGenerateCustomerToken = require('../../../../core/api/graphql/resolver/internalGenerateCustomerToken');
const internalCreateCustomerToken = require('../../../../core/api/graphql/resolver/internalCreateCustomerToken');
const internalGenerateCustomerTokenOtp = require('../../../../core/api/graphql/resolver/internalGenerateCustomerTokenOtp');
const internalDeleteCustomerToken = require('../../../../core/api/graphql/resolver/internalDeleteCustomerToken');
const internalGenerateSession = require('../../../../core/api/graphql/resolver/internalGenerateSession');
const internalDeleteSession = require('../../../../core/api/graphql/resolver/internalDeleteSession');
const internalGenerateSocialLoginToken = require('./internalGenerateSocialLoginToken');

const resolver = {
    Mutation: {
        internalGenerateCustomerToken,
        internalCreateCustomerToken,
        internalGenerateCustomerTokenOtp,
        internalDeleteCustomerToken,
        internalGenerateSession,
        internalDeleteSession,
        internalGenerateSocialLoginToken,
    },
};

module.exports = resolver;
