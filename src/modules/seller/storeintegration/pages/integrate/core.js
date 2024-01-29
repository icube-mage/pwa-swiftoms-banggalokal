import { useState, useEffect } from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import ErrorRedirect from '@common_errorredirect';

import BackdropLoad from '@helper_backdropload';
import { getHost } from '@helper_config';
import { sendDataLayer } from '@helper_gtm';

import themeService from '@modules/theme/services/graphql';
import gqlService from '@sellermodules/storeintegration/services/graphql';
import formatDate from '@helper_date';
import Cookies from 'js-cookie';

const ContentWrapper = (props) => {
    const {
        t, data, marketplace_code, Content, brandId,
    } = props;
    const router = useRouter();

    const [connectSellerMp] = gqlService.connectSellerMp();
    const [requestSellerMarketplaceIntegration] = gqlService.requestSellerMarketplaceIntegration();

    const [openHelp, setOpenHelp] = useState(false);

    const initialValues = () => {
        const init = [];
        const valid = [];
        const type = {
            string: {
                req: Yup.string().required(t('sellerstoreintegration:This_is_a_Required_field')),
                noReq: Yup.string(),
            },
            integer: {
                req: Yup.number().typeError(t('sellerstoreintegration:Value_must_be_a_number'))
                    .required(t('sellerstoreintegration:This_is_a_Required_field')),
                noReq: Yup.number(),
            },
        };
        // eslint-disable-next-line no-unused-expressions
        data?.credentials?.fields?.forEach((cred) => {
            if (cred.name === 'default_shipping_method') {
                if (cred.required) {
                    valid.push([cred.name, Yup.object().shape({
                        value: Yup.string().required(t('sellerstoreintegration:This_is_a_Required_field')),
                    }).typeError(t('sellerstoreintegration:This_is_a_Required_field'))
                        .required(t('sellerstoreintegration:This_is_a_Required_field'))]);
                } else {
                    valid.push([cred.name, Yup.object().shape({
                        value: Yup.string(),
                    }).typeError('')]);
                }
                return init.push([cred.name, []]);
            }
            valid.push([cred.name, type[cred.type][cred.required !== false ? 'req' : 'noReq']]);
            return init.push([cred.name, (cred.name === 'cutoff_date' ? formatDate((new Date()), 'YYYY-MM-DD') : '')]);
        });
        return {
            init: Object.fromEntries(init),
            valid: Object.fromEntries(valid),
        };
    };

    const formik = useFormik({
        initialValues: {
            ...initialValues().init,
        },
        validationSchema: Yup.object().shape({
            ...initialValues().valid,
        }),
        onSubmit: (values) => {
            const fieldsGql = data?.credentials.fields;
            const credentials = {};
            fieldsGql.forEach((cred) => {
                const data_type = cred.type;
                let value = '';
                if (cred.name === 'default_shipping_method') {
                    value = values[cred.name]?.value || '';
                } else {
                    value = (data_type === 'integer' ? Number(values[cred.name]) : values[cred.name]) || '';
                }
                credentials[cred.name] = { data_type, value };
                credentials.type = { data_type: 'string', value: data.credentials.type };
            });

            window.backdropLoader(true);
            connectSellerMp({
                variables: {
                    input: {
                        brand_id: brandId?.brand_id || null,
                        marketplace_code,
                        credentials: JSON.stringify(credentials),
                    },
                },
            }).then((res) => {
                window.backdropLoader(false);
                if (res?.data?.connectSellerMp) {
                    Cookies.remove('mp_integration_brand');
                    Cookies.remove('mp_reintegration_brand');

                    const dataLayer = {
                        event: 'store_integration',
                        eventLabel: 'Sales Channel - Store Integration',
                        event_data: {
                            marketplace_code,
                        },
                    };
                    sendDataLayer(dataLayer);

                    window.toastMessage({
                        open: true,
                        text: t('sellerstoreintegration:The_store_has_been_successfully_integrated'),
                        variant: 'success',
                    });
                    router.push('/seller/saleschannels/storelist');
                } else {
                    throw new Error(t('sellerstoreintegration:Something_went_wrong_when_try_to_integrate_the_store'));
                }
            }).catch((e) => {
                Cookies.remove('mp_integration_brand');
                Cookies.remove('mp_reintegration_brand');
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
        },
    });

    const formikHelp = useFormik({
        initialValues: {
            email: '',
            marketplace_code,
            url_marketplace: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().required(t('sellerstoreintegration:This_is_a_Required_field')),
            marketplace_code: Yup.string().required(t('sellerstoreintegration:This_is_a_Required_field')),
            url_marketplace: Yup.string().required(t('sellerstoreintegration:This_is_a_Required_field')),
        }),
        onSubmit: (values, { resetForm }) => {
            setOpenHelp(false);
            window.backdropLoader(true);
            requestSellerMarketplaceIntegration({
                variables: {
                    input: { ...values },
                },
            }).then((res) => {
                window.backdropLoader(false);
                if (res?.data?.requestSellerMarketplaceIntegration) {
                    resetForm();
                    router.push('/seller/saleschannels/storelist/help');
                } else {
                    throw new Error(t('sellerstoreintegration:Something_went_wrong_when_try_to_integrate_the_store'));
                }
            }).catch((e) => {
                setOpenHelp(true);
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
        },
    });

    const contentProps = {
        ...props,
        formik,
        openHelp,
        setOpenHelp,
        formikHelp,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const brandId = Cookies.getJSON('mp_reintegration_brand') || '';
    const newBrandId = Cookies.getJSON('mp_integration_brand') || '';

    const pageConfig = {
        title: t('sellerstoreintegration:Integrate'),
        backUrl: '/seller/saleschannels/storeintegration',
    };

    const { data, loading, error } = gqlService.getSellerMpCredentialsQuery({
        variables: {
            marketplace_code: router.query.mp_code,
            callback_url: `${getHost()}${router.asPath}?`,
            brand_id: router.asPath.includes('reintegrate') ? (brandId?.brand_id || null) : (newBrandId?.brand_id || null),
        },
        skip: !router.query.mp_code,
    });

    if (router.asPath.includes('reintegrate') && brandId.mp_code !== router.query.mp_code) {
        const errMsg = error?.message ?? t('sellerstoreintegration:Data_not_found');
        const redirect = '/seller/saleschannels/storeintegration';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} isSeller />;
    }

    const { loading: aclCheckLoading, data: aclCheckData } = themeService.isAccessAllowed({
        acl_code: 'seller_sales_channel_integration',
    });

    useEffect(() => {
        BackdropLoad(aclCheckLoading || loading);
    }, [aclCheckLoading, loading]);

    if (aclCheckLoading || loading) {
        return <Layout pageConfig={pageConfig} seller />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/seller/saleschannels/storeintegration');
        return <Layout pageConfig={pageConfig} seller />;
    }

    if (!data || !router.query.mp_code) {
        const errMsg = error?.message ?? t('sellerstoreintegration:Data_not_found');
        const redirect = '/seller/saleschannels/storeintegration';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} isSeller />;
    }

    const contentProps = {
        ...props,
        data: data.getSellerMpCredentials?.marketplaces?.[0],
        marketplace_code: router.query.mp_code,
        brandId: router.asPath.includes('reintegrate') ? brandId : newBrandId,
    };

    return (
        <Layout pageConfig={pageConfig} seller>
            <ContentWrapper {...contentProps} />
        </Layout>
    );
};

export default Core;
