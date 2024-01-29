import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/productattributes/services/graphql';
import aclService from '@modules/theme/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';
import { optionsType } from '@modules/productattributes/helpers';

const ContentWrapper = (props) => {
    const {
        data, Content, t,
    } = props;
    const router = useRouter();
    const [saveProductAttribute] = gqlService.saveProductAttribute();

    const handleSubmit = (input) => {
        window.backdropLoader(true);
        saveProductAttribute({
            variables: { input },
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('productattributes:The_product_attribute_has_been_saved'),
                variant: 'success',
            });
            setTimeout(() => router.push('/product/productattributes'), 250);
        }).catch((e) => {
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
            attribute_id: data.attribute_id,
            frontend_label: data.frontend_label,
            frontend_input: optionsType.find((e) => e.id === data.frontend_input),
            attribute_code: data.attribute_code,
            attribute_options: data.attribute_options,
        },
        validationSchema: Yup.object().shape({
            frontend_label: Yup.string().required(t('productattributes:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            const { frontend_input, attribute_options, ...submitValues } = values;
            const valueToSubmit = {
                ...submitValues,
                frontend_input: frontend_input.id,
                attribute_options: attribute_options.filter(({ label }) => (label && label !== ' ')).map(({ label, value }) => ({
                    label, value,
                })),
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

    const { loading, data, error } = gqlService.getConfigurableAttributeByIds({
        attribute_ids: router && router.query && Number(router.query.id),
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'product_attributes',
    });

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading || loading);
    }, [aclCheckLoading, loading]);

    if (aclCheckLoading || loading) {
        return <Layout />;
    }

    if (!data?.getConfigurableAttributeByIds[0]) {
        const errMsg = error?.message ?? t('productattributes:Data_not_found');
        const redirect = '/product/productattributes';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
        return <Layout />;
    }

    const contentProps = {
        ...props,
        data: data?.getConfigurableAttributeByIds[0],
    };

    return (
        <Layout>
            <ContentWrapper
                {...contentProps}
            />
        </Layout>
    );
};

export default Core;
