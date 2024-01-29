/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
import React from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import BackdropLoad from '@helper_backdropload';
import themeService from '@modules/theme/services/graphql';
import gqlService from '@sellermodules/catalog/services/graphql';
import Layout from '@layout';
import ErrorRedirect from '@common_errorredirect';

function createVariantData(dataAttribute, menuVariant) {
    const variants = [];

    dataAttribute?.forEach((data) => {
        const { attributes } = data;
        attributes?.forEach((att) => {
            const variant = menuVariant.find((menu) => menu.attribute_id === att.attribute_id);
            const choosen = variant?.attribute_options?.find((o) => o.value === att.attribute_value);
            if (choosen) {
                if (!variants.find((vr) => vr.attribute_id === variant.attribute_id)) {
                    variants.push({ ...variant, attribute_choosen: [{ ...choosen, image: data.images?.[0]?.url || '' }] });
                } else {
                    const idxExist = variants.findIndex((vr) => vr.attribute_id === variant.attribute_id);
                    if (idxExist >= 0) {
                        const existChoosen = variants[idxExist].attribute_choosen.find((opt) => opt.value === choosen.value);
                        if (!existChoosen) {
                            variants[idxExist] = {
                                ...variants[idxExist],
                                attribute_choosen: [
                                    ...variants[idxExist].attribute_choosen,
                                    { ...choosen, image: data.images?.[0]?.url || '' },
                                ],
                            };
                        }
                    }
                }
            }
        });
    });

    const image_exist = [];
    const variant_table = dataAttribute?.map((data) => {
        let objReturn = {
            id: data?.entity_id,
            price: data?.price,
            sku: data?.vendor_sku,
            skuDefault: data?.sku,
            weight: data?.weight,
            status: data?.status === 1,
            image: data.images?.[0]?.url || '',
        };
        image_exist.push(data.images?.[0]);
        const combinedType = data.attributes?.map((att) => {
            const option = menuVariant?.find((menu) => menu.attribute_id === att.attribute_id)?.attribute_options;
            const selected = option?.find((o) => o.value === att.attribute_value);
            return selected?.label;
        });

        objReturn.combined_key = [...combinedType].sort().join('-');

        const mappedType = [];
        data.attributes?.forEach((att) => {
            const option = menuVariant?.find((menu) => menu.attribute_id === att.attribute_id)?.attribute_options;
            const selected = option?.find((o) => o.value === att.attribute_value)?.label;
            mappedType.push([att.attribute_code || att.attribute_label?.toLowerCase().replaceAll(' ', '_'), selected]);
        });
        objReturn = {
            ...objReturn,
            ...Object.fromEntries(mappedType),
        };

        return objReturn;
    });
    return { variants, variant_table, image_exist };
}

const ContentWrapper = (props) => {
    const {
        Content, t, shippingOptions, page, data, id, menuVariant, dataAtt, shipConfig, dataEtalase,
    } = props;
    const router = useRouter();

    const isDuplicate = page === 'duplicate';
    const mappedShippingOptions = shippingOptions.map((ship) => ({ ...ship, label: `${ship.provider} - ${ship.service}` }));
    const [saveProduct] = gqlService[isDuplicate ? 'createSellerProduct' : 'updateSellerProduct']();

    const handleSubmit = (input) => {
        const variables = { input };
        if (!isDuplicate) {
            variables.id = Number(id);
        }
        window.backdropLoader(true);
        saveProduct({ variables })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: isDuplicate ? t('storesetting:New_product_has_been_created') : t('storesetting:Product_has_been_updated'),
                    variant: 'success',
                });
                setTimeout(() => router.push('/seller/catalog'), 250);
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

    const { variants: initVariants, variant_table: initVariantTable, image_exist } = createVariantData(dataAtt, menuVariant);

    const formik = useFormik({
        initialValues: {
            name: data.name,
            sku: isDuplicate ? '' : data.sku,
            price: data.price,
            minimum_order_quantity: data.minimum_order_quantity || 1,
            category_id: data.category_id || null,
            weight: data.weight || '',
            images: data.images || [],
            description: data.description || '',
            short_description: data.short_description || '',
            dimension_package_height: data.dimension_package_height || '',
            dimension_package_length: data.dimension_package_length || '',
            dimension_package_width: data.dimension_package_width || '',
            shipping: data.shipping_method?.map(({ entity_id }) => (mappedShippingOptions.find((opt) => opt.entity_id === entity_id))) || [],
            is_variant: isDuplicate ? false : !!initVariants.length,
            variants: !isDuplicate && initVariants.length ? initVariants : [{}],
            variant_table: isDuplicate ? [] : initVariantTable,
            existing_variants: isDuplicate ? [] : initVariantTable,
            vendor_sku: data.vendor_sku || '',
            etalase_ids: data.etalase_ids?.map((entity_id) => (dataEtalase.find((opt) => opt?.entity_id === entity_id))) || [],
            types: data.images?.[0]?.types || [],
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
                .min(1, t('selercatalog:Choose_at_least_min_key', { min: 1, key: t('sellercatalog:photo') }))
                .test(
                    'minimal_1',
                    t('selercatalog:Choose_at_least_min_key', { min: 1, key: t('sellercatalog:photo') }),
                    (v) => !v.every((val) => val.is_deleted),
                ),
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
                shipping, images, weight, price, is_variant, variants, variant_table, existing_variants, minimum_order_quantity,
                dimension_package_height, dimension_package_length, dimension_package_width, vendor_sku, etalase_ids, types,
                ...restValues
            } = values;
            let position = 0;
            const valueToSubmit = {
                ...restValues,
                dimension_package_height: dimension_package_height ? Number(dimension_package_height) : null,
                dimension_package_length: dimension_package_length ? Number(dimension_package_length) : null,
                dimension_package_width: dimension_package_width ? Number(dimension_package_width) : null,
                minimum_order_quantity: Number(minimum_order_quantity),
                shipping: shipping.map((ship) => ship.entity_id),
                images: images.map(({
                    name, size, file, url, __typename, types: imageTypes, ...rest
                }) => {
                    if (!rest.is_deleted) {
                        position += 1;
                    }
                    return ({
                        ...rest,
                        position,
                        types: position === 1 ? types : [],
                    });
                }),
                etalase_ids: etalase_ids ? etalase_ids.map((e) => e.entity_id) : null,
            };
            if (shipConfig) {
                valueToSubmit.shipping = shipping.map((ship) => ship.entity_id);
            }
            if (isDuplicate) {
                valueToSubmit.duplicate_id = Number(id);
            }
            if (is_variant) {
                valueToSubmit.variant_items = variant_table.map((item) => {
                    const variant_items = {
                        price: Number(item.price),
                        sku: item.is_exist?.skuDefault || item.sku,
                        weight: Number(item.weight),
                        status: item.status ? 1 : 2,
                        variant_attributes: variants.map((variant) => ({
                            frontend_label: variant.frontend_label,
                            attribute_value: item[variant.attribute_code],
                            attribute_code: variant.is_new ? null : variant.attribute_code,
                        }
                        )),
                    };
                    let existing = {};
                    if (!isDuplicate) {
                        existing = formik.values.existing_variants?.find((v) => v?.combined_key === item.combined_key);
                        if (item.id) {
                            variant_items.id = Number(item.id);
                        }
                    }
                    const imagesValue = [];
                    if (item.image) {
                        const imgPush = {
                            is_deleted: false,
                        };
                        if (item.image?.includes('https')) {
                            const imgEx = image_exist?.find((im) => im.url === item.image);
                            imgPush.id = imgEx?.id;
                            imgPush.position = imgEx?.position;
                        } else {
                            imgPush.binary = item.image;
                            imgPush.position = 1;
                        }
                        imagesValue.push(imgPush);
                    }
                    if (!isDuplicate && existing && item.image && existing.image && !item.image.includes('https')) {
                        imagesValue.push({
                            id: image_exist.find((im) => im.url === existing.image)?.id,
                            is_deleted: true,
                            position: image_exist.find((im) => im.url === existing.image)?.position || 1,
                        });
                    }
                    variant_items.images = imagesValue;
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
        const input = [...formik.values[name]] || [];
        if (i !== null && i >= 0) {
            // eslint-disable-next-line no-prototype-builtins
            if (formik.values[name][i]?.hasOwnProperty('file')) {
                input[i] = {
                    ...formik.values[name][i],
                    is_deleted: true,
                };
                input.splice(i, 0, {
                    binary: baseCode,
                    types: [],
                    is_deleted: false,
                    name: file.name,
                    size: `${file.size / 1000} KB`,
                });
            } else {
                input[i] = {
                    binary: baseCode,
                    types: [],
                    is_deleted: false,
                    name: file.name,
                    size: `${file.size / 1000} KB`,
                };
            }
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
        isDuplicate,
    };

    return (
        <Content {...contentProps} />
    );
};
const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const { id, page } = router.query;

    const pageConfig = {
        title: `${page === 'duplicate' ? t('sellercatalog:Duplicate_Product') : t('sellercatalog:Detail_Product')} #${id}`,
    };

    const { data, loading, error } = gqlService.getSellerProduct({
        id: Number(id),
    });
    const { data: dataAtt, loading: loadingAtt, error: errorAtt } = gqlService.getSellerProductVariantItems({
        id: Number(id),
    });

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
        BackdropLoad(loadCat || loadShip || loading || configLoading || loadVariant || loadingAtt || shipConfigLoading || loadCurrency || loadEtalase);
    }, [loadCat, loadShip, loading, configLoading, loadVariant, loadingAtt, shipConfigLoading, loadCurrency, loadEtalase]);

    if (loadCat || loadShip || loading || configLoading || loadVariant || loadingAtt || shipConfigLoading || loadCurrency || loadEtalase) {
        return <Layout pageConfig={pageConfig} seller />;
    }

    if (!data || !dataAtt || (page !== 'edit' && page !== 'duplicate')) {
        const errMsg = (error?.message || errorAtt?.message) ?? t('sellercatalog:Data_not_found');
        const redirect = '/seller/catalog';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} isSeller />;
    }

    const contentProps = {
        ...props,
        categories: dataCat?.getCategoryList || [],
        shippingOptions: dataShip?.getStoreShippingMethod || [],
        data: data.getSellerProduct,
        page,
        id,
        enableCreateVariant: configData.getStoreConfig === '1',
        menuVariant: dataVariant.getSellerVariantAttributes,
        dataAtt: dataAtt.getSellerProductVariantItems,
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
