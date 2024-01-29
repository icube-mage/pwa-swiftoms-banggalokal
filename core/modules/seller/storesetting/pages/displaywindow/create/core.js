import React from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import gqlService from '@sellermodules/storesetting/services/graphql';
import Layout from '@layout';

const Core = (props) => {
    const { t, Content } = props;
    const pageConfig = {
        title: t('storesetting:Add_Display_Window'),
    };
    const router = useRouter();

    const [createSellerEtalase] = gqlService.createSellerEtalase();

    const handleSubmit = (input) => {
        window.backdropLoader(true);
        createSellerEtalase({
            variables: { input },
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('storesetting:New_display_window_has_been_created'),
                    variant: 'success',
                });
                setTimeout(() => router.push('/seller/storesetting/displaywindow'), 250);
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
            products: [],
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('storesetting:This_is_a_Required_field')),
            products: Yup.array().of(Yup.object())
                .min(1, t('selercatalog:Choose_at_least_min_key', { min: 1, key: t('storesetting:product') })),
        }),
        onSubmit: (values) => {
            const valueToSubmit = {
                name: values.name,
                image: { url: values.products[0].image },
                product_ids: values.products.map(({ entity_id }) => Number(entity_id)),
            };
            handleSubmit(valueToSubmit);
        },
    });

    const contentProps = {
        ...props,
        formik,
    };

    return (
        <Layout pageConfig={pageConfig} seller>
            <Content {...contentProps} />
        </Layout>
    );
};
export default Core;
