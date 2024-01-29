import React, { useState, useEffect } from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import Autocomplete from '@common_autocomplete';
import PhoneInput from '@common_phoneinput';
import IcubeMapsAutocomplete from '@common_googlemaps_autocomplete';
import companyGqlService from '@modules/company/services/graphql';
import locationGqlService from '@modules/location/services/graphql';
import clsx from 'clsx';
import useStyles from '@modules/ecommercechannel/pages/integrate/components/locationModal/style';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const LocationCreateContent = (props) => {
    const {
        formik, open, handleClose, t, setDialCode,
        handleDragPosition, gmapKey, mapPosition, enableMap,
    } = props;
    const classes = useStyles();
    const firstRenderPhone = React.useRef(true);
    const [getCompanyList, { data: dataComp, loading: loadingComp }] = companyGqlService.getCompanyList();
    const [getCountries, getCountriesRes] = locationGqlService.getCountries();
    const [getCountry, getCountryRes] = locationGqlService.getCountry();
    const [getCityKecByRegionCode, getCityKecByRegionCodeRes] = locationGqlService.getCityKecByRegionCode();

    const onClose = () => {
        formik.resetForm();
        handleClose();
    };

    const [optionsComp, setOptionsComp] = useState([]);
    const [searchComp, setSearchComp] = useState('');

    useEffect(() => {
        const onChangeTimeOut = setTimeout(() => {
            const isExist = searchComp && optionsComp.filter((elm) => elm?.company_name?.toLowerCase().includes(searchComp?.toLowerCase()));
            if (searchComp && isExist.length === 0) {
                getCompanyList({
                    variables: {
                        search: searchComp,
                        pageSize: 20,
                        currentPage: 1,
                    },
                });
            }
            return null;
        }, 500);

        return () => clearTimeout(onChangeTimeOut);
    }, [searchComp]);

    useEffect(() => {
        if (dataComp && dataComp.getCompanyList && dataComp.getCompanyList.items) {
            const ids = new Set(optionsComp.map((d) => d.company_code));
            setOptionsComp([...optionsComp, ...dataComp.getCompanyList.items.filter((d) => !ids.has(d.company_code))]);
        }
    }, [dataComp]);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth="true" classes={{ paper: classes.paper }}>
            <DialogTitle classes={{ root: classes.titleTop }}>{t('ecommercechannel:Create_New_Location')}</DialogTitle>
            <DialogContent classes={{ root: clsx(classes.content, classes.contentCounter) }}>
                <FormControl className={clsx(classes.formControl)}>
                    <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                        {t('ecommercechannel:Company')}
                    </InputLabel>
                    <Autocomplete
                        mode={optionsComp.length > 0 ? 'default' : 'lazy'}
                        variant="standard"
                        className={classes.autocompleteRoot}
                        value={formik.values.company}
                        onChange={(e) => formik.setFieldValue('company', e)}
                        loading={loadingComp}
                        options={optionsComp}
                        error={!!(formik.touched.company && formik.errors.company)}
                        helperText={(formik.touched.company && formik.errors.company) || ''}
                        getOptions={getCompanyList}
                        primaryKey="company_id"
                        labelKey="company_name"
                        onInputChange={(e) => setSearchComp(e && e.target && e.target.value)}
                    />
                </FormControl>
                <div className={classes.grid}>
                    <div>
                        <FormControl className={clsx(classes.formControl)}>
                            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                {t('ecommercechannel:Code')}
                            </InputLabel>
                            <TextField
                                className={classes.fieldInput}
                                variant="standard"
                                name="code"
                                value={formik.values.code}
                                onChange={formik.handleChange}
                                error={!!(formik.touched.code && formik.errors.code)}
                                helperText={(formik.touched.code && formik.errors.code) || ''}
                                InputProps={{
                                    className: classes.fieldInput,
                                }}
                            />
                        </FormControl>
                    </div>
                    <div />
                    <div>
                        <FormControl className={clsx(classes.formControl)}>
                            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                {t('ecommercechannel:Name')}
                            </InputLabel>
                            <TextField
                                multiple
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                inputProps={{
                                    autocomplete: 'off',
                                }}
                                className={classes.fieldInput}
                                variant="standard"
                                autoComplete="off"
                                error={!!(formik.touched.name && formik.errors.name)}
                                helperText={(formik.touched.name && formik.errors.name) || ''}
                            />
                        </FormControl>
                    </div>
                </div>

                <FormControl className={clsx(classes.formControl)}>
                    <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                        {t('ecommercechannel:Address')}
                    </InputLabel>
                    <TextField
                        className={classes.fieldInput}
                        variant="standard"
                        name="street"
                        value={formik.values.street}
                        onChange={formik.handleChange}
                        error={!!(formik.touched.street && formik.errors.street)}
                        helperText={(formik.touched.street && formik.errors.street) || ''}
                        InputProps={{
                            className: classes.fieldInput,
                        }}
                    />
                </FormControl>

                <div className={classes.grid}>
                    <div>
                        <FormControl className={clsx(classes.formControl)}>
                            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                {t('ecommercechannel:Country')}
                            </InputLabel>
                            <Autocomplete
                                variant="standard"
                                className={classes.autocompleteRoot}
                                mode="lazy"
                                value={formik.values.countries}
                                onChange={(e) => {
                                    formik.setFieldValue('countries', e);
                                    formik.setFieldValue('region', '');
                                    formik.setFieldValue('city', '');
                                }}
                                loading={getCountriesRes.loading}
                                options={getCountriesRes && getCountriesRes.data && getCountriesRes.data.countries}
                                error={!!(formik.touched.countries && formik.errors.countries)}
                                helperText={(formik.touched.countries && formik.errors.countries) || ''}
                                getOptions={getCountries}
                                primaryKey="id"
                                labelKey="full_name_english"
                            />
                        </FormControl>
                    </div>
                    <div />
                    <div>
                        <FormControl className={clsx(classes.formControl)}>
                            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                {t('ecommercechannel:Province')}
                            </InputLabel>
                            <Autocomplete
                                variant="standard"
                                disabled={!(formik.values.countries && formik.values.countries.id)}
                                className={classes.autocompleteRoot}
                                mode="lazy"
                                value={formik.values.region}
                                onChange={(e) => {
                                    formik.setFieldValue('region', e);
                                    formik.setFieldValue('city', '');
                                }}
                                loading={getCountryRes.loading}
                                options={
                                    getCountryRes && getCountryRes.data && getCountryRes.data.country && getCountryRes.data.country.available_regions
                                }
                                error={!!(formik.touched.region && formik.errors.region)}
                                helperText={(formik.touched.region && formik.errors.region) || ''}
                                getOptions={getCountry}
                                getOptionsVariables={{ variables: { id: formik.values.countries && formik.values.countries.id } }}
                                primaryKey="id"
                                labelKey="name"
                            />
                        </FormControl>
                    </div>
                </div>

                <div className={classes.grid}>
                    <div>
                        <FormControl className={clsx(classes.formControl)}>
                            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                {t('ecommercechannel:City')}
                            </InputLabel>
                            <Autocomplete
                                variant="standard"
                                disabled={!(formik.values.region && formik.values.region.id)}
                                className={classes.autocompleteRoot}
                                mode="lazy"
                                value={formik.values.city}
                                onChange={(e) => formik.setFieldValue('city', e)}
                                loading={getCityKecByRegionCodeRes.loading}
                                options={
                                    getCityKecByRegionCodeRes && getCityKecByRegionCodeRes.data
                                    && getCityKecByRegionCodeRes.data.getCityKecByRegionCode
                                }
                                error={!!(formik.touched.city && formik.errors.city)}
                                helperText={(formik.touched.city && formik.errors.city) || ''}
                                getOptions={getCityKecByRegionCode}
                                getOptionsVariables={{
                                    variables: {
                                        region_code: formik.values.region && formik.values.region.code,
                                    },
                                }}
                                primaryKey="value"
                                labelKey="label"
                            />
                        </FormControl>
                    </div>
                    <div />
                    <div>
                        <FormControl className={clsx(classes.formControl)}>
                            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                {t('ecommercechannel:Zip_Code')}
                            </InputLabel>
                            <TextField
                                className={classes.fieldInput}
                                variant="standard"
                                name="postcode"
                                value={formik.values.postcode}
                                onChange={formik.handleChange}
                                error={!!(formik.touched.postcode && formik.errors.postcode)}
                                helperText={(formik.touched.postcode && formik.errors.postcode) || ''}
                                InputProps={{
                                    className: classes.fieldInput,
                                }}
                            />
                        </FormControl>
                    </div>
                </div>

                <FormControl className={clsx(classes.formControl)}>
                    <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                        {t('ecommercechannel:Telephone')}
                    </InputLabel>
                    <div style={{ height: 7 }} />
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
                        onFocus={(e, c) => {
                            setDialCode(c.dialCode);
                            if (firstRenderPhone.current) {
                                firstRenderPhone.current = false;
                                e.target.blur();
                            }
                        }}
                        inputProps={{ autoFocus: true }}
                    />
                </FormControl>

                {gmapKey && enableMap ? (
                    <div className={classes.boxMap}>
                        <div>
                            <IcubeMapsAutocomplete
                                gmapKey={gmapKey}
                                formik={formik}
                                mapPosition={mapPosition}
                                dragMarkerDone={handleDragPosition}
                                required
                            />
                        </div>
                    </div>
                )
                    : (
                        <>
                            <div className={classes.grid}>
                                <FormControl className={clsx(classes.formControl)}>
                                    <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                        {t('ecommercechannel:Longitude')}
                                    </InputLabel>
                                    <TextField
                                        className={classes.fieldInput}
                                        variant="standard"
                                        name="longitude"
                                        value={formik.values.longitude}
                                        onChange={formik.handleChange}
                                        error={!!(formik.touched.longitude && formik.errors.longitude)}
                                        helperText={(formik.touched.longitude && formik.errors.longitude) || ''}
                                        InputProps={{
                                            className: classes.fieldInput,
                                        }}
                                    />
                                </FormControl>
                                <div />
                                <FormControl className={clsx(classes.formControl)}>
                                    <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                        {t('ecommercechannel:Latitude')}
                                    </InputLabel>
                                    <TextField
                                        className={classes.fieldInput}
                                        variant="standard"
                                        name="latitude"
                                        value={formik.values.latitude}
                                        onChange={formik.handleChange}
                                        error={!!(formik.touched.latitude && formik.errors.latitude)}
                                        helperText={(formik.touched.latitude && formik.errors.latitude) || ''}
                                        InputProps={{
                                            className: classes.fieldInput,
                                        }}
                                    />
                                </FormControl>
                            </div>
                        </>
                    )}
            </DialogContent>
            <div className={classes.formFieldButton}>
                <Button onClick={formik.handleSubmit} buttonType="primary-rounded">
                    {t('ecommercechannel:Submit')}
                </Button>
                <Button onClick={onClose} buttonType="link" style={{ color: '#BE1F93' }}>
                    {t('ecommercechannel:Cancel')}
                </Button>
            </div>
        </Dialog>
    );
};

export default LocationCreateContent;
