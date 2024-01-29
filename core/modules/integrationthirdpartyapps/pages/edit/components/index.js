/* eslint-disable max-len */
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import clsx from 'clsx';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import TextField from '@common_textfield';
import Button from '@common_button';
import Autocomplete from '@common_autocomplete';
import Switch from '@common_switch';
import Checkbox from '@common_checkbox';

import companyService from '@modules/company/services/graphql';
import locationService from '@modules/location/services/graphql';

import useStyles from '@modules/integrationthirdpartyapps/pages/edit/components/style';

const ThirdPartyIntegrationContent = (props) => {
    const {
        t, formik, dataChan, data, dataMod,
        newShipmentWebhook, updateShipmentWebhook,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    const variables = { pageSize: 1000, currentPage: 1 };
    const defaultValue = {
        channel: { channel_id: 0, channel_name: t('integrationthirdpartyapps:All_Channels') },
        company: { company_id: 0, company_name: t('integrationthirdpartyapps:All_Companies') },
        location: { loc_id: 0, loc_name: t('integrationthirdpartyapps:All_Locations') },
    };

    const [getCompanyList, getCompanyListRes] = companyService.getCompanyList();
    const [getLocationList, getLocationListRes] = locationService.getLocationList();

    const onChangeOptions = (val, keyName, primaryKey, defaultVal) => {
        if (val.length) {
            if (val[0][primaryKey] === 0) {
                formik.setFieldValue(keyName, val.slice(1));
            } else if (val[val.length - 1][primaryKey] === 0) {
                formik.setFieldValue(keyName, defaultVal);
            } else {
                formik.setFieldValue(keyName, val);
            }
        } else {
            formik.setFieldValue(keyName, defaultVal);
        }
    };

    return (
        <>
            <Button className={classes.btnBack} onClick={() => router.push('/integration/thirdpartyapps')} variant="contained" style={{ marginRight: 16 }}>
                <ChevronLeftIcon
                    style={{
                        fontSize: 30,
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                />
            </Button>
            <h2 className={classes.titleTop}>{t('integrationthirdpartyapps:Edit_Third_Party_App')}</h2>
            <Paper className={classes.container}>
                <div className={classes.contentWithoutBorder}>
                    <h5 className={classes.titleSmall}>{t('integrationthirdpartyapps:Information')}</h5>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('integrationthirdpartyapps:Name')}</span>
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
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('integrationthirdpartyapps:Status')}</span>
                        </div>
                        <Switch
                            name="status"
                            value={formik.values.status}
                            onChange={formik.handleChange}
                            trueLabel={t('integrationthirdpartyapps:Active')}
                            falseLabel={t('integrationthirdpartyapps:Inactive')}
                        />
                    </div>
                </div>
            </Paper>

            <Paper className={classes.container}>
                <div className={classes.contentWithoutBorder}>
                    <h5 className={classes.titleSmall}>{t('integrationthirdpartyapps:Conditions')}</h5>

                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('integrationthirdpartyapps:Channel')}</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            value={formik.values.channel_ids}
                            onChange={(e) => {
                                onChangeOptions(e, 'channel_ids', 'channel_id', [defaultValue.channel]);
                                formik.setFieldValue('company_ids', [defaultValue.company]);
                                formik.setFieldValue('loc_ids', [defaultValue.location]);
                            }}
                            options={[defaultValue.channel, ...dataChan]}
                            error={!!(formik.touched.channel_ids && formik.errors.channel_ids)}
                            helperText={(formik.touched.channel_ids && formik.errors.channel_ids) || ''}
                            primaryKey="channel_id"
                            labelKey="channel_name"
                            multiple
                        />
                    </div>

                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('integrationthirdpartyapps:Company')}</span>
                        </div>
                        <Autocomplete
                            mode="lazy"
                            value={formik.values.company_ids}
                            className={classes.autocompleteRoot}
                            onChange={(e) => {
                                onChangeOptions(e, 'company_ids', 'company_id', [defaultValue.company]);
                                formik.setFieldValue('loc_ids', [defaultValue.location]);
                            }}
                            options={getCompanyListRes?.data?.getCompanyList?.items?.length
                                ? [defaultValue.company, ...getCompanyListRes?.data?.getCompanyList?.items]
                                : []}
                            getOptions={getCompanyList}
                            getOptionsVariables={{
                                variables: {
                                    ...variables,
                                    filter: {
                                        ...(formik.values.channel_ids.filter(({ channel_code }) => !!channel_code)?.length
                                            && { channel_code: { in: formik.values.channel_ids.map(({ channel_code }) => channel_code) } }),
                                    },
                                },
                            }}
                            loading={getCompanyListRes?.loading}
                            primaryKey="company_id"
                            labelKey="company_name"
                            multiple
                            error={!!(formik.touched.company_ids && formik.errors.company_ids)}
                            helperText={(formik.touched.company_ids && formik.errors.company_ids) || ''}
                        />
                    </div>

                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('integrationthirdpartyapps:Location')}</span>
                        </div>
                        <Autocomplete
                            mode="lazy"
                            value={formik.values.loc_ids}
                            className={classes.autocompleteRoot}
                            onChange={(e) => onChangeOptions(e, 'loc_ids', 'loc_id', [defaultValue.location])}
                            options={getLocationListRes?.data?.getLocationList?.items?.length
                                ? [defaultValue.company, ...getLocationListRes?.data?.getLocationList?.items]
                                : []}
                            getOptions={getLocationList}
                            getOptionsVariables={{
                                variables: {
                                    ...variables,
                                    filter: {
                                        ...(formik.values.channel_ids.filter(({ channel_code }) => !!channel_code)?.length
                                            && { channel_code: { in: formik.values.channel_ids.map(({ channel_code }) => channel_code) } }),
                                        ...(formik.values.company_ids.filter(({ company_id }) => !!company_id)?.length
                                            && { company_id: { in: formik.values.company_ids.map(({ company_id }) => String(company_id)) } }),
                                    },
                                },
                            }}
                            loading={getLocationListRes?.loading}
                            primaryKey="loc_id"
                            labelKey="loc_name"
                            multiple
                            error={!!(formik.touched.loc_ids && formik.errors.loc_ids)}
                            helperText={(formik.touched.loc_ids && formik.errors.loc_ids) || ''}
                        />
                    </div>
                </div>
            </Paper>

            <Paper className={classes.container}>
                <div className={classes.contentWithoutBorder}>
                    <h5 className={classes.titleSmall}>{t('integrationthirdpartyapps:Webhook')}</h5>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('integrationthirdpartyapps:Authorization')}</span>
                        </div>
                        <div>
                            <TextField
                                className={classes.fieldRoot}
                                variant="outlined"
                                name="webhook_secret_key"
                                value={formik.values.webhook_secret_key}
                                onChange={formik.handleChange}
                                error={!!(formik.touched.webhook_secret_key && formik.errors.webhook_secret_key)}
                                helperText={(formik.touched.webhook_secret_key && formik.errors.webhook_secret_key) || ''}
                                InputProps={{
                                    className: classes.fieldInput,
                                }}
                            />
                            <div className={classes.helper}>
                                {t('integrationthirdpartyapps:This_field_will_be_used_as_API_request_header_with_the_key_Authorization_For_example_"Authorization_mg8x6jtolu"_or_"Authorization_Bearer_mg8x6jtolu"')}
                            </div>
                        </div>
                    </div>

                    {dataMod.map((mod) => (
                        mod.modules.map((mdl, i) => (
                            <div className={clsx(classes.formField, 'space-bottom')}>
                                <div className={clsx(classes.divLabel, 'top')}>
                                    <span className={classes.label}>{i === 0 ? mod.label : ''}</span>
                                </div>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} md={4}>
                                        <Checkbox
                                            name={`${mdl.module_code}_check`}
                                            label={mdl.label}
                                            checked={formik.values[`${mdl.module_code}_check`]}
                                            setChecked={formik.handleChange}
                                            className={classes.checkboxOption}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={8}>
                                        <TextField
                                            className={classes.fieldRoot}
                                            variant="outlined"
                                            name={mdl.module_code}
                                            value={formik.values[mdl.module_code]}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched[mdl.module_code] && formik.errors[mdl.module_code])}
                                            helperText={(formik.touched[mdl.module_code] && formik.errors[mdl.module_code]) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                        {mdl.module_code === 'webhookshipment_new' && !newShipmentWebhook?.profile_id
                                            && (
                                                <div className={classes.helper}>
                                                    {t('integrationthirdpartyapps:To_edit_webhook_output_format_tick_the_New_Shipment_URL_and_click_the_Submit_button')}
                                                </div>
                                            )}
                                        {mdl.module_code === 'webhookshipment_update_status' && !updateShipmentWebhook?.profile_id
                                            && (
                                                <div className={classes.helper}>
                                                    {t('integrationthirdpartyapps:To_edit_webhook_output_format_tick_Update_Shipment_Status_URL_and_click_the_Submit_button')}
                                                </div>
                                            )}
                                    </Grid>
                                    <Hidden mdUp>
                                        <Grid item xs={12}>
                                            {mdl.module_code === 'webhookshipment_new' && !!newShipmentWebhook?.profile_id
                                                && (
                                                    <Link href={`/integration/thirdpartyapps/edit/${data.entity_id}/output/${newShipmentWebhook?.profile_id}`}>
                                                        <a className={classes.editOutput}>{t('integrationthirdpartyapps:Edit_Output')}</a>
                                                    </Link>
                                                )}
                                            {mdl.module_code === 'webhookshipment_update_status' && !!updateShipmentWebhook?.profile_id
                                                && (
                                                    <Link href={`/integration/thirdpartyapps/edit/${data.entity_id}/output/${updateShipmentWebhook?.profile_id}`}>
                                                        <a className={classes.editOutput}>{t('integrationthirdpartyapps:Edit_Output')}</a>
                                                    </Link>
                                                )}
                                        </Grid>
                                    </Hidden>
                                </Grid>

                                <Hidden smDown>
                                    <div>
                                        {mdl.module_code === 'webhookshipment_new' && !!newShipmentWebhook?.profile_id
                                    && (
                                        <Link href={`/integration/thirdpartyapps/edit/${data.entity_id}/output/${newShipmentWebhook?.profile_id}`}>
                                            <a className={classes.editOutput}>{t('integrationthirdpartyapps:Edit_Output')}</a>
                                        </Link>
                                    )}
                                        {mdl.module_code === 'webhookshipment_update_status' && !!updateShipmentWebhook?.profile_id
                                    && (
                                        <Link href={`/integration/thirdpartyapps/edit/${data.entity_id}/output/${updateShipmentWebhook?.profile_id}`}>
                                            <a className={classes.editOutput}>{t('integrationthirdpartyapps:Edit_Output')}</a>
                                        </Link>
                                    )}
                                    </div>
                                </Hidden>
                            </div>
                        ))
                    ))}

                </div>
            </Paper>

            <div className={classes.formFieldButton}>
                <Button className={classes.btn} onClick={formik.handleSubmit} variant="contained">
                    {t('integrationthirdpartyapps:Submit')}
                </Button>
            </div>
        </>
    );
};

export default ThirdPartyIntegrationContent;
