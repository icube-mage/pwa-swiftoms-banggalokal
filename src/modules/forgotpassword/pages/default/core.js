/* eslint-disable prefer-destructuring */
import qs from 'querystring';
import gqlService from '@modules/forgotpassword/services/graphql';
import { getStoreConfig } from '@modules/login/services/graphql';
import { useRouter } from 'next/router';
import Layout from '@layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { recaptcha } from '@config';
import { regexEmail } from '@helper_regex';
import BackdropLoad from '@helper_backdropload';

const URL_SET_NEW_PASSWORD = '/forgotpassword/createnewpassword';

const ContentWrapper = (props) => {
    const { Content, storeLogo, t } = props;
    const router = useRouter();
    const { secretkey } = recaptcha;
    const [requestResetPassword] = gqlService.requestResetPassword();

    const formik = useFormik({
        initialValues: {
            email: '',
            captcha: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().required(t('forgotpassword:This_is_a_Required_field'))
                .matches(regexEmail, t('forgotpassword:Invalid_email_format')),
            captcha: recaptcha.enable && Yup.string().required(`Captcha ${t('registervendor:required')}`),
        }),
        onSubmit: async (values) => {
            const { captcha, ...restValues } = values;
            const variables = {
                email: restValues.email,
                callback_url: `${window.location.origin}${URL_SET_NEW_PASSWORD}`,
            };
            window.backdropLoader(true);

            if (recaptcha.enable) {
                try {
                    const res = await fetch('/captcha-validation', {
                        method: 'POST',
                        body: qs.stringify({
                            secret: secretkey,
                            response: captcha,
                        }),
                        headers: new Headers({ 'content-type': 'application/x-www-form-urlencoded; charset=utf-8' }),
                    });
                    const resJson = await res.json();
                    if (!resJson.success) {
                        window.backdropLoader(false);
                        window.toastMessage({
                            open: true,
                            variant: 'error',
                            text: t('forgotpassword:Invalid_captcha'),
                        });
                        return;
                    }
                } catch (e) {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: e.message,
                    });
                }
            }

            requestResetPassword({
                variables,
            })
                .then(() => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        variant: 'success',
                        // eslint-disable-next-line max-len
                        text: t('forgotpassword:If_there_is_an_account_associated_with_valuesemail_you_will_receive_an_email_with_a_link_to_reset_your_password',
                            { values }),
                    });
                    setTimeout(() => router.push('/login'), 2000);
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
        storeLogo,
        t,
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
        title: t('forgotpassword:Set_a_New_Password'),
    };

    const { loading: loadEnabled, data: dataEnabled } = getStoreConfig({
        path: 'msp_securitysuite_recaptcha/frontend/enabled',
    });
    const { loading: loadPubKey, data: dataPubKey } = getStoreConfig({
        path: 'msp_securitysuite_recaptcha/general/public_key',
    });
    const { loading: loadPrivKey, data: dataPrivKey } = getStoreConfig({
        path: 'msp_securitysuite_recaptcha/general/private_key',
    });

    React.useEffect(() => {
        BackdropLoad(loadEnabled || loadPubKey || loadPrivKey);
    }, [loadEnabled, loadPubKey, loadPrivKey]);

    if (loadEnabled || loadPubKey || loadPrivKey) {
        return <Layout pageConfig={pageConfig} />;
    }

    const contentProps = {
        ...props,
        recaptcha: {
            enable: dataEnabled.getStoreConfig === '1',
            sitekey: dataPubKey.getStoreConfig,
            secretkey: dataPrivKey.getStoreConfig,
        },
    };

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper
                {...contentProps}
            />
        </Layout>
    );
};

export default Core;
