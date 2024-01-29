/* eslint-disable no-unused-vars */
import React from 'react';
import Head from 'next/head';
import TextField from '@common_textfield';
import Button from '@common_button';
import Autocomplete from '@common_autocomplete';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import locationGqlService from '@modules/formcustomer/services/graphql';
import clsx from 'clsx';
import useStyles from './style';

const FormCustomerEditContent = (props) => {
    const {
        formik,
        custDetail,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const [getFormDataCurbPickup, getFormDataCurbPickupRes] = locationGqlService.getLocation();

    return (
        <>
            <Head>
                <title>Form Customer</title>
            </Head>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <h2 className={classes.titleTop}>
                        Hello,
                        {custDetail.name}
                    </h2>
                    <p className={classes.paraf}>
                        Please submit this form to notify our team that you have arrived.
                        One of our staff will bring your order to you right away.
                    </p>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Name</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="nameInput"
                            value={formik.values.nameInput}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.nameInput && formik.errors.nameInput)}
                            helperText={(formik.touched.nameInput && formik.errors.nameInput) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Phone Number</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.phone && formik.errors.phone)}
                            helperText={(formik.touched.phone && formik.errors.phone) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Vehicle Registration Plate</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="vehicle"
                            value={formik.values.vehicle}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.vehicle && formik.errors.vehicle)}
                            helperText={(formik.touched.vehicle && formik.errors.vehicle) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Vehicle Description</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="vehicleDesc"
                            value={formik.values.vehicleDesc}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.vehicleDesc && formik.errors.vehicleDesc)}
                            helperText={(formik.touched.vehicleDesc && formik.errors.vehicleDesc) || 'e.g: Toyota Inova Hitam'}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Choose My Location</span>
                        </div>
                        <Autocomplete
                            disabled={(formik.values.isLocation === 0)}
                            helperText={(formik.values.isLocation === 0) && (<>cant change your location</>)}
                            className={classes.autocompleteRoot}
                            mode="lazy"
                            value={formik.values.location}
                            onChange={(e) => formik.setFieldValue('location', e)}
                            loading={getFormDataCurbPickupRes.loading}
                            options={
                                getFormDataCurbPickupRes
                                && getFormDataCurbPickupRes.data
                                && getFormDataCurbPickupRes.data.getFormDataCurbPickup
                                && getFormDataCurbPickupRes.data.getFormDataCurbPickup.location
                            }
                            getOptions={getFormDataCurbPickup}
                            getOptionsVariables={
                                { variables: { id: router.query.id } }
                            }
                            primaryKey="value"
                            labelKey="label"
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>Notes</span>
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
                <div className={classes.formFieldButton}>
                    <Button
                        className={classes.btn}
                        onClick={formik.handleSubmit}
                        variant="contained"
                    >
                        Submit
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default FormCustomerEditContent;
