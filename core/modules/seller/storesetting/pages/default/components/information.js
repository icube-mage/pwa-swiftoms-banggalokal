/* eslint-disable no-param-reassign */
import React from 'react';
import clsx from 'clsx';
import classNames from 'classnames';

import DropFile from '@sellermodules/storesetting/pages/default/components/DropFile';

import TextField from '@common_textfield';
import Switch from '@common_switch';
import Button from '@common_button';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';

import { breakPointsUp } from '@helper_theme';
import useStyles from '@sellermodules/storesetting/pages/default/components/style';

const StoreInformationContent = (props) => {
    const {
        t, formik, handleDropFile,
    } = props;
    const classes = useStyles();
    const isDesktop = breakPointsUp('sm');

    return (
        <>
            <Paper className={classes.container}>
                <Grid container spacing={isDesktop ? 6 : 0}>
                    <Grid item xs={12} sm={6}>
                        <h2 className={classes.title}>{t('storesetting:Store_Information')}</h2>
                        <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                            <InputLabel htmlFor="name" className={classNames(classes.label, classes.required)}>
                                {t('storesetting:Store_Name')}
                            </InputLabel>
                            <TextField
                                id="name"
                                name="name"
                                className={classes.textInput}
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={!!(formik.touched.name && formik.errors.name)}
                                helperText={(formik.touched.name && formik.errors.name) || ''}
                            />
                        </div>
                        <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                            <InputLabel htmlFor="description" className={classes.label}>
                                {t('storesetting:Store_Description')}
                            </InputLabel>
                            <TextField
                                id="description"
                                name="description"
                                className={classes.textInput}
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                error={!!(formik.touched.description && formik.errors.description)}
                                helperText={(formik.touched.description && formik.errors.description) || ''}
                                multiline
                                minRows={4}
                                maxRows={4}
                            />
                        </div>
                        <div className={classes.helper}>
                            {t('storesetting:This_information_is_only_for_the_purposes_of_the_')}
                            <span className={classes.colored}>{t('storesetting:Store_Page')}</span>
                            <br />
                            {`(${t('storesetting:Monday')} 08.00 - 17.00 - ${t('storesetting:Friday')} 08.00 - 17.00)`}
                        </div>
                        <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                            <InputLabel htmlFor="status" className={classes.label}>
                                {t('storesetting:Store_Status')}
                            </InputLabel>
                            <Switch
                                id="status"
                                name="status"
                                value={formik.values.status}
                                onChange={formik.handleChange}
                                trueLabel={t('storesetting:Activate')}
                                falseLabel={t('storesetting:Deactivate')}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <h2 className={classes.title}>{t('storesetting:Store_Logo')}</h2>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={4} style={{ display: 'flex', justifyContent: 'center' }}>
                                <div
                                    className={classes.imgBack}
                                    style={{
                                        backgroundImage: `url(${formik.values.logo || '/assets/img/placeholder_image.jpg'})`,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={7}>
                                <div className={classes.helper}>
                                    {t('storesetting:Minimum_photo_size')}
                                    {' '}
                                    <span className={classes.colored}>500 x 500px</span>
                                    {' '}
                                    {t('storesetting:with_format')}
                                    {' '}
                                    <span className={classes.colored}>JPG, JPEG,</span>
                                    {' '}
                                    {t('storesetting:and')}
                                    {' '}
                                    <span className={classes.colored}>PNG.</span>
                                    {' '}
                                    {t('storesetting:File_size')}
                                    {' '}
                                    <span className={classes.colored}>{`${t('storesetting:Maximum')} 10,000,000 bytes `}</span>
                                    (10 Megabytes).
                                </div>
                                <DropFile
                                    getBase64={handleDropFile}
                                    {...props}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
            <Grid container className={classes.btnContainer}>
                <Grid item xs={12} sm={6} md={4}>
                    <Button
                        variant="contained"
                        className={classes.btnSave}
                        onClick={formik.handleSubmit}
                    >
                        <span className={classes.btnText}>
                            {t('registerseller:Save')}
                        </span>
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default StoreInformationContent;
