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
        Content, cookiesData, setCookiesData, data, t,
    } = props;
    const router = useRouter();

    const [createWebstoreChannel] = gqlService.createWebstoreChannel();
    const isMultiseller = cookiesData.data[cookiesData.step]?.is_multiseller;

    const handleSubmit = (variables, resetForm) => {
        window.backdropLoader(true);
        createWebstoreChannel({
            variables: {
                input: {
                    ...variables,
                },
            },
        }).then((res) => {
            window.backdropLoader(false);
            if (res?.data?.createWebstoreChannel) {
                window.toastMessage({
                    open: true,
                    text: t('ecommercechannel:The_channel_has_been_successfully_integrated'),
                    variant: 'success',
                });
                resetForm();
                const nextStep = cookiesData.step + 1;
                if (nextStep === cookiesData.data.length) {
                    helperCookies.remove('webstore_step');
                    helperCookies.remove('webstore');
                    router.push('/integration/ecommercechannel');
                } else {
                    setTimeout(() => {
                        setCookiesData((prev) => ({ ...prev, step: nextStep }));
                        helperCookies.set('webstore_step', nextStep);
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

    const initialValues = () => {
        const init = [];
        const valid = [];
        data.getWebstoreCreds.fields.map((cred) => {
            valid.push([cred.name, Yup.string().required(t('ecommercechannel:This_is_a_Required_field'))]);
            return init.push([cred.name, '']);
        });
        return {
            init: Object.fromEntries(init),
            valid: Object.fromEntries(valid),
        };
    };

    const formik = useFormik({
        initialValues: {
            framework: cookiesData.data[cookiesData.step]?.framework,
            loc_id: [],
            is_multiseller: isMultiseller,
            ...initialValues().init,
        },
        validationSchema: Yup.object().shape({
            loc_id: !isMultiseller && Yup.array().of(Yup.object().shape({
                loc_id: Yup.number().required(t('ecommercechannel:This_is_a_Required_field')),
            }).typeError(t('ecommercechannel:This_is_a_Required_field')))
                .min(1, t('ecommercechannel:Minimum_1_location_must_be_selected')).required(t('ecommercechannel:This_is_a_Required_field')),
            ...initialValues().valid,
        }),
        onSubmit: (values, { resetForm }) => {
            const { loc_id, ...restValues } = values;
            const valuesToSubmit = {
                ...restValues,
            };
            if (!isMultiseller) {
                valuesToSubmit.loc_id = loc_id.map((loc) => (
                    loc.loc_id
                ));
            }
            handleSubmit(valuesToSubmit, resetForm);
        },
    });

    const contentProps = {
        formik,
        fieldToMaps: data?.getWebstoreCreds?.fields || [],
        isMultiseller,
        ...props,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const { t } = props;
    const pageConfig = {
        title: t('ecommercechannel:Integration_Webstore'),
    };
    const router = useRouter();

    const [cookiesData, setCookiesData] = React.useState({
        step: Cookies.getJSON('webstore_step'),
        data: Cookies.getJSON('webstore') || [],
    });

    React.useEffect(() => {
        BackdropLoad(!cookiesData.data.length);
    }, [cookiesData.data]);

    if (typeof window === 'undefined' || (typeof window === 'undefined' && !cookiesData.data.length)) {
        return <Layout pageConfig={pageConfig} />;
    }

    if (!cookiesData.data.length) {
        router.push('/integration/ecommercechannel/add');
    }

    const { data, loading, error } = gqlService.getWebstoreCreds({
        variables: {
            framework: cookiesData.data[cookiesData.step]?.framework,
        },
    });
    const { data: dataCapability, loading: loadingCapability, error: errorCapability } = gqlService.getWebstoreCapability({
        variables: {
            framework: cookiesData.data[cookiesData.step]?.framework,
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
        BackdropLoad(loadingCapability || loading || aclCheckLoading || loadingConfigApi || loadingConfigEnable);
    }, [loadingCapability, loading, aclCheckLoading, loadingConfigApi, loadingConfigEnable]);

    if (loadingCapability || loading || aclCheckLoading) {
        return <Layout pageConfig={pageConfig} />;
    }

    if ((error || !data || errorCapability || !dataCapability)) {
        const errMsg = error?.message || errorCapability?.message || t('ecommercechannel:Data_not_found');
        const redirect = '/integration/ecommercechannel/add';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false || errorCapability || error) {
        router.push('/integration/ecommercechannel/add');
    }

    const contentProps = {
        capabilitiesData: (dataCapability && dataCapability.getWebstoreCapability
            && dataCapability.getWebstoreCapability) || { capabilities: [], image_url: '', name: '' },
        data,
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
