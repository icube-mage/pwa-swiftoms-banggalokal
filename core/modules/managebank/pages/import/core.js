import React, { useEffect } from 'react';

import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';

import gqlService from '@modules/managebank/services/graphql';
import aclService from '@modules/theme/services/graphql';

import Layout from '@layout';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const { Content, t } = props;

    const pageConfig = {
        title: t('managebank:Import_Withdrawal_Fee'),
    };

    const [uploadWithdrawalFee] = gqlService.uploadWithdrawalFee();
    const [downloadWithdrawalFeeTemplate, downloadWithdrawalFeeTemplateRes] = gqlService.downloadWithdrawalFeeTemplate();
    const [finishedAfterSubmit, setFinishedAfterSubmit] = React.useState(false);
    const [activityState, setActivityState] = React.useState();
    const [firstLoad, setFirstLoad] = React.useState(true);
    const [showProgress, setshowProgress] = React.useState(false);
    const intervalRef = React.useRef(null);

    const [getActivity] = gqlService.getActivity({
        variables: {
            code: 'upload_withdrawal_fee',
            by_session: true,
        },
        onCompleted: (res) => {
            setActivityState(res.getActivity);
            if (firstLoad) {
                setFirstLoad(false);
            }
            if (res.getActivity.run_status === 'running') {
                clearInterval(intervalRef.current);
                setshowProgress(true);
                setTimeout(() => {
                    getActivity();
                }, 500);
            }

            if (res.getActivity.run_status === 'finished' && finishedAfterSubmit) {
                setshowProgress(true);
                clearInterval(intervalRef.current);
            }

            if ((res.getActivity.run_status !== 'running' || res.getActivity.run_status !== 'finished') && finishedAfterSubmit) {
                clearInterval(intervalRef.current);
                setshowProgress(true);
            }
        },
        onError: () => {
            clearInterval(intervalRef.current);
            setActivityState({ ...activityState });
            getActivity();
        },
    });

    useEffect(() => {
        getActivity();
    }, []);

    useEffect(() => {
        downloadWithdrawalFeeTemplate();
    }, []);

    const urlDownload = downloadWithdrawalFeeTemplateRes && downloadWithdrawalFeeTemplateRes.data
        && downloadWithdrawalFeeTemplateRes.data.downloadWithdrawalFeeTemplate;

    const handleSubmit = ({ binary }) => {
        const variables = {
            binary,
        };
        setshowProgress(false);
        window.backdropLoader(true);
        setFinishedAfterSubmit(false);
        intervalRef.current = setInterval(() => {
            getActivity();
        }, 250);
        uploadWithdrawalFee({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                getActivity();
                setFinishedAfterSubmit(true);
            })
            .catch((e) => {
                window.backdropLoader(false);
                setFinishedAfterSubmit(true);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
        setTimeout(() => {
            window.backdropLoader(false);
        }, 1000);
    };

    const formik = useFormik({
        initialValues: {
            binary: '',
        },
        validationSchema: Yup.object().shape({
            binary: Yup.string().required(t('productbin:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const handleDropFile = (files) => {
        const fileName = files[0].file.name;
        const { baseCode } = files[0];
        const binarySplited = baseCode.split(',');
        const binary = binarySplited[binarySplited.length - 1];
        formik.setFieldValue('filename', fileName);
        formik.setFieldValue('binary', binary);
    };

    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'vendor_manage_bank',
    });

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading);
    }, [aclCheckLoading]);

    if (aclCheckLoading) {
        return <Layout pageConfig={pageConfig} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        formik,
        urlDownload,
        handleDropFile,
        t,
        activityState,
        firstLoad,
        showProgress,
        finishedAfterSubmit,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
