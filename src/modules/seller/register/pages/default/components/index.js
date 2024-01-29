/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Button from '@common_button';
import useStyles from '@sellermodules/register/pages/default/components/style';
import GetScore from '@helper_passwordstrength';
import { useRouter } from 'next/router';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepConnector from '@material-ui/core/StepConnector';
import StepLabel from '@material-ui/core/StepLabel';
import Step1 from '@sellermodules/register/pages/default/components/stepform/step1';
import Step2 from '@sellermodules/register/pages/default/components/stepform/step2';
import { PRIMARY_DARK } from '@theme_color';
import LanguageSelect from '@modules/theme/layout/components/languageSelect';
import OtpInput from 'react-otp-input';
import { getTimeLeft } from '@modules/login/helpers/otp';

const QontoConnector = withStyles({
    alternativeLabel: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    active: {
        '& $line': {
            borderColor: PRIMARY_DARK,
        },
    },
    completed: {
        '& $line': {
            borderColor: PRIMARY_DARK,
        },
    },
    line: {
        borderTopWidth: 2,
        borderRadius: 1,
    },
})(StepConnector);

const RegisterSeller = (props) => {
    const classes = useStyles();
    const {
        formik, storeLogo, t, createStore, isSuccess, recaptcha, userData, handleLogin, getSocialSession, encrypt,
        startVerifyOtp, checkPhoneNumber, otp, setOtp, timeLeft, allowOtpChange, phone, otpVal, setOtpVal,
        isOtpVerify, isOtpEnable, checkIfSellerEmailExist,
    } = props;

    const router = useRouter();
    const [passwordError, setPasswordError] = useState('');
    const [passwordErrorStatus, setPasswordErrorStatus] = useState('');
    const [activeStep, setActiveStep] = React.useState(0);
    const [termAgree, setTermAgree] = React.useState(false);

    const maxSteps = createStore ? 1 : 0;
    const steps = [t('registerseller:Account_Information'), t('registerseller:Store_Information')];
    const keyStepOne = ['name', 'email', 'password', 'password_confirmation', 'phone_number'];
    const keysError = Object.keys(formik.errors);

    const isDisabled = activeStep === maxSteps && (recaptcha.enable ? (!termAgree || !formik.values.captcha) : !termAgree);
    const isDisabledNext = keyStepOne.some((item) => keysError.includes(item)) || passwordError;

    const onClickSubmit = (e) => {
        e.preventDefault();
        if (activeStep === maxSteps) {
            formik.handleSubmit();
        } else if (isDisabledNext) {
            formik.setTouched({ ...formik.touched, ...Object.fromEntries(keyStepOne.map((key) => ([key, true]))) });
            const keys = Object.keys(formik.errors).filter((key) => keyStepOne.includes(key))
                .sort((a, b) => keyStepOne.indexOf(a) - keyStepOne.indexOf(b));
            if (keys.length > 0) {
                const keyName = keys[0];
                const node = document.getElementsByName(keyName);
                if (node.length) {
                    node[0].scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
                    node[0].focus();
                }
            }
        } else if (isOtpVerify === true) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
            window.backdropLoader(true);
            checkIfSellerEmailExist({
                variables: {
                    email: formik.values.email,
                },
            }).then((res) => {
                window.backdropLoader(false);
                if (res?.data?.checkIfSellerEmailExist) {
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: t('registerseller:Your_email_already_exists_Please_use_a_different_email'),
                    });
                } else {
                    checkPhoneNumber();
                }
            });
        }
    };

    const onReCAPTCHAChange = (captchaCode) => {
        if (!captchaCode) {
            formik.setFieldValue('captcha', '');
            return;
        }
        formik.setFieldValue('captcha', captchaCode);
    };

    const renderComponent = () => {
        switch (activeStep) {
        case 0:
            return (
                <Step1
                    onReCAPTCHAChange={onReCAPTCHAChange}
                    termAgree={termAgree}
                    setTermAgree={setTermAgree}
                    passwordErrorStatus={passwordErrorStatus}
                    passwordError={passwordError}
                    {...props}
                />
            );
        case 1:
            return <Step2 onReCAPTCHAChange={onReCAPTCHAChange} termAgree={termAgree} setTermAgree={setTermAgree} {...props} />;
        default:
            return <Step1 {...props} />;
        }
    };

    useEffect(() => {
        if (formik.values.password) {
            const passwordScore = GetScore((getSocialSession?.email ? encrypt(getSocialSession?.email) : formik.values.password), 8, 3);
            setPasswordError(`${passwordScore.message ? `${passwordScore.message} or password too common` : ''}`);
            setPasswordErrorStatus(passwordScore.status);
        }
    }, [formik.values.password]);

    useEffect(() => {
        if (createStore) {
            formik.setFieldValue('captcha', '');
        }
    }, [activeStep]);

    useEffect(() => {
        if (!formik.isSubmitting) return;
        if (createStore) {
            if (keysError.length > 0) {
                const keyName = keysError[0];
                if (keyStepOne.some((item) => keysError.includes(item))) {
                    setActiveStep(0);
                }
                const node = document.getElementsByName(keyName);
                if (node?.length) {
                    node[0].scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
                    node[0].focus();
                }
            }
        }
    }, [formik]);

    return (
        <div className={clsx(classes.container)}>
            <div className={classes.containLeft}>
                <div className={classes.header}>
                    <img
                        className="imgIcon"
                        alt=""
                        src={storeLogo?.logo || '/assets/img/swiftoms_logo_expanded.png'}
                        style={{ maxHeight: 52, cursor: 'pointer' }}
                        onClick={() => router.push('/')}
                    />
                    <LanguageSelect />
                </div>
                {isSuccess ? (
                    <div className={classes.contentSuccess}>
                        <div className={classes.titleContainer}>
                            <div className={clsx(classes.textTitle, 'center')}>
                                {t('registerseller:Congratulations')}
                                ,
                                <br />
                                {userData.name}
                                !
                                <div className={classes.textTitle2}>{t('registerseller:Thank_you_Your_registration_was_successful')}</div>
                                {userData?.status === 'pending'
                                && (
                                    <div className={classes.textTitle2}>
                                        {t('registerseller:We_will_review_your_registration_and_will_notify_you_afterward')}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={classes.flexCenter}>
                            <img className={classes.successImg} src="/assets/img/success-thumbnail.svg" alt="success_thumbnail" />
                        </div>
                        <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                            <Button
                                onClick={handleLogin}
                                variant="contained"
                                className={classes.btn}
                            >
                                <span className={classes.btnText}>
                                    {userData?.status === 'pending' ? t('registerseller:Back_to_Login_Page') : t('registerseller:Launch_Swift_OMS')}
                                </span>
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className={classes.content}>
                        <div className={classes.titleContainer}>
                            <div className={classes.textTitle}>
                                {otp === true ? t('login:verif_otp_title') : t('registerseller:Create_Account')}
                                <div className={classes.textTitle2}>
                                    {
                                        otp === false
                                            ? t('registerseller:Complete_your_Business_Profile') : (
                                                <>
                                                    {t('login:verif_otp_message')}
                                                    {' '}
                                                    <span className={classes.purple}>{phone}</span>
                                                </>
                                            )
                                    }
                                </div>
                            </div>
                        </div>

                        {otp === false && createStore ? (
                            <Stepper
                                alternativeLabel
                                activeStep={activeStep}
                                className={clsx(classes.stepper, activeStep === 0 && isDisabledNext && 'disabled')}
                                connector={<QontoConnector />}
                            >
                                {steps.map((step, i) => (
                                    <Step
                                        key={i}
                                        onClick={() => {
                                            if (activeStep === 0 && isDisabledNext) {
                                                return false;
                                            }

                                            if (isOtpEnable() === true && isOtpVerify === false) {
                                                return false;
                                            }

                                            setActiveStep(i);
                                        }}
                                    >
                                        <StepLabel>
                                            {step}
                                        </StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        )
                            : <div style={{ height: 30 }} />}

                        { otp === true && (
                            <>
                                <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
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
                                </div>

                                <div style={{ marginTop: 10 }}>
                                    {t('registerseller:no_otp')}
                                    <span
                                        href="#"
                                        onClick={() => allowOtpChange && checkPhoneNumber()}
                                        className={!allowOtpChange ? classes.clickPurpleBoldDisable : classes.clickPurpleBold}
                                    >
                                        {t('registerseller:resend_otp')}
                                        {' '}
                                        {!allowOtpChange ? `(${getTimeLeft(timeLeft)})` : '(00:00)'}
                                    </span>
                                </div>
                                <div
                                    style={{ marginTop: 10, marginBottom: 30 }}
                                    className={classes.clickPurpleBold}
                                    onClick={() => {
                                        setOtp(false);
                                    }}
                                >
                                    {t('registerseller:change_number')}
                                </div>
                            </>
                        )}

                        <form onSubmit={(e) => {
                            if (isOtpEnable() === true) {
                                if (isOtpVerify === false && otp === true && otpVal.length >= 6) {
                                    startVerifyOtp();
                                } else {
                                    onClickSubmit(e);
                                }
                            } else {
                                onClickSubmit(e);
                            }
                        }}
                        >
                            <div className="row center-xs start-sm">
                                {otp === false && renderComponent()}
                                <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                    <Button
                                        onClick={(e) => {
                                            if (isOtpEnable() === true) {
                                                if (isOtpVerify === false && otp === true && otpVal.length >= 6) {
                                                    startVerifyOtp();
                                                } else {
                                                    onClickSubmit(e);
                                                }
                                            } else {
                                                onClickSubmit(e);
                                            }
                                        }}
                                        variant="contained"
                                        className={classes.btn}
                                        disabled={otp === true ? (otpVal.length < 6) : isDisabled}
                                    >
                                        <span className={classes.btnText}>
                                            {activeStep === maxSteps ? t('registerseller:Submit_Request') : t('registerseller:Next')}
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                )}
            </div>
            <div className={classes.containRight} style={{ backgroundImage: "url('/assets/img/swift-bg-new.webp')" }} />
        </div>
    );
};

export default RegisterSeller;
