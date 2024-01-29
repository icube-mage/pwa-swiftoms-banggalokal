/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DropFile from '@common_dropfile';
import clsx from 'clsx';
import useStyles from '@modules/shipmentmarketplace/pages/import/components/style';
import Progressbar from '@common_progressbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Link from 'next/link';

const HomeDeliveryImport = (props) => {
    const {
        formik,
        handleDropFile,
        activityState,
        firstLoad,
        showProgress,
        t,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/shipment/shipmentmarketplace')}
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
            <h2 className={classes.titleTop}>{t('shipmentmarketplace:Bulk_Shipment')}</h2>
            <Paper className={classes.container}>
                <span className={clsx(classes.textAttach, classes.label)}>Attach File </span>
                <div className={classes.content}>
                    <div className={classes.formField}>
                        <div className={classes.label}>
                            <Link href="/shipment/shipmentmarketplace/tutorialbulkshipment">
                                <a target="_blank" className={classes.linkDownload}>
                                    {t('shipmentmarketplace:Bulk_Shipment_Tutorial')}
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className={classes.formField} style={{ textAlign: 'left' }}>
                        <DropFile
                            title="Please select the file : "
                            error={(
                                (formik.errors.binary && formik.touched.binary)
                            )}
                            getBase64={handleDropFile}
                        />
                    </div>

                </div>
                <div className={classes.formFieldButton}>
                    <Button
                        className={classes.btn}
                        onClick={formik.handleSubmit}
                        variant="contained"
                    >
                        {t('shipmentmarketplace:Submit')}
                    </Button>
                </div>
                {activityState && ((activityState.run_status === 'running' || activityState.run_status === 'pending') || showProgress)
                    ? (
                        <div className={classes.progressContainer}>
                            <Progressbar total={activityState?.data_total} value={activityState?.data_processed} title="Progress" />
                        </div>
                    )
                    : null}
                {firstLoad
                    ? (
                        <div className={classes.formFieldButton}>
                            <div className={clsx(classes.status)}>
                                Loading...
                            </div>
                        </div>
                    )
                    : (activityState && activityState.run_status
                        && ((activityState.run_status === 'running' || activityState.run_status === 'pending ') || showProgress)
                        && (
                            <div className={classes.formFieldButton}>
                                {activityState.run_status !== 'running'
                                    ? activityState.error_message
                                        ? (
                                            <div className={clsx(classes.status, 'error')}>
                                                {t('shipmentmarketplace:ERROR')}
                                            </div>
                                        )
                                        : (
                                            <div className={clsx(classes.status, 'success')}>
                                                {t('shipmentmarketplace:SUCCESS')}
                                            </div>
                                        ) : null}

                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className={classes.leftColumn}>
                                                    {t('shipmentmarketplace:Status_')}
                                                </TableCell>
                                                <TableCell
                                                    className={clsx(classes.rightColumn, 'capitalize')}
                                                >
                                                    {activityState.run_status}

                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className={classes.leftColumn}>
                                                    {t('shipmentmarketplace:Started_At_')}
                                                </TableCell>
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
                                                <TableCell className={classes.leftColumn}>
                                                    {t('shipmentmarketplace:Run_By_')}
                                                </TableCell>
                                                <TableCell
                                                    className={classes.rightColumn}
                                                >
                                                    {activityState.run_by}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className={classes.leftColumn}>
                                                    {t('shipmentmarketplace:Error_Message_')}
                                                </TableCell>
                                                <TableCell className={classes.rightColumn} style={{ color: 'red' }}>
                                                    {activityState.error_message || '-'}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className={classes.leftColumn}>
                                                    {t('shipmentmarketplace:Attachment_')}
                                                </TableCell>
                                                <TableCell className={classes.rightColumn}>
                                                    <a
                                                        onClick={() => (activityState.attachment
                                                            ? router.push(activityState.attachment) : null)}
                                                        style={{
                                                            color: '#BE1F93',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        {activityState.attachment ? t('shipmentmarketplace:Download') : '-'}
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

export default HomeDeliveryImport;
