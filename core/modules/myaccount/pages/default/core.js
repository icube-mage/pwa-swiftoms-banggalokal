import React from 'react';
import Layout from '@layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import gqlService from '@modules/myaccount/services/graphql';
import loginGqlService from '@modules/login/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import Cookies from 'js-cookie';
import { custDataNameCookie } from '@config';
import { regexEmail } from '@helper_regex';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const { Content, data } = props;

    const [updateAdminStore] = gqlService.updateAdminStore();
    const [getCustomer] = loginGqlService.getCustomer({
        onCompleted: (res) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Account has been saved.',
                variant: 'success',
            });
            Cookies.set(custDataNameCookie, res.customer);
            setTimeout(() => { window.location.reload(); }, 250);
        },
    });

    const handleSubmit = (input) => {
        window.backdropLoader(true);
        updateAdminStore({
            variables: {
                id: data.entity_id,
                input,
            },
        }).then(async () => {
            getCustomer();
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const formik = useFormik({
        initialValues: {
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
        },
        validationSchema: Yup.object().shape({
            firstname: Yup.string().required('This field is Required!'),
            lastname: Yup.string().required('This field is Required!'),
            email: Yup.string().required('This field is Required!').matches(regexEmail, 'Invalid email format!'),
        }),
        onSubmit: (values) => {
            const { password, ...restValues } = values;
            const valueToSubmit = {
                ...restValues,
                customer_company_code: data.customer_company_code,
                customer_loc_code: data.customer_loc_code,
                group_id: data.group_id,
            };
            if (password) {
                valueToSubmit.password = password;
            }
            handleSubmit(valueToSubmit);
        },
    });

    const contentProps = {
        formik,
    };
    return (
        <Content {...contentProps} {...props} />
    );
};

const Core = (props) => {
    const pageConfig = {
        title: 'My Account',
    };

    if (typeof window === 'undefined') {
        return <Layout />;
    }
    const email = JSON.parse(Cookies.get('cdt'))?.email;

    const { loading, data, error } = gqlService.getAdminStoreList({
        filter: {
            email: {
                like: email,
            },
        },
    });

    React.useEffect(() => {
        BackdropLoad(loading);
    }, [loading]);

    if (loading) {
        return <Layout />;
    }
    if (!data) {
        const errMsg = error?.message ?? 'Data not found!';
        const redirect = '/configurations/marketplacebrand';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} />;
    }

    const contentProps = {
        data: data.getAdminStoreList.items[0],
    };

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper {...contentProps} {...props} />
        </Layout>
    );
};

export default Core;
