/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/button-has-type */
import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Link from 'next/link';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from '@modules/batchcreate/pages/default/components/style';
import Button from '@common_button';
import clsx from 'clsx';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import BatchDialog from '@modules/batchcreate/pages/default/components/BatchDialog';
import gqlService from '@modules/batchcreate/services/graphql';
import Router from 'next/router';

const ScanItemContent = (props) => {
    const { formik, t } = props;
    const classes = useStyles();
    const [pickerOpen, setPickerOpen] = React.useState(false);
    const handlePickerClose = () => {
        setPickerOpen(false);
    };
    const [skuOpen, setSkuOpen] = React.useState(false);
    const handleSkuClose = () => {
        setSkuOpen(false);
    };

    const [getSummaryShipmentToPick, getSummaryShipmentToPickRes] = gqlService.getSummaryShipmentToPick();
    const disabledButton = getSummaryShipmentToPickRes?.data?.getSummaryShipmentToPick.total_shipments === 0;

    useEffect(() => {
        getSummaryShipmentToPick();
    }, []);

    return (
        <>
            <h2 className={clsx(classes.h2, 'title')}>{t('createpickbybatch:Pick_by_Batch')}</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    {
                        getSummaryShipmentToPickRes.loading
                            ? <CircularProgress className={classes.progress} /> : (
                                <h2 className={clsx(classes.h2, 'total')}>
                                    {
                                        getSummaryShipmentToPickRes
                                && getSummaryShipmentToPickRes.data
                                && getSummaryShipmentToPickRes.data.getSummaryShipmentToPick.total_shipments
                                    }
                                </h2>
                            )
                    }
                    <h2 className={clsx(classes.h2, 'totalDesc')}>{t('createpickbybatch:Order_ready_to_pick')}</h2>
                    <div style={{ height: 18 }} />
                    {
                        getSummaryShipmentToPickRes.loading
                            ? <CircularProgress className={classes.progress} /> : (
                                <h2 className={clsx(classes.h2, 'total')}>
                                    {
                                        getSummaryShipmentToPickRes
                                && getSummaryShipmentToPickRes.data
                                && getSummaryShipmentToPickRes.data.getSummaryShipmentToPick.total_items
                                    }
                                </h2>
                            )
                    }
                    <h2 className={clsx(classes.h2, 'totalDesc')}>{t('createpickbybatch:SKU_to_pick')}</h2>
                    <p className={classes.text}>{t('createpickbybatch:How_would_you_like_to_process_them')}</p>
                    <Button
                        className={classes.btn}
                        variant="contained"
                        buttonType="primary-rounded"
                        onClick={() => {
                            setPickerOpen(true);
                        }}
                        disabled={disabledButton}
                    >
                        <img className={classes.iconImg} src="/assets/img/user.svg" alt="" />
                        {t('createpickbybatch:Create_Batch_by_Picker')}
                        <ChevronRightIcon className={classes.icon} />
                    </Button>
                    <BatchDialog
                        formik={formik}
                        open={pickerOpen}
                        handleClose={handlePickerClose}
                        title={t('createpickbybatch:Picker')}
                        titleChild="picker"
                    />
                    <div style={{ height: 18 }} />
                    <Button
                        className={classes.btn}
                        variant="contained"
                        buttonType="primary-rounded"
                        onClick={() => {
                            setSkuOpen(true);
                        }}
                        disabled={disabledButton}
                    >
                        <img className={classes.iconImg} src="/assets/img/icon-tag.svg" alt="" />
                        {t('createpickbybatch:Create_Batch_by_SKU')}
                        <ChevronRightIcon className={classes.icon} />
                    </Button>
                    <BatchDialog
                        totalSku={
                            getSummaryShipmentToPickRes
                            && getSummaryShipmentToPickRes.data
                            && getSummaryShipmentToPickRes.data.getSummaryShipmentToPick.total_items
                        }
                        formik={formik}
                        open={skuOpen}
                        handleClose={handleSkuClose}
                        title={t('createpickbybatch:SKU')}
                        titleChild="SKU"
                    />
                    <div style={{ height: 18 }} />
                    <Button
                        className={classes.btn}
                        variant="contained"
                        buttonType="primary-rounded"
                        onClick={() => Router.push('/pickpack/batchcreate/manualorder')}
                        disabled={disabledButton}
                    >
                        <img className={classes.iconImg} src="/assets/img/search_box.svg" alt="" />
                        {t('createpickbybatch:Select_Order_Manually')}
                        <ChevronRightIcon className={classes.icon} />
                    </Button>
                    <Link href="/pickpack/batchlist">
                        <a className={classes.linkBack}>{t('createpickbybatch:See_Created_Batch_List')}</a>
                    </Link>
                </div>
            </Paper>
        </>
    );
};

export default ScanItemContent;
