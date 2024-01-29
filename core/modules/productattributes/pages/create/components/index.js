/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import Autocomplete from '@common_autocomplete';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import useStyles from '@modules/productattributes/pages/create/components/style';
import { optionsType } from '@modules/productattributes/helpers';

const ProductAttributesContent = (props) => {
    const {
        formik, t,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Button className={classes.btnBack} onClick={() => router.push('/product/productattributes')} variant="contained" style={{ marginRight: 16 }}>
                <ChevronLeftIcon
                    style={{
                        fontSize: 30,
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                />
            </Button>
            <h2 className={classes.titleTop}>{t('productattributes:New_Product_Attribute')}</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <h5 className={classes.titleSmall}>{t('productattributes:Attribute_Properties')}</h5>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('productattributes:Default_Label')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="frontend_label"
                            value={formik.values.frontend_label}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.frontend_label && formik.errors.frontend_label)}
                            helperText={(formik.touched.frontend_label && formik.errors.frontend_label) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('productattributes:Input_Type')}</span>
                        </div>
                        <Autocomplete
                            disabled
                            className={classes.autocompleteRoot}
                            value={formik.values.frontend_input}
                            onChange={(e) => formik.setFieldValue('frontend_input', e)}
                            options={optionsType}
                            error={!!(formik.touched.frontend_input && formik.errors.frontend_input)}
                            helperText={(formik.touched.frontend_input && formik.errors.frontend_input) || ''}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('productattributes:Attribute_Code')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="attribute_code"
                            value={formik.values.attribute_code}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.attribute_code && formik.errors.attribute_code)}
                            helperText={(formik.touched.attribute_code && formik.errors.attribute_code) || t("productattributes:This_is_used_internally_Make_sure_you_don't_use_spaces_or_more_than_60_symbols")}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                </div>
            </Paper>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <h5 className={classes.titleSmall}>{t('productattributes:Manage_Options_Values_of_Your_Attribute')}</h5>
                    <table className={classes.table}>
                        <thead>
                            <tr>
                                <th><span className={classes.label}>{t('productattributes:Label')}</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {formik.values.attribute_options?.length > 0
                                && formik.values.attribute_options?.map((row, idx) => (
                                    <tr key={`key[${idx}]`}>
                                        <td key={idx}>
                                            <TextField
                                                className={classes.fieldRoot}
                                                variant="outlined"
                                                name={`attribute_options[${idx}].label`}
                                                value={row.label}
                                                InputProps={{
                                                    className: classes.fieldInput,
                                                }}
                                                onChange={formik.handleChange}
                                            />
                                        </td>
                                        <td>
                                            <img
                                                src="/assets/img/trash.svg"
                                                alt={t('productattributes:Delete')}
                                                style={{
                                                    height: 15, width: 'auto', cursor: 'pointer',
                                                }}
                                                onClick={() => {
                                                    const newValue = [...formik.values.attribute_options];
                                                    newValue.splice(idx, 1);
                                                    formik.setFieldValue('attribute_options', newValue);
                                                }}
                                            />
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="2">
                                    <Button
                                        className={classes.btn}
                                        onClick={() => formik.setFieldValue('attribute_options', [
                                            ...formik.values.attribute_options,
                                            { label: '' },
                                        ])}
                                        variant="contained"
                                    >
                                        {t('productattributes:Add_Option')}
                                    </Button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </Paper>
            <div className={classes.formFieldButton}>
                <Button className={classes.btn} onClick={formik.handleSubmit} variant="contained">
                    {t('productattributes:Submit')}
                </Button>
            </div>
        </>
    );
};

export default ProductAttributesContent;
