/* eslint-disable no-unused-vars */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Autocomplete from '@common_autocomplete';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import channelGqlService from '@modules/channel/services/graphql';
import clsx from 'clsx';
import useStyles from '@modules/configuration/pages/create/components/style';

const ConfigurationTadaCreateContent = (props) => {
    const {
        formik,
        t,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const [getChannelList, getChannelListRes] = channelGqlService.getChannelList();

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/tada/configuration')}
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
            <h2 className={classes.titleTop}>{t('configuration:Add_New_Configuration')}</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('configuration:Channel')}</span>
                        </div>
                        <Autocomplete
                            className={clsx(classes.autocompleteRoot, classes.autocompleteMulti)}
                            mode="lazy"
                            value={formik.values.channel}
                            onChange={(e) => formik.setFieldValue('channel', e)}
                            loading={getChannelListRes.loading}
                            options={
                                getChannelListRes
                                && getChannelListRes.data
                                && getChannelListRes.data.getChannelList
                                && getChannelListRes.data.getChannelList.items
                            }
                            getOptions={getChannelList}
                            primaryKey="channel_id"
                            labelKey="channel_name"
                            error={!!(formik.touched.channel && formik.errors.channel)}
                            helperText={(formik.touched.channel && formik.errors.channel) || ''}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('configuration:Username')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.username && formik.errors.username)}
                            helperText={(formik.touched.username && formik.errors.username) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('configuration:Password')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.password && formik.errors.password)}
                            helperText={(formik.touched.password && formik.errors.password) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('configuration:Api_Key')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="apiKey"
                            value={formik.values.apiKey}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.apiKey && formik.errors.apiKey)}
                            helperText={(formik.touched.apiKey && formik.errors.apiKey) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('configuration:Api_Secret')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="apiSecret"
                            value={formik.values.apiSecret}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.apiSecret && formik.errors.apiSecret)}
                            helperText={(formik.touched.apiSecret && formik.errors.apiSecret) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('configuration:Program_ID')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="programId"
                            value={formik.values.programId}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.programId && formik.errors.programId)}
                            helperText={(formik.touched.programId && formik.errors.programId) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('configuration:Catalog_ID')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="catalogId"
                            value={formik.values.catalogId}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.catalogId && formik.errors.catalogId)}
                            helperText={(formik.touched.catalogId && formik.errors.catalogId) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                </div>
                <div className={classes.formFieldButton}>
                    <Button
                        className={classes.btn}
                        onClick={formik.handleSubmit}
                        variant="contained"
                    >
                        {t('configuration:Submit')}
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default ConfigurationTadaCreateContent;
