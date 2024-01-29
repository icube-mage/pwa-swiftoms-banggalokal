/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
/* eslint-disable radix */
/* eslint-disable no-empty */
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import gqlService from '@sellermodules/manageaccount/services/graphql';
import themeService from '@modules/theme/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import { regexEmail } from '@helper_regex';
import BackdropLoad from '@helper_backdropload';
import { validateUsername, requestOtp, verifyOtp } from '@modules/login/services/graphql';
import {
    getOtpState, setOtpState, filterPhone, filterStoreName, maxDuration,
} from '@modules/login/helpers/otp';

import Cookies from 'js-cookie';

const ContentWrapper = (props) => {
    const {
        data, Content, t, dataPicture, refetch, dataLocation,
    } = props;
    const router = useRouter();

    const userData = data.customer;
    const profilePicture = dataPicture;
    const [changePasswordGql] = gqlService.changeCustomerPassword();
    const [changeCustomerData] = gqlService.updateCustomer();
    const [changeCustomerEmail] = gqlService.updateCustomerEmail();
    const [changeCustomerPhoto] = gqlService.saveUserProfilePicture();
    const [changePicture, setChangePicture] = useState(false);
    const userLocation = [];

    React.useEffect(async () => {
        if (validateUserdataStatus === null) {
            const { data: validateData } = await getValidateUsername({ variables: { username: userData.email } });
            setValidateUserdataStatus(validateData.validateUsername);
        } else if (validateUserdataStatus?.isSocialLogin === true) {
            refetch();
        }
    }, [validateUserdataStatus, setValidateUserdataStatus]);

    if (dataLocation) {
        dataLocation.map((e) => {
            userLocation.push(e.label);
        });
    }

    const handleSubmit = ({
        firstname, phone_number, email, currentPassword,
        newPassword, profile_picture, changePassword, changeEmail,
    }) => {
        window.backdropLoader(true);

        if (changePassword === true && changeEmail === true && changePicture === true) {
            const variables = {
                firstname,
                email,
                phone_number,
                password: currentPassword,
                currentPassword,
                newPassword,
            };

            changeCustomerPhoto({
                variables: { profile_picture },
            })
                .then(() => {
                    changePasswordGql({
                        variables,
                    })
                        .then(() => {
                            changeCustomerEmail({
                                variables,
                            })
                                .then(() => {
                                    changeCustomerData({
                                        variables,
                                    })
                                        .then(() => {
                                            window.backdropLoader(false);
                                            window.toastMessage({
                                                open: true,
                                                text: t('selleraccount:Information_has_been_saved'),
                                                variant: 'success',
                                            });
                                            setTimeout(() => refetch(), router.push('/seller/dashboard'), 250);
                                        })
                                        .catch((e) => {
                                            window.backdropLoader(false);
                                            window.toastMessage({
                                                open: true,
                                                text: e.message,
                                                variant: 'error',
                                            });
                                        });
                                })
                                .catch((e) => {
                                    window.backdropLoader(false);
                                    window.toastMessage({
                                        open: true,
                                        text: e.message,
                                        variant: 'error',
                                    });
                                });
                        })
                        .catch((e) => {
                            window.backdropLoader(false);
                            window.toastMessage({
                                open: true,
                                text: e.message,
                                variant: 'error',
                            });
                        });
                })
                .catch((e) => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: e.message,
                        variant: 'error',
                    });
                });
        } if (changePassword === true && changeEmail === true && changePicture === false) {
            const variables = {
                firstname,
                email,
                phone_number,
                password: currentPassword,
                currentPassword,
                newPassword,
            };

            changePasswordGql({
                variables,
            })
                .then(() => {
                    changeCustomerEmail({
                        variables,
                    })
                        .then(() => {
                            changeCustomerData({
                                variables,
                            })
                                .then(() => {
                                    window.backdropLoader(false);
                                    window.toastMessage({
                                        open: true,
                                        text: t('selleraccount:Information_has_been_saved'),
                                        variant: 'success',
                                    });
                                    setTimeout(() => refetch(), router.push('/seller/dashboard'), 250);
                                })
                                .catch((e) => {
                                    window.backdropLoader(false);
                                    window.toastMessage({
                                        open: true,
                                        text: e.message,
                                        variant: 'error',
                                    });
                                });
                        })
                        .catch((e) => {
                            window.backdropLoader(false);
                            window.toastMessage({
                                open: true,
                                text: e.message,
                                variant: 'error',
                            });
                        });
                })
                .catch((e) => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: e.message,
                        variant: 'error',
                    });
                });
        } else if (changePassword === true && changeEmail === false && changePicture === true) {
            const variables = {
                firstname,
                phone_number,
                password: currentPassword,
                currentPassword,
                newPassword,
            };

            changeCustomerPhoto({
                variables: { profile_picture },
            })
                .then(() => {
                    changePasswordGql({
                        variables,
                    })
                        .then(() => {
                            changeCustomerData({
                                variables,
                            })
                                .then(() => {
                                    window.backdropLoader(false);
                                    window.toastMessage({
                                        open: true,
                                        text: t('selleraccount:Information_has_been_saved'),
                                        variant: 'success',
                                    });
                                    setTimeout(() => refetch(), router.push('/seller/dashboard'), 250);
                                })
                                .catch((e) => {
                                    window.backdropLoader(false);
                                    window.toastMessage({
                                        open: true,
                                        text: e.message,
                                        variant: 'error',
                                    });
                                });
                        })
                        .catch((e) => {
                            window.backdropLoader(false);
                            window.toastMessage({
                                open: true,
                                text: e.message,
                                variant: 'error',
                            });
                        });
                })
                .catch((e) => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: e.message,
                        variant: 'error',
                    });
                });
        } else if (changePassword === true && changeEmail === false && changePicture === false) {
            const variables = {
                firstname,
                phone_number,
                password: currentPassword,
                currentPassword,
                newPassword,
            };

            changePasswordGql({
                variables,
            })
                .then(() => {
                    changeCustomerData({
                        variables,
                    })
                        .then(() => {
                            window.backdropLoader(false);
                            window.toastMessage({
                                open: true,
                                text: t('selleraccount:Password_and_name_has_been_saved'),
                                variant: 'success',
                            });
                            setTimeout(() => refetch(), router.push('/seller/dashboard'), 250);
                        })
                        .catch((e) => {
                            window.backdropLoader(false);
                            window.toastMessage({
                                open: true,
                                text: e.message,
                                variant: 'error',
                            });
                        });
                })
                .catch((e) => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: e.message,
                        variant: 'error',
                    });
                });
        } else if (changePassword === false && changeEmail === true && changePicture === false) {
            const variables = {
                email,
                password: currentPassword,
                firstname,
                phone_number,
            };
            changeCustomerEmail({
                variables,
            })
                .then(() => {
                    changeCustomerData({
                        variables,
                    })
                        .then(() => {
                            window.backdropLoader(false);
                            window.toastMessage({
                                open: true,
                                text: t('selleraccount:Email_and_name_has_been_saved'),
                                variant: 'success',
                            });
                            setTimeout(() => refetch(), router.push('/seller/dashboard'), 250);
                        })
                        .catch((e) => {
                            window.backdropLoader(false);
                            window.toastMessage({
                                open: true,
                                text: e.message,
                                variant: 'error',
                            });
                        });
                })
                .catch((e) => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: e.message,
                        variant: 'error',
                    });
                });
        } else if (changePassword === false && changeEmail === true && changePicture === true) {
            const variables = {
                email,
                password: currentPassword,
                firstname,
                phone_number,
            };

            changeCustomerPhoto({
                variables: { profile_picture },
            })
                .then(() => {
                    changeCustomerEmail({
                        variables,
                    })
                        .then(() => {
                            changeCustomerData({
                                variables,
                            })
                                .then(() => {
                                    window.backdropLoader(false);
                                    window.toastMessage({
                                        open: true,
                                        text: t('selleraccount:Information_has_been_saved'),
                                        variant: 'success',
                                    });
                                    setTimeout(() => refetch(), router.push('/seller/dashboard'), 250);
                                })
                                .catch((e) => {
                                    window.backdropLoader(false);
                                    window.toastMessage({
                                        open: true,
                                        text: e.message,
                                        variant: 'error',
                                    });
                                });
                        })
                        .catch((e) => {
                            window.backdropLoader(false);
                            window.toastMessage({
                                open: true,
                                text: e.message,
                                variant: 'error',
                            });
                        });
                })
                .catch((e) => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: e.message,
                        variant: 'error',
                    });
                });
        } else if (changePassword === false && changeEmail === false && changePicture === true) {
            const variables = { firstname, phone_number };
            changeCustomerPhoto({
                variables: { profile_picture },
            })
                .then(() => {
                    changeCustomerData({
                        variables,
                    })
                        .then(() => {
                            window.backdropLoader(false);
                            window.toastMessage({
                                open: true,
                                text: t('selleraccount:Information_has_been_saved'),
                                variant: 'success',
                            });
                            setTimeout(() => refetch(), router.push('/seller/dashboard'), 250);
                        })
                        .catch((e) => {
                            window.backdropLoader(false);
                            window.toastMessage({
                                open: true,
                                text: e.message,
                                variant: 'error',
                            });
                        });
                })
                .catch((e) => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: e.message,
                        variant: 'error',
                    });
                });
        } else if (changePassword === false && changeEmail === false && changePicture === false) {
            const variables = { firstname, phone_number };
            const accountData = Cookies.getJSON('cdt');
            changeCustomerData({
                variables,
            })
                .then((res) => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: t('selleraccount:The_name_has_been_saved'),
                        variant: 'success',
                    });
                    accountData.firstname = res.data.updateCustomer.customer.firstname;
                    Cookies.set('cdt', JSON.stringify(accountData));
                    setTimeout(() => refetch(), router.push('/seller/dashboard'), 250);
                })
                .catch((e) => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: e.message,
                        variant: 'error',
                    });
                });
        }
    };

    const formik = useFormik({
        initialValues: {
            email: userData.email,
            firstname: userData.firstname,
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            changeEmail: false,
            changePassword: false,
            changePicture: false,
            phone_number: userData.phone_number,
            profile_picture: profilePicture.getUserProfilePicture,
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().when('changeEmail', {
                is: true,
                then: Yup.string().required(t('selleraccount:This_is_a_Required_field')).matches(regexEmail, t('selleraccount:Invalid_email_format')),
            }),
            currentPassword: validateUserdataStatus?.isInternalLogin === true && Yup.string()
                .when('changeEmail', {
                    is: true,
                    then: Yup.string().required(t('selleraccount:This_is_a_Required_field')),
                })
                .when('changePassword', {
                    is: true,
                    then: Yup.string().required(t('selleraccount:This_is_a_Required_field')),
                }),
            newPassword: Yup.string().when('changePassword', {
                is: true,
                then: Yup.string().required(t('selleraccount:This_is_a_Required_field')),
            }),
            confirmPassword: Yup.string().when('changePassword', {
                is: true,
                then: Yup.string()
                    .required(t('selleraccount:This_is_a_Required_field'))
                    .required(t('selleraccount:Please_confirm_your_password'))
                    .oneOf([Yup.ref('newPassword')], t('selleraccount:Passwords_do_not_match')),
            }),
            phone_number: Yup.string().nullable()
                .matches(new RegExp(/^[0-9]*$/), t('selleraccount:Invalid_phone_number_format'))
                .required(t('selleraccount:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            const variables = {
                ...values,
                currentPassword: validateUserdataStatus?.isInternalLogin === false ? '-' : values.currentPassword,
            };
            handleSubmit(variables);
        },
    });

    const [getValidateUsername] = validateUsername();
    const [getRequestOtp] = requestOtp();
    const [getVerifyOtp] = verifyOtp();
    const [validateUserdataStatus, setValidateUserdataStatus] = React.useState(null);
    const [otp, setOtp] = React.useState(getOtpState('otp_input', 'account') === '1');
    const [duration, setDuration] = React.useState(parseInt(getOtpState('last_duration', 'account')) || 0);
    const [timeLeft, setTimeLeft] = useState(duration - new Date().getTime());
    const [allowOtpChange, setAllowOtpChange] = React.useState(false);
    const [phone, setPhone] = React.useState(otp === true ? getOtpState('phone', 'account') : formik?.values?.phone_number);
    const [otpVal, setOtpVal] = React.useState('');
    const [isOtpVerify, setIsOtpVerify] = React.useState(false);

    React.useEffect(() => {
        const timerInterval = setInterval(() => {
            const currentTime = new Date().getTime();
            const newTimeLeft = duration - currentTime;

            if (newTimeLeft <= 0) {
                setAllowOtpChange(true);
                setOtpState('otp_input', 'account', 0);
                clearInterval(timerInterval);
            } else {
                setAllowOtpChange(false);
                setTimeLeft(newTimeLeft);
            }
        }, 700);

        return () => {
            clearInterval(timerInterval);
        };
    }, [duration]);

    const checkPhoneNumber = async () => {
        window.backdropLoader(true);
        const { data: isExistsPhone } = await getValidateUsername({ variables: { username: phone } });

        if (isExistsPhone?.validateUsername?.isExists) {
            window.toastMessage({
                open: true,
                text: t('registerseller:phone_registered'),
                variant: 'error',
            });
        } else {
            const getOtp = await getRequestOtp({
                variables: {
                    phone_number: filterPhone(phone),
                    email: '',
                    store_name: filterStoreName(userLocation.toString()).toString(),
                },
            }).catch(() => {
                window.toastMessage({
                    open: true,
                    text: t('registerseller:failed_otp'),
                    variant: 'error',
                });
            });

            if (getOtp?.data?.requestOtp === 'success') {
                setOtpState('last_duration', 'account', maxDuration());
                setOtpState('otp_input', 'account', 1);
                setAllowOtpChange(false);
                setDuration(parseInt(getOtpState('last_duration', 'account'), 10));
                setOtpVal('');
                setOtp(true);

                window.toastMessage({
                    open: true,
                    text: t('registerseller:check_phone_otp'),
                    variant: 'success',
                });
            } else {
                window.toastMessage({
                    open: true,
                    text: t('registerseller:failed_otp'),
                    variant: 'error',
                });
            }
        }
        window.backdropLoader(false);
    };

    const startVerifyOtp = async () => {
        window.backdropLoader(true);
        const getVerify = await getVerifyOtp({
            variables: {
                phone_number: phone,
                email: '',
                otp_number: String(otpVal),
            },
        }).catch(() => {
            setIsOtpVerify(false);
            window.toastMessage({
                open: true,
                text: t('registerseller:incorrect_otp'),
                variant: 'error',
            });
        });

        if (getVerify?.data?.verifyOtp === 'success') {
            setIsOtpVerify(true);
            window.toastMessage({
                open: true,
                text: t('registerseller:verified_otp'),
                variant: 'success',
            });
        } else {
            setIsOtpVerify(false);
            window.toastMessage({
                open: true,
                text: t('registerseller:incorrect_otp'),
                variant: 'error',
            });
        }
        window.backdropLoader(false);
    };

    const handleDropFile = (files) => {
        formik.setFieldValue('profile_picture', files[0].baseCode);
        setChangePicture(true);
    };

    const contentProps = {
        ...props,
        t,
        formik,
        handleDropFile,
        userLocation,
        login_method: userData?.login_method || false,
        validateUserdataStatus,
        otp,
        setOtp,
        timeLeft,
        allowOtpChange,
        phone,
        setPhone,
        otpVal,
        setOtpVal,
        isOtpVerify,
        startVerifyOtp,
        checkPhoneNumber,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const {
        loading, data, error, refetch,
    } = gqlService.getCustomer();
    const { data: dataPicture, loading: loadPicture } = gqlService.getUserProfilePicture();
    const { data: dataLocation, loading: loadLocation } = gqlService.getSellerStoreOptions();
    const { data: sizeData, loading: sizeLoading } = themeService.storeConfigSize();

    const pageConfig = {
        title: t('selleraccount:Account_Information'),
    };

    React.useEffect(() => {
        BackdropLoad(loading || loadPicture || loadLocation || sizeLoading);
    }, [loading || loadPicture || loadLocation, sizeLoading]);

    if (loading || loadPicture || loadLocation || sizeLoading) {
        return <Layout pageConfig={pageConfig} seller />;
    }

    if (!data) {
        const errMsg = error?.message ?? t('selleraccount:Data_not_found');
        const redirect = '/';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} isSeller />;
    }

    const contentProps = {
        ...props,
        data,
        dataPicture,
        dataLocation: dataLocation?.getSellerStoreOptions || [],
        t,
        refetch,
        limitSizeConfig: sizeData?.storeConfig || {},
    };

    return (
        <Layout pageConfig={pageConfig} seller>
            <ContentWrapper {...contentProps} />
        </Layout>
    );
};

export default Core;
