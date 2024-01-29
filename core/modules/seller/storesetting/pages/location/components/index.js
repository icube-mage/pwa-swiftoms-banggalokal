/* eslint-disable no-param-reassign */
import React, { useEffect } from 'react';
import clsx from 'clsx';
import classNames from 'classnames';
import { useRouter } from 'next/router';

import Card from '@sellermodules/storesetting/pages/location/components/Card';
import CardFlatRate from '@sellermodules/storesetting/pages/location/components/CardFlatRate';

import TextField from '@common_textfield';
import Autocomplete from '@common_autocomplete';
import IcubeMapsAutocomplete from '@common_googlemaps_autocomplete';
import Button from '@common_button';
import PhoneInput from '@common_phoneinput';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';

import { breakPointsUp } from '@helper_theme';
import { inputNumber } from '@helper_text';
import useStyles from '@sellermodules/storesetting/pages/location/components/style';

const StoreSettingContent = (props) => {
    const {
        t, formik, getCountry, getCountryRes, getCountries, getCountriesRes, shipmentGroup,
        getCityKecByRegionCode, getCityKecByRegionCodeRes, gmapKey,
        enableMap, mapPosition, handleDragPosition, setDialCode, dataShipping, flatRate,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const isDesktop = breakPointsUp('sm');
    const firstRenderPhone = React.useRef(true);

    const countryOptions = (getCountriesRes && getCountriesRes.data && getCountriesRes.data.countries) || [];
    const regionOptions = (getCountryRes && getCountryRes.data && getCountryRes.data.country && getCountryRes.data.country.available_regions) || [];
    const cityOptions = (getCityKecByRegionCodeRes && getCityKecByRegionCodeRes.data && getCityKecByRegionCodeRes.data.getCityKecByRegionCode) || [];

    const errorShipping = !!(formik.touched.shipping && formik.errors.shipping) && !formik.values.shipping.length;
    const errorTextShipping = (formik.touched.shipping && formik.errors.shipping) || '';

    useEffect(() => {
        if (!formik.isSubmitting) return;
        const keys = Object.keys(formik.errors);
        if (keys.length > 0) {
            const keyName = keys[0];
            const node = document.getElementsByName(keyName);
            if (node.length) {
                node[0].scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
                node[0].focus();
            }
        }
    }, [formik]);

    return (
        <>
            <div className={classes.headerContainer}>
                <IconButton aria-label="back" onClick={() => router.push('/seller/storesetting/location')}>
                    <ArrowBackOutlinedIcon />
                </IconButton>
                <h2 className="title">{t('storesetting:Location')}</h2>
            </div>
            <Paper className={classes.container}>
                <h2 className={classes.title}>{t('storesetting:Store_Delivery')}</h2>
                <Grid container>
                    <Grid item container spacing={isDesktop ? 6 : 0}>
                        <Grid item xs={12} sm={6}>
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <InputLabel htmlFor="street" className={classNames(classes.label, classes.required)}>
                                    {t('storesetting:Store_Address')}
                                </InputLabel>
                                <TextField
                                    id="street"
                                    name="street"
                                    className={classes.textInput}
                                    value={formik.values.street}
                                    onChange={formik.handleChange}
                                    error={!!(formik.touched.street && formik.errors.street)}
                                    helperText={(formik.touched.street && formik.errors.street) || ''}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <InputLabel htmlFor="country_id" className={classNames(classes.label, classes.required)}>
                                    {t('registervendor:Country')}
                                </InputLabel>
                                <Autocomplete
                                    id="country_id"
                                    name="country_id"
                                    mode="lazy"
                                    getOptions={getCountries}
                                    value={formik.values.country_id}
                                    onChange={(e) => {
                                        formik.setFieldValue('country_id', e);
                                        formik.setFieldValue('region', '');
                                        formik.setFieldValue('city', '');
                                        formik.setFieldValue('address', '');
                                    }}
                                    options={countryOptions}
                                    loading={getCountriesRes.loading}
                                    primaryKey="id"
                                    labelKey="full_name_english"
                                    fullWidth
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            value={formik.values.country_id}
                                            className={classes.textInput}
                                            error={!!(formik.touched.country_id && formik.errors.country_id)}
                                            helperText={(formik.touched.country_id && formik.errors.country_id) || ''}
                                        />
                                    )}
                                    disableClearable
                                />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid item container spacing={isDesktop ? 6 : 0}>
                        <Grid item xs={12} sm={6}>
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <InputLabel htmlFor="region" className={classNames(classes.label, classes.required)}>
                                    {t('storesetting:Province')}
                                </InputLabel>
                                <Autocomplete
                                    disabled={!formik.values.country_id}
                                    id="region"
                                    name="region"
                                    mode="lazy"
                                    getOptions={getCountry}
                                    getOptionsVariables={{ variables: { id: formik.values.country_id?.id } }}
                                    value={formik.values.region}
                                    onChange={(e) => {
                                        formik.setFieldValue('region', e);
                                        formik.setFieldValue('city', '');
                                        formik.setFieldValue('address', '');
                                    }}
                                    options={regionOptions}
                                    loading={getCountryRes.loading}
                                    primaryKey="id"
                                    labelKey="name"
                                    fullWidth
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            value={formik.values.region}
                                            className={classes.textInput}
                                            error={!!(formik.touched.region && formik.errors.region)}
                                            helperText={(formik.touched.region && formik.errors.region) || ''}
                                        />
                                    )}
                                    disableClearable
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <InputLabel htmlFor="city" className={classNames(classes.label, classes.required)}>
                                    {t('storesetting:City')}
                                </InputLabel>
                                <Autocomplete
                                    disabled={!formik.values.region}
                                    id="city"
                                    name="city"
                                    mode="lazy"
                                    getOptions={getCityKecByRegionCode}
                                    getOptionsVariables={{ variables: { region_code: formik.values.region?.code } }}
                                    value={formik.values.city}
                                    onChange={(e) => {
                                        formik.setFieldValue('city', e);
                                        formik.setFieldValue('address', '');
                                    }}
                                    options={cityOptions}
                                    loading={getCityKecByRegionCodeRes.loading}
                                    primaryKey="value"
                                    labelKey="label"
                                    fullWidth
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            value={formik.values.city}
                                            className={classes.textInput}
                                            error={!!(formik.touched.city && formik.errors.city)}
                                            helperText={(formik.touched.city && formik.errors.city) || ''}
                                        />
                                    )}
                                    disableClearable
                                />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid item container spacing={isDesktop ? 6 : 0}>
                        <Grid item xs={12} sm={6}>
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <InputLabel htmlFor="postcode" className={classNames(classes.label, classes.required)}>
                                    {t('storesetting:Zip_Code')}
                                </InputLabel>
                                <TextField
                                    id="postcode"
                                    name="postcode"
                                    value={formik.values.postcode}
                                    onChange={(e) => formik.setFieldValue('postcode', parseInt(e.target.value, 10))}
                                    className={classes.textInput}
                                    error={!!(formik.touched.postcode && formik.errors.postcode)}
                                    helperText={(formik.touched.postcode && formik.errors.postcode) || ''}
                                    type="number"
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <InputLabel htmlFor="telephone" className={classNames(classes.label, classes.required)}>
                                    {t('storesetting:Phone')}
                                </InputLabel>
                                <PhoneInput
                                    name="telephone"
                                    value={formik.values.telephone}
                                    onChange={(e, c) => {
                                        formik.setFieldValue('telephone', e);
                                        setDialCode(c.dialCode);
                                    }}
                                    error={!!(formik.touched.telephone && formik.errors.telephone)}
                                    helperText={(formik.touched.telephone && formik.errors.telephone) || ''}
                                    containerClass={classes.fieldPhoneContainer}
                                    rootClasses={classes.fieldPhoneRoot}
                                    variant="standard"
                                    onBlur={() => formik.setFieldTouched('telephone', true)}
                                    onFocus={(e, c) => {
                                        setDialCode(c.dialCode);
                                        if (firstRenderPhone.current) {
                                            firstRenderPhone.current = false;
                                            e.target.blur();
                                        }
                                    }}
                                    inputProps={{ autoFocus: true }}
                                />
                            </div>
                        </Grid>
                    </Grid>

                    <Grid item container spacing={isDesktop ? 6 : 0}>
                        <Grid item xs={12}>
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <InputLabel htmlFor="name" className={classNames(classes.label, classes.required)}>
                                    {t('storesetting:Location_Name')}
                                </InputLabel>
                                <TextField
                                    id="name"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    className={classes.textInput}
                                    error={!!(formik.touched.name && formik.errors.name)}
                                    helperText={(formik.touched.name && formik.errors.name) || ''}
                                />
                            </div>
                        </Grid>
                    </Grid>

                </Grid>
                {gmapKey && enableMap ? (
                    <div className={clsx('col-xs-12 col-sm-12', classes.formField)} name="address">
                        <InputLabel htmlFor="city" className={classes.label} style={{ paddingTop: 10 }}>
                            {t('storesetting:Pinpoint_your_Location')}
                        </InputLabel>
                        <div>
                            <IcubeMapsAutocomplete
                                gmapKey={gmapKey}
                                formik={formik}
                                formikName="address"
                                mapPosition={mapPosition}
                                dragMarkerDone={handleDragPosition}
                                placeholder={t('storesetting:Write_the_name_of_the_street__building__housing')}
                                InputProps={{
                                    startAdornment: (
                                        <img src="/assets/img/search.svg" alt="search" style={{ marginRight: 10 }} />
                                    ),
                                }}
                                className={classes.textInput}
                                style={{ marginBottom: 10 }}
                                mapStyle={{ height: 300 }}
                                required
                            />
                        </div>
                    </div>
                )
                    : (
                        <Grid item container spacing={isDesktop ? 6 : 0}>
                            <Grid item xs={12} sm={6}>
                                <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                    <InputLabel htmlFor="longitude" className={classNames(classes.label, classes.required)}>
                                        {t('storesetting:Longitude')}
                                    </InputLabel>
                                    <TextField
                                        id="longitude"
                                        name="longitude"
                                        value={formik.values.longitude}
                                        onChange={(e) => formik.setFieldValue('longitude', inputNumber(e, formik.values.longitude, ['e']))}
                                        className={classes.textInput}
                                        error={!!(formik.touched.longitude && formik.errors.longitude)}
                                        helperText={(formik.touched.longitude && formik.errors.longitude) || ''}
                                        type="number"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                    <InputLabel htmlFor="latitude" className={classNames(classes.label, classes.required)}>
                                        {t('storesetting:Latitude')}
                                    </InputLabel>
                                    <TextField
                                        id="latitude"
                                        name="latitude"
                                        value={formik.values.latitude}
                                        onChange={(e) => formik.setFieldValue('latitude', inputNumber(e, formik.values.latitude, ['e']))}
                                        className={classes.textInput}
                                        error={!!(formik.touched.latitude && formik.errors.latitude)}
                                        helperText={(formik.touched.latitude && formik.errors.latitude) || ''}
                                        type="number"
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    )}
            </Paper>
            <div style={{ height: 20 }} />
            {dataShipping
                ? (
                    <Paper className={classes.container}>
                        <h2 className={classes.title}>{t('storesetting:Shipping_Information')}</h2>
                        {errorShipping
                            && (
                                <div className={classes.error}>
                                    {errorTextShipping}
                                </div>
                            )}
                        <Grid container spacing={3}>
                            {shipmentGroup?.filter((shipment) => shipment.provider !== 'FLATRATE')?.map((shipment) => (
                                <Grid item xs={12} sm={6} md={4} lg={shipmentGroup?.length < 4 ? 4 : 3} key={shipment.code}>
                                    <Card {...shipment} {...props} error={errorShipping} />
                                </Grid>
                            ))}
                            {!!flatRate
                                && (
                                    <Grid item xs={12} sm={6} md={4} lg={shipmentGroup?.length < 4 ? 4 : 3}>
                                        <CardFlatRate {...flatRate} {...props} error={errorShipping} />
                                    </Grid>
                                )}
                        </Grid>
                    </Paper>
                ) : null}
            <Grid container className={classes.btnContainer}>
                <Grid item xs={12} sm={6} md={4}>
                    <Button
                        variant="contained"
                        className={classes.btnSave}
                        onClick={formik.handleSubmit}
                    >
                        <span className={classes.btnText}>
                            {t('storesetting:Save')}
                        </span>
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default StoreSettingContent;
