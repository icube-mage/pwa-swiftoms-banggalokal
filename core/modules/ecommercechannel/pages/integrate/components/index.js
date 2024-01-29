/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable object-curly-newline */
import React from 'react';
import useStyles from '@modules/ecommercechannel/pages/integrate/components/style';
import clsx from 'clsx';
import helperCookies from '@helper_cookies';
import { useRouter } from 'next/router';

import Autocomplete from '@common_autocomplete';
import TextField from '@common_textfield';
import Button from '@common_button';

import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import CheckIcon from '@material-ui/icons/Check';
import ErrorIcon from '@material-ui/icons/Error';
import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';

import Header from '@modules/ecommercechannel/pages/integrate/components/Header';
import StoreModal from '@modules/ecommercechannel/pages/integrate/components/storeModal';
import LocationModal from '@modules/ecommercechannel/pages/integrate/components/locationModal';

import gqlStore from '@modules/store/services/graphql';
import gqlLocation from '@modules/location/services/graphql';
import gqlService from '@modules/ecommercechannel/services/graphql';

const ChannelListContent = (props) => {
    const {
        fieldToMaps,
        formik,
        cookiesData,
        setCookiesData,
        type = false,
        capabilitiesData,
        onChangeStore = () => { },
        data,
        t,
        enableMap,
        gmapKey,
        isMultiseller,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    const showField = type ? !!formik.values.store_id : true;

    const [getStoreList, getStoreListRes] = gqlStore.getStoreList();
    const [getLocationList, getLocationListRes] = gqlLocation.getLocationList();
    const [getMarketplaceDefaultShippingMethods, getMarketplaceDefaultShippingMethodsRes] = gqlService.getMarketplaceDefaultShippingMethods();

    const [searchStore, setSearchStore] = React.useState('');
    const [storeOption, setStoreOption] = React.useState([]);

    const [searchLocation, setSearchLocation] = React.useState('');
    const [locationOption, setLocationOption] = React.useState([]);

    const [openModalStore, setOpenModalStore] = React.useState(false);
    const [openModalLocation, setOpenModalLocation] = React.useState(false);

    const nextStep = cookiesData.step + 1;
    const onNext = () => {
        if (nextStep !== cookiesData.data.length) {
            if (type) {
                setCookiesData((prev) => ({ ...prev, step: nextStep }));
                helperCookies.set('marketplace_step', nextStep);
                router.push('/integration/ecommercechannel/add/integrate/marketplace');
            } else {
                setCookiesData((prev) => ({ ...prev, step: nextStep }));
                helperCookies.set('webstore_step', nextStep);
            }
        }
    };

    React.useEffect(() => {
        if (
            getLocationListRes
            && getLocationListRes.data
            && getLocationListRes.data.getLocationList
            && getLocationListRes.data.getLocationList.items
        ) {
            const ids = new Set(locationOption.map((d) => d.loc_code));
            setLocationOption([...locationOption, ...getLocationListRes.data.getLocationList.items.filter((d) => !ids.has(d.loc_code))]);
        }
    }, [getLocationListRes.data]);

    React.useEffect(() => {
        const onChangeTimeOut = setTimeout(() => {
            const isExist = searchLocation && locationOption
                .filter((elm) => elm?.loc_name?.toLowerCase().includes(searchLocation?.toLowerCase()));
            if (searchLocation && isExist.length === 0) {
                getLocationList({
                    variables: {
                        search: searchLocation,
                        pageSize: 20,
                        currentPage: 1,
                    },
                });
            }

            return null;
        }, 500);

        return () => clearTimeout(onChangeTimeOut);
    }, [searchLocation]);

    React.useEffect(() => {
        if (
            getStoreListRes
            && getStoreListRes.data
            && getStoreListRes.data.getStoreList
            && getStoreListRes.data.getStoreList.items
        ) {
            const ids = new Set(storeOption.map((d) => d.id));
            setStoreOption([...storeOption, ...getStoreListRes.data.getStoreList.items.filter((d) => !ids.has(d.id))]);
        }
    }, [getStoreListRes.data]);

    React.useEffect(() => {
        const onChangeTimeOut = setTimeout(() => {
            const isExist = searchStore && storeOption
                .filter((elm) => elm?.loc_name?.toLowerCase().includes(searchStore?.toLowerCase()));
            if (searchStore && isExist.length === 0) {
                getStoreList({
                    variables: {
                        search: searchStore,
                        pageSize: 20,
                        currentPage: 1,
                    },
                });
            }

            return null;
        }, 500);

        return () => clearTimeout(onChangeTimeOut);
    }, [searchStore]);

    return (
        <>
            <Header t={t} />
            <Paper className={classes.container}>
                <div className={classes.topSection}>
                    <div
                        className={clsx(classes.topIcon, nextStep === cookiesData.data.length && 'disabled')}
                    />
                    <div className={classes.topMid}>
                        <div className={classes.centerDiv}>
                            <span className={classes.mpTitle}>
                                {capabilitiesData.name}
                            </span>
                        </div>
                        <div className={classes.centerDiv}>
                            <span className={classes.mpSelected}>
                                {`${cookiesData.step + 1}/${cookiesData.data.length} ${t('ecommercechannel:Selected')}`}
                            </span>
                        </div>
                    </div>
                    <div onClick={onNext} className={clsx(classes.topIcon, nextStep === cookiesData.data.length && 'disabled')}>
                        <img src="/assets/img/arrowRight.svg" alt="" />
                    </div>
                </div>
                {type && showField && data && data.marketplace_code === 'JDID'
                    && data.credentials?.url_callback
                    ? (
                        <div className={classes.warning}>
                            <ErrorIcon />
                            <div style={{ paddingLeft: 5 }}>
                                {t('ecommercechannel:Make_sure_you_have_registered_the_following_url_callbacks')}
                                {' '}
                                <span style={{ fontWeight: 550 }}>{data.credentials.url_callback}</span>
                                {' '}
                                {t('ecommercechannel:on_your_JDid_console_You_can_read_more_details')}
                                {' '}
                                <a href="https://help.sirclo.com/integrasi-dengan-jd-id-1" target="_blank" rel="noreferrer">
                                    {t('ecommercechannel:here')}
                                </a>
                                .
                            </div>
                        </div>
                    )
                    : null}
                {type && showField && data && data.marketplace_code === 'ZLRA'
                    && data.credentials?.url_callback
                    ? (
                        <div className={classes.warning}>
                            <ErrorIcon />
                            <div style={{ paddingLeft: 5 }}>
                                {t('ecommercechannel:Make_sure_you_have_registered_the_following_url_callbacks')}
                                {' '}
                                <b>{data.credentials.url_callback}</b>
                                {' '}
                                {t('ecommercechannel:on_your_Zalora_Seller_Center_You_can_read_more_details')}
                                {' '}
                                <a
                                    href="https://docs.google.com/document/d/1uQg9D1Fkxp35ZOWcgtjtoiEVNJUKKqYzEtlZcOpJhXY/edit"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {t('ecommercechannel:here')}
                                </a>
                                .
                            </div>
                        </div>
                    )
                    : null}
                <div className={classes.bottomSection}>
                    <div className={classes.form}>
                        {type
                            && (
                                <FormControl className={clsx(classes.formControl)}>
                                    <InputLabel shrink>
                                        {t('ecommercechannel:SELECT_STORE')}
                                    </InputLabel>
                                    <Autocomplete
                                        name="store_id"
                                        variant="standard"
                                        mode={storeOption.length > 0 ? 'default' : 'lazy'}
                                        className={classes.autocompleteRoot}
                                        value={formik.values.store_id}
                                        onChange={(e) => {
                                            formik.setFieldValue('store_id', e);
                                            onChangeStore(e);
                                        }}
                                        loading={getStoreListRes.loading}
                                        options={storeOption}
                                        getOptions={getStoreList}
                                        getOptionsVariables={{
                                            variables: {
                                                search: searchStore,
                                                pageSize: 20,
                                                currentPage: 1,
                                            },
                                        }}
                                        primaryKey="id"
                                        labelKey="name"
                                        onInputChange={(e) => setSearchStore(e && e.target && e.target.value)}
                                        error={!!(formik.errors.store_id)}
                                        helperText={(formik.errors.store_id) || ''}
                                    />
                                    <FormHelperText onClick={() => setOpenModalStore(true)} className={classes.helperCreate}>
                                        {t('ecommercechannel:Create_New_Store')}
                                    </FormHelperText>
                                </FormControl>
                            )}
                        <div className={classes.divider} />
                        {(!isMultiseller || typeof cookiesData.data[cookiesData.step] === 'string')
                            && (
                                <FormControl className={clsx(classes.formControl)}>
                                    <InputLabel shrink>
                                        {t('ecommercechannel:SELECT_LOCATION')}
                                    </InputLabel>
                                    <Autocomplete
                                        multiple
                                        name="loc_id"
                                        variant="standard"
                                        mode={locationOption.length > 0 ? 'default' : 'lazy'}
                                        className={classes.autocompleteRoot}
                                        value={typeof formik.values.loc_id === 'object' ? formik.values.loc_id
                                            : [formik.values.loc_id]}
                                        onChange={(e) => formik.setFieldValue('loc_id', e)}
                                        loading={getLocationListRes.loading}
                                        options={locationOption}
                                        getOptions={getLocationList}
                                        getOptionsVariables={{
                                            variables: {
                                                search: searchLocation,
                                                pageSize: 20,
                                                currentPage: 1,
                                            },
                                        }}
                                        primaryKey="loc_code"
                                        labelKey="loc_name"
                                        onInputChange={(e) => setSearchLocation(e && e.target && e.target.value)}
                                        error={!!(formik.touched.loc_id && formik.errors.loc_id)}
                                        helperText={(formik.touched.loc_id && formik.errors.loc_id) || ''}
                                    />
                                    <FormHelperText onClick={() => setOpenModalLocation(true)} className={classes.helperCreate}>
                                        {t('ecommercechannel:Create_New_Location')}
                                    </FormHelperText>
                                </FormControl>
                            )}
                        {showField && fieldToMaps?.map((field) => (
                            field.name === 'default_shipping_method'
                                ? (
                                    <>
                                        <div className={classes.divider} />
                                        <div className={classes.formField}>
                                            <FormControl className={clsx(classes.formControl)}>
                                                <InputLabel shrink>
                                                    {field.description}
                                                    {field.required && <span className="required">*</span>}
                                                </InputLabel>
                                                <Autocomplete
                                                    name={field.name}
                                                    variant="standard"
                                                    mode="lazy"
                                                    className={classes.autocompleteRoot}
                                                    value={typeof formik.values.default_shipping_method === 'object'
                                                        ? formik.values.default_shipping_method
                                                        : [formik.values.default_shipping_method]}
                                                    onChange={(e) => formik.setFieldValue('default_shipping_method', e)}
                                                    loading={getMarketplaceDefaultShippingMethodsRes.loading}
                                                    options={getMarketplaceDefaultShippingMethodsRes.data?.getMarketplaceDefaultShippingMethods || []}
                                                    getOptions={getMarketplaceDefaultShippingMethods}
                                                    getOptionsVariables={{
                                                        variables: {
                                                            marketplace_code: cookiesData.data[cookiesData.step],
                                                        },
                                                    }}
                                                    primaryKey="value"
                                                    labelKey="label"
                                                    error={!!(formik.touched.default_shipping_method
                                                        && formik.errors.default_shipping_method)}
                                                    helperText={(formik.touched.default_shipping_method
                                                        && formik.errors.default_shipping_method) || ''}
                                                />
                                            </FormControl>
                                            {field.tooltip
                                                ? (
                                                    <div className={classes.tooltip}>
                                                        <Tooltip
                                                            title={<span className={classes.tooltipText}>{field.tooltip}</span>}
                                                            placement="top"
                                                            arrow
                                                            classes={{ tooltip: classes.tooltipWidth }}
                                                        >
                                                            <IconButton aria-label="help">
                                                                <HelpIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </div>
                                                )
                                                : null}
                                        </div>
                                    </>
                                )
                                : (
                                    <>
                                        <div className={classes.divider} />
                                        <div className={classes.formField}>
                                            <FormControl className={clsx(classes.formControl)}>
                                                <InputLabel shrink>
                                                    {field.description}
                                                    {field.required && <span className="required"> *</span>}
                                                </InputLabel>
                                                <TextField
                                                    type={field.name === 'cutoff_date' ? 'date' : 'string'}
                                                    multiple
                                                    name={field.name}
                                                    value={formik.values[field.name]}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    inputProps={{
                                                        autocomplete: 'off',
                                                    }}
                                                    className={classes.fieldInput}
                                                    variant="standard"
                                                    autoComplete="off"
                                                    error={field.name === 'cutoff_date' ? !!(formik.errors[field.name])
                                                        : !!(formik.touched[field.name] && formik.errors[field.name])}
                                                    helperText={(field.name === 'cutoff_date' ? (formik.errors[field.name])
                                                        : (formik.touched[field.name] && formik.errors[field.name])) || ''}
                                                />
                                            </FormControl>
                                            {field.tooltip
                                                ? (
                                                    <div className={classes.tooltip}>
                                                        <Tooltip
                                                            title={<span className={classes.tooltipText}>{field.tooltip}</span>}
                                                            placement="top"
                                                            arrow
                                                            classes={{ tooltip: classes.tooltipWidth }}
                                                        >
                                                            <IconButton aria-label="help">
                                                                <HelpIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </div>
                                                )
                                                : null}
                                        </div>
                                    </>
                                )
                        ))}
                        <div className={classes.divider} />
                        <div className={classes.centerDiv} style={{ marginTop: 30 }}>
                            <Button
                                className={classes.buttonStart}
                                buttonType="primary-rounded"
                                onClick={formik.handleSubmit}
                            >
                                {t('ecommercechannel:Start_Integration')}
                            </Button>
                        </div>
                    </div>
                    <div />
                    <div className={classes.capabilty}>
                        <div className={classes.capabilityImg}>
                            <img src="/assets/img/icon-connect.svg" alt="" className="connect" />
                            <img src={capabilitiesData.image_url} alt="" className={classes.icon} />
                        </div>
                        <div className={classes.featuresContainer}>
                            {capabilitiesData.capabilities?.map((feature) => (
                                <div style={{ display: 'flex', justifyContent: 'start' }}>
                                    <CheckIcon className={classes.check} />
                                    <p style={{ margin: 0, marginBottom: 5 }}>{feature}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Paper>
            <StoreModal
                open={openModalStore}
                handleClose={() => setOpenModalStore(false)}
                handleOpen={() => setOpenModalStore(true)}
                t={t}
            />
            <LocationModal
                open={openModalLocation}
                handleClose={() => setOpenModalLocation(false)}
                handleOpen={() => setOpenModalLocation(true)}
                t={t}
                enableMap={enableMap}
                gmapKey={gmapKey}
            />
        </>
    );
};

export default ChannelListContent;
