/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/button-has-type */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import Link from 'next/link';
import Router from 'next/router';
import Scan from '@common_barcodescanner';
import ManualScan from '@common_manualscanner';
import useStyles from '@modules/batchlist/pages/picklistitem/scan/components/style';

const ScanItemContent = (props) => {
    const {
        pickList, incrementCount, decrementCount, handleDetect, count, setCount, handleSubmit, visibility, useCamera, t,
    } = props;
    const classes = useStyles();
    const num = /^\d+$/;

    return (
        <>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    {useCamera
                        ? (
                            <Scan
                                barcode={pickList.barcode}
                                handleDetect={handleDetect}
                                handleClose={() => Router.push(`/pickpack/batchlist/picklistitem/${pickList.id}`)}
                            />
                        )
                        : (
                            <ManualScan
                                barcode={pickList.barcode}
                                handleDetect={handleDetect}
                            />
                        )}
                    <h2 className={classes.h2}>{pickList.name}</h2>
                    <span className={classes.text}>
                        {`${t('batchlist:SKU')} ${pickList.sku} / `}
                        <b>{pickList.qty}</b>
                        {' '}
                        {t('batchlist:required')}
                    </span>
                    <br />
                    <span className={classes.text}>{t('batchlist:You_have_picked_pickListqtyPicked_item', { pickList })}</span>
                    <div style={{ marginTop: 19, display: 'flex', justifyContent: 'center' }}>
                        <button className={classes.button} style={{ marginTop: -10 }} onClick={decrementCount}> - </button>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="qtyPicked"
                            value={count}
                            onChange={(e) => {
                                if (num.test(e.target.value) || e.target.value === '') {
                                    setCount(e.target.value ? Number(e.target.value) : e.target.value);
                                }
                            }}
                            error={!num.test(count)}
                            inputProps={{
                                className: classes.InputProps,
                            }}
                        />
                        <button className={classes.button} style={{ marginTop: -6 }} onClick={incrementCount}> + </button>
                    </div>
                    <Button
                        disabled={!visibility}
                        className={classes.btn}
                        onClick={handleSubmit}
                        variant="contained"
                    >
                        {t('batchlist:Confirm')}
                    </Button>

                    <div className="hidden-mobile">
                        <Link href={`/pickpack/batchlist/picklistitem/${pickList.id}`}>
                            <a className={classes.linkBack}>{t('batchlist:Back_to_Pick_Item')}</a>
                        </Link>
                    </div>
                </div>
            </Paper>
        </>
    );
};

export default ScanItemContent;
