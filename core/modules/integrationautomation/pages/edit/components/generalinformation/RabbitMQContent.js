import React, { useState } from 'react';
import clsx from 'clsx';

import IconButton from '@material-ui/core/IconButton';

import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import AddIcon from '@material-ui/icons/Add';

import TextField from '@common_textfield';
import Autocomplete from '@common_autocomplete';

import { typeOptions, modeOptions } from '@modules/integrationautomation/helpers';
import CreateCredentialModal from '@modules/integrationautomation/pages/edit/components/generalinformation/CreateCredentialModal';
import useStyles from '@modules/integrationautomation/pages/edit/components/generalinformation/style';

const ThirdPartyIntegrationContent = (props) => {
    const {
        t, formik, formikCredential, open, setOpen, getCredentialList, getCredentialListRes,
    } = props;
    const classes = useStyles();

    const [credentialOption, setCredentialOption] = useState([]);
    const [searchCredential, setSearchCredential] = useState('');

    const handleOpenModal = (mode = 'add') => {
        const cred = credentialOption.find(({ credential_id }) => credential_id === formik.values.credential?.credential_id);
        function findKey(keyName) {
            const { credential_detail } = cred;
            return credential_detail.find(({ key }) => key === keyName)?.value || '';
        }

        if (mode === 'edit') {
            formikCredential.setValues({
                credential_name: cred.credential_name,
                hostname: findKey('hostname'),
                port: findKey('port'),
                user: findKey('user'),
                password: findKey('password'),
                Vhost: findKey('Vhost'),
                id: formik.values.credential?.credential_id,
            });
        } else {
            formikCredential.resetForm();
        }
        setOpen(true);
    };

    React.useEffect(() => {
        if (
            getCredentialListRes
            && getCredentialListRes.data
            && getCredentialListRes.data.getCredentialList
            && getCredentialListRes.data.getCredentialList.items
        ) {
            const ids = new Set(credentialOption.map((d) => d.credential_name));
            setCredentialOption([...credentialOption,
                ...getCredentialListRes.data.getCredentialList.items.filter((d) => !ids.has(d.credential_name))]);
        }
    }, [getCredentialListRes.data]);

    React.useEffect(() => {
        const onChangeTimeOut = setTimeout(() => {
            if (searchCredential) {
                getCredentialList({
                    variables: {
                        filter: {
                            credential_name: { like: searchCredential },
                            credential_type: { eq: 'rabbitmq' },
                        },
                        pageSize: 20,
                        currentPage: 1,
                    },
                });
            }
            return null;
        }, 500);

        return () => clearTimeout(onChangeTimeOut);
    }, [searchCredential]);

    return (
        <div className={classes.actionProp}>
            <div className={classes.formFieldAction}>
                <h5 className={classes.titleCondition}>{t('integrationautomation:Credential_for_RabbitMQ')}</h5>
                <div className={classes.divFlexAction}>
                    <Autocomplete
                        mode="lazy"
                        className={classes.autocompleteRoot}
                        value={formik.values.credential}
                        onChange={(e) => formik.setFieldValue('credential', e)}
                        options={credentialOption}
                        getOptions={getCredentialList}
                        getOptionsVariables={{
                            variables: {
                                filter: {
                                    credential_type: { eq: 'rabbitmq' },
                                },
                                pageSize: 20,
                                currentPage: 1,
                            },
                        }}
                        loading={getCredentialListRes?.loading}
                        primaryKey="credential_id"
                        labelKey="credential_name"
                        onInputChange={(e) => setSearchCredential(e && e.target && e.target.value)}
                        error={!!(formik.touched.credential && formik.errors.credential)}
                        helperText={(formik.touched.credential && formik.errors.credential) || ''}
                    />
                    {!!formik.values.credential?.credential_id
                        && (
                            <IconButton
                                className={classes.helperCreate}
                                onClick={() => handleOpenModal('edit')}
                            >
                                <CreateOutlinedIcon className="pencil" />
                            </IconButton>
                        )}
                </div>
                <IconButton
                    className={classes.helperCreate}
                    onClick={() => handleOpenModal('add')}
                >
                    <AddIcon className="addIcon" />
                    {t('integrationautomation:Create_New')}
                </IconButton>
            </div>
            <div className={classes.formFieldAction}>
                <h5 className={clsx(classes.titleCondition, classes.labelRequired)}>{t('integrationautomation:Mode')}</h5>
                <Autocomplete
                    value={modeOptions.find(({ id }) => id === formik.values.mode)}
                    className={classes.autocompleteRoot}
                    onChange={(e) => {
                        formik.setFieldValue('is_exchange', e?.id === 'exchange');
                        formik.setFieldValue('is_queue', e?.id === 'queue');
                        formik.setFieldValue('mode', e?.id);
                    }}
                    options={modeOptions}
                    error={!!(formik.touched.mode && formik.errors.mode)}
                    helperText={(formik.touched.mode && formik.errors.mode) || ''}
                />
            </div>
            {formik.values.mode === 'exchange'
                && (
                    <>
                        <div className={classes.formFieldAction}>
                            <h5 className={clsx(classes.titleCondition, classes.labelRequired)}>{t('integrationautomation:Exchange_Name')}</h5>
                            <TextField
                                className={classes.fieldRoot}
                                variant="outlined"
                                name="exchange_name"
                                value={formik.values.exchange_name}
                                onChange={formik.handleChange}
                                error={!!(formik.touched.exchange_name && formik.errors.exchange_name)}
                                helperText={(formik.touched.exchange_name && formik.errors.exchange_name) || ''}
                                InputProps={{
                                    className: classes.fieldInput,
                                }}
                            />
                        </div>
                        <div className={classes.formFieldAction}>
                            <h5 className={clsx(classes.titleCondition, classes.labelRequired)}>{t('integrationautomation:Type')}</h5>
                            <Autocomplete
                                value={typeOptions.find(({ id }) => id === formik.values.type)}
                                className={classes.autocompleteRoot}
                                onChange={(e) => formik.setFieldValue('type', e?.id)}
                                options={typeOptions}
                                error={!!(formik.touched.type && formik.errors.type)}
                                helperText={(formik.touched.type && formik.errors.type) || ''}
                            />
                        </div>
                        <div className={classes.formFieldAction}>
                            <h5 className={clsx(classes.titleCondition, classes.labelRequired)}>{t('integrationautomation:Routing_Key')}</h5>
                            <TextField
                                className={classes.fieldRoot}
                                variant="outlined"
                                name="routing_key"
                                value={formik.values.routing_key}
                                onChange={formik.handleChange}
                                error={!!(formik.touched.routing_key && formik.errors.routing_key)}
                                helperText={(formik.touched.routing_key && formik.errors.routing_key) || ''}
                                InputProps={{
                                    className: classes.fieldInput,
                                }}
                            />
                        </div>
                    </>
                )}
            {formik.values.mode === 'queue'
                && (
                    <div className={classes.formFieldAction}>
                        <h5 className={clsx(classes.titleCondition, classes.labelRequired)}>{t('integrationautomation:Queue_Name')}</h5>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="queue_name"
                            value={formik.values.queue_name}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.queue_name && formik.errors.queue_name)}
                            helperText={(formik.touched.queue_name && formik.errors.queue_name) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                )}
            <CreateCredentialModal
                {...props}
                open={open}
                onCancel={() => setOpen(false)}
                onConfirm={async () => {
                    await formikCredential.handleSubmit();
                    setCredentialOption([]);
                }}
            />
        </div>
    );
};

export default ThirdPartyIntegrationContent;
