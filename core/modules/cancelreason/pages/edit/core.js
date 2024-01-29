import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/cancelreason/services/graphql';
import aclService from '@modules/theme/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
        t,
    } = props;
    const router = useRouter();
    const cancelReason = data.getCancelReasonById;
    const [updateCancelReason] = gqlService.updateCancelReason();

    const handleSubmit = ({
        reason_code, reason_label,
    }) => {
        const variables = {
            id: cancelReason.entity_id,
            reason_code,
            reason_label,
        };
        window.backdropLoader(true);
        updateCancelReason({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('cancelreason:Cancel_reason_has_been_saved'),
                    variant: 'success',
                });
                setTimeout(() => router.push('/configurations/cancelreason'), 250);
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
            reason_code: cancelReason.reason_code,
            reason_label: cancelReason.reason_label,
        },
        validationSchema: Yup.object().shape({
            reason_code: Yup.string().required(t('cancelreason:This_field_is_required')),
            reason_label: Yup.string().required(t('cancelreason:This_field_is_required')),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const contentProps = {
        formik,
        t,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const { loading, data, error } = gqlService.getCancelReasonById({
        id: router && router.query && Number(router.query.id),
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_cancel_reason',
    });

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading);
    }, [loading, aclCheckLoading]);

    if (loading || aclCheckLoading) {
        return <Layout />;
    }

    if (!data) {
        const errMsg = error?.message ?? t('cancelreason:Data_not_found');
        const redirect = '/configurations/cancelreason';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        data,
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
