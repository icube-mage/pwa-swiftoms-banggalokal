import { useMutation, useQuery } from '@apollo/client';
import * as Schema from '@modules/forgotpassword/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const requestResetPassword = (variables) => useMutation(Schema.requestResetPassword, {
    variables,
    ...context,
});

export const setNewPassword = (variables) => useMutation(Schema.setNewPassword, {
    variables,
    ...context,
});

export const validateResetPasswordLinkToken = (variables) => useQuery(Schema.validateResetPasswordLinkToken, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const resetPassword = (variables) => useMutation(Schema.resetPassword, {
    variables,
    ...context,
});

export default {
    requestResetPassword,
    setNewPassword,
    validateResetPasswordLinkToken,
    resetPassword,
};
