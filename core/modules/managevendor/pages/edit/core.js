/* eslint-disable max-len */
import React from 'react';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';

import gqlService from '@modules/managevendor/services/graphql';
import aclService from '@modules/theme/services/graphql';
import locationGqlService from '@modules/location/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';
import Layout from '@layout';

const ContentWrapper = (props) => {
    const {
        data, Content, t,
    } = props;
    const router = useRouter();
    const vendor = data.getVendorById;
    const [vendorUpdate] = gqlService.vendorUpdate();

    const isVendor = JSON.parse(Cookies.get('cdt'))?.customer_company_code !== null;

    const handleSubmit = (input) => {
        window.backdropLoader(true);
        vendorUpdate({
            variables: { input },
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('managevendor:Vendor_has_been_successfully_updated'),
                    variant: 'success',
                });
                setTimeout(() => router.push('/vendorportal/managevendor'), 250);
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

    const formik = useFormik({
        initialValues: {
            company_margin: vendor.company_margin,
            is_product_approval: Number(vendor.is_product_approval) || 0,
        },
        validationSchema: Yup.object().shape({
            company_margin: Yup.number()
                .nullable()
                .integer(t('managevendor:Value_must_be_an_integer'))
                .min(0, t('managevendor:Minimum_value_is_min', { min: 0 }))
                .max(100, t('managebank:Maximum_value_is_max', { max: 100 }))
                .typeError(t('managevendor:Value_must_be_a_number')),
        }),
        onSubmit: (values) => {
            const { company_margin, is_product_approval } = values;
            const { company_id, company_code } = vendor;
            const valuesToSubmit = {
                company_id,
                company_code,
                company_margin: company_margin ? Number(company_margin) : null,
                is_product_approval,
            };
            handleSubmit(valuesToSubmit);
        },
    });

    const contentProps = {
        ...props,
        formik,
        isVendor,
        vendor,
        t,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_vendor_manage',
    });

    const { loading, data, error } = gqlService.getVendorById({
        id: router && router.query && Number(router.query.id),
    });
    const { loading: loadingApproval, data: dataApproval } = gqlService.getAutoApprovalOptions();
    const { loading: loadingLoc, data: dataLoc } = locationGqlService.getLocationListQuery({
        pageSize: 1000,
        currentPage: 1,
        filter: {
            company_id: {
                eq: router.query.id,
            },
        },
    });

    const pageConfig = {
        title: `${t('managevendor:Manage_Vendor')} ${data && data.getVendorById && data.getVendorById.company_name ? data.getVendorById.company_name : ''}`,
    };

    React.useEffect(() => {
        BackdropLoad(loading || loadingLoc || aclCheckLoading || loadingApproval);
    }, [loading, loadingLoc, aclCheckLoading, loadingApproval]);

    if (loading || loadingLoc || aclCheckLoading || loadingApproval) {
        return <Layout pageConfig={pageConfig} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    if (!data) {
        const errMsg = error?.message ?? t('managevendor:Data_not_found');
        const redirect = '/vendorportal/managevendor';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} />;
    }

    const contentProps = {
        data,
        dataApproval: dataApproval.getAutoApprovalOptions,
        t,
        dataLocations: dataLoc.getLocationList?.items || [],
    };

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper {...contentProps} {...props} />
        </Layout>
    );
};

export default Core;
