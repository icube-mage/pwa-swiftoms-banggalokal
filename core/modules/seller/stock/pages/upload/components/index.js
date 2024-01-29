/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import { useRouter } from 'next/router';
import clsx from 'clsx';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';

import Button from '@common_button';

import DropFile from '@sellermodules/stock/pages/upload/components/dropfile';
import Progress from '@sellermodules/stock/pages/upload/components/Progress';
import DownloadDialog from '@sellermodules/stock/pages/list/components/DownloadDialog';
import useStyles from '@sellermodules/stock/pages/upload/components/style';

const StockUploadContent = (props) => {
    const {
        t, formik, handleDropFile, showProgress, activityState, firstLoad, uploadRes,
        showUpload, handleReUpload, totalLoc, setOpen, handleDownloadTemplate,
    } = props;
    const router = useRouter();
    const classes = useStyles();

    return (
        <div style={{ paddingBottom: 10 }}>
            <div className={classes.headerContainer}>
                <IconButton aria-label="back" onClick={() => router.push('/seller/stock')}>
                    <ArrowBackOutlinedIcon />
                </IconButton>
                <h2 className="title">{t('sellerstock:Stock_Page')}</h2>
            </div>
            <Paper className={classes.container}>
                <div className={classes.title}>
                    {t('sellerstock:Update_Stocks_at_Once')}
                </div>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.box}>
                            <div className={classes.title}>
                                {t('sellerstock:Download__fill_in_CSV_files')}
                            </div>
                            <div className={classes.text}>
                                {t('sellerstock:Templates_can_only_be_filled_with_MS_Excel_2007_and_above_or_Libre_Office_Do_not_add_any_columns_or_rows_in_the_CSV_file')}
                            </div>
                            <div style={{ height: 10 }} />
                            <Button
                                className={classes.btn}
                                buttonType="outlined"
                                onClick={() => (totalLoc > 1 ? setOpen(true) : handleDownloadTemplate([]))}
                            >
                                {t('sellerstock:Download_Template')}
                            </Button>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.box}>
                            <div className={classes.title}>
                                {t('sellerstock:Upload_file_CSV')}
                            </div>
                            <div className={classes.text}>
                                {t('sellerstock:Select_the_CSV_file_that_you_have_updated')}
                            </div>
                            <div style={{ height: 20 }} />

                            {firstLoad ? (
                                <div className={classes.centering}>
                                    <CircularProgress />
                                </div>
                            ) : (
                                <>
                                    {activityState
                                        && activityState.run_status
                                        && (activityState.run_status === 'running' || activityState.run_status === 'pending ' || showProgress)
                                        && !!activityState.data_total && !!activityState.data_processed
                                        && !showUpload && (
                                        <div>
                                            <div className={classes.centering}>
                                                <Progress total={activityState?.data_total} value={activityState?.data_processed} title="Progress" />
                                            </div>
                                            <div className={classes.filename}>
                                                {formik.values.filename}
                                            </div>
                                        </div>
                                    )}

                                    {(activityState || uploadRes) && activityState?.run_status !== 'running' && !showUpload ? (
                                        activityState?.error_message || !uploadRes?.is_success || uploadRes?.error ? (
                                            <div>
                                                <div>
                                                    <div className={clsx(classes.centering, 'error', 'noflex')}>
                                                        {uploadRes?.error ? uploadRes.error
                                                            : (
                                                                <>
                                                                    <span>{t('sellerstock:Something_wrong_while_uploading_stock')}</span>
                                                                    <br />
                                                                    <span>{t('sellerstock:Download_file_for_details')}</span>
                                                                </>
                                                            )}
                                                    </div>

                                                    <Grid container spacing={3} justifyContent="center">
                                                        <Grid item xs="auto">
                                                            <Button className={classes.btn} buttonType="outlined" onClick={handleReUpload}>
                                                                {t('sellerstock:Reupload')}
                                                            </Button>
                                                        </Grid>
                                                        {!uploadRes?.error
                                                            ? (
                                                                <Grid item xs="auto">
                                                                    <Button
                                                                        className={clsx(classes.btn, 'primary')}
                                                                        buttonType="outlined"
                                                                        onClick={() => router.push(uploadRes.attachment_url)}
                                                                    >
                                                                        {t('sellerstock:Download_File')}
                                                                    </Button>
                                                                </Grid>
                                                            )
                                                            : null}
                                                    </Grid>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <div className={clsx(classes.centering, 'success')}>
                                                    {t('sellerstock:Upload_stock_has_been_completed')}
                                                </div>
                                                <div className={classes.btnContainer}>
                                                    <Button className={classes.btn} buttonType="outlined" onClick={handleReUpload}>
                                                        {t('sellerstock:Reupload')}
                                                    </Button>
                                                </div>
                                            </div>
                                        )
                                    ) : null}

                                    {showUpload && (
                                        <DropFile
                                            name="binary"
                                            error={!!(formik.touched.binary && formik.errors.binary)}
                                            helperText={(formik.touched.binary && formik.errors.binary) || ''}
                                            getBase64={handleDropFile}
                                            t={t}
                                            formik={formik}
                                        />
                                    )}
                                </>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
            <DownloadDialog {...props} title="template" />
        </div>
    );
};

export default StockUploadContent;
