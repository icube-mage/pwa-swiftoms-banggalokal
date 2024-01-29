import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import gqlService from '@modules/orderslireport/services/graphql';
import aclService from '@modules/theme/services/graphql';
import gqlChannel from '@modules/channel/services/graphql';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;

    const pageConfig = {
        title: t('orderslireport:Order_Service_Level_Indicator_SLI_Report'),
    };

    const [getOrderSliReport, getOrderSliReportRes] = gqlService.getOrderSliReport({
        onError: (e) => {
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        },
    });
    const [getChannelList, getChannelListRes] = gqlChannel.getChannelList();

    const formik = useFormik({
        initialValues: {
            period: 'day',
            date_from: '',
            date_to: '',
            channel_codes: [],
        },
        validationSchema: Yup.object().shape({
            period: Yup.string().required(t('orderslireport:This_is_a_Required_field')),
            date_from: Yup.string().required(t('orderslireport:This_is_a_Required_field')),
            date_to: Yup.string().required(t('orderslireport:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            const variables = {
                ...values,
                channel_codes: values.channel_codes?.map((channel) => channel.channel_code) || [],
            };
            getOrderSliReport({ variables });
        },
    });

    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'order_sli_report',
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
        getChannelList,
        getChannelListRes,
        getOrderSliReportRes,
        ...props,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
