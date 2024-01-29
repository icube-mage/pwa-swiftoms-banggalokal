/* eslint-disable prefer-destructuring */
import Cookies from 'js-cookie';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import qs from 'querystring';
import { useRouter } from 'next/router';

import gqlService from '@sellermodules/register/services/graphql';
import gqlLocation from '@modules/location/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { getToken, getCustomer } from '@modules/login/services/graphql';

import { expiredToken, custDataNameCookie } from '@config';
import { setLogin } from '@helper_auth';
import { regexPhoneDial, regexEmail } from '@helper_regex';
import Layout from '@layout';
import { getHost } from '@helper_config';
import BackdropLoad from '@helper_backdropload';

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

    const [getCustomerData] = getCustomer({
        onCompleted: (res) => {
            if (res.customer.customer_company_code) {
                Cookies.set(custDataNameCookie, res.customer);
                router.push('/seller/storesetting');
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
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
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
            taxpayer_number: '',
            taxpayer_file: '',
            id_card_number: '',
            id_card_file: '',
            captcha: '',
            account_url: `${getHost()}/seller/account`,
            confirm_url: `${getHost()}/user/account/confirm`,
            login_url: `${getHost()}/login`,
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('registerseller:This_is_a_Required_field')),
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
            taxpayer_number: createStore && Yup.string().required(t('registerseller:This_is_a_Required_field')),
            taxpayer_file: createStore && Yup.object().typeError(t('registerseller:This_is_a_Required_field'))
                .required(t('registerseller:This_is_a_Required_field')),
            id_card_number: createStore && Yup.number().typeError(t('registerseller:Value_must_be_a_number'))
                .required(t('registerseller:This_is_a_Required_field')),
            id_card_file: createStore && Yup.object().typeError(t('registerseller:This_is_a_Required_field'))
                .required(t('registerseller:This_is_a_Required_field')),
            captcha: recaptcha.enable && Yup.string().required(`Captcha ${t('registerseller:required')}`),
        }),
        validateOnChange: true,
        onSubmit: (values) => {
            const {
                city, country_id, latitude, longitude, postcode, region, store_name, street,
                taxpayer_file, id_card_file, captcha, address, ...restValues
            } = values;
            window.backdropLoader(true);
            const input = {
                ...restValues,
                taxpayer_file: taxpayer_file.binary,
                id_card_file: id_card_file.binary,
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
        window.backdropLoader(true);
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
    };

    const handleDragPosition = (value) => {
        setMapPosition(value);
        formik.setFieldValue('longitude', value.lng);
        formik.setFieldValue('latitude', value.lat);
    };

    const handleDropFile = (files, name) => {
        const fileName = files[0].file.name;
        const { baseCode } = files[0];
        formik.setFieldValue(`${name}.filename`, fileName);
        formik.setFieldValue(`${name}.binary`, baseCode);
    };

    React.useMemo(() => {
        if (typeof window !== 'undefined' && navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(displayLocationInfo);
        }
    }, []);

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
        handleDropFile,
        isSuccess,
        userData,
        handleLogin,
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

    React.useEffect(() => {
        BackdropLoad(loadEnabled || loadEnabledReg || loadPubKey || loadPrivKey || loadMap || loadEnableMap || loadEnableStore);
    }, [loadEnabled, loadEnabledReg, loadPubKey, loadPrivKey, loadMap, loadEnableMap, loadEnableStore]);

    if (loadEnabled || loadEnabledReg || loadPubKey || loadPrivKey || loadMap || loadEnableMap || loadEnableStore) {
        return <Layout pageConfig={pageConfig} />;
    }

    const contentProps = {
        ...props,
        recaptcha: {
            enable: dataEnabled.getStoreConfig === '1' && dataEnabledReg.getStoreConfig === '1',
            sitekey: dataPubKey.getStoreConfig,
            secretkey: dataPrivKey.getStoreConfig,
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
