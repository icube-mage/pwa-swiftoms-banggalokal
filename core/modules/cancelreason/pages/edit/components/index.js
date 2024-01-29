/* eslint-disable max-len */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import useStyles from '@modules/cancelreason/pages/edit/components/style';

const CancelReasonEditContent = (props) => {
    const {
        formik, t,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Button className={classes.btnBack} onClick={() => router.push('/configurations/cancelreason')} variant="contained" style={{ marginRight: 16 }}>
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
            <h2 className={classes.titleTop}>{t('cancelreason:Edit_Cancel_Reason')}</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('cancelreason:Reason_Code')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="reason_code"
                            value={formik.values.reason_code}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.reason_code && formik.errors.reason_code)}
                            helperText={(formik.touched.reason_code && formik.errors.reason_code) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('cancelreason:Reason_Label')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="reason_label"
                            value={formik.values.reason_label}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.reason_label && formik.errors.reason_label)}
                            helperText={(formik.touched.reason_label && formik.errors.reason_label) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                </div>
                <div className={classes.formFieldButton}>
                    <Button className={classes.btn} onClick={formik.handleSubmit} variant="contained">
                        {t('cancelreason:Submit')}
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default CancelReasonEditContent;
