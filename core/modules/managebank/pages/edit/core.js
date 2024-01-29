/* eslint-disable max-len */
import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/managebank/services/graphql';
import aclService from '@modules/theme/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const {
        data,
        t, Content,
    } = props;
    const router = useRouter();
    const [saveVendorBank] = gqlService.saveVendorBank();

    const handleSubmit = (input) => {
        window.backdropLoader(true);
        saveVendorBank({
            variables: { input },
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('managebank:Bank_has_been_succesfully_updated'),
                    variant: 'success',
                });
                setTimeout(() => router.push('/vendorportal/managebank'), 250);
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
            bank_code: data.bank_code,
            withdrawal_fee_type: data.withdrawal_fee_type || 'percent_of_amount',
            withdrawal_fee: data.withdrawal_fee || '',
        },
        validationSchema: Yup.object().shape({
            withdrawal_fee: Yup.number()
                .nullable()
                .min(0, t('managebank:Minimum_value_is_min', { min: 0 }))
                .when('withdrawal_fee_type', (withdrawal_fee_type, schema) => (withdrawal_fee_type === 'percent_of_amount'
                    ? schema.max(100, t('managebank:Maximum_value_is_max', { max: 100 })) : schema))
                .typeError(t('managebank:Value_must_be_a_number')),
        }),
        onSubmit: (values) => {
            const { withdrawal_fee } = values;
            const valueToSubmit = {
                ...values,
                withdrawal_fee: parseFloat(withdrawal_fee),
            };
            handleSubmit(valueToSubmit);
        },
    });

    const contentProps = {
        ...props,
        formik,
        t,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'vendor_manage_bank',
    });

    const { loading, data, error } = gqlService.getVendorBankList({
        filter: {
            bank_code: {
                eq: router && router.query && router.query.code,
            },
        },
        pageSize: 1,
    });

    const pageConfig = {
        title: t('managebank:Edit_Bank'),
    };

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading);
    }, [loading, aclCheckLoading]);

    if (loading || aclCheckLoading) {
        return <Layout pageConfig={pageConfig} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    if (!data) {
        const errMsg = error?.message ?? t('managebank:Data_not_found');
        const redirect = '/vendorportal/managebank';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} />;
    }

    const contentProps = {
        data: data?.getVendorBankList?.items?.[0],
        t,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper {...contentProps} {...props} />
        </Layout>
    );
};

export default Core;
