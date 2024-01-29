/* eslint-disable no-case-declarations */
/* eslint-disable array-callback-return */
/* eslint-disable no-nested-ternary */
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Box from '@material-ui/core/Box';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import Button from '@common_button';
import Step1 from '@modules/productlist/plugins/productconfigurable/components/steps/step1';
import Step2 from '@modules/productlist/plugins/productconfigurable/components/steps/step2';
import Step3 from '@modules/productlist/plugins/productconfigurable/components/steps/step3';
import Step4 from '@modules/productlist/plugins/productconfigurable/components/steps/step4';

import gqlService from '@modules/productlist/services/graphql';
import useStyles from '@modules/productlist/plugins/productconfigurable/style';
import React from 'react';

const StepperContent = (props) => {
    const {
        t, onCancel, dataAttributes, formik, loading,
    } = props;
    const classes = useStyles();

    // eslint-disable-next-line prefer-const
    const [dataState, setDataState] = React.useState(dataAttributes);

    const isExist = !!formik.values.existing_config?.attributes?.length;
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = [t('productlist:Select_Attributes'),
        t('productlist:Attribute_Values'), t('productlist:Bulk_Images__Price'), t('productlist:Summary')];

    const [generatedData, setGeneratedData] = React.useState([]);

    const initialValid = {
        single_images: Yup.array().of(Yup.object()).when('images', {
            is: (v) => v === 'single',
            then: Yup.array().of(Yup.object()).min(1, t('productlist:Minimal_1_image_is_choosen'))
                .required(t('productlist:This_is_a_Required_field')),
            otherwise: Yup.array().of(Yup.object()),
        }),
        single_price: Yup.number().nullable().when('price', {
            is: (v) => v === 'single',
            then: Yup.number().typeError(t('productlist:Value_must_be_a_number')).required(t('productlist:This_is_a_Required_field')),
            otherwise: Yup.number().nullable(),
        }),
    };
    const [validSchema, setValidSchema] = React.useState(initialValid);
    const handleNext = () => {
        if (activeStep < 3) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const formikStep = useFormik({
        initialValues: isExist ? {
            ...formik.values.existing_config,
            single_price: Number(formik.values.existing_config.single_price) || null,
        } : {
            attributes: [],
            attributes_label: [],
            attributes_ids: [],
            attributes_options: [],
            images: 'skip',
            price: 'skip',
            single_images: [],
            single_price: null,
        },
        validationSchema: Yup.object().shape({
            ...validSchema,
        }),
        onSubmit: (values) => {
            const attributes = values.attributes_options;
            const attributesMapped = [];
            const attributesKeyMapped = Object.keys(attributes);
            attributesKeyMapped.forEach((o) => attributesMapped.push(attributes[o].map((att) => att.label)));

            const combined = [];
            const max = attributesMapped.length - 1;
            function helper(arr, i) {
                // eslint-disable-next-line no-plusplus
                for (let j = 0, l = attributesMapped[i].length; j < l; j++) {
                    const a = arr.slice(0); // clone arr
                    a.push(attributesMapped[i][j]);
                    if (i === max) { combined.push(a); } else { helper(a, i + 1); }
                }
            }
            helper([], 0);

            const result = combined.map((el, i) => {
                const sku = `${formik.values.sku}-${el.join('-')}`;
                const tempAtt = [];
                attributesKeyMapped.map((code, idx) => {
                    tempAtt.push([code, el[idx]]);
                });
                const attObj = Object.fromEntries(tempAtt);
                const productExist = formik.values.configurable?.product_configurable
                    ?.find((pc) => pc.attributesCombined.sort().join(',') === el.sort().join(',')) || {};
                let returnObj = {
                    id: productExist?.id || i,
                    name: productExist.name || `${formik.values.name}-${el.join('-')}`,
                    status: 1,
                    ...attObj,
                    isExist: false,
                    isAssociated: false,
                    isIdExist: !!productExist?.id,
                    attributesCombined: el,
                };

                const switchKey = (key) => {
                    switch (values[key]) {
                    case 'skip':
                        const res = formik.values.configurable?.product_configurable?.find((pc) => pc.sku === returnObj.sku);
                        if (res) {
                            return res[key];
                        }
                        return null;
                    case 'single':
                        return values[`single_${key}`];
                    case 'unique':
                        const attribute = values[`${key}_unique_attribute`];
                        if (!attribute) {
                            return [];
                        }
                        let resultImage = [];
                        Object.keys(values[`${key}_${attribute}`]).map((v) => {
                            if (el.includes(v)) {
                                resultImage = values[`${key}_${attribute}`][v];
                            }
                        });
                        if (resultImage.length) return resultImage;
                        return null;
                    default:
                        return null;
                    }
                };

                // eslint-disable-next-line no-prototype-builtins
                if (productExist.hasOwnProperty('sku')) {
                    returnObj = {
                        ...productExist,
                        ...returnObj,
                    };
                    returnObj.price = switchKey('price') || productExist.price;
                    returnObj.images = switchKey('images') || productExist.images;
                    returnObj.weight = productExist.weight || (formik.values.weight || '');
                } else {
                    returnObj.sku = sku;
                    returnObj.price = switchKey('price');
                    returnObj.images = switchKey('images');
                    returnObj.weight = formik.values.weight || '';
                }
                const temp = [];
                dataState.forEach((att) => {
                    // eslint-disable-next-line no-prototype-builtins
                    if (returnObj.hasOwnProperty(att.attribute_code)) {
                        temp.push(`${att.frontend_label}: ${returnObj[att.attribute_code]}`);
                    }
                });
                returnObj.attributes_frontend = temp.join(', ');
                return returnObj;
            });
            formik.setFieldValue('existing_config', values);
            setGeneratedData(result);
            handleNext();
        },
    });

    const stepComponents = () => {
        switch (activeStep) {
        case 0:
            return (
                <Step1
                    {...props}
                    dataState={dataState}
                    setDataState={setDataState}
                    formikStep={formikStep}
                />
            );
        case 1:
            return (
                <Step2
                    {...props}
                    dataState={dataState}
                    setDataState={setDataState}
                    formikStep={formikStep}
                />
            );
        case 2:
            return (
                <Step3
                    {...props}
                    dataState={dataState}
                    formikStep={formikStep}
                    validSchema={validSchema}
                    setValidSchema={setValidSchema}
                    initialValid={initialValid}
                />
            );
        case 3:
            return (
                <Step4
                    {...props}
                    dataState={dataState}
                    generatedData={generatedData}
                    formikStep={formikStep}
                />
            );
        default:
            return false;
        }
    };

    const handleGenerate = () => {
        formik.setFieldValue('configurable.product_configurable', generatedData);
        formik.setFieldValue('configurable.selected_attribute', dataState);
        formik.setFieldValue('configurable.associated_product_ids', []);
        onCancel();
    };

    const handleNextStep = () => {
        switch (activeStep) {
        case 2:
            formikStep.handleSubmit();
            break;
        case 3:
            handleGenerate();
            break;
        default:
            handleNext();
            break;
        }
    };

    const checkStepRequired = () => {
        switch (activeStep) {
        case 0:
            return !!formikStep.values.attributes?.length;
        case 1:
            const optionsLength = [];
            const keys = Object.keys(formikStep.values.attributes_options);
            keys.forEach((key) => {
                optionsLength.push(formikStep.values.attributes_options[key].length);
            });
            return optionsLength.every((opt) => opt > 0);
        case 2:
        case 3:
            return true;
        default:
            return false;
        }
    };

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((label, index) => (
                        <Step key={index}>
                            <StepLabel>
                                {label}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <>
                    <Box sx={{
                        display: 'flex', flexDirection: 'row', pt: 2, mb: 2, justifyContent: 'end',
                    }}
                    >
                        <Button
                            color="inherit"
                            buttonType="link"
                            onClick={() => { onCancel(); formikStep.resetForm(); }}
                        >
                            {t('productlist:Cancel')}
                        </Button>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            style={{ marginRight: 10 }}
                            buttonType="outlined-rounded"
                        >
                            {t('productlist:Back')}
                        </Button>
                        <Box />
                        <Button
                            disabled={!checkStepRequired() || loading}
                            onClick={handleNextStep}
                            buttonType="primary-rounded"
                        >
                            {activeStep === 3 ? t('productlist:Generate_Products') : t('productlist:Next')}
                        </Button>
                    </Box>
                </>
            </Box>
            {stepComponents()}
        </>
    );
};

const StepperCore = (props) => {
    const [getConfigurableAttributes, { data, loading, refetch: refetchConfigAttributes }] = gqlService.getConfigurableAttributes();
    return (
        <StepperContent
            dataAttributes={data?.getConfigurableAttributes?.items || []}
            getConfigurableAttributes={getConfigurableAttributes}
            data={data}
            loading={loading}
            refetchConfigAttributes={refetchConfigAttributes}
            {...props}
        />
    );
};

export default StepperCore;
