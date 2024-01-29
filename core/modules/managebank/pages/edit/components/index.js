/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';

import TextField from '@common_textfield';
import Button from '@common_button';
import Autocomplete from '@common_autocomplete';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';

import { floatReg } from '@helper_regex';
import { typeOptions } from '@modules/managebank/helpers';
import useStyles from '@modules/managebank/pages/edit/components/style';

const ManageBankEditContent = (props) => {
    const {
        formik, t, data,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>
                <div>
                    <Button
                        className={classes.btnBack}
                        onClick={() => router.push('/vendorportal/managebank')}
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
                        {t('managebank:Edit_Bank')}
                    </h2>
                </div>
            </div>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <h5 className={classes.titleSmall}>{t('managebank:General_Information')}</h5>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('managebank:Bank_Code')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="bank_code"
                            value={formik.values.bank_code}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.bank_code && formik.errors.bank_code)}
                            helperText={(formik.touched.bank_code && formik.errors.bank_code) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                            disabled
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('managebank:Bank_Name')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="bank_name"
                            value={data.bank_name}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                            disabled
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={clsx(classes.divLabel, 'top')}>
                            <span className={classes.label}>{t('managebank:Bank_Logo')}</span>
                        </div>
                        <img src={data.logo} alt="bank-logo" className={classes.logo} />
                    </div>
                </div>
            </Paper>

            <Paper className={classes.container}>
                <div className={classes.content}>
                    <h5 className={classes.titleSmall}>{t('managebank:Withdrawal_Setting')}</h5>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label)}>{t('managebank:Type')}</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            value={typeOptions.find(({ value }) => value === formik.values.withdrawal_fee_type)}
                            onChange={({ value }) => formik.setFieldValue('withdrawal_fee_type', value)}
                            options={typeOptions}
                            primaryKey="value"
                            labelKey="label"
                            disableClearable
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label)}>{t('managebank:Withdrawal_Fee')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="withdrawal_fee"
                            value={formik.values.withdrawal_fee}
                            onChange={(e) => formik.setFieldValue('withdrawal_fee', e.target.value.replace(floatReg, ''))}
                            error={!!(formik.touched.withdrawal_fee && formik.errors.withdrawal_fee)}
                            helperText={(formik.touched.withdrawal_fee && formik.errors.withdrawal_fee) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                </div>
            </Paper>

            <div className={classes.formFieldButton}>
                <Button
                    className={classes.btn}
                    onClick={formik.handleSubmit}
                    variant="contained"
                >
                    {t('managebank:Submit')}
                </Button>
            </div>
        </>
    );
};

export default ManageBankEditContent;
