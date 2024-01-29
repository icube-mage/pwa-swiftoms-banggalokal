import React from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import BackdropLoad from '@helper_backdropload';
import themeService from '@modules/theme/services/graphql';
import gqlService from '@sellermodules/catalog/services/graphql';
import Layout from '@layout';

const ContentWrapper = (props) => {
    const {
        Content, t, shippingOptions, shipConfig,
    } = props;
    const router = useRouter();

    const [createSellerProduct] = gqlService.createSellerProduct();
    const mappedShippingOptions = shippingOptions.map((ship) => ({ ...ship, label: `${ship.provider} - ${ship.service}` }));

    const handleSubmit = (input) => {
        window.backdropLoader(true);
        createSellerProduct({
            variables: { input },
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('storesetting:New_product_has_been_created'),
                    variant: 'success',
                });
                setTimeout(() => router.push('/seller/catalog'), 250);
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

    const formik = useFormik({
        initialValues: {
            name: '',
            sku: '',
            price: '',
            minimum_order_quantity: 1,
            category_id: null,
            weight: '',
            images: [],
            shipping: mappedShippingOptions,
            is_variant: false,
            variants: [{}],
            variant_table: [],
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('sellercatalog:This_is_a_Required_field')),
            sku: Yup.string().required(t('sellercatalog:This_is_a_Required_field')),
            price: Yup.number().nullable().when('is_variant', {
                is: false,
                then: Yup.number().positive(t('sellercatalog:Value_must_be_greater_than_0'))
                    .typeError(t('sellercatalog:Value_must_be_a_number')).required(t('sellercatalog:This_is_a_Required_field')),
            }),
            minimum_order_quantity: Yup.number().positive(t('sellercatalog:Value_must_be_greater_than_0'))
                .integer(t('sellercatalog:Value_must_be_an_integer'))
                .typeError(t('sellercatalog:Value_must_be_a_number'))
                .required(t('sellercatalog:This_is_a_Required_field')),
            category_id: Yup.number().typeError(t('selercatalog:Choose_at_least_min_key', { min: 1, key: t('sellercatalog:category') }))
                .required(t('selercatalog:Choose_at_least_min_key', { min: 1, key: t('sellercatalog:category') })),
            weight: Yup.number().nullable().when('is_variant', {
                is: false,
                then: Yup.number().positive(t('sellercatalog:Value_must_be_greater_than_0'))
                    .typeError(t('sellercatalog:Value_must_be_a_number')).required(t('sellercatalog:This_is_a_Required_field')),
            }),
            images: Yup.array().of(Yup.object())
                .min(1, t('selercatalog:Choose_at_least_min_key', { min: 1, key: t('sellercatalog:photo') })),
            shipping: shipConfig && Yup.array().of(Yup.object())
                .min(1, t('selercatalog:Choose_at_least_min_key', { min: 1, key: t('sellercatalog:shipping') })),
            dimension_package_height: Yup.number().positive(t('sellercatalog:Value_must_be_greater_than_0'))
                .typeError(t('sellercatalog:Value_must_be_a_number')).nullable(),
            dimension_package_length: Yup.number().positive(t('sellercatalog:Value_must_be_greater_than_0'))
                .typeError(t('sellercatalog:Value_must_be_a_number')).nullable(),
            dimension_package_width: Yup.number().positive(t('sellercatalog:Value_must_be_greater_than_0'))
                .typeError(t('sellercatalog:Value_must_be_a_number')).nullable(),
            is_variant: Yup.boolean(),
            variant_table: Yup.array().of(Yup.object()).when('is_variant', {
                is: true,
                then: Yup.array().of(Yup.object().shape({
                    price: Yup.number().positive(t('sellercatalog:Value_must_be_greater_than_0'))
                        .typeError(t('sellercatalog:Value_must_be_a_number')).required(t('sellercatalog:This_is_a_Required_field')),
                    sku: Yup.string().required(t('sellercatalog:This_is_a_Required_field')),
                    weight: Yup.number().positive(t('sellercatalog:Value_must_be_greater_than_0'))
                        .typeError(t('sellercatalog:Value_must_be_a_number')).required(t('sellercatalog:This_is_a_Required_field')),
                })),
            }),
            variants: Yup.array().of(Yup.object()).when('is_variant', {
                is: true,
                then: Yup.array().of(Yup.object().shape({
                    type: Yup.array().of(Yup.object())
                        .min(1, t('selercatalog:Choose_at_least_min_key', { min: 1, key: t('sellercatalog:attribute') })),
                    frontend_label: Yup.string().required(t('sellercatalog:This_is_a_Required_field')),
                })),
            }),
        }),
        onSubmit: (values) => {
            const {
                shipping, images, weight, price, is_variant, variants, variant_table, minimum_order_quantity,
                dimension_package_height, dimension_package_length, dimension_package_width, etalase_ids, ...restValues
            } = values;
            let position = 0;
            const valueToSubmit = {
                ...restValues,
                dimension_package_height: dimension_package_height ? Number(dimension_package_height) : null,
                dimension_package_length: dimension_package_length ? Number(dimension_package_length) : null,
                dimension_package_width: dimension_package_width ? Number(dimension_package_width) : null,
                minimum_order_quantity: Number(minimum_order_quantity),
                images: images.map(({ name, size, ...rest }) => {
                    position += 1;
                    return ({
                        ...rest,
                        position,
                    });
                }),
                etalase_ids: etalase_ids ? etalase_ids.map((e) => e.entity_id) : null,
            };
            if (shipConfig) {
                valueToSubmit.shipping = shipping.map((ship) => ship.entity_id);
            }
            if (is_variant) {
                valueToSubmit.variant_items = variant_table.map((item) => {
                    const variant_items = {
                        price: Number(item.price),
                        sku: item.sku,
                        weight: Number(item.weight),
                        status: item.status ? 1 : 2,
                        variant_attributes: variants.map((variant) => ({
                            frontend_label: variant.frontend_label,
                            attribute_value: item[variant.attribute_code],
                            attribute_code: variant.is_new ? null : variant.attribute_code,
                        }
                        )),
                    };
                    if (item.image) {
                        variant_items.images = [{
                            binary: item.image,
                            is_deleted: false,
                            position: 1,
                        }];
                    }
                    return variant_items;
                });
                valueToSubmit.price = 0;
            } else {
                valueToSubmit.weight = Number(weight);
                valueToSubmit.price = Number(price);
            }
            handleSubmit(valueToSubmit);
        },
    });

    const handleDropFile = (files, name, i) => {
        const { baseCode, file } = files[0];
        const input = formik.values[name] || [];
        if (i !== null && i >= 0) {
            input[i] = {
                binary: baseCode,
                types: [],
                is_deleted: false,
                name: file.name,
                size: `${file.size / 1000} KB`,
            };
        } else {
            input.push({
                binary: baseCode,
                types: [],
                is_deleted: false,
                name: file.name,
                size: `${file.size / 1000} KB`,
            });
        }
        formik.setFieldValue(name, input);
    };

    const contentProps = {
        ...props,
        formik,
        handleDropFile,
        shippingOptions: mappedShippingOptions,
    };

    return (
        <Content {...contentProps} />
    );
};
const Core = (props) => {
    const { t } = props;
    const pageConfig = {
        title: t('sellercatalog:Add_Product'),
    };

    const { data: dataCat, loading: loadCat } = gqlService.getCategoryList();
    const { data: dataShip, loading: loadShip } = gqlService.getStoreShippingMethod();
    const { data: dataVariant, loading: loadVariant } = gqlService.getSellerVariantAttributes();
    const { data: configData, loading: configLoading } = themeService.getStoreConfig({
        path: 'swiftoms_vendorportal/product/general/enable_seller_create_variant',
    });
    const { data: shipConfig, loading: shipConfigLoading } = themeService.getStoreConfig({
        path: 'swiftoms_vendorportal/store/general/enable_store_shipping',
    });
    const { data: dataEtalase, loading: loadEtalase } = gqlService.getSellerEtalaseList({
        filter: {
            is_default: { eq: '0' },
        },
    });
    const { loading: loadCurrency, data: dataCurrency } = themeService.getCurrency();

    React.useEffect(() => {
        BackdropLoad(loadCat || loadShip || configLoading || loadVariant || shipConfigLoading || loadCurrency || loadEtalase);
    }, [loadCat, loadShip, configLoading, loadVariant, shipConfigLoading, loadCurrency, loadEtalase]);

    if (loadCat || loadShip || configLoading || loadVariant || shipConfigLoading || loadCurrency) {
        return <Layout pageConfig={pageConfig} seller />;
    }

    const contentProps = {
        ...props,
        categories: dataCat?.getCategoryList || [],
        shippingOptions: dataShip?.getStoreShippingMethod || [],
        enableCreateVariant: configData.getStoreConfig === '1',
        menuVariant: dataVariant?.getSellerVariantAttributes,
        shipConfig: shipConfig.getStoreConfig === '1',
        currency: dataCurrency?.currency?.base_currency_symbol || dataCurrency?.currency?.base_currency_code,
        dataEtalase: dataEtalase?.getSellerEtalaseList?.items,
    };

    return (
        <Layout pageConfig={pageConfig} seller>
            <ContentWrapper
                {...contentProps}
            />
        </Layout>
    );
};

export default Core;
