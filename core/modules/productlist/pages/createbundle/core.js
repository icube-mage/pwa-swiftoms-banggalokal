/* eslint-disable no-nested-ternary */
import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/productlist/services/graphql';
import aclService from '@modules/theme/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';
import { isProductFixed, priceType, weightType } from '@modules/productlist/helpers/newitembundle';

const ContentWrapper = (props) => {
    const {
        Content, attributeOptions, attributeToMap, getNewProductAttributes, t,
    } = props;
    const router = useRouter();
    const [createProduct] = gqlService.createProduct();
    const [attribute_set_id, set_attribute_set_id] = React.useState(attributeToMap.attribute_set_id);

    const onChangeAttribute = (e) => {
        const { value } = e.target;
        set_attribute_set_id(value);
        getNewProductAttributes({
            variables: {
                attribute_set_id: Number(value),
            },
        });
    };

    const newAttribute = () => {
        const tempAttributes = [...attributeToMap.groups[0].attributes];
        tempAttributes.splice(0, 0, isProductFixed);
        const idx_price = tempAttributes.findIndex((att) => att.attribute_code === 'price');
        tempAttributes[idx_price] = {
            ...tempAttributes[idx_price],
            disabled_code: 'price_type',
        };
        tempAttributes.splice(idx_price, 0, priceType);
        const idx_tax = tempAttributes.findIndex((att) => att.attribute_code === 'tax_class_id');
        tempAttributes[idx_tax] = {
            ...tempAttributes[idx_tax],
            disabled_code: 'price_type',
        };
        const idx_weight = tempAttributes.findIndex((att) => att.attribute_code === 'weight');
        tempAttributes[idx_weight] = {
            ...tempAttributes[idx_weight],
            disabled_code: 'weight_type',
        };
        tempAttributes.splice(idx_weight, 0, weightType);
        const temp = {
            ...attributeToMap,
            groups: [
                {
                    ...attributeToMap.groups[0],
                    attributes: tempAttributes,
                },
                ...attributeToMap.groups.slice(1),
            ],
        };
        return temp;
    };

    const initValue = () => {
        const init = [];
        const valid = [];
        const yupValidate = (attribute) => {
            const { backend_type, frontend_input } = attribute;
            if (frontend_input === 'boolean') {
                return Yup.boolean();
            }
            switch (backend_type) {
            case 'int':
            case 'decimal':
                return Yup.number().typeError(t('productlist:Value_must_be_a_number'));
            case 'text':
                return Yup.string();
            default:
                return Yup.string();
            }
        };
        const newAttributes = newAttribute();
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < newAttributes.groups.length; i++) {
            const group = newAttributes.groups[i];
            group.attributes
                .filter((att) => att.frontend_input !== 'image')
                .map((attribute) => {
                    if (attribute.is_required) {
                        if (attribute.disabled_code) {
                            valid.push([attribute.attribute_code, yupValidate(attribute).nullable()
                                .when('price_type', {
                                    is: true,
                                    then: yupValidate(attribute).nullable(),
                                    otherwise: yupValidate(attribute).required(t('productlist:This_is_a_Required_field')),
                                }),
                            ]);
                        } else {
                            valid.push([attribute.attribute_code, yupValidate(attribute)
                                .required(t('productlist:This_is_a_Required_field'))]);
                        }
                    } else {
                        valid.push([attribute.attribute_code, yupValidate(attribute).nullable()]);
                    }
                    if (attribute.frontend_input === 'multiselect') {
                        const values = [];
                        if (attribute.attribute_value?.length) {
                            attribute.attribute_value.split(',').forEach((item) => {
                                values.push(attribute.attribute_options.find((o) => o.value === item));
                            });
                        }
                        return init.push([attribute.attribute_code, values]);
                    }
                    if (attribute.frontend_input === 'select' && attribute.attribute_value?.length) {
                        let values = '';
                        if (attribute.attribute_value) {
                            values = attribute.attribute_options.find((o) => o.value === attribute.attribute_value)?.value;
                        }
                        return init.push([attribute.attribute_code, values]);
                    }
                    if (attribute.frontend_input === 'boolean') {
                        const values = attribute.attribute_value === '1';
                        return init.push([attribute.attribute_code, values]);
                    }
                    return init.push([attribute.attribute_code, attribute.attribute_value || '']);
                });
        }
        return {
            init: Object.fromEntries(init),
            valid: Object.fromEntries(valid),
        };
    };

    const handleSubmit = (value) => {
        window.backdropLoader(true);
        createProduct({
            variables: { ...value },
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('productlist:The_product_has_been_saved'),
                    variant: 'success',
                });
                setTimeout(() => router.push('/product/productlist'), 250);
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

    const formik = useFormik({
        initialValues: {
            ...initValue().init,
            product_location: [],
            input_image: [],
            options: [],
            shouldCheck: false,
            bundle_options: [{
                option_id: 0,
                title: '',
                is_required: false,
                values: [],
                input_type: 'select',
            }],
        },
        validationSchema: Yup.object().shape({
            ...initValue().valid,
            product_location: Yup.array().of(Yup.object().shape({
                loc_id: Yup.string().required(t('productlist:This_is_a_Required_field')),
            })).min(1, t('productlist:This_is_a_Required_field')),
            shouldCheck: Yup.boolean(),
            options: Yup.array().nullable().when('shouldCheck', {
                is: true,
                then: Yup.array().of(Yup.object().shape({
                    title: Yup.string().required(t('productlist:This_is_a_Required_field')),
                    values: Yup.array().of(Yup.object().shape({
                        title: Yup.string().required(t('productlist:This_is_a_Required_field')),
                        sku: Yup.string().required(t('productlist:This_is_a_Required_field')),
                    })).min(1, t('productlist:This_is_a_Required_field')),
                })),
                otherwise: Yup.array().nullable(),
            }),
            bundle_options: Yup.array().when('is_fixed_bundle', {
                is: false,
                then: Yup.array().of(Yup.object().shape({
                    title: Yup.string().required(t('productlist:This_is_a_Required_field')),
                    values: Yup.array().of(Yup.object().shape({
                        qty: Yup.number().typeError(t('productlist:Value_must_be_a_number'))
                            .required(t('productlist:This_is_a_Required_field')),
                    })).min(1, t('productlist:This_is_a_Required_field')),
                })).min(1, t('productlist:This_is_a_Required_field')),
                otherwise: Yup.array().of(Yup.object().shape({
                    title: Yup.string().nullable(),
                    values: Yup.array().of(Yup.object().shape({
                        qty: Yup.number().typeError(t('productlist:Value_must_be_a_number'))
                            .required(t('productlist:This_is_a_Required_field')),
                    })).min(1, t('productlist:This_is_a_Required_field')),
                })).min(1, t('productlist:This_is_a_Required_field')),
            }),
        }),
        onSubmit: (values) => {
            const {
                input_image, product_location, status, options, shouldCheck, price, weight,
                is_fixed_bundle, price_type, weight_type, bundle_options, ...restValues
            } = values;
            const valueToSubmit = {
                type: 'bundle',
                input: Object.keys(restValues)
                    .map((key) => {
                        let attribute_value = restValues[key] || '';
                        if (restValues[key] && restValues[key] !== '') {
                            if (typeof restValues[key] === 'object') {
                                attribute_value = restValues[key]?.map((val) => val.value).join(',') || '';
                            } else if (typeof restValues[key] === 'boolean') {
                                attribute_value = restValues[key] ? '1' : '0';
                            }
                            return {
                                attribute_code: key,
                                attribute_value,
                            };
                        }
                        return false;
                    })
                    .filter((val) => !!val && val?.attribute_value !== ''),
            };
            valueToSubmit.input = [
                ...valueToSubmit.input,
                { attribute_code: 'status', attribute_value: status ? '1' : '2' },
                { attribute_code: 'is_fixed_bundle', attribute_value: is_fixed_bundle ? '1' : '0' },
                { attribute_code: 'price_type', attribute_value: price_type ? '1' : '0' },
                { attribute_code: 'weight_type', attribute_value: weight_type ? '1' : '0' },
                { attribute_code: 'attribute_set_id', attribute_value: String(attribute_set_id) },
            ];
            if (!price_type) {
                valueToSubmit.input = [
                    ...valueToSubmit.input,
                    { attribute_code: 'price', attribute_value: price },
                ];
            }
            if (!weight_type && weight) {
                valueToSubmit.input = [
                    ...valueToSubmit.input,
                    { attribute_code: 'weight', attribute_value: weight },
                ];
            }
            if (input_image && input_image.length) {
                valueToSubmit.input_image = input_image.map((input) => {
                    const { name, size, ...restInput } = input;
                    return restInput;
                });
            }
            if (product_location?.length) {
                valueToSubmit.product_location = product_location.map((loc) => Number(loc.loc_id));
            }
            if (options.length) {
                valueToSubmit.options = options.map((option) => ({
                    is_delete: false,
                    title: option.title,
                    values: option.values.map((value, iv) => ({
                        is_delete: false,
                        sku: value.sku,
                        sort_order: value.sort_order || iv + 1,
                        title: value.title,
                    })),

                }));
            }
            valueToSubmit.bundle_options = is_fixed_bundle
                ? bundle_options?.slice(0, 1).map((option) => ({
                    input_type: is_fixed_bundle ? null : option.input_type,
                    is_required: is_fixed_bundle ? true : option.is_required,
                    is_delete: false,
                    title: is_fixed_bundle ? 'Bundle' : option.title,
                    values: option.values.map((product) => ({
                        is_default: is_fixed_bundle ? true : product.is_default,
                        is_delete: false,
                        price: (is_fixed_bundle ? product.product_price ? String(product?.product_price?.replace(/[^0-9.-]+/g, ''))
                            : String(product.price) : String(product.price)) || '0',
                        product_id: product.id,
                        qty: Number(product.qty),
                        qty_edit: is_fixed_bundle ? null : product.qty_edit,
                    })),
                }))
                : bundle_options.map((option) => ({
                    input_type: is_fixed_bundle ? null : option.input_type,
                    is_required: is_fixed_bundle ? true : option.is_required,
                    is_delete: false,
                    title: is_fixed_bundle ? 'Bundle' : option.title,
                    values: option.values.map((product) => ({
                        is_default: is_fixed_bundle ? true : product.is_default,
                        is_delete: false,
                        price: (is_fixed_bundle ? product.product_price ? String(product?.product_price?.replace(/[^0-9.-]+/g, ''))
                            : String(product.price) : String(product.price)) || '0',
                        product_id: product.id,
                        qty: Number(product.qty),
                        qty_edit: is_fixed_bundle ? null : product.qty_edit,
                    })),
                }));
            handleSubmit(valueToSubmit);
        },
    });

    const handleDropFile = (files) => {
        const input = formik.values.input_image;
        const dataToPush = files.map((item) => ({
            binary: item.baseCode,
            types: [],
            position: 0,
            name: item.file.name,
            size: `${item.file.size / 1000} KB`,
        }));
        formik.setFieldValue('input_image', input.concat(dataToPush));
    };

    const contentProps = {
        ...props,
        formik,
        attributeToMap: newAttribute(),
        handleDropFile,
        attribute_set_id,
        onChangeAttribute,
        attributeOptions,
        t,
    };

    React.useEffect(() => {
        if (formik.values.options.length) {
            formik.setFieldValue('shouldCheck', true);
        } else {
            formik.setFieldValue('shouldCheck', false);
        }
    }, [formik.values.options]);

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();

    const pageConfig = {
        title: 'Create Product',
    };

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_product_list',
    });
    const { loading, data, error } = gqlService.getProductAttributeSetOptions();
    const [getNewProductAttributes, getNewProductAttributesRes] = gqlService.getNewProductAttributes();

    React.useEffect(() => {
        getNewProductAttributes({
            variables: { attribute_set_id: 4 },
        });
    }, []);

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading || getNewProductAttributesRes.loading);
    }, [loading, aclCheckLoading, getNewProductAttributesRes.loading]);

    if (loading || aclCheckLoading || getNewProductAttributesRes.loading) {
        return <Layout pageConfig={pageConfig} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    if (!data || !getNewProductAttributesRes.data) {
        const errMsg = error?.message ?? getNewProductAttributesRes?.error?.message ?? t('productlist:Data_not_found');
        const redirect = '/product/productlist';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} />;
    }

    const contentProps = {
        attributeOptions: data.getProductAttributeSetOptions,
        attributeToMap: getNewProductAttributesRes.data.getNewProductAttributes,
        getNewProductAttributes,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper {...contentProps} {...props} />
        </Layout>
    );
};

export default Core;
