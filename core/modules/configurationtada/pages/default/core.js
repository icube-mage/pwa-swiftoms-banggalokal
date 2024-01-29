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
import { getTadaConfiguration, saveStoreConfig } from '@modules/configurationtada/services/graphql';
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
    const [saveTadaConfiguration] = saveStoreConfig();

    const handleSubmit = (input) => {
        const tempArray = [];
        for (const key in input) {
            delete input[key].form_fields;
            tempArray.push(input[key]);
        }
        window.backdropLoader(true);
        saveTadaConfiguration({
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

    const dataTada = [...data.getTadaConfiguration];

    const tempData = {};
    const validationSchema = {};

    data?.getTadaConfiguration?.map((parent) => {
        parent.fields.map((firstChild) => {
            const key = firstChild.id.replaceAll('/', '_');
            const { value } = firstChild;
            tempData[key] = {
                path: firstChild.id,
                value,
                is_default: firstChild.is_default,
                type: firstChild.type,
                form_fields: firstChild.form_fields,
            };
            if (firstChild.type === 'email') {
                validationSchema[key] = Yup.object().shape({
                    value: Yup.string().nullable().matches(regexMultipleEmail, t('tadaconfiguration:Invalid_email_format')),
                });
            }
        });
    });

    const formik = useFormik({
        initialValues: { ...tempData },
        validationSchema: Yup.object().shape({
            ...validationSchema,
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const contentProps = {
        formik,
        dataTada,
        t,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const pageConfig = {
        title: t('tadaconfiguration:TADA_Configuration'),
    };

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'configuration_tada',
    });

    const { loading: loadingConfig, data: dataConfig } = storeConfigService.getStoreConfig({
        path: 'swiftoms_tada/general/enable',
    });

    const { loading, data, refetch } = getTadaConfiguration();

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading || loadingConfig);
    }, [loading, aclCheckLoading, loadingConfig]);

    if (loading || aclCheckLoading || loadingConfig) {
        return <Layout pageConfig={pageConfig} />;
    }

    if (!data) {
        window.toastMessage({
            open: true,
            text: t('tadaconfiguration:Data_not_found'),
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
                    {t('tadaconfiguration:Data_not_found')}
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
