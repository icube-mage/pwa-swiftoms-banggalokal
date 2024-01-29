/* eslint-disable no-confusing-arrow */
/* eslint-disable indent */
/* eslint-disable no-lone-blocks */
/* eslint-disable max-len */
import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import useStyles from '@modules/configurationacceptancedeadline/pages/create/components/style';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import TextField from '@common_textfield';
import Autocomplete from '@common_autocomplete';

const GeneralConfigurationContent = (props) => {
    const {
        formik, t, id, getChannelListRes, getChannelList,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <div className={classes.topPage}>
                <div>
                    <Button
                        className={classes.btnBack}
                        onClick={() => router.push('/configurations/acceptancedeadline')}
                        variant="contained"
                        style={{ marginRight: 16 }}
                    >
                        <ChevronLeftIcon style={{
                            fontSize: 30,
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                        />
                    </Button>
                    <h2 className={classes.titleTop}>
                        {id ? t('acceptancedeadlineconfiguration:Edit_Acceptance_Deadline') : t('acceptancedeadlineconfiguration:Add_Acceptance_Deadline')}
                    </h2>
                </div>

            </div>
            <Paper className={classes.container}>

                <div className={classes.content}>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>
                                {t('acceptancedeadlineconfiguration:Channel')}
                            </span>
                        </div>
                        <div className={classes.divField}>
                            <Autocomplete
                                mode="lazy"
                                name="channel_code"
                                variant="outlined"
                                value={(getChannelListRes.data?.getChannelList?.items
                                    || []).find((e) => e.channel_code === formik.values.channel_code)}
                                onChange={(e) => {
                                    formik.setFieldValue('channel_code', e.channel_code);
                                }}
                                loading={getChannelListRes.loading}
                                options={(getChannelListRes.data?.getChannelList?.items || [])}
                                getOptions={getChannelList}
                                getOptionsVariables={{
                                    variables: {
                                        pageSize: null,
                                        currentPage: 1,
                                    },
                                }}
                                className={classes.autocompleteRoot}
                                primaryKey="channel_code"
                                labelKey="channel_name"
                                error={!!(formik.touched.channel_code && formik.errors.channel_code)}
                                helperText={(formik.touched.channel_code && formik.errors.channel_code) || ''}
                                disableClearable
                            />
                        </div>
                    </div>

                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>
                                {t('acceptancedeadlineconfiguration:Shipping_Method')}
                            </span>
                        </div>
                        <div className={classes.divField}>
                            <TextField
                                className={classes.fieldRoot}
                                variant="outlined"
                                name="shipping_method"
                                value={formik.values.shipping_method}
                                onChange={formik.handleChange}
                                error={!!(formik.touched.shipping_method && formik.errors.shipping_method)}
                                helperText={(formik.touched.shipping_method && formik.errors.shipping_method) || ''}
                                InputProps={{
                                    className: classes.fieldInput,
                                }}
                                fullWidth
                            />
                            <p className={classes.helperText}>
                                {t('acceptancedeadlineconfiguration:Enter_Default_if_the_acceptance_deadline_applies_to_all_shipping_methods')}
                            </p>
                        </div>
                    </div>

                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>
                                {t('acceptancedeadlineconfiguration:Acceptance_Deadline_in_hour')}
                            </span>
                        </div>
                        <div className={classes.divField}>
                            <TextField
                                className={classes.fieldRoot}
                                variant="outlined"
                                name="deadline"
                                value={formik.values.deadline}
                                onChange={(e) => formik.setFieldValue('deadline', e.target.value.replace(/[^\d]/g, ''))}
                                error={!!(formik.touched.deadline && formik.errors.deadline)}
                                helperText={(formik.touched.deadline && formik.errors.deadline) || ''}
                                InputProps={{
                                    className: classes.fieldInput,
                                }}
                                fullWidth
                            />
                        </div>
                    </div>
                </div>
                <div className={classes.formFieldButton}>
                    <Button
                        onClick={formik.handleSubmit}
                        variant="contained"
                        buttonType="primary-rounded"
                    >
                        {t('acceptancedeadlineconfiguration:Submit')}
                    </Button>
                </div>

            </Paper>
        </>
    );
};

export default GeneralConfigurationContent;
