/* eslint-disable max-len */
import React, { useState } from 'react';
import clsx from 'clsx';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import ScheduleIcon from '@material-ui/icons/Schedule';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import TextField from '@common_textfield';
import Autocomplete from '@common_autocomplete';
import Switch from '@common_switch';

import gqlService from '@modules/integrationautomation/services/graphql';

import { actionsOptions } from '@modules/integrationautomation/helpers';
import HttpContent from '@modules/integrationautomation/pages/add/components/generalinformation/HTTPRequestContent';
import RabbitMQContent from '@modules/integrationautomation/pages/add/components/generalinformation/RabbitMQContent';
import useStyles from '@modules/integrationautomation/pages/add/components/generalinformation/style';

const AddAutomationContent = (props) => {
    const {
        t, formik, formikField, formikOutputTest,
    } = props;
    const classes = useStyles();

    const [getEventList, getEventListRes] = gqlService.getEventList();
    const [eventOption, setEventOption] = useState([]);
    const [searchEvent, setSearchEvent] = useState('');

    React.useEffect(() => {
        if (
            getEventListRes
            && getEventListRes.data
            && getEventListRes.data.getEventList
            && getEventListRes.data.getEventList.items
        ) {
            const ids = new Set(eventOption.map((d) => d.event_id));
            setEventOption([...eventOption, ...getEventListRes.data.getEventList.items.filter((d) => !ids.has(d.event_id))]);
        }
    }, [getEventListRes.data]);

    React.useEffect(() => {
        const onChangeTimeOut = setTimeout(() => {
            if (searchEvent) {
                getEventList({
                    variables: {
                        filter: {
                            event_label: {
                                like: searchEvent,
                            },
                        },
                        pageSize: 20,
                        currentPage: 1,
                    },
                });
            }

            return null;
        }, 500);

        return () => clearTimeout(onChangeTimeOut);
    }, [searchEvent]);

    return (
        <>
            <div className={classes.content}>
                <div className={classes.topField}>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('integrationautomation:Name')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.name && formik.errors.name)}
                            helperText={(formik.touched.name && formik.errors.name) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.swicthDiv}>
                        <Switch
                            name="status"
                            value={formik.values.status}
                            onChange={formik.handleChange}
                            trueLabel={t('integrationautomation:Active')}
                            falseLabel={t('integrationautomation:Inactive')}
                        />
                    </div>
                </div>
            </div>

            <div className={classes.contentWithoutBorder}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={5}>
                        <div className={classes.borderDiv}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={3} lg="auto">
                                    <div className={clsx(classes.iconDiv, 'event')}>
                                        <ScheduleIcon className={classes.icon} />
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={9} lg="auto">
                                    <div className={classes.sectionName}>
                                        <h5 className={classes.sectionTitle}>{t('integrationautomation:Events')}</h5>
                                        <h6 className={classes.sectionDesc}>{t('integrationautomation:when_this_happens')}</h6>
                                    </div>
                                </Grid>
                            </Grid>
                            <Autocomplete
                                mode={eventOption.length > 0 ? 'default' : 'lazy'}
                                className={classes.autocompleteRoot}
                                value={formik.values.events}
                                onChange={(e) => {
                                    formik.setFieldValue('events', e);
                                    formikField.setFieldValue('event_id', e?.event_id);
                                    formikOutputTest.setFieldValue('event_id', e?.event_id);
                                    formik.setFieldValue('conditions[0].conditions', []);
                                    formikOutputTest.setFieldValue('xsl_template', e?.template);
                                    formik.setFieldValue('template', e?.template);
                                }}
                                options={eventOption}
                                getOptions={getEventList}
                                getOptionsVariables={{
                                    variables: {
                                        pageSize: 20,
                                        currentPage: 1,
                                    },
                                }}
                                loading={getEventListRes.loading}
                                primaryKey="event_id"
                                labelKey="event_label"
                                onInputChange={(e) => setSearchEvent(e && e.target && e.target.value)}
                                error={!!((formik.touched.events && formik.errors.events)
                                    || (formikField.touched.event_id && formikField.errors.event_id)
                                    || (formikOutputTest.touched.event_id && formikOutputTest.errors.event_id)
                                )}
                                helperText={(formik.touched.events && formik.errors.events)
                                    || (formikField.touched.event_id && formikField.errors.event_id)
                                    || (formikOutputTest.touched.event_id && formikOutputTest.errors.event_id)
                                    || ''}
                                placeholder={t('integrationautomation:Select_event')}
                            />
                            <div className={classes.divider} />
                            {['swiftoms_sync_stock_by_channel', 'swiftoms_sync_stock_by_virtual_source']
                                .includes(formik.values.events?.event_name)
                                && (
                                    <div className={clsx(classes.borderDiv, 'yellow')}>
                                        {t('integrationautomation:This_event_will_be_triggered_by_a_OMS_RabbitMQ_Consumer_that_consumes_data_from_swiftomsinventorysync_queue_Make_sure_you_enable_Stock_Updated_event_and_publish_data_to_OMS_RabbitMQ_queue_swiftomsinventorysync')}
                                    </div>
                                )}
                        </div>

                    </Grid>
                    <Hidden smDown>
                        <Grid item xs={2}>
                            <div className={classes.arrowDiv}>
                                <div className={clsx(classes.iconDiv, 'arrow')}>
                                    <ChevronRightIcon className={classes.icon} />
                                </div>
                            </div>
                        </Grid>
                    </Hidden>
                    <Grid item xs={12} md={5}>
                        <div className={classes.borderDiv}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={3} lg="auto">
                                    <div className={clsx(classes.iconDiv, 'action')}>
                                        <CheckCircleOutlineIcon className={classes.icon} />
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={9} lg="auto">
                                    <div className={classes.sectionName}>
                                        <h5 className={classes.sectionTitle}>{t('integrationautomation:Actions')}</h5>
                                        <h6 className={classes.sectionDesc}>{t('integrationautomation:then_perform_this_action')}</h6>
                                    </div>
                                </Grid>
                            </Grid>
                            <Autocomplete
                                className={classes.autocompleteRoot}
                                value={actionsOptions.find(({ value }) => value === formik.values.action_type)}
                                onChange={(e) => {
                                    formik.setFieldValue('is_http', e?.value === 'http_request');
                                    formik.setFieldValue('action_type', e?.value);
                                }}
                                options={actionsOptions}
                                error={!!(formik.touched.action_type && formik.errors.action_type)}
                                helperText={(formik.touched.action_type && formik.errors.action_type) || ''}
                                primaryKey="value"
                                labelKey="label"
                                placeholder={t('integrationautomation:Select_condition')}
                            />
                            {formik.values.action_type === 'http_request' && <HttpContent {...props} />}
                            {formik.values.action_type === 'rabbitmq' && <RabbitMQContent {...props} />}
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default AddAutomationContent;
