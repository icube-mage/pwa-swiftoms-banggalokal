/* eslint-disable react/no-danger */
/* eslint-disable prefer-destructuring */
/* eslint-disable radix */
/* eslint-disable max-len */
/* eslint-disable no-empty */
import qs from 'querystring';
import TagManager from 'react-gtm-module';
import {
    getToken, getStoreConfig, getCustomer, validateUsername, GenerateSocialLoginToken, requestOtp, verifyOtp, getOtpConfig,
    getSeller,
} from '@modules/login/services/graphql';
import gqlTheme from '@modules/theme/services/graphql';
import {
    expiredToken, custDataNameCookie, sellerDataNameCookie, loginRedirect,
} from '@config';
import { setLogin, removeIsLoginFlagging } from '@helper_auth';
import { useRouter } from 'next/router';
import Layout from '@layout';
import BackdropLoad from '@helper_backdropload';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { setLocalStorage, removeLocalStorage } from '@helper_localstorage';
import firebase, { googleProviderId } from '@lib_firebase/index';
import { encrypt } from '@helper_encryption';
import {
    getOtpState, setOtpState, filterPhone, validateInput, filterStoreName, maxDuration, otpTokenEncrypt,
} from '@modules/login/helpers/otp';

let timeout;
const ContentWrapper = (props) => {
    const {
        Content, storeLogo, t, recaptcha, billingUrl,
    } = props;
    const router = useRouter();
    const [confirmNotif, setConfirmNotif] = React.useState(false);
    const [customerData, setCustomerData] = React.useState({});

    const [getSellerData] = getSeller({
        onCompleted: (res) => {
            clearTimeout(timeout);

            window.toastMessage({
                open: true,
                text: `${t('login_success_redirecting')} ${t('beranda')}`,
                variant: 'success',
            });
            timeout = setTimeout(() => {
                const {
                    firstname, lastname, email, customer_company_code,
                } = customerData;
                const { __typename, subscribtion_plan, ...restSeller } = res.getSeller;
                const { __typename: subsType, ...restSubs } = subscribtion_plan;
                const sellerData = { ...restSeller, subscribtion_plan: { ...restSubs } };
                Cookies.set(sellerDataNameCookie, sellerData);
                const dataLayer = {
                    event: 'login',
                    customer_data: {
                        firstname, lastname, email, customer_company_code, ...sellerData,
                    },
                    event_data: undefined,
                };
                TagManager.dataLayer({ dataLayer });
                router.push(loginRedirect.seller);
            }, 2000);
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

    const [getCustomerData] = getCustomer({
        onCompleted: (res) => {
            clearTimeout(timeout);
            Cookies.remove(custDataNameCookie);
            Cookies.remove(sellerDataNameCookie);
            setCustomerData(res.customer);
            timeout = setTimeout(() => {
                Cookies.set(custDataNameCookie, res.customer);
                if (res.customer.customer_company_code) {
                    getSellerData();
                } else {
                    const {
                        firstname, lastname, email, customer_company_code,
                    } = res.customer;
                    window.toastMessage({
                        open: true,
                        text: `${t('login_success_redirecting')} ${t('beranda')}`,
                        variant: 'success',
                    });
                    const dataLayer = {
                        event: 'login',
                        customer_data: {
                            firstname, lastname, email, customer_company_code,
                        },
                        event_data: undefined,
                    };
                    TagManager.dataLayer({ dataLayer });
                    router.push(loginRedirect.admin);
                }
            }, 2000);
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
    const [getGenerateSocialLoginToken] = GenerateSocialLoginToken();
    const [getAcl] = gqlTheme.customerAccessControlListLazy();
    const [getStoreConfigWave] = gqlTheme.getStoreConfigWave();
    const [getStoreConfigBatch] = gqlTheme.getStoreConfigBatch();
    const [getStoreConfigTada] = gqlTheme.getStoreConfigTada();
    const [getStoreConfigVendor] = gqlTheme.getStoreConfigVendor();
    const [getStoreConfigBeneficiaries] = gqlTheme.getStoreConfigBeneficiaries();
    const [getValidateUsername] = validateUsername();
    const [getRequestOtp] = requestOtp();
    const [getVerifyOtp] = verifyOtp();
    const [duration, setDuration] = React.useState(parseInt(getOtpState('last_duration', 'login')) || 0);
    const [timeLeft, setTimeLeft] = React.useState(duration - new Date().getTime());
    const [otpVal, setOtpVal] = React.useState('');
    const [allowOtpChange, setAllowOtpChange] = React.useState(false);
    const [token, setToken] = React.useState();
    const [idType, setIdType] = React.useState(getOtpState('otp_input', 'login') === '1' ? 'phone' : null);
    const [otpConfig, { data: otpConfigData }] = getOtpConfig();
    const [alternMail, setAlternMail] = React.useState('');

    React.useEffect(async () => {
        await otpConfig();
    }, []);

    const isOtpEnable = (pageState = 'login') => {
        let findConfig;
        if (otpConfigData?.getOtpConfig) {
            JSON.stringify(otpConfigData?.getOtpConfig, (_, nestedValue) => {
                if (nestedValue && nestedValue.id === 'swiftoms_otp/general/login_register') {
                    findConfig = nestedValue;
                }
                return nestedValue;
            });
        }
        if (findConfig?.value) {
            return findConfig.value?.includes(pageState);
        }
        return false;
    };

    const recaptchaRef = React.createRef();
    const { secretkey } = recaptcha;

    const handleSubmit = (variables) => {
        getCustomerToken({
            variables,
        }).then(async (res) => {
            const tokenRes = res.data.internalGenerateCustomerToken.token;
            if (tokenRes) {
                setToken(tokenRes);
                Cookies.set('t_id', tokenRes);
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

                const newTextMessage = String(e?.message?.split(':')[0] || '').replace(/(payment status|status pembayaran)/gi, (match) => {
                    const links = {
                        'payment status': billingUrl,
                        'status pembayaran': billingUrl,
                    };
                    const link = links[match.toLowerCase()];
                    return `<strong><a style='color: #BE1F93' href='${link}'>${match}</a></strong>`;
                });

                window.toastMessage({
                    open: true,
                    variant: 'error',
                    text: <span dangerouslySetInnerHTML={{ __html: newTextMessage }} />,
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
            password: Yup.string().required(t('login:This_is_a_Required_field')),
            captcha: recaptcha.enable && Yup.string().required(`Captcha ${t('registervendor:required')}`),
        }),
        onSubmit: async (values) => {
            const { captcha, ...restValues } = values;
            restValues.email = alternMail;
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

    const sessionLogin = (loginData) => {
        getGenerateSocialLoginToken({
            variables: {
                email: loginData?.email,
                social_token: loginData?.socialToken,
                otp_code: loginData?.otpCode,
            },
        }).then(async (res) => {
            const tokenRes = res.data.internalGenerateSocialLoginToken.token;
            if (tokenRes) {
                setToken(tokenRes);
                Cookies.set('t_id', tokenRes);
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
                const newTextMessage = String(e?.message?.split(':')[0] || '').replace(/(payment status|status pembayaran)/gi, (match) => {
                    const links = {
                        'payment status': billingUrl,
                        'status pembayaran': billingUrl,
                    };
                    const link = links[match.toLowerCase()];
                    return `<strong><a style='color: #BE1F93' href='${link}'>${match}</a></strong>`;
                });

                window.toastMessage({
                    open: true,
                    variant: 'error',
                    text: <span dangerouslySetInnerHTML={{ __html: newTextMessage }} />,
                });
            }
        });
    };

    React.useEffect(() => {
        // This is a dynamic import that ensures FirebaseUI is only loaded on the client-side
        import('firebaseui').then((firebaseui) => {
            const uiConfig = {
                signInFlow: 'redirect',
                signInOptions: [googleProviderId],
                callbacks: {
                    signInSuccessWithAuthResult: async (authResult) => {
                        window.backdropLoader(true);

                        const loginData = {
                            socialToken: authResult?.credential?.idToken,
                            provider: authResult?.credential?.signInMethod,
                            email: authResult?.additionalUserInfo?.profile?.email,
                            firstname: authResult?.additionalUserInfo?.profile?.given_name,
                            lastname: authResult?.additionalUserInfo?.profile?.family_name,
                            fullname: authResult?.additionalUserInfo?.profile?.name,
                            picture: authResult?.additionalUserInfo?.profile?.picture,
                        };

                        const validate = await getValidateUsername({
                            variables: {
                                username: loginData.email,
                            },
                        });
                        const validateReasult = validate?.data?.validateUsername?.isExists;
                        const isSocialLogin = validate?.data?.validateUsername?.isSocialLogin;
                        const isInternalLogin = validate?.data?.validateUsername?.isInternalLogin;

                        if (!validateReasult && !isSocialLogin && !isInternalLogin) {
                            router.push(`/seller/register?e=${encrypt(JSON.stringify(loginData))}`);
                        } else if (isSocialLogin) {
                            sessionLogin(loginData);
                        } else if (validateReasult && !isSocialLogin) {
                            window.toastMessage({
                                open: true,
                                variant: 'error',
                                text: t('login:verif_login'),
                            });

                            setTimeout(() => window.location.reload(), 3000);
                        }
                        return false;
                    },
                },
            };

            try {
                const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
                ui.start('#firebaseui-auth-container', uiConfig);
            } catch (error) { }
        });
    }, []);

    React.useEffect(() => {
        const timerInterval = setInterval(() => {
            const currentTime = new Date().getTime();
            const newTimeLeft = duration - currentTime;

            if (newTimeLeft <= 0) {
                setAllowOtpChange(true);
                setOtpState('otp_input', 'login', 0);
                clearInterval(timerInterval);
            } else {
                setAllowOtpChange(false);
                setTimeLeft(newTimeLeft);
            }
        }, 700);

        return () => {
            clearInterval(timerInterval);
        };
    }, [duration]);

    const verifyOtpCode = async () => {
        window.backdropLoader(true);
        const getVerify = await getVerifyOtp({
            variables: {
                phone_number: getOtpState('otpPhone', 'login'),
                email: '',
                otp_number: String(otpVal),
            },
        }).catch(() => {
            window.toastMessage({
                open: true,
                text: t('registerseller:incorrect_otp'),
                variant: 'error',
            });
        });

        if (getVerify?.data?.verifyOtp === 'success') {
            const otpMail = getOtpState('otpMail', 'login');
            setOtpState('otp_input', 'login', 0);
            sessionLogin({
                email: getOtpState('otpMail', 'login'),
                socialToken: otpTokenEncrypt(encrypt(String(otpMail)).concat(otpVal).concat(encrypt(String(otpVal)))),
                otpCode: otpVal,
            });
        } else {
            window.toastMessage({
                open: true,
                text: t('registerseller:incorrect_otp'),
                variant: 'error',
            });
        }
        window.backdropLoader(false);
    };

    const checkUsername = async (type) => {
        window.backdropLoader(true);

        await getValidateUsername({
            variables: {
                username: filterPhone(formik.values.email),
            },
        }).then(async (e) => {
            const validateReasult = e?.data?.validateUsername?.isExists;
            const isSocialLogin = e?.data?.validateUsername?.isSocialLogin;
            const isInternalLogin = e?.data?.validateUsername?.isInternalLogin;
            const getStoreName = e?.data?.validateUsername?.storeName;
            const otpMail = e?.data?.validateUsername?.email;

            setAlternMail(otpMail);

            if (validateReasult && validateInput(formik.values.email) === 'phone' && isOtpEnable() === true) {
                window.backdropLoader(true);
                const getOtp = await getRequestOtp({
                    variables: {
                        phone_number: filterPhone(formik.values.email),
                        email: '',
                        store_name: filterStoreName(getStoreName).toString(),
                    },
                }).catch(() => {
                    window.toastMessage({
                        open: true,
                        text: t('registerseller:failed_otp'),
                        variant: 'error',
                    });
                });

                if (getOtp?.data?.requestOtp === 'success') {
                    setOtpState('otpMail', 'login', otpMail);
                    setOtpState('otpPhone', 'login', filterPhone(formik.values.email));
                    setOtpState('last_duration', 'login', maxDuration());
                    setOtpState('otp_input', 'login', 1);
                    setDuration(parseInt(getOtpState('last_duration', 'login'), 10));

                    setAllowOtpChange(false);
                    setIdType(type);
                    setOtpVal('');

                    window.toastMessage({
                        open: true,
                        text: t('registerseller:check_phone_otp'),
                        variant: 'success',
                    });
                } else {
                    window.toastMessage({
                        open: true,
                        text: t('registerseller:failed_otp'),
                        variant: 'error',
                    });
                }
                window.backdropLoader(false);
            } else if (validateReasult && isInternalLogin && isOtpEnable() === false) {
                setIdType('email');
            } else if (validateReasult && isInternalLogin && isOtpEnable() === true) {
                setIdType(type);
            } else if (validateReasult && isSocialLogin) {
                setIdType(null);
                window.toastMessage({
                    open: true,
                    text: t('login:user_not_found_social'),
                    variant: 'error',
                });
            } else {
                setIdType(null);
                window.toastMessage({
                    open: true,
                    text: t('login:user_not_found'),
                    variant: 'error',
                });
            }
            window.backdropLoader(false);
        }).catch(() => {
            setIdType(null);
            window.toastMessage({
                open: true,
                text: t('login:user_not_found'),
                variant: 'error',
            });
            window.backdropLoader(false);
        });
    };

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
        checkUsername,
        idType,
        setIdType,
        validateInput,
        timeLeft,
        otpVal,
        setOtpVal,
        allowOtpChange,
        verifyOtpCode,
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
    const { loading: loadingRegistrationConfig, data: registrationConfig } = getStoreConfig({
        path: 'swiftoms_vendorportal/seller_registration/enable_seller_register',
    });
    const { loading: loadingRegistrationOriginConfig, data: registrationOriginConfig } = getStoreConfig({
        path: 'swiftoms_vendorportal/seller_registration/registration_origin',
    });
    const { loading: loadingBillingUrl, data: billingUrl } = getStoreConfig({
        path: 'swiftoms_billing/service_info/url',
    });

    React.useEffect(() => {
        BackdropLoad(loadEnabled || loadEnabledReg || loadPubKey || loadPrivKey || loadingConfig || loadingRegistrationConfig || loadingRegistrationOriginConfig || loadingBillingUrl);
    }, [loadEnabled, loadEnabledReg, loadPubKey, loadPrivKey, loadingConfig, loadingRegistrationConfig, loadingRegistrationOriginConfig, loadingBillingUrl]);

    React.useEffect(() => {
        removeLocalStorage('acl');
        removeLocalStorage('config_acl');
    }, []);

    if (loadEnabled || loadEnabledReg || loadPubKey || loadPrivKey || loadingConfig || loadingRegistrationConfig || loadingRegistrationOriginConfig || loadingBillingUrl) {
        return <Layout pageConfig={pageConfig} />;
    }

    const contentProps = {
        ...props,
        recaptcha: {
            enable: dataEnabled?.getStoreConfig === '1' && dataEnabledReg?.getStoreConfig === '1',
            sitekey: dataPubKey?.getStoreConfig,
            secretkey: dataPrivKey?.getStoreConfig,
        },
        dataConfig: dataConfig && dataConfig?.getStoreConfig && dataConfig?.getStoreConfig === '1',
        isAllowRegistration: () => {
            if (registrationConfig && registrationConfig?.getStoreConfig && registrationConfig?.getStoreConfig === '1') {
                return registrationOriginConfig?.getStoreConfig === 'billing' ? billingUrl?.getStoreConfig : 'internal';
            }
            return false;
        },
        billingUrl: billingUrl?.getStoreConfig || null,
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
