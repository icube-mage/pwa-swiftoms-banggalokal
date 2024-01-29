import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/configuration/services/graphql';
import aclService from '@modules/theme/services/graphql';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const { data, Content, t } = props;
    const router = useRouter();
    const configurationTada = data.getConfigurationTadaById;
    const [updateConfigurationTada] = gqlService.updateConfigurationTada();

    const handleSubmit = ({
        channel, username, password, apiKey, apiSecret, programId, catalogId,
    }) => {
        const variables = {
            id: configurationTada.id,
            channel_name: channel.channel_name,
            username,
            password,
            api_key: apiKey,
            api_secret: apiSecret,
            program_id: programId,
            catalog_id: catalogId,
        };
        window.backdropLoader(true);
        updateConfigurationTada({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('configuration:TADA_configuration_has_been_saved'),
                    variant: 'success',
                });
                setTimeout(() => router.push('/tada/configuration'), 250);
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
            channel: {
                channel_name: configurationTada.channel_name,
            },
            username: configurationTada.username || '',
            password: configurationTada.password || '',
            apiKey: configurationTada.api_key || '',
            apiSecret: configurationTada.api_secret || '',
            programId: configurationTada.program_id || '',
            catalogId: configurationTada.catalog_id || '',
        },
        validationSchema: Yup.object().shape({
            channel: Yup.object().typeError(t('configuration:This_is_a_Required_field')).required(t('configuration:This_is_a_Required_field')),
            username: Yup.string().nullable(),
            password: Yup.string().nullable(),
            apiKey: Yup.string().nullable(),
            apiSecret: Yup.string().nullable(),
            programId: Yup.string().nullable(),
            catalogId: Yup.string().nullable(),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const contentProps = {
        formik,
        t,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const { loading, data } = gqlService.getConfigurationTadaById({
        id: router && router.query && Number(router.query.id),
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_tada_config',
    });

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading);
    }, [loading, aclCheckLoading]);

    if (loading || aclCheckLoading) {
        return <Layout />;
    }

    if (!data) {
        window.toastMessage({
            open: true,
            text: t('configuration:Data_not_found'),
            variant: 'error',
        });
        setTimeout(() => {
            router.push('/tada/configuration');
        }, 1000);
        return (
            <Layout>
                <div
                    style={{
                        display: 'flex',
                        color: '#435179',
                        fontWeight: 600,
                        justifyContent: 'center',
                        padding: '20px 0',
                    }}
                >
                    {t('configuration:Data_not_found')}
                </div>
            </Layout>
        );
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    return (
        <Layout>
            <ContentWrapper data={data} {...props} />
        </Layout>
    );
};

export default Core;
