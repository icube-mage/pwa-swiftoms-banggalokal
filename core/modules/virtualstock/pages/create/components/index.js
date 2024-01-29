/* eslint-disable no-unused-vars */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Autocomplete from '@common_autocomplete';
import virtualStockGqlService from '@modules/virtualstock/services/graphql';
import clsx from 'clsx';
import useStyles from '@modules/virtualstock/pages/create/components/style';

const VirtualStockCreateContent = (props) => {
    const {
        formik,
        t,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const [getLocationList, getLocationListRes] = virtualStockGqlService.getLocationList();
    const [searchLocation, setSearchLocation] = React.useState('');
    const [locationOption, setLocationOption] = React.useState([]);

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
            const ids = new Set(locationOption.map((d) => d.loc_code));
            setLocationOption([...locationOption, ...getLocationListRes.data.getLocationList.items.filter((d) => !ids.has(d.loc_code))]);
        }
    }, [getLocationListRes.data]);

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/cataloginventory/virtualstock')}
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
            <h2 className={classes.titleTop}>{t('virtualstock:Create_Virtual_Stock')}</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <h2 className={classes.title}>{t('virtualstock:General_Information')}</h2>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('virtualstock:Name')}</span>
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
                            <span className={classes.label}>{t('virtualstock:Notes')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="notes"
                            value={formik.values.notes}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.notes && formik.errors.notes)}
                            helperText={(formik.touched.notes && formik.errors.notes) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                </div>
                <div className={classes.content}>
                    <h2 className={classes.title}>{t('virtualstock:Locations')}</h2>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('virtualstock:Assigned_Locations')}</span>
                        </div>
                        <Autocomplete
                            className={clsx(classes.autocompleteRoot, classes.autocompleteMulti)}
                            mode="lazy"
                            multiple
                            value={formik.values.location}
                            onChange={(e) => formik.setFieldValue('location', e)}
                            loading={getLocationListRes.loading}
                            options={locationOption}
                            getOptions={getLocationList}
                            getOptionsVariables={{
                                variables: {
                                    search: searchLocation,
                                    pageSize: 35,
                                    currentPage: 1,
                                },
                            }}
                            getOptionLabel={(option) => ((option && (`${option.loc_code } - ${ option.loc_name}`)) || '')}
                            primaryKey="loc_id"
                            labelKey="loc_code"
                            onInputChange={(e) => setSearchLocation((e && e.target && e.target.value) || '')}
                        />
                    </div>
                </div>
                <div className={classes.formFieldButton}>
                    <Button
                        className={classes.btn}
                        onClick={formik.handleSubmit}
                        variant="contained"
                    >
                        {t('virtualstock:Submit')}
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default VirtualStockCreateContent;
