/* eslint-disable max-len */
import React, { useState, useEffect, useRef } from 'react';
import TextField from '@common_textfield';
import PhoneInput from '@common_phoneinput';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Autocomplete from '@common_autocomplete';
import IcubeMapsAutocomplete from '@common_googlemaps_autocomplete';
import companyGqlService from '@modules/company/services/graphql';
import locationGqlService from '@modules/location/services/graphql';
import clsx from 'clsx';
import useStyles from '@modules/location/pages/create/components/style';
import { optionsYesNo } from '@modules/location/helpers';
import IOSSwitch from '@common_iosswitch';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const LocationCreateContent = (props) => {
    const {
        openConfirmDialog,
        setOpenConfirmDialog,
        formik, customer, handleDragPosition, gmapKey, mapPosition, enableMap, shipperIdConfig,
        logistixConfig, lionParcelConfig, t, setDialCode,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const firstRenderPhone = useRef(true);
    const [getCompanyList, { data: dataComp, loading: loadingComp }] = companyGqlService.getCompanyList();
    const [getCountries, getCountriesRes] = locationGqlService.getCountries();
    const [getCountry, getCountryRes] = locationGqlService.getCountry();
    const [getCityKecByRegionCode, getCityKecByRegionCodeRes] = locationGqlService.getCityKecByRegionCode();

    const [getZoneList, getZoneListRes] = locationGqlService.getZoneList();
    const [zoneOptions, setZoneOptions] = React.useState([]);
    const [searchZone, setSearchZone] = React.useState('');

    const isCustomerVendor = customer?.customer_company_code !== null;
    const firstRender = useRef(true);

    const [optionsComp, setOptionsComp] = useState([]);
    const [searchComp, setSearchComp] = useState('');

    const dayLabel = (day) => {
        const capitalizeDay = day.substring(0, 1).toUpperCase() + day.substring(1);
        return capitalizeDay;
    };

    useEffect(() => {
        if (isCustomerVendor) {
            getCompanyList({
                variables: {
                    pageSize: 20,
                    currentPage: 1,
                },
            });
        }
    }, []);

    useEffect(() => {
        if (
            firstRender.current
            && isCustomerVendor
            && dataComp
            && dataComp.getCompanyList
            && dataComp.getCompanyList.items
        ) {
            const company = dataComp.getCompanyList.items.find((item) => item.company_id === Number(customer.customer_company_code));
            formik.setFieldValue('company', company ?? null);
            firstRender.current = false;
        }
    }, [dataComp]);

    useEffect(() => {
        const onChangeTimeOut = setTimeout(() => {
            const isExist = searchZone && zoneOptions.filter((elm) => elm?.zone?.toLowerCase().includes(searchZone?.toLowerCase()));
            if (searchZone && isExist.length === 0) {
                getZoneList({
                    variables: {
                        search: searchZone,
                        pageSize: 20,
                        currentPage: 1,
                    },
                });
            }
            return null;
        }, 500);

        return () => clearTimeout(onChangeTimeOut);
    }, [searchZone]);

    useEffect(() => {
        if (
            getZoneListRes
            && getZoneListRes.data
            && getZoneListRes.data.getZoneList
            && getZoneListRes.data.getZoneList.items
        ) {
            const zones = new Set(zoneOptions.map((d) => d.zone));
            setZoneOptions([
                ...zoneOptions,
                ...getZoneListRes.data.getZoneList.items.filter((d) => !zones.has(d.zone)),
            ]);
        }
    }, [getZoneListRes.data]);

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
        <>
            <Dialog
                open={openConfirmDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {t('location:Submit')}
                    <IconButton className={classes.closeButton} onClick={() => setOpenConfirmDialog(false)}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {t('location:Do_you_want_to_create_source_of_all_products_in_this_location')}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={async () => {
                            await formik.setFieldValue('is_create_source_all_products', true);
                            setTimeout(() => { setOpenConfirmDialog(false); formik.handleSubmit(); }, 100);
                        }}
                        buttonType="primary"
                        color="primary"
                    >
                        {t('location:Create_Location_and_Source')}
                    </Button>
                    <Button
                        onClick={async () => {
                            await formik.setFieldValue('is_create_source_all_products', false);
                            setTimeout(() => { setOpenConfirmDialog(false); formik.handleSubmit(); }, 100);
                        }}
                        buttonType="outlined"
                        color="primary"
                    >
                        {t('location:Create_Location_Only')}
                    </Button>
                </DialogActions>
            </Dialog>
            <Button className={classes.btnBack} onClick={() => router.push('/oms/location')} variant="contained" style={{ marginRight: 16 }}>
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
            <h2 className={classes.titleTop}>{t('location:Create_Location')}</h2>
            <Paper className={classes.container}>
                <div className={classes.contentWithoutBorder}>
                    <h5 className={classes.titleSmall}>{t('location:Location_Information')}</h5>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('location:Active')}</span>
                        </div>
                        <IOSSwitch
                            name="status"
                            value={formik.values.status}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('location:Company')}</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            mode={isCustomerVendor && optionsComp.length > 0 ? 'default' : 'lazy'}
                            value={formik.values.company}
                            onChange={(e) => formik.setFieldValue('company', e)}
                            loading={loadingComp}
                            options={optionsComp}
                            error={!!(formik.touched.company && formik.errors.company)}
                            helperText={(formik.touched.company && formik.errors.company) || ''}
                            getOptions={getCompanyList}
                            primaryKey="company_id"
                            labelKey="company_name"
                            disabled={isCustomerVendor}
                            onInputChange={(e) => setSearchComp(e && e.target && e.target.value)}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('location:Location_Code')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="loc_code"
                            value={formik.values.loc_code}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.loc_code && formik.errors.loc_code)}
                            helperText={(formik.touched.loc_code && formik.errors.loc_code) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('location:Location_Name')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="loc_name"
                            value={formik.values.loc_name}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.loc_name && formik.errors.loc_name)}
                            helperText={(formik.touched.loc_name && formik.errors.loc_name) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('location:Address')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="street"
                            value={formik.values.street}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.street && formik.errors.street)}
                            helperText={(formik.touched.street && formik.errors.street) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('location:Country')}</span>
                        </div>
                        <Autocomplete
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
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('location:Province')}</span>
                        </div>
                        <Autocomplete
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
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('location:City')}</span>
                        </div>
                        <Autocomplete
                            disabled={!(formik.values.region && formik.values.region.id)}
                            className={classes.autocompleteRoot}
                            mode="lazy"
                            value={formik.values.city}
                            onChange={(e) => formik.setFieldValue('city', e)}
                            loading={getCityKecByRegionCodeRes.loading}
                            options={
                                getCityKecByRegionCodeRes && getCityKecByRegionCodeRes.data && getCityKecByRegionCodeRes.data.getCityKecByRegionCode
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
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('location:Telephone')}</span>
                        </div>
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
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('location:Zip_Code')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="postcode"
                            value={formik.values.postcode}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.postcode && formik.errors.postcode)}
                            helperText={(formik.touched.postcode && formik.errors.postcode) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
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
                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={clsx(classes.label, classes.labelRequired)}>{t('location:Longitude')}</span>
                                    </div>
                                    <TextField
                                        className={classes.fieldRoot}
                                        variant="outlined"
                                        name="longitude"
                                        value={formik.values.longitude}
                                        onChange={formik.handleChange}
                                        error={!!(formik.touched.longitude && formik.errors.longitude)}
                                        helperText={(formik.touched.longitude && formik.errors.longitude) || ''}
                                        InputProps={{
                                            className: classes.fieldInput,
                                        }}
                                    />
                                </div>
                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={clsx(classes.label, classes.labelRequired)}>{t('location:Latitude')}</span>
                                    </div>
                                    <TextField
                                        className={classes.fieldRoot}
                                        variant="outlined"
                                        name="latitude"
                                        value={formik.values.latitude}
                                        onChange={formik.handleChange}
                                        error={!!(formik.touched.latitude && formik.errors.latitude)}
                                        helperText={(formik.touched.latitude && formik.errors.latitude) || ''}
                                        InputProps={{
                                            className: classes.fieldInput,
                                        }}
                                    />
                                </div>
                            </>
                        )}
                </div>
            </Paper>
            {!isCustomerVendor && (
                <Paper className={classes.container}>
                    <div className={classes.contentWithoutBorder}>
                        <h5 className={classes.titleSmall}>{t('location:Additional_Settings')}</h5>
                        <div className={classes.formField}>
                            <div className={classes.divLabel}>
                                <span className={classes.label}>{t('location:Zone')}</span>
                            </div>
                            <Autocomplete
                                mode="lazy"
                                className={classes.autocompleteRoot}
                                value={formik.values.zone}
                                onChange={(e) => formik.setFieldValue('zone', e)}
                                getOptions={getZoneList}
                                loading={getZoneListRes.loading}
                                options={zoneOptions}
                                error={!!(formik.touched.zone && formik.errors.zone)}
                                helperText={(formik.touched.zone && formik.errors.zone) || ''}
                                primaryKey="id"
                                labelKey="zone"
                                disabled={isCustomerVendor}
                                onInputChange={(e) => setSearchZone(e && e.target && e.target.value)}
                            />
                            <div className={classes.tooltip}>
                                <Tooltip
                                    title={t('location:Region_of_the_location')}
                                    placement="top"
                                    arrow
                                    classes={{ tooltip: classes.tooltipWidth }}
                                >
                                    <IconButton aria-label="help">
                                        <HelpIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>
                        <div className={classes.formField}>
                            <div className={classes.divLabel}>
                                <span className={classes.label}>{t('location:Is_Warehouse')}</span>
                            </div>
                            <Autocomplete
                                className={classes.autocompleteRoot}
                                value={formik.values.warehouse}
                                onChange={(e) => formik.setFieldValue('warehouse', e)}
                                options={optionsYesNo}
                                error={!!(formik.touched.warehouse && formik.errors.warehouse)}
                                helperText={(formik.touched.warehouse && formik.errors.warehouse) || ''}
                            />
                            <div className={classes.tooltip}>
                                <Tooltip
                                    title={t('location:Choose_Yes_if_the_location_is_a_warehouse')}
                                    placement="top"
                                    arrow
                                    classes={{ tooltip: classes.tooltipWidth }}
                                >
                                    <IconButton aria-label="help">
                                        <HelpIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>
                        <div className={classes.formField}>
                            <div className={classes.divLabel}>
                                <span className={classes.label}>{t('location:Use_in_Frontend')}</span>
                            </div>
                            <Autocomplete
                                className={classes.autocompleteRoot}
                                value={formik.values.useFrontend}
                                onChange={(e) => formik.setFieldValue('useFrontend', e)}
                                options={optionsYesNo}
                                error={!!(formik.touched.useFrontend && formik.errors.useFrontend)}
                                helperText={(formik.touched.useFrontend && formik.errors.useFrontend) || ''}
                            />
                            <div className={classes.tooltip}>
                                <Tooltip
                                    title={t('location:Choose_Yes_to_use_this_location_in_the_frontend_website')}
                                    placement="top"
                                    arrow
                                    classes={{ tooltip: classes.tooltipWidth }}
                                >
                                    <IconButton aria-label="help">
                                        <HelpIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>
                        <div className={classes.formField}>
                            <div className={classes.divLabel}>
                                <span className={classes.label}>{t('location:Is_Virtual_Location')}</span>
                            </div>
                            <Autocomplete
                                className={classes.autocompleteRoot}
                                value={formik.values.virtualLocation}
                                onChange={(e) => formik.setFieldValue('virtualLocation', e)}
                                options={optionsYesNo}
                                error={!!(formik.touched.virtualLocation && formik.errors.virtualLocation)}
                                helperText={(formik.touched.virtualLocation && formik.errors.virtualLocation) || ''}
                            />
                            <div className={classes.tooltip}>
                                <Tooltip
                                    title={t('location:Choose_Yes_if_this_location_is_a_virtual_location_and_the_selected_options_in_Is_Sirclo_Warehouse_and_Is_Manage_Stock_should_be_No')}
                                    placement="top"
                                    arrow
                                    classes={{ tooltip: classes.tooltipWidth }}
                                >
                                    <IconButton aria-label="help">
                                        <HelpIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>
                        <div className={classes.formField}>
                            <div className={classes.divLabel}>
                                <span className={classes.label}>{t('location:Priority')}</span>
                            </div>
                            <TextField
                                className={classes.fieldRoot}
                                variant="outlined"
                                name="priority"
                                value={formik.values.priority}
                                onChange={formik.handleChange}
                                error={!!(formik.touched.priority && formik.errors.priority)}
                                helperText={(formik.touched.priority && formik.errors.priority) || ''}
                                InputProps={{
                                    className: classes.fieldInput,
                                }}
                            />
                            <div className={classes.tooltip}>
                                <Tooltip
                                    title={t('location:Priority_level_used_for_priority_location_in_order_shipping')}
                                    placement="top"
                                    arrow
                                    classes={{ tooltip: classes.tooltipWidth }}
                                >
                                    <IconButton aria-label="help">
                                        <HelpIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>
                        <div className={classes.formField}>
                            <div className={classes.divLabel}>
                                <span className={classes.label}>{t('location:Qty_Buffer')}</span>
                            </div>
                            <TextField
                                className={classes.fieldRoot}
                                variant="outlined"
                                name="qty_buffer"
                                value={formik.values.qty_buffer}
                                onChange={formik.handleChange}
                                error={!!(formik.touched.qty_buffer && formik.errors.qty_buffer)}
                                helperText={(formik.touched.qty_buffer && formik.errors.qty_buffer) || ''}
                                InputProps={{
                                    className: classes.fieldInput,
                                }}
                            />
                            <div className={classes.tooltip}>
                                <Tooltip
                                    title={t('location:Quantity_Stock_that_will_not_be_sold_for_this_location_The_default_qty_is_0')}
                                    placement="top"
                                    arrow
                                    classes={{ tooltip: classes.tooltipWidth }}
                                >
                                    <IconButton aria-label="help">
                                        <HelpIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>
                        <div className={classes.formField}>
                            <div className={classes.divLabel}>
                                <span className={classes.label}>{t('location:Is_Manage_Stock')}</span>
                            </div>
                            <Autocomplete
                                className={classes.autocompleteRoot}
                                value={formik.values.is_manage_stock}
                                onChange={(e) => formik.setFieldValue('is_manage_stock', e)}
                                options={optionsYesNo}
                                error={!!(formik.touched.is_manage_stock && formik.errors.is_manage_stock)}
                                helperText={(formik.touched.is_manage_stock && formik.errors.is_manage_stock) || ''}
                            />
                            <div className={classes.tooltip}>
                                <Tooltip
                                    title={t('location:Choose_Yes_if_this_location_has_access_to_manage_stock_The_default_option_is_No')}
                                    placement="top"
                                    arrow
                                    classes={{ tooltip: classes.tooltipWidth }}
                                >
                                    <IconButton aria-label="help">
                                        <HelpIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>
                        <div className={classes.formField}>
                            <div className={classes.divLabel}>
                                <span className={classes.label}>{t('location:Is_Shipment_Auto_Complete')}</span>
                            </div>
                            <Autocomplete
                                className={classes.autocompleteRoot}
                                value={formik.values.is_shipment_auto_complete}
                                onChange={(e) => formik.setFieldValue('is_shipment_auto_complete', e)}
                                options={optionsYesNo}
                                error={!!(formik.touched.is_shipment_auto_complete && formik.errors.is_shipment_auto_complete)}
                                helperText={(formik.touched.is_shipment_auto_complete && formik.errors.is_shipment_auto_complete) || ''}
                            />
                            <div className={classes.tooltip}>
                                <Tooltip
                                    title={t('location:Choose_Yes_to_enable_autocomplete_mode_in_order_shipping_The_default_option_is_No')}
                                    placement="top"
                                    arrow
                                    classes={{ tooltip: classes.tooltipWidth }}
                                >
                                    <IconButton aria-label="help">
                                        <HelpIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>
                        {
                            shipperIdConfig === '1' && (
                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={classes.label}>{t('location:Shipper_ID')}</span>
                                    </div>
                                    <TextField
                                        className={classes.fieldRoot}
                                        variant="outlined"
                                        name="shipper_id"
                                        value={formik.values.shipper_id}
                                        onChange={formik.handleChange}
                                        error={!!(formik.touched.shipper_id && formik.errors.shipper_id)}
                                        helperText={(formik.touched.shipper_id && formik.errors.shipper_id) || ''}
                                        InputProps={{
                                            className: classes.fieldInput,
                                        }}
                                    />
                                    <div className={classes.tooltip}>
                                        <Tooltip
                                            title={t('location:Shipper_ID_for_this_location_if_available')}
                                            placement="top"
                                            arrow
                                            classes={{ tooltip: classes.tooltipWidth }}
                                        >
                                            <IconButton aria-label="help">
                                                <HelpIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                </div>
                            )
                        }
                        {
                            logistixConfig === '1' && (
                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={classes.label}>{t('location:Logistix_Credentials_Flag')}</span>
                                    </div>
                                    <TextField
                                        className={classes.fieldRoot}
                                        variant="outlined"
                                        name="logistix"
                                        value={formik.values.logistix}
                                        onChange={formik.handleChange}
                                        error={!!(formik.touched.logistix && formik.errors.logistix)}
                                        helperText={(formik.touched.logistix && formik.errors.logistix) || ''}
                                        InputProps={{
                                            className: classes.fieldInput,
                                        }}
                                    />
                                    <div className={classes.tooltip}>
                                        <Tooltip
                                            title={t('location:Credential_for_Logistix_Wahana_service_if_available')}
                                            placement="top"
                                            arrow
                                            classes={{ tooltip: classes.tooltipWidth }}
                                        >
                                            <IconButton aria-label="help">
                                                <HelpIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                </div>
                            )
                        }
                        {
                            lionParcelConfig === '1' && (
                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={classes.label}>{t('location:Lion_Parcel_Client_Code')}</span>
                                    </div>
                                    <TextField
                                        className={classes.fieldRoot}
                                        variant="outlined"
                                        name="lionCode"
                                        value={formik.values.lionCode}
                                        onChange={formik.handleChange}
                                        error={!!(formik.touched.lionCode && formik.errors.lionCode)}
                                        helperText={(formik.touched.lionCode && formik.errors.lionCode) || ''}
                                        InputProps={{
                                            className: classes.fieldInput,
                                        }}
                                    />
                                    <div className={classes.tooltip}>
                                        <Tooltip
                                            title={t('location:Client_code_for_Lion_Parcel_service_if_available')}
                                            placement="top"
                                            arrow
                                            classes={{ tooltip: classes.tooltipWidth }}
                                        >
                                            <IconButton aria-label="help">
                                                <HelpIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </Paper>
            )}
            <Paper className={classes.container}>
                <div className={classes.contentWithoutBorder}>
                    <h5 className={classes.titleSmall}>{t('location:Operational_Time_for_Channel_Frontend')}</h5>
                    {formik.values.loc_operational_time?.map((opr, i) => (
                        <div className={classes.formFieldDay} key={i}>
                            <FormControlLabel
                                control={(
                                    <Checkbox
                                        name={`loc_operational_time[${i}].is_active`}
                                        checked={opr.is_active}
                                        onChange={formik.handleChange}
                                    />
                                )}
                                className={classes.controlLabel}
                                classes={{ root: classes.rootLabel }}
                                label={dayLabel(opr.day)}
                            />
                            <div>
                                <TextField
                                    type="time"
                                    variant="outlined"
                                    className={classes.fieldRootDate}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    InputProps={{
                                        className: classes.fieldInputDate,
                                    }}
                                    style={{ marginRight: 10 }}
                                    name={`loc_operational_time[${i}].open_at`}
                                    value={formik.values.loc_operational_time[i].open_at}
                                    onChange={formik.handleChange}
                                    error={!!(formik.touched.loc_operational_time?.length && formik.touched.loc_operational_time[i]?.open_at
                                        && formik.errors.loc_operational_time?.length && formik.errors.loc_operational_time[i]?.open_at)}
                                    helperText={(formik.touched.loc_operational_time?.length && formik.touched.loc_operational_time[i]?.open_at
                                        && formik.errors.loc_operational_time?.length && formik.errors.loc_operational_time[i]?.open_at) || ''}
                                />
                                <TextField
                                    type="time"
                                    variant="outlined"
                                    className={classes.fieldRootDate}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    InputProps={{
                                        className: classes.fieldInputDate,
                                    }}
                                    name={`loc_operational_time[${i}].close_at`}
                                    value={formik.values.loc_operational_time[i].close_at}
                                    onChange={formik.handleChange}
                                    error={!!(formik.touched.loc_operational_time?.length && formik.touched.loc_operational_time[i]?.close_at
                                        && formik.errors.loc_operational_time?.length && formik.errors.loc_operational_time[i]?.close_at)}
                                    helperText={(formik.touched.loc_operational_time?.length && formik.touched.loc_operational_time[i]?.close_at
                                        && formik.errors.loc_operational_time?.length && formik.errors.loc_operational_time[i]?.close_at) || ''}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </Paper>
            <div className={classes.formFieldButton}>
                <Button className={classes.btn} onClick={() => setOpenConfirmDialog(true)} variant="contained">
                    {t('location:Submit')}
                </Button>
            </div>
        </>
    );
};

export default LocationCreateContent;
