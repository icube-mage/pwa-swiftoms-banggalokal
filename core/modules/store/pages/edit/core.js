import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/store/services/graphql';
import aclService from '@modules/theme/services/graphql';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
    } = props;
    // const router = useRouter();
    const company = data.getCompanyById;
    // const [updateCompany] = gqlService.updateCompany();

    // const handleSubmit = ({ code, name }) => {
    //     const variables = { id: company.company_id, company_code: code, company_name: name };
    //     window.backdropLoader(true);
    //     updateCompany({
    //         variables,
    //     }).then(() => {
    //         window.backdropLoader(false);
    //         window.toastMessage({
    //             open: true,
    //             text: 'Success edit company!',
    //             variant: 'success',
    //         });
    //         setTimeout(() => router.push('/marketplace/store'), 250);
    //     }).catch((e) => {
    //         window.backdropLoader(false);
    //         window.toastMessage({
    //             open: true,
    //             text: e.message,
    //             variant: 'error',
    //         });
    //     });
    // };

    const formik = useFormik({
        initialValues: {
            code: company.company_code,
            name: company.company_name,
        },
        validationSchema: Yup.object().shape({
            code: Yup.string().required('Required!'),
            name: Yup.string().required('Required!'),
        }),
        // onSubmit: (values) => {
        // handleSubmit(values);
        // },
    });

    const contentProps = {
        formik,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data } = gqlService.getCompanyById({
        id: router && router.query && Number(router.query.id),
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'store',
    });

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading);
    }, [loading, aclCheckLoading]);

    if (loading || aclCheckLoading) {
        return <Layout />;
    }

    if (!data) {
        return (
            <Layout>Data not found!</Layout>
        );
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    return (
        <Layout>
            <ContentWrapper data={data} {...props} />
        </Layout>
    );
};

export default Core;
