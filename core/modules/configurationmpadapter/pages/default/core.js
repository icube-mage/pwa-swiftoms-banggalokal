/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable indent */
import React from 'react';
import Layout from '@layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { getMpAdapterConfiguration, saveStoreConfig } from '@modules/configurationmpadapter/services/graphql';
import aclService from '@modules/theme/services/graphql';
import BackdropLoad from '@helper_backdropload';
import { regexMultipleEmail } from '@helper_regex';

const ContentWrapper = (props) => {
    const {
        data,
        refetch,
        Content,
        t,
    } = props;
    const [saveMpAdapterConfiguration] = saveStoreConfig();

    const handleSubmit = (input) => {
        const tempArray = [];
        for (const key in input) {
            if (input[key].type === 'file') {
                // if there's a new file upload (base64) will be saved
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
                    let isEmpty = false;
                    input[key].form_fields.map((form) => {
                        if (!val[form.id]) {
                            isEmpty = true;
                        }
                    });
                    if (!isEmpty) {
                        temporary[`${keyName}${number}`] = val;
                        number++;
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
        saveMpAdapterConfiguration({
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

    const dataAdapter = [...data.getMpAdapterConfiguration];

    const tempData = {};
    const validationSchema = {};

    data?.getMpAdapterConfiguration?.map((parent) => {
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
                    }
                    if (secondChild.type === 'multiselect') {
                        if (Array.isArray(secondChild.value) || !secondChild.value?.length || secondChild.value === null) {
                            value = [secondChild.value];
                        } else {
                            value = (secondChild.value.split(',').length > 0) ? secondChild.value.split(',') : [secondChild.value];
                        }
                    }
                    tempData[key] = {
                        path: secondChild.id,
                        value,
                        is_default: secondChild.is_default,
                        type: secondChild.type,
                        form_fields: secondChild.form_fields,
                    };
                    if (secondChild.type === 'email') {
                        validationSchema[key] = Yup.object().shape({
                            value: Yup.string().nullable().matches(regexMultipleEmail, t('marketplaceadapterconfiguration:Invalid_email_format')),
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
                }
                if (firstChild.type === 'multiselect') {
                    if (Array.isArray(firstChild.value) || !firstChild.value?.length || firstChild.value === null) {
                        value = [firstChild.value];
                    } else {
                        value = (firstChild.value.split(',').length > 0) ? firstChild.value.split(',') : [firstChild.value];
                    }
                }
                tempData[key] = {
                    path: firstChild.id,
                    value,
                    is_default: firstChild.is_default,
                    type: firstChild.type,
                    form_fields: firstChild.form_fields,
                };
                if (firstChild.type === 'email') {
                    validationSchema[key] = Yup.object().shape({
                        value: Yup.string().nullable().matches(regexMultipleEmail, t('marketplaceadapterconfiguration:Invalid_email_format')),
                    });
                }
            }
        });
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            ...tempData,
        },
        validationSchema: Yup.object().shape({
            ...validationSchema,
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const contentProps = {
        formik,
        dataAdapter,
        t,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const pageConfig = {
        title: t('marketplaceadapterconfiguration:Marketplace_Adapter_Configuration'),
    };

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_header_mpadapter',
    });

    const { loading, data, refetch } = getMpAdapterConfiguration();

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading);
    }, [loading, aclCheckLoading]);

    if (loading || aclCheckLoading) {
        return <Layout pageConfig={pageConfig} />;
    }

    if (!data) {
        window.toastMessage({
            open: true,
            text: t('marketplaceadapterconfiguration:Data_not_found'),
            variant: 'error',
        });
        setTimeout(() => {
            router.push('/');
        }, 1000);
        return (
            <Layout pageConfig={pageConfig}>
                <div
                    style={{
                        display: 'flex',
                        color: '#435179',
                        fontWeight: 600,
                        justifyContent: 'center',
                        padding: '20px 0',
                    }}
                >
                    {t('marketplaceadapterconfiguration:Data_not_found')}
                </div>
            </Layout>
        );
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper data={data} refetch={refetch} {...props} />
        </Layout>
    );
};

export default Core;
