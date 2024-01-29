import Layout from '@layout';
import gqlService from '@modules/ecommercechannel/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import helperCookies from '@helper_cookies';
import Cookies from 'js-cookie';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const {
        Content, cookiesData, setCookiesData, t,
    } = props;
    const router = useRouter();

    const marketplaceCode = cookiesData.data[cookiesData.step];

    const [registerMarketplaceChannel] = gqlService.registerMarketplaceChannel();
    const [getAvailableMpToConnect, getAvailableMpToConnectRes] = gqlService.getAvailableMpToConnect({
        onCompleted: () => {
            window.backdropLoader(false);
        },
        onError: () => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('ecommercechannel:Error_when_connecting_to_markeplaces'),
                variant: 'error',
            });
        },
    });
    const [getJdidOauth] = gqlService.getJdidOauth({
        onCompleted: (res) => {
            window.backdropLoader(false);
            router.push(res.getJdidOauth);
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

    const onChangeStore = (e) => {
        if (e) {
            window.backdropLoader(true);
            getAvailableMpToConnect({
                variables: {
                    store_id: e.id,
                    marketplace_code: marketplaceCode,
                    callback_url: `${window.origin}${router.pathname}?`,
                },
            });
        }
    };

    const handleSubmit = (variables, resetForm, oauth = false) => {
        window.backdropLoader(true);
        registerMarketplaceChannel({
            variables: {
                input: {
                    ...variables,
                    credentials: JSON.stringify(variables.credentials),
                },
            },
        }).then((res) => {
            window.backdropLoader(false);
            if (res?.data?.registerMarketplaceChannel) {
                window.toastMessage({
                    open: true,
                    text: t('ecommercechannel:The_channel_has_been_successfully_integrated'),
                    variant: 'success',
                });
                if (resetForm) {
                    resetForm();
                }
                helperCookies.remove('marketplace_register');
                const nextStep = cookiesData.step + 1;
                if (nextStep === cookiesData.data.length) {
                    helperCookies.remove('marketplace_step');
                    helperCookies.remove('marketplace');
                    router.push('/integration/ecommercechannel');
                } else {
                    setTimeout(() => {
                        if (oauth) {
                            setCookiesData((prev) => ({ ...prev, step: nextStep }));
                            helperCookies.set('marketplace_step', nextStep);
                            router.push('/integration/ecommercechannel/add/integrate/marketplace');
                        } else {
                            setCookiesData((prev) => ({ ...prev, step: nextStep }));
                            helperCookies.set('marketplace_step', nextStep);
                        }
                    }, 250);
                }
            } else {
                throw new Error(t('ecommercechannel:Error_Something_is_wrong_when_create_webstore_channel'));
            }
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const handleOauth = (variables, url) => {
        helperCookies.set('marketplace_register', {
            ...variables,
        });
        router.push(url);
    };

    const handleJdid = (variables) => {
        helperCookies.set('marketplace_register', {
            ...variables,
        });
        const { loc_id, ...restVariables } = variables;
        restVariables.credentials.callback_url = { data_type: 'string', value: `${window.origin}${router.pathname}?` };
        window.backdropLoader(true);
        getJdidOauth({
            variables: {
                input: {
                    ...restVariables,
                    credentials: JSON.stringify(restVariables.credentials),
                },
            },
        });
    };

    const initialValues = () => {
        const init = [];
        const valid = [];
        const type = {
            string: {
                req: Yup.string().required(t('ecommercechannel:This_is_a_Required_field')),
                noReq: Yup.string(),
            },
            integer: {
                req: Yup.number().typeError(t('ecommercechannel:Value_must_be_a_number'))
                    .required(t('ecommercechannel:This_is_a_Required_field')),
                noReq: Yup.number(),
            },
        };
        ((getAvailableMpToConnectRes.data?.getAvailableMpToConnect?.marketplaces.length
            && getAvailableMpToConnectRes.data?.getAvailableMpToConnect?.marketplaces[0]?.credentials.fields)
            || []).map((cred) => {
            if (cred.name === 'default_shipping_method') {
                if (cred.required !== false) {
                    valid.push([cred.name, Yup.object().shape({
                        value: Yup.string().required(t('ecommercechannel:This_is_a_Required_field')),
                    }).typeError(t('ecommercechannel:This_is_a_Required_field'))
                        .required(t('ecommercechannel:This_is_a_Required_field'))]);
                } else {
                    valid.push([cred.name, Yup.object().shape({
                        value: Yup.string(),
                    }).typeError('')]);
                }
                return init.push([cred.name, []]);
            }
            valid.push([cred.name, type[cred.type][cred.required !== false ? 'req' : 'noReq']]);
            return init.push([cred.name, '']);
        });
        return {
            init: Object.fromEntries(init),
            valid: Object.fromEntries(valid),
        };
    };

    const formik = useFormik({
        initialValues: {
            brand_id: '',
            loc_id: [],
            marketplace_code: marketplaceCode,
            ...initialValues().init,
        },
        validationSchema: Yup.object().shape({
            store_id: Yup.object().typeError(t('ecommercechannel:This_is_a_Required_field'))
                .required(t('ecommercechannel:This_is_a_Required_field')),
            loc_id: Yup.array().of(Yup.object().shape({
                loc_id: Yup.number().required(t('ecommercechannel:This_is_a_Required_field')),
            }).typeError(t('ecommercechannel:This_is_a_Required_field')))
                .min(1, t('ecommercechannel:Minimum_1_location_must_be_selected'))
                .required(t('ecommercechannel:This_is_a_Required_field')),
            ...initialValues().valid,
        }),
        onSubmit: (values, { resetForm }) => {
            const {
                loc_id, brand_id, marketplace_code, store_id, ...restValues
            } = values;
            const valuesToSubmit = {
                loc_id: loc_id.map((loc) => (
                    Number(loc.loc_id)
                )),
                brand_id: String(brand_id),
                marketplace_code: String(marketplace_code),
            };
            const dataMarketplaceGql = getAvailableMpToConnectRes.data?.getAvailableMpToConnect?.marketplaces[0];

            const fieldsGql = dataMarketplaceGql?.credentials.fields;
            const credentials = {};
            fieldsGql.forEach((cred) => {
                const data_type = cred.type;
                let value = '';
                if (cred.name === 'default_shipping_method') {
                    value = restValues[cred.name]?.value || '';
                } else {
                    value = (data_type === 'integer' ? Number(restValues[cred.name]) : restValues[cred.name]) || '';
                }
                credentials[cred.name] = { data_type, value };
                credentials.type = { data_type: 'string', value: dataMarketplaceGql.credentials.type };
            });
            valuesToSubmit.credentials = credentials;

            if (marketplaceCode === 'JDID') {
                handleJdid(valuesToSubmit);
            } else if (dataMarketplaceGql.credentials.type === 'oauth2') {
                handleOauth(valuesToSubmit, dataMarketplaceGql.credentials.url);
            } else {
                handleSubmit(valuesToSubmit, resetForm);
            }
        },
    });

    const contentProps = {
        formik,
        fieldToMaps: (getAvailableMpToConnectRes.data?.getAvailableMpToConnect?.marketplaces.length
            && getAvailableMpToConnectRes.data?.getAvailableMpToConnect?.marketplaces[0]?.credentials.fields) || [],
        onChangeStore,
        data: (getAvailableMpToConnectRes.data?.getAvailableMpToConnect?.marketplaces.length
            && getAvailableMpToConnectRes.data?.getAvailableMpToConnect?.marketplaces.length
            && getAvailableMpToConnectRes.data?.getAvailableMpToConnect?.marketplaces[0]) || [],
        ...props,
    };

    React.useEffect(() => {
        if (getAvailableMpToConnectRes.data && getAvailableMpToConnectRes.data.getAvailableMpToConnect) {
            formik.setFieldValue('brand_id', getAvailableMpToConnectRes.data.getAvailableMpToConnect.brand_id);
        }
    }, [getAvailableMpToConnectRes.data]);

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const urlParams = router.query;
            if (urlParams && urlParams.status === 'success' && urlParams.mpcode?.toLowerCase() === marketplaceCode?.toLowerCase()) {
                const variables = Cookies.getJSON('marketplace_register');
                handleSubmit(variables, null, true);
            }
            if (urlParams && urlParams.status !== 'success' && urlParams.mpcode?.toLowerCase() === marketplaceCode?.toLowerCase()) {
                window.toastMessage({
                    open: true,
                    text: t('ecommercechannel:Error_when_integrating_with_markeplaces'),
                    variant: 'error',
                });
            }
        }
    }, []);

    return (
        <Content {...contentProps} type />
    );
};

const Core = (props) => {
    const { t } = props;
    const pageConfig = {
        title: t('ecommercechannel:Integration_Marketplace'),
    };
    const router = useRouter();

    const [cookiesData, setCookiesData] = React.useState({
        step: Cookies.getJSON('marketplace_step'),
        data: Cookies.getJSON('marketplace') || [],
    });

    React.useEffect(() => {
        BackdropLoad(!cookiesData.data);
    }, [cookiesData.data]);

    if (typeof window === 'undefined' || (typeof window === 'undefined' && !cookiesData.data.length)) {
        return <Layout pageConfig={pageConfig} />;
    }

    if (!cookiesData.data.length) {
        router.push('/integration/ecommercechannel/add');
    }

    const { data: dataCapability, loading: loadingCapability, error: errorCapability } = gqlService.getMarketplaceCapability({
        skip: !cookiesData.data.length,
        variables: {
            marketplace_code: cookiesData.data[cookiesData.step],
        },
    });
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'ecommerce_channels',
    });

    const { loading: loadingConfigApi, data: dataConfigApi } = gqlService.getStoreConfig({
        path: 'swiftoms_general/google_map/api_key',
    });

    const { loading: loadingConfigEnable, data: dataConfigEnable } = gqlService.getStoreConfig({
        path: 'swiftoms_general/google_map/enabled',
    });

    React.useEffect(() => {
        BackdropLoad(loadingCapability || aclCheckLoading || loadingConfigApi || loadingConfigEnable);
    }, [loadingCapability, aclCheckLoading, loadingConfigApi, loadingConfigEnable]);

    if (loadingCapability || aclCheckLoading) {
        return <Layout pageConfig={pageConfig} />;
    }

    if ((errorCapability || !dataCapability)) {
        const errMsg = errorCapability?.message || t('ecommercechannel:Data_not_found');
        const redirect = '/integration/ecommercechannel/add';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false || errorCapability) {
        router.push('/integration/ecommercechannel/add');
    }

    const contentProps = {
        capabilitiesData: (dataCapability && dataCapability.getMarketplaceCapability)
            || { capabilities: [], image_url: '', name: '' },
        cookiesData,
        setCookiesData,
        t,
        enableMap: dataConfigEnable?.getStoreConfig === '1',
        gmapKey: dataConfigApi?.getStoreConfig || '',
        ...props,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper {...contentProps} />
        </Layout>
    );
};

export default Core;
