/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import gqlService from '@sellermodules/manageaccount/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import { regexEmail } from '@helper_regex';
import BackdropLoad from '@helper_backdropload';

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
                                            setTimeout(() => refetch(), router.push('/seller/order'), 250);
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
                                    setTimeout(() => refetch(), router.push('/seller/order'), 250);
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
                                    setTimeout(() => refetch(), router.push('/seller/order'), 250);
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
                            setTimeout(() => refetch(), router.push('/seller/order'), 250);
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
                            setTimeout(() => refetch(), router.push('/seller/order'), 250);
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
                                    setTimeout(() => refetch(), router.push('/seller/order'), 250);
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
                            setTimeout(() => refetch(), router.push('/seller/order'), 250);
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
            changeCustomerData({
                variables,
            })
                .then(() => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: t('selleraccount:The_name_has_been_saved'),
                        variant: 'success',
                    });
                    setTimeout(() => refetch(), router.push('/seller/order'), 250);
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
            currentPassword: Yup.string()
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
            handleSubmit(values);
        },
    });

    const handleDropFile = (files) => {
        formik.setFieldValue('profile_picture', files[0].baseCode);
        setChangePicture(true);
    };

    const contentProps = {
        ...props,
        formik,
        userLocation,
        t,
        handleDropFile,
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

    const pageConfig = {
        title: 'Manage Account',
    };

    React.useEffect(() => {
        BackdropLoad(loading || loadPicture) || loadLocation;
    }, [loading || loadPicture || loadLocation]);

    if (loading || loadPicture || loadLocation) {
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
    };

    return (
        <Layout pageConfig={pageConfig} seller>
            <ContentWrapper {...contentProps} />
        </Layout>
    );
};

export default Core;
