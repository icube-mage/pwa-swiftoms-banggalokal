/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import clsx from 'clsx';
import ReCAPTCHA from 'react-google-recaptcha';

import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import PhoneInput from '@common_phoneinput';
import TextField from '@common_textfield';

import useStyles from '@sellermodules/register/pages/default/components/stepform/style';

const colorWeak = '#FF4B47';
const colorMedium = '#FFA500';
const colorStrong = '#87D6A8';
const colorVeryStrong = '#00C853';

const RegisterSeller = (props) => {
    const classes = useStyles();
    const {
        formik, t, setDialCode, passwordError, passwordErrorStatus, createStore,
        recaptcha, sitekey, onReCAPTCHAChange, recaptchaRef, termAgree, setTermAgree,
    } = props;
    const firstRenderPhone = React.useRef(true);

    const [showPassword, setShowPassword] = React.useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);

    const getColor = (status) => {
        switch (status) {
        case 'Weak':
            return colorWeak;
        case 'Medium':
            return colorMedium;
        case 'Strong':
            return colorStrong;
        case 'Very Strong':
            return colorVeryStrong;
        default:
            return colorWeak;
        }
    };

    const getSize = (status) => {
        switch (status) {
        case 'Weak':
            return '25%';
        case 'Medium':
            return '50%';
        case 'Strong':
            return '75%';
        case 'Very Strong':
            return '100%';
        default:
            return '25%';
        }
    };

    const getMarginBottom = () => {
        if (formik.touched.password && formik.errors.password) {
            return 10;
        } if (passwordError) {
            return 40;
        }
        return -10;
    };

    return (
        <>
            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                <InputLabel htmlFor="name" className={[classes.label, classes.required]}>
                    {t('registerseller:Name')}
                </InputLabel>
                <TextField
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    className={classes.textInput}
                    error={!!(formik.touched.name && formik.errors.name)}
                    helperText={(formik.touched.name && formik.errors.name) || ''}
                    onBlur={formik.handleBlur}
                />
            </div>
            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                <InputLabel htmlFor="email" className={[classes.label, classes.required]}>
                    {t('registerseller:Email')}
                </InputLabel>
                <TextField
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className={classes.textInput}
                    error={!!(formik.touched.email && formik.errors.email)}
                    helperText={(formik.touched.email && formik.errors.email) || ''}
                    onBlur={formik.handleBlur}
                />
            </div>
            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                <InputLabel htmlFor="password" className={[classes.label, classes.required]}>
                    {t('registerseller:Password')}
                </InputLabel>
                <TextField
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    className={clsx(classes.textInputPass, passwordError && 'error')}
                    error={passwordError !== '' || !!(formik.touched.password && formik.errors.password)}
                    helperText={(formik.touched.password && formik.errors.password) || passwordError}
                    onBlur={formik.handleBlur}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    className={classes.showButton}
                                >
                                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: '10px 0px',
                        width: '100%',
                        marginBottom: getMarginBottom(),
                    }}
                >
                    <div style={{ height: 5, width: '75%', backgroundColor: '#a3a099' }}>
                        <div
                            style={{
                                height: '100%',
                                width: getSize(passwordErrorStatus),
                                backgroundColor: getColor(passwordErrorStatus),
                                transition: 'background-color .2s, visisility .1s',
                            }}
                        />
                    </div>
                    <div style={{ padding: '0px 5px', color: getColor(passwordErrorStatus), fontSize: '0.75rem' }}>
                        {passwordErrorStatus}
                    </div>
                </div>
            </div>
            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                <InputLabel htmlFor="password_confirmation" className={[classes.label, classes.required]}>
                    {t('registerseller:Confirm_Password')}
                </InputLabel>
                <TextField
                    id="password_confirmation"
                    name="password_confirmation"
                    type={showPasswordConfirm ? 'text' : 'password'}
                    value={formik.values.password_confirmation}
                    onChange={formik.handleChange}
                    className={classes.textInput}
                    error={!!(formik.touched.password_confirmation && formik.errors.password_confirmation)}
                    helperText={(formik.touched.password_confirmation && formik.errors.password_confirmation) || ''}
                    onBlur={formik.handleBlur}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <IconButton
                                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                                    className={classes.showButton}
                                >
                                    {showPasswordConfirm ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                <InputLabel htmlFor="phone_number" className={[classes.label, classes.required]}>
                    {t('registerseller:Phone_Number')}
                </InputLabel>
                <PhoneInput
                    name="phone_number"
                    value={formik.values.phone_number}
                    onChange={(e, c) => {
                        formik.setFieldValue('phone_number', e);
                        setDialCode(c.dialCode);
                    }}
                    error={!!(formik.touched.phone_number && formik.errors.phone_number)}
                    helperText={(formik.touched.phone_number && formik.errors.phone_number) || ''}
                    containerClass={classes.fieldPhoneContainer}
                    rootClasses={classes.fieldPhoneRoot}
                    variant="standard"
                    onBlur={() => formik.setFieldTouched('phone_number', true)}
                    onFocus={(e, c) => {
                        setDialCode(c.dialCode);
                        if (firstRenderPhone.current) {
                            firstRenderPhone.current = false;
                            e.target.blur();
                        }
                    }}
                    inputProps={{ autoFocus: true }}
                />
            </div>
            {!createStore && (
                <>
                    <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                        <FormControlLabel
                            control={(
                                <Checkbox
                                    checked={termAgree}
                                    name="termAgree"
                                    onChange={(e) => setTermAgree(e.target.checked)}
                                />
                            )}
                            label={(
                                <span>
                                    {t('register:I_agree_to_the')}
                                    {' '}
                                    <a className={classes.termsCondition} href="/seller-registration-tnc" target="_blank">
                                        {t('register:terms_and_conditions')}
                                    </a>
                                    {' '}
                                    {t('registerseller:and_the')}
                                    {' '}
                                    <a className={classes.termsCondition} href="/seller-registration-privacy-policy" target="_blank">
                                        {t('register:privacy_policy')}
                                    </a>
                                </span>
                            )}
                            className={classes.controlLabel}
                        />

                    </div>
                    {recaptcha.enable
                && (
                    <div className={clsx('col-xs-12 col-sm-12', classes.formField, classes.recaptcha)}>
                        <ReCAPTCHA
                            sitekey={sitekey}
                            onChange={onReCAPTCHAChange}
                            ref={recaptchaRef}
                            onErrored={() => formik.setFieldValue('captcha', '')}
                            onExpired={() => formik.setFieldValue('captcha', '')}
                        />
                    </div>
                )}
                </>
            )}
        </>
    );
};

export default RegisterSeller;
