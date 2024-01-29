/* eslint-disable no-unused-vars */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Autocomplete from '@common_autocomplete';
import priorityLocationGqlService from '@modules/prioritylocation/services/graphql';
import useStyles from '@modules/prioritylocation/pages/edit/components/style';

const PriorityLocationEditContent = (props) => {
    const {
        formik,
        t,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const [getChannelList, getChannelListRes] = priorityLocationGqlService.getChannelList();
    const [getCityList, getCityListRes] = priorityLocationGqlService.getCityList();
    const [getLocationList, getLocationListRes] = priorityLocationGqlService.getLocationList();
    const [searchCity, setSearchCity] = React.useState('');
    const [cityOption, setCityOption] = React.useState([]);
    const [searchLocation, setSearchLocation] = React.useState('');
    const [locationOption, setLocationOption] = React.useState([]);

    React.useEffect(() => {
        const onChangeTimeOut = setTimeout(() => {
            const isExist = searchCity && cityOption.filter((elm) => elm?.id?.toLowerCase().includes(searchCity?.toLowerCase()));
            if (searchCity && isExist.length === 0) {
                getCityList({
                    variables: {
                        search: searchCity,
                        pageSize: 35,
                        currentPage: 1,
                    },
                });
            }
            return null;
        }, 500);

        return () => clearTimeout(onChangeTimeOut);
    }, [searchCity]);

    React.useEffect(() => {
        if (
            getCityListRes
            && getCityListRes.data
            && getCityListRes.data.getCityList
            && getCityListRes.data.getCityList.items
        ) {
            setCityOption([...cityOption, ...getCityListRes.data.getCityList.items]);
        }
    }, [getCityListRes.data]);

    React.useEffect(() => {
        const onChangeTimeOut = setTimeout(() => {
            const isExist = searchLocation && locationOption.filter((elm) => elm?.loc_name?.toLowerCase().includes(searchLocation?.toLowerCase()));
            if (searchLocation && isExist.length === 0) {
                getLocationList({
                    variables: {
                        search: searchLocation,
                        pageSize: 35,
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
            getLocationListRes
            && getLocationListRes.data
            && getLocationListRes.data.getLocationList
            && getLocationListRes.data.getLocationList.items
        ) {
            setLocationOption([...locationOption, ...getLocationListRes.data.getLocationList.items]);
        }
    }, [getLocationListRes.data]);

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/oms/prioritylocationbycity')}
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
            <h2 className={classes.titleTop}>{t('prioritylocation:Edit_Priority_Location_by_City')}</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('prioritylocation:Channel_Code')}</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            mode="lazy"
                            value={formik.values.channelCode}
                            onChange={(e) => formik.setFieldValue('channelCode', e)}
                            loading={getChannelListRes.loading}
                            options={
                                getChannelListRes
                                && getChannelListRes.data
                                && getChannelListRes.data.getChannelList
                                && getChannelListRes.data.getChannelList.items
                            }
                            getOptions={getChannelList}
                            getOptionLabel={(option) => ((option && (`${option.channel_code } - ${ option.channel_name}`)) || '')}
                            primaryKey="channel_id"
                            labelKey="channel_name"
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('prioritylocation:City')}</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            mode="lazy"
                            value={formik.values.city}
                            onChange={(e) => formik.setFieldValue('city', e)}
                            loading={getCityListRes.loading}
                            options={cityOption}
                            getOptions={getCityList}
                            primaryKey="id"
                            labelKey="city"
                            onInputChange={(e) => setSearchCity(e && e.target && e.target.value)}
                            error={!!(formik.touched.city && formik.errors.city)}
                            helperText={(formik.touched.city && formik.errors.city) || ''}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('prioritylocation:Location_Code')}</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            mode="lazy"
                            value={formik.values.locationCode}
                            onChange={(e) => formik.setFieldValue('locationCode', e)}
                            loading={getLocationListRes.loading}
                            options={locationOption}
                            getOptions={getLocationList}
                            primaryKey="loc_id"
                            labelKey="loc_name"
                            onInputChange={(e) => setSearchLocation(e && e.target && e.target.value)}
                            error={!!(formik.touched.locationCode && formik.errors.locationCode)}
                            helperText={(formik.touched.locationCode && formik.errors.locationCode) || ''}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('prioritylocation:Priority')}</span>
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
                    </div>
                </div>
                <div className={classes.formFieldButton}>
                    <Button
                        className={classes.btn}
                        onClick={formik.handleSubmit}
                        variant="contained"
                    >
                        {t('prioritylocation:Submit')}
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default PriorityLocationEditContent;
