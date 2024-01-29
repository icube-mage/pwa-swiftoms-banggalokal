/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';

import useStyles from '@modules/productlist/plugins/productconfigurable/style';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import TextField from '@common_textfield';
import Select from '@common_select';

import ImageManagement from '@modules/productlist/plugins/productconfigurable/components/imageupload';
import ImageConfig from '@modules/productlist/plugins/imageconfig';

const StepContent = (props) => {
    const {
        formikStep,
        t,
        setValidSchema,
        initialValid,
        dataState,
    } = props;
    const classes = useStyles();
    const attributeSelected = dataState.filter((att) => formikStep.values.attributes.includes(att.attribute_code));

    const [imgConfig, setImgConfig] = React.useState({
        open: false, data: {}, index: null, name: '',
    });

    const handleDropFileSingle = (files) => {
        const input = formikStep.values.single_images;
        const dataToPush = files.map((item) => ({
            binary: item.baseCode,
            types: [],
            position: input.length,
            name: item.file.name,
            size: `${item.file.size / 1000} KB`,
        }));
        formikStep.setFieldValue('single_images', input.concat(dataToPush));
    };

    const handleDropFile = (files, name, labelName) => {
        let input = [];
        if (formikStep.values[name] && formikStep.values[name][labelName]?.length) {
            input = formikStep.values[name][labelName];
        }
        const dataToPush = files.map((item) => ({
            binary: item.baseCode,
            types: [],
            position: input.length,
            name: item.file.name,
            size: `${item.file.size / 1000} KB`,
        }));
        formikStep.setFieldValue(`${name}.${labelName}`, input.concat(dataToPush));
    };

    React.useEffect(() => {
        if ((formikStep.values.price === 'unique' && formikStep.values.price_unique_attribute)
            || (formikStep.values.images === 'unique' && formikStep.values.images_unique_attribute)) {
            const temp = initialValid;
            const keyImages = `images_${formikStep.values.images_unique_attribute}`;

            const tempLabel = {};

            if (formikStep.values.price === 'unique' && formikStep.values.price_unique_attribute) {
                const keyPrice = `price_${formikStep.values.price_unique_attribute}`;
                // eslint-disable-next-line no-unused-expressions
                formikStep.values.attributes_options[formikStep.values.price_unique_attribute]?.forEach((attribute) => {
                    const keyLabel = attribute.label;
                    tempLabel[keyLabel] = Yup.number().typeError(t('productlist:Value_must_be_a_number')).required(t('productlist:This_is_a_Required_field'));
                });

                temp[keyPrice] = Yup.object().shape({
                    ...tempLabel,
                });
            }

            if (formikStep.values.images === 'unique' && formikStep.values.images_unique_attribute) {
                // eslint-disable-next-line no-unused-expressions
                formikStep.values.attributes_options[formikStep.values.images_unique_attribute]?.forEach((attribute) => {
                    const keyLabel = attribute.label;
                    tempLabel[keyLabel] = Yup.array().of(Yup.object()).min(1, t('productlist:Minimal_1_image_is_choosen'))
                        .required(t('productlist:This_is_a_Required_field'));
                });

                temp[keyImages] = Yup.object().shape({
                    ...tempLabel,
                });
            }
            setValidSchema(temp);
        } else {
            setValidSchema(initialValid);
        }
    }, [formikStep.values.price_unique_attribute, formikStep.values.price, formikStep.values.images_unique_attribute, formikStep.values.images]);

    return (
        <>
            <div style={{ marginBottom: 20 }}>
                <h2 className={classes.title}>{t('productlist:Step_3_Bulk_Images_and_Price')}</h2>
                <span>
                    {t('productlist:Based_on_your_selections_1_new_products_will_be_created_Use_this_step_to_customize_images_and_price_for_your_new_products')}
                </span>
            </div>
            <FormControl className={classes.formControl2}>
                <FormLabel component="legend" className={classes.legend}>{t('productlist:Images')}</FormLabel>
                <div className={classes.divider} />
                <RadioGroup
                    name="images"
                    className={classes.radioGroup}
                    value={formikStep.values.images}
                    onChange={formikStep.handleChange}
                >
                    <FormControlLabel value="single" control={<Radio />} label={t('productlist:Apply_single_set_of_images_to_all_SKUs')} />
                    <FormControlLabel value="unique" control={<Radio />} label={t('productlist:Apply_unique_images_by_attribute_to_each_SKU')} />
                    <FormControlLabel value="skip" control={<Radio />} label={t('productlist:Skip_image_uploading_at_this_time')} />
                </RadioGroup>
            </FormControl>
            {formikStep.values.images === 'single' ? (
                <div style={{ marginTop: 20 }}>
                    <ImageManagement
                        formik={formikStep}
                        handleDrop={handleDropFileSingle}
                        name="single_images"
                        setImgConfig={setImgConfig}
                    />
                    {formikStep.touched.single_images && formikStep.errors.single_images
                        ? (
                            <div className={classes.errorHtml}>
                                <div style={{ paddingLeft: 5 }}>{formikStep.errors?.single_images}</div>
                            </div>
                        ) : null}
                </div>
            ) : null}
            {formikStep.values.images === 'unique' ? (
                <div style={{ marginTop: 20 }}>
                    <Select
                        name="images_unique_attribute"
                        value={formikStep.values.images_unique_attribute}
                        onChange={formikStep.handleChange}
                        dataOptions={[{ attribute_code: '', frontend_label: '' }, ...attributeSelected]}
                        selectClasses={classes.fieldInputSelect}
                        formControlClasses={classes.selectControl}
                        enableEmpty={false}
                        valueToMap="attribute_code"
                        labelToMap="frontend_label"
                    />
                    <div style={{ height: 20 }} />
                    {formikStep.values.attributes_options[formikStep.values.images_unique_attribute]?.map((attribute) => (
                        <div style={{ marginBottom: 20 }}>
                            <ImageManagement
                                formik={formikStep}
                                handleDrop={(file) => handleDropFile(file, `images_${formikStep.values.images_unique_attribute}`, attribute.label)}
                                name={`images_${formikStep.values.images_unique_attribute}`}
                                labelName={attribute.label}
                                setImgConfig={setImgConfig}
                                error={!!(formikStep.errors?.[[`images_${formikStep.values.images_unique_attribute}`]]?.[attribute.label])}
                                helperText={(formikStep.errors?.[[`images_${formikStep.values.images_unique_attribute}`]]?.[attribute.label]) || ''}
                            />
                        </div>
                    ))}
                </div>
            ) : null}
            <div style={{ height: 50 }} />

            <FormControl className={classes.formControl2}>
                <FormLabel component="legend" className={classes.legend}>{t('productlist:Price')}</FormLabel>
                <div className={classes.divider} />
                <RadioGroup
                    className={classes.radioGroup}
                    name="price"
                    value={formikStep.values.price}
                    onChange={formikStep.handleChange}
                >
                    <FormControlLabel value="single" control={<Radio />} label={t('productlist:Apply_single_price_to_all_SKUs')} />
                    <FormControlLabel value="unique" control={<Radio />} label={t('productlist:Apply_unique_prices_by_attribute_to_each_SKU')} />
                    <FormControlLabel value="skip" control={<Radio />} label={t('productlist:Skip_price_at_this_time')} />
                </RadioGroup>
            </FormControl>
            {formikStep.values.price === 'single' ? (
                <div style={{ marginTop: 20 }}>
                    <div className={classes.gridAttribute}>
                        <div
                            className={classes.divLabel}
                        >
                            <span className={clsx(classes.label, classes.labelRequired)}>
                                {t('productlist:Price')}
                            </span>
                        </div>
                        <TextField
                            name="single_price"
                            variant="outlined"
                            value={formikStep.values.single_price}
                            onChange={formikStep.handleChange}
                            autoComplete="off"
                            className={classes.fieldRoot}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                            error={!!(formikStep.touched.single_price
                                && formikStep.errors.single_price)}
                            helperText={(formikStep.touched.single_price
                                && formikStep.errors.single_price) || ''}
                        />
                    </div>
                </div>
            ) : null}
            {formikStep.values.price === 'unique' ? (
                <div style={{ marginTop: 20 }}>
                    <Select
                        name="price_unique_attribute"
                        value={formikStep.values.price_unique_attribute}
                        onChange={formikStep.handleChange}
                        dataOptions={[{ attribute_code: '', frontend_label: '' }, ...attributeSelected]}
                        selectClasses={classes.fieldInputSelect}
                        formControlClasses={classes.selectControl}
                        enableEmpty={false}
                        valueToMap="attribute_code"
                        labelToMap="frontend_label"
                    />
                    <div style={{ height: 20 }} />
                    {formikStep.values.attributes_options[formikStep.values.price_unique_attribute]?.map((attribute) => (
                        <div style={{ marginBottom: 20 }}>
                            <div className={classes.attLabelGridText}>
                                <div className={classes.attLabel}>{attribute.label}</div>
                                <TextField
                                    name={`price_${formikStep.values.price_unique_attribute}.${attribute.label}`}
                                    variant="outlined"
                                    value={formikStep.values[`price_${formikStep.values.price_unique_attribute}`]
                                        && formikStep.values[`price_${formikStep.values.price_unique_attribute}`][attribute.label]}
                                    onChange={formikStep.handleChange}
                                    autoComplete="off"
                                    className={classes.fieldRoot}
                                    InputProps={{
                                        className: classes.fieldInput,
                                    }}
                                    error={!!(formikStep.errors?.[[`price_${formikStep.values.price_unique_attribute}`]]?.[attribute.label])}
                                    helperText={(formikStep.errors?.[[`price_${formikStep.values.price_unique_attribute}`]]?.[attribute.label]) || ''}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            ) : null}
            <div style={{ height: 50 }} />
            {imgConfig.open
                && <ImageConfig imgConfig={imgConfig} setImgConfig={setImgConfig} t={t} formik={formikStep} />}
        </>
    );
};

export default StepContent;
