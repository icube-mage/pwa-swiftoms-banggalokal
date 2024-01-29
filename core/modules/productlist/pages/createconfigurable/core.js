import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/productlist/services/graphql';
import aclService from '@modules/theme/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';

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
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < attributeToMap.groups.length; i++) {
            const group = attributeToMap.groups[i];
            group.attributes
                .filter((att) => (att.frontend_input !== 'image') && (att.attribute_code !== 'price'))
                .map((attribute) => {
                    if (attribute.is_required) {
                        valid.push([attribute.attribute_code, yupValidate(attribute)
                            .required(t('productlist:This_is_a_Required_field'))]);
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
                    return init.push([attribute.attribute_code, '']);
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
            configurable: {
                product_configurable: [],
                selected_attribute: [],
            },
            existing_config: {},
        },
        validationSchema: Yup.object().shape({
            ...initValue().valid,
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
            configurable: Yup.object().shape({
                product_configurable: Yup.array().of(Yup.object().shape({})).min(1, t('productlist:This_is_a_Required_field')),
            }),
        }),
        onSubmit: (values) => {
            const {
                input_image, product_location, status, options, shouldCheck, configurable, existing_config, ...restValues
            } = values;
            const valueToSubmit = {
                type: 'configurable',
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
                { attribute_code: 'status', attribute_value: status ? '1' : '2' },
                { attribute_code: 'attribute_set_id', attribute_value: String(attribute_set_id) },
                ...valueToSubmit.input,
            ];
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
            if (configurable.product_configurable.length) {
                valueToSubmit.configurable = {
                    product_configurable: configurable.product_configurable.map((product) => {
                        const result = {
                            products: [
                                { attribute_code: 'name', attribute_value: product.name },
                                { attribute_code: 'status', attribute_value: String(product.status) },
                                { attribute_code: 'sku', attribute_value: product.sku },
                                { attribute_code: 'price', attribute_value: product.price ? String(product.price) : '0' },
                                { attribute_code: 'weight', attribute_value: String(product.weight) },
                            ],
                            configurable_attributes: configurable.selected_attribute.map((att) => (
                                {
                                    attribute_code: att.attribute_code,
                                    attribute_value: att.attribute_options.find((opt) => opt.label === product[att.attribute_code])?.value,
                                }
                            )),
                        };
                        if (product.images && product.images.length) {
                            result.product_image = product.images?.map((img) => (
                                { binary: img?.binary, position: img.position, is_deleted: false }
                            ));
                        }
                        return result;
                    }),
                };
            }
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
        formik,
        attributeToMap,
        handleDropFile,
        attribute_set_id,
        onChangeAttribute,
        attributeOptions,
        t,
        ...props,
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
        title: t('productlist:Create_Configurable_Product'),
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
