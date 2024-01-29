import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/company/services/graphql';
import aclService from '@modules/theme/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
        netsuiteConfig,
        logistixConfig,
        t,
    } = props;
    const router = useRouter();
    const company = data.getCompanyById;
    const [updateCompany] = gqlService.updateCompany();

    const handleSubmit = ({
        code, name, logistix_credentials_flag, netsuite_id,
    }) => {
        const variables = {
            id: company.company_id,
            company_code: code,
            company_name: name,
            logistix_credentials_flag,
            netsuite_id: Number(netsuite_id) || 0,
        };
        window.backdropLoader(true);
        updateCompany({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('company:The_company_has_been_saved'),
                    variant: 'success',
                });
                setTimeout(() => router.push('/oms/company'), 250);
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
            code: company.company_code,
            name: company.company_name,
            logistix_credentials_flag: company.logistix_credentials_flag,
            netsuite_id: company.netsuite_id,
        },
        validationSchema: Yup.object().shape({
            code: Yup.string().required(t('company:This_is_a_Required_field')),
            name: Yup.string().required(t('company:This_is_a_Required_field')),
            logistix_credentials_flag: Yup.string().nullable(),
            netsuite_id: Yup.number().nullable(),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const contentProps = {
        formik,
        netsuiteConfig,
        logistixConfig,
        t,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const { loading, data, error } = gqlService.getCompanyById({
        id: router && router.query && Number(router.query.id),
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_company',
    });

    const { loading: loadingNetsuiteConfig, data: netsuiteConfig } = gqlService.getStoreConfig({
        path: 'swiftoms_netsuite/general/active',
    });

    const { loading: loadingLogistixConfig, data: logistixConfig } = gqlService.getStoreConfig({
        path: 'swiftoms_logistix/general/enable_generate_awb',
    });

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading || loadingNetsuiteConfig || loadingLogistixConfig);
    }, [loading, aclCheckLoading, loadingNetsuiteConfig, loadingLogistixConfig]);

    if (loading || aclCheckLoading || loadingNetsuiteConfig || loadingLogistixConfig) {
        return <Layout />;
    }

    if (!data) {
        const errMsg = error?.message ?? t('company:Data_not_found');
        const redirect = '/oms/company';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        data,
        netsuiteConfig: netsuiteConfig?.getStoreConfig,
        logistixConfig: logistixConfig?.getStoreConfig,
        t,
    };

    return (
        <Layout>
            <ContentWrapper
                {...contentProps}
                {...props}
            />
        </Layout>
    );
};

export default Core;
