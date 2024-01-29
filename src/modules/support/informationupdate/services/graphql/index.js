import { useMutation, useLazyQuery } from '@apollo/client';
import * as Schema from '@modules/support/informationupdate/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'no-cache',
};

export const createInformationUpdate = (variables) => useMutation(Schema.createInformationUpdate, {
    variables, ...context,
});

export const getInformationUpdateList = (variables) => useLazyQuery(Schema.getInformationUpdateList, {
    variables, ...context, ...fetchPolicy,
});

export const deleteInformationUpdate = (variables) => useMutation(Schema.deleteInformationUpdate, {
    variables, ...context,
});

export default {
    createInformationUpdate,
    getInformationUpdateList,
    deleteInformationUpdate,
};
