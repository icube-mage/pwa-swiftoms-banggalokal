/* eslint-disable max-len */
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';

import Button from '@common_button';
import TextField from '@common_textfield';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from '@modules/productlist/plugins/productconfigurable/style';

import gqlService from '@modules/productlist/services/graphql';

const StepContent = (props) => {
    const {
        formikStep,
        t,
        setDataState,
        loading,
    } = props;
    const { loading: loadingAtt, data: dataAtt, refetch } = gqlService.getConfigurableAttributeByIds({
        variables: { attribute_ids: formikStep.values.attributes_ids },
        skip: !formikStep.values.attributes_ids?.length,
        onCompleted: (res) => {
            setDataState(res.getConfigurableAttributeByIds);
        },
    });
    const classes = useStyles();
    const attributeSelected = dataAtt?.getConfigurableAttributeByIds || [];

    const [createAttributeOptions] = gqlService.createAttributeOptions();
    const [loadingState, setLoadingState] = React.useState(false);
    const [loadingStateSpec, setLoadingStateSpec] = React.useState(null);
    const [addMode, setAddMode] = React.useState(false);

    const formikAttribute = useFormik({
        initialValues: {
            attribute_code: '',
        },
        validationSchema: Yup.object().shape({
            attribute_code: Yup.string().required(t('productlist:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            setLoadingState(true);
            createAttributeOptions({
                variables: {
                    attribute_code: values.attribute_code,
                    input: [
                        {
                            label: values[`input_${values.attribute_code}`],
                        },
                    ],
                },
            }).then(async () => {
                refetch();
                setAddMode(false);
                setLoadingState(false);
            }).catch((e) => {
                setAddMode(false);
                setLoadingState(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
        },
    });

    const onSubmitCreateAttributes = async () => {
        await formikAttribute.setFieldValue('attribute_code', addMode);
        formikAttribute.handleSubmit();
    };

    const handleChange = (option, attribute) => {
        const temp = [...formikStep.values.attributes_options[attribute.attribute_code]];
        const idxSelect = formikStep.values.attributes_options[attribute.attribute_code]?.findIndex((opt) => opt.value === option.value);

        if (idxSelect !== -1) {
            temp.splice(idxSelect, 1);
            formikStep.setFieldValue(`attributes_options[${attribute.attribute_code}]`, temp);
        } else {
            temp.push(option);
            formikStep.setFieldValue(`attributes_options[${attribute.attribute_code}]`, temp);
        }
    };

    const handleDelete = (attribute) => {
        const temp = formikStep.values.attributes.filter((v) => v !== attribute.attribute_code);
        formikStep.setFieldValue('attributes', temp);

        const tempId = formikStep.values.attributes_ids.filter((v) => v !== attribute.attribute_id);
        formikStep.setFieldValue('attributes_ids', tempId);

        const tempOpt = formikStep.values.attributes_options;
        delete tempOpt[attribute.attribute_code];
        formikStep.setFieldValue('attributes_options', tempOpt);
    };

    const selectAll = (attribute, i) => {
        setLoadingStateSpec(i);
        formikStep.setFieldValue(`attributes_options.${attribute.attribute_code}`, attribute.attribute_options.filter((att) => att.value));
        setTimeout(() => setLoadingStateSpec(null), 1);
    };

    const deselectAll = (attribute) => {
        formikStep.setFieldValue(`attributes_options.${attribute.attribute_code}`, []);
    };

    return (
        loading || loadingState || loadingAtt ? <div className={classes.circular}><CircularProgress size={80} /></div>
            : (
                <>
                    <div style={{ marginBottom: 20 }}>
                        <h2 className={classes.title}>{t('productlist:Step_2_Attribute_Values')}</h2>
                        <span>
                            {t('productlist:Select_values_from_each_attribute_to_include_in_this_product')}
                            {t('productlist:Each_unique_combination_of_values_creates_a_unique_product_SKU')}
                        </span>
                    </div>
                    <div className={classes.formControl}>
                        {attributeSelected?.map((attribute, i) => (
                            <FormControl variant="standard">
                                <FormLabel component="legend">
                                    <div>
                                        <div>
                                            <span className={classes.attributeTitle}>{attribute.frontend_label}</span>
                                            {' '}
                                            <span className={classes.attributeValues}>
                                                {`(${attribute.attribute_options?.filter((option) => option.value !== '')?.length} Options)`}
                                            </span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                                            <Button
                                                color="inherit"
                                                buttonType="link"
                                                onClick={() => selectAll(attribute, i)}
                                            >
                                                {t('productlist:Select_All')}
                                            </Button>
                                            <Button
                                                color="inherit"
                                                buttonType="link"
                                                onClick={() => deselectAll(attribute)}
                                            >
                                                {t('productlist:Deselect_All')}
                                            </Button>
                                            <IconButton
                                                edge="end"
                                                onClick={() => handleDelete(attribute)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </div>
                                    </div>
                                </FormLabel>
                                <FormGroup className={classes.formGroup}>
                                    {loadingStateSpec === i
                                        ? null
                                        : attribute.attribute_options?.filter((option) => option.value !== '').map((option) => (
                                            <FormControlLabel
                                                control={(
                                                    <Checkbox
                                                        checked={formikStep.values.attributes_options[attribute.attribute_code]?.find((opt) => opt.value === option.value)}
                                                        onChange={() => handleChange(option, attribute, i)}
                                                    />
                                                )}
                                                label={option.label}
                                            />
                                        ))}
                                </FormGroup>
                                {addMode === attribute.attribute_code
                                    ? (
                                        <div className={classes.addField}>
                                            <TextField
                                                name={`input_${attribute.attribute_code}`}
                                                variant="outlined"
                                                value={formikAttribute.values[`input_${attribute.attribute_code}`]}
                                                onChange={formikAttribute.handleChange}
                                                autoComplete="off"
                                                className={classes.fieldRoot}
                                                InputProps={{
                                                    className: classes.fieldInputAdd,
                                                }}
                                            />
                                            <Button
                                                color="inherit"
                                                buttonType="buttonText"
                                                onClick={onSubmitCreateAttributes}
                                            >
                                                {t('productlist:Save')}
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button
                                            color="inherit"
                                            buttonType="buttonText"
                                            onClick={() => setAddMode(attribute.attribute_code)}
                                        >
                                            {t('productlist:Create_New_Value')}
                                        </Button>
                                    )}
                            </FormControl>
                        ))}
                    </div>
                </>
            )
    );
};

export default StepContent;
