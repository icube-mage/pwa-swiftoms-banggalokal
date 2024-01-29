import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/managepromotion/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getVendorPromotionList = (variables) => useLazyQuery(Schema.getVendorPromotionList, {
    variables, ...context, ...fetchPolicy,
});

export const saveVendorPromotion = (variables) => useMutation(Schema.saveVendorPromotion, {
    variables, ...context,
});

export const getVendorPromotionById = (variables) => useQuery(Schema.getVendorPromotionById, {
    variables, ...context, ...fetchPolicy,
});

export default {
    getVendorPromotionList,
    saveVendorPromotion,
    getVendorPromotionById,
};
