/* eslint-disable prefer-destructuring */
import Layout from '@layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import gqlService from '@modules/userconfirm/services/graphql';
import { regexEmail } from '@helper_regex';
import { getHost } from '@helper_config';

const ContentWrapper = (props) => {
    const { Content, t } = props;
    const [sendConfirmationLink] = gqlService.sendConfirmationLink();

    const formik = useFormik({
        initialValues: {
            email: '',
            confirm_url: `${getHost()}/user/account/confirm`,
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().required(t('userconfirm:This_is_a_Required_field'))
                .matches(regexEmail, t('userconfirm:Invalid_email_format')),
        }),
        onSubmit: async (values) => {
            window.backdropLoader(true);
            sendConfirmationLink({
                variables: { ...values },
            })
                .then(() => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        variant: 'success',
                        text: t('userconfirm:Confirmation_link_has_been_sent_to_your_email'),
                    });
                })
                .catch((e) => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: e.message,
                    });
                });
        },
    });

    const contentProps = {
        formik,
        t,
        ...props,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const { t } = props;

    const pageConfig = {
        header: false,
        sidebar: false,
        title: t('userconfrim:Resend_Confirmation_Link'),
    };

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper
                {...props}
            />
        </Layout>
    );
};

export default Core;
