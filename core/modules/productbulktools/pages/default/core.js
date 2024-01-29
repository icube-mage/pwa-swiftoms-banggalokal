/* eslint-disable no-trailing-spaces */
import React, { useEffect } from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import gqlService from '@modules/productbulktools/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const { Content, t } = props;
    const [mappingProductLocation] = gqlService.mappingProductLocation();
    const [uploadProduct] = gqlService.uploadProduct();
    const [uploadConfigurableProduct] = gqlService.uploadConfigurableProduct();
    const [uploadProductImages] = gqlService.uploadProductImages();
    const [uploadBundleProduct] = gqlService.uploadBundleProduct();
    const [uploadFixedBundleProduct] = gqlService.uploadFixedBundleProduct();
    
    const [finishedAfterSubmit, setFinishedAfterSubmit] = React.useState(false);
    const [activityState, setActivityState] = React.useState();
    const [firstLoad, setFirstLoad] = React.useState(true);
    const [showProgress, setshowProgress] = React.useState(false);
    const intervalRef = React.useRef(null);
    const [bulkType, setBulkType] = React.useState('product');

    const [firstRender, setFirstRender] = React.useState(true);
    const [uploadResponse, setUploadResponse] = React.useState(null);
    const [downloadSample, downloadSampleRes] = gqlService.downloadSampleCsv();
    const [urlDownload, setUrlDownload] = React.useState({});

    let bulkTypeOptions = [
        { label: t('productbulktools:Product_Location_Mapping'), value: 'product_location_mapping' },
    ];

    const [getActivity] = gqlService.getActivity({
        variables: {
            code: 'mapping_product_location',
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
        if (bulkType) {
            downloadSample({
                variables: {
                    type: bulkType,
                },
            });
        }
    }, [bulkType]);

    useEffect(async () => {
        try {
            const [resProduct, resProductMap, resConfigProduct, resImages, resFixedBundle, resBundle] = await Promise.all([
                downloadSample({ variables: { type: 'product' } }),
                downloadSample({ variables: { type: 'product_location_mapping' } }),
                downloadSample({ variables: { type: 'configurable_product' } }),
                downloadSample({ variables: { type: 'product_images' } }),
                downloadSample({ variables: { type: 'fixed_bundle_product' } }),
                downloadSample({ variables: { type: 'bundle_product' } }),
            ]);
            setUrlDownload({
                product: resProduct.data.downloadSampleCsv,
                product_location_mapping: resProductMap.data.downloadSampleCsv,
                configurable_product: resConfigProduct.data.downloadSampleCsv,
                product_images: resImages.data.downloadSampleCsv,
                fixed_bundle_product: resFixedBundle.data.downloadSampleCsv,
                bundle_product: resBundle.data.downloadSampleCsv,
            });
            // eslint-disable-next-line no-empty
        } catch (error) { }
    }, []);

    const handleSubmit = ({ binary }) => {
        const variables = {
            binary,
        };

        setshowProgress(false);
        window.backdropLoader(true);
        setFinishedAfterSubmit(false);
        switch (bulkType) {
        case 'product':
            uploadProduct({
                variables,
            })
                .then((res) => {
                    const data = res && res.data && res.data?.uploadProduct;
                    window.backdropLoader(false);
                    const decodedMessage = JSON.parse(data?.message);
                    const decodedErrorMessage = decodedMessage?.error_messages?.split('<br>');
                    setUploadResponse({ ...data, ...decodedMessage, error_messages: decodedErrorMessage });
                })
                .catch((e) => {
                    window.backdropLoader(false);
                    setUploadResponse({ status: 'error', error: e.message });
                });
            break;
        case 'product_location_mapping':
            setUploadResponse(null);
            intervalRef.current = setInterval(() => {
                getActivity();
            }, 250);
            mappingProductLocation({
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
            break;
        case 'configurable_product':
            uploadConfigurableProduct({
                variables,
            })
                .then((res) => {
                    const data = res && res.data && res.data?.uploadConfigurableProduct;
                    window.backdropLoader(false);
                    const decodedMessage = JSON.parse(data?.message);
                    const decodedErrorMessage = decodedMessage?.error_messages?.split('<br>');
                    setUploadResponse({ ...data, ...decodedMessage, error_messages: decodedErrorMessage });
                })
                .catch((e) => {
                    window.backdropLoader(false);
                    setUploadResponse({ status: 'error', error: e.message });
                });
            break;
        case 'product_images':
            uploadProductImages({
                variables,
            })
                .then((res) => {
                    const data = res && res.data && res.data?.uploadProductImages;
                    window.backdropLoader(false);
                    const decodedMessage = JSON.parse(data?.message);
                    const decodedErrorMessage = decodedMessage?.error_messages?.split('<br>');
                    setUploadResponse({ ...data, ...decodedMessage, error_messages: decodedErrorMessage });
                })
                .catch((e) => {
                    window.backdropLoader(false);
                    setUploadResponse({ status: 'error', error: e.message });
                });
            break;
        case 'bundle_product':
            uploadBundleProduct({
                variables,
            })
                .then((res) => {
                    const data = res && res.data && res.data?.uploadBundleProduct;
                    window.backdropLoader(false);
                    const decodedMessage = JSON.parse(data?.message);
                    const decodedErrorMessage = decodedMessage?.error_messages?.split('<br>');
                    setUploadResponse({ ...data, ...decodedMessage, error_messages: decodedErrorMessage });
                })
                .catch((e) => {
                    window.backdropLoader(false);
                    setUploadResponse({ status: 'error', error: e.message });
                });
            break;
        case 'fixed_bundle_product':
            uploadFixedBundleProduct({
                variables,
            })
                .then((res) => {
                    const data = res && res.data && res.data?.uploadFixedBundleProduct;
                    window.backdropLoader(false);
                    const decodedMessage = JSON.parse(data?.message);
                    const decodedErrorMessage = decodedMessage?.error_messages?.split('<br>');
                    setUploadResponse({ ...data, ...decodedMessage, error_messages: decodedErrorMessage });
                })
                .catch((e) => {
                    window.backdropLoader(false);
                    setUploadResponse({ status: 'error', error: e.message });
                });
            break;
        default:
            break;
        }
    };
    
    const formik = useFormik({
        initialValues: {
            binary: '',
        },
        validationSchema: Yup.object().shape({
            binary: Yup.string().required(t('productbulktools:This_is_a_Required_field')),
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
        acl_code: 'product_bulk_tools',
    });

    const { loading: aclProductUploadLoading, data: aclProductUpload } = aclService.isAccessAllowed({
        acl_code: 'product_upload',
    });

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading);
    }, [aclCheckLoading]);

    if (aclCheckLoading || aclProductUploadLoading) {
        return <Layout />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    if ((aclProductUpload && aclProductUpload.isAccessAllowed) === true) {
        bulkTypeOptions = [
            { label: t('productbulktools:Product_Import'), value: 'product' },
            ...bulkTypeOptions,
            { label: t('productbulktools:Product_Configurable_Import'), value: 'configurable_product' },
            { label: t('productbulktools:Product_Image_Upload'), value: 'product_images' },
            { label: t('productbulktools:Fixed_Bundle_Product_Import'), value: 'fixed_bundle_product' },
            { label: t('productbulktools:Bundle_Product_Import'), value: 'bundle_product' },
        ];
    }

    if ((aclProductUpload && aclProductUpload.isAccessAllowed) === false) {
        if (firstRender) {
            setBulkType('product_location_mapping');
            setFirstRender(false);
        }
    }

    const contentProps = {
        formik,
        urlDownload,
        handleDropFile,
        activityState,
        firstLoad,
        showProgress,
        finishedAfterSubmit,
        t,
        bulkType,
        setBulkType,
        bulkTypeOptions,
        uploadResponse,
        downloadSampleRes,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
