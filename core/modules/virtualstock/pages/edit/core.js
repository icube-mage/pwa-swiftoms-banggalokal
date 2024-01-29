import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { optionsPriorityEnable, optionsPriorityType, optionsFramework } from '@modules/virtualstock/helpers';
import gqlService from '@modules/virtualstock/services/graphql';
import aclService from '@modules/theme/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const { data, Content, t } = props;
    const router = useRouter();
    const virtualStock = data.getVirtualStockById;
    const [updateVirtualStock] = gqlService.updateVirtualStock();

    const handleSubmit = ({
        name, notes, priorityEnable, priorityType, channelPriority, frameworkPriority, minStock, location,
    }) => {
        const variables = {
            id: virtualStock.vs_id,
            vs_name: name,
            notes,
            is_priority_enable: priorityEnable.id,
            priority_type: priorityType.name,
            channel_priority: channelPriority.channel_code,
            framework_priority: frameworkPriority.name,
            min_stock: Number(minStock || null),
            location: location.map((e) => ({ loc_id: e.loc_id })),
        };
        window.backdropLoader(true);
        updateVirtualStock({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('virtualstock:The_virtual_stock_has_been_saved'),
                    variant: 'success',
                });
                setTimeout(() => router.push('/cataloginventory/virtualstock'), 250);
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
            name: virtualStock.vs_name || '',
            notes: virtualStock.notes || '',
            priorityEnable: optionsPriorityEnable.find((e) => e.id === virtualStock.is_priority_enable),
            priorityType: optionsPriorityType.find((e) => e.name === virtualStock.priority_type) || '',
            channelPriority: virtualStock.channel_priority || '',
            frameworkPriority: optionsFramework.find((e) => e.name === virtualStock.framework_priority) || '',
            minStock: virtualStock.min_stock || null,
            location: virtualStock.location || [],
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('virtualstock:This_is_a_Required_field')),
            notes: Yup.string().nullable(),
            priorityEnable: Yup.object().nullable(),
            priorityType: Yup.object().nullable(),
            channelPriority: Yup.object().nullable(),
            frameworkPriority: Yup.object().nullable(),
            minStock: Yup.number().nullable(),
            location: Yup.array().nullable(),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
            // console.log(values);
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
    const { loading, data, error } = gqlService.getVirtualStockById({
        id: router && router.query && Number(router.query.id),
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_virtual_stock',
    });

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading);
    }, [loading, aclCheckLoading]);

    if (loading || aclCheckLoading) {
        return <Layout />;
    }

    if (!data) {
        const errMsg = error?.message ?? t('virtualstock:Data_not_found');
        const redirect = '/cataloginventory/virtualstock';
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
            <ContentWrapper {...contentProps} {...props} />
        </Layout>
    );
};

export default Core;
