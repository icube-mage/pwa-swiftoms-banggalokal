/* eslint-disable no-nested-ternary */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-return-await */
/* eslint-disable eqeqeq */
/* eslint-disable object-curly-newline */
import React, { useState } from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';

import ErrorRedirect from '@common_errorredirect';

import gqlService from '@modules/integrationautomation/services/graphql';
import aclService from '@modules/theme/services/graphql';

import BackdropLoad from '@helper_backdropload';

async function conditionList(data, setInit, setLoad, call) {
    function findNestedObj(entireObj, keyToFind, valToFind) {
        let foundObj;
        JSON.stringify(entireObj, (_, nestedValue) => {
            if (nestedValue && nestedValue[keyToFind] === valToFind) {
                foundObj = nestedValue;
            }
            return nestedValue;
        });
        return foundObj;
    }

    async function loopConditions(conds, parentOpt) {
        const resultLoop = [];
        if (conds?.length) {
            for (const cond of conds) {
                let options = {};
                await call({
                    variables: {
                        event_id: Number(data.event_id),
                        value: cond.type || '',
                        attribute_code: cond?.attribute || '',
                    },
                }).then((res) => { options = res.data?.getEventConditions; });

                const has_child = !!options.conditions?.length ?? false;
                resultLoop.push({
                    attribute_code: cond?.attribute || null,
                    has_child,
                    value_element_type: options.value_element_type,
                    label: findNestedObj(parentOpt?.conditions || [], 'attribute_code', cond.attribute)?.label || '',
                    value: cond.type,
                    operator: options.operator_option?.find(({ value }) => value === cond.operator),
                    ...(!has_child ? {
                        value_input: options.value_element_type === 'multiselect'
                            ? cond.value?.split(',')?.map((val) => options.value_option?.find(({ value }) => value === val))
                            : options.value_element_type === 'date'
                                ? cond.value?.slice(0, -9)
                                : options.value_option?.find(({ value }) => value === cond.value) || cond.value,
                    } : {
                        value_choice: options.value_option?.find(({ value }) => value === cond.value),
                    }),
                    ...(has_child && {
                        aggregator: options.aggregator_option?.find(({ value }) => value === cond.aggregator),
                        conditions: [...await loopConditions(cond.conditions, options)],
                    }),
                });
            }
        }
        setLoad(false);
        return resultLoop;
    }

    const parsed = JSON.parse(data.conditions);

    let zeroOpt = [];
    await call({
        variables: {
            event_id: Number(data.event_id),
            value: parsed.type || '',
            attribute_code: parsed?.attribute || '',
        },
    }).then((res) => { zeroOpt = res.data?.getEventConditions; });

    setInit([{
        has_child: true,
        label: 'Conditions combination',
        value: parsed.type,
        value_choice: zeroOpt.value_option?.find(({ value }) => value === parsed.value),
        aggregator: zeroOpt.aggregator_option?.find(({ value }) => value === parsed.aggregator),
        conditions: [...await loopConditions(parsed.conditions, zeroOpt)],
    }]);
}

const ContentWrapper = (props) => {
    const { t, Content, data, eventList, credList, initCond } = props;
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [tab, setTab] = useState('info');

    const [updateAutomation] = gqlService.updateAutomation();
    const [getCredentialList, getCredentialListRes] = gqlService.getCredentialList();
    const [addCredential] = gqlService.addCredential();
    const [updateCredential] = gqlService.updateCredential();
    const [deleteCredential] = gqlService.deleteCredential();
    const [testExportTemplate, testExportTemplateRes] = gqlService.testExportTemplate();
    const [manualExecution] = gqlService.manualExecution();

    const handleSubmit = (input) => {
        window.backdropLoader(true);
        updateAutomation({
            variables: { id: data.automation_id, input },
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('integrationautomation:Integration_Automation_has_been_updated'),
                    variant: 'success',
                });
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

    const { action_type: actionType, connection_detail: conDetail,
        credential_id: credId, template: templateData } = data.actions?.[0] || {};
    const isHttp = actionType === 'http_request';
    const eventsChosen = eventList.find(({ event_id }) => event_id === data.event_id);

    const formik = useFormik({
        initialValues: {
            name: data.name,
            status: data.status,
            execute_per_entity: data.execute_per_entity,
            conditions: initCond,
            events: eventsChosen,
            action_type: actionType || '',
            is_http: isHttp,

            url: conDetail.find(({ key }) => key === 'url')?.value || '',
            http_method: conDetail.find(({ key }) => key === 'http_method')?.value || '',
            headers: isHttp && conDetail.find(({ key }) => key === 'headers')?.value
                ? JSON.parse(conDetail.find(({ key }) => key === 'headers')?.value) : [{ key: '', value: '' }],
            template: templateData || '',

            credential: credList.find(({ credential_id }) => credential_id === credId) || null,
            mode: !isHttp ? (conDetail.find(({ key }) => key === 'mode')?.value || '') : '',
            is_exchange: !isHttp && (conDetail.find(({ key }) => key === 'mode')?.value || '') === 'exchange',
            is_queue: !isHttp && ((conDetail.find(({ key }) => key === 'mode')?.value || '') === 'queue'),
            exchange_name: !isHttp ? (conDetail.find(({ key }) => key === 'exchange_name')?.value || '') : '',
            queue_name: !isHttp ? (conDetail.find(({ key }) => key === 'queue_name')?.value || '') : '',
            type: !isHttp ? (conDetail.find(({ key }) => key === 'type')?.value || '') : 'topic',
            routing_key: !isHttp ? (conDetail.find(({ key }) => key === 'routing_key')?.value || '') : '',
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
            const { name, status, events, conditions, action_type, url, http_method, headers, template,
                credential, mode, exchange_name, queue_name, type, routing_key, is_http, is_exchange, execute_per_entity } = values;

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
            xsl_template: templateData || '',
            event_id: data.event_id,
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
                    event_id: Number(values.event_id),
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
            event_id: data.event_id,
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

    const formikExecution = useFormik({
        initialValues: {
            automation_id: Number(router.query?.id),
            entity_id: '',
        },
        validationSchema: Yup.object().shape({
            entity_id: Yup.string().required(t('integrationautomation:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            window.backdropLoader(true);
            manualExecution({
                variables: { ...values },
            }).then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('integrationautomation:Successfully_executed'),
                    variant: 'success',
                });
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
        ...props,
        formik,
        open,
        setOpen,
        formikCredential,
        handleDeleteCredential,
        getCredentialList,
        getCredentialListRes,
        formikOutputTest,
        formikField,
        tab,
        setTab,
        testExportTemplateRes,
        formikExecution,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const {
        t,
    } = props;

    const router = useRouter();
    const [load, setLoad] = useState(true);
    const [initCond, setInitCond] = useState([]);
    const { loading, data, error } = gqlService.getAutomation({
        pageSize: 1000,
        currentPage: 1,
        filter: {
            automation_id: { eq: String(router.query?.id) },
        },
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'integration_automation',
    });

    const [getEventConditions, getEventConditionsRes] = gqlService.getEventConditions();
    const { loading: loadingEvent, data: dataEvent } = gqlService.getEventListQuery({
        pageSize: 1000,
        currentPage: 1,
    });
    const { loading: loadingCred, data: dataCred } = gqlService.getCredentialListQuery({
        pageSize: 1000,
        currentPage: 1,
    });

    React.useEffect(() => {
        BackdropLoad(load || aclCheckLoading || loading || loadingEvent || loadingCred || getEventConditionsRes.loading);
    }, [load, aclCheckLoading, loading, loadingEvent, loadingCred, getEventConditionsRes.loading]);

    React.useEffect(() => {
        if (data?.getAutomationList?.items?.[0]) {
            conditionList(data.getAutomationList?.items?.[0], setInitCond, setLoad, getEventConditions);
        }
    }, [data]);

    if (aclCheckLoading || loading || loadingEvent || loadingCred || !initCond?.length) {
        return <Layout />;
    }

    if (((aclCheckData && aclCheckData.isAccessAllowed) === false)) {
        router.push('/');
        return <Layout />;
    }

    if (!data || !(Number(router.query?.id) >= 0)) {
        const errMsg = (error?.message) ?? t('integrationautomation:Data_not_found');
        const redirect = '/integration/automation';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} />;
    }

    const contentProps = {
        ...props,
        data: data.getAutomationList?.items?.[0] || {},
        eventList: dataEvent.getEventList?.items || [],
        credList: dataCred.getCredentialList?.items || [],
        getEventConditions,
        getEventConditionsRes,
        setLoad,
        initCond,
    };

    return (
        <Layout>
            <ContentWrapper {...contentProps} />
        </Layout>
    );
};

export default Core;
