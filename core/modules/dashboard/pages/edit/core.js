import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/dashboard/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import { regexPhoneDial, regexEmail } from '@helper_regex';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const { data, Content, t } = props;
    const router = useRouter();
    const userData = data.customer;
    const [changePasswordGql] = gqlService.changePassword();
    const [changeNameGql] = gqlService.changeName();
    const [changeEmailGql] = gqlService.changeEmail();

    const [dialCode, setDialCode] = React.useState('62');
    const useRegexPhone = regexPhoneDial(dialCode);

    const handleSubmit = ({
        firstname, lastname, email, currentPassword, newPassword, changePassword, changeEmail, phone_number,
    }) => {
        window.backdropLoader(true);

        if (changePassword === true && changeEmail === true) {
            const variables = {
                firstname,
                lastname,
                email,
                password: currentPassword,
                newPassword,
                currentPassword,
                phone_number,
            };

            changePasswordGql({
                variables,
            })
                .then(() => {
                    changeEmailGql({
                        variables,
                    })
                        .then(() => {
                            changeNameGql({
                                variables,
                            })
                                .then(() => {
                                    window.backdropLoader(false);
                                    window.toastMessage({
                                        open: true,
                                        text: t('dashboard:Information_has_been_saved'),
                                        variant: 'success',
                                    });
                                    setTimeout(() => router.push('/'), 250);
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
        } else if (changePassword === true && changeEmail === false) {
            const variables = {
                newPassword,
                currentPassword,
                firstname,
                lastname,
                phone_number,
            };

            changePasswordGql({
                variables,
            })
                .then(() => {
                    changeNameGql({
                        variables,
                    })
                        .then(() => {
                            window.backdropLoader(false);
                            window.toastMessage({
                                open: true,
                                text: t('dashboard:Password_and_name_has_been_saved'),
                                variant: 'success',
                            });
                            setTimeout(() => router.push('/'), 250);
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
        } else if (changePassword === false && changeEmail === true) {
            const variables = {
                email,
                password: currentPassword,
                firstname,
                lastname,
                phone_number,
            };

            changeEmailGql({
                variables,
            })
                .then(() => {
                    changeNameGql({
                        variables,
                    })
                        .then(() => {
                            window.backdropLoader(false);
                            window.toastMessage({
                                open: true,
                                text: t('dashboard:Email_and_name_has_been_saved'),
                                variant: 'success',
                            });
                            setTimeout(() => router.push('/'), 250);
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
        } else {
            const variables = { firstname, lastname, phone_number };

            changeNameGql({
                variables,
            })
                .then(() => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: t('dashboard:The_name_has_been_saved'),
                        variant: 'success',
                    });
                    setTimeout(() => router.push('/'), 250);
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
            lastname: userData.lastname,
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            customer_loc_code: userData.customer_loc_code,
            channel_code: userData.channel_code,
            changeEmail: false,
            changePassword: false,
            phone_number: userData.phone_number,
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().when('changeEmail', {
                is: true,
                then: Yup.string().required(t('dashboard:This_is_a_Required_field')).matches(regexEmail, t('dashboard:Invalid_email_format')),
            }),
            firstname: Yup.string().required(t('dashboard:This_is_a_Required_field')),
            lastname: Yup.string().required(t('dashboard:This_is_a_Required_field')),
            currentPassword: Yup.string()
                .when('changeEmail', {
                    is: true,
                    then: Yup.string().required(t('dashboard:This_is_a_Required_field')),
                })
                .when('changePassword', {
                    is: true,
                    then: Yup.string().required(t('dashboard:This_is_a_Required_field')),
                }),
            newPassword: Yup.string().when('changePassword', {
                is: true,
                then: Yup.string().required(t('dashboard:This_is_a_Required_field')),
            }),
            confirmPassword: Yup.string().when('changePassword', {
                is: true,
                then: Yup.string()
                    .required(t('dashboard:This_is_a_Required_field'))
                    .required(t('dashboard:Please_confirm_your_password'))
                    .oneOf([Yup.ref('newPassword')], t('dashboard:Passwords_do_not_match')),
            }),
            phone_number: Yup.string().nullable()
                .matches(useRegexPhone, t('dashboard:Invalid_phone_number_format')).required(t('dashboard:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const contentProps = {
        formik,
        t,
        setDialCode,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const { loading, data, error } = gqlService.getCustomer();

    const pageConfig = {
        title: t('dashboard:Dashboard'),
    };

    React.useEffect(() => {
        BackdropLoad(loading);
    }, [loading]);

    if (loading) {
        return <Layout pageConfig={pageConfig} />;
    }

    if (!data) {
        const errMsg = error?.message ?? t('dashboard:Data_not_found');
        const redirect = '/';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} />;
    }

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper data={data} {...props} />
        </Layout>
    );
};

export default Core;
