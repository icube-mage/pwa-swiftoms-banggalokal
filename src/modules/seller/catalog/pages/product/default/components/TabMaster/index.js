/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import useStyles from '@sellermodules/catalog/pages/product/default/components/TabMaster/style';
import FormMasterProductInformation from '@sellermodules/catalog/pages/product/default/components/TabMaster/formInformation';
import BoxCardSimple from '@common_boxcardsimple/index';
import FormMasterProductVariant from '@sellermodules/catalog/pages/product/default/components/TabMaster/formVariant';
import FormMasterProductStock from '@sellermodules/catalog/pages/product/default/components/TabMaster/formStock';
import FormMasterProductShipping from '@sellermodules/catalog/pages/product/default/components/TabMaster/formShipping';
import StickyBottom from '@common_stickybottom/index';
import Button from '@common_button/index';
import BackdropLoad from '@helper_backdropload';
import Show from '@common_show';
import gqlService from '@sellermodules/catalog/services/graphql/index';
import { breakPointsUp } from '@helper_theme';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { BLACK, WHITE } from '@theme_color';
import { conversionKilogramToGram, weightUnit } from '@helper_text';
import { sendDataLayer } from '@helper_gtm';
import * as Yup from 'yup';

const MUTATION_PRODUCT = ({ action }) => {
    switch (action) {
    case 'create': return 'createSellerProduct';
    case 'edit': return 'updateSellerProduct';
    case 'duplicate': return 'createSellerProduct';
    default: return 'createSellerProduct';
    }
};

const createVariantData = (dataAttribute, menuVariant) => {
    const variants = [];
    let variant_table = null;
    const image_exist = [];

    if (dataAttribute !== undefined) {
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

        variant_table = dataAttribute?.map((data) => {
            let objReturn = {
                id: data?.entity_id,
                price: new Intl.NumberFormat('en-US').format(data?.price),
                sku: data?.vendor_sku,
                skuDefault: data?.sku,
                weight: conversionKilogramToGram(data?.weight) || '',
                status: data?.status === 1,
                image: data.images?.[0]?.url || '',
            };
            image_exist.push({ id_product: data?.entity_id, ...data.images?.[0] });
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
    }

    return { variants, variant_table, image_exist };
};

const TabMaster = (props) => {
    const classes = useStyles();
    const skuRef = React.useRef(null);
    const router = useRouter();
    const desktop = breakPointsUp('sm');
    const {
        t,
        productId,
        pageAction,
        ctxCatalogProduct,
        isEdit,
        isCreate,
        isDuplicate,
        isParentLoadingState,
    } = props;

    const [createOrUpdateProduct] = gqlService[MUTATION_PRODUCT({ action: pageAction })]();
    const setIsDirty = ctxCatalogProduct?.setIsDirty ?? null;

    let isLoading = false;
    let image_exist = null;
    let initialValues = {
        // form-information
        name: '',
        sku: '',
        price: '',
        images: [],
        // form-variants
        is_variant: false,
        variants: [{}],
        variant_table: [],
        // form-shipping
        weight: '',
        weight_unit: weightUnit(),
    };

    if (!isCreate) {
        const { data, loading } = gqlService.getSellerProduct({ id: Number(productId) });
        const { data: dataAtt, loading: loadingAtt } = gqlService.getSellerProductVariantItems({ id: Number(productId) });
        const { data: dataVariant, loading: loadingVariant } = gqlService.getSellerVariantAttributes();
        const {
            variants: initVariants,
            variant_table: initVariantTable,
            image_exist: imageExistVariant,
        } = createVariantData(dataAtt?.getSellerProductVariantItems, dataVariant?.getSellerVariantAttributes);
        isLoading = isParentLoadingState || loading || loadingAtt || loadingVariant;
        image_exist = imageExistVariant;

        React.useEffect(() => {
            BackdropLoad(isLoading);
        }, [isLoading]);

        initialValues = {
            // form-information
            name: data?.getSellerProduct?.name ?? '',
            sku: isDuplicate ? '' : data?.getSellerProduct?.vendor_sku,
            sku_product: isDuplicate ? '' : data?.getSellerProduct?.sku,
            price: new Intl.NumberFormat('en-US').format(data?.getSellerProduct?.price),
            images: data?.getSellerProduct?.images || [],
            description: data?.getSellerProduct?.description || '',
            // form-variants
            is_variant: isDuplicate ? false : !!initVariants?.length,
            variants: !isDuplicate && initVariants?.length ? initVariants : [{}],
            variant_table: isDuplicate ? [] : initVariantTable,
            existing_variants: isDuplicate ? [] : initVariantTable,
            weight: conversionKilogramToGram(data?.getSellerProduct?.weight) || '',
            weight_unit: weightUnit(),
            dimension_package_height: data?.getSellerProduct?.dimension_package_height || '',
            dimension_package_length: data?.getSellerProduct?.dimension_package_length || '',
            dimension_package_width: data?.getSellerProduct?.dimension_package_width || '',
            vendor_sku: data?.getSellerProduct?.vendor_sku || '',
            types: data?.getSellerProduct?.images?.[0]?.types || [],
        };
    }

    const formik = useFormik({
        enableReinitialize: !isLoading && (isEdit || isDuplicate),
        initialValues,
        validationSchema: Yup.object().shape({
            // form-information
            name: Yup.string().required(t('sellercatalog:This_is_a_Required_field')),
            sku: isCreate ? Yup.string().required(t('sellercatalog:This_is_a_Required_field'))
                .test('len', t('integrationautomation:This_field_must_be_at_most_max_characters', { max: 50 }), (val) => String(val).length <= 50)
                : Yup.string().required(t('sellercatalog:This_is_a_Required_field')),
            price: Yup.number().nullable().transform((_, value) => {
                const replace = value?.replace(/[^0-9]/g, '');
                return Number(replace);
            }).when('is_variant', {
                is: false,
                then: Yup.number()
                    .positive(t('sellercatalog:Value_must_be_greater_than_0'))
                    .min(1000, `${t('Value_must_be_greater_than')} 1000`)
                    .required(t('sellercatalog:This_is_a_Required_field')),
            }),
            images: Yup.array().of(Yup.object())
                .min(1, t('selercatalog:Choose_at_least_min_key', { min: 1, key: t('sellercatalog:photo') })),
            description: Yup.string()
                .min(30, t('sellercatalog:This_field_must_be_at_least_min_characters', { min: 30 }))
                .typeError(t('sellercatalog:This_is_a_Required_field')).required(t('sellercatalog:This_is_a_Required_field')),
            // form-variants
            is_variant: Yup.boolean(),
            variant_table: Yup.array().of(Yup.object()).when('is_variant', {
                is: true,
                then: Yup.array().of(Yup.object().shape({
                    price: Yup.number()
                        .transform((_, value) => {
                            const replace = value?.replace(/[^0-9]/g, '');
                            return Number(replace);
                        })
                        .positive(t('sellercatalog:Value_must_be_greater_than_0'))
                        .min(1000, `${t('Value_must_be_greater_than')} 1000`)
                        .typeError(t('sellercatalog:Value_must_be_a_number'))
                        .required(t('sellercatalog:This_is_a_Required_field')),
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
            // form-shipping
            weight: Yup.number().nullable().when('is_variant', {
                is: false,
                then: Yup.number().positive(t('sellercatalog:Value_must_be_greater_than_0'))
                    .typeError(t('sellercatalog:Value_must_be_a_number')).required(t('sellercatalog:This_is_a_Required_field')),
            }),
            dimension_package_height: Yup.number().positive(t('sellercatalog:Value_must_be_greater_than_0'))
                .typeError(t('sellercatalog:Value_must_be_a_number')).nullable(),
            dimension_package_length: Yup.number().positive(t('sellercatalog:Value_must_be_greater_than_0'))
                .typeError(t('sellercatalog:Value_must_be_a_number')).nullable(),
            dimension_package_width: Yup.number().positive(t('sellercatalog:Value_must_be_greater_than_0'))
                .typeError(t('sellercatalog:Value_must_be_a_number')).nullable(),
        }),
        onSubmit: (values) => {
            if (isCreate) {
                onHandleProductCreate(values);
            } else {
                onHandleProductUpdateOrDuplicate(values);
            }
        },
    });

    const onHandleProductCreate = (values) => {
        const {
            images,
            weight,
            weight_unit,
            price,
            is_variant,
            variants,
            variant_table,
            dimension_package_height,
            dimension_package_length,
            dimension_package_width,
            ...restValues
        } = values;
        let position = 0;
        const valueToSubmit = {
            ...restValues,
            dimension_package_height: dimension_package_height ? Number(dimension_package_height) : null,
            dimension_package_length: dimension_package_length ? Number(dimension_package_length) : null,
            dimension_package_width: dimension_package_width ? Number(dimension_package_width) : null,
            images: images.map(({ name, size, ...rest }) => {
                position += 1;
                return ({ ...rest, position });
            }),
        };
        if (is_variant) {
            valueToSubmit.variant_items = variant_table.map((item) => {
                const variant_items = {
                    price: Number(item.price.replace(/[^\d]/g, '')),
                    sku: item.sku,
                    weight: Number(conversionKilogramToGram(item.weight)),
                    weight_unit,
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
            valueToSubmit.weight_unit = weight_unit;
            valueToSubmit.price = Number(price.replace(/[^\d]/g, ''));
        }

        // submit
        const dataLayer = {
            event: 'add_master_product',
            eventLabel: 'Catalog - Add Master Product',
        };
        sendDataLayer(dataLayer);

        window.backdropLoader(true);
        createOrUpdateProduct({
            variables: { input: valueToSubmit },
        })
            .then((res) => {
                const getProductId = res?.data?.createSellerProduct ?? null;
                const redirectUrl = getProductId === null
                    ? '/seller/catalog'
                    : { pathname: `/seller/catalog/product/edit/${getProductId}`, query: { status: 'channel', channel: 'add' } };
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('storesetting:New_product_has_been_created'),
                    variant: 'success',
                });
                setIsDirty(false);
                setTimeout(() => router.push(redirectUrl), 250);
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

    const onHandleProductUpdateOrDuplicate = (values) => {
        const {
            shipping,
            images,
            weight,
            weight_unit,
            price,
            is_variant,
            variants,
            variant_table,
            existing_variants,
            dimension_package_height,
            dimension_package_length,
            dimension_package_width,
            vendor_sku,
            types,
            ...restValues
        } = values;
        let position = 0;
        const valueToSubmit = {
            ...restValues,
            sku: values?.sku_product ?? values.vendor_sku,
            dimension_package_height: dimension_package_height ? Number(dimension_package_height) : null,
            dimension_package_length: dimension_package_length ? Number(dimension_package_length) : null,
            dimension_package_width: dimension_package_width ? Number(dimension_package_width) : null,
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
        };

        if (isDuplicate) {
            valueToSubmit.duplicate_id = Number(productId);
        }

        if (is_variant) {
            valueToSubmit.variant_items = variant_table.map((item) => {
                const variant_items = {
                    price: Number(item.price.replace(/[^\d]/g, '')),
                    sku: item.is_exist?.skuDefault || item.sku,
                    weight: Number(item.weight),
                    weight_unit: weightUnit(),
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
                        const imgEx = image_exist?.find((im) => im?.id_product === item.id);
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
                        id: image_exist.find((im) => im?.id_product === existing.id)?.id,
                        is_deleted: true,
                        position: image_exist.find((im) => im?.id_product === existing.id)?.position || 1,
                    });
                }
                variant_items.images = imagesValue;
                return variant_items;
            });
            valueToSubmit.price = 0;
        } else {
            valueToSubmit.weight = Number(weight);
            valueToSubmit.weight_unit = weight_unit;
            valueToSubmit.price = Number(price.replace(/[^\d]/g, ''));
        }

        delete valueToSubmit?.sku_product;

        const variables = { input: valueToSubmit };
        if (!isDuplicate) {
            variables.id = Number(productId);
        }

        let dataLayer = {};
        if (isDuplicate) {
            dataLayer = {
                event: 'duplicate_master_product',
                eventLabel: 'Catalog - Duplicate Master Product',
            };
        } else {
            dataLayer = {
                event: 'edit_master_product',
                eventLabel: 'Catalog - Edit Master Product',
            };
        }
        sendDataLayer(dataLayer);

        window.backdropLoader(true);
        createOrUpdateProduct({ variables })
            .then(() => {
                const redirectUrl = productId === null ? '/seller/catalog'
                    : { pathname: `/seller/catalog/product/edit/${productId}`, query: { status: 'channel' } };
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: isDuplicate ? t('storesetting:New_product_has_been_created') : t('storesetting:Product_has_been_updated'),
                    variant: 'success',
                });
                setIsDirty(false);
                setTimeout(() => router.push(redirectUrl), 250);
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

    const handleClickSkuWarning = () => {
        skuRef.current.focus();
    };

    const [tmpImg] = React.useState([...formik.values.images] || []);

    const handleDropFile = (files, name, i) => {
        const posImg = i !== null && String(i);
        const selectedLength = files?.length || 0;
        const uploadedLength = (tmpImg?.length || 0) - (posImg ? 1 : 0);
        const isAllowUpload = !((selectedLength + uploadedLength) > 5);

        if (!isAllowUpload) {
            window.toastMessage({
                open: true,
                text: t('max_five_image'),
                variant: 'error',
            });
            return false;
        }

        if (posImg && selectedLength > 1) {
            window.toastMessage({
                open: true,
                text: t('only_select_one_image'),
                variant: 'error',
            });
            return false;
        }

        (files || []).forEach((selectedFiled) => {
            const { baseCode, file } = selectedFiled;

            if (i !== null && i >= 0) {
                tmpImg[i] = {
                    binary: baseCode,
                    types: [],
                    is_deleted: false,
                    name: file.name,
                    size: `${file.size / 1000} KB`,
                };
            } else {
                tmpImg.push({
                    binary: baseCode,
                    types: [],
                    is_deleted: false,
                    name: file.name,
                    size: `${file.size / 1000} KB`,
                });
            }
            formik.setFieldValue(name, tmpImg);
        });

        return true;
    };

    const handleDropFileEdit = (files, name, i) => {
        const posImg = i !== null && String(i);
        const selectedLength = files?.length || 0;
        const uploadedLength = (tmpImg?.length || 0) - (posImg ? 1 : 0);
        const isAllowUpload = !((selectedLength + uploadedLength) > 5);

        if (!isAllowUpload) {
            window.toastMessage({
                open: true,
                text: t('max_five_image'),
                variant: 'error',
            });
            return false;
        }

        if (posImg && selectedLength > 1) {
            window.toastMessage({
                open: true,
                text: t('only_select_one_image'),
                variant: 'error',
            });
            return false;
        }

        (files || []).forEach((selectedFiled) => {
            const { baseCode, file } = selectedFiled;

            if (i !== null && i >= 0) {
                // eslint-disable-next-line no-prototype-builtins
                if (formik?.values[name][i]?.hasOwnProperty('file')) {
                    tmpImg[i] = {
                        ...formik.values[name][i],
                        is_deleted: true,
                    };
                    tmpImg.splice(i, 0, {
                        binary: baseCode,
                        types: [],
                        is_deleted: false,
                        name: file.name,
                        size: `${file.size / 1000} KB`,
                    });
                } else {
                    tmpImg[i] = {
                        binary: baseCode,
                        types: [],
                        is_deleted: false,
                        name: file.name,
                        size: `${file.size / 1000} KB`,
                    };
                }
            } else {
                tmpImg.push({
                    binary: baseCode,
                    types: [],
                    is_deleted: false,
                    name: file.name,
                    size: `${file.size / 1000} KB`,
                });
            }
            formik.setFieldValue(name, tmpImg);
        });

        return true;
    };

    const padding = desktop ? 30 : 15;
    const propsChild = {
        t,
        formik,
        skuRef,
        classes,
        setIsDirty,
    };

    useEffect(() => {
        if (!formik.isSubmitting) return;
        const keys = Object.keys(formik.errors);
        if (keys?.length > 0) {
            const keyName = keys[0];
            const node = document.getElementsByName(keyName);
            if (node?.length) {
                node[0].scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
                node[0].focus();
            }
        }
    }, [formik.isSubmitting]);

    return (
        <>
            <div id="product-tab-master-container" className={classes.productTabMasterContainer}>
                <Show when={isLoading}>
                    <BoxCardSimple
                        bg={WHITE}
                        border={1}
                        borderRadius={5}
                        marginTop={10}
                        padding={padding}
                        content={(<div>{`${t('common:loading')}...`}</div>)}
                    />
                </Show>
                <Show when={!isLoading}>
                    <BoxCardSimple
                        bg={WHITE}
                        border={1}
                        borderRadius={5}
                        marginTop={10}
                        padding={padding}
                        title={t('sellercatalog:Product_Information')}
                        content={(
                            <FormMasterProductInformation
                                {...props}
                                {...propsChild}
                                handleDropFile={isDuplicate || isEdit ? handleDropFileEdit : handleDropFile}
                            />
                        )}
                    />
                    <BoxCardSimple
                        bg={WHITE}
                        border={1}
                        borderRadius={5}
                        marginTop={10}
                        padding={padding}
                        title={t('common:Product_Variants')}
                        content={(
                            <FormMasterProductVariant
                                {...props}
                                {...propsChild}
                                handleClickSkuWarning={handleClickSkuWarning}
                            />
                        )}
                    />
                    <Show when={isEdit}>
                        <BoxCardSimple
                            bg={WHITE}
                            border={1}
                            borderRadius={5}
                            marginTop={10}
                            padding={padding}
                            title={t('common:stock')}
                            content={(
                                <FormMasterProductStock
                                    {...props}
                                    {...propsChild}
                                />
                            )}
                        />
                    </Show>
                    <BoxCardSimple
                        bg={WHITE}
                        border={1}
                        borderRadius={5}
                        marginTop={10}
                        padding={padding}
                        title={t('common:shipping')}
                        content={(
                            <FormMasterProductShipping
                                {...props}
                                {...propsChild}
                            />
                        )}
                    />
                </Show>
            </div>
            <StickyBottom
                show
                contentRight={(
                    <div className={classes.stickyBottomContainerRight}>
                        <Button
                            nextLink="/seller/catalog"
                            classicButtonLabel={t('common:btn_cancel')}
                            className="btn-cancel"
                            bg={WHITE}
                            color={BLACK}
                            border={1}
                            classic
                            paddingTop={4}
                            paddingBottom={4}
                            paddingLeft={padding}
                            paddingRight={padding}
                            classicButtonOnClick={() => { }}
                        />
                        <Button
                            classicButtonLabel={t('common:btn_next')}
                            className="btn-next"
                            classic
                            paddingLeft={padding}
                            paddingRight={padding}
                            classicButtonOnClick={formik.handleSubmit}
                        />
                    </div>
                )}
            />
        </>
    );
};

export default TabMaster;
