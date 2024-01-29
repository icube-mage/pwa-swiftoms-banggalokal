/* eslint-disable prefer-destructuring */
import { getToken, getStoreConfig, getCustomer } from '@modules/login/services/graphql';
import gqlTheme from '@modules/theme/services/graphql';
import { expiredToken, custDataNameCookie } from '@config';
import { setLogin, removeIsLoginFlagging } from '@helper_auth';
import { useRouter } from 'next/router';
import Layout from '@layout';
import { regexEmail } from '@helper_regex';
import BackdropLoad from '@helper_backdropload';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import qs from 'querystring';
import { setLocalStorage, removeLocalStorage } from '@helper_localstorage';

const ContentWrapper = (props) => {
    const {
        Content, storeLogo, t, recaptcha,
    } = props;
    const router = useRouter();
    const [confirmNotif, setConfirmNotif] = React.useState(false);
    const [token, setToken] = React.useState();

    const [getCustomerData] = getCustomer({
        onCompleted: (res) => {
            Cookies.remove(custDataNameCookie);
            if (res.customer.customer_company_code) {
                Cookies.set(custDataNameCookie, res.customer);
                router.push('/seller/order');
            } else {
                router.push('/');
            }
        },
        onError: (e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        },
    });
    const [getCustomerToken] = getToken();
    const [getAcl] = gqlTheme.customerAccessControlListLazy();
    const [getStoreConfigWave] = gqlTheme.getStoreConfigWave();
    const [getStoreConfigBatch] = gqlTheme.getStoreConfigBatch();
    const [getStoreConfigTada] = gqlTheme.getStoreConfigTada();
    const [getStoreConfigVendor] = gqlTheme.getStoreConfigVendor();
    const [getStoreConfigBeneficiaries] = gqlTheme.getStoreConfigBeneficiaries();
    const recaptchaRef = React.createRef();
    const { secretkey } = recaptcha;

    const handleSubmit = (variables) => {
        getCustomerToken({
            variables,
        }).then(async (res) => {
            const tokenRes = res.data.internalGenerateCustomerToken.token;
            if (tokenRes) {
                setToken(tokenRes);
            }
        }).catch((e) => {
            window.backdropLoader(false);
            if (e.message.search('graphql-customer-unconfirmed') >= 0) {
                setConfirmNotif(true);
                window.toastMessage({
                    open: true,
                    variant: 'error',
                    text: t('login:You_must_confirm_your_account_Please_check_your_email_for_the_confirmation_link'),
                });
            } else {
                setConfirmNotif(false);
                window.toastMessage({
                    open: true,
                    variant: 'error',
                    text: e.message.split(':')[0],
                });
            }
        });
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            captcha: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().required(t('login:This_is_a_Required_field')).matches(regexEmail, t('login:Invalid email format!')),
            password: Yup.string().required(t('login:This_is_a_Required_field')),
            captcha: recaptcha.enable && Yup.string().required(`Captcha ${t('registervendor:required')}`),
        }),
        onSubmit: async (values) => {
            const { captcha, ...restValues } = values;
            window.backdropLoader(true);
            if (recaptcha.enable) {
                fetch('/captcha-validation', {
                    method: 'POST',
                    body: qs.stringify({
                        secret: secretkey,
                        response: captcha,
                    }),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
                })
                    .then((res) => res.json())
                    .then((json) => {
                        if (json.success) {
                            handleSubmit(restValues);
                        } else {
                            window.backdropLoader(false);
                            window.toastMessage({
                                open: true,
                                variant: 'error',
                                text: t('login:There_is_something_error_while_verifying_captcha'),
                            });
                        }
                    })
                    .catch(() => {
                        window.backdropLoader(false);
                        window.toastMessage({
                            open: true,
                            variant: 'error',
                            text: t('login:Could_not_verify_captcha'),
                        });
                    });
                recaptchaRef.current.reset();
            } else {
                handleSubmit(restValues);
            }
        },
    });

    React.useEffect(() => {
        if (router.query?.confirm) {
            if (router.query?.confirm === 'success') {
                window.toastMessage({
                    open: true,
                    text: t('login:Thank_you_for_registering_Please_log_in_to_your_account'),
                    variant: 'success',
                });
            } else if (router.query?.confirm === 'failed' && Cookies.get('error_confirmation')) {
                window.toastMessage({
                    open: true,
                    variant: 'error',
                    text: Cookies.get('error_confirmation'),
                });
            }
        }
    }, []);

    React.useEffect(async () => {
        if (token) {
            try {
                const [resAcl, resWave, resBatch, resTada, resVendor, resBenef] = await Promise.all([
                    getAcl(),
                    getStoreConfigWave(),
                    getStoreConfigBatch(),
                    getStoreConfigTada(),
                    getStoreConfigVendor(),
                    getStoreConfigBeneficiaries(),
                ]);
                setLocalStorage('acl', JSON.stringify(resAcl.data.customerAccessControlList));
                setLocalStorage('config_acl', JSON.stringify({
                    pickpackWave: resWave.data.getStoreConfig,
                    pickpackBatch: resBatch.data.getStoreConfig,
                    tada: resTada.data.getStoreConfig,
                    vendor: resVendor.data.getStoreConfig,
                    beneficiaries: resBenef.data.getStoreConfig,
                }));

                // eslint-disable-next-line no-empty
            } catch (error) { } finally {
                removeIsLoginFlagging();
                setLogin(1, expiredToken);
                getCustomerData();
            }
        }
    }, [token]);

    const contentProps = {
        ...props,
        formik,
        storeLogo,
        t,
        recaptchaRef,
        confirmNotif,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const { t } = props;

    const pageConfig = {
        title: t('login:Login'),
        header: false,
        sidebar: false,
    };

    const { loading: loadingConfig, data: dataConfig } = getStoreConfig({
        path: 'swiftoms_vendorportal/configuration/enable_vendor_portal',
    });
    const { loading: loadEnabled, data: dataEnabled } = getStoreConfig({
        path: 'msp_securitysuite_recaptcha/frontend/enabled',
    });
    const { loading: loadEnabledReg, data: dataEnabledReg } = getStoreConfig({
        path: 'msp_securitysuite_recaptcha/frontend/enabled_login',
    });
    const { loading: loadPubKey, data: dataPubKey } = getStoreConfig({
        path: 'msp_securitysuite_recaptcha/general/public_key',
    });
    const { loading: loadPrivKey, data: dataPrivKey } = getStoreConfig({
        path: 'msp_securitysuite_recaptcha/general/private_key',
    });

    React.useEffect(() => {
        BackdropLoad(loadEnabled || loadEnabledReg || loadPubKey || loadPrivKey || loadingConfig);
    }, [loadEnabled, loadEnabledReg, loadPubKey, loadPrivKey, loadingConfig]);

    React.useEffect(() => {
        removeLocalStorage('acl');
        removeLocalStorage('config_acl');
    }, []);

    if (loadEnabled || loadEnabledReg || loadPubKey || loadPrivKey || loadingConfig) {
        return <Layout pageConfig={pageConfig} />;
    }

    const contentProps = {
        ...props,
        recaptcha: {
            enable: dataEnabled.getStoreConfig === '1' && dataEnabledReg.getStoreConfig === '1',
            sitekey: dataPubKey.getStoreConfig,
            secretkey: dataPrivKey.getStoreConfig,
        },
        dataConfig: dataConfig && dataConfig.getStoreConfig && dataConfig.getStoreConfig === '1',
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
