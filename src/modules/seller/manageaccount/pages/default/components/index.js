/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unneeded-ternary */
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
import OtpInput from 'react-otp-input';
import { setOtpState, getTimeLeft, filterPhone } from '@modules/login/helpers/otp';

const ManageAccount = (props) => {
    const {
        t, formik, handleDropFile, userLocation, login_method, validateUserdataStatus,
        otp, setOtp, timeLeft, allowOtpChange, phone, setPhone, otpVal, setOtpVal,
        isOtpVerify, startVerifyOtp, checkPhoneNumber, limitSizeConfig,
    } = props;
    const classes = useStyles();
    const isDesktop = breakPointsUp('sm');

    const { limit_size_image } = limitSizeConfig;

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
                <Grid container spacing={isDesktop ? 6 : 0} className={classes.gridMainContainer}>
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
                                value={phone}
                                onChange={(e) => {
                                    const phoneInput = filterPhone(e?.target?.value);
                                    setPhone(phoneInput);
                                    setOtpState('phone', 'account', phoneInput);
                                }}
                                error={!!(formik.touched.phone_number && formik.errors.phone_number)}
                                helperText={(formik.touched.phone_number && formik.errors.phone_number) || ''}
                                disabled={otp}
                            />
                        </div>
                        { otp === true && (
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <InputLabel htmlFor="phone_number" className={classes.label}>
                                    {
                                        isOtpVerify === true
                                            ? (<span className={classes.verifiedText}>{t('registerseller:verified_otp')}</span>)
                                            : t('registerseller:verifikasi_otp')
                                    }
                                </InputLabel>
                                <div style={{
                                    maxWidth: 300,
                                    marginTop: 20,
                                }}
                                >
                                    {isOtpVerify === false && (
                                        <OtpInput
                                            name="otp"
                                            value={otpVal}
                                            onChange={(e) => {
                                                setOtpVal(e.replace(/\D/g, ''));
                                            }}
                                            numInputs={6}
                                            inputStyle={classes.otpInput}
                                            renderInput={(prOps) => <input {...prOps} />}
                                        />
                                    )}
                                </div>
                                {isOtpVerify === false && (
                                    <>
                                        <div style={{ marginTop: 10 }}>
                                            {t('registerseller:no_otp')}
                                            <span
                                                href="#"
                                                onClick={() => allowOtpChange && checkPhoneNumber()}
                                                className={!allowOtpChange ? classes.clickPurpleBoldDisable : classes.clickPurpleBold}
                                                aria-hidden="true"
                                            >
                                                {t('registerseller:resend_otp')}
                                                {' '}
                                                {!allowOtpChange ? `(${getTimeLeft(timeLeft)})` : '(00:00)'}
                                            </span>
                                        </div>
                                        {allowOtpChange && (
                                            <div
                                                style={{ marginTop: 10 }}
                                                className={classes.clickPurpleBold}
                                                onClick={() => {
                                                    setOtp(false);
                                                }}
                                                aria-hidden="true"
                                            >
                                                {t('registerseller:change_number')}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        )}

                        { otp === false && (
                            <FormControl component="fieldset" className={clsx(classes.formField)}>
                                <FormGroup>
                                    {validateUserdataStatus?.isSocialLogin === false && (
                                        <FormControlLabel
                                            control={(
                                                <Checkbox
                                                    className={clsx(classes.checkboxToggle)}
                                                    checked={changeEmail}
                                                    onChange={!login_method && handleEmailField}
                                                    disabled={login_method}
                                                    name="changeEmail"
                                                />
                                            )}
                                            label={t('selleraccount:Change_Email')}
                                            className={clsx(classes.checkboxToggle, 'label')}
                                        />
                                    )}
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
                        )}

                        {changeEmail === true && otp === false && (
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

                        {(((changeEmail === true || changePassword === true) && otp === false && validateUserdataStatus?.isInternalLogin === true))
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
                                    value={formik?.values?.currentPassword?.trim()}
                                    onChange={formik.handleChange}
                                    error={!!(formik.touched.currentPassword && formik.errors.currentPassword)}
                                    helperText={(formik.touched.currentPassword && formik.errors.currentPassword) || ''}
                                />
                            </div>
                        )}

                        {changePassword === true && otp === false
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
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Button
                        variant="contained"
                        className={classes.btnSave}
                        onClick={(e) => {
                            if (formik.values.phone_number !== phone) {
                                if (isOtpVerify === true) {
                                    formik.setFieldValue('phone_number', phone);
                                    setOtpState('otp_input', 'account', 0);
                                    formik.handleSubmit(e);
                                } else if (otpVal) {
                                    startVerifyOtp();
                                } else {
                                    checkPhoneNumber();
                                }
                            } else {
                                formik.setFieldValue('phone_number', phone);
                                formik.handleSubmit(e);
                            }
                        }}
                        disabled={otp === true && otpVal.length < 6}
                    >
                        <span className={classes.btnText}>
                            { otp === true && isOtpVerify === false
                                ? t('registerseller:verifikasi_otp') : (
                                    formik.values.phone_number !== phone && isOtpVerify === false
                                        ? t('registerseller:get_otp') : t('registerseller:Save')
                                )}
                        </span>
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default ManageAccount;
