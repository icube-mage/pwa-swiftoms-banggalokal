import { useMutation } from '@apollo/client';
import * as Schema from '@modules/userconfirm/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

export const confirmUserAccount = () => useMutation(Schema.confirmUserAccount, {
    ...context,
});

export const sendConfirmationLink = (variables) => useMutation(Schema.sendConfirmationLink, {
    variables, ...context,
});

export default {
    confirmUserAccount,
    sendConfirmationLink,
};
