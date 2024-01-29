/* eslint-disable no-unused-vars */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import Autocomplete from '@common_autocomplete';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import gqlService from '@modules/requestreturn/services/graphql';
import clsx from 'clsx';
import useStyles from '@modules/requestreturn/pages/default/components/style';

const RequestReturnContent = (props) => {
    const {
        formikReturn,
        formik,
        setState,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const [getChannelOptions, getChannelOptionsRes] = gqlService.getChannelOptions();

    return (
        <>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <h2 className={classes.titleTop}>Request Return</h2>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Email</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.email && formik.errors.email)}
                            helperText={(formik.touched.email && formik.errors.email) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Order Number</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="orderNumber"
                            value={formik.values.orderNumber}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.orderNumber && formik.errors.orderNumber)}
                            helperText={(formik.touched.orderNumber && formik.errors.orderNumber) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Sales Channel</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            mode="lazy"
                            value={formik.values.channel}
                            onChange={(e) => formik.setFieldValue('channel', e)}
                            error={!!(formik.touched.channel && formik.errors.channel)}
                            helperText={(formik.touched.channel && formik.errors.channel) || ''}
                            loading={getChannelOptionsRes.loading}
                            options={
                                getChannelOptionsRes
                                && getChannelOptionsRes.data
                                && getChannelOptionsRes.data.getChannelOptions
                            }
                            getOptions={getChannelOptions}
                            primaryKey="value"
                            labelKey="label"
                        />
                    </div>
                </div>
                <div className={classes.formFieldButton}>
                    <Button
                        className={classes.btn}
                        onClick={() => { setState('return'); setTimeout(() => { formik.handleSubmit(); }, 500); }}
                        variant="contained"
                    >
                        Request Return
                    </Button>
                    <Button
                        className={clsx(classes.btn, 'search')}
                        onClick={() => { setState('search'); setTimeout(() => { formik.handleSubmit(); }, 500); }}
                        variant="outlined"
                    >
                        Search
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default RequestReturnContent;
