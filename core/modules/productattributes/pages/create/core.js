import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/productattributes/services/graphql';
import aclService from '@modules/theme/services/graphql';
import BackdropLoad from '@helper_backdropload';
import { optionsType } from '@modules/productattributes/helpers';

const ContentWrapper = (props) => {
    const {
        Content, t,
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
            frontend_label: '',
            frontend_input: optionsType[0],
            attribute_code: '',
            attribute_options: [],
        },
        validationSchema: Yup.object().shape({
            frontend_label: Yup.string().required(t('productattributes:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            const {
                frontend_input, attribute_code, attribute_options, ...submitValues
            } = values;
            const valueToSubmit = {
                ...submitValues,
                frontend_input: frontend_input.id,
                attribute_options: attribute_options.filter(({ label }) => (label && label !== ' ')).map(({ label, value }) => ({
                    label, value,
                })),
            };

            if (attribute_code) {
                valueToSubmit.attribute_code = attribute_code;
            }
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
    const router = useRouter();

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'product_attributes',
    });

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading);
    }, [aclCheckLoading]);

    if (aclCheckLoading) {
        return <Layout />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
        return <Layout />;
    }

    const contentProps = {
        ...props,
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
