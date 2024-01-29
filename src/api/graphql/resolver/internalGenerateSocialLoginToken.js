/* eslint-disable no-param-reassign */
const requestGraph = require('../../../../core/api/graphql/request');
const { encrypt } = require('../../../../core/helpers/encryption');

const query = `mutation GenerateSocialLoginToken(
        $email: String!,
        $social_token: String!,
        $otp_code: String,
    ) {
        generateSocialLoginToken(email: $email, social_token: $social_token, otp_code: $otp_code){
            token
        }
    }
`;

const internalGenerateSocialLoginToken = async (parent, { email, social_token, otp_code }, context) => {
    const res = await requestGraph(query, { email, social_token, otp_code }, context);
    // context.session.destroy();
    if (res.generateSocialLoginToken) {
        context.session.token = encrypt(res.generateSocialLoginToken.token);
        return {
            originalToken: res.generateSocialLoginToken.token,
            token: encrypt(res.generateSocialLoginToken.token),
            message: 'welcome',
        };
    }
    return res;
};

module.exports = internalGenerateSocialLoginToken;
