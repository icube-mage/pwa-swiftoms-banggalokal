/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import useStyles from '@modules/configurationlogistixprovider/pages/addnew/components/style';
import clsx from 'clsx';

const LogistixProviderContent = (props) => {
    const {
        formik,
        t,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/configurations/logistixprovider')}
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
            <h2 className={classes.titleTop}>
                {t('logistixproviderconfiguration:Add_New_Logistix_Provider')}
            </h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('logistixproviderconfiguration:Channel_Shipping_Method')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="channel_shipping_method"
                            value={formik.values.channel_shipping_method}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.channel_shipping_method && formik.errors.channel_shipping_method)}
                            helperText={(formik.touched.channel_shipping_method && formik.errors.channel_shipping_method) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('logistixproviderconfiguration:Provider')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="provider"
                            value={formik.values.provider}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.provider && formik.errors.provider)}
                            helperText={(formik.touched.provider && formik.errors.provider) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('logistixproviderconfiguration:Service')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="service"
                            value={formik.values.service}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.service && formik.errors.service)}
                            helperText={(formik.touched.service && formik.errors.service) || ''}
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
                        {t('logistixproviderconfiguration:Submit')}
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default LogistixProviderContent;
