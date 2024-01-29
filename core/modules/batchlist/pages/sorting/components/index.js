/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import Router from 'next/router';
import Scan from '@common_barcodescanner';
import ManualScan from '@common_manualscanner';
import useStyles from '@modules/batchlist/pages/sorting/components/style';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogInputSKU from '@modules/batchlist/pages/sorting/components/DialogInputSKU';
import Link from 'next/link';

const SortingItemContent = (props) => {
    const {
        handleDetect,
        handleDoneSorting,
        sortingResponse,
        config,
        loadSorting,
        allowManualConfirm,
        formik,
        useCamera,
        batchId,
        t,
        data,
    } = props;
    const classes = useStyles();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [scanMode, setScanMode] = useState(false);
    const barcodeList = data?.picklist?.length && data?.picklist[0]?.items?.map((item) => item.barcode);

    useEffect(() => {
        if (sortingResponse) {
            setScanMode(false);
        }
    }, [sortingResponse]);

    return (
        <>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    {useCamera ? (
                        <>
                            {scanMode ? (
                                <Scan handleDetect={handleDetect} handleClose={() => setScanMode(false)} barcode={barcodeList} />
                            ) : (
                                <div
                                    style={{
                                        height: '200px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <Button className={classes.btn} onClick={() => setScanMode(true)} variant="contained">
                                        {t('batchlist:SCAN')}
                                    </Button>
                                    {allowManualConfirm && (
                                        <>
                                            <DialogInputSKU
                                                formik={formik}
                                                open={isDialogOpen}
                                                handleClose={() => {
                                                    setIsDialogOpen(false);
                                                }}
                                                t={t}
                                            />
                                            <button
                                                className="link-button"
                                                type="button"
                                                style={{
                                                    border: 'none',
                                                    background: 'none',
                                                    cursor: 'pointer',
                                                    marginTop: '15px',
                                                }}
                                                onClick={() => setIsDialogOpen(true)}
                                            >
                                                {t('batchlist:Input_SKU_Manually')}
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                        </>
                    ) : (
                        <ManualScan showHint handleDetect={handleDetect} />
                    )}

                    {loadSorting && <CircularProgress className={classes.progress} />}
                    {!scanMode && !loadSorting && sortingResponse && (
                        <>
                            <h2 className={classes.h2}>{sortingResponse?.name ?? '-'}</h2>
                            <span className={classes.text}>{`${t('batchlist:SKU')} ${sortingResponse?.sku ?? '-'}`}</span>
                            <br />
                            <span className={classes.text}>{t('batchlist:Add_to')}</span>
                            {config === 'single_item' ? (
                                <span className={classes.textSlot}>{`${t('batchlist:Slot')} ${sortingResponse?.slot}`}</span>
                            ) : (
                                sortingResponse?.dataMultiple?.map((item) => (
                                    <div key={item.shipment_id} className={classes.itemSlot}>
                                        <span className={classes.textSlot}>{`${t('batchlist:Slot')} ${item.slot_no} : `}</span>
                                        <span className={classes.slotPcs}>{`${t('batchlist:QTY')} ${item.qty}`}</span>
                                    </div>
                                ))
                            )}
                        </>
                    )}
                    <br />
                    <Button className={classes.btn} onClick={handleDoneSorting} variant="contained">
                        {t('batchlist:Done_Sorting')}
                    </Button>
                    <Link href={`/pickpack/batchlist/edit/${batchId}`}>
                        <a className={classes.linkBack}>{t('batchlist:Back_to_Pick_List')}</a>
                    </Link>
                </div>
            </Paper>
        </>
    );
};

export default SortingItemContent;
