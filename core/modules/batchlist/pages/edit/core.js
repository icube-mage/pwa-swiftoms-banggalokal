/* eslint-disable no-use-before-define */
import React from 'react';
import Layout from '@layout';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/batchlist/services/graphql';
import aclService from '@modules/theme/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const {
        data, Content, refetchGetPick, allowCancel, t,
    } = props;
    const router = useRouter();
    const batchlist = data.getPickByBatchById.pick_by_batch;
    const [startPickByBatchPicklist] = gqlService.startPickByBatchPicklist();
    const [startSortingPickByBatch] = gqlService.startSortingPickByBatch();
    const [cancelPickByBatch] = gqlService.cancelPickByBatch();

    const handleClick = (id, status) => {
        const variables = {
            id,
            status,
        };
        if (status === 'new') {
            window.backdropLoader(true);
            startPickByBatchPicklist({
                variables,
            })
                .then(() => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: t('batchlist:PickList_in_Progress'),
                        variant: 'success',
                    });
                    router.push(`/pickpack/batchlist/edit/picklist/${id}`);
                })
                .catch((e) => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: e.message,
                        variant: 'error',
                    });
                });
        } else {
            router.push(`/pickpack/batchlist/edit/picklist/${id}`);
        }
    };

    const handleStartSorting = () => {
        const variables = {
            batch_id: batchList.id,
        };
        window.backdropLoader(true);
        startSortingPickByBatch({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('batchlist:Start_Sorting'),
                    variant: 'success',
                });
                router.push(`/pickpack/batchlist/edit/sorting/${batchList.id}`);
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

    const handleCancelPickBatch = () => {
        const variables = {
            id: batchList.id,
        };
        window.backdropLoader(true);
        cancelPickByBatch({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('batchlist:Batch_has_been_canceled'),
                    variant: 'success',
                });
                refetchGetPick();
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

    const batchList = {
        id: batchlist.entity_id,
        increment_id: batchlist.increment_id,
        statusLabel: batchlist.status.label,
        statusValue: batchlist.status.value,
        date: batchlist.created_at,
        totalItems: batchlist.total_items,
        totalShipments: batchlist.total_shipments,
        picklist: batchlist.picklist,
    };

    const formikStartSorting = useFormik({
        initialValues: {
            batch_id: batchlist.entity_id,
        },
        onSubmit: (values) => {
            handleStartSorting(values);
        },
    });

    const contentProps = {
        batchList,
        handleClick,
        formikStartSorting,
        handleCancelPickBatch,
        allowCancel,
        t,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const {
        loading, data, error, refetch,
    } = gqlService.getPickByBatchById({
        id: router && router.query && Number(router.query.id),
    });

    const pageConfig = {
        title: `${t('batchlist:Pick_by_Batch')} #${router.query?.id}`,
    };

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'pick_by_batch_list',
    });

    const { loading: allowCancelLoading, data: allowCancelData } = aclService.isAccessAllowed({
        acl_code: 'pick_by_batch_cancel',
    });

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading || allowCancelLoading);
    }, [loading, aclCheckLoading, allowCancelLoading]);

    if (loading || aclCheckLoading || allowCancelLoading) {
        return <Layout pageConfig={pageConfig} />;
    }

    if (!data) {
        const errMsg = error?.message ?? t('batchlist:Data_not_found');
        const redirect = '/pickpack/batchlist';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    return (
        <Layout pageConfig={pageConfig} useBreadcrumbs={false}>
            <ContentWrapper
                data={data}
                refetchGetPick={refetch}
                allowCancel={allowCancelData?.isAccessAllowed}
                t={t}
                {...props}
            />
        </Layout>
    );
};

export default Core;
