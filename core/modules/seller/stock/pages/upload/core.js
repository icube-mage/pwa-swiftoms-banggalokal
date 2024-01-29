/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef } from 'react';
import Layout from '@layout';
import gqlService from '@sellermodules/stock/services/graphql';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const ContentWrapper = (props) => {
    const {
        Content, dataLoc, downloadSellerStocks, t,
    } = props;
    const router = useRouter();

    const intervalRef = useRef(null);
    const [uploadSellerStocks] = gqlService.uploadSellerStocks();

    const [firstLoad, setFirstLoad] = useState(true);
    const [activityState, setActivityState] = useState();
    const [uploadRes, setUploadRes] = useState();
    const [showProgress, setshowProgress] = useState(false);
    const [showUpload, setshowUpload] = useState(true);

    const totalLoc = dataLoc?.getSellerStoreOptions?.length;
    const [open, setOpen] = React.useState(false);

    const [getActivity] = gqlService.getActivity({
        variables: {
            code: 'upload_seller_stock',
            by_session: true,
        },
        onCompleted: (res) => {
            window.backdropLoader(false);
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

            if (res.getActivity.run_status === 'finished') {
                setshowProgress(false);
                clearInterval(intervalRef.current);
            }

            if ((res.getActivity.run_status !== 'running' || res.getActivity.run_status !== 'finished')) {
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
            binary: Yup.string().required(t('sellerstock:This_is_a_Required_field')),
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
            uploadSellerStocks({ variables: { binary } })
                .then((res) => {
                    window.backdropLoader(false);
                    getActivity();
                    setUploadRes({ ...res.data.uploadSellerStocks, error: '' });
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

    const handleDownloadTemplate = (selected) => {
        const selectedArray = selected.map((e) => Number(e.value));
        setOpen(false);
        window.backdropLoader(true);
        downloadSellerStocks({
            variables: totalLoc <= 1
                ? { source_id: selected }
                : { loc_id: selectedArray },
        }).then((res) => {
            router.push(res.data.downloadSellerStocks);
            window.backdropLoader(false);
        }).catch((e) => {
            setOpen(true);
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

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
        totalLoc,
        open,
        setOpen,
        handleDownloadTemplate,
    };

    return (
        <Content {...contentProps} />
    );
};
const Core = (props) => {
    const { t } = props;
    const pageConfig = {
        title: t('sellerstock:Update_Stocks_at_Once'),
    };

    const [downloadSellerStocks] = gqlService.downloadSellerStocks();
    const { data: dataLoc, loading: loadLoc } = gqlService.getSellerStoreOptions();

    useEffect(() => {
        BackdropLoad(loadLoc);
    }, [loadLoc]);

    if (loadLoc) {
        return <Layout pageConfig={pageConfig} seller />;
    }

    const contentProps = {
        ...props,
        downloadSellerStocks,
        dataLoc,
        dataLocations: dataLoc?.getSellerStoreOptions || [],
    };

    return (
        <Layout pageConfig={pageConfig} seller>
            <ContentWrapper
                {...contentProps}
            />
        </Layout>
    );
};

export default Core;
