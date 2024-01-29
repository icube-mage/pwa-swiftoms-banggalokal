/* eslint-disable no-unused-vars */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import Autocomplete from '@common_autocomplete';
import { optionsStatus, optionsExport } from '@modules/exportorder/helpers';
import clsx from 'clsx';
import useStyles from '@modules/exportorder/pages/default/components/style';

const ExportOrderContent = (props) => {
    const {
        formik,
        t,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <h2 className={classes.titleTop}>{t('exportorder:Export_Order')}</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('exportorder:Date_From')}</span>
                        </div>
                        <TextField
                            type="date"
                            variant="outlined"
                            name="fromDate"
                            value={formik.values.fromDate}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.fromDate && formik.errors.fromDate)}
                            helperText={(formik.touched.fromDate && formik.errors.fromDate) || ''}
                            className={clsx(classes.fieldRoot, 'field-date')}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('exportorder:Date_To')}</span>
                        </div>
                        <TextField
                            type="date"
                            variant="outlined"
                            name="toDate"
                            value={formik.values.toDate}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.toDate && formik.errors.toDate)}
                            helperText={(formik.touched.toDate && formik.errors.toDate) || ''}
                            className={clsx(classes.fieldRoot, 'field-date')}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('exportorder:Export_To')}</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            value={formik.values.exportFile}
                            onChange={(e) => formik.setFieldValue('exportFile', e)}
                            options={optionsExport}
                            error={!!(formik.touched.exportFile && formik.errors.exportFile)}
                            helperText={(formik.touched.exportFile && formik.errors.exportFile) || ''}
                            primaryKey="id"
                            labelKey="name"
                        />
                    </div>
                    {(formik.values.exportFile && formik.values.exportFile.id) !== 'pdf' && (
                        <div className={classes.formField}>
                            <div className={classes.divLabel}>
                                <span className={classes.label}>{t('exportorder:Status')}</span>
                            </div>
                            <Autocomplete
                                className={classes.autocompleteRoot}
                                value={formik.values.status}
                                onChange={(e) => formik.setFieldValue('status', e)}
                                options={optionsStatus}
                                error={!!(formik.touched.status && formik.errors.status)}
                                helperText={(formik.touched.status && formik.errors.status) || ''}
                                primaryKey="id"
                                labelKey="name"
                            />
                        </div>
                    )}
                </div>
                <div className={classes.formFieldButton}>
                    <Button
                        className={classes.btn}
                        onClick={formik.handleSubmit}
                        variant="contained"
                    >
                        {t('exportorder:Submit')}
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default ExportOrderContent;
