/* eslint-disable no-useless-escape */
/* eslint-disable no-nested-ternary */
/* eslint-disable object-curly-newline */
import React, { useState } from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';

import gqlService from '@modules/integrationautomation/services/graphql';
import aclService from '@modules/theme/services/graphql';

import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const { t, Content } = props;
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [tab, setTab] = useState('info');

    const [createAutomation] = gqlService.createAutomation();
    const [getCredentialList, getCredentialListRes] = gqlService.getCredentialList();
    const [addCredential] = gqlService.addCredential();
    const [updateCredential] = gqlService.updateCredential();
    const [deleteCredential] = gqlService.deleteCredential();
    const [testExportTemplate, testExportTemplateRes] = gqlService.testExportTemplate();

    const handleSubmit = (input) => {
        window.backdropLoader(true);
        createAutomation({
            variables: { input },
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('integrationautomation:Integration_Automation_has_been_created'),
                    variant: 'success',
                });
                setTimeout(() => router.push('/integration/automation'), 250);
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
            name: '',
            status: true,
            execute_per_entity: false,
            conditions: [
                {
                    aggregator: {
                        label: 'ALL',
                        value: 'all',
                    },
                    conditions: [],
                    has_child: true,
                    label: 'Conditions combination',
                    value: 'Swiftoms\\Integration\\Model\\Export\\Condition\\Combine',
                    value_choice: {
                        label: 'TRUE',
                        value: '1',
                    },
                },
            ],

            events: null,
            action_type: '',
            is_http: false,

            url: '',
            http_method: '',
            headers: [{ key: '', value: '' }],
            template: '',

            credential: null,
            mode: '',
            is_exchange: false,
            is_queue: false,
            exchange_name: '',
            queue_name: '',
            type: 'topic',
            routing_key: '',
        },
        validationSchema: Yup.object().shape({
            name: Yup.string()
                .typeError(t('integrationautomation:This_is_a_Required_field'))
                .max(255, t('integrationautomation:This_field_must_be_at_most_max_characters', { max: 255 }))
                .required(t('integrationautomation:This_is_a_Required_field')),
            events: Yup.string()
                .typeError(t('integrationautomation:This_is_a_Required_field'))
                .required(t('integrationautomation:This_is_a_Required_field')),
            action_type: Yup.string()
                .typeError(t('integrationautomation:This_is_a_Required_field'))
                .required(t('integrationautomation:This_is_a_Required_field')),
            is_http: Yup.boolean(),
            is_exchange: Yup.boolean(),
            is_queue: Yup.boolean(),
            url: Yup.string().nullable().when('is_http', {
                is: true,
                then: Yup.string().required(t('integrationautomation:This_is_a_Required_field')),
            }),
            http_method: Yup.string().nullable().when('is_http', {
                is: true,
                then: Yup.string().required(t('integrationautomation:This_is_a_Required_field')),
            }),
            mode: Yup.string().nullable().when('is_http', {
                is: false,
                then: Yup.string().required(t('integrationautomation:This_is_a_Required_field')),
            }),
            type: Yup.string().nullable().when(['is_http', 'is_queue'], {
                is: false,
                then: Yup.string().required(t('integrationautomation:This_is_a_Required_field')),
            }),
            routing_key: Yup.string().nullable().when(['is_http', 'is_queue'], {
                is: false,
                then: Yup.string().required(t('integrationautomation:This_is_a_Required_field')),
            }),
            exchange_name: Yup.string().nullable().when(['is_http', 'is_queue'], {
                is: false,
                then: Yup.string().required(t('integrationautomation:This_is_a_Required_field')),
            }),
            queue_name: Yup.string().nullable().when(['is_http', 'is_exchange'], {
                is: false,
                then: Yup.string().required(t('integrationautomation:This_is_a_Required_field')),
            }),
        }),
        onSubmit: (values) => {
            const { name, status, events, conditions, action_type, url, http_method, headers, template, execute_per_entity,
                credential, mode, exchange_name, queue_name, type, routing_key, is_http, is_exchange } = values;

            function determineValue(cond) {
                if (cond.value_choice?.value) {
                    return cond.value_choice?.value;
                }
                if (cond.value_input) {
                    if (Array.isArray(cond.value_input)) {
                        return cond.value_input?.map(({ value }) => value)?.join(',');
                    }
                    if (cond.value_input?.label) {
                        return cond.value_input?.value;
                    }
                    return cond.value_input === 'NULL' ? '' : cond.value_input;
                }
                return '';
            }

            function loopConditions(cond) {
                return ({
                    type: cond.value,
                    ...((cond.attribute?.value || cond.attribute_code)
                        && { attribute: cond.has_child ? cond.attribute?.value || null : cond.attribute_code }),
                    ...(cond.has_child && { aggregator: cond.aggregator?.value || null }),
                    ...(cond.operator?.value && { operator: cond.operator?.value || null }),
                    value: determineValue(cond),
                    ...(cond.has_child && {
                        conditions: cond.conditions?.map((child) => (
                            loopConditions(child)
                        )),
                    }),
                });
            }

            const valuesToSubmit = {
                name,
                status,
                event_id: events.event_id,
                execute_per_entity,
                conditions: {
                    type: conditions[0].value,
                    aggregator: conditions[0].aggregator.value,
                    value: conditions[0].value_choice.value,
                    conditions: conditions[0].conditions?.map((cond) => loopConditions(cond)),
                },
            };

            let connection_detail = [];
            if (is_http) {
                connection_detail = [
                    { key: 'url', value: url },
                    { key: 'http_method', value: http_method },
                ];
                const headersFiltered = headers.filter(({ key }) => !!key);
                if (headersFiltered?.length) {
                    connection_detail.push(
                        { key: 'headers', value: JSON.stringify(headers) },
                    );
                }
                valuesToSubmit.actions = [{
                    action_type,
                    connection_detail,
                    template,
                }];
            } else {
                if (is_exchange) {
                    connection_detail = [
                        { key: 'mode', value: mode },
                        { key: 'exchange_name', value: exchange_name },
                        { key: 'type', value: type },
                        { key: 'routing_key', value: routing_key },
                    ];
                } else {
                    connection_detail = [
                        { key: 'mode', value: mode },
                        { key: 'queue_name', value: queue_name },
                    ];
                }
                valuesToSubmit.actions = [{
                    action_type,
                    connection_detail,
                    credential_id: credential.credential_id,
                    template,
                }];
            }
            handleSubmit(valuesToSubmit);
        },
    });

    const formikCredential = useFormik({
        initialValues: {
            credential_name: '',
            hostname: '',
            port: '',
            user: '',
            password: '',
            Vhost: '',
            id: null,
        },
        validationSchema: Yup.object().shape({
            credential_name: Yup.string().required(t('integrationautomation:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            const { id, credential_name } = values;
            const mutationCred = id ? updateCredential : addCredential;
            const variables = {
                credential_name,
                credential_detail: [
                    {
                        key: 'hostname',
                        value: values.hostname,
                    },
                    {
                        key: 'port',
                        value: values.port,
                    },
                    {
                        key: 'user',
                        value: values.user,
                    },
                    {
                        key: 'password',
                        value: values.password,
                    },
                    {
                        key: 'Vhost',
                        value: values.Vhost,
                    },
                ],
            };
            if (id) {
                variables.id = id;
            }
            setOpen(false);
            window.backdropLoader(true);
            mutationCred({
                variables,
            })
                .then(async (res) => {
                    await getCredentialList({
                        variables: {
                            filter: {
                                credential_id: {
                                    eq: id ? String(res?.data?.updateCredential?.credential_id)
                                        : String(res?.data?.addCredential?.credential_id),
                                },
                                credential_type: { eq: 'rabbitmq' },
                            },
                            pageSize: 20,
                            currentPage: 1,
                        },
                    });
                    if (id) {
                        formik.setFieldValue('credential_id', res?.data?.updateCredential?.credential_id);
                    } else {
                        formik.setFieldValue('credential_id', res?.data?.addCredential?.credential_id);
                    }
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: id ? t('integrationautomation:Credential_has_been_updated')
                            : t('integrationautomation:Credential_has_been_created'),
                        variant: 'success',
                    });
                })
                .catch((e) => {
                    setOpen(true);
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: e.message,
                        variant: 'error',
                    });
                });
        },
    });

    const handleDeleteCredential = () => {
        setOpen(false);
        window.backdropLoader(true);
        deleteCredential({
            variables: { id: formikCredential.values.id },
        })
            .then(async () => {
                await getCredentialList({
                    variables: {
                        filter: {
                            credential_type: { eq: 'rabbitmq' },
                        },
                        pageSize: 20,
                        currentPage: 1,
                    },
                });
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('integrationautomation:Credential_has_been_deleted'),
                    variant: 'success',
                });
                formikCredential.resetForm();
                formik.setFieldValue('credential_id', '');
            })
            .catch((e) => {
                setOpen(true);
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
    };

    const formikOutputTest = useFormik({
        initialValues: {
            xsl_template: '',
            event_id: '',
            export_id: '',
        },
        validationSchema: Yup.object().shape({
            xsl_template: Yup.string().required(t('integrationautomation:This_is_a_Required_field')),
            event_id: Yup.string().required(t('integrationautomation:This_is_a_Required_field')),
            export_id: Yup.string().required(t('integrationautomation:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            window.backdropLoader(true);
            testExportTemplate({
                variables: {
                    ...values,
                    export_id: values.export_id,
                    execute_per_entity: formik.values.execute_per_entity,
                },
            }).then(() => {
                window.backdropLoader(false);
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

    const formikField = useFormik({
        initialValues: {
            export_id: '',
            event_id: '',
        },
        validationSchema: Yup.object().shape({
            export_id: Yup.string().required(t('integrationautomation:This_is_a_Required_field')),
            event_id: Yup.string().required(t('integrationautomation:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            const { export_id, event_id } = values;
            setTimeout(() => {
                window.open(
                `/integration/automation/availablefields/${event_id}/${export_id}`,
                '_blank',
                );
            });
        },
    });

    const contentProps = {
        ...props,
        formik,
        open,
        setOpen,
        formikCredential,
        handleDeleteCredential,
        getCredentialList,
        getCredentialListRes,
        formikField,
        formikOutputTest,
        tab,
        setTab,
        testExportTemplateRes,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const router = useRouter();

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'integration_automation',
    });
    const [getEventConditions, getEventConditionsRes] = gqlService.getEventConditions();

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading || getEventConditionsRes.loading);
    }, [aclCheckLoading, getEventConditionsRes.loading]);

    if (aclCheckLoading) {
        return <Layout />;
    }

    if (((aclCheckData && aclCheckData.isAccessAllowed) === false)) {
        router.push('/');
        return <Layout />;
    }

    const contentProps = {
        ...props,
        getEventConditions,
        getEventConditionsRes,
    };

    return (
        <Layout>
            <ContentWrapper {...contentProps} />
        </Layout>
    );
};

export default Core;
