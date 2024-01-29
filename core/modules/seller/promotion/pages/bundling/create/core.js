import React from 'react';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import BackdropLoad from '@helper_backdropload';
import gqlProduct from '@sellermodules/catalog/services/graphql';
import themeService from '@modules/theme/services/graphql';

import gqlService from '@sellermodules/promotion/services/graphql';
import Layout from '@layout';

const ContentWrapper = (props) => {
    const {
        Content, t, location,
    } = props;

    const router = useRouter();

    const [createSellerPromotionBundle] = gqlService.createSellerPromotionBundle();

    const handleSubmit = (input) => {
        window.backdropLoader(true);
        createSellerPromotionBundle({
            variables: { input },
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('sellerpromotion:New_bundling_promotion_has_been_created'),
                    variant: 'success',
                });
                setTimeout(() => router.push('/seller/promotion/bundling'), 250);
            })
            .catch((e) => {
                if (e?.graphQLErrors[0]?.extensions?.category === 'graphql-seller-authorization') {
                    router.push('/seller/unauthorized');
                } else {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: e.message,
                        variant: 'error',
                    });
                }
            });
    };

    const quotaMap = () => {
        const res = location.map((loc) => [loc.id, 1]);
        return Object.fromEntries(res);
    };

    const isCheckbox = () => {
        const res = location.map((loc) => [loc.id, true]);
        return Object.fromEntries(res);
    };

    const isLocation = () => {
        const res = location.map((loc) => [loc.id, true]);
        return Object.fromEntries(res);
    };

    const quotaValidation = () => {
        const res = location.map((loc) => [loc.id, Yup.number().positive(t('sellercatalog:This_is_a_Required_field'))
            .typeError(t('sellercatalog:Value_must_be_a_number')).required(t('sellercatalog:This_is_a_Required_field'))]);
        return Object.fromEntries(res);
    };

    const formik = useFormik({
        initialValues: {
            start_period: dayjs().format('YYYY-MM-DDTHH:mm'),
            end_period: '',
            is_end: false,
            bundle_options: [],
            bundle_parent: [],
            name: '',
            use_quota: false,
            quota: quotaMap(),
            is_checkbox: isCheckbox(),
            is_location: isLocation(),
            quota_location: [],
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('sellerpromotion:This_is_a_Required_field')),
            start_period: Yup.string().required(t('sellerpromotion:This_is_a_Required_field')),
            is_end: Yup.boolean(),
            end_period: Yup.string().when('is_end', {
                is: true,
                then: Yup.string().required(t('sellerpromotion:This_is_a_Required_field')),
            }),
            bundle_options: Yup.array().of(Yup.object())
                .min(1, t('sellerpromotion:Choose_at_least_min_key', { min: 1, key: t('sellerpromotion:product') })),
            use_quota: Yup.boolean(),
            quota: Yup.object().when('use_quota', {
                is: true,
                then: Yup.object().shape(quotaValidation()),
            }),
            quota_location: Yup.array().when('use_quota', {
                is: true,
                then: Yup.array().of(Yup.number())
                    .min(1, t('sellerpromotion:Choose_at_least_min_key', { min: 1, key: t('sellerpromotion:Location') })),
            }),
        }),
        onSubmit: (values) => {
            const valueToSubmit = {
                name: values.name,
                start_period: values.start_period,
                images: values.bundle_options.map((item, i) => ({
                    id: item.images?.[0]?.id,
                    position: i + 1,
                    types: [],
                })),
                bundle_options: values.bundle_options.map((item) => ({
                    name: item.name,
                    selections: !item.isParent ? [{
                        product_id: item.entity_id,
                        price: Number(item.package_price || item.price),
                    }] : item.selectedVariant.map((variant) => ({
                        product_id: variant.entity_id,
                        price: Number(variant.package_price || variant.price),
                    })),
                })),
                use_quota: values.use_quota,
            };
            if (values.use_quota) {
                const quotaKey = Object.keys(values.quota);
                valueToSubmit.quota = quotaKey.filter((e) => values.is_checkbox[e] === true).map((key) => (
                    { loc_id: Number(key), quota: values.is_location[key] ? Number(values.quota[key]) : null }
                ));
            }
            if (values.is_end) {
                valueToSubmit.end_period = values.end_period;
            }
            handleSubmit(valueToSubmit);
        },
    });

    const contentProps = {
        ...props,
        formik,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const { t } = props;
    const pageConfig = {
        title: t('sellerpromotion:Create_Bundling'),
    };

    const { data: dataCat, loading: loadCat } = gqlProduct.getCategoryList();
    const { loading: loadCurrency, data: dataCurrency } = themeService.getCurrency();
    const {
        loading: loadLocation, data: dataLocation,
    } = gqlService.getSellerStores({
        variables: {
            pageSize: 1000,
            currentPage: 1,
        },
    });

    React.useEffect(() => {
        BackdropLoad(loadCat || loadCurrency || loadLocation);
    }, [loadCat, loadCurrency, loadLocation]);

    if (loadCat || loadCurrency || loadLocation) {
        return <Layout pageConfig={pageConfig} seller />;
    }

    const contentProps = {
        ...props,
        categories: dataCat?.getCategoryList,
        currency: dataCurrency?.currency?.base_currency_symbol || dataCurrency?.currency?.base_currency_code,
        location: dataLocation?.getSellerStores?.items || [],
    };

    return (
        <Layout pageConfig={pageConfig} seller>
            <ContentWrapper {...contentProps} />
        </Layout>
    );
};

export default Core;
