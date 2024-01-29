/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

import ReCAPTCHA from 'react-google-recaptcha';
import OtpInput from 'react-otp-input';
import InputAdornment from '@material-ui/core/InputAdornment';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import TextField from '@common_textfield';
import Button from '@common_button';
// import Checkbox from '@material-ui/core/Checkbox';

import useStyles from '@modules/login/pages/default/components/style';
import LanguageSelect from '@modules/theme/layout/components/languageSelect';
import { getTimeLeft, setOtpState } from '@modules/login/helpers/otp';
import { breakPointsUp } from '@helper_theme';

const Login = (props) => {
    const classes = useStyles();
    const {
        formik,
        storeLogo,
        t,
        recaptchaRef,
        recaptcha,
        confirmNotif,
        checkUsername,
        idType,
        setIdType,
        validateInput,
        timeLeft,
        otpVal,
        setOtpVal,
        allowOtpChange,
        verifyOtpCode,
        isAllowRegistration,
    } = props;
    const router = useRouter();

    const [showPassword, setShowPassword] = React.useState(false);
    const [checkEmailPhone, setCheckEmailPhone] = React.useState(false);

    const onReCAPTCHAChange = (captchaCode) => {
        if (!captchaCode) {
            return;
        }
        formik.setFieldValue('captcha', captchaCode);
    };

    const isDesktop = breakPointsUp('sm');

    return (
        <div className={clsx(classes.loginContainer)}>
            <div className={classes.containLeft}>
                <div className={classes.headerLogin}>
                    <img
                        alt="logo"
                        src={storeLogo?.logo || '/assets/img/logo-seller.svg'}
                        style={{
                            maxHeight: 100, cursor: 'pointer', width: 130, height: 43,
                        }}
                        onClick={() => router.push('/')}
                        width="130"
                        height="43"
                    />
                    <LanguageSelect />
                </div>
                {confirmNotif
                    && (
                        <div className={classes.divConfirm}>
                            <CheckCircleRoundedIcon />
                            <p>
                                {t('login:You_must_confirm_your_account_Please_check_your_email_for_the_confirmation_link')}
                                {' '}
                                {t('login:or')}
                                {' '}
                                <Link href="/confrimation">
                                    <Button className="link-button">{t('login:click_here')}</Button>
                                </Link>
                                {' '}
                                {t('login:for_a_new_link')}
                            </p>
                        </div>
                    )}
                <div className={classes.loginContentContainer}>
                    <div className={classes.loginContent}>
                        <div className={classes.titleContainer}>
                            <div className={classes.textTitle}>
                                { idType !== 'phone' ? `${t('registervendor:Hello')} !` : t('login:verif_otp_title')}
                                <div className={classes.textTitle2}>
                                    {
                                        idType !== 'phone'
                                            ? t('registervendor:Welcome_back_Please_enter_your_details') : (
                                                <>
                                                    {t('login:verif_otp_message')}
                                                    {' '}
                                                    <span className={classes.colorPurple}>{formik.values.email}</span>
                                                </>
                                            )
                                    }
                                </div>
                            </div>
                        </div>
                        <div style={{ height: 30 }} />
                        <form onSubmit={(e) => {
                            if (idType) {
                                formik.handleSubmit(e);
                            } else {
                                const validateUsernameInput = validateInput(formik.values.email);
                                if (validateUsernameInput) {
                                    setCheckEmailPhone(false);
                                    checkUsername(validateUsernameInput);
                                } else {
                                    setCheckEmailPhone(true);
                                }
                            }
                            e.preventDefault();
                        }}
                        >
                            <div className="row center-xs start-sm">
                                {idType !== 'phone' && (
                                    <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                        <TextField
                                            type="text"
                                            name="email"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            placeholder={t('login:placeholder_login')}
                                            className={classes.textInput}
                                            InputProps={{
                                                endAdornment: (<>
                                                    {idType && (
                                                        <InputAdornment position="start">
                                                            <strong
                                                                className={classes.changeBtn}
                                                                onClick={() => {
                                                                    formik.values.email = '';
                                                                    formik.values.password = '';
                                                                    setIdType(null);
                                                                }}
                                                            >
                                                                {t('login:change')}
                                                            </strong>
                                                        </InputAdornment>
                                                    )}
                                                </>
                                                ),
                                            }}
                                            disabled={idType === 'email'}
                                            error={checkEmailPhone}
                                            helperText={checkEmailPhone ? t('login:please_check_your_input') : ''}
                                        />
                                    </div>
                                )}

                                { idType === 'email' && (
                                    <>
                                        <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                            <TextField
                                                name="password"
                                                placeholder={t('login:Password')}
                                                type={showPassword ? 'text' : 'password'}
                                                value={formik.values.password}
                                                onChange={formik.handleChange}
                                                className={classes.textInput}
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
                                                error={!!(formik.touched.password && formik.errors.password)}
                                                helperText={(formik.touched.password && formik.errors.password) || ''}
                                            />
                                        </div>
                                        <div className={classes.btnTextForgot}>
                                            <div className={classes.checkboxRemember}>
                                                {/* <Checkbox />
                                                {' '}
                                                Ingat saya */}
                                            </div>
                                            <div className={classes.forgotHyperlink}>
                                                <Link href="/forgotpassword">
                                                    <a>{t('login:Forgot_Password')}</a>
                                                </Link>
                                            </div>
                                        </div>
                                    </>
                                )}

                                { idType === 'phone' && (
                                    <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                        <OtpInput
                                            name="otp"
                                            value={otpVal}
                                            onChange={(e) => setOtpVal(e)}
                                            numInputs={6}
                                            inputStyle={classes.otpInput}
                                            renderInput={(prOps) => <input {...prOps} />}
                                        />
                                        <p>
                                            {t('login:verif_otp_retry')}
                                            {' '}
                                            <a
                                                className={!allowOtpChange ? classes.clickPurpleBoldDisable : classes.colorPurple}
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => {
                                                    if (!allowOtpChange) return false;
                                                    const validateUsernameInput = validateInput(formik.values.email);
                                                    if (validateUsernameInput) {
                                                        checkUsername(validateUsernameInput);
                                                        formik.setFieldValue('otp', '');
                                                    }
                                                    return true;
                                                }}
                                            >
                                                <strong>
                                                    {t('login:verif_otp_resend')}
                                                    {' '}
                                                    {!allowOtpChange ? `(${getTimeLeft(timeLeft)})` : '(00:00)'}
                                                </strong>
                                            </a>
                                        </p>
                                        <div
                                            style={{ marginTop: 10 }}
                                            className={classes.colorPurpleBold}
                                            onClick={() => {
                                                setOtpState('otp_input', 'login', 0);
                                                setIdType(null);
                                            }}
                                        >
                                            {t('registerseller:change_number')}
                                        </div>
                                    </div>
                                )}

                                {recaptcha.enable
                                    && (
                                        <div
                                            className={clsx('col-xs-12 col-sm-12', classes.formField)}
                                            style={{ display: 'flex', justifyContent: 'center' }}
                                        >
                                            <ReCAPTCHA
                                                name="captcha"
                                                sitekey={recaptcha.sitekey}
                                                onChange={onReCAPTCHAChange}
                                                ref={recaptchaRef}
                                            />
                                        </div>
                                    )}
                                <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                    <Button
                                        type={idType === 'phone' ? 'button' : 'submit'}
                                        variant="contained"
                                        className={classes.btnLogin}
                                        disabled={(recaptcha.enable && !formik.values.captcha) || (idType === 'phone' && otpVal.length < 6)}
                                        onClick={() => idType === 'phone' && verifyOtpCode()}
                                    >
                                        <span className={classes.btnLoginText}>
                                            {
                                                !idType ? t('login:continue') : (idType === 'phone' ? t('login:verif_otp_continue') : t('login:Sign_in'))
                                            }
                                        </span>
                                    </Button>
                                </div>

                                <div
                                    className={idType === 'phone' ? classes.btnLoginSocialHide : clsx('col-xs-12 col-sm-12', classes.formField)}
                                    style={{ borderTop: '1px #ccc solid', paddingTop: 10, marginTop: 10 }}
                                >
                                    <p>{t('login:social_media_header')}</p>

                                    <Button
                                        id="firebaseui-auth-container"
                                        type="button"
                                        variant="contained"
                                        className={clsx(classes.btnLoginSocial, !isDesktop && 'btn-mobile')}
                                    >
                                        <img alt="icon" src="/assets/img/google.svg" />
                                        {isDesktop && <span className={classes.btnLoginText}>{t('login:google_login')}</span>}
                                    </Button>
                                </div>

                                { idType !== 'phone' && (
                                    <>
                                        { isAllowRegistration() !== false
                                        && (
                                            <div className={classes.btnSignUp}>
                                                <span>
                                                    {t('login:Don’t_have_an_account')}
                                                    {' '}
                                                    <Link href={isAllowRegistration() === 'internal' ? '/seller/register' : `${isAllowRegistration()}/customer/account/create/`}>
                                                        <a>{t('login:register_now')}</a>
                                                    </Link>
                                                </span>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className={classes.containRight}>
                <img
                    alt="background"
                    src={storeLogo?.login_side_image || '/assets/img/swift-bg-new.webp'}
                    className={classes.rightImg}
                    width="100%"
                    height="100%"
                />
            </div>
        </div>
    );
};

export default Login;
