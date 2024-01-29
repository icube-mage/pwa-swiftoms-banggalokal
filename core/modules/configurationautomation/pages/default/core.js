/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
import React, { useMemo } from 'react';
import Layout from '@layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import gqlService from '@modules/configurationautomation/services/graphql';
import aclService from '@modules/theme/services/graphql';
import BackdropLoad from '@helper_backdropload';
import ErrorRedirect from '@common_errorredirect';
import { regexMultipleEmail } from '@helper_regex';

const ContentWrapper = (props) => {
    const {
        data,
        refetch,
        Content,
        t,
    } = props;
    const [saveStoreConfig] = gqlService.saveStoreConfig();

    const handleSubmit = (input) => {
        const tempArray = [];
        for (const key in input) {
            if (input[key].type === 'file') {
                if (input[key].value !== null) {
                    if (input[key].value.includes('base64')) {
                        delete input[key].form_fields;
                        tempArray.push(input[key]);
                    }
                } else if (input[key].value === null) {
                    delete input[key].form_fields;
                    tempArray.push(input[key]);
                }
            } else if (input[key].type === 'multiselect') {
                delete input[key].form_fields;
                input[key].value = input[key].value.join(',');
                tempArray.push(input[key]);
            } else if (input[key].type === 'form') {
                const splitPath = input[key].path.split('/');
                const keyName = splitPath[splitPath.length - 1];
                const temporary = {};
                let number = 1;
                input[key].value.map((val) => {
                    delete val.isNew;
                    let isEmpty = false;
                    input[key].form_fields.map((form) => {
                        if (!val[form.id]) {
                            isEmpty = true;
                        }
                    });
                    if (!isEmpty) {
                        temporary[`${keyName}${number}`] = val;
                        number += 1;
                    }
                });
                delete input[key].form_fields;
                tempArray.push({ ...input[key], value: JSON.stringify(temporary) });
            } else {
                delete input[key].form_fields;
                tempArray.push(input[key]);
            }
        }
        window.backdropLoader(true);
        saveStoreConfig({
            variables: { input: [...tempArray] },
        })
            .then((res) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: res.data.saveStoreConfig,
                    variant: 'success',
                });
                refetch();
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

    const dataConfig = [...data?.getAutomationConfigurations];

    const init = useMemo(() => {
        const initData = {};
        const validationSchema = {};
        data?.getAutomationConfigurations?.map((parent) => {
            parent.fields.map((firstChild) => {
                if (firstChild?.fields?.length > 0) {
                    firstChild?.fields?.map((secondChild) => {
                        const key = secondChild.id.replaceAll('/', '_');
                        let { value } = secondChild;
                        if (secondChild.type === 'form') {
                            let temp = [];
                            if (secondChild.value) {
                                temp = [JSON.parse(secondChild.value)];
                            }
                            if (temp.length) {
                                value = Object.keys(temp[0]).map((obj) => temp[0][obj]);
                            } else {
                                value = [];
                            }
                            const validation = Object.keys(value?.[0]).map((kv) => (
                                [kv, Yup.string().required(t('configurationautomation:This_is_a_Required_field'))]
                            ));
                            validationSchema[key] = Yup.object().shape({
                                value: Yup.array().of(Yup.object().shape(Object.fromEntries(validation)))
                                    .required(t('configurationautomation:This_is_a_Required_field')),
                            });
                        }
                        if (secondChild.type === 'multiselect') {
                            if (Array.isArray(secondChild.value) || !secondChild.value?.length || secondChild.value === null) {
                                value = [secondChild.value];
                            } else {
                                value = (secondChild.value.split(',').length > 0) ? secondChild.value.split(',') : [secondChild.value];
                            }
                        }
                        initData[key] = {
                            path: secondChild.id,
                            value,
                            is_default: secondChild.is_default,
                            type: secondChild.type,
                            form_fields: secondChild.form_fields,
                        };
                        if (secondChild.type === 'email') {
                            validationSchema[key] = Yup.object().shape({
                                value: Yup.string().nullable().matches(regexMultipleEmail, t('configurationautomation:Invalid_email_format')),
                            });
                        }
                    });
                } else {
                    const key = firstChild.id.replaceAll('/', '_');
                    let { value } = firstChild;
                    if (firstChild.type === 'form') {
                        let temp = [];
                        if (firstChild.value) {
                            temp = [JSON.parse(firstChild.value)];
                        }
                        if (temp.length) {
                            value = Object.keys(temp[0]).map((obj) => temp[0][obj]);
                        } else {
                            value = [];
                        }
                        const validation = Object.keys(value?.[0]).map((kv) => (
                            [kv, Yup.string().required(t('configurationautomation:This_is_a_Required_field'))]
                        ));
                        validationSchema[key] = Yup.object().shape({
                            value: Yup.array().of(Yup.object().shape(Object.fromEntries(validation)))
                                .required(t('configurationautomation:This_is_a_Required_field')),
                        });
                    }
                    if (firstChild.type === 'multiselect') {
                        if (Array.isArray(firstChild.value) || !firstChild.value?.length || firstChild.value === null) {
                            value = [firstChild.value];
                        } else {
                            value = (firstChild.value.split(',').length > 0) ? firstChild.value.split(',') : [firstChild.value];
                        }
                    }
                    initData[key] = {
                        path: firstChild.id,
                        value,
                        is_default: firstChild.is_default,
                        type: firstChild.type,
                        form_fields: firstChild.form_fields,
                    };
                    if (firstChild.type === 'email') {
                        validationSchema[key] = Yup.object().shape({
                            value: Yup.string().nullable().matches(regexMultipleEmail, t('configurationautomation:Invalid_email_format')),
                        });
                    }
                }
            });
        });
        return { initData, validationSchema };
    }, [data]);

    const formik = useFormik({
        initialValues: init.initData,
        validationSchema: Yup.object().shape(init.validationSchema),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const contentProps = {
        formik,
        dataConfig,
        t,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const pageConfig = {
        title: t('configurationautomation:Automation_Configuration'),
    };

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'configuration_automation',
    });

    const {
        loading, data, error, refetch,
    } = gqlService.getAutomationConfigurations();

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading);
    }, [loading, aclCheckLoading]);

    if (loading || aclCheckLoading) {
        return <Layout pageConfig={pageConfig} />;
    }

    if (!data) {
        const errMsg = (error?.message) ?? t('configurationautomation:Data_not_found');
        const redirect = '/';
        return <ErrorRedirect pageConfig={pageConfig} errMsg={errMsg} redirect={redirect} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
        return <Layout pageConfig={pageConfig} />;
    }

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper data={data} refetch={refetch} {...props} />
        </Layout>
    );
};

export default Core;
