import React from 'react';
import Layout from '@layout';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/failedreason/services/graphql';
import aclService from '@modules/theme/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const {
        data,
        dataStore,
        Content,
        t,
    } = props;
    const router = useRouter();
    const failedReason = data.getOrderFailedReasonList.items[0];
    const [updateOrderFailedReason] = gqlService.updateOrderFailedReason();

    const handleSubmit = (input) => {
        const variables = {
            input,
        };
        window.backdropLoader(true);
        updateOrderFailedReason({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('failedreason:Configuration_saved_successfully'),
                    variant: 'success',
                });
                setTimeout(() => router.push('/configurations/failedreason'), 250);
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
            reason_code: failedReason.reason_code,
            reason_label: failedReason.reason_label,
            actions: dataStore?.map((e) => ({
                action_id: failedReason.actions.find((z) => z.store_id === e.id)?.action_id || null,
                store_name: e.store_name,
                store_id: e.id,
                action_value: failedReason.actions.find((z) => z.store_id === e.id)?.action_value || null,
            })),
        },
        onSubmit: (values) => {
            const {
                reason_code, actions,
            } = values;
            const valuesToSubmit = {
                reason_code,
                actions: actions
                    .filter((e) => e.action_value !== null)
                    .map((e) => ({
                        action_id: e.action_id ? e.action_id : null,
                        store_id: e.store_id,
                        action_value: e.action_value,
                    })),
            };
            handleSubmit(valuesToSubmit);
        },
    });

    const contentProps = {
        formik,
        dataStore,
        t,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const { loading, data, error } = gqlService.getOrderFailedReasonDetail({
        filter: {
            reason_code: { eq: router && router.query && router.query.slug },
        },
        currentPage: 1,
        pageSize: 1,
    });

    const { loading: loadStore, data: dataStore } = gqlService.availableStores();

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_order_failed_reason',
    });

    React.useEffect(() => {
        BackdropLoad(loading || loadStore || aclCheckLoading);
    }, [loading, loadStore, aclCheckLoading]);

    if (loading || loadStore || aclCheckLoading) {
        return <Layout />;
    }

    if (!data) {
        const errMsg = error?.message ?? t('failedreason:Data_not_found');
        const redirect = '/configurations/failedreason';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        data,
        dataStore: dataStore?.availableStores,
        t,
    };

    return (
        <Layout>
            <ContentWrapper
                {...contentProps}
                {...props}
            />
        </Layout>
    );
};

export default Core;
