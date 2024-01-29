/* eslint-disable max-len */
import React, { useEffect } from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/vendoririspayout/services/graphql';
import aclService from '@modules/theme/services/graphql';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;
    const router = useRouter();
    const [createVendorIrisPayout] = gqlService.createVendorIrisPayout();
    const [getVendorIrisBalance, getVendorIrisBalanceData] = gqlService.getVendorIrisBalance();

    useEffect(() => {
        getVendorIrisBalance();
    }, []);

    const handleSubmit = ({
        beneficiaryId, amount, notes,
    }) => {
        const variables = {
            beneficiary_id: Number(beneficiaryId.entity_id),
            amount,
            notes,
        };
        window.backdropLoader(true);
        createVendorIrisPayout({
            variables,
        }).then((res) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: res.data.createVendorIrisPayout.message,
                variant: 'success',
            });
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
            beneficiaryId: '',
            amount: '',
            notes: '',
        },
        validationSchema: Yup.object().shape({
            beneficiaryId: Yup.object().typeError(t('vendoririspayout:This_is_a_Required_field')).required(t('vendoririspayout:This_is_a_Required_field')),
            amount: Yup.string().required(t('vendoririspayout:This_is_a_Required_field')),
            notes: Yup.string().required(t('vendoririspayout:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const pageConfig = {
        title: t('vendoririspayout:Create_Payout'),
    };

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'vendor_manage_iris',
    });

    const { loading: configLoading, data: configData } = aclService.getStoreConfig({
        path: 'swiftoms_vendorportal/configuration/beneficiaries',
    });

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading || configLoading);
    }, [aclCheckLoading, configLoading]);

    if (aclCheckLoading || configLoading) {
        return <Layout />;
    }

    if (((aclCheckData && aclCheckData.isAccessAllowed) === false)
        || (configData && configData.getStoreConfig === '0')) {
        router.push('/');
        return <Layout />;
    }

    const contentProps = {
        formik,
        balance: getVendorIrisBalanceData.data && getVendorIrisBalanceData?.data.getVendorIrisBalance,
        t,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
