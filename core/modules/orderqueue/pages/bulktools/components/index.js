/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-danger */
import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import DropFile from '@common_dropfile';
import clsx from 'clsx';
import useStyles from '@modules/orderqueue/pages/bulktools/components/style';
import Autocomplete from '@common_autocomplete';
import Progressbar from '@common_progressbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { useRouter } from 'next/router';

const ProductListImport = (props) => {
    const {
        formik,
        urlDownload,
        handleDropFile,
        bulkToolsOptionsState,
        setBulkType,
        bulkType,
        activityState,
        showProgress,
        finishedAfterSubmit,
        t,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <h2 className={classes.titleTop}>{t('bulktools:Bulk_Tools')}</h2>
            <Paper className={classes.container}>
                <span className={clsx(classes.textAttach, classes.label)}>{t('bulktools:Attach_File')}</span>
                <div className={classes.contentWithoutBorder}>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('bulktools:Bulk_Type')}</span>
                        </div>
                        <Autocomplete
                            value={bulkType}
                            className={classes.autocompleteRoot}
                            onChange={(e) => {
                                setBulkType(e);
                            }}
                            defaultValue={{ loc_name: 'select', loc_code: 0 }}
                            options={bulkToolsOptionsState}
                            primaryKey="acl"
                            labelKey="name"
                        />
                        <div className="link-download">
                            {bulkType && (
                                <span className={classes.label}>
                                    <a href={urlDownload} className={classes.linkDownload}>
                                        {t('bulktools:Download_Sample_File')}
                                    </a>
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className={classes.content}>
                    <div className={clsx(classes.formField, classes.textSelectFile)}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('bulktools:Select_File')}</span>
                        </div>
                        <DropFile
                            error={formik.errors.binary && formik.touched.binary}
                            getBase64={handleDropFile}
                        />
                    </div>
                </div>
                <div className={classes.formFieldButton}>
                    <Button className={classes.btn} onClick={formik.handleSubmit} variant="contained" disabled={bulkType === null}>
                        {t('bulktools:Submit')}
                    </Button>
                </div>
                {activityState && (activityState.run_status === 'running' || activityState.run_status === 'pending ' || showProgress) ? (
                    <div className={classes.progressContainer}>
                        <Progressbar total={activityState?.data_total} value={activityState?.data_processed} title="Progress" />
                    </div>
                ) : null}
                {activityState
                    && activityState.run_status
                    && (activityState.run_status === 'running' || activityState.run_status === 'pending ' || showProgress)
                    && finishedAfterSubmit && (
                        <div className={classes.formFieldButton}>
                            {activityState.run_status !== 'running' && showProgress ? (
                                activityState.error_message ? (
                                    <div className={clsx(classes.status, 'error')}>{t('bulktools:ERROR')}</div>
                                ) : (
                                    <div className={clsx(classes.status, 'success')}>{t('bulktools:SUCCESS')}</div>
                                )
                            ) : null}

                            <TableContainer component={Paper}>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className={classes.leftColumn}>{t('bulktools:Status_')}</TableCell>
                                            <TableCell className={clsx(classes.rightColumn, 'capitalize')}>{activityState.run_status}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.leftColumn}>{t('bulktools:Started_At_')}</TableCell>
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
                                            <TableCell className={classes.leftColumn}>{t('bulktools:Run_By_')}</TableCell>
                                            <TableCell className={classes.rightColumn}>{activityState.run_by}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.leftColumn}>{t('bulktools:Error_Message_')}</TableCell>
                                            <TableCell className={classes.rightColumn} style={{ color: 'red' }}>
                                                {activityState.error_message || '-'}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.leftColumn}>{t('bulktools:Attachment_')}</TableCell>
                                            <TableCell className={classes.rightColumn}>
                                                <a
                                                    onClick={() => (activityState.attachment ? router.push(activityState.attachment) : null)}
                                                    style={{
                                                        color: '#BE1F93',
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    {activityState.attachment ? t('bulktools:Download') : '-'}
                                                </a>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    )}
            </Paper>
        </>
    );
};

export default ProductListImport;
