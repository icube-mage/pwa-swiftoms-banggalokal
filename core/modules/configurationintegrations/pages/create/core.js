import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';

import gqlService from '@modules/configurationintegrations/services/graphql';
import aclService from '@modules/theme/services/graphql';

import BackdropLoad from '@helper_backdropload';
import Layout from '@layout';

const Core = (props) => {
    const { Content, t } = props;
    const router = useRouter();

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_config_integrations',
    });
    const { loading: resourceLoading, data: resourceData } = gqlService.getAclResource();
    const [createIntegration] = gqlService.createIntegration();

    const handleSubmit = (input) => {
        window.backdropLoader(true);
        createIntegration({
            variables: { input },
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('configurationintegrations:New_integration_has_been_saved'),
                variant: 'success',
            });
            setTimeout(() => router.push('/configurations/integrations'), 250);
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
            name: '',
            activate: false,
            password: '',
            conditions: [],
            resource: [],
            all_resources: 'false',
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('configurationintegrations:This_is_a_Required_field')),
            password: Yup.string().required(t('configurationintegrations:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            const {
                resource, all_resources, conditions, ...restValues
            } = values;
            const valuesToSubmit = {
                ...restValues,
                all_resources: all_resources === 'true',
                resource: all_resources === 'true' ? [] : resource,
            };
            if (conditions.filter(({ value }) => !!value.length).length) {
                valuesToSubmit.conditions = conditions.filter(({ value }) => !!value.length).map(({ type, value }) => ({
                    attribute: type.value,
                    operator: 'in',
                    value: value.map((val) => String(val[type.value]))?.join(','),
                }));
            }
            handleSubmit(valuesToSubmit);
        },
    });

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading || resourceLoading);
    }, [aclCheckLoading, resourceLoading]);

    if (aclCheckLoading || resourceLoading) {
        return <Layout />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        ...props,
        formik,
        dataTree: resourceData?.getAclResource?.find(({ id }) => id === 'Magento_Backend::admin')?.children || [],
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
