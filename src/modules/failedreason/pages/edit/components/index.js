/* eslint-disable max-len */
import React from 'react';
import TextField from '@common_textfield';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import useStyles from '@modules/failedreason/pages/edit/components/style';

const FailedReasonEditContent = (props) => {
    const {
        formik, dataStore, t,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Button className={classes.btnBack} onClick={() => router.push('/configurations/failedreason')} variant="contained" style={{ marginRight: 16 }}>
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
            <h2 className={classes.titleTop}>{t('failedreason:Edit_Failed_Reason')}</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('failedreason:Reason_Code')}</span>
                        </div>
                        <TextField
                            disabled
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="reason_code"
                            value={formik.values.reason_code}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('failedreason:Reason_Label')}</span>
                        </div>
                        <TextField
                            disabled
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="reason_label"
                            value={formik.values.reason_label}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel} style={{ fontWeight: 700 }}>
                            <span className={classes.label}>{t('failedreason:Actions')}</span>
                        </div>
                    </div>
                    {dataStore && (
                        <>
                            {
                                formik.values?.actions?.map((e, index) => (
                                    <div className={classes.formField}>
                                        <div className={classes.divLabel}>
                                            <span className={classes.label}>{`Store ${e.store_name}`}</span>
                                        </div>
                                        <div className={classes.fieldRoot} style={{ display: 'inline-flex', verticalAlign: 'top' }}>
                                            <TextareaAutosize
                                                minRows={4}
                                                style={{
                                                    borderRadius: 20,
                                                    width: '100%',
                                                    padding: '5px',
                                                    borderColor: `${formik.touched.actions && formik.errors.actions ? 'red' : 'black'}`,
                                                }}
                                                name={`actions[${index}].action_value`}
                                                value={e.action_value}
                                                onChange={formik.handleChange}
                                            />
                                        </div>
                                    </div>
                                ))
                            }
                        </>
                    )}
                </div>
                <div className={classes.formFieldButton}>
                    <Button className={classes.btn} onClick={formik.handleSubmit} variant="contained">
                        {t('failedreason:Submit')}
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default FailedReasonEditContent;
