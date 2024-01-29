/* eslint-disable max-len */
import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/managepromotion/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { optionsRuleAction } from '@modules/managepromotion/helpers';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const { data, Content, t } = props;
    const router = useRouter();
    const promotion = data.getVendorPromotionById;
    const [saveVendorPromotion] = gqlService.saveVendorPromotion();

    const handleSubmit = ({
        name, description, fromDate, toDate, simpleAction, discountAmount, discountStep, maxY, couponCode,
    }) => {
        const variables = {
            rule_id: promotion.rule_id,
            name,
            description,
            from_date: fromDate,
            to_date: toDate,
            simple_action: simpleAction.id,
            discount_amount: discountAmount,
            discount_step: discountStep,
            max_y: maxY,
            coupon_code: couponCode,
        };
        window.backdropLoader(true);
        saveVendorPromotion({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('managepromotion:New_Promotion_has_been_saved'),
                    variant: 'success',
                });
                setTimeout(() => router.push('/vendorportal/managepromotion'), 250);
            })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
    };

    const formik = useFormik({
        initialValues: {
            name: promotion.name,
            description: promotion.description || '',
            fromDate: promotion.from_date,
            toDate: promotion.to_date,
            simpleAction: optionsRuleAction.find((e) => e.id === promotion.simple_action),
            discountAmount: promotion.discount_amount,
            discountStep: promotion.discount_step || '',
            maxY: promotion.max_y || '',
            couponCode: promotion.coupon_code,
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('managepromotion:This_is_a_Required_field')),
            fromDate: Yup.string().required(t('managepromotion:This_is_a_Required_field')),
            toDate: Yup.string().required(t('managepromotion:This_is_a_Required_field')),
            simpleAction: Yup.object().typeError(t('managepromotion:This_is_a_Required_field')).required(t('managepromotion:This_is_a_Required_field')),
            discountAmount: Yup.string().required(t('managepromotion:This_is_a_Required_field')),
            couponCode: Yup.string().required(t('managepromotion:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const contentProps = {
        formik,
        t,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const { loading, data, error } = gqlService.getVendorPromotionById({
        id: router && router.query && Number(router.query.id),
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'vendor_manage_promotion',
    });

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading);
    }, [loading, aclCheckLoading]);

    if (loading || aclCheckLoading) {
        return <Layout />;
    }

    if (!data) {
        const errMsg = error?.message ?? t('managepromotion:Data_not_found');
        const redirect = '/vendorportal/managepromotion';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        data,
        t,
    };

    return (
        <Layout>
            <ContentWrapper {...contentProps} {...props} />
        </Layout>
    );
};

export default Core;
