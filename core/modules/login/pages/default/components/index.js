/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

import ReCAPTCHA from 'react-google-recaptcha';
import InputAdornment from '@material-ui/core/InputAdornment';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import TextField from '@common_textfield';
import Button from '@common_button';

import useStyles from '@modules/login/pages/default/components/style';
import LanguageSelect from '@modules/theme/layout/components/languageSelect';

const Login = (props) => {
    const classes = useStyles();
    const {
        formik,
        storeLogo,
        t,
        recaptchaRef,
        recaptcha,
        dataConfig,
        confirmNotif,
    } = props;
    const router = useRouter();

    const [showPassword, setShowPassword] = React.useState(false);

    const onReCAPTCHAChange = (captchaCode) => {
        if (!captchaCode) {
            return;
        }
        formik.setFieldValue('captcha', captchaCode);
    };

    return (
        <div className={clsx(classes.loginContainer)}>
            <div className={classes.containLeft}>
                <div className={classes.headerLogin}>
                    <img
                        alt="logo"
                        src={storeLogo?.logo || '/assets/img/swiftoms_logo_expanded.png'}
                        style={{ maxHeight: 52, cursor: 'pointer' }}
                        onClick={() => router.push('/')}
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
                                    <a className="link-button">{t('login:click_here')}</a>
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
                                {t('registervendor:Hello_Again')}
                                <div className={classes.textTitle2}>{t('registervendor:Welcome_back_Please_enter_your_details')}</div>
                            </div>
                        </div>
                        <div style={{ height: 30 }} />
                        <form onSubmit={(e) => formik.handleSubmit(e)}>
                            <div className="row center-xs start-sm">
                                <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                    <TextField
                                        name="email"
                                        placeholder={t('login:Email')}
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        className={classes.textInput}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="start">
                                                    <img alt="" src="/assets/img/icon-email-new.svg" className={classes.iconImg} />
                                                </InputAdornment>
                                            ),
                                        }}
                                        error={!!(formik.touched.email && formik.errors.email)}
                                        helperText={(formik.touched.email && formik.errors.email) || ''}
                                    />
                                </div>
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
                                                    <img alt="" src="/assets/img/icon-lock-new.svg" className={classes.iconImg} />
                                                </InputAdornment>
                                            ),
                                        }}
                                        error={!!(formik.touched.password && formik.errors.password)}
                                        helperText={(formik.touched.password && formik.errors.password) || ''}
                                    />
                                </div>
                                <div className={classes.btnTextForgot}>
                                    <Link href="/forgotpassword">
                                        <a>{t('login:Forgot_Password')}</a>
                                    </Link>
                                </div>
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
                                        type="submit"
                                        variant="contained"
                                        className={classes.btnLogin}
                                        disabled={recaptcha.enable && !formik.values.captcha}
                                    >
                                        <span className={classes.btnLoginText}>{t('login:Sign_in')}</span>
                                    </Button>
                                </div>
                                {dataConfig
                                    && (
                                        <div className={classes.btnSignUp}>
                                            <span>
                                                {t('login:Don’t_have_an_account')}
                                                {' '}
                                                <Link href="/seller/register">
                                                    <a>{t('login:Sign_up')}</a>
                                                </Link>
                                            </span>
                                        </div>
                                    )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className={classes.containRight}>
                <img alt="" src={storeLogo?.login_side_image || '/assets/img/swift-bg-new.png'} className={classes.rightImg} />
            </div>
        </div>
    );
};

export default Login;
