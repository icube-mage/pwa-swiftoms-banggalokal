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
        data, dataConfig, dataAtt, Content, getProductAttributes, setLoadingState, t,
    } = props;
    const router = useRouter();
    const [updateProduct] = gqlService.updateProduct();
    const productDetail = data.getProductAttributes;
    const [attribute_set_id, set_attribute_set_id] = React.useState(productDetail.attribute_set_id);

    const onChangeAttribute = (e) => {
        setLoadingState(true);
        const { value } = e.target;
        set_attribute_set_id(value);
        getProductAttributes({
            variables: {
                id: router && router.query && Number(router.query.id),
                attribute_set_id: Number(value),
            },
        });
        setLoadingState(false);
    };

    const initValue = () => {
        const init = [];
        const valid = [];
        const input_image = [];
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
        for (let i = 0; i < productDetail.groups.length; i++) {
            const group = productDetail.groups[i];
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
                    return init.push([attribute.attribute_code, attribute.attribute_value]);
                });
            group.attributes
                .filter((att) => att.frontend_input === 'image')
                .map((attribute) => attribute.images.map((image) => input_image.push({
                    id: image.id,
                    url: image.url,
                    binary: '',
                    position: image.position,
                    types: image.types,
                    is_deleted: false,
                })));
        }
        return {
            init: Object.fromEntries(init),
            valid: Object.fromEntries(valid),
            image: input_image,
        };
    };

    const initConfig = () => {
        const configurable = {
            product_configurable: [],
            selected_attribute: [],
            associated_product_ids: dataConfig.map((d) => d.entity_id),
        };

        const attributes = [];
        dataConfig.map((d) => d.attributes.forEach((att) => {
            if (!attributes.includes(att.attribute_code)) {
                attributes.push(att.attribute_code);
            }
        }));
        const selected_attribute = attributes.map((att) => dataAtt.find((da) => da.attribute_code === att));
        const attributes_options = {};
        const attributes_unique = {};

        configurable.product_configurable = dataConfig.map((d) => {
            const attributesMaps = [];
            d.attributes.forEach((attribute) => selected_attribute.forEach((at) => at.attribute_options.forEach((da) => {
                if (da.value === attribute.attribute_value) {
                    attributesMaps.push([at.attribute_code, da.label]);
                    // eslint-disable-next-line no-prototype-builtins
                    if (attributes_options.hasOwnProperty(at.attribute_code)) {
                        if (!attributes_unique[at.attribute_code].includes(da.value)) {
                            attributes_options[at.attribute_code].push(da);
                            attributes_unique[at.attribute_code].push(da.value);
                        }
                    } else {
                        attributes_unique[at.attribute_code] = [da.value];
                        attributes_options[at.attribute_code] = [da];
                    }
                }
            })));

            return ({
                ...d,
                id: d.entity_id,
                weight: d.weight || '0',
                images: d.images.map((image) => ({
                    name: image.file,
                    ...image,
                })),
                ...Object.fromEntries(attributesMaps),
                isAssociated: true,
                attributesCombined: Object.values(Object.fromEntries(attributesMaps)),
            });
        });
        let existing_config = {};

        existing_config = {
            ...existing_config,
            attributes,
            attributes_options,
            attributes_label: selected_attribute?.map((att) => att.frontend_label),
            attributes_ids: selected_attribute?.map((att) => att.attribute_id),
            images: 'skip',
            price: 'skip',
            single_images: [],
            single_price: null,
            images_unique_attribute: '',
            price_unique_attribute: '',
        };

        configurable.selected_attribute = selected_attribute;
        configurable.initial_sku = configurable.product_configurable.map((p) => p.sku);

        configurable.product_configurable.forEach((el, i) => {
            const temp = [];
            configurable.selected_attribute.forEach((att) => {
                if (el[att.attribute_code]) {
                    temp.push(`${att.frontend_label}: ${el[att.attribute_code]}`);
                }
            });
            configurable.product_configurable[i].attributes_frontend = temp.join(', ');
        });

        return { configurable, existing_config };
    };

    const handleSubmit = (value) => {
        const variables = {
            ...value,
        };
        window.backdropLoader(true);
        updateProduct({
            variables,
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
            input_image: initValue().image,
            product_location: productDetail.product_location,
            options: productDetail.options?.map((option) => ({
                option_id: option.option_id,
                title: option.title,
                is_old: true,
                values: option.value,
                required: option.required,
                sort_order: option.sort_order,
            })) || [],
            shouldCheck: false,
            configurable: initConfig().configurable,
            existing_config: initConfig().existing_config,
            existing_configurable: initConfig().configurable,
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
                input_image, product_location, status, options, shouldCheck, configurable, existing_config, existing_configurable, ...restValues
            } = values;
            const valueToSubmit = {
                id: router && router.query && Number(router.query.id),
                type: 'configurable',
                input: Object.keys(restValues).map((key) => {
                    let attribute_value = restValues[key] || '';
                    if (typeof restValues[key] === 'object') {
                        attribute_value = restValues[key]?.map((val) => val.value).join(',') || '';
                    } else if (typeof restValues[key] === 'boolean') {
                        attribute_value = restValues[key] ? '1' : '0';
                    }
                    return {
                        attribute_code: key,
                        attribute_value,
                    };
                }),
            };
            valueToSubmit.input = [
                { attribute_code: 'status', attribute_value: status ? '1' : '2' },
                { attribute_code: 'attribute_set_id', attribute_value: String(attribute_set_id) },
                ...valueToSubmit.input,
            ];
            if (input_image && input_image.length) {
                valueToSubmit.input_image = input_image.map((input) => {
                    const {
                        url, name, size, ...restInput
                    } = input;
                    return restInput;
                });
            }
            if (product_location?.length) {
                valueToSubmit.product_location = product_location.map((loc) => Number(loc.loc_id));
            }
            if (options.length) {
                valueToSubmit.options = options.map((option) => {
                    const res = {
                        is_delete: option.is_delete || false,
                        title: option.title,
                        values: option.values.map((value, iv) => ({
                            title: value.title,
                            sku: value.sku,
                            sort_order: value.sort_order || iv + 1,
                            is_delete: option.is_delete ? true : value.is_delete || false,
                        })),
                    };
                    if (option.option_id && option.is_old) {
                        res.option_id = option.option_id;
                    }
                    return res;
                });
            }
            if (configurable.product_configurable.length) {
                const associated = [];
                valueToSubmit.configurable = {
                    associated_product_ids: [],
                    product_configurable: configurable.product_configurable.filter((p) => {
                        const exist = existing_configurable?.product_configurable?.find((c) => c.id === p.id);
                        if (exist && JSON.stringify(exist) !== JSON.stringify(p)) {
                            return true;
                        }
                        if (p.isAssociated) {
                            associated.push(p.id);
                            return false;
                        }
                        return true;
                    }).map((product) => {
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
                        if (product.isIdExist || configurable.initial_sku?.includes(product.sku)) {
                            result.id = product.id;
                        }
                        if (product.images && product.images.length) {
                            result.product_image = product.images?.filter((img) => img.binary).map((img) => {
                                if (img.id) {
                                    return {
                                        id: img.id,
                                        binary: img.binary || '',
                                        position: img.position,
                                        is_deleted: img.is_deleted || false,
                                        types: img.types,
                                    };
                                }
                                return {
                                    binary: img.binary || '', position: img.position, is_deleted: img.is_deleted || false, types: img.types,
                                };
                            });
                        }
                        return result;
                    }),
                };
                valueToSubmit.configurable.associated_product_ids = associated;
            }
            handleSubmit(valueToSubmit);
        },
    });

    const handleDropFile = (files) => {
        const { baseCode, file } = files[0];
        const input = formik.values.input_image;
        input.push({
            binary: baseCode,
            types: [],
            position: 0,
            is_deleted: false,
            name: file.name,
            size: `${file.size / 1000} KB`,
        });
        formik.setFieldValue('input_image', input);
    };

    const contentProps = {
        formik,
        productDetail,
        handleDropFile,
        attribute_set_id,
        onChangeAttribute,
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
        title: `${t('productlist:Product_Detail_')}${router?.query?.id}`,
    };

    const [loadingState, setLoadingState] = React.useState(false);
    const [getProductAttributes, productAttributes] = gqlService.getProductAttributes();
    const {
        loading, data, called, error, refetch,
    } = productAttributes;

    const { loading: loadingConfig, data: dataConfig, error: errorConfig } = gqlService.getConfigurableProductVariant({
        id: Number(router?.query?.id),
    });
    const { loading: loadingAtt, data: dataAtt, error: errorAtt } = gqlService.getConfigurableAttributeByIds();

    React.useEffect(() => {
        getProductAttributes({
            variables: { id: router && router.query && Number(router.query.id) },
        });
    }, []);

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_product_list',
    });

    React.useEffect(() => {
        BackdropLoad(loading || !called || aclCheckLoading || loadingState || loadingConfig || loadingAtt);
    }, [loading, aclCheckLoading, called, loadingState, loadingConfig, loadingAtt]);

    if (loading || !called || aclCheckLoading || loadingState || loadingConfig || loadingAtt) {
        return <Layout pageConfig={pageConfig} />;
    }

    if (called && (!data || !dataConfig || !dataAtt)) {
        const errMsg = (error?.message || errorConfig?.message || errorAtt?.message) ?? t('productlist:Data_not_found');
        const redirect = '/product/productlist';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
        return <Layout pageConfig={pageConfig} />;
    }

    if (data?.getProductAttributes?.type_id !== 'configurable') {
        const errMsg = t('productlist:This_page_is_only_for_valuestype_products', { values: { type: data?.getProductAttributes?.type_id } });
        const redirect = '/product/productlist';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} />;
    }

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper
                data={data}
                getProductAttributes={getProductAttributes}
                setLoadingState={setLoadingState}
                dataConfig={dataConfig?.getConfigurableProductVariant}
                dataAtt={dataAtt?.getConfigurableAttributeByIds}
                refetch={refetch}
                {...props}
            />
        </Layout>
    );
};

export default Core;
