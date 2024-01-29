import { useMutation, useLazyQuery, useQuery } from '@apollo/client';
import * as Schema from '@sellermodules/promotion/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getSellerPromotions = (variables) => useLazyQuery(Schema.getSellerPromotions, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getSellerPromotionsById = (variables) => useQuery(Schema.getSellerPromotionsById, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const saveSellerPromotion = (variables) => useMutation(Schema.saveSellerPromotion, {
    variables,
    ...context,
});

export const saveSellerPromotionCartFixed = (variables) => useMutation(Schema.saveSellerPromotionCartFixed, {
    variables,
    ...context,
});

export const getSellerPromotionsBundle = (variables) => useLazyQuery(Schema.getSellerPromotionsBundle, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getSellerProductPromotions = (variables) => useLazyQuery(Schema.getSellerProductPromotions, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const createSellerPromotionBundle = (variables) => useMutation(Schema.createSellerPromotionBundle, {
    variables,
    ...context,
});

export const getSellerPromotionBundleById = (variables) => useQuery(Schema.getSellerPromotionBundleById, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const disablePromotionBundle = (variables) => useMutation(Schema.disablePromotionBundle, {
    variables,
    ...context,
});

export const getSellerStores = (options) => useQuery(Schema.getSellerStores, {
    ...options, ...context, ...fetchPolicy,
});

export const deletePromotionBundle = (variables) => useMutation(Schema.deletePromotionBundle, {
    variables,
    ...context,
});

export const getSellerDiscountList = (variables) => useLazyQuery(Schema.getSellerDiscountList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const saveSellerDiscount = (variables) => useMutation(Schema.saveSellerDiscount, {
    variables,
    ...context,
});

export const downloadSellerDiscTemplate = (options) => useLazyQuery(Schema.downloadSellerDiscTemplate, {
    ...options,
    ...context,
    ...fetchPolicy,
});

export const uplodSellerDiscount = (variables) => useMutation(Schema.uplodSellerDiscount, {
    variables,
    ...context,
});

export const getActivity = (options) => useLazyQuery(Schema.getActivity, {
    ...options,
    ...context,
    ...fetchPolicy,
});

export const deleteSellerDiscount = (variables) => useMutation(Schema.deleteSellerDiscount, {
    variables,
    ...context,
});

export default {
    getSellerPromotions,
    getSellerPromotionsById,
    saveSellerPromotion,
    saveSellerPromotionCartFixed,
    getSellerPromotionsBundle,
    createSellerPromotionBundle,
    getSellerProductPromotions,
    getSellerPromotionBundleById,
    disablePromotionBundle,
    deletePromotionBundle,
    getSellerStores,
    getSellerDiscountList,
    saveSellerDiscount,
    downloadSellerDiscTemplate,
    uplodSellerDiscount,
    getActivity,
    deleteSellerDiscount,
};
