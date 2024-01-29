import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import gqlService from '@modules/orderreport/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;
    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_order_report',
    });

    const [getSalesOrderReport, getSalesOrderReportRes] = gqlService.getSalesOrderReport({
        onError: (e) => {
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        },
    });

    const [generateSalesOrderReport] = gqlService.generateSalesOrderReport({
        onCompleted: (res) => {
            window.backdropLoader(false);
            if (res.generateSalesOrderReport) {
                window.toastMessage({
                    open: true,
                    text: t('orderreport:Order_report_statistics_have_been_refreshed'),
                    variant: 'success',
                });
            } else {
                throw new Error(t('orderreport:Something_went_wrong_while_trying_to_refresh_order_report_statistics'));
            }
        },
        onError: (e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        },
    });

    const formik = useFormik({
        initialValues: {
            period: 'day',
            date_from: '',
            date_to: '',
            status: '',
        },
        validationSchema: Yup.object().shape({
            period: Yup.string().required(t('orderreport:This_is_a_Required_field')),
            date_from: Yup.string().required(t('orderreport:This_is_a_Required_field')),
            date_to: Yup.string().required(t('orderreport:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            getSalesOrderReport({
                variables: {
                    input: {
                        ...values,
                        status: values.status || '',
                    },
                },
            });
        },
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
        generateSalesOrderReport,
        getSalesOrderReportRes,
        ...props,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
