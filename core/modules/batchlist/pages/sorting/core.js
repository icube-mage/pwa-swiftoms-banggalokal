/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
/* eslint-disable max-len */

import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@modules/batchlist/services/graphql';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const {
        Content, config = 'single_item', allowManualConfirm, useCamera, batchId, t,
    } = props;
    const router = useRouter();
    const [itemSortingPickByBatch, { loading: loadSorting }] = config === 'multiple_item' ? gqlService.multipleItemSortingPickByBatch() : gqlService.itemSortingPickByBatch();
    const [doneSortingPickByBatch] = gqlService.doneSortingPickByBatch();

    const [sortingResponse, setSortingResponse] = React.useState(null);

    const getDataSorting = (res) => {
        const name = res?.data?.itemSortingPickByBatch?.pick_by_batch_sort?.name ?? null;
        const sku = res?.data?.itemSortingPickByBatch?.pick_by_batch_sort?.sku ?? null;
        const slot = res?.data?.itemSortingPickByBatch?.pick_by_batch_sort?.slot_no ?? null;
        setSortingResponse({
            name,
            sku,
            slot,
        });
    };

    const getDataSortingMultiple = (res) => {
        const name = res?.data?.multipleItemSortingPickByBatch?.[0]?.name ?? null;
        const sku = res?.data?.multipleItemSortingPickByBatch?.[0]?.sku ?? null;
        const dataMultiple = res?.data?.multipleItemSortingPickByBatch ?? null;

        setSortingResponse({
            name,
            sku,
            dataMultiple,
        });
    };

    const handleDetect = (code) => {
        const variables = {
            batch_id: batchId,
            barcode: code,
        };
        window.backdropLoader(true);
        itemSortingPickByBatch({
            variables,
        })
            .then((res) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('batchlist:Quantity_has_been_updated'),
                    variant: 'success',
                });
                if (config === 'single_item') {
                    getDataSorting(res);
                }
                if (config === 'multiple_item') {
                    getDataSortingMultiple(res);
                }
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

    const handleDoneSorting = () => {
        const variables = {
            batch_id: batchId,
        };
        window.backdropLoader(true);
        doneSortingPickByBatch({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('batchlist:Done_Sorting'),
                    variant: 'success',
                });
                router.push(`/pickpack/batchlist/edit/${batchId}`);
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
            sku: '',
        },
        validationSchema: Yup.object().shape({
            sku: Yup.string().required(t('batchlist:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            const variables = {
                batch_id: batchId,
                sku: values.sku,
            };
            window.backdropLoader(true);
            itemSortingPickByBatch({
                variables,
            })
                .then((res) => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: t('batchlist:Quantity_has_been_updated'),
                        variant: 'success',
                    });
                    if (config === 'single_item') {
                        getDataSorting(res);
                    }
                    if (config === 'multiple_item') {
                        getDataSortingMultiple(res);
                    }
                    formik.resetForm();
                })
                .catch((e) => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: e.message,
                        variant: 'error',
                    });
                });
        },
    });

    const contentProps = {
        batchId,
        handleDetect,
        handleDoneSorting,
        sortingResponse,
        config,
        loadSorting,
        allowManualConfirm,
        formik,
        useCamera,
        t,
        ...props,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();

    const pageConfig = {
        title: `${t('batchlist:Pick_by_Batch__Sorting')} #${router.query?.id}`,
    };

    const { loading: loadingConfig, data: dataConfig } = gqlService.getStoreConfigSorting();
    const { loading: loadingConfigAllowManual, data: dataConfigAllowManual } = gqlService.getStoreConfig({
        path: 'swiftoms_pickpack/batch/allow_manual_confirm_pick',
    });
    const { loading: loadingConfigCamera, data: dataConfigCamera } = gqlService.getStoreConfig({
        path: 'swiftoms_pickpack/batch/use_camera_to_scan',
    });
    const { loading, data } = gqlService.getPickByBatchById({
        id: router && router.query && Number(router.query.id),
    });

    React.useEffect(() => {
        BackdropLoad(loading || loadingConfig || loadingConfigAllowManual || loadingConfigCamera);
    }, [loading, loadingConfig, loadingConfigAllowManual, loadingConfigCamera]);

    if (loading || loadingConfig || loadingConfigAllowManual || loadingConfigCamera) {
        return <Layout pageConfig={pageConfig} />;
    }

    if (!data || !dataConfig) {
        window.toastMessage({
            open: true,
            text: t('batchlist:Data_not_found'),
            variant: 'error',
        });
        setTimeout(() => {
            router.push('/pickpack/batchlist');
        }, 1000);
        return (
            <Layout>
                <div
                    style={{
                        display: 'flex',
                        color: '#435179',
                        fontWeight: 600,
                        justifyContent: 'center',
                        padding: '20px 0',
                    }}
                >
                    {t('batchlist:Data_not_found')}
                </div>
            </Layout>
        );
    }

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper
                batchId={Number(router.query.id)}
                useCamera={dataConfigCamera.getStoreConfig === '1'}
                config={dataConfig.getStoreConfig}
                allowManualConfirm={dataConfigAllowManual.getStoreConfig === '1'}
                t={t}
                data={data?.getPickByBatchById?.pick_by_batch}
                {...props}
            />
        </Layout>
    );
};

export default Core;
