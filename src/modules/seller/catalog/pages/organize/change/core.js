import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Layout from '@layout';
import gqlService from '@sellermodules/catalog/services/graphql';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const { Content, t } = props;
    const router = useRouter();

    const pageConfig = {
        title: t('sellercatalog:ubah_massal'),
    };

    const { loading, data: dataShipping } = gqlService.getStoreConfig({
        path: 'swiftoms_vendorportal/store/general/enable_store_shipping',
    });

    const intervalRef = useRef(null);
    const [uploadProduct] = gqlService.uploadSellerProductXlsx();

    const [firstLoad, setFirstLoad] = useState(true);
    const [activityState, setActivityState] = useState();
    const [uploadRes, setUploadRes] = useState();
    const [showProgress, setshowProgress] = useState(true);
    const [showUpload, setshowUpload] = useState(false);

    const [downloadProductXlsxTemplate] = gqlService.downloadProductXlsxTemplate({
        onCompleted: (res) => {
            window.backdropLoader(false);
            router.push(res.downloadProductXlsxTemplate);
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
            code: 'change_seller_product_at_once',
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
        },
        validationSchema: Yup.object().shape({
            binary: Yup.string().required(t('registerseller:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            const { binary } = values;
            window.backdropLoader(true);
            setshowProgress(false);
            setUploadRes({});
            setActivityState({});
            intervalRef.current = setInterval(() => getActivity(), 1000);
            uploadProduct({ variables: { input: { binary, type: 'UPDATE' } } })
                .then((res) => {
                    window.backdropLoader(false);
                    getActivity();
                    setUploadRes({ ...res.data.uploadProduct, error: '' });
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

    const downloadTemplate = (types) => {
        window.backdropLoader(true);
        downloadProductXlsxTemplate({ variables: { type: types } });
    };

    useEffect(() => {
        window.backdropLoader(true);
        getActivity();
    }, []);

    React.useEffect(() => {
        BackdropLoad(loading);
    }, [loading]);

    if (loading) {
        return <Layout pageConfig={pageConfig} seller />;
    }

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
        downloadTemplate,
        dataShipping: JSON.parse(dataShipping.getStoreConfig),
    };

    return (
        <Layout pageConfig={pageConfig} seller>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
