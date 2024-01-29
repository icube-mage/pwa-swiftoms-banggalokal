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

import DropFile from '@sellermodules/promotion/pages/discount/upload/components/dropfile';
import Progress from '@sellermodules/promotion/pages/discount/upload/components/Progress';
import useStyles from '@sellermodules/promotion/pages/discount/upload/components/style';

const StockUploadContent = (props) => {
    const {
        t, formik, handleDropFile, showProgress, activityState, firstLoad, uploadRes,
        showUpload, handleReUpload, downloadSellerDiscTemplate,
    } = props;
    const router = useRouter();
    const classes = useStyles();

    return (
        <div style={{ paddingBottom: 10 }}>
            <div className={classes.headerContainer}>
                <IconButton aria-label="back" onClick={() => router.push('/seller/promotion/discount')}>
                    <ArrowBackOutlinedIcon />
                </IconButton>
                <h2 className="title">{t('sellerpromotion:Discount_Product')}</h2>
            </div>
            <Paper className={classes.container}>
                <div className={classes.title}>
                    {t('sellerpromotion:Set_Discount_at_Once')}
                </div>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.box}>
                            <div className={classes.title}>
                                {t('sellerpromotion:Download__fill_in_CSV_files')}
                            </div>
                            <div className={classes.text}>
                                {t('sellerpromotion:Templates_can_only_be_filled_with_MS_Excel_2007_and_above_or_Libre_Office_Do_not_add_any_columns_or_rows_in_the_CSV_file')}
                            </div>
                            <div style={{ height: 10 }} />
                            <Button
                                className={classes.btn}
                                buttonType="outlined"
                                onClick={downloadSellerDiscTemplate}
                            >
                                {t('sellerpromotion:Download_Template')}
                            </Button>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.box}>
                            <div className={classes.title}>
                                {t('sellerpromotion:Upload_file_CSV')}
                            </div>
                            <div className={classes.text}>
                                {t('sellerpromotion:Select_the_CSV_file_that_you_have_updated')}
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
                                        && !!activityState.data_total && activityState.data_processed >= 0
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

                                    {/* Success */}
                                    {activityState && activityState?.run_status === 'finished' && !activityState.attachment && !showUpload
                                        && (
                                            <div>
                                                <div className={clsx(classes.centering, 'success')}>
                                                    {t('sellercatalog:Upload_product_has_been_completed')}
                                                </div>
                                                <div className={classes.btnContainer}>
                                                    <Button className={classes.btn} buttonType="outlined" onClick={handleReUpload}>
                                                        {t('sellercatalog:Reupload')}
                                                    </Button>
                                                </div>
                                            </div>
                                        )}

                                    {/* Error Activity */}
                                    {activityState && activityState?.run_status === 'finished' && activityState.attachment && !showUpload
                                        && (
                                            <div>
                                                <div className={clsx(classes.centering, 'error', 'noflex')}>
                                                    <span>{t('sellercatalog:Something_wrong_while_uploading_product')}</span>
                                                    <br />
                                                    <span>{t('sellercatalog:Download_file_for_details')}</span>
                                                </div>
                                                <Grid container spacing={3} justifyContent="center">
                                                    <Grid item xs="auto">
                                                        <Button className={classes.btn} buttonType="outlined" onClick={handleReUpload}>
                                                            {t('sellercatalog:Reupload')}
                                                        </Button>
                                                    </Grid>
                                                    <Grid item xs="auto">
                                                        <Button
                                                            className={clsx(classes.btn, 'primary')}
                                                            buttonType="outlined"
                                                            onClick={() => router.push(activityState.attachment)}
                                                        >
                                                            {t('sellercatalog:Download_File')}
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        )}

                                    {/* Error Upload */}
                                    {activityState && activityState?.run_status !== 'running' && activityState?.run_status !== 'finished'
                                        && uploadRes && uploadRes?.error && !showUpload
                                        && (
                                            <div>
                                                <div className={clsx(classes.centering, 'error', 'noflex')}>
                                                    {uploadRes.error}
                                                </div>
                                                <div className={classes.btnContainer}>
                                                    <Button className={classes.btn} buttonType="outlined" onClick={handleReUpload}>
                                                        {t('sellercatalog:Reupload')}
                                                    </Button>
                                                </div>
                                            </div>
                                        )}

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
        </div>
    );
};

export default StockUploadContent;
