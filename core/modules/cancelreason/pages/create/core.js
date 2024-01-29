import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/cancelreason/services/graphql';
import aclService from '@modules/theme/services/graphql';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const { Content, t } = props;
    const router = useRouter();
    const [createCancelReason] = gqlService.createCancelReason();

    const pageConfig = {
        title: t('cancelreason:Add_Cancel_Reason'),
    };

    const handleSubmit = ({
        reason_code, reason_label,
    }) => {
        const variables = {
            reason_code, reason_label,
        };
        createCancelReason({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('cancelreason:New_cancel_reason_has_been_added'),
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
            reason_code: '',
            reason_label: '',
        },
        validationSchema: Yup.object().shape({
            reason_code: Yup.string().required(t('cancelreason:This_field_is_required')),
            reason_label: Yup.string().required(t('cancelreason:This_field_is_required')),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_cancel_reason',
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
        t,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
