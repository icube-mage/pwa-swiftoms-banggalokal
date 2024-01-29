/* eslint-disable max-len */
import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/managepromotion/services/graphql';
import aclService from '@modules/theme/services/graphql';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const { Content, t } = props;
    const router = useRouter();
    const [saveVendorPromotion] = gqlService.saveVendorPromotion();

    const handleSubmit = ({
        name,
        description,
        fromDate,
        toDate,
        simpleAction,
        discountAmount,
        discountStep,
        maxY,
        couponCode,
    }) => {
        const variables = {
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
        }).then(() => {
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
            name: '',
            description: '',
            fromDate: '',
            toDate: '',
            simpleAction: '',
            discountAmount: '',
            discountStep: '',
            maxY: '',
            couponCode: '',
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

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'vendor_manage_promotion',
    });

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading);
    }, [aclCheckLoading]);

    if (aclCheckLoading) {
        return <Layout />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        formik,
        t,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
