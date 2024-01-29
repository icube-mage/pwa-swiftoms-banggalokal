/* eslint-disable no-unused-vars */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import Autocomplete from '@common_autocomplete';
import { useRouter } from 'next/router';
import { optionsIsActive } from '@modules/shippingcompany/helpers';
import clsx from 'clsx';
import useStyles from '@modules/shippingcompany/pages/edit/components/style';

const ShippingCompanyEditContent = (props) => {
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
                onClick={() => router.push('/tada/shippingcompany')}
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
            <h2 className={classes.titleTop}>{t('shippingcompany:Edit_Shipping_Company')}</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('shippingcompany:Company_ID')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="companyId"
                            value={formik.values.companyId}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.companyId && formik.errors.companyId)}
                            helperText={(formik.touched.companyId && formik.errors.companyId) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('shippingcompany:Brand')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="brand"
                            value={formik.values.brand}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.brand && formik.errors.brand)}
                            helperText={(formik.touched.brand && formik.errors.brand) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('shippingcompany:Shipping_Method')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="shippingMethod"
                            value={formik.values.shippingMethod}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.shippingMethod && formik.errors.shippingMethod)}
                            helperText={(formik.touched.shippingMethod && formik.errors.shippingMethod) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('shippingcompany:Is_Active')}</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            value={formik.values.isActive}
                            onChange={(e) => formik.setFieldValue('isActive', e)}
                            options={optionsIsActive}
                            error={!!(formik.touched.isActive && formik.errors.isActive)}
                            helperText={(formik.touched.isActive && formik.errors.isActive) || ''}
                        />
                    </div>
                </div>
                <div className={classes.formFieldButton}>
                    <Button
                        className={classes.btn}
                        onClick={formik.handleSubmit}
                        variant="contained"
                    >
                        {t('shippingcompany:Submit')}
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default ShippingCompanyEditContent;
