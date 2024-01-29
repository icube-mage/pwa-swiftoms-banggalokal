/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable max-len */
/* eslint-disable array-callback-return */

import React, { useEffect } from 'react';
import BoxCardSimple from '@common_boxcardsimple/index';
import BoxCardSimpleTab from '@common_boxcardsimpletab/index';
import Button from '@common_button/index';
import BackdropLoad from '@helper_backdropload';
import StickyBottom from '@common_stickybottom/index';
import Show from '@common_show/index';
import FormChannelProductInformation from '@root/src/modules/seller/catalog/pages/product/default/components/TabChannel/FormChannel/formInformation';
import FormChannelDynamicAttribute from '@root/src/modules/seller/catalog/pages/product/default/components/TabChannel/FormChannel/formDynamicAttributes';
import FormChannelProductShipping from '@sellermodules/catalog/pages/product/default/components/TabChannel/FormChannel/formShipping';
import FormChannelProductStock from '@sellermodules/catalog/pages/product/default/components/TabChannel/FormChannel/formStock';
import FormChannelProductVariant from '@sellermodules/catalog/pages/product/default/components/TabChannel/FormChannel/formVariant';
import gqlService from '@sellermodules/catalog/services/graphql/index';
import clsx from 'clsx';
import { BLACK, WHITE, TEXT_GRAY } from '@theme_color';
import { useFormik } from 'formik';
import { conversionKilogramToGram, onMakeId, weightUnit } from '@helper_text';
import { breakPointsUp } from '@helper_theme';
import AppModal from '@common_appmodal/index';
import * as Yup from 'yup';

let delayTimer;

const createVariantData = (dataAttribute, menuVariant, dataProductChannel) => {
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
                                    attribute_choosen: [...variants[idxExist].attribute_choosen, { ...choosen, image: data.images?.[0]?.url || '' }],
                                };
                            }
                        }
                    }
                }
            });
        });

        variant_table = dataAttribute?.map((data) => {
            const getDataProductChannel = dataProductChannel?.find((itemChannel) => itemChannel?.entity_id === data?.entity_id);

            let objReturn = {
                id: data?.entity_id,
                price: new Intl.NumberFormat('en-US').format(getDataProductChannel?.price ?? data?.price),
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
    }

    return { variants, variant_table, image_exist };
};

const FormChannel = (props) => {
    const {
        t,
        isEmptyListChannelProduct,
        router,
        tabChannel,
        getChannelCode,
        classes,
        productId,
        listDataChannelProduct,
        isDirty,
        setIsDirty,
        onPreventHandleClick,
        isParentLoadingState,
        onCloseTabCallback,
        urlRedirect,
        getSellerChannelRequest,
        isFormAssignProduct = false,
        formAssignProductSelectedChannel,
        formAssignProductDataMaster,
        formAssignSetShowFormChannel,
    } = props;

    const desktop = breakPointsUp('sm');
    let dataProduct;
    let loadingChannelProduct = false;
    const channel_code = tabChannel ?? getChannelCode;
    if (!isEmptyListChannelProduct) {
        const { data, loading } = gqlService.getSellerChannelProductData({
            id: Number(productId),
            channel_code,
        });
        dataProduct = data;
        loadingChannelProduct = loading;
    }

    const tampChannelCode = isFormAssignProduct
        ? formAssignProductSelectedChannel?.marketplace_code
        : dataProduct?.getSellerChannelProduct?.channel?.marketplace?.marketplace_code ?? '';
    const { data: dataLimit } = gqlService.getMarketplaceProductLimitation({
        filter: {
            marketplace_code: { eq: tampChannelCode },
        },
        pageSize: 3,
        currentPage: 1,
    });
    const [max_char, set_max_char] = React.useState(150);
    const [text_help, set_text_help] = React.useState('');
    const [min_price, set_min_price] = React.useState(100);
    const [max_price, set_max_price] = React.useState(150000000);
    const [input_desc, set_input_desc] = React.useState('');
    const [modalSubmitConfirm, setModalSubmitConfirm] = React.useState(false);

    const initValidationSchema = {
        // form-information
        name: Yup.string().required(t('sellercatalog:This_is_a_Required_field'))
            .test('len', t('integrationautomation:This_field_must_be_at_most_max_characters', { max: max_char }), (val) => String(val).length <= max_char),
        category: Yup.string().required(t('sellercatalog:This_is_a_Required_field')).typeError(t('sellercatalog:This_is_a_Required_field')),
        sku: Yup.string().required(t('sellercatalog:This_is_a_Required_field')),
        price: Yup.number()
            .nullable()
            .transform((_, value) => {
                const replace = value?.replace(/[^0-9]/g, '');
                return Number(replace);
            })
            .when('is_variant', {
                is: false,
                then: Yup.number()
                    .positive(t('sellercatalog:Value_must_be_greater_than_0'))
                    .min(min_price, `${t('Value_must_be_greater_than')} ${min_price}`)
                    .max(max_price, `${t('Value_must_be_less_than')} ${max_price}`)
                    .required(t('sellercatalog:This_is_a_Required_field')),
            }),
        images: Yup.array()
            .of(Yup.object())
            .min(1, t('selercatalog:Choose_at_least_min_key', { min: 1, key: t('sellercatalog:photo') })),
        description: Yup.string()
            .min(30, t('sellercatalog:This_field_must_be_at_least_min_characters', { min: 30 }))
            .typeError(t('sellercatalog:This_is_a_Required_field'))
            .required(t('sellercatalog:This_is_a_Required_field')),
        // form-variants
        is_variant: Yup.boolean(),
        variant_table: Yup.array()
            .of(Yup.object())
            .when('is_variant', {
                is: true,
                then: Yup.array().of(
                    Yup.object().shape({
                        price: Yup.number()
                            .transform((_, value) => {
                                const replace = value?.replace(/[^0-9]/g, '');
                                return Number(replace);
                            })
                            .positive(t('sellercatalog:Value_must_be_greater_than_0'))
                            .min(min_price, `${t('Value_must_be_greater_than')} ${min_price}`)
                            .max(max_price, `${t('Value_must_be_less_than')} ${max_price}`)
                            .required(t('sellercatalog:This_is_a_Required_field')),
                        sku: Yup.string().required(t('sellercatalog:This_is_a_Required_field')),
                        weight: Yup.number()
                            .positive(t('sellercatalog:Value_must_be_greater_than_0'))
                            .typeError(t('sellercatalog:Value_must_be_a_number'))
                            .required(t('sellercatalog:This_is_a_Required_field')),
                    }),
                ),
            }),
        variants: Yup.array()
            .of(Yup.object())
            .when('is_variant', {
                is: true,
                then: Yup.array().of(
                    Yup.object().shape({
                        type: Yup.array()
                            .of(Yup.object())
                            .min(1, t('selercatalog:Choose_at_least_min_key', { min: 1, key: t('sellercatalog:attribute') })),
                        frontend_label: Yup.string().required(t('sellercatalog:This_is_a_Required_field')),
                    }),
                ),
            }),
        // form-shipping
        weight: Yup.string().required(t('sellercatalog:This_is_a_Required_field')),
        dimension_package_height: Yup.number()
            .positive(t('sellercatalog:Value_must_be_greater_than_0'))
            .typeError(t('sellercatalog:Value_must_be_a_number'))
            .nullable(),
        dimension_package_length: Yup.number()
            .positive(t('sellercatalog:Value_must_be_greater_than_0'))
            .typeError(t('sellercatalog:Value_must_be_a_number'))
            .nullable(),
        dimension_package_width: Yup.number()
            .positive(t('sellercatalog:Value_must_be_greater_than_0'))
            .typeError(t('sellercatalog:Value_must_be_a_number'))
            .nullable(),
    };

    const [initValidation, setinitValidation] = React.useState(initValidationSchema);

    const resetLimitation = () => {
        setinitValidation(initValidationSchema);
        set_max_char(150);
        set_min_price(100);
        set_max_price(150000000);
        set_input_desc('');
    };

    React.useEffect(() => {
        if (dataLimit?.getMarketplaceProductLimitation?.items.length > 0) {
            const tampLimitation = dataLimit?.getMarketplaceProductLimitation?.items;
            resetLimitation();
            tampLimitation.forEach((item) => {
                // Helper text only for Tokopedia
                if (item.attribute === 'name' && item.marketplace_code === 'tkpd') {
                    const limitationObj = JSON.parse(item.limitation);
                    set_text_help(t(`sellercatalog:${(limitationObj.helper_text)?.replace(/ /g, '_')}`));
                }
                if (item.attribute === 'name') {
                    const limitationObj = JSON.parse(item.limitation);
                    set_max_char(limitationObj.max_char);
                    setinitValidation((prev) => ({
                        ...prev,
                        name: Yup.string().required(t('sellercatalog:This_is_a_Required_field'))
                            .test('len', t('integrationautomation:This_field_must_be_at_most_max_characters', { max: limitationObj.max_char }), (val) => String(val).length <= limitationObj.max_char),
                    }));
                }
                if (item.attribute === 'price') {
                    const limitationObj = JSON.parse(item.limitation);
                    set_min_price(limitationObj.min_value);
                    set_max_price(limitationObj.max_value);
                    setinitValidation((prev) => ({
                        ...prev,
                        price: Yup.number()
                            .nullable()
                            .transform((_, value) => {
                                const replace = value?.replace(/[^0-9]/g, '');
                                return Number(replace);
                            })
                            .when('is_variant', {
                                is: false,
                                then: Yup.number()
                                    .positive(t('sellercatalog:Value_must_be_greater_than_0'))
                                    .min(limitationObj.min_value, `${t('Value_must_be_greater_than')} ${limitationObj.min_value}`)
                                    .max(limitationObj.max_value, `${t('Value_must_be_less_than')} ${limitationObj.max_value}`)
                                    .required(t('sellercatalog:This_is_a_Required_field')),
                            }),
                        variant_table: Yup.array()
                            .of(Yup.object())
                            .when('is_variant', {
                                is: true,
                                then: Yup.array().of(
                                    Yup.object().shape({
                                        price: Yup.number()
                                            .transform((_, value) => {
                                                const replace = value?.replace(/[^0-9]/g, '');
                                                return Number(replace);
                                            })
                                            .positive(t('sellercatalog:Value_must_be_greater_than_0'))
                                            .min(limitationObj.min_value, `${t('Value_must_be_greater_than')} ${limitationObj.min_value}`)
                                            .max(limitationObj.max_value, `${t('Value_must_be_less_than')} ${limitationObj.max_value}`)
                                            .required(t('sellercatalog:This_is_a_Required_field')),
                                        sku: Yup.string().required(t('sellercatalog:This_is_a_Required_field')),
                                        weight: Yup.number()
                                            .positive(t('sellercatalog:Value_must_be_greater_than_0'))
                                            .typeError(t('sellercatalog:Value_must_be_a_number'))
                                            .required(t('sellercatalog:This_is_a_Required_field')),
                                    }),
                                ),
                            }),
                    }));
                }
                if (item.attribute === 'description') {
                    const limitationObj = JSON.parse(item.limitation);
                    set_input_desc(limitationObj.input);
                }
            });
        }
    }, [dataLimit]);

    const [getChannelProductCategory, { data: dataChannelProductCategory, loading: loadingCategoryList }] = gqlService.getProductCategoryList();
    const [getChannelProductCategoryAttribute, { data: dataChannelProductCategoryAttribute }] = gqlService.getProductCategoryListAttribute();
    const [onSaveSellerChannelProduct] = gqlService.saveSellerChannelProduct();
    const [validationSchema, setValidationSchema] = React.useState(initValidationSchema);
    const { data: dataMaster, loading: loadingMaster } = gqlService.getSellerProduct({ id: Number(productId) });
    const { data: dataAtt, loading: loadingAtt } = gqlService.getSellerProductVariantItems({ id: Number(productId) });
    const { data: dataVariant, loading: loadingVariant } = gqlService.getSellerVariantAttributes();
    const { variants: initVariants, variant_table: initVariantTable, image_exist: imageExistVariant } = createVariantData(
        dataAtt?.getSellerProductVariantItems,
        dataVariant?.getSellerVariantAttributes,
        dataProduct?.getSellerChannelProduct?.variant_items,
    );
    const [categoryTreeData, setCategoryTreeData] = React.useState([]);
    const skuRef = React.useRef(null);
    const image_exist = imageExistVariant;
    const getCategoryList = dataChannelProductCategory?.getProductCategoryList?.items ?? [];
    const getDataChannelProduct = dataProduct?.getSellerChannelProduct;
    const getDataChannelProductAttribute = getDataChannelProduct?.category_attributes ?? [];
    const marketplace_code = isFormAssignProduct
        ? formAssignProductSelectedChannel?.marketplace_code
        : dataProduct?.getSellerChannelProduct?.channel?.marketplace?.marketplace_code ?? '';
    const listAttribute = dataChannelProductCategoryAttribute?.getMarketplaceProductAttributeList?.items ?? [];
    const isCanCreateProduct = getDataChannelProduct?.channel?.channel_capability?.can_create_product ?? true;
    const isLoading = isParentLoadingState || loadingAtt || loadingVariant || loadingChannelProduct || loadingMaster;

    const formik = useFormik({
        initialValues: isFormAssignProduct
            ? { ...formAssignProductDataMaster, category: '' }
            : {
                // form-information
                name: '',
                category: [],
                sku: isFormAssignProduct ? onMakeId(6) : '',
                price: null,
                images: [],
                description: '',
                // form-variants
                is_variant: false,
                variants: [{}],
                variant_table: [],
                existing_variants: [],
                // form-shipping
                dimension_package_height: null,
                dimension_package_length: null,
                dimension_package_width: null,
                weight: null,
                weight_unit: weightUnit(),
            },
        validationSchema: Yup.object().shape(initValidation),
        onSubmit: async (values) => {
            setModalSubmitConfirm(false);
            window.backdropLoader(true);
            const {
                category,
                images,
                weight,
                is_variant,
                variant_table,
                dimension_package_height,
                dimension_package_length,
                dimension_package_width,
            } = values;

            const valueToSubmit = {
                category_id: category?.marketplace_category_id ?? '',
                channel_code,
                description: values.description,
                is_must_insurance: false,
                name: values?.name,
                price: Number(values?.price.replace(/[^\d]/g, '')),
                weight: Number(weight),
                weight_unit: weightUnit(),
                package_height: dimension_package_height ? Number(dimension_package_height) : null,
                package_length: dimension_package_length ? Number(dimension_package_length) : null,
                package_width: dimension_package_width ? Number(dimension_package_width) : null,
                images: images.map((item) => {
                    if (item?.url) {
                        return {
                            is_deleted: item?.is_deleted ?? false,
                            url: item?.url,
                        };
                    }
                    return {
                        is_deleted: false,
                        binary: item?.binary,
                    };
                }),
            };
            delete valueToSubmit.sku;

            if (is_variant) {
                valueToSubmit.variant_items = variant_table.map((item) => {
                    const variant_items = {
                        price: Number(item.price.replace(/[^\d]/g, '')),
                        sku: item.is_exist?.skuDefault || item.sku,
                    };
                    const existing = formik.values.existing_variants?.find((v) => v?.combined_key === item.combined_key);
                    const imagesValue = [];
                    if (item.image) {
                        const imgPush = {
                            is_deleted: false,
                        };
                        if (!item.image?.includes('https')) {
                            imgPush.binary = item.image;
                        } else {
                            imgPush.url = item.image;
                        }
                        imagesValue.push(imgPush);
                    }
                    if (existing && item.image && existing.image && !item.image.includes('https')) {
                        imagesValue.push({
                            url: image_exist.find((im) => im?.url === existing.image)?.url,
                            is_deleted: true,
                        });
                    }
                    variant_items.images = imagesValue;
                    return variant_items;
                });
                valueToSubmit.price = 0;
            }

            const filterCustomAttrObj = Object.fromEntries(Object.entries(values).filter(([key]) => key.includes('custom_')));
            const filterUnitAttrObj = Object.fromEntries(Object.entries(values).filter(([key]) => key.includes('unit_')));
            const isHasCustomAttr = Object.keys(filterCustomAttrObj).length > 0;
            const attributes = [];
            if (isHasCustomAttr) {
                for (const customAttrIndex in filterCustomAttrObj) {
                    const attribute_id = Number(customAttrIndex.replace('custom_', ''));
                    const customAttrItem = filterCustomAttrObj[customAttrIndex];
                    if (customAttrItem.length > 0) {
                        const unitValue = filterUnitAttrObj[`unit_${attribute_id}`];
                        const isString = typeof customAttrItem === 'string';
                        let attribute_value = isString ? customAttrItem : customAttrItem?.name;
                        if (unitValue) {
                            attribute_value = `${attribute_value} # ${unitValue?.name}`;
                        }
                        attributes.push({ attribute_id, attribute_value });
                    }
                }
                valueToSubmit.attributes = attributes;
            }

            if (isFormAssignProduct) {
                valueToSubmit.channel_code = formAssignProductSelectedChannel?.code;
            }
            const variables = { id: Number(productId), input: valueToSubmit };

            onSaveSellerChannelProduct({
                variables,
            })
                .then((res) => {
                    const isSuccess = res?.data?.saveSellerChannelProduct;
                    setIsDirty(false);
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: t('common:success_save_product'),
                        variant: 'success',
                    });
                    if (isSuccess) {
                        // redirect handler
                        const urlRedirectFinal = !isFormAssignProduct
                            ? urlRedirect
                            : {
                                ...urlRedirect,
                                query: {
                                    ...urlRedirect.query,
                                    channel: formAssignProductSelectedChannel?.code,
                                },
                            };

                        // refetch
                        getSellerChannelRequest({
                            variables: { id: Number(productId) },
                        });

                        router.push(urlRedirectFinal);
                    }
                })
                .catch((e) => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: e.message,
                        variant: 'error',
                    });
                });
        },
    });

    /**
     * ---------------------------------------------------- *
     * @method methodSection
     * @summary section method for all function
     * ---------------------------------------------------- *
     */
    const handleClickSkuWarning = () => {
        skuRef.current.focus();
    };

    // handle dropfile
    const handleDropFile = (files, name, i) => {
        const imageValues = formik.values[name] ?? [];
        // check kembalian dari BE value string kosong ""
        const tmpImg = [...imageValues];
        const posImg = i !== null && String(i);
        const selectedLength = files?.length || 0;
        // hitung hanya yg deletednya tidak true
        const uploadedLength = imageValues.filter((imgV) => imgV.is_deleted === false).length;
        const isAllowUpload = !(selectedLength + uploadedLength > 5);

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

    const initDataCategory = () => {
        const getCategory = getCategoryList?.find((e) => e?.marketplace_category_id?.toString() === getDataChannelProduct?.category_id?.toString());
        if (getCategory) {
            formik.setFieldValue('category', getCategory);
        } else {
            formik.setFieldValue('category', null);
        }
    };

    const initDataImages = async () => {
        const dataImages = [];
        for (const image_index in getDataChannelProduct?.images) {
            const image_item = getDataChannelProduct?.images[image_index];
            if (image_item) {
                dataImages.push({
                    id: image_index,
                    is_deleted: false,
                    url: image_item,
                });
            }
        }
        formik.setFieldValue('images', dataImages);
    };

    const initDataProduct = () => {
        formik.setFieldValue('name', getDataChannelProduct?.name ?? '');
        formik.setFieldValue('sku', getDataChannelProduct?.sku ?? '');
        formik.setFieldValue('price', new Intl.NumberFormat('en-US').format(getDataChannelProduct?.price ?? ''));
        formik.setFieldValue('description', getDataChannelProduct?.description ?? '');
        formik.setFieldValue('is_variant', !!initVariants?.length);
        formik.setFieldValue('variants', initVariants?.length ? initVariants : [{}]);
        formik.setFieldValue('variant_table', initVariantTable);
        formik.setFieldValue('existing_variants', initVariantTable);
        formik.setFieldValue('dimension_package_height', getDataChannelProduct?.package_height ?? '');
        formik.setFieldValue('dimension_package_length', getDataChannelProduct?.package_length ?? '');
        formik.setFieldValue('dimension_package_width', getDataChannelProduct?.package_width ?? '');
        formik.setFieldValue('weight', conversionKilogramToGram(getDataChannelProduct?.weight ?? ''));
    };

    const copyDataMaster = () => {
        formik.setValues((prev) => ({
            ...prev,
            name: dataMaster?.getSellerProduct?.name ?? '',
            description: dataMaster?.getSellerProduct?.description || '',
            images: dataMaster?.getSellerProduct?.images || [],
            price: new Intl.NumberFormat('en-US').format(dataMaster?.getSellerProduct?.price ?? 0),
            weight: conversionKilogramToGram(dataMaster?.getSellerProduct?.weight) || 0,
            dimension_package_height: dataMaster?.getSellerProduct?.dimension_package_height || '',
            dimension_package_length: dataMaster?.getSellerProduct?.dimension_package_length || '',
            dimension_package_width: dataMaster?.getSellerProduct?.dimension_package_width || '',
        }));
    };

    const [firstRender, setFirstRender] = React.useState(!isFormAssignProduct);
    // hasBeenSearch : flag untuk category tree data saat init awal
    const [hasBeenSearch, setHasBeenSearch] = React.useState(false);

    const onSelectSearchChange = (params) => {
        const { e } = params;
        const search = e.target.value;
        if (search === '' && !firstRender) {
            clearTimeout(delayTimer);
        } else if (search && search.length > 2) {
            clearTimeout(delayTimer);
            delayTimer = setTimeout(() => {
                let marketplace_filter = {
                    marketplace_code: { eq: marketplace_code },
                    is_leaf: { eq: '1' },
                };
                if (getDataChannelProduct) {
                    marketplace_filter = {
                        ...marketplace_filter,
                    };
                }
                const variables = {
                    category_search: search,
                    marketplace_filter,
                };
                getChannelProductCategory({ variables });
                setHasBeenSearch(true);
                if (search === '') {
                    setFirstRender(false);
                }
            }, 1000);
        }
    };

    const onSelectSearchCallback = () => {
        setValidationSchema(initValidationSchema);
    };

    /**
     * ---------------------------------------------------- *
     * @dependency [isLoading]
     * @summary for display loading for first time
     * ---------------------------------------------------- *
     */
    React.useEffect(() => {
        BackdropLoad(isLoading);
    }, [isLoading]);

    /**
     * ---------------------------------------------------- *
     * @dependency [formik.values]
     * @summary for listener formik values there are any changes
     * ---------------------------------------------------- *
     */
    React.useEffect(() => {
        const category_id = formik?.values?.category?.entity_id?.toString() || undefined;
        if ((dataProduct && category_id) || isFormAssignProduct) {
            if (category_id) {
                getChannelProductCategoryAttribute({
                    variables: {
                        marketplace_code,
                        category_id,
                    },
                });
            }
        }
    }, [formik?.values?.category, dataProduct]);

    /**
     * ---------------------------------------------------- *
     * @dependency [isEmptyListChannelProduct]
     * @summary for redirect to add tab if there is no channel
     * ---------------------------------------------------- *
     */
    React.useEffect(() => {
        if (isEmptyListChannelProduct) {
            router.push({ pathname: `/seller/catalog/product/edit/${productId}`, query: { status: 'channel', channel: 'add' } });
        }
    }, [isEmptyListChannelProduct]);

    /**
     * ---------------------------------------------------- *
     * @dependency [dataChannelProductCategory]
     * @summary for set to formik value espicially category list
     * ---------------------------------------------------- *
     */
    React.useEffect(() => {
        if (dataChannelProductCategory) {
            initDataCategory();
        }
    }, [dataChannelProductCategory, getDataChannelProduct]);

    /**
     * ---------------------------------------------------- *
     * @dependency [dataProduct]
     * @summary for set init images | product
     * and for set channel product category
     * ---------------------------------------------------- *
     */
    React.useEffect(() => {
        if (dataProduct && !isFormAssignProduct) {
            initDataImages();
            initDataProduct();
            let marketplace_filter = { marketplace_code: { eq: marketplace_code } };
            if (getDataChannelProduct) {
                marketplace_filter = {
                    ...marketplace_filter,
                    marketplace_category_id: {
                        moreq: getDataChannelProduct?.category_id,
                    },
                };
            }
            const variables = { marketplace_filter };
            getChannelProductCategory({ variables });
        }
        if (isFormAssignProduct && marketplace_code) {
            getChannelProductCategory({
                variables: {
                    marketplace_filter: {
                        marketplace_code: { eq: marketplace_code },
                        is_leaf: { eq: '1' },
                    },
                },
            });
        }
    }, [dataProduct]);

    const padding = desktop ? 30 : 15;
    const propsChild = {
        classes,
        formik,
        skuRef,
        dataProduct,
        handleDropFile,
    };

    useEffect(() => {
        if (!formik.isSubmitting) return;
        const keys = Object.keys(formik.errors);
        if (keys?.length > 0) {
            const keyName = keys[0];
            const node = document.getElementsByName(keyName);
            if (node?.length) {
                node[0].scrollTo({ behavior: 'smooth', block: 'end', inline: 'nearest' });
                node[0].focus();
            }
        }
    }, [formik.isSubmitting]);

    // function : split parent child category
    const reSplitChildren = ({ items = [], index = 0 }) => {
        const groupCategory = [];
        items.map((itm) => {
            const { names } = itm;
            const name = names[index];

            // checking undefined
            if (name) {
                const isLast = names.length === index + 1;
                const key = name;
                const findKey = groupCategory.find((g_itm) => g_itm.key === key);
                if (!findKey) {
                    // filteredItems untuk mengurangi limit exceeds
                    const filteredItems = isLast ? [] : items.filter((f_itm) => f_itm.names[index] === name);
                    // children
                    const children = isLast ? null : reSplitChildren({ items: filteredItems, index: index + 1 });
                    // item value in last
                    const value = isLast ? itm : null;
                    groupCategory.push({
                        tree: index,
                        key,
                        name,
                        value,
                        children,
                    });
                }
            }
        });

        return groupCategory;
    };

    // useEffect - set category tree data
    useEffect(() => {
        const category_res = dataChannelProductCategory?.getProductCategoryList?.items;
        if (category_res && hasBeenSearch) {
            const customItems = [];
            category_res.map((itm) => customItems.push({ ...itm, names: itm.marketplace_category_name.split(' > ') }));
            const resultChild = reSplitChildren({ items: customItems });
            setCategoryTreeData(resultChild);
        }
    }, [dataChannelProductCategory?.getProductCategoryList?.items]);

    return (
        <>
            <Show when={isFormAssignProduct}>
                <Button
                    verticalCenter
                    bg="transparent"
                    color={BLACK}
                    padding="0px 0px 0px 0px"
                    marginBottom={10}
                    classic
                    classicButtonIcon={(
                        <>
                            <img src="/assets/img/icon_back.svg" alt="icon back" />
                            <img src={formAssignProductSelectedChannel?.icon} alt="icon channel" height={30} />
                        </>
                    )}
                    classicButtonLabel={formAssignProductSelectedChannel?.name}
                    classicButtonOnClick={() => {
                        formAssignSetShowFormChannel(false);
                    }}
                />
            </Show>
            <div
                id="product-tab-channel-container"
                className={clsx(classes.productTabChannelContainer, isFormAssignProduct && classes.productTabChannelContainerFormChannel)}
            >
                <BoxCardSimple
                    title={!isLoading && t('sellercatalog:Product_Information')}
                    bg={WHITE}
                    border={1}
                    borderRadius={isFormAssignProduct ? 5 : '0px 5px 5px 5px'}
                    marginTop={-1}
                    padding={padding}
                    headerComponent={
                        isFormAssignProduct ? null : (
                            <BoxCardSimpleTab
                                onPreventHandleClick={onPreventHandleClick}
                                urlPlusHref="/seller/catalog/product/create"
                                isDirty={isDirty}
                                setIsDirty={setIsDirty}
                                dataTabs={listDataChannelProduct}
                                onCloseTabCallback={onCloseTabCallback}
                            />
                        )
                    }
                    content={
                        isLoading ? (
                            <div>{`${t('common:loading')}...`}</div>
                        ) : (
                            <FormChannelProductInformation
                                {...props}
                                {...propsChild}
                                treeData={categoryTreeData}
                                treeLoading={loadingCategoryList}
                                setTreeData={setCategoryTreeData}
                                getCategoryList={getCategoryList}
                                onSelectSearchChange={onSelectSearchChange}
                                onSelectSearchCallback={onSelectSearchCallback}
                                max_char={max_char}
                                input_desc={input_desc}
                                text_help={text_help}
                            />
                        )
                    }
                    titleButtonComponent={(!isLoading
                        && (
                            <Button
                                bg={WHITE}
                                color={TEXT_GRAY}
                                border={1}
                                classic
                                classicButtonIcon={<img src="/assets/img/icon_document_gray.svg" alt="copy-master" />}
                                classicButtonLabel={t('sellercatalog:Copy_Master_Product_Information')}
                                classicButtonOnClick={copyDataMaster}
                            />
                        )
                    )}
                />

                <Show when={!isLoading}>
                    <Show when={listAttribute && listAttribute?.length > 0}>
                        <BoxCardSimple
                            bg={WHITE}
                            border={1}
                            borderRadius={5}
                            marginTop={10}
                            padding={padding}
                            title={t('common:attribute_product')}
                            content={(
                                <FormChannelDynamicAttribute
                                    {...props}
                                    {...propsChild}
                                    initValidationSchema={initValidationSchema}
                                    validationSchema={validationSchema}
                                    setValidationSchema={setValidationSchema}
                                    listAttribute={listAttribute}
                                    listAttributeProduct={getDataChannelProductAttribute}
                                />
                            )}
                        />
                    </Show>
                    <Show when={formik.values.is_variant}>
                        <BoxCardSimple
                            bg={WHITE}
                            border={1}
                            borderRadius={5}
                            marginTop={10}
                            padding={padding}
                            title={t('common:Product_Variants')}
                            content={<FormChannelProductVariant {...props} {...propsChild} handleClickSkuWarning={handleClickSkuWarning} />}
                        />
                    </Show>
                    <Show when={!isFormAssignProduct}>
                        <BoxCardSimple
                            bg={WHITE}
                            border={1}
                            borderRadius={5}
                            marginTop={10}
                            padding={padding}
                            title={t('common:stock')}
                            content={<FormChannelProductStock {...props} {...propsChild} />}
                        />
                    </Show>
                    <BoxCardSimple
                        title={t('common:shipping')}
                        bg={WHITE}
                        border={1}
                        borderRadius={5}
                        marginTop={10}
                        padding={padding}
                        content={<FormChannelProductShipping {...props} {...propsChild} />}
                    />
                </Show>
            </div>
            <Show when={isCanCreateProduct}>
                <StickyBottom
                    className={isFormAssignProduct ? classes.stickyBottomContainerFormAssign : false}
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
                            />
                            <Button
                                classicButtonLabel={t('common:Submit')}
                                className="btn-next"
                                classic
                                paddingLeft={padding}
                                paddingRight={padding}
                                classicButtonOnClick={() => setModalSubmitConfirm(true)}
                            />
                        </div>
                    )}
                />
            </Show>

            <AppModal
                show={modalSubmitConfirm}
                title={t('warning')}
                closeButton
                onHandleClose={() => setModalSubmitConfirm(false)}
                negativeLabel={t('common:btn_cancel')}
                classNameNegative={classes.closeBtn}
                onClickNegative={() => setModalSubmitConfirm(false)}
                positiveLabel={t('common:Submit')}
                onClickPositive={formik.handleSubmit}
            >
                <div style={{ marginBottom: 20 }}>
                    {t('push_modal_message')}
                    {' '}
                    ?
                </div>
            </AppModal>
        </>
    );
};

export default FormChannel;
