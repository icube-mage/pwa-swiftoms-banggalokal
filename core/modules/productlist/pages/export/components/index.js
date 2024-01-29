import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import useStyles from '@modules/productlist/pages/export/components/style';
import TextField from '@common_textfield';
import Autocomplete from '@common_autocomplete';
import DeleteIcon from '@material-ui/icons/Delete';
import { dataTypeOptions } from '@modules/productlist/helpers';

const ProductExport = (props) => {
    const {
        formik, optionsData = [],
        t,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const optionsMapped = optionsData.map((opt) => ({ label: opt, value: opt }));

    return (
        <>
            <Button className={classes.btnBack} onClick={() => router.push('/product/productlist')} variant="contained" style={{ marginRight: 16 }}>
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
            <h2 className={classes.titleTop}>{t('productlist:Product_Export')}</h2>
            <Paper className={classes.container}>
                <div className={classes.formFieldGrid}>
                    <span className={clsx(classes.textAttach, classes.label)}>
                        {t('productlist:Data_Type')}
                        {' '}
                        :
                    </span>
                    <Autocomplete
                        name="data_type"
                        value={dataTypeOptions.find((opt) => opt.value === formik.values.data_type)}
                        className={classes.autocompleteRootType}
                        onChange={(e) => {
                            formik.setFieldValue('data_type', e?.value || '');
                        }}
                        options={dataTypeOptions}
                        primaryKey="value"
                        labelKey="label"
                        disableClearable
                    />
                </div>
                {formik.values.data_type !== 'extra'
                    && (
                        <>
                            <span className={clsx(classes.textAttach, classes.label)}>{t('productlist:Select_product_attributes_')}</span>
                            <div className={classes.content}>
                                <table className={classes.table}>
                                    <thead>
                                        <tr>
                                            <th>{t('productlist:System_Attribute')}</th>
                                            <th>{t('productlist:Export_Attribute')}</th>
                                            <th>{t('productlist:Default_Value')}</th>
                                            <th style={{ textAlign: 'center', width: 'fit-content' }}>{t('productlist:Action')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {formik.values.input?.map((row, idx) => (
                                            <tr key={idx}>
                                                <td>
                                                    <Autocomplete
                                                        name={`input[${idx}].source_data_system`}
                                                        value={optionsMapped.find((opt) => opt.value === formik.values.input[idx].source_data_system)}
                                                        className={classes.autocompleteRoot}
                                                        onChange={(e) => {
                                                            formik.setFieldValue(`input[${idx}].source_data_system`, e?.value || '');
                                                            formik.setFieldValue(`input[${idx}].source_data_export`, e?.value || '');
                                                        }}
                                                        onBlur={formik.handleBlur}
                                                        options={optionsMapped}
                                                        primaryKey="label"
                                                        labelKey="value"
                                                        error={!!(formik.touched?.input?.length && formik.touched?.input[idx]?.source_data_system
                                                        && formik.errors?.input?.length && formik.errors?.input[idx]?.source_data_system)}
                                                        helperText={(formik.touched?.input?.length && formik.touched?.input[idx]?.source_data_system
                                                        && formik.errors?.input?.length && formik.errors?.input[idx]?.source_data_system) || ''}
                                                    />
                                                </td>
                                                <td>
                                                    <TextField
                                                        variant="outlined"
                                                        name={`input[${idx}].source_data_export`}
                                                        value={formik.values.input[idx].source_data_export}
                                                        className={classes.tableInputRoot}
                                                        InputProps={{
                                                            className: classes.tableInput,
                                                        }}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        error={!!(formik.touched?.input?.length && formik.touched?.input[idx]?.source_data_export
                                                        && formik.errors?.input?.length && formik.errors?.input[idx]?.source_data_export)}
                                                        helperText={(formik.touched?.input?.length && formik.touched?.input[idx]?.source_data_export
                                                        && formik.errors?.input?.length && formik.errors?.input[idx]?.source_data_export) || ''}
                                                    />
                                                </td>
                                                <td>
                                                    <TextField
                                                        variant="outlined"
                                                        name={`input[${idx}].source_data_replace`}
                                                        value={formik.values.input[idx].source_data_replace}
                                                        className={classes.tableInputRoot}
                                                        InputProps={{
                                                            className: classes.tableInput,
                                                        }}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                    />
                                                </td>
                                                <td style={{ textAlign: 'center', width: 'fit-content' }}>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const newValue = [...formik.values.input];
                                                            newValue.splice(idx, 1);
                                                            formik.setFieldValue('input', newValue);
                                                        }}
                                                        style={{
                                                            cursor: 'pointer',
                                                            background: 'none',
                                                            border: 'none',
                                                            color: '#BE1F93',
                                                        }}
                                                        className="link-button"
                                                    >
                                                        <DeleteIcon />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan="3">
                                                <Button
                                                    className={classes.btn}
                                                    onClick={() => {
                                                        if (!formik.errors?.input?.length) {
                                                            formik.setFieldValue('input', [
                                                                ...formik.values.input, {
                                                                    source_data_export: '',
                                                                    source_data_replace: '',
                                                                    source_data_system: '',
                                                                },
                                                            ]);
                                                        }
                                                    }}
                                                    variant="contained"
                                                    buttonType="primary-rounded"
                                                >
                                                    {t('productlist:Add')}
                                                </Button>
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </>
                    )}
                <div className={classes.formFieldButton}>
                    <Button
                        className={classes.btn}
                        onClick={formik.handleSubmit}
                        variant="contained"
                        buttonType="primary-rounded"
                    >
                        {formik.values.data_type === 'extra'
                            ? t('productlist:Download_CSV')
                            : t('productlist:Save_and_Download_CSV')}
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default ProductExport;
