/* eslint-disable max-len */
import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@sellermodules/promotion/services/graphql';
import themeService from '@modules/theme/services/graphql';
import BackdropLoad from '@helper_backdropload';
import { actionRule } from '@sellermodules/promotion/helpers';
import ErrorRedirect from '@common_errorredirect';

const ContentWrapper = (props) => {
    const {
        Content, t, data,
    } = props;
    const router = useRouter();
    const promotion = data.getSellerPromotions.items[0] || '';

    const [saveSellerPromotion] = gqlService.saveSellerPromotion();

    const handleSubmit = ({
        name, description, from_date, to_date, simple_action, discount_amount,
        discount_step, max_y, coupon_code, uses_per_coupon, uses_per_customer, is_active,
    }) => {
        window.backdropLoader(true);

        if (simple_action.id === 'by_fixed') {
            const input = {
                rule_id: promotion.rule_id,
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
                    text: t('sellerpromotion:Promotion_has_been_saved'),
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
        } else if (simple_action.id === 'cart_fixed') {
            const input = {
                rule_id: promotion.rule_id,
                name,
                description,
                from_date,
                to_date,
                simple_action: simple_action.id,
                coupon_code,
                discount_amount: Number.parseFloat(discount_amount),
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
                    text: t('sellerpromotion:Promotion_has_been_saved'),
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
                rule_id: promotion.rule_id,
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
                    text: t('sellerpromotion:Promotion_has_been_saved'),
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

    const simple_action = actionRule.find((e) => e.id === promotion.simple_action);
    const formik = useFormik({
        initialValues: {
            name: promotion.name,
            description: promotion.description || '',
            from_date: promotion.from_date,
            to_date: promotion.to_date,
            simple_action,
            discount_amount: promotion.discount_amount || '',
            discount_step: promotion.discount_step || 1,
            max_y: promotion.max_y || '',
            coupon_code: promotion.coupon_code,
            uses_per_coupon: promotion.uses_per_coupon || 0,
            uses_per_customer: promotion.uses_per_customer || 0,
            is_active: promotion.is_active,
            actionFixed: !simple_action,
            actionBuy: !simple_action,
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
        promotion,
        formik,
        t,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const pageConfig = {
        title: t('sellerpromotion:Edit_Promotion'),
    };

    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = themeService.isAccessAllowed({
        acl_code: 'seller_promotion_coupon',
    });
    const { data, loading, error } = gqlService.getSellerPromotionsById({
        rule_id: {
            from: router && router.query && String(router.query.rule_id),
            to: router && router.query && String(router.query.rule_id),
        },
    });

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading);
    }, [loading, aclCheckLoading]);

    if (loading || aclCheckLoading) {
        return <Layout pageConfig={pageConfig} seller />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/seller/unauthorized');
        return <Layout pageConfig={pageConfig} seller />;
    }

    if (!data) {
        const errMsg = error?.message ?? t('sellerpromotion:Data_not_found');
        const redirect = '/';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} isSeller />;
    }

    const contentProps = {
        data,
        t,
    };

    return (
        <Layout pageConfig={pageConfig} seller>
            <ContentWrapper {...contentProps} {...props} />
        </Layout>
    );
};

export default Core;
