import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/configurationtaxrules/services/graphql';
import aclService from '@modules/theme/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const {
        Content, data, id,
    } = props;
    const router = useRouter();
    const [createTaxRule] = gqlService.createTaxRule();
    const [updateTaxRule] = gqlService.updateTaxRule();

    const [getTaxRateList, getTaxRateListRes] = gqlService.getTaxRateList();
    const [searchTaxRate, setSearchTaxRate] = React.useState('');

    const [getCustomerTaxClassList, getCustomerTaxClassListRes] = gqlService.getTaxClassList();
    const [getProductTaxClassList, getProductTaxClassListRes] = gqlService.getTaxClassList();

    const [deleteTaxRate] = gqlService.deleteTaxRate();

    const [createTaxClass] = gqlService.createTaxClass();
    const [updateTaxClass] = gqlService.updateTaxClass();
    const [deleteTaxClass] = gqlService.deleteTaxClass();

    const handleSubmit = (value) => {
        window.backdropLoader(true);
        if (data && id) {
            updateTaxRule({
                variables: { id: Number(id), input: { ...value } },
            })
                .then(() => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: 'Tax rule has been saved.',
                        variant: 'success',
                    });
                    setTimeout(() => router.push('/configurations/taxrules'), 250);
                })
                .catch((e) => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: e.message,
                        variant: 'error',
                    });
                });
        } else {
            createTaxRule({
                variables: { input: { ...value } },
            })
                .then(() => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: 'New tax rule has been created.',
                        variant: 'success',
                    });
                    setTimeout(() => router.push('/configurations/taxrules'), 250);
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
            code: '',
            tax_rate: [],
            tax_customer_class: [],
            tax_product_class: [],
            priority: 0,
            calculate_subtotal: false,
            position: 0,
        },
        validationSchema: Yup.object().shape({
            code: Yup.string().required('This field is required!'),
            tax_rate: Yup.array().of(Yup.number()).required('Please choose at least 1 item!'),
            tax_customer_class: Yup.array().of(Yup.number()).required('Please choose at least 1 item!'),
            tax_product_class: Yup.array().of(Yup.number()).required('Please choose at least 1 item!'),
            priority: Yup.number().typeError('Value must be a number!').required('This field is required!'),
            position: Yup.number().typeError('Value must be a number!').required('This field is required!'),
        }),
        onSubmit: (values) => {
            const valueToSubmit = {
                ...values,
                priority: Number(values.priority),
                position: Number(values.position),
            };
            handleSubmit(valueToSubmit);
        },
    });

    React.useEffect(() => {
        const onChangeTimeOut = setTimeout(() => {
            getTaxRateList({
                variables: {
                    filter: {
                        code: {
                            like: searchTaxRate,
                        },
                    },
                    pageSize: 20,
                    currentPage: 1,
                },
            });

            return null;
        }, 500);

        return () => clearTimeout(onChangeTimeOut);
    }, [searchTaxRate]);

    React.useEffect(() => {
        getCustomerTaxClassList({
            variables: {
                filter: {
                    class_type: { eq: 'CUSTOMER' },
                },
            },
        });
        getProductTaxClassList({
            variables: {
                filter: {
                    class_type: { eq: 'PRODUCT' },
                },
            },
        });
    }, []);

    React.useEffect(() => {
        if (data && id) {
            formik.setFieldValue('code', data.code);
            formik.setFieldValue('tax_rate', (data.tax_rate || []).map((c) => c.id));
            formik.setFieldValue('tax_customer_class', (data.tax_customer_class || []).map((c) => c.id));
            formik.setFieldValue('tax_product_class', (data.tax_product_class || []).map((c) => c.id));
            formik.setFieldValue('priority', data.priority);
            formik.setFieldValue('calculate_subtotal', data.calculate_subtotal);
            formik.setFieldValue('position', data.position);
        } else {
            formik.resetForm();
        }
    }, [data]);

    const contentProps = {
        formik,
        getTaxRateListRes,
        setSearchTaxRate,
        getProductTaxClassListRes,
        getCustomerTaxClassListRes,
        deleteTaxRate,
        createTaxClass,
        updateTaxClass,
        deleteTaxClass,
        ...props,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const { id } = router.query;

    const pageConfig = {
        title: `${id ? t('taxrulesconfiguration:Edit_Tax_Rule') : t('taxrulesconfiguration:New_Tax_Rule')}`,
    };

    const { loading, data, error } = gqlService.getTaxRuleById({
        skip: !id,
        variables: {
            id: Number(id),
        },
    });
    const { loading: aclCheckLoading, data: dataAcl } = aclService.isAccessAllowed({
        acl_code: 'configuration_tax_rules',
    });

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading);
    }, [loading || aclCheckLoading]);

    if (loading || aclCheckLoading) {
        return <Layout pageConfig={pageConfig} />;
    }

    if ((dataAcl && dataAcl.isAccessAllowed) === false) {
        router.push('/configurations/taxrules');
    }

    if (id && (error || !data)) {
        const errMsg = error?.message || t('taxrulesconfiguration:Data_not_found');
        const redirect = '/configurations/taxrules';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} />;
    }

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper {...props} data={data?.getTaxRuleById} id={id} />
        </Layout>
    );
};

export default Core;
