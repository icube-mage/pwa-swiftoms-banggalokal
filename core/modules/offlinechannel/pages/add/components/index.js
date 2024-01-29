/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable object-curly-newline */
import React from 'react';
import useStyles from '@modules/offlinechannel/pages/add/components/style';
import clsx from 'clsx';

import Autocomplete from '@common_autocomplete';
import TextField from '@common_textfield';
import Button from '@common_button';

import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import CheckIcon from '@material-ui/icons/Check';

import Header from '@modules/offlinechannel/pages/add/components/Header';
import LocationModal from '@modules/offlinechannel/pages/add/components/locationModal';

import gqlLocation from '@modules/location/services/graphql';

const ChannelListContent = (props) => {
    const { formik, capabilitiesData, t, enableMap, gmapKey } = props;
    const classes = useStyles();

    const [getLocationList, getLocationListRes] = gqlLocation.getLocationList();

    const [searchLocation, setSearchLocation] = React.useState('');
    const [locationOption, setLocationOption] = React.useState([]);

    const [openModalLocation, setOpenModalLocation] = React.useState(false);

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

    return (
        <>
            <Header t={t} />
            <Paper className={classes.container}>
                <div className={classes.topSection}>
                    <div className={classes.centerDiv}>
                        <span className={classes.mpTitle}>
                            {capabilitiesData.name}
                        </span>
                    </div>
                </div>
                <div className={classes.bottomSection}>
                    <div className={classes.form}>
                        <div className={classes.divider} />
                        <FormControl className={clsx(classes.formControl)}>
                            <InputLabel shrink>
                                {t('offlinechannel:SELECT_LOCATION')}
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
                                {t('offlinechannel:Create_New_Location')}
                            </FormHelperText>
                        </FormControl>
                        <div className={classes.divider} />
                        <FormControl className={clsx(classes.formControl)}>
                            <InputLabel shrink>
                                {t('offlinechannel:Channel_Code')}
                            </InputLabel>
                            <TextField
                                multiple
                                name="channel_code"
                                value={formik.values.channel_code}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                inputProps={{
                                    autocomplete: 'off',
                                }}
                                className={classes.fieldInput}
                                variant="standard"
                                autoComplete="off"
                                error={!!(formik.touched.channel_code && formik.errors.channel_code)}
                                helperText={(formik.touched.channel_code && formik.errors.channel_code) || ''}
                            />
                        </FormControl>
                        <div className={classes.divider} />
                        <FormControl className={clsx(classes.formControl)}>
                            <InputLabel shrink>
                                {t('offlinechannel:Channel_Name')}
                            </InputLabel>
                            <TextField
                                multiple
                                name="channel_name"
                                value={formik.values.channel_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                inputProps={{
                                    autocomplete: 'off',
                                }}
                                className={classes.fieldInput}
                                variant="standard"
                                autoComplete="off"
                                error={!!(formik.touched.channel_name && formik.errors.channel_name)}
                                helperText={(formik.touched.channel_name && formik.errors.channel_name) || ''}
                            />
                        </FormControl>
                        <div className={classes.divider} />
                        <div className={classes.centerDiv} style={{ marginTop: 30 }}>
                            <Button
                                className={classes.buttonStart}
                                buttonType="primary-rounded"
                                onClick={formik.handleSubmit}
                            >
                                {t('offlinechannel:Start_Integration')}
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
                            {capabilitiesData?.capabilities?.map((feature) => (
                                <div style={{ display: 'flex', justifyContent: 'start' }}>
                                    <CheckIcon className={classes.check} />
                                    <p style={{ margin: 0, marginBottom: 5 }}>{feature}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Paper>
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
