/* eslint-disable object-curly-newline */
import Layout from '@layout';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import ErrorRedirect from '@common_errorredirect';

import gqlService from '@modules/integrationthirdpartyapps/services/graphql';
import aclService from '@modules/theme/services/graphql';

import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const { Content, t, data } = props;
    const router = useRouter();

    const [editXtentoProfile] = gqlService.editXtentoProfile();
    const [testWebhookOutputTemplate, testWebhookOutputTemplateRes] = gqlService.testWebhookOutputTemplate();

    const formikOutputFormat = useFormik({
        initialValues: {
            xsl_template: data?.xsl_template || '',
        },
        validationSchema: Yup.object().shape({
            xsl_template: Yup.string()
                .required(t('integrationthirdpartyapps:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            window.backdropLoader(true);
            editXtentoProfile({
                variables: {
                    profile_id: Number(router.query.profile_id),
                    input: { ...values },
                },
            }).then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('integrationthirdpartyapps:Output_Format_has_been_successfully_changed'),
                    variant: 'success',
                });
                setTimeout(() => router.push(`/integration/thirdpartyapps/edit/${router.query.id}`), 250);
            })
                .catch((e) => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: e.message,
                        variant: 'error',
                    });
                });
        },
    });

    const formikOutputTest = useFormik({
        initialValues: {
            increment_id: '',
            xsl_template: data?.xsl_template || '',
        },
        validationSchema: Yup.object().shape({
            increment_id: Yup.string().required(t('integrationthirdpartyapps:This_is_a_Required_field')),
            xsl_template: Yup.string().required(t('integrationthirdpartyapps:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            window.backdropLoader(true);
            testWebhookOutputTemplate({
                variables: {
                    input: {
                        profile_id: Number(router.query.profile_id),
                        ...values,
                    },
                },
            }).then(() => {
                window.backdropLoader(false);
            })
                .catch((e) => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: e.message,
                        variant: 'error',
                    });
                });
        },
    });

    const formikField = useFormik({
        initialValues: {
            shipment_number: '',
        },
        validationSchema: Yup.object().shape({
            shipment_number: Yup.string().required(t('integrationthirdpartyapps:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            const { shipment_number } = values;
            window.open(
                `/integration/thirdpartyapps/edit/${router.query.id}/output/${router.query.profile_id}/availablefields/${shipment_number}`,
                '_ blank',
            );
        },
    });

    const contentProps = {
        ...props,
        formikField,
        formikOutputFormat,
        formikOutputTest,
        testWebhookOutputTemplateRes,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const {
        t,
    } = props;
    const router = useRouter();

    const pageConfig = {
        title: t('integrationthirdpartyapps:Edit_Output'),
    };

    const { loading, data, error } = gqlService.getXtentoProfile({
        variables: { profile_id: Number(router.query.profile_id) },
        skip: !router.query.profile_id,
    });
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'integration_third_party_apps',
    });

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading || loading);
    }, [aclCheckLoading, loading]);

    if (aclCheckLoading || loading) {
        return <Layout />;
    }

    if (((aclCheckData && aclCheckData.isAccessAllowed) === false)) {
        router.push('/');
        return <Layout />;
    }

    if (!data || !router.query.profile_id) {
        const errMsg = (error?.message) ?? t('integrationthirdpartyapps:Data_not_found');
        const redirect = `/integration/thirdpartyapps/edit/${router.query.id}`;
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} />;
    }

    const contentProps = {
        ...props,
        data: data?.getXtentoProfile || {},
    };

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper {...contentProps} />
        </Layout>
    );
};

export default Core;
