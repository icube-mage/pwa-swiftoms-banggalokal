/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-nested-ternary */
import React from 'react';
import clsx from 'clsx';
import TextField from '@common_textfield';
import Button from '@common_button';
import InputAdornment from '@material-ui/core/InputAdornment';
import useStyles from '@modules/forgotpassword/pages/default/components/style';
import Head from 'next/head';
import Link from 'next/link';
import ReCAPTCHA from 'react-google-recaptcha';
import { recaptcha } from '@config';
import { useRouter } from 'next/router';
import LanguageSelect from '@modules/theme/layout/components/languageSelect';

const ForgotPassword = (props) => {
    const {
        formik, storeLogo, t, recaptchaRef, 
    } = props;
    const router = useRouter();
    const classes = useStyles();

    const onReCAPTCHAChange = (captchaCode) => {
        if (!captchaCode) {
            return;
        }
        formik.setFieldValue('captcha', captchaCode);
    };

    return (
        <>
            <Head>
                <title>{t('forgotpassword:Set_a_New_Password')}</title>
            </Head>
            <div className={clsx(classes.loginContainer)}>
                <div className={classes.containLeft}>
                    <div className={classes.headerLogin}>
                        <img
                            alt=""
                            src={storeLogo?.logo || '/assets/img/swiftoms_logo_expanded.png'}
                            style={{ maxHeight: 52, cursor: 'pointer' }}
                            onClick={() => router.push('/')}
                        />
                        <LanguageSelect />
                    </div>
                    <div className={classes.loginContent}>
                        <div className={classes.titleContainer}>
                            <div className={classes.textTitle}>
                                {t('forgotpassword:Password_Recovery')}
                                <div className={classes.textTitle2}>
                                    {t('forgotpassword:Please_fill_in_the_email_you’ve_used_to_create_account_and_we’ll_send_you_a_reset_link')}
                                </div>
                            </div>
                        </div>
                        <form onSubmit={(e) => formik.handleSubmit(e)}>
                            <div className="row center-xs start-sm">
                                <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                    <TextField
                                        name="email"
                                        placeholder="Email"
                                        value={formik.email}
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
                                        <span className={classes.btnLoginText}>{t('login:Reset_My_Password')}</span>
                                    </Button>
                                </div>
                                <div className={classes.btnSignUp}>
                                    <Link href="/login">
                                        <a>{t('login:Back_to_Login_Page')}</a>
                                    </Link>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
                <div className={classes.containRight} style={{ backgroundImage: "url('/assets/img/swift-bg-new.png')" }} />
            </div>
        </>
    );
};

export default ForgotPassword;
