import React, { useEffect } from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import gqlService from '@modules/productbin/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const { Content, t } = props;
    const [importProductBin] = gqlService.importProductBin();
    const [downloadListBinBySKU, downloadListResBinBySKU] = gqlService.downloadSampleCsvBinBySKU();
    const [downloadListBinBySKULoc, downloadListResBinBySKULoc] = gqlService.downloadSampleCsvBinBySKULoc();
    const [finishedAfterSubmit, setFinishedAfterSubmit] = React.useState(false);
    const [activityState, setActivityState] = React.useState();
    const [firstLoad, setFirstLoad] = React.useState(true);
    const [showProgress, setshowProgress] = React.useState(false);
    const intervalRef = React.useRef(null);
    const [getActivity] = gqlService.getActivity({
        variables: {
            code: 'import_productbin',
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
        downloadListBinBySKU();
        downloadListBinBySKULoc();
        getActivity();
    }, []);

    const urlDownloadBinBySKU = downloadListResBinBySKU && downloadListResBinBySKU.data && downloadListResBinBySKU.data.downloadSampleCsv;
    const urlDownloadBinBySKULoc = downloadListResBinBySKULoc && downloadListResBinBySKULoc.data && downloadListResBinBySKULoc.data.downloadSampleCsv;

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

        importProductBin({
            variables,
        })
            .then(() => {
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
        acl_code: 'oms_lite_product_bin',
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
        urlDownloadBinBySKU,
        urlDownloadBinBySKULoc,
        handleDropFile,
        activityState,
        firstLoad,
        showProgress,
        finishedAfterSubmit,
        t,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
