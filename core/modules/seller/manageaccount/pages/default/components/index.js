/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import clsx from 'clsx';
import classNames from 'classnames';

import DropFile from '@sellermodules/manageaccount/pages/default/components/DropFile';

import TextField from '@common_textfield';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@common_button';
import Chip from '@material-ui/core/Chip';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';

import { breakPointsUp } from '@helper_theme';
import useStyles from '@sellermodules/manageaccount/pages/default/components/style';
import GetScore from '@helper_passwordstrength';

const ManageAccount = (props) => {
    const {
        t, formik, handleDropFile, userLocation,
    } = props;
    const classes = useStyles();
    const isDesktop = breakPointsUp('sm');

    const [changeEmail, setChangeEmail] = useState(false);
    const [changePassword, setChangePassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(t('selleraccount:No_Password'));
    const [passwordError, setPasswordError] = useState('');

    const handleEmailField = (event) => {
        setChangeEmail(event.target.checked);
        formik.setFieldValue('changeEmail', !formik.values.changeEmail);
    };

    const handlePasswordField = (event) => {
        setChangePassword(event.target.checked);
        formik.setFieldValue('changePassword', !formik.values.changePassword);
    };

    const handleNewPassword = (event) => {
        setPasswordError('');

        const score = GetScore(event.target.value);

        setPasswordStrength(score.status);
        if (score.status === t('selleraccount:No_Password') || score.status === 'Weak') {
            setPasswordError(score.message);
        }
    };

    return (
        <div style={{ paddingBottom: 10 }}>
            <Paper className={classes.container}>
                <Grid container spacing={isDesktop ? 6 : 0}>
                    <Grid item xs={12} sm={6}>
                        <h2 className={classes.title}>{t('selleraccount:Account_Information')}</h2>
                        <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                            <InputLabel htmlFor="firstname" className={classNames(classes.label, classes.required)}>
                                {t('selleraccount:Name')}
                            </InputLabel>
                            <TextField
                                id="firstname"
                                name="firstname"
                                className={classes.textInput}
                                value={formik.values.firstname}
                                onChange={formik.handleChange}
                                error={!!(formik.touched.firstname && formik.errors.firstname)}
                                helperText={(formik.touched.firstname && formik.errors.firstname) || ''}
                            />
                        </div>
                        <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                            <InputLabel htmlFor="customer_loc_code" className={classes.label}>
                                {t('selleraccount:Location_Assigned')}
                            </InputLabel>
                            <TextField
                                disabled
                                id="customer_loc_code"
                                name="customer_loc_code"
                                className={classes.textInput}
                                value={userLocation.toString()}
                                multiline
                            />
                        </div>
                        <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                            <InputLabel htmlFor="phone_number" className={classes.label}>
                                {t('selleraccount:Phone')}
                            </InputLabel>
                            <TextField
                                id="phone_number"
                                name="phone_number"
                                className={classes.textInput}
                                value={formik.values.phone_number}
                                onChange={formik.handleChange}
                                error={!!(formik.touched.phone_number && formik.errors.phone_number)}
                                helperText={(formik.touched.phone_number && formik.errors.phone_number) || ''}
                            />
                        </div>

                        <FormControl component="fieldset" className={clsx(classes.formField)}>
                            <FormGroup>
                                <FormControlLabel
                                    control={(
                                        <Checkbox
                                            className={clsx(classes.checkboxToggle)}
                                            checked={changeEmail}
                                            onChange={handleEmailField}
                                            name="changeEmail"
                                        />
                                    )}
                                    label={t('selleraccount:Change_Email')}
                                    className={clsx(classes.checkboxToggle, 'label')}
                                />
                                <FormControlLabel
                                    control={(
                                        <Checkbox
                                            className={clsx(classes.checkboxToggle)}
                                            checked={changePassword}
                                            onChange={handlePasswordField}
                                            name="changePassword"
                                        />
                                    )}
                                    label={t('selleraccount:Change_Password')}
                                    className={clsx(classes.checkboxToggle, 'label')}
                                />
                            </FormGroup>
                        </FormControl>

                        {changeEmail === true
                        && (
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <InputLabel htmlFor="email" className={classes.label}>
                                    {t('selleraccount:Email')}
                                </InputLabel>
                                <TextField
                                    id="email"
                                    name="email"
                                    className={classes.textInput}
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={!!(formik.touched.email && formik.errors.email)}
                                    helperText={(formik.touched.email && formik.errors.email) || ''}
                                />
                            </div>
                        )}

                        {(changeEmail === true || changePassword === true)
                        && (
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <InputLabel htmlFor="currentPassword" className={classes.label}>
                                    {t('selleraccount:Current_Password')}
                                </InputLabel>
                                <TextField
                                    id="currentPassword"
                                    name="currentPassword"
                                    type="password"
                                    className={classes.textInput}
                                    value={formik.values.currentPassword}
                                    onChange={formik.handleChange}
                                    error={!!(formik.touched.currentPassword && formik.errors.currentPassword)}
                                    helperText={(formik.touched.currentPassword && formik.errors.currentPassword) || ''}
                                />
                            </div>
                        )}

                        {changePassword === true
                        && (
                            <>
                                <div className={clsx('col-xs-12 col-sm-12', classes.formField, 'newPassword')}>
                                    <InputLabel htmlFor="newPassword" className={classes.label}>
                                        {t('selleraccount:New_Password')}
                                    </InputLabel>
                                    <TextField
                                        id="newPassword"
                                        name="newPassword"
                                        type="password"
                                        className={classes.textInput}
                                        value={formik.values.newPassword}
                                        onChange={(e) => { formik.handleChange(e); handleNewPassword(e); }}
                                        error={!!(formik.touched.newPassword && formik.errors.newPassword) || !!passwordError}
                                        helperText={(formik.touched.newPassword && formik.errors.newPassword) || !!passwordError || ''}
                                    />
                                </div>

                                <Chip
                                    className={clsx(classes.passwordIndicator)}
                                    label={`${t('selleraccount:Password_Strength')}: ${passwordStrength}`}
                                />

                                <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                    <InputLabel htmlFor="confirmPassword" className={classes.label}>
                                        {t('selleraccount:Confirm_New_Password')}
                                    </InputLabel>
                                    <TextField
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        className={classes.textInput}
                                        value={formik.values.confirmPassword}
                                        onChange={formik.handleChange}
                                        error={!!(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                                        helperText={(formik.touched.confirmPassword && formik.errors.confirmPassword) || ''}
                                    />
                                </div>

                            </>
                        )}

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <h2 className={classes.title}>{t('selleraccount:Profile_Picture')}</h2>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={4} style={{ display: 'flex', justifyContent: 'center' }}>
                                <div
                                    className={classes.imgBack}
                                    style={{
                                        backgroundImage: `url(${formik.values.profile_picture || '/assets/img/placeholder_image.jpg'})`,
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
                <Grid item xs={12} sm={6} md={4} lg={3}>
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
        </div>
    );
};

export default ManageAccount;
