import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/configurationlogistixprovider/services/graphql';
import aclService from '@modules/theme/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const { data, Content, t } = props;
    const router = useRouter();
    const logistixDetail = data.getLogistixProviderById;
    const [saveLogistixProvider] = gqlService.saveLogistixProvider();

    const handleSubmit = (input) => {
        window.backdropLoader(true);
        saveLogistixProvider({
            variables: { input },
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('logistixproviderconfiguration:Logistix_Provider_has_been_saved'),
                    variant: 'success',
                });
                setTimeout(() => router.push('/configurations/logistixprovider'), 250);
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
            entity_id: Number(logistixDetail.entity_id),
            channel_shipping_method: logistixDetail.channel_shipping_method,
            provider: logistixDetail.provider,
            service: logistixDetail.service,
        },
        validationSchema: Yup.object().shape({
            channel_shipping_method: Yup.string().required(t('logistixproviderconfiguration:This_is_a_Required_field')),
            provider: Yup.string().required(t('logistixproviderconfiguration:This_is_a_Required_field')),
            service: Yup.string().required(t('logistixproviderconfiguration:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const contentProps = {
        logistixDetail,
        formik,
        t,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const pageConfig = {
        title: `${t('logistixproviderconfiguration:Logistix_Provider_Configuration')} #${router?.query?.id}`,
    };
    const { loading, data, error } = gqlService.getLogistixProviderById({
        id: router && router.query && Number(router.query.id),
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_logistix_provider',
    });

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading);
    }, [loading, aclCheckLoading]);

    if (loading || aclCheckLoading) {
        return <Layout pageConfig={pageConfig} />;
    }

    if (!data) {
        const errMsg = error?.message ?? t('logistixproviderconfiguration:Data_not_found');
        const redirect = '/configurations/logistixprovider';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} />;
    }
    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper data={data} {...props} />
        </Layout>
    );
};

export default Core;
