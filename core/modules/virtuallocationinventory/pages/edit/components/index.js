/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import Autocomplete from '@common_autocomplete';
import locationGqlService from '@modules/location/services/graphql';
import clsx from 'clsx';
import useStyles from '@modules/virtuallocationinventory/pages/edit/components/style';

const VirtualLocationInventoryEditContent = (props) => {
    const {
        formik,
        t,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const [getLocationList, getLocationListRes] = locationGqlService.getLocationList();
    const [getLocationVirtualList, getLocationVirtualListRes] = locationGqlService.getLocationList();
    const [searchLocation, setSearchLocation] = React.useState('');
    const [locationOption, setLocationOption] = React.useState([]);
    const [searchVirtualLocation, setSearchVirtualLocation] = React.useState('');
    const [virtualLocationOption, setVirtualLocationOption] = React.useState([]);

    React.useEffect(() => {
        const onChangeTimeOut = setTimeout(() => {
            const isExist = searchLocation && locationOption.filter((elm) => elm?.loc_name?.toLowerCase().includes(searchLocation?.toLowerCase()));
            if (searchLocation && isExist.length === 0) {
                getLocationList({
                    variables: {
                        search: searchLocation,
                        filter: {
                            is_virtual_location: { in: '0' },
                        },
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
            const ids = new Set(locationOption.map((d) => d.loc_code));
            setLocationOption([...locationOption, ...getLocationListRes.data.getLocationList.items.filter((d) => !ids.has(d.loc_code))]);
        }
    }, [getLocationListRes.data]);

    React.useEffect(() => {
        const onChangeTimeOut = setTimeout(() => {
            const isExist = searchVirtualLocation && virtualLocationOption.filter((elm) => elm?.loc_name?.toLowerCase().includes(searchVirtualLocation?.toLowerCase()));
            if (searchVirtualLocation && isExist.length === 0) {
                getLocationList({
                    variables: {
                        search: searchVirtualLocation,
                        filter: {
                            is_virtual_location: { in: '1' },
                        },
                        pageSize: 35,
                        currentPage: 1,
                    },
                });
            }
            return null;
        }, 500);

        return () => clearTimeout(onChangeTimeOut);
    }, [searchVirtualLocation]);

    React.useEffect(() => {
        if (
            getLocationVirtualListRes
            && getLocationVirtualListRes.data
            && getLocationVirtualListRes.data.getLocationList
            && getLocationVirtualListRes.data.getLocationList.items
        ) {
            const ids = new Set(virtualLocationOption.map((d) => d.loc_code));
            setVirtualLocationOption([...virtualLocationOption, ...getLocationVirtualListRes.data.getLocationList.items.filter((d) => !ids.has(d.loc_code))]);
        }
    }, [getLocationVirtualListRes.data]);

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/cataloginventory/virtuallocationinventory')}
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
            <h2 className={classes.titleTop}>{t('virtuallocationinventory:Edit_Virtual_Location_Mapping')}</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('virtuallocationinventory:Parent_Location')}</span>
                        </div>
                        <Autocomplete
                            className={clsx(classes.autocompleteRoot, classes.labelRequired)}
                            mode="lazy"
                            value={formik.values.parentLocation}
                            onChange={(e) => formik.setFieldValue('parentLocation', e)}
                            loading={getLocationListRes.loading}
                            options={locationOption}
                            getOptions={getLocationList}
                            getOptionsVariables={
                                {
                                    variables: {
                                        search: searchLocation,
                                        filter: {
                                            is_virtual_location: { in: '0' },
                                        },
                                        pageSize: 35,
                                        currentPage: 1,
                                    },
                                }
                            }
                            primaryKey="loc_code"
                            labelKey="loc_name"
                            onInputChange={(e) => setSearchLocation((e && e.target && e.target.value) || '')}
                            error={!!(formik.touched.parentLocation && formik.errors.parentLocation)}
                            helperText={(formik.touched.parentLocation && formik.errors.parentLocation) || ''}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('virtuallocationinventory:Virtual_Location')}</span>
                        </div>
                        <Autocomplete
                            className={clsx(classes.autocompleteRoot, classes.labelRequired)}
                            mode="lazy"
                            value={formik.values.virtualLocation}
                            onChange={(e) => formik.setFieldValue('virtualLocation', e)}
                            loading={getLocationVirtualListRes.loading}
                            options={virtualLocationOption}
                            getOptions={getLocationVirtualList}
                            getOptionsVariables={
                                {
                                    variables: {
                                        search: searchVirtualLocation,
                                        filter: {
                                            is_virtual_location: { in: '1' },
                                        },
                                        pageSize: 35,
                                        currentPage: 1,
                                    },
                                }
                            }
                            primaryKey="loc_code"
                            labelKey="loc_name"
                            onInputChange={(e) => setSearchVirtualLocation((e && e.target && e.target.value) || '')}
                            error={!!(formik.touched.virtualLocation && formik.errors.virtualLocation)}
                            helperText={(formik.touched.virtualLocation && formik.errors.virtualLocation) || ''}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('virtuallocationinventory:Percentage')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="percentage"
                            value={formik.values.percentage}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.percentage && formik.errors.percentage)}
                            helperText={(formik.touched.percentage && formik.errors.percentage) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('virtuallocationinventory:Priority')}</span>
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
                        {t('virtuallocationinventory:Submit')}
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default VirtualLocationInventoryEditContent;
