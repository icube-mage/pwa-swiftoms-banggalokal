/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import DropFile from '@common_dropfile';
import clsx from 'clsx';
import useStyles from '@modules/productbulktools/pages/default/components/style';
import Progressbar from '@common_progressbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Autocomplete from '@common_autocomplete';
import Link from 'next/link';

const ProductBulkTools = (props) => {
    const {
        formik,
        handleDropFile,
        urlDownload,
        activityState,
        firstLoad,
        showProgress,
        finishedAfterSubmit,
        t,
        bulkType,
        setBulkType,
        bulkTypeOptions,
        uploadResponse,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const getStatusColor = (status) => {
        if (status?.toLowerCase() === 'warning') {
            return '#9F6000';
        }
        if (status?.toLowerCase() === 'error') {
            return '#D8000C';
        }

        if (status?.toLowerCase() === 'success') {
            return '#4F8A10';
        }

        return '#000000';
    };

    const getBackgroundColor = (status) => {
        if (status?.toLowerCase() === 'warning') {
            return '#FEEFB3';
        }
        if (status?.toLowerCase() === 'error') {
            return '#FFD2D2';
        }

        if (status?.toLowerCase() === 'success') {
            return '#DFF2BF';
        }

        return 'transparent';
    };

    const getTutorialLink = () => {
        switch (bulkType) {
        case 'product':
            return 'tutorialupload';
        case 'configurable_product':
            return 'tutorialconfigurableproduct';
        case 'product_images':
            return 'tutorialproductimage';
        case 'fixed_bundle_product':
            return 'tutorialfixedbundleproduct';
        case 'bundle_product':
            return 'tutorialbundleproduct';
        default:
            return '';
        }
    };
   
    return (
        <>
            <div className={classes.contentContainer}>
                <h2 className={classes.titleTop}>{t('productbulktools:Product_Bulk_Tools')}</h2>
                <Paper className={classes.container}>
                    <span className={clsx(classes.textAttach, classes.label)}>{t('productbulktools:Attach_File')}</span>
                    <div className={classes.contentWithoutBorder}>
                        <div className={classes.formFieldGrid}>
                            <div className={classes.divLabel}>
                                <span className={classes.label}>{t('productbulktools:Bulk_Type')}</span>
                            </div>
                            <Autocomplete
                                value={bulkTypeOptions.find((opt) => opt.value === bulkType)}
                                className={classes.autocompleteRoot}
                                onChange={(e) => {
                                    setBulkType(e?.value);
                                }}
                                options={bulkTypeOptions}
                                primaryKey="value"
                                labelKey="label"
                                disableClearable
                            />
                            <div className="link-download">
                                <div className={classes.label}>
                                    <a href={urlDownload[bulkType]} className={clsx(classes.linkDownload, (!bulkType || !urlDownload[bulkType]) && 'disabled')}>
                                        {t('productbulktools:Download_Sample_File')}
                                    </a>
                                </div>
                                {' '}
                                {
                                    getTutorialLink() !== '' && (
                                        <div className={classes.label}>
                                            {t('productbulktools:_or_')}
                                            <Link href={`/product/productbulktools/${getTutorialLink()}`}>
                                                <a target="_blank" className={classes.linkDownload}>
                                                    {t('productbulktools:View_Tutorial')}
                                                </a>
                                            </Link>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className={classes.content}>
                        <div className={clsx(classes.formFieldGrid, classes.textSelectFile)}>
                            <div className={classes.divLabel}>
                                <span className={classes.label}>{t('productbulktools:Select_File')}</span>
                            </div>
                            <DropFile
                                error={formik.errors.binary && formik.touched.binary}
                                getBase64={handleDropFile}
                            />
                        </div>
                    </div>
                    <div className={classes.formFieldButton}>
                        <Button className={classes.btn} onClick={formik.handleSubmit} variant="contained" disabled={!bulkType || !formik.values.binary}>
                            {t('productbulktools:Submit')}
                        </Button>
                    </div>
                    {activityState && (activityState.run_status === 'running' || activityState.run_status === 'pending ' || showProgress) ? (
                        <div className={classes.progressContainer}>
                            <Progressbar total={activityState?.data_total} value={activityState?.data_processed} title="Progress" />
                        </div>
                    ) : null}
                    {firstLoad ? (
                        <div className={classes.formFieldButton}>
                            <div className={clsx(classes.status)}>Loading...</div>
                        </div>
                    ) : (
                        activityState
                        && activityState.run_status
                        && (activityState.run_status === 'running' || activityState.run_status === 'pending ' || showProgress)
                        && finishedAfterSubmit && (
                            <div className={classes.formFieldButton}>
                                {activityState.run_status !== 'running' && showProgress ? (
                                    activityState.error_message ? (
                                        <div className={clsx(classes.status, 'error')}>{t('productbulktools:ERROR')}</div>
                                    ) : (
                                        <div className={clsx(classes.status, 'success')}>{t('productbulktools:SUCCESS')}</div>
                                    )
                                ) : null}

                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className={classes.leftColumn}>{`${t('productbulktools:Status_')}`}</TableCell>
                                                <TableCell className={clsx(classes.rightColumn, 'capitalize')}>{activityState.run_status}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className={classes.leftColumn}>{`${t('productbulktools:Started_At_')}`}</TableCell>
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
                                                <TableCell className={classes.leftColumn}>{`${t('productbulktools:Run_By_')}`}</TableCell>
                                                <TableCell className={classes.rightColumn}>{activityState.run_by}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className={classes.leftColumn}>{`${t('productbulktools:Error_Message_')}`}</TableCell>
                                                <TableCell className={classes.rightColumn} style={{ color: 'red' }}>
                                                    {activityState.error_message || '-'}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className={classes.leftColumn}>{`${t('productbulktools:Attachment_')}`}</TableCell>
                                                <TableCell className={classes.rightColumn}>
                                                    <a
                                                        onClick={() => (activityState.attachment ? router.push(activityState.attachment) : null)}
                                                        style={{
                                                            color: '#BE1F93',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        {activityState.attachment ? t('productbulktools:Download') : '-'}
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
                {uploadResponse && (
                    <Paper className={classes.container} style={{ margin: '20px 0px' }}>
                        <span
                            className={clsx(classes.textAttach, classes.label)}
                            style={{
                                textTransform: 'uppercase',
                                fontSize: 24,
                                color: getStatusColor(uploadResponse?.status),
                                backgroundColor: getBackgroundColor(uploadResponse?.status),
                            }}
                        >
                            {uploadResponse?.status}
                        </span>
                        {uploadResponse?.error && (
                            <div className={classes.content} style={{ flexDirection: 'row' }}>
                                <div className={classes.formField}>
                                    <div className={(classes.divLabel, classes.labelResponse)}>
                                        <span className={classes.label}>{uploadResponse?.error}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        {!uploadResponse?.error && (
                            <div className={classes.content} style={{ flexDirection: 'column' }}>
                                <div className={classes.formField}>
                                    <div className={(classes.divLabel, classes.labelResponse)}>
                                        <span className={classes.label}>{`${t('productbulktools:Rows_Found')} : `}</span>
                                        <span className={classes.label}>{uploadResponse?.rows_found || 0}</span>
                                    </div>
                                    <div className={(classes.divLabel, classes.labelResponse)}>
                                        <span className={classes.label}>{`${t('productbulktools:Rows_Processed')} : `}</span>
                                        <span className={classes.label}>{uploadResponse?.rows_processed || 0}</span>
                                    </div>
                                    <div className={(classes.divLabel, classes.labelResponse)}>
                                        <span className={classes.label}>{`${t('productbulktools:Rows_Success')} : `}</span>
                                        <span className={classes.label}>{uploadResponse?.rows_success || 0}</span>
                                    </div>
                                    <div className={(classes.divLabel, classes.labelResponse)}>
                                        <span className={classes.label}>{`${t('productbulktools:Rows_Not_Changed')} : `}</span>
                                        <span className={classes.label}>{uploadResponse?.rows_not_changed || 0}</span>
                                    </div>
                                    <div className={(classes.divLabel, classes.labelResponse)}>
                                        <span className={classes.label}>{`${t('productbulktools:Rows_Errors')} : `}</span>
                                        <span className={classes.label}>{uploadResponse?.rows_errors || 0}</span>
                                    </div>
                                </div>
                                <div className={classes.formField}>
                                    <div className={(classes.divLabel)}>
                                        {!uploadResponse?.attachment_url && uploadResponse?.error_messages?.length === 1
                                            && uploadResponse?.error_messages?.[0] === '' ? (
                                                <span className={classes.label}>{`${t('productbulktools:Log_Messages')} : -`}</span>
                                            ) : <span className={classes.label}>{`${t('productbulktools:Log_Messages')} : `}</span>}
                                    </div>
                                    {!!uploadResponse?.attachment_url
                                        && (
                                            <div className={(classes.divLabel)}>
                                                <span className={classes.label}>{t('productbulktools:There_is_an_error_on_import_csv')}</span>
                                                {' '}
                                                <a href={uploadResponse?.attachment_url} className={classes.linkDownload}>
                                                    {t('productbulktools:Download')}
                                                </a>
                                                {' '}
                                                <span className={classes.label}>{t('productbulktools:error_messages')}</span>
                                            </div>
                                        )}
                                    {!uploadResponse?.attachment_url && !!uploadResponse?.error_messages?.length
                                        && uploadResponse?.error_messages?.[0] !== '' && (
                                        <>
                                            <div className={(classes.divLabel, classes.labelResponse)}>
                                                <span className={classes.label} style={{ textDecoration: 'underline' }}>
                                                    {`${t('productbulktools:Line__Message')} : `}
                                                </span>
                                            </div>
                                            {uploadResponse?.error_messages?.map((item, index) => (
                                                <div key={index} className={(classes.divLabel, classes.labelResponse)}>
                                                    <span className={classes.label}>{item}</span>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </Paper>
                )}
            </div>
        </>
    );
};

export default ProductBulkTools;
