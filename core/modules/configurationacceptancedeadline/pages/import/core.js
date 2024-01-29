import React, { useEffect } from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import gqlService from '@modules/configurationacceptancedeadline/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const { Content, t } = props;
    const [bulkCreateAcceptanceDeadline] = gqlService.bulkCreateAcceptanceDeadline();
    const [downloadSampleCsv, downloadSampleCsvRes] = gqlService.downloadSampleCsv();
    const [activityState, setActivityState] = React.useState();
    const [firstLoad, setFirstLoad] = React.useState(true);
    const [showProgress, setshowProgress] = React.useState(false);
    const [getActivity] = gqlService.getActivity({
        variables: {
            code: 'import_acceptancedeadline',
        },
        onCompleted: (res) => {
            setActivityState({ ...res.getActivity, loading: false });
            if (firstLoad) {
                setFirstLoad(false);
            }
            if (res.getActivity.run_status === 'running') {
                setTimeout(() => {
                    setActivityState({ ...res.getActivity, loading: true });
                    getActivity();
                }, 100);
            }
            if (!firstLoad && res.getActivity.run_status === 'finished') {
                setshowProgress(true);
            }
        },
        onError: () => {
            getActivity();
        },
    });

    const pageConfig = {
        title: t('acceptancedeadlineconfiguration:Import_Acceptance_Deadline'),
    };

    useEffect(async () => {
        getActivity();
        downloadSampleCsv({ variables: { type: 'acceptance_deadline' } });
    }, []);

    const handleSubmit = ({ binary }) => {
        setshowProgress(false);
        const variables = {
            binary,
        };
        window.backdropLoader(true);
        bulkCreateAcceptanceDeadline({
            variables,
        })
            .then(() => {
                setActivityState({ ...activityState, loading: true });
                getActivity();
                window.backdropLoader(false);
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
            binary: '',
        },
        validationSchema: Yup.object().shape({
            binary: Yup.string().required(t('acceptancedeadlineconfiguration:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const handleDropFile = (files) => {
        const fileName = files[0].file.name;
        const { baseCode } = files[0];
        const idx = baseCode.indexOf('base64,');
        formik.setFieldValue('filename', fileName);
        formik.setFieldValue('binary', baseCode.slice(idx + 7));
    };

    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'acceptance_deadline',
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
        urlDownload: downloadSampleCsvRes.data?.downloadSampleCsv,
        handleDropFile,
        activityState,
        firstLoad,
        showProgress,
        t,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
