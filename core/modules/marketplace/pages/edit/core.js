/* eslint-disable max-len */
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';

import gqlService from '@modules/marketplace/services/graphql';
import themeService from '@modules/theme/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';
import locationGqlService from '@modules/location/services/graphql';
import Layout from '@layout';

function translateOptions(opt) {
    return opt.replace(/[.,/#!?$%^&*;:{}=\-`~()]/g, '')
        .replace(/ /g, '_');
}

const ContentWrapper = (props) => {
    const {
        data, Content, t, dataFeatures, countryOption,
    } = props;
    const router = useRouter();
    const [updateMarketplace] = gqlService.updateMarketplace();

    const handleSubmit = (input) => {
        window.backdropLoader(true);
        updateMarketplace({
            variables: { mp_code: router.query.code, input },
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('marketplace:Marketplace_has_been_successfully_updated'),
                    variant: 'success',
                });
                setTimeout(() => router.push('/marketplace/marketplace'), 250);
            })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
    };

    const findIdx = (key) => data.credentials.findIndex((cred) => !!cred[key]);

    const formik = useFormik({
        initialValues: {
            marketplace_code: data.marketplace_code,
            marketplace_name: data.marketplace_name,
            country: countryOption.find(({ id }) => id === data.country_id),
            image_binary: '',
            image_url: data.image_url || '',
            is_active: data?.is_active ?? false,
            features: data.features?.filter((feat) => dataFeatures?.includes(feat))?.map((cap) => ({
                id: cap,
                name: t(`marketplace:${translateOptions(cap)}`),
            })) || [],
            is_open_api: data?.is_open_api ?? false,
            // can_update_order: data?.can_update_order ?? false,
            can_accept_order: data?.can_accept_order ?? false,
            can_pack_order: data?.can_pack_order ?? false,
            can_complete_order: data?.can_complete_order ?? false,
            can_cancel_order: data?.can_cancel_order ?? false,
            credentials: data?.credentials || [],
            attributes_map: data?.attributes_map || [],
            is_identifier: findIdx('is_identifier') >= 0 ? findIdx('is_identifier') : null,
        },
        validationSchema: Yup.object().shape({
            marketplace_code: Yup.string()
                .typeError(t('marketplace:This_is_a_Required_field'))
                .max(32, t('marketplace:This_field_must_be_at_most_max_characters', { max: 32 }))
                .required(t('marketplace:This_is_a_Required_field')),
            marketplace_name: Yup.string()
                .typeError(t('marketplace:This_is_a_Required_field'))
                .max(255, t('marketplace:This_field_must_be_at_most_max_characters', { max: 255 }))
                .required(t('marketplace:This_is_a_Required_field')),
            credentials: Yup.array().of(
                Yup.object().shape({
                    credentials_field: Yup.string()
                        .typeError(t('marketplace:This_is_a_Required_field'))
                        .required(t('marketplace:This_is_a_Required_field')),
                }),
            ),
            attributes_map: Yup.array().of(
                Yup.object().shape({
                    attribute_code: Yup.string()
                        .typeError(t('marketplace:This_is_a_Required_field'))
                        .required(t('marketplace:This_is_a_Required_field')),
                    marketplace_attribute: Yup.string()
                        .typeError(t('marketplace:This_is_a_Required_field'))
                        .required(t('marketplace:This_is_a_Required_field')),
                }),
            ),
            country: Yup.string()
                .typeError(t('marketplace:This_is_a_Required_field'))
                .required(t('marketplace:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            const {
                credentials, features, attributes_map, is_identifier, image_url, country, ...restValues
            } = values;
            const valuesToSubmit = {
                ...restValues,
                country_id: country.id,
                features: features?.length ? features?.map(({ id }) => id) : null,
                credentials: credentials?.map((cred, idx) => ({
                    credentials_field: cred.credentials_field,
                    description: cred.description,
                    is_identifier: idx === is_identifier,
                })),
                attributes_map: attributes_map?.length ? attributes_map?.map((att) => ({
                    attribute_code: att.attribute_code,
                    marketplace_attribute: att.marketplace_attribute,
                })) : [],
            };
            handleSubmit(valuesToSubmit);
        },
    });

    const handleDropFile = (files) => {
        const { baseCode } = files[0];
        formik.setFieldValue('image_binary', baseCode);
    };

    const contentProps = {
        ...props,
        formik,
        t,
        handleDropFile,
        featuresOption: dataFeatures?.map((cap) => ({
            id: cap,
            name: t(`marketplace:${translateOptions(cap)}`),
        })) || [],
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = themeService.isAccessAllowed({
        acl_code: 'oms_lite_marketplace',
    });

    const { loading, data, error } = gqlService.getMarketplace({
        filter: { marketplace_code: { eq: router.query.code } },
        pageSize: 1,
        currentPage: 1,
    });
    const { data: dataFeatures, loading: loadingFeatures } = gqlService.getMarketplaceCapabilities();
    const [getCountries, getCountriesRes] = locationGqlService.getCountries();

    const pageConfig = {
        title: t('marketplace:Edit_Marketplace'),
    };

    useEffect(() => { getCountries(); }, []);

    useEffect(() => {
        BackdropLoad(loading || aclCheckLoading || loadingFeatures || getCountriesRes.loading);
    }, [loading, aclCheckLoading, loadingFeatures, getCountriesRes.loading]);

    if (loading || aclCheckLoading || loadingFeatures || getCountriesRes.loading) {
        return <Layout pageConfig={pageConfig} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    if (!data || !data?.getMarketplaceList?.items?.length) {
        const errMsg = error?.message ?? t('marketplace:Data_not_found');
        const redirect = '/marketplace/marketplace';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} />;
    }

    const contentProps = {
        ...props,
        data: data?.getMarketplaceList?.items?.[0],
        t,
        dataFeatures: dataFeatures?.getMarketplaceCapabilities || [],
        getCountries,
        getCountriesRes,
        countryOption: getCountriesRes?.data?.countries || [],
    };

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper {...contentProps} />
        </Layout>
    );
};

export default Core;
