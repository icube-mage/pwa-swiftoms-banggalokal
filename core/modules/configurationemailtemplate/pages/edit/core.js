import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/configurationemailtemplate/services/graphql';
import aclService from '@modules/theme/services/graphql';
import BackdropLoad from '@helper_backdropload';
import ErrorRedirect from '@common_errorredirect';

const ContentWrapper = (props) => {
    const {
        Content, t, template,
    } = props;
    const router = useRouter();
    const [updateEmailTemplate] = gqlService.updateEmailTemplate();

    const handleSubmit = (value) => {
        window.backdropLoader(true);
        updateEmailTemplate({
            variables: { id: template.template_id, input: { ...value } },
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
            template_code: template.template_code,
            template_subject: template.template_subject,
            template_text: template.template_text,
            template_styles: template.template_styles || '',
            template_type: template.template_type === 'HTML' ? 2 : 'Text',
            orig_template_code: template.orig_template_code || '',
            orig_template_variables: template.orig_template_variables || '',
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

    const contentProps = {
        formik,
        ...props,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();

    const pageConfig = {
        title: t('emailtemplatesconfiguration:Edit_Template'),
    };

    const { loading: aclCheckLoading, data: dataAcl } = aclService.isAccessAllowed({
        acl_code: 'configuration_email_templates',
    });

    const { loading, data, error } = gqlService.getEmailTemplateById({
        id: router && router.query && Number(router.query.id),
    });

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading || loading);
    }, [aclCheckLoading, loading]);

    if (aclCheckLoading || loading) {
        return <Layout pageConfig={pageConfig} />;
    }

    if ((dataAcl && dataAcl.isAccessAllowed) === false) {
        router.push('/configurations/acceptancedeadline');
    }

    if (!data) {
        const errMsg = error?.message ?? t('emailtemplatesconfiguration:Data_not_found');
        const redirect = '/configurations/emailtemplates';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} />;
    }

    const contentProps = {
        ...props,
        template: data?.getEmailTemplateById,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper {...contentProps} />
        </Layout>
    );
};

export default Core;
