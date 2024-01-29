/* eslint-disable max-len */
import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@sellermodules/promotion/services/graphql';

const Core = (props) => {
    const { Content, t } = props;
    const pageConfig = {
        title: 'Add New Promotion',
    };

    const router = useRouter();
    const [saveSellerPromotion] = gqlService.saveSellerPromotion();
    const [saveSellerPromotionCartFixed] = gqlService.saveSellerPromotionCartFixed();

    const handleSubmit = ({
        name, description, from_date, to_date, simple_action, discount_amount,
        discount_step, max_y, coupon_code, uses_per_coupon, uses_per_customer, is_active,
    }) => {
        window.backdropLoader(true);

        if (simple_action.id === 'by_fixed') {
            const input = {
                name,
                description,
                from_date,
                to_date,
                simple_action: simple_action.id,
                coupon_code,
                uses_per_coupon: Number(uses_per_coupon),
                uses_per_customer: Number(uses_per_customer),
                is_active,
            };
            saveSellerPromotion({
                variables: { input },
            }).then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('sellerpromotion:New_Promotion_has_been_saved'),
                    variant: 'success',
                });
                setTimeout(() => router.push('/seller/promotion/coupon'), 250);
            })
                .catch((e) => {
                    if (e?.graphQLErrors[0]?.extensions?.category === 'graphql-seller-authorization') {
                        router.push('/seller/unauthorized');
                    } else {
                        window.backdropLoader(false);
                        window.toastMessage({
                            open: true,
                            text: e.message,
                            variant: 'error',
                        });
                    }
                });
        } else if (simple_action.id === 'cart_fixed') {
            const variables = {
                name,
                description,
                from_date,
                to_date,
                simple_action: simple_action.id,
                coupon_code,
                discount_amount: Number(discount_amount),
                uses_per_coupon: Number(uses_per_coupon),
                uses_per_customer: Number(uses_per_customer),
                is_active,
            };
            saveSellerPromotionCartFixed({
                variables,
            }).then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('sellerpromotion:New_Promotion_has_been_saved'),
                    variant: 'success',
                });
                setTimeout(() => router.push('/seller/promotion/coupon'), 250);
            })
                .catch((e) => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: e.message,
                        variant: 'error',
                    });
                });
        } else if (simple_action.id === 'buy_x_get_y') {
            const input = {
                name,
                description,
                from_date,
                to_date,
                simple_action: simple_action.id,
                coupon_code,
                discount_amount: Number(discount_amount),
                discount_step: Number(discount_step),
                max_y: Number(max_y),
                uses_per_coupon: Number(uses_per_coupon),
                uses_per_customer: Number(uses_per_customer),
                is_active,
            };
            saveSellerPromotion({
                variables: { input },
            }).then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('sellerpromotion:New_Promotion_has_been_saved'),
                    variant: 'success',
                });
                setTimeout(() => router.push('/seller/promotion/coupon'), 250);
            })
                .catch((e) => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: e.message,
                        variant: 'error',
                    });
                });
        }
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            from_date: '',
            to_date: '',
            simple_action: '',
            discount_amount: '',
            discount_qty: '',
            discount_step: 1,
            max_y: '',
            coupon_code: '',
            uses_per_coupon: 0,
            uses_per_customer: 0,
            is_active: true,
            actionFixed: false,
            actionBuy: false,
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('sellerpromotion:This_is_a_Required_field')),
            from_date: Yup.string().required(t('sellerpromotion:This_is_a_Required_field')),
            to_date: Yup.string().required(t('sellerpromotion:This_is_a_Required_field')),
            simple_action: Yup.object().typeError(t('sellerpromotion:This_is_a_Required_field')).required(t('sellerpromotion:This_is_a_Required_field')),
            discount_amount: Yup.number()
                .when('actionFixed', {
                    is: true,
                    then: Yup.number()
                        .typeError(t('sellerpromotion:Value_must_be_a_number'))
                        .required(t('sellerpromotion:This_is_a_Required_field'))
                        .positive(t('sellercatalog:Value_must_be_positive_number')),
                })
                .when('actionBuy', {
                    is: true,
                    then: Yup.number()
                        .typeError(t('sellerpromotion:Value_must_be_a_number'))
                        .required(t('sellerpromotion:This_is_a_Required_field'))
                        .integer(t('sellerpromotion:Value_cannot_be_decimal'))
                        .positive(t('sellercatalog:Value_must_be_positive_number')),
                }),
            max_y: Yup.number().when('actionBuy', {
                is: true,
                then: Yup.number()
                    .typeError(t('sellerpromotion:Value_must_be_a_number'))
                    .required(t('sellerpromotion:This_is_a_Required_field'))
                    .integer(t('sellerpromotion:Value_cannot_be_decimal'))
                    .positive(t('sellercatalog:Value_must_be_positive_number')),
            }),
            discount_step: Yup.number()
                .when('actionBuy', {
                    is: true,
                    then: Yup.number()
                        .typeError(t('sellerpromotion:Value_must_be_a_number'))
                        .required(t('sellerpromotion:This_is_a_Required_field'))
                        .min(1, t('sellerpromotion:Value_must_be_at_least_1')),
                }),
            coupon_code: Yup.string().required(t('sellerpromotion:This_is_a_Required_field')),
            uses_per_coupon: Yup.number()
                .typeError(t('sellerpromotion:Value_must_be_a_number'))
                .integer(t('sellerpromotion:Value_cannot_be_decimal')),
            uses_per_customer: Yup.number()
                .typeError(t('sellerpromotion:Value_must_be_a_number'))
                .integer(t('sellerpromotion:Value_cannot_be_decimal')),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const contentProps = {
        formik,
        t,
    };

    return (
        <Layout pageConfig={pageConfig} seller>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
