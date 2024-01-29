/* eslint-disable prefer-destructuring */
/* eslint-disable no-empty */
/* eslint-disable max-len */
import qs from 'querystring';
import Cookies from 'js-cookie';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';

import gqlService from '@sellermodules/register/services/graphql';
import gqlLocation from '@modules/location/services/graphql';
import aclService from '@modules/theme/services/graphql';
import {
    getToken, getCustomer, GenerateSocialLoginToken, validateUsername, requestOtp, verifyOtp, getOtpConfig,
} from '@modules/login/services/graphql';

import { expiredToken, custDataNameCookie, loginRedirect } from '@config';
import { setLogin } from '@helper_auth';
import { regexPhoneDial, regexEmail } from '@helper_regex';
import Layout from '@layout';
import { getHost } from '@helper_config';
import BackdropLoad from '@helper_backdropload';
import { encrypt, decrypt } from '@helper_encryption';
import { filterPhone, maxDuration } from '@modules/login/helpers/otp';
import { setLocalStorage } from '@helper_localstorage';

const ContentWrapper = (props) => {
    const {
        Content,
        storeLogo,
        t,
        recaptcha,
        createStore,
    } = props;
    const router = useRouter();
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [userData, setUserData] = React.useState('');
    const [createSeller] = gqlService.createSeller();
    const [getCountries, getCountriesRes] = gqlLocation.getCountries();
    const [getCountry, getCountryRes] = gqlLocation.getCountry();
    const [getCityKecByRegionCode, getCityKecByRegionCodeRes] = gqlLocation.getCityKecByRegionCode();
    const [checkIfSellerEmailExist] = gqlService.checkIfSellerEmailExist();

    const getQuery = router && router?.query && router?.query?.e && router?.query?.e.replace(/\s/g, '+');

    let getSocialSession = false;
    if (getQuery) {
        try {
            getSocialSession = JSON.parse(decrypt(getQuery));
        } catch (error) { }
    }

    const [getCustomerData] = getCustomer({
        onCompleted: (res) => {
            if (res.customer.customer_company_code) {
                Cookies.set(custDataNameCookie, res.customer);
                router.push(loginRedirect.seller);
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
    const [getGenerateSocialLoginToken] = GenerateSocialLoginToken();

    const [mapPosition, setMapPosition] = React.useState({
        lat: '-6.197361',
        lng: '106.774535',
    });

    const displayLocationInfo = (position) => {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;

        setMapPosition({
            lat,
            lng,
        });
    };
    const [dialCode, setDialCode] = React.useState('62');
    const useRegexPhone = regexPhoneDial(dialCode);

    const handleSubmit = (input) => {
        createSeller({
            variables: { input },
        }).then((res) => {
            setUserData({ ...res.data.createSeller });
            window.backdropLoader(false);
            setIsSuccess(true);
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                variant: 'error',
                text: t(`registerseller:${e.message.replaceAll(' ', '_').replace(/[.,/#!?$%^&*;:{}=\-`~()]/g, '')}`),
            });
        });
    };

    const recaptchaRef = React.createRef();
    const { sitekey, secretkey } = recaptcha;

    const formik = useFormik({
        initialValues: {
            name: getSocialSession?.fullname || '',
            email: getSocialSession?.email || '',
            password: getSocialSession?.email ? '-' : '',
            password_confirmation: getSocialSession?.email ? '-' : '',
            phone_number: '',
            store_name: '',
            region: null,
            city: null,
            country_id: {
                __typename: 'Country',
                full_name_english: 'Indonesia',
                id: 'ID',
            },
            street: '',
            longitude: '',
            latitude: '',
            postcode: '',
            captcha: '',
            account_url: `${getHost()}/seller/account`,
            confirm_url: `${getHost()}/user/account/confirm`,
            login_url: `${getHost()}/login`,
            login_method: getSocialSession?.provider || null,
            profile_picture: getSocialSession?.picture || null,
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('registerseller:This_is_a_Required_field')).matches(/^[a-zA-Z0-9\s]+$/, t('registerseller:Special_characters_are_not_allowed')),
            email: Yup.string().required(t('registerseller:This_is_a_Required_field')).matches(regexEmail, t('registerseller:Invalid_email_format')),
            password: Yup.string().required(t('registerseller:This_is_a_Required_field')),
            password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], t('registerseller:Passwords_do_not_match'))
                .required(t('registerseller:This_is_a_Required_field')),
            phone_number: Yup.string().nullable().matches(useRegexPhone, t('registerseller:Invalid_phone_number_format'))
                .required(t('registerseller:This_is_a_Required_field')),
            store_name: createStore && Yup.string().required(t('registerseller:This_is_a_Required_field')),
            region: createStore && Yup.object().typeError(t('registerseller:This_is_a_Required_field'))
                .required(t('registerseller:This_is_a_Required_field')),
            city: createStore && Yup.object().typeError(t('registerseller:This_is_a_Required_field'))
                .required(t('registerseller:This_is_a_Required_field')),
            country_id: createStore && Yup.object().typeError(t('registerseller:This_is_a_Required_field'))
                .required(t('registerseller:This_is_a_Required_field')),
            street: createStore && Yup.string().required(t('registerseller:This_is_a_Required_field')),
            longitude: createStore && Yup.string().required(t('registerseller:This_is_a_Required_field')),
            latitude: createStore && Yup.string().required(t('registerseller:This_is_a_Required_field')),
            postcode: createStore && Yup.number().typeError(t('registerseller:Value_must_be_a_number'))
                .required(t('registerseller:This_is_a_Required_field')),
            captcha: recaptcha.enable && Yup.string().required(`Captcha ${t('registerseller:required')}`),
        }),
        validateOnChange: true,
        onSubmit: (values) => {
            const {
                city, country_id, latitude, longitude, postcode, region, store_name, street,
                captcha, address, ...restValues
            } = values;
            window.backdropLoader(true);
            const input = {
                ...restValues,
            };
            if (createStore) {
                input.store = {
                    city: city?.value || '',
                    latitude: String(latitude),
                    longitude: String(longitude),
                    postcode,
                    region: region?.code || '',
                    name: store_name,
                    street,
                    country_id: country_id.id,
                };
            }
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
                            handleSubmit(input);
                        } else {
                            window.backdropLoader(false);
                            window.toastMessage({
                                open: true,
                                variant: 'error',
                                text: t('registerseller:There_is_something_error_while_verifying_captcha'),
                            });
                        }
                    })
                    .catch(() => {
                        window.backdropLoader(false);
                        window.toastMessage({
                            open: true,
                            variant: 'error',
                            text: t('registerseller:Could_not_verify_captcha'),
                        });
                    });
                recaptchaRef.current.reset();
            } else {
                handleSubmit(input);
            }
        },
    });

    const handleLogin = () => {
        if (userData?.status === 'pending') {
            return router.push('/login');
        }
        setLocalStorage('refreshAcl', 1);
        window.backdropLoader(true);

        if (!getSocialSession?.socialToken) {
            return getCustomerToken({
                variables: {
                    email: formik.values.email,
                    password: formik.values.password,
                },
            }).then((res) => {
                const token = res.data.internalGenerateCustomerToken.token;
                if (token) {
                    setLogin(1, expiredToken);
                    getCustomerData();
                }
            }).catch((e) => {
                window.backdropLoader(false);
                if (e.message.search('graphql-customer-unconfirmed') >= 0) {
                    router.push('/login');
                } else {
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: e.message.split(':')[0],
                    });
                }
            });
        }
        return getGenerateSocialLoginToken({
            variables: {
                email: formik.values.email,
                social_token: String(getSocialSession?.socialToken),
            },
        }).then((res) => {
            const token = res.data.internalGenerateSocialLoginToken.token;
            if (token) {
                setLogin(1, expiredToken);
                getCustomerData();
            }
        }).catch((e) => {
            window.backdropLoader(false);
            if (e.message.search('graphql-customer-unconfirmed') >= 0) {
                router.push('/login');
            } else {
                window.toastMessage({
                    open: true,
                    variant: 'error',
                    text: e.message.split(':')[0],
                });
            }
        });
    };

    const handleDragPosition = (value) => {
        setMapPosition(value);
        formik.setFieldValue('longitude', value.lng);
        formik.setFieldValue('latitude', value.lat);
    };

    React.useMemo(() => {
        if (typeof window !== 'undefined' && navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(displayLocationInfo);
        }
    }, []);

    const [getValidateUsername] = validateUsername();
    const [getRequestOtp] = requestOtp();
    const [getVerifyOtp] = verifyOtp();
    const [validateUserdataStatus, setValidateUserdataStatus] = React.useState(null);
    const [otp, setOtp] = React.useState(false);
    const [duration, setDuration] = React.useState(0);
    const [timeLeft, setTimeLeft] = React.useState(duration - new Date().getTime());
    const [allowOtpChange, setAllowOtpChange] = React.useState(false);
    const [phone, setPhone] = React.useState('');
    const [otpVal, setOtpVal] = React.useState('');
    const [isOtpVerify, setIsOtpVerify] = React.useState(false);
    const [otpConfig, { data: otpConfigData }] = getOtpConfig();

    React.useEffect(async () => {
        await otpConfig();
    }, []);

    const isOtpEnable = (pageState = 'register') => {
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

    React.useEffect(() => {
        const timerInterval = setInterval(() => {
            const currentTime = new Date().getTime();
            const newTimeLeft = duration - currentTime;

            if (newTimeLeft <= 0) {
                setAllowOtpChange(true);
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

    const checkPhoneNumber = async () => {
        window.backdropLoader(true);
        const { data: isExistsPhone } = await getValidateUsername({ variables: { username: phone } });

        if (isExistsPhone?.validateUsername?.isExists) {
            window.toastMessage({
                open: true,
                text: t('registerseller:phone_registered'),
                variant: 'error',
            });
        } else {
            const getOtp = await getRequestOtp({
                variables: {
                    phone_number: filterPhone(phone),
                    email: '',
                    store_name: '',
                },
            }).catch(() => {
                window.toastMessage({
                    open: true,
                    text: t('registerseller:failed_otp'),
                    variant: 'error',
                });
            });

            if (getOtp?.data?.requestOtp === 'success') {
                setAllowOtpChange(false);
                setDuration(parseInt(maxDuration(), 10));
                setOtpVal('');
                setOtp(true);

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
        }
        window.backdropLoader(false);
    };

    const startVerifyOtp = async () => {
        window.backdropLoader(true);
        const getVerify = await getVerifyOtp({
            variables: {
                phone_number: phone,
                email: '',
                otp_number: String(otpVal),
            },
        }).catch(() => {
            setIsOtpVerify(false);
            window.toastMessage({
                open: true,
                text: t('registerseller:incorrect_otp'),
                variant: 'error',
            });
        });

        if (getVerify?.data?.verifyOtp === 'success') {
            setIsOtpVerify(true);
            setOtp(false);
            window.toastMessage({
                open: true,
                text: t('registerseller:verified_otp'),
                variant: 'success',
            });
        } else {
            setIsOtpVerify(false);
            window.toastMessage({
                open: true,
                text: t('registerseller:incorrect_otp'),
                variant: 'error',
            });
        }
        window.backdropLoader(false);
    };

    const contentProps = {
        ...props,
        formik,
        handleSubmit,
        getCountries,
        getCountriesRes,
        getCountry,
        getCountryRes,
        getCityKecByRegionCode,
        getCityKecByRegionCodeRes,
        storeLogo,
        t,
        setDialCode,
        sitekey,
        recaptchaRef,
        handleDragPosition,
        mapPosition,
        isSuccess,
        userData,
        handleLogin,
        getSocialSession,
        encrypt,
        decrypt,
        startVerifyOtp,
        checkPhoneNumber,
        validateUserdataStatus,
        setValidateUserdataStatus,
        otp,
        setOtp,
        duration,
        setDuration,
        timeLeft,
        setTimeLeft,
        allowOtpChange,
        setAllowOtpChange,
        phone,
        setPhone,
        otpVal,
        setOtpVal,
        isOtpVerify,
        setIsOtpVerify,
        isOtpEnable,
        checkIfSellerEmailExist,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();

    const pageConfig = {
        header: false,
        sidebar: false,
        title: t('registerseller:Register_Seller'),
    };

    const { loading: loadEnabled, data: dataEnabled } = aclService.getStoreConfig({
        path: 'msp_securitysuite_recaptcha/frontend/enabled',
    });
    const { loading: loadEnabledReg, data: dataEnabledReg } = aclService.getStoreConfig({
        path: 'msp_securitysuite_recaptcha/frontend/enabled_create',
    });
    const { loading: loadPubKey, data: dataPubKey } = aclService.getStoreConfig({
        path: 'msp_securitysuite_recaptcha/general/public_key',
    });
    const { loading: loadPrivKey, data: dataPrivKey } = aclService.getStoreConfig({
        path: 'msp_securitysuite_recaptcha/general/private_key',
    });
    const { loading: loadMap, data: dataMap } = aclService.getStoreConfig({
        path: 'swiftoms_general/google_map/api_key',
    });
    const { loading: loadEnableMap, data: dataEnableMap } = aclService.getStoreConfig({
        path: 'swiftoms_general/google_map/enabled',
    });
    const { loading: loadEnableStore, data: dataEnablStore } = aclService.getStoreConfig({
        path: 'swiftoms_vendorportal/seller_registration/enable_create_store',
    });
    const { loading: loadingRegistrationConfig, data: registrationConfig } = aclService.getStoreConfig({
        path: 'swiftoms_vendorportal/seller_registration/enable_seller_register',
    });
    const { loading: loadingRegistrationOriginConfig, data: registrationOriginConfig } = aclService.getStoreConfig({
        path: 'swiftoms_vendorportal/seller_registration/registration_origin',
    });
    const { loading: loadingBillingUrl, data: billingUrl } = aclService.getStoreConfig({
        path: 'swiftoms_billing/service_info/url',
    });

    React.useEffect(() => {
        BackdropLoad(loadEnabled || loadEnabledReg || loadPubKey || loadPrivKey || loadMap || loadEnableMap || loadEnableStore || loadingRegistrationConfig || loadingRegistrationOriginConfig || loadingBillingUrl);
    }, [loadEnabled, loadEnabledReg, loadPubKey, loadPrivKey, loadMap, loadEnableMap, loadEnableStore, loadingRegistrationConfig, loadingRegistrationOriginConfig, loadingBillingUrl]);

    if (loadEnabled || loadEnabledReg || loadPubKey || loadPrivKey || loadMap || loadEnableMap || loadEnableStore || loadingRegistrationConfig || loadingRegistrationOriginConfig || loadingBillingUrl) {
        return <Layout pageConfig={registrationConfig?.getStoreConfig === '1' && pageConfig} />;
    }

    if (registrationConfig?.getStoreConfig !== '1') {
        setTimeout(() => {
            window.backdropLoader(true);
            router.push('/login');
        }, 5000);

        return (
            <Layout pageConfig={{ header: false, sidebar: false, title: t('disable_registration_title') }}>
                <p style={{ padding: 30, paddingTop: 10 }}>
                    <h2>{ t('disable_registration_title') }</h2>
                    <div dangerouslySetInnerHTML={{ __html: t('disable_registration_message') }} />
                </p>
            </Layout>
        );
    } if (registrationOriginConfig?.getStoreConfig === 'billing') {
        setTimeout(() => {
            window.backdropLoader(true);
            router.push(`${billingUrl?.getStoreConfig}/customer/account/create/`);
        }, 500);
        return false;
    }

    const contentProps = {
        ...props,
        recaptcha: {
            enable: dataEnabled?.getStoreConfig === '1' && dataEnabledReg?.getStoreConfig === '1',
            sitekey: dataPubKey?.getStoreConfig,
            secretkey: dataPrivKey?.getStoreConfig,
        },
        enableMap: dataEnableMap?.getStoreConfig === '1',
        gmapKey: dataMap?.getStoreConfig,
        createStore: dataEnablStore?.getStoreConfig === '1',
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
