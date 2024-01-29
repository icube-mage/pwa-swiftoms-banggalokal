/* eslint-disable no-use-before-define */
/* eslint-disable max-len */
import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import gqlService from '@modules/exportorder/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;

    const [getOrderReportCsv] = gqlService.getOrderReportCsv({
        onCompleted: (res) => {
            window.backdropLoader(false);
            router.push(res.getOrderReportCsv);
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

    const handleDone = () => {
        window.backdropLoader(true);
        if (formik.values.exportFile.id === 'csv') {
            getOrderReportCsv({
                variables: {
                    export: formik.values.exportFile.id,
                    date_from: formik.values.fromDate,
                    date_to: formik.values.toDate,
                    status: formik.values.status.id,
                },
            });
        } else if (formik.values.exportFile.id === 'pdf') {
            window.backdropLoader(false);
            window.open(`/order/exportorder/savereport/print?export=${formik.values.exportFile.id}&date_from=${formik.values.fromDate}&date_to=${formik.values.toDate}`);
        }
    };

    const formik = useFormik({
        initialValues: {
            fromDate: '',
            toDate: '',
            exportFile: '',
            status: '',
        },
        validationSchema: Yup.object().shape({
            fromDate: Yup.string().required(t('exportorder:This_is_a_Required_field')),
            toDate: Yup.string().required(t('exportorder:This_is_a_Required_field')),
            exportFile: Yup.object().typeError(t('exportorder:This_is_a_Required_field')).required(t('exportorder:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            handleDone(values);
        },
    });

    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'export_order',
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
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
