/* eslint-disable no-trailing-spaces */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import TextField from '@common_textfield';
import Button from '@common_button';
import InputAdornment from '@material-ui/core/InputAdornment';
import useStyles from '@modules/forgotpassword/pages/createnewpassword/components/style';
import GetScore from '@helper_passwordstrength';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LanguageSelect from '@modules/theme/layout/components/languageSelect';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const colorWeak = '#FF4B47';
const colorMedium = '#FFA500';
const colorStrong = '#87D6A8';
const colorVeryStrong = '#00C853';

const CreateNewPassword = (props) => {
    const classes = useStyles();
    const { formik, storeLogo, t } = props;
    const [passwordError, setPasswordError] = useState('');
    const [passwordErrorStatus, setPasswordErrorStatus] = useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);
    
    const router = useRouter();

    useEffect(() => {
        if (formik.values.password) {
            const passwordScore = GetScore(formik.values.password, 8, 3);
            setPasswordError(`${passwordScore.message ? `${passwordScore.message} or password too common` : ''}`);
            setPasswordErrorStatus(passwordScore.status);
        }
    }, [formik.values.password]);

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
                <div className={classes.loginContent}>
                    <div className={classes.titleContainer}>
                        <div className={classes.textTitle}>
                            {t('forgotpassword:Set_a_New_Password')}
                        </div>
                    </div>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (passwordError === '') {
                                formik.handleSubmit(e);
                            }
                        }}
                    >
                        <div className="row center-xs start-sm">
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <TextField
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder={t('forgotpassword:Your_a_new_password')}
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
                                    error={passwordError !== '' || (formik.touched.password && formik.errors.password)}
                                    helperText={(formik.touched.password && formik.errors.password) || passwordError}
                                />
                                {passwordErrorStatus !== '' && (
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            padding: '10px 0px',
                                            width: '100%',
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
                                )}
                            </div>
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <TextField
                                    type={showPasswordConfirm ? 'text' : 'password'}
                                    name="password_confirmation"
                                    placeholder="Confirm your a new password"
                                    value={formik.values.password_confirmation}
                                    onChange={formik.handleChange}
                                    className={classes.textInput}
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
                                    onBlur={formik.handleBlur}
                                    error={!!(formik.touched.password_confirmation && formik.errors.password_confirmation)}
                                    helperText={(formik.touched.password_confirmation && formik.errors.password_confirmation) || ''}
                                />
                            </div>
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className={classes.btnLogin}
                                >
                                    <span className={classes.btnLoginText}>{t('login:Set_a_New_Password')}</span>
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
            <div className={classes.containRight} style={{ backgroundImage: "url('/assets/img/swift-bg-new.webp')" }} />
        </div>
    );
};

export default CreateNewPassword;
