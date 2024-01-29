/* eslint-disable no-param-reassign */
import React from 'react';
import clsx from 'clsx';
import classNames from 'classnames';

import DropFile from '@sellermodules/storesetting/pages/default/components/DropFile';

import TextField from '@common_textfield';
import Button from '@common_button';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';

import { breakPointsUp } from '@helper_theme';
import useStyles from '@sellermodules/storesetting/pages/default/components/style';

const StoreInformationContent = (props) => {
    const {
        t, formik, handleDropFile, limitSizeConfig,
    } = props;
    const classes = useStyles();
    const isDesktop = breakPointsUp('sm');

    const { limit_size_image } = limitSizeConfig;

    return (
        <>
            <Paper className={classes.container}>
                <Grid container spacing={isDesktop ? 6 : 0} className={classes.gridMainContainer}>
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
                                    {t('storesetting:Maximum_photo_size_is')}
                                    {' '}
                                    <span className={classes.colored}>{`${limit_size_image} Megabytes`}</span>
                                    {' '}
                                    {t('storesetting:with_format')}
                                    {' '}
                                    <span className={classes.colored}>JPG, JPEG,</span>
                                    {' '}
                                    {t('storesetting:and')}
                                    {' '}
                                    <span className={classes.colored}>PNG.</span>
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
