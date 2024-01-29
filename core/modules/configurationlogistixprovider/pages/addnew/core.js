/* eslint-disable no-unused-vars */
import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/configurationlogistixprovider/services/graphql';
import aclService from '@modules/theme/services/graphql';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;
    const router = useRouter();

    const pageConfig = {
        title: t('logistixproviderconfiguration:Add_New_Logistix_Provider'),
    };

    const [saveLogistixProvider] = gqlService.saveLogistixProvider();

    const handleSubmit = (input) => {
        window.backdropLoader(true);
        saveLogistixProvider({
            variables: { input },
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('logistixproviderconfiguration:Logistix_Provider_has_been_saved'),
                variant: 'success',
            });
            setTimeout(() => router.push('/configurations/logistixprovider'), 250);
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
            channel_shipping_method: '',
            provider: '',
            service: '',
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

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_logistix_provider',
    });

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading);
    }, [aclCheckLoading]);

    if (aclCheckLoading) {
        return <Layout />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        formik,
        t,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
