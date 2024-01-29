/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/button-has-type */
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Link from 'next/link';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from '@modules/wavecreate/pages/default/components/style';
import Button from '@common_button';
import clsx from 'clsx';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Router from 'next/router';

const ScanItemContent = (props) => {
    const {
        data, loading, autoGenerate, t,
    } = props;
    const classes = useStyles();
    const disabledButton = loading || data.getSummaryShipmentToPick.total_shipments === 0;
    return (
        <>
            <h2 className={clsx(classes.h2, 'title')}>{t('createpickbywave:Pick_by_Wave')}</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    {loading ? <CircularProgress className={classes.progress} />
                        : <h2 className={clsx(classes.h2, 'total')}>{data.getSummaryShipmentToPick.total_shipments}</h2>}
                    <h2 className={clsx(classes.h2, 'totalDesc')}>
                        {t('createpickbywave:Order_ready_to_pick')}
                    </h2>
                    <p className={classes.text}>
                        {t('createpickbywave:How_would_you_like_to_process_them')}
                    </p>
                    <Button
                        className={classes.btn}
                        disabled={disabledButton}
                        variant="contained"
                        buttonType="primary-rounded"
                        onClick={() => { autoGenerate(); }}
                    >
                        <img className={classes.iconImg} src="/assets/img/receipt.svg" alt="" />
                        {t('createpickbywave:Auto_Generate_Pick_List')}
                        <ChevronRightIcon className={classes.icon} />
                    </Button>
                    <div style={{ height: 18 }} />
                    <Button
                        className={classes.btn}
                        disabled={disabledButton}
                        variant="contained"
                        buttonType="primary-rounded"
                        onClick={() => Router.push('/pickpack/wavecreate/manualorder')}
                    >
                        <img className={classes.iconImg} src="/assets/img/search_box.svg" alt="" />
                        {t('createpickbywave:Select_Order_Manually')}
                        <ChevronRightIcon className={classes.icon} />
                    </Button>
                    <Link href="/pickpack/wavelist">
                        <a className={classes.linkBack}>{t('createpickbywave:See_Created_Pick_List')}</a>
                    </Link>
                </div>
            </Paper>
        </>
    );
};

export default ScanItemContent;
