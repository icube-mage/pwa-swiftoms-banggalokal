/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef } from 'react';
import Layout from '@layout';
import gqlService from '@sellermodules/promotion/services/graphql';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const Core = (props) => {
    const {
        Content, t,
    } = props;
    const pageConfig = {
        title: t('sellerpromotion:Set_Discount_at_Once'),
    };

    const router = useRouter();
    const intervalRef = useRef(null);

    const [firstLoad, setFirstLoad] = useState(true);
    const [activityState, setActivityState] = useState();
    const [uploadRes, setUploadRes] = useState();
    const [showProgress, setshowProgress] = useState(false);
    const [showUpload, setshowUpload] = useState(true);

    const [uplodSellerDiscount] = gqlService.uplodSellerDiscount();
    const [downloadSellerDiscTemplate] = gqlService.downloadSellerDiscTemplate({
        onCompleted: (res) => {
            window.backdropLoader(false);
            router.push(res.downloadSellerDiscTemplate);
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

    const [getActivity] = gqlService.getActivity({
        variables: {
            code: 'upload_seller_discount',
            by_session: true,
        },
        onCompleted: (res) => {
            window.backdropLoader(false);
            setActivityState(res.getActivity);
            setshowUpload(false);

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

            if (res.getActivity.run_status === 'finished') {
                if (firstLoad) {
                    setshowUpload(true);
                }
                setshowProgress(false);
                clearInterval(intervalRef.current);
            }

            if ((res.getActivity.run_status !== 'running' || res.getActivity.run_status !== 'finished')) {
                if (firstLoad) {
                    setshowUpload(true);
                }
                clearInterval(intervalRef.current);
                setshowProgress(false);
            }
        },
        onError: () => {
            clearInterval(intervalRef.current);
            setActivityState({ ...activityState });
            getActivity();
        },
    });

    const formik = useFormik({
        initialValues: {
            binary: '',
            filename: '',
        },
        validationSchema: Yup.object().shape({
            binary: Yup.string().required(t('sellerpromotion:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            const { binary } = values;
            window.backdropLoader(true);
            setshowProgress(false);
            setUploadRes();
            setActivityState();
            setshowUpload(false);
            intervalRef.current = setInterval(() => {
                getActivity();
            }, 250);
            uplodSellerDiscount({ variables: { binary } })
                .then((res) => {
                    window.backdropLoader(false);
                    getActivity();
                    setUploadRes({ ...res.data.uplodSellerDiscount, error: '' });
                })
                .catch((e) => {
                    window.backdropLoader(false);
                    getActivity();
                    setshowProgress(false);
                    setUploadRes({ error: e.message });
                    clearInterval(intervalRef.current);
                });
        },
    });

    const handleDropFile = (files) => {
        const fileName = files[0].file.name;
        const { baseCode } = files[0];
        formik.setFieldValue('filename', fileName);
        formik.setFieldValue('binary', baseCode);
    };

    const handleReUpload = () => {
        setshowUpload(true);
        setshowProgress(false);
        setUploadRes();
        setActivityState();
    };

    useEffect(() => {
        getActivity();
    }, []);

    const contentProps = {
        ...props,
        formik,
        handleDropFile,
        showProgress,
        activityState,
        firstLoad,
        uploadRes,
        showUpload,
        handleReUpload,
        downloadSellerDiscTemplate,
    };

    return (
        <Layout pageConfig={pageConfig} seller>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
