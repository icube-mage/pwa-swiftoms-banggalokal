import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/configurationemailtemplate/services/graphql';
import aclService from '@modules/theme/services/graphql';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const {
        Content, t,
    } = props;
    const router = useRouter();
    const [createEmailTemplate] = gqlService.createEmailTemplate();

    const handleSubmit = (value) => {
        window.backdropLoader(true);
        createEmailTemplate({
            variables: { input: { ...value } },
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('emailtemplatesconfiguration:Email_Template_has_been_successfully_saved'),
                    variant: 'success',
                });
                setTimeout(() => router.push('/configurations/emailtemplates'), 250);
            })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message || t('emailtemplatesconfiguration:Something_went_wrong_while_trying_to_save_email_template'),
                    variant: 'error',
                });
            });
    };

    const formik = useFormik({
        initialValues: {
            template_code: '',
            template_subject: '',
            template_text: '',
            template_styles: '',
            template_type: 2,
            orig_template_code: '',
            orig_template_variables: '',
        },
        validationSchema: Yup.object().shape({
            template_code: Yup.string().required(t('emailtemplatesconfiguration:This_is_a_Required_field')),
            template_subject: Yup.string().required(t('emailtemplatesconfiguration:This_is_a_Required_field')),
            template_text: Yup.string().required(t('emailtemplatesconfiguration:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const [loadTemplateById] = gqlService.loadTemplateById({
        onCompleted: (res) => {
            window.backdropLoader(false);
            formik.setFieldValue('template_text', res.loadTemplateById);
        },
    });

    const formikLoad = useFormik({
        initialValues: {
            id: '',
        },
        validationSchema: Yup.object().shape({
            id: Yup.string().required(t('emailtemplatesconfiguration:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            window.backdropLoader(true);
            loadTemplateById({
                variables: {
                    ...values,
                },
            });
        },
    });

    const contentProps = {
        formik,
        formikLoad,
        ...props,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();

    const pageConfig = {
        title: t('emailtemplatesconfiguration:Add_New_Template'),
    };

    const { loading: aclCheckLoading, data: dataAcl } = aclService.isAccessAllowed({
        acl_code: 'configuration_email_templates',
    });

    const { loading: templateOptionsLoading, data: dataTemplateOptions } = gqlService.getDefaultTemplateOption();

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading || templateOptionsLoading);
    }, [aclCheckLoading, templateOptionsLoading]);

    if (aclCheckLoading || templateOptionsLoading) {
        return <Layout pageConfig={pageConfig} />;
    }

    if ((dataAcl && dataAcl.isAccessAllowed) === false) {
        router.push('/configurations/acceptancedeadline');
    }

    const contentProps = {
        ...props,
        templateOptions: dataTemplateOptions.getDefaultTemplateOption || [],
    };

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper {...contentProps} />
        </Layout>
    );
};

export default Core;
