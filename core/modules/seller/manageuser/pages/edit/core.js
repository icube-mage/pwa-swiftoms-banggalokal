import React from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import cookies from 'js-cookie';

import BackdropLoad from '@helper_backdropload';
import { regexPhoneDial } from '@helper_regex';

import Layout from '@layout';
import gqlService from '@sellermodules/manageuser/services/graphql';
import ErrorRedirect from '@common_errorredirect';

const ContentWrapper = (props) => {
    const {
        Content, t, data, dataAcl, dataLoc,
    } = props;
    const router = useRouter();

    const [editSellerUser] = gqlService.editSellerUser();

    const handleSubmit = (input) => {
        window.backdropLoader(true);
        editSellerUser({
            variables: { input },
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('sellermanageuser:User_has_been_updated'),
                    variant: 'success',
                });
                setTimeout(() => router.push('/seller/manageuser'), 250);
            })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
    };

    const [dialCode, setDialCode] = React.useState('62');
    const useRegexPhone = regexPhoneDial(dialCode);
    const formik = useFormik({
        initialValues: {
            id: router && router.query && Number(router.query.id),
            name: data?.name,
            email: data?.email,
            telephone: data?.telephone,
            customer_loc_code: data?.customer_loc_code.map((loc) => dataLoc.find((dl) => String(dl.loc_code) === String(loc))),
            acl_code: dataAcl?.acl_code || [],
            use_group_acl: dataAcl?.use_group_acl ?? false,
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('sellermanageuser:This_is_a_Required_field')),
            email: Yup.string().email(t('sellermanageuser:Invalid_email_format')).required(t('sellermanageuser:This_is_a_Required_field')),
            telephone: Yup.string().nullable().matches(useRegexPhone, t('registerseller:Invalid_phone_number_format'))
                .required(t('registerseller:This_is_a_Required_field')),
            customer_loc_code: Yup.array().of(Yup.object())
                .min(1, t('selercatalog:Choose_at_least_min_key', { min: 1, key: t('sellermanageuser:location') })),
        }),
        onSubmit: (values) => {
            handleSubmit({
                ...values,
                customer_loc_code: values.customer_loc_code.map((loc) => String(loc.loc_code)),
            });
        },
    });

    const contentProps = {
        ...props,
        formik,
        setDialCode,
    };

    return (
        <Content {...contentProps} />
    );
};
const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const pageConfig = {
        title: t('sellermanageuser:Manage_User'),
    };

    const { data, loading, error } = gqlService.getSellerUsers({
        pageSize: 1,
        currentPage: 1,
        filter: {
            id: {
                eq: String(router.query.id),
            },
        },
    });
    const { data: dataAcl, loading: loadingAcl } = gqlService.getAclByCustomerId({
        customer_id: router && router.query && Number(router.query.id),
    });
    const { data: dataTree, loading: loadTree } = gqlService.getSellerAclTree();
    const { data: dataLoc, loading: loadLoc } = gqlService.getLocationList({
        pageSize: 1000,
        currentPage: 1,
        filter: {
            company_id: { eq: cookies.getJSON('cdt')?.customer_company_code },
        },
    });

    React.useEffect(() => {
        BackdropLoad(loading || loadTree || loadLoc || loadingAcl);
    }, [loading, loadTree, loadLoc, loadingAcl]);

    if (loading || loadTree || loadLoc || loadingAcl) {
        return <Layout pageConfig={pageConfig} seller />;
    }

    if (data?.getSellerUsers?.items.length === 0) {
        const errMsg = error?.message ?? t('common:Data_not_found');
        const redirect = '/seller/manageuser';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} isSeller />;
    }

    const contentProps = {
        ...props,
        data: data?.getSellerUsers?.items?.[0],
        dataAcl: dataAcl?.getAclByCustomerId || {},
        dataTree: dataTree?.getSellerAclTree || [],
        dataLoc: dataLoc?.getLocationList?.items || [],
    };

    return (
        <Layout pageConfig={pageConfig} seller>
            <ContentWrapper
                {...contentProps}
            />
        </Layout>
    );
};

export default Core;
