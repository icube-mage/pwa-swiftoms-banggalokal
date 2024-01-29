/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import { useRouter } from 'next/router';
import clsx from 'clsx';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import Button from '@common_button';
import Progress from '@common_progresspercent';

import DropFile from '@sellermodules/catalog/plugins/Dropfile';
import useStyles from '@sellermodules/catalog/pages/organize/add/components/style';

const AddOrganizeContent = (props) => {
    const {
        t, formik, handleDropFile, showProgress, activityState, firstLoad, uploadRes,
        showUpload, handleReUpload,
    } = props;
    const router = useRouter();
    const classes = useStyles();

    return (
        <>
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
        </>
    );
};

export default AddOrganizeContent;
