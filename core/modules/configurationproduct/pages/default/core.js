/* eslint-disable spaced-comment */
/* eslint-disable array-callback-return */
/* eslint-disable prefer-const */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-expressions */
/* eslint-disable guard-for-in */
/* eslint-disable brace-style */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-trailing-spaces */
import React from 'react';
import Layout from '@layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { getProductConfiguration, saveStoreConfig } from '@modules/configurationproduct/services/graphql';
import aclService from '@modules/theme/services/graphql';
import BackdropLoad from '@helper_backdropload';
import { regexMultipleEmail } from '@helper_regex';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
        refetch,
        t,
    } = props;
    const [saveProductConfiguration] = saveStoreConfig();

    const handleSubmit = (input) => {
        let tempArray = [];
        for (const key in input) {
            if (input[key].type === 'file') {
                //if there's a new file upload (base64) will be saved
                if (input[key].value !== null) {
                    if (input[key].value.includes('base64')) {
                        delete input[key].form_fields;
                        tempArray.push(input[key]);
                    }
                }
                else if (input[key].value === null) {
                    delete input[key].form_fields;
                    tempArray.push(input[key]);
                }
            }
            else {
                delete input[key].form_fields;
                tempArray.push(input[key]);
            }
        }
        window.backdropLoader(true);
        saveProductConfiguration({
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

    const dataProduct = [...data.getProductConfiguration];

    let tempData = {};
    const validationSchema = {};

    data?.getProductConfiguration?.map((parent) => {
        parent.fields.map((firstChild) => {
            const key = firstChild.id.replaceAll('/', '_');
            let value = firstChild.value;
            tempData[key] = {
                path: firstChild.id,
                value,
                is_default: firstChild.is_default,
                type: firstChild.type,
                form_fields: firstChild.form_fields,
                upload_dir: firstChild.upload_dir,
            };
            if (firstChild.type === 'email') {
                validationSchema[key] = Yup.object().shape({
                    value: Yup.string().nullable().matches(regexMultipleEmail, t('productconfiguration:Invalid_email_format')),
                });
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
        dataProduct,
        t,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const pageConfig = {
        title: t('productconfiguration:Product_Configuration'),
    };
    
    const { loading, data, refetch } = getProductConfiguration();

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'configuration_product',
    });

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading);
    }, [loading, aclCheckLoading]);

    if (loading || aclCheckLoading) {
        return <Layout pageConfig={pageConfig} />;
    }

    if (!data) {
        window.toastMessage({
            open: true,
            text: t('productconfiguration:Data_not_found'),
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
                    {t('productconfiguration:Data_not_found')}
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
