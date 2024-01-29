/* eslint-disable react/no-danger */
/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import React from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';

import TextField from '@common_textfield';
import Button from '@common_button';
import useStyles from '@modules/configurationemailtemplate/pages/edit/components/style';

import Paper from '@material-ui/core/Paper';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const EmailFormContent = (props) => {
    const {
        t, formik, template,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Button className={classes.btnBack} onClick={() => router.push('/configurations/emailtemplates')} variant="contained" style={{ marginRight: 16 }}>
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
            <h2 className={classes.titleTop}>{t('emailtemplatesconfiguration:Edit_Template')}</h2>
            <Paper className={classes.container}>
                <div className={classes.contentWithoutBorder}>
                    <h5 className={classes.titleSmall}>{t('emailtemplatesconfiguration:Template_Information')}</h5>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('emailtemplatesconfiguration:Template_Name')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="template_code"
                            value={formik.values.template_code}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.template_code && formik.errors.template_code)}
                            helperText={(formik.touched.template_code && formik.errors.template_code) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('emailtemplatesconfiguration:Template_Subject')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="template_subject"
                            value={formik.values.template_subject}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.template_subject && formik.errors.template_subject)}
                            helperText={(formik.touched.template_subject && formik.errors.template_subject) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    {/* <div className={classes.formFieldButton}>
                        <div className={classes.divLabel} />
                        <Button className={classes.btn} onClick={() => { }} variant="contained">
                            {`${t('emailtemplatesconfiguration:Insert_Variable')}...`}
                        </Button>
                    </div> */}
                    <div className={clsx(classes.formField, 'top')}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('emailtemplatesconfiguration:Template_Content')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="template_text"
                            value={formik.values.template_text}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.template_text && formik.errors.template_text)}
                            helperText={(formik.touched.template_text && formik.errors.template_text) || ''}
                            InputProps={{
                                className: classes.fieldInputMultiline,
                            }}
                            multiline
                            rows={20}
                        />
                    </div>
                    <div className={clsx(classes.formField, 'top')}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('emailtemplatesconfiguration:Template_Styles')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="template_styles"
                            value={formik.values.template_styles}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.template_styles && formik.errors.template_styles)}
                            helperText={(formik.touched.template_styles && formik.errors.template_styles) || ''}
                            InputProps={{
                                className: classes.fieldInputMultiline,
                            }}
                            multiline
                            minRows={1}
                            maxRows={10}
                        />
                    </div>
                </div>
            </Paper>
            <div className={classes.buttonContainer}>
                <Button
                    className={clsx(classes.btn, 'link')}
                    onClick={() => window.open(`${window.location.origin}/configurations/emailtemplates/preview/${template.template_id}`)}
                    buttonType="outlined-rounded"
                >
                    {t('emailtemplatesconfiguration:Preview')}
                </Button>
                <Button className={classes.btn} onClick={formik.handleSubmit} variant="contained">
                    {t('emailtemplatesconfiguration:Submit')}
                </Button>
            </div>
        </>
    );
};

export default EmailFormContent;
