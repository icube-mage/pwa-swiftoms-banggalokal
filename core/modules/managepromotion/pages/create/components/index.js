/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Autocomplete from '@common_autocomplete';
import clsx from 'clsx';
import useStyles from '@modules/managepromotion/pages/create/components/style';
import { optionsRuleAction } from '@modules/managepromotion/helpers';

const ManagePromotionCreateContent = (props) => {
    const { formik, t } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Button className={classes.btnBack} onClick={() => router.push('/vendorportal/managepromotion')} variant="contained" style={{ marginRight: 16 }}>
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
            <h2 className={classes.titleTop}>{t('managepromotion:Create_Promotion')}</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('managepromotion:Rule_Name')}</span>
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
                            <span className={classes.label}>{t('managepromotion:Description')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.description && formik.errors.description)}
                            helperText={(formik.touched.description && formik.errors.description) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{` ${t('managepromotion:From_Date')}`}</span>
                        </div>
                        <TextField
                            type="date"
                            variant="outlined"
                            name="fromDate"
                            value={formik.values.fromDate}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.fromDate && formik.errors.fromDate)}
                            helperText={(formik.touched.fromDate && formik.errors.fromDate) || ''}
                            className={clsx(classes.fieldRoot, 'field-date')}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{` ${t('managepromotion:To_Date')}`}</span>
                        </div>
                        <TextField
                            type="date"
                            variant="outlined"
                            name="toDate"
                            value={formik.values.toDate}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.toDate && formik.errors.toDate)}
                            helperText={(formik.touched.toDate && formik.errors.toDate) || ''}
                            className={clsx(classes.fieldRoot, 'field-date')}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('managepromotion:Rule_Action')}</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            value={formik.values.simpleAction}
                            onChange={(e) => formik.setFieldValue('simpleAction', e)}
                            options={optionsRuleAction}
                            error={!!(formik.touched.simpleAction && formik.errors.simpleAction)}
                            helperText={(formik.touched.simpleAction && formik.errors.simpleAction) || ''}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('managepromotion:Discount_Amount__Get_Y')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="discountAmount"
                            value={formik.values.discountAmount}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.discountAmount && formik.errors.discountAmount)}
                            helperText={(formik.touched.discountAmount && formik.errors.discountAmount) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('managepromotion:Buy_X_For_Buy_X_Get_Y_Free_Only')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="discountStep"
                            value={formik.values.discountStep}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.discountStep && formik.errors.discountStep)}
                            helperText={(formik.touched.discountStep && formik.errors.discountStep) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('managepromotion:Maximum_Free_Y_Item_For_Buy_X_Get_Y_Free_Only')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="maxY"
                            value={formik.values.maxY}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.maxY && formik.errors.maxY)}
                            helperText={(formik.touched.maxY && formik.errors.maxY) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('managepromotion:Coupon_Code')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="couponCode"
                            value={formik.values.couponCode}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.couponCode && formik.errors.couponCode)}
                            helperText={(formik.touched.couponCode && formik.errors.couponCode) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                </div>
                <div className={classes.formFieldButton}>
                    <Button className={classes.btn} onClick={formik.handleSubmit} variant="contained">
                        {t('managepromotion:Submit')}
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default ManagePromotionCreateContent;
