/* eslint-disable max-len */
import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/productlist/services/graphql';
import aclService from '@modules/theme/services/graphql';
import BackdropLoad from '@helper_backdropload';

const CoreContent = (props) => {
    const { Content, attributesData, t } = props;
    const router = useRouter();
    const [exportProduct] = gqlService.exportProduct();

    const handleSubmit = (input) => {
        window.backdropLoader(true);
        exportProduct({
            variables: {
                input,
            },
        })
            .then((res) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('productlist:The_product_has_been_downloaded'),
                    variant: 'success',
                });
                router.push(res.data.exportProduct);
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
            data_type: 'master',
            input: attributesData || [],
        },
        validationSchema: Yup.object().shape({
            input: Yup.array().of(Yup.object().shape({
                source_data_export: Yup.string().required(t('productlist:This_is_a_Required_field')),
                source_data_replace: Yup.string(),
                source_data_system: Yup.string().typeError(t('productlist:This_is_a_Required_field')).required(t('productlist:This_is_a_Required_field')),
            })),
        }),
        onSubmit: (values) => {
            const { data_type, input } = values;
            const valueToSubmit = { data_type, attributes: [] };
            if (data_type !== 'extra') {
                valueToSubmit.attributes = input.map((value) => {
                    const { __typename, ...resValue } = value;
                    return { ...resValue };
                });
            }
            handleSubmit(valueToSubmit);
        },
    });

    const contentProps = {
        formik,
        ...props,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();

    const pageConfig = {
        title: t('productlist:Product_Export'),
    };

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'product_export',
    });
    const { loading: attributesLoading, data: attributesData } = gqlService.getExportProductDefaultAttributes();
    const { loading: optionsLoading, data: optionsData } = gqlService.getExportProductAttributeOptions();

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading || attributesLoading || optionsLoading);
    }, [aclCheckLoading, attributesLoading, optionsLoading]);

    if (aclCheckLoading || attributesLoading || optionsLoading) {
        return <Layout pageConfig={pageConfig} />;
    }

    if (((aclCheckData && aclCheckData.isAccessAllowed) === false) || !attributesData || !optionsData) {
        router.push('/product/productlist');
    }

    const coreProps = {
        attributesData: attributesData.getExportProductDefaultAttributes,
        optionsData: optionsData.getExportProductAttributeOptions,
        ...props,
    };
    return (
        <Layout pageConfig={pageConfig}>
            <CoreContent {...coreProps} />
        </Layout>
    );
};

export default Core;
