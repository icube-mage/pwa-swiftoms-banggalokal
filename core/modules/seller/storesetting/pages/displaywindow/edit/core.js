import React from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';
import gqlService from '@sellermodules/storesetting/services/graphql';
import Layout from '@layout';

const ContentWrapper = (props) => {
    const {
        t, Content, data, id,
    } = props;
    const router = useRouter();

    const [updateSellerEtalase] = gqlService.updateSellerEtalase();

    const handleSubmit = (input) => {
        const variables = {
            id: Number(id),
            input,
        };
        window.backdropLoader(true);
        updateSellerEtalase({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('storesetting:Display_window_has_been_updated'),
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
            name: data.name,
            products: data.products,
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('storesetting:This_is_a_Required_field')),
            products: Yup.array().of(Yup.object())
                .min(1, t('selercatalog:Choose_at_least_min_key', { min: 1, key: t('storesetting:product') })),
        }),
        onSubmit: (values) => {
            const valueToSubmit = {
                name: values.name,
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
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const { id } = router.query;

    const pageConfig = {
        title: t('storesetting:Display_Window'),
    };

    const { data, loading, error } = gqlService.getSellerEtalaseQuery({
        filter: { entity_id: { eq: id } },
        pageSize: 1,
        currentPage: 1,
    });

    React.useEffect(() => {
        BackdropLoad(loading);
    }, [loading]);

    if (loading) {
        return <Layout pageConfig={pageConfig} seller />;
    }

    if (!data) {
        const errMsg = error?.message ?? t('storesetting:Data_not_found');
        const redirect = '/seller/storesetting/displaywindow';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} isSeller />;
    }

    const contentProps = {
        ...props,
        data: data?.getSellerEtalaseList?.items?.[0],
        id,
    };

    return (
        <Layout pageConfig={pageConfig} seller>
            <ContentWrapper
                {...contentProps}
            />
        </Layout>
    );
};
export default Core;
