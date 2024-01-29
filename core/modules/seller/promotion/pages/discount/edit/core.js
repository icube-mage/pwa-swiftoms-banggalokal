/* eslint-disable no-nested-ternary */
import React from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { getLocalStorage, removeLocalStorage } from '@helper_localstorage';
import BackdropLoad from '@helper_backdropload';
import formatDate from '@helper_date';
import Layout from '@layout';

import gqlProduct from '@sellermodules/catalog/services/graphql';
import gqlService from '@sellermodules/promotion/services/graphql';
import themeService from '@modules/theme/services/graphql';

const ContentWrapper = (props) => {
    const {
        Content, t,
    } = props;

    const router = useRouter();

    const [saveSellerDiscount] = gqlService.saveSellerDiscount();

    const handleSubmit = (input, formik) => {
        window.backdropLoader(true);
        saveSellerDiscount({
            variables: { input },
        })
            .then((res) => {
                const errorData = res.data.saveSellerDiscount.error_data;
                if (errorData?.length) {
                    window.toastMessage({
                        open: true,
                        text: t('sellerpromotion:There_is_something_error_while_updating_discount_product'),
                        variant: 'error',
                    });
                    const newOptions = [];
                    formik.values.discount_options.forEach((option) => {
                        const findOpt = errorData.find((err) => err.sku === option.sku);
                        if (findOpt) {
                            const resToPush = {
                                ...option,
                                message: findOpt.message,
                                selected_variants: findOpt.variants?.length
                                    ? option.selected_variants.filter((variant) => findOpt.variants.find((v) => v.sku === variant.sku))
                                        .map((variant) => {
                                            const findVariant = findOpt.variants.find((v) => v.sku === variant.sku);
                                            return {
                                                ...variant,
                                                message: findVariant.message,
                                            };
                                        }) : [],
                            };
                            newOptions.push(resToPush);
                        }
                    });
                    formik.setFieldValue('discount_options', newOptions);
                    window.backdropLoader(false);
                } else {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: t('sellerpromotion:Discount_has_been_updated'),
                        variant: 'success',
                    });
                    setTimeout(() => router.push('/seller/promotion/discount'), 250);
                }
            })
            .catch((e) => {
                if (e?.graphQLErrors?.[0]?.extensions?.category === 'graphql-seller-authorization') {
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
    const discount_options = getLocalStorage('edit_discount') ? JSON.parse(getLocalStorage('edit_discount'))?.length
        ? [...JSON.parse(getLocalStorage('edit_discount'))] : [{ ...JSON.parse(getLocalStorage('edit_discount')) }] : [];
    const formik = useFormik({
        initialValues: {
            discount_options: [...discount_options],
        },
        validationSchema: Yup.object().shape({
            discount_options: Yup.array().of(Yup.object())
                .min(1, t('sellerpromotion:Choose_at_least_min_key', { min: 1, key: t('sellerpromotion:product') })),
        }),
        onSubmit: (values) => {
            const valueToSubmit = values.discount_options.map((item) => {
                const res = {
                    sku: item.sku,
                    discount_price: item.isParent ? 0 : Number(item.discount_price),
                    discount_from_date: item.isParent ? '' : formatDate(item.from, 'YYYY-MM-DD'),
                    discount_to_date: item.isParent ? '' : formatDate(item.to, 'YYYY-MM-DD'),
                };
                if (item.isParent) {
                    res.variants = item.selected_variants.map((variant) => ({
                        sku: variant.sku,
                        discount_price: Number(variant.discount_price, 'YYYY-MM-DD'),
                        discount_from_date: formatDate(variant.from, 'YYYY-MM-DD'),
                        discount_to_date: formatDate(variant.to, 'YYYY-MM-DD'),
                    }));
                }
                return res;
            });
            handleSubmit(valueToSubmit, formik);
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
    const router = useRouter();
    const pageConfig = {
        title: t('sellerpromotion:Set_Product_Discount'),
    };

    const { loading: aclCheckLoading, data: aclCheckData } = themeService.isAccessAllowed({
        acl_code: 'seller_promotion_discount',
    });
    const { loading: loadCurrency, data: dataCurrency } = themeService.getCurrency();
    const { data: dataCat, loading: loadCat } = gqlProduct.getCategoryList();

    React.useEffect(() => {
        BackdropLoad(loadCat || loadCurrency || aclCheckLoading);
    }, [loadCat, loadCurrency, aclCheckLoading]);

    React.useEffect(() => () => removeLocalStorage('edit_discount'), []);

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/seller/unauthorized');
        return <Layout pageConfig={pageConfig} seller />;
    }

    if (typeof window !== 'undefined' && !getLocalStorage('edit_discount')) {
        router.push('/seller/promotion/discount');
        return <Layout pageConfig={pageConfig} seller />;
    }

    if (loadCat || loadCurrency || aclCheckLoading) {
        return <Layout pageConfig={pageConfig} seller />;
    }

    const contentProps = {
        ...props,
        categories: dataCat?.getCategoryList,
        currency: dataCurrency?.currency?.base_currency_symbol || dataCurrency?.currency?.base_currency_code,
    };

    return (
        <Layout pageConfig={pageConfig} seller>
            <ContentWrapper {...contentProps} />
        </Layout>
    );
};

export default Core;
