/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import React from 'react';
import FormInput from '@sellermodules/catalog/plugins/Input/index';
import clsx from 'clsx';
import { isValidJSON, ucwords } from '@helper_text';
import Checkbox from '@material-ui/core/Checkbox';
import * as Yup from 'yup';

const FormChannelDynamicAttributes = (props) => {
    const {
        t,
        classes,
        formik,
        listAttribute,
        listAttributeProduct,
        initValidationSchema,
        setValidationSchema,
        brandConfig,
        mpCode,
    } = props;

    React.useEffect(() => {
        if (listAttribute?.length > 0) {
            const validationSchemaNew = { ...initValidationSchema };
            for (const listAttrIndex in listAttribute) {
                const listAttrItem = listAttribute[listAttrIndex];
                const entity_id = listAttrItem?.entity_id;
                const isItemRequired = listAttrItem?.is_mandatory;
                const isHasValueCustomAttr = !!listAttributeProduct?.find((att) => att?.attribute_id === listAttrItem?.entity_id);
                const isAttributeQuantitative = listAttrItem?.marketplace_input_type === 'QUANTITATIVE';

                const name = `custom_${entity_id}`;
                const unitName = `unit_${entity_id}`;
                if (isItemRequired) {
                    validationSchemaNew[name] = Yup.string().required(t('sellercatalog:This_is_a_Required_field'));
                    formik.setFieldValue(name, '');
                }
                if (!isHasValueCustomAttr && isAttributeQuantitative) {
                    const item_options = isValidJSON(listAttrItem?.marketplace_options) ? JSON.parse(listAttrItem?.marketplace_options) : [];
                    formik.setFieldValue(unitName, item_options[0]);
                }
            }
            setValidationSchema(validationSchemaNew);
        }
    }, [listAttribute]);

    React.useEffect(() => {
        if (listAttributeProduct?.length > 0) {
            for (const attrProductIndex in listAttributeProduct) {
                const attrProductItem = listAttributeProduct[attrProductIndex];
                const entity_id = attrProductItem?.attribute_id;
                const name = `custom_${entity_id}`;
                const unitName = `unit_${entity_id}`;
                const filterListAttribute = listAttribute?.filter((item) => attrProductItem?.attribute_id === item?.entity_id) ?? [];
                const isHasValueCustomAttr = filterListAttribute?.length > 0;

                if (isHasValueCustomAttr) {
                    const isAttributeQuantitative = filterListAttribute?.[0]?.marketplace_input_type === 'QUANTITATIVE';
                    const value = isValidJSON(attrProductItem?.attribute_value)
                        ? JSON.parse(attrProductItem?.attribute_value)
                        : attrProductItem?.attribute_value;
                    if (isAttributeQuantitative) {
                        const newValue = value?.toString()?.split(' # ');
                        const item_options = isValidJSON(filterListAttribute?.[0]?.marketplace_options) ? JSON.parse(filterListAttribute?.[0]?.marketplace_options) : [];
                        formik.setFieldValue(name, newValue?.[0]?.toString());
                        formik.setFieldValue(unitName, newValue?.[1] ? { name: newValue?.[1]?.toString() } : item_options[0]);
                    } else {
                        formik.setFieldValue(name, value?.toString());
                    }
                }
            }
        }
    }, [listAttributeProduct]);

    const [isNoBrand, setIsNoBrand] = React.useState(null);
    const brandConfigObj = isValidJSON(String(brandConfig)) ? JSON.parse(String(brandConfig)) : [];
    const [noBrand] = brandConfigObj?.filter((e) => e?.marketplace_code?.toLowerCase() === mpCode()?.toLowerCase()) || [];

    if (listAttribute?.length < 1) return null;
    return (
        <div className={clsx('channel-product-form-dynamic-container', classes.formDynamicContainer)}>
            {
                listAttribute.map((item, index) => {
                    const isQuantitative = item?.marketplace_input_type === 'QUANTITATIVE';
                    const is_select = item?.marketplace_options !== null;
                    const item_entity_id = item?.entity_id;
                    const item_options = isValidJSON(item?.marketplace_options) ? JSON.parse(item?.marketplace_options) : [];
                    const isRequired = item?.is_mandatory === 1;
                    const brandStatus = () => {
                        const getCurrentField = item?.marketplace_attribute_name?.replaceAll('_', ' ')?.toLowerCase();
                        if (getCurrentField === 'brand') {
                            if (isNoBrand === null) {
                                return formik.values[`custom_${item_entity_id}`] === noBrand?.value;
                            }
                            return isNoBrand === true;
                        }
                        return false;
                    };
                    if (isQuantitative) {
                        return (
                            <>
                                <FormInput
                                    key={`form-item-${index}`}
                                    label={ucwords(t(item?.marketplace_attribute_name?.replaceAll('_', ' ')))}
                                    required={isRequired}
                                    grid={2}
                                    gridSize={[9, 3]}
                                    formGrid="40% 60%"
                                    inputs={[
                                        {
                                            name: `custom_${item_entity_id}`,
                                            label: ucwords(t(item?.marketplace_attribute_name?.replaceAll('_', ' '))),
                                        },
                                        {
                                            inputType: 'select',
                                            options: item_options,
                                            name: `unit_${item_entity_id}`,
                                            label: ucwords(t(item?.marketplace_attribute_name?.replaceAll('_', ' '))),
                                            primaryKey: 'name',
                                            labelKey: 'name',
                                            valueSpesificKey: 'name',
                                            disableClearable: true,
                                        },
                                    ]}
                                    {...props}
                                />
                            </>
                        );
                    }
                    if (!isQuantitative && is_select) {
                        return (
                            <>
                                <FormInput
                                    inputType="select"
                                    options={item_options}
                                    key={`form-item-${index}`}
                                    name={`custom_${item_entity_id}`}
                                    label={ucwords(t(item?.marketplace_attribute_name?.replaceAll('_', ' ')))}
                                    required={isRequired}
                                    formGrid="40% 60%"
                                    primaryKey="name"
                                    labelKey="name"
                                    valueSpesificKey="name"
                                    disabled={brandStatus()}
                                    moreElement={item?.marketplace_attribute_name?.replaceAll('_', ' ')?.toLowerCase() === 'brand' && noBrand?.value && (
                                        <div style={{ marginLeft: -10 }}>
                                            <Checkbox
                                                checked={brandStatus()}
                                                onChange={() => {
                                                    if (!brandStatus()) {
                                                        formik.setFieldValue(`custom_${item_entity_id}`, noBrand.value);
                                                    } else {
                                                        formik.setFieldValue(`custom_${item_entity_id}`, '');
                                                    }
                                                    setIsNoBrand(!brandStatus());
                                                }}
                                                size="small"
                                            />
                                            {t('no_brand')}
                                            {' '}
                                            ?
                                        </div>
                                    )}
                                    {...props}
                                />
                            </>
                        );
                    }
                    return (
                        <>
                            <FormInput
                                key={`form-item-${index}`}
                                name={`custom_${item_entity_id}`}
                                label={ucwords(t(item?.marketplace_attribute_name?.replaceAll('_', ' ')))}
                                required={isRequired}
                                formGrid="40% 60%"
                                {...props}
                            />
                        </>
                    );
                })
            }
        </div>
    );
};

export default FormChannelDynamicAttributes;
