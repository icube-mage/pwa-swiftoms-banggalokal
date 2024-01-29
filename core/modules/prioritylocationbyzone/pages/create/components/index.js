/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React from 'react';
import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import Autocomplete from '@common_autocomplete';
import locationGqlService from '@modules/location/services/graphql';
import gqlService from '@modules/prioritylocationbyzone/services/graphql';
import clsx from 'clsx';
import useStyles from '@modules/prioritylocationbyzone/pages/create/components/style';

const PriorityZoneCreateContent = (props) => {
    const { formik, t } = props;
    const classes = useStyles();
    const router = useRouter();
    const [getCountries, getCountriesRes] = locationGqlService.getCountries();
    const [getCountry, getCountryRes] = locationGqlService.getCountry();
    const [getZoneOptions, getZoneOptionsRes] = gqlService.getZoneOptions();

    return (
        <>
            <Button className={classes.btnBack} onClick={() => router.push('/oms/prioritylocationbyzone')} variant="contained" style={{ marginRight: 16 }}>
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
            <h2 className={classes.titleTop}>{t('prioritylocationbyzone:New_Priority_Location_by_Zone')}</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('prioritylocationbyzone:Country')}</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            mode="lazy"
                            value={formik.values.country_id}
                            onChange={(e) => formik.setFieldValue('country_id', e)}
                            loading={getCountriesRes.loading}
                            options={getCountriesRes && getCountriesRes.data && getCountriesRes.data.countries}
                            error={!!(formik.touched.country_id && formik.errors.country_id)}
                            helperText={(formik.touched.country_id && formik.errors.country_id) || ''}
                            getOptions={getCountries}
                            primaryKey="id"
                            labelKey="full_name_english"
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('prioritylocationbyzone:Region')}</span>
                        </div>
                        <Autocomplete
                            disabled={!(formik.values.country_id && formik.values.country_id.id)}
                            className={classes.autocompleteRoot}
                            mode="lazy"
                            value={formik.values.code}
                            onChange={(e) => formik.setFieldValue('code', e)}
                            loading={getCountryRes.loading}
                            options={
                                getCountryRes && getCountryRes.data && getCountryRes.data.country && getCountryRes.data.country.available_regions
                            }
                            error={!!(formik.touched.code && formik.errors.code)}
                            helperText={(formik.touched.code && formik.errors.code) || ''}
                            getOptions={getCountry}
                            getOptionsVariables={{ variables: { id: formik.values.country_id && formik.values.country_id.id } }}
                            primaryKey="id"
                            labelKey="name"
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('prioritylocationbyzone:Zone')}</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            mode="lazy"
                            value={formik.values.zone}
                            onChange={(e) => formik.setFieldValue('zone', e)}
                            loading={getZoneOptionsRes.loading}
                            options={
                                getZoneOptionsRes && getZoneOptionsRes.data && getZoneOptionsRes.data.getZoneOptions
                            }
                            error={!!(formik.touched.zone && formik.errors.zone)}
                            helperText={(formik.touched.zone && formik.errors.zone) || ''}
                            getOptions={getZoneOptions}
                            primaryKey="value"
                            labelKey="label"
                        />
                    </div>
                </div>
                <div className={classes.formFieldButton}>
                    <Button className={classes.btn} onClick={formik.handleSubmit} variant="contained">
                        {t('prioritylocationbyzone:Submit')}
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default PriorityZoneCreateContent;
