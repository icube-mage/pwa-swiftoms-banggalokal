/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import Progressbar from '@common_progressbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import useStyles from '@modules/orderqueue/pages/fetchorder/components/style';
import gqlService from '@modules/orderqueue/services/graphql';

const FetchOrderContent = (props) => {
    const {
        formik, activityState, firstLoad, showProgress, finishedAfterSubmit, t,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const [getActivity, getActivityRes] = gqlService.getActivity({
        variables: {
            code: 'manual_fetch_orders',
            by_session: false,
        },
    });

    useEffect(() => {
        getActivity();
    }, []);

    return (
        <>
            <Button className={classes.btnBack} onClick={() => router.push('/order/allorder')} variant="contained" style={{ marginRight: 16 }}>
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
            <h2 className={classes.titleTop}>{t('order:Fetch_Marketplace_Order')}</h2>

            <Paper className={classes.container}>
                <div className={classes.content}>
                    <h4 className={classes.titleSmall} style={{ color: 'black' }}>
                        {t('order:Please_click_the_button_below_to_fetch_marketplace_order_manually')}
                    </h4>
                    {getActivityRes.data && getActivityRes.data.getActivity && getActivityRes.data.getActivity?.activity_id && (
                        <h4 className={classes.titleSmall}>
                            {t('order:Last_Fetch_Marketplace_Order_Manually_By')}
                            {getActivityRes.data.getActivity?.run_by_name ?? ' ... '} {t('order:at')}{' '}
                            {getActivityRes.data.getActivity?.finished_at}
                        </h4>
                    )}
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('order:Start_Date')}</span>
                        </div>
                        <TextField
                            type="date"
                            variant="outlined"
                            name="start_date"
                            value={formik.values.start_date}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.start_date && formik.errors.start_date)}
                            helperText={(formik.touched.start_date && formik.errors.start_date) || ''}
                            className={classes.fieldRoot}
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
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('order:End_Date')}</span>
                        </div>
                        <TextField
                            type="date"
                            variant="outlined"
                            name="end_date"
                            value={formik.values.end_date}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.end_date && formik.errors.end_date)}
                            helperText={(formik.touched.end_date && formik.errors.end_date) || ''}
                            className={classes.fieldRoot}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                </div>
                <div className={classes.formFieldButton}>
                    <Button className={classes.btn} onClick={formik.handleSubmit} variant="contained">
                        {t('order:Submit')}
                    </Button>
                </div>

                {activityState && (activityState.run_status === 'running' || activityState.run_status === 'pending ' || showProgress) ? (
                    <div className={classes.progressContainer}>
                        <Progressbar total={activityState?.data_total} value={activityState?.data_processed} title="Progress" />
                    </div>
                ) : null}
                {firstLoad ? (
                    <div className={classes.formFieldButton}>
                        <div className={clsx(classes.status)}>{t('order:Loading')}</div>
                    </div>
                ) : (
                    activityState
                    && activityState.run_status
                    && (activityState.run_status === 'running' || activityState.run_status === 'pending ' || showProgress)
                    && finishedAfterSubmit && (
                        <div className={classes.formFieldButton}>
                            {activityState.run_status !== 'running' && showProgress ? (
                                activityState.error_message ? (
                                    <div className={clsx(classes.status, 'error')}>{t('order:ERROR')}</div>
                                ) : (
                                    <div className={clsx(classes.status, 'success')}>{t('order:SUCCESS')}</div>
                                )
                            ) : null}

                            <TableContainer component={Paper}>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className={classes.leftColumn}>{t('order:Status_')}</TableCell>
                                            <TableCell className={clsx(classes.rightColumn, 'capitalize')}>{activityState.run_status}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.leftColumn}>{t('order:Started_At_')}</TableCell>
                                            <TableCell className={classes.rightColumn}>
                                                {new Date(activityState.started_at).toLocaleString('en-US', {
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                    month: 'short',
                                                    hour: 'numeric',
                                                    minute: 'numeric',
                                                    second: 'numeric',
                                                })}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.leftColumn}>{t('order:Run_By_')}</TableCell>
                                            <TableCell className={classes.rightColumn}>{activityState.run_by}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.leftColumn}>{t('order:Error_Message_')}</TableCell>
                                            <TableCell className={classes.rightColumn} style={{ color: 'red' }}>
                                                {activityState.error_message || '-'}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.leftColumn}>{t('order:Attachment_')}</TableCell>
                                            <TableCell className={classes.rightColumn}>
                                                <a
                                                    onClick={() => (activityState.attachment ? router.push(activityState.attachment) : null)}
                                                    style={{
                                                        color: '#BE1F93',
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    {activityState.attachment ? t('order:SUCCESS') : '-'}
                                                </a>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    )
                )}
            </Paper>
        </>
    );
};

export default FetchOrderContent;
