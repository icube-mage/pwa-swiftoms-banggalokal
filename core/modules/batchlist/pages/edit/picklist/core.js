/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import Layout from '@layout';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/batchlist/services/graphql';
import aclService from '@modules/theme/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const {
        data, Content, batchIncrementId, t,
    } = props;
    const router = useRouter();
    const picklist = data.getPickByBatchPicklist.pick_by_batch_picklist;
    const [donePickByBatchPicklist] = gqlService.donePickByBatchPicklist();

    const handleDone = () => {
        const variables = {
            id: pickList.id,
        };
        window.backdropLoader(true);
        donePickByBatchPicklist({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('batchlist:Picklist_was_done'),
                    variant: 'success',
                });
                router.push(`/pickpack/batchlist/edit/${pickList.parentId}`);
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

    const pickList = {
        id: picklist.entity_id,
        parentId: picklist.parent_id,
        statusLabel: picklist.status.label,
        statusValue: picklist.status.value,
        date: picklist.started_at,
        totalItems: picklist.total_items,
        picker: picklist.picked_by,
        items: picklist.items,
        itemsLeft: picklist.total_items_left_to_pick,
        increment_id: picklist.increment_id,
    };

    const formikDone = useFormik({
        initialValues: {
            id: picklist.parent_id,
        },
        onSubmit: (values) => {
            handleDone(values);
        },
    });

    const contentProps = {
        pickList,
        formikDone,
        batchIncrementId,
        t,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();

    const [getPickByBatchById, { loading: loadingBatch, data: dataBatch }] = gqlService.getPickByBatchByIdLazy();

    const { loading, data, error } = gqlService.getPickByBatchPicklist({
        id: router && router.query && Number(router.query.id),
    });

    useEffect(() => {
        if (data?.getPickByBatchPicklist?.pick_by_batch_picklist?.parent_id) {
            getPickByBatchById({
                variables: {
                    id: data?.getPickByBatchPicklist?.pick_by_batch_picklist?.parent_id,
                },
            });
        }
    }, [data?.getPickByBatchPicklist?.pick_by_batch_picklist]);

    const pageConfig = {
        title: `${t('batchlist:Pick_by_Batch__Pick_List')} ${router.query?.id}`,
    };

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'pick_by_batch_list',
    });

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading || loadingBatch);
    }, [loading, aclCheckLoading, loadingBatch]);

    if (loading || aclCheckLoading || loadingBatch) {
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
            <ContentWrapper data={data} batchIncrementId={dataBatch?.getPickByBatchById?.pick_by_batch?.increment_id ?? ''} {...props} />
        </Layout>
    );
};

export default Core;
