import React, { useEffect, useRef, useState } from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import gqlService from '@modules/orderqueue/services/graphql';
import { bulkToolsOptions } from '@modules/orderqueue/helpers';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const { Content, bulkToolsOptionsState, t } = props;
    const [orderImport] = gqlService.orderImport();
    const [acceptMarketplaceOrderQueue] = gqlService.acceptMarketplaceOrderQueue();
    const [bulkType, setBulkType] = useState(bulkToolsOptionsState.length > 0 ? bulkToolsOptionsState[0] : null);
    const [urlDownload, setUrlDownload] = useState('');
    const [downloadSampleCsv] = gqlService.downloadSampleCsv();
    const [finishedAfterSubmit, setFinishedAfterSubmit] = React.useState(false);
    const [activityState, setActivityState] = React.useState();
    const [firstLoad, setFirstLoad] = React.useState(true);
    const [showProgress, setshowProgress] = React.useState(false);
    const intervalRef = React.useRef(null);
    const [getActivity] = gqlService.getActivity({
        variables: {
            code: bulkType?.activity ?? '',
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
            if (bulkType?.activity !== null) {
                setActivityState({ ...activityState });
                getActivity();
            }
        },
    });

    const handleSubmit = async ({ binary }) => {
        let binaryTemp = '';
        if (bulkType?.acl === 'sales_order_queue_marketplace_accept') {
            binaryTemp = binary;
        } else if (bulkType?.acl === 'sales_order_import') {
            const binarySplited = binary.split(',');
            binaryTemp = binarySplited[binarySplited.length - 1];
        }
        const variables = {
            binary: binaryTemp,
        };

        setshowProgress(false);
        window.backdropLoader(true);
        setFinishedAfterSubmit(false);
        intervalRef.current = setInterval(() => {
            getActivity();
        }, 250);

        try {
            if (bulkType?.acl === 'sales_order_queue_marketplace_accept') {
                await acceptMarketplaceOrderQueue({
                    variables,
                });
            } else if (bulkType?.acl === 'sales_order_import') {
                await orderImport({
                    variables,
                });
            }
            getActivity();
            setFinishedAfterSubmit(true);
            window.backdropLoader(false);
        } catch (e) {
            getActivity();
            setFinishedAfterSubmit(true);
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        }

        setTimeout(() => {
            window.backdropLoader(false);
        }, 1000);
    };

    const formik = useFormik({
        initialValues: {
            binary: '',
        },
        validationSchema: Yup.object().shape({
            binary: Yup.string().required(t('bulktools:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    useEffect(async () => {
        if (bulkType?.sample) {
            try {
                const variables = {
                    type: bulkType?.sample,
                };
                const res = await downloadSampleCsv({
                    variables,
                });
                setUrlDownload(res && res.data && res.data.downloadSampleCsv);
                // eslint-disable-next-line no-empty
            } catch (error) { }
        }
    }, [bulkType]);

    const handleDropFile = (files) => {
        const fileName = files[0].file.name;
        const { baseCode } = files[0];

        formik.setFieldValue('filename', fileName);
        formik.setFieldValue('binary', baseCode);
    };

    const contentProps = {
        formik,
        urlDownload,
        handleDropFile,
        bulkToolsOptionsState,
        setBulkType,
        bulkType,
        activityState,
        firstLoad,
        showProgress,
        finishedAfterSubmit,
        t,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const { t } = props;
    const pageConfig = {
        title: t('bulktools:Bulk_Tools'),
    };
    const [isAccessAllowedLazy, { data, loading }] = aclService.isAccessAllowedLazy();
    const [bulkToolsOptionsState, setBulkToolsOptionsState] = useState([]);
    const indexRef = useRef(0);

    useEffect(() => {
        isAccessAllowedLazy({
            variables: {
                acl_code: bulkToolsOptions[indexRef.current]?.acl ?? '',
            },
        });
    }, []);

    useEffect(() => {
        if (data && data.isAccessAllowed) {
            setBulkToolsOptionsState([...bulkToolsOptionsState, bulkToolsOptions[indexRef.current]]);
            indexRef.current += 1;
            if (indexRef.current < bulkToolsOptions.length) {
                isAccessAllowedLazy({
                    variables: {
                        acl_code: bulkToolsOptions[indexRef.current]?.acl ?? '',
                    },
                });
            }
        }
    }, [data]);

    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'sales_order_queue_bulk_tools',
    });

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading);
    }, [loading, aclCheckLoading]);

    if (loading || aclCheckLoading) {
        return <Layout pageConfig={pageConfig} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper bulkToolsOptionsState={bulkToolsOptionsState} {...props} />
        </Layout>
    );
};

export default Core;
