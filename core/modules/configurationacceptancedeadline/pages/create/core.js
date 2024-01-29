import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/configurationacceptancedeadline/services/graphql';
import aclService from '@modules/theme/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const {
        Content, data, id, t,
    } = props;
    const router = useRouter();
    const [createAcceptanceDeadline] = gqlService.createAcceptanceDeadline();
    const [updateAcceptanceDeadline] = gqlService.updateAcceptanceDeadline();

    const [getChannelList, getChannelListRes] = gqlService.getChannelList();

    const handleSubmit = (value) => {
        window.backdropLoader(true);
        if (data && id) {
            updateAcceptanceDeadline({
                variables: { id: Number(id), input: { ...value } },
            })
                .then(() => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: t('acceptancedeadlineconfiguration:Acceptance_Deadline_has_been_saved'),
                        variant: 'success',
                    });
                    setTimeout(() => router.push('/configurations/acceptancedeadline'), 250);
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
            createAcceptanceDeadline({
                variables: { input: { ...value } },
            })
                .then(() => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: t('acceptancedeadlineconfiguration:Acceptance_Deadline_has_been_created'),
                        variant: 'success',
                    });
                    setTimeout(() => router.push('/configurations/acceptancedeadline'), 250);
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
            channel_code: '',
            deadline: 1,
            shipping_method: '',
        },
        validationSchema: Yup.object().shape({
            channel_code: Yup.string().required(t('acceptancedeadlineconfiguration:This_is_a_Required_field')),
            deadline: Yup.number().min(1, t('acceptancedeadlineconfiguration:Value_must_must_be_at_least_min', { min: 1 }))
                .typeError(t('acceptancedeadlineconfiguration:Value_must_be_a_number'))
                .required(t('acceptancedeadlineconfiguration:This_is_a_Required_field')),
            shipping_method: Yup.string().required(t('acceptancedeadlineconfiguration:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            const valueToSubmit = {
                ...values,
                deadline: Number(values.deadline),
            };
            handleSubmit(valueToSubmit);
        },
    });

    React.useEffect(() => {
        if (data && id) {
            formik.setFieldValue('channel_code', data.channel_code);
            formik.setFieldValue('deadline', data.deadline);
            formik.setFieldValue('shipping_method', data.shipping_method);
        } else {
            formik.resetForm();
        }
    }, [data]);

    React.useEffect(() => {
        getChannelList({
            variables: {
                pageSize: null,
                currentPage: 1,
            },
        });
    }, []);

    const contentProps = {
        getChannelList,
        getChannelListRes,
        formik,
        ...props,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const { id } = router.query;

    const pageConfig = {
        title: `${id ? t('acceptancedeadlineconfiguration:Edit_Acceptance_Deadline') : t('acceptancedeadlineconfiguration:Add_Acceptance_Deadline')}`,
    };

    const { loading: aclCheckLoading, data: dataAcl } = aclService.isAccessAllowed({
        acl_code: 'acceptance_deadline',
    });

    const { loading, data, error } = gqlService.getAcceptanceDeadlineById({
        skip: !id,
        variables: {
            id: Number(id),
        },
    });

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading);
    }, [loading || aclCheckLoading]);

    if (loading || aclCheckLoading) {
        return <Layout pageConfig={pageConfig} />;
    }

    if ((dataAcl && dataAcl.isAccessAllowed) === false) {
        router.push('/configurations/acceptancedeadline');
    }

    if (id && (error || !data)) {
        const errMsg = error?.message || error?.message || t('acceptancedeadlineconfiguration:Data_not_found');
        const redirect = '/configurations/acceptancedeadline';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} />;
    }

    const contentProps = {
        ...props,
        data: data?.getAcceptanceDeadlineById,
        id,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper {...contentProps} />
        </Layout>
    );
};

export default Core;
