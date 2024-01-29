/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-nested-ternary */
import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

import InputAdornment from '@material-ui/core/InputAdornment';

import TextField from '@common_textfield';
import Button from '@common_button';

import { recaptcha } from '@config';
import LanguageSelect from '@modules/theme/layout/components/languageSelect';
import useStyles from '@modules/userconfirm/pages/formpage/components/style';

const ForgotPassword = (props) => {
    const {
        formik, storeLogo, t,
    } = props;
    const router = useRouter();
    const classes = useStyles();

    return (
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
                <div className={classes.loginContentContainer}>
                    <div className={classes.loginContent}>
                        <div className={classes.titleContainer}>
                            <div className={classes.textTitle}>
                                {t('userconfirm:Resend_Confirmation_Link')}
                                <div className={classes.textTitle2}>
                                    {t('userconfirm:Please_enter_your_email_below_and_we_will_send_you_the_confirmation_link')}
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

                                <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        className={classes.btnLogin}
                                        disabled={recaptcha.enable && !formik.values.captcha}
                                    >
                                        <span className={classes.btnLoginText}>{t('userconfirm:Send_confirmation_link')}</span>
                                    </Button>
                                </div>
                                <div className={classes.btnSignUp}>
                                    <Link href="/login">
                                        <a>{t('userconfirm:Back_to_Login_Page')}</a>
                                    </Link>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className={classes.containRight} style={{ backgroundImage: "url('/assets/img/swift-bg-new.png')" }} />
        </div>
    );
};

export default ForgotPassword;
