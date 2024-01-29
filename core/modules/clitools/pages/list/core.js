/* eslint-disable no-unused-vars */
import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import gqlService from '@modules/clitools/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const {
        getQueueList,
        data,
        loading,
        dataOptions,
        Content,
        t,
    } = props;

    const [addQueueJob] = gqlService.addQueueJob();

    const handleSubmit = ({
        id,
        additional,
    }) => {
        const variables = {
            entity_id: id.entity_id,
            additional,
        };
        window.backdropLoader(true);
        addQueueJob({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('tools:Command_has_been_added_successfully'),
                variant: 'success',
            });
            window.location.reload();
        }).catch((e) => {
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
            id: null,
            additional: '',
        },
        validationSchema: Yup.object().shape({
            id: Yup.object().typeError(t('tools:This_is_a_Required_field')).required(t('tools:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const contentProps = {
        getQueueList,
        data,
        loading,
        formik,
        dataOptions,
        t,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_tools_cli',
    });

    const [getQueueList, { data, loading }] = gqlService.getQueueList();
    const { loading: loadingOptions, data: dataOptions } = gqlService.getJobStatusOptions();

    React.useEffect(() => {
        BackdropLoad(loadingOptions || aclCheckLoading);
    }, [loadingOptions, aclCheckLoading]);

    if (loadingOptions || aclCheckLoading) {
        return <Layout />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        getQueueList,
        data,
        loading,
        dataOptions: dataOptions.getJobStatusOptions,
        t,
    };

    return (
        <Layout>
            <ContentWrapper {...contentProps} {...props} />
        </Layout>
    );
};

export default Core;
