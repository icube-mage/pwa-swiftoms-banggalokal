/* eslint-disable no-plusplus */
/* eslint-disable indent */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
import React from 'react';
import Layout from '@layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { getVendorConfiguration, saveStoreConfig } from '@modules/configurationvendorportal/services/graphql';
import aclService from '@modules/theme/services/graphql';
import storeConfigService from '@modules/login/services/graphql';
import BackdropLoad from '@helper_backdropload';
import { regexMultipleEmail } from '@helper_regex';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
        refetch,
        t,
    } = props;
    const [saveVendorPortalConfiguration] = saveStoreConfig();

    const handleSubmit = (input) => {
        const tempArray = [];
        for (const key in input) {
            if (input[key].type === 'form') {
                const splitPath = input[key].path.split('/');
                const keyName = splitPath[splitPath.length - 1];
                const temporary = {};
                let number = 1;
                input[key].value?.map((val) => {
                    let isEmpty = false;
                    input[key].form_fields.map((form) => {
                        if (!val[form.id]) {
                            isEmpty = false;
                        }
                    });
                    if (!isEmpty) {
                        temporary[`${keyName}${number}`] = val;
                        number++;
                    }
                });
                delete input[key].form_fields;
                tempArray.push({ ...input[key], value: JSON.stringify(temporary) });
            } else if (input[key].type === 'multiselect') {
                delete input[key].form_fields;
                input[key].value = input[key].value.join(',');
                tempArray.push(input[key]);
            } else {
                delete input[key].form_fields;
                tempArray.push(input[key]);
            }
        }
        window.backdropLoader(true);
        saveVendorPortalConfiguration({
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

    const dataVendorPortal = [...data.getVendorConfiguration];

    const tempData = {};
    const validationSchema = {};

    data?.getVendorConfiguration?.map((parent) => {
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
                });
            } else {
                const key = firstChild.id.replaceAll('/', '_');
                let { value } = firstChild;
                if (firstChild.type === 'email') {
                    validationSchema[key] = Yup.object().shape({
                        value: Yup.string().nullable().matches(regexMultipleEmail, t('vendorconfiguration:Invalid_email_format')),
                    });
                }
                if (firstChild.validate === 'integer') {
                    if (firstChild.id === 'swiftoms_vendorportal/seller_finance/seller_margin') {
                        validationSchema[key] = Yup.object().shape({
                            value: Yup.number()
                                .nullable()
                                .min(0, t('vendorconfiguration:Value_must_be_positive_number'))
                                .max(100, t('vendorconfiguration:Maximum_value_is_100'))
                                .integer(t('vendorconfiguration:Value_must_be_an_integer'))
                                .typeError(t('vendorconfiguration:Value_must_be_a_number')),
                        });
                    } else {
                        validationSchema[key] = Yup.object().shape({
                            value: Yup.number()
                                .integer(t('vendorconfiguration:Value_must_be_an_integer'))
                                .typeError(t('vendorconfiguration:Value_must_be_a_number')),
                        });
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
        dataVendorPortal,
        t,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const pageConfig = {
        title: t('vendorconfiguration:Vendor_Configuration'),
    };

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'configuration_vendor_portal',
    });

    const { loading: loadingConfig, data: dataConfig } = storeConfigService.getStoreConfig({
        path: 'swiftoms_vendorportal/configuration/enable_vendor_portal',
    });

    const { loading, data, refetch } = getVendorConfiguration();

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading || loadingConfig);
    }, [loading, aclCheckLoading, loadingConfig]);

    if (loading || aclCheckLoading || loadingConfig) {
        return <Layout pageConfig={pageConfig} />;
    }

    if (!data) {
        window.toastMessage({
            open: true,
            text: t('vendorconfiguration:Data_not_found'),
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
                    {t('vendorconfiguration:Data_not_found')}
                </div>
            </Layout>
        );
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false
        || (dataConfig && dataConfig.getStoreConfig) === '0') {
        router.push('/');
    }

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper data={data} refetch={refetch} {...props} />
        </Layout>
    );
};

export default Core;
