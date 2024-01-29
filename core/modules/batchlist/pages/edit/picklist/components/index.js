/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/button-has-type */
/* eslint-disable no-nested-ternary */
import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import clsx from 'clsx';
import useStyles from '@modules/batchlist/pages/edit/picklist/components/style';

const PickListEditContent = (props) => {
    const {
 pickList, formikDone, batchIncrementId, t,
} = props;
    const classes = useStyles();
    const router = useRouter();

    const getValueStatus = (status) => {
        if (status === 'new') {
            return classes.green;
        }
        if (status === 'pick_in_progress' || status === 'sorting_in_progress') {
            return classes.orange;
        }
        if (status === 'pick_uncomplete' || status === 'canceled') {
            return classes.red;
        }
        return classes.gray;
    };

    const getColor = (isConfirmed, picked, toPick, canceled = false) => {
        if ((isConfirmed && picked === toPick) || canceled) {
            return { backgroundColor: '#ECF0FB' };
        }
        return { backgroundColor: '#FFFFFF' };
    };

    const getIcon = (qty_picked, qty_to_pick) => {
        if (qty_to_pick === qty_picked) {
            return classes.checkmark;
        }
        return classes.exclamation;
    };

    return (
        <>
            <div style={{ position: 'relative' }}>
                <Button
                    className={classes.btnBack}
                    onClick={() => router.push(`/pickpack/batchlist/edit/${pickList.parentId}`)}
                    variant="contained"
                    style={{ marginRight: 10 }}
                >
                    <ChevronLeftIcon
                        style={{
                            fontSize: 30,
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                </Button>
                <h2 className={classes.titleTop}>{`Pick List #${pickList?.increment_id}`}</h2>
            </div>
            <Paper className={classes.container}>
                <div className={classes.headerContent}>
                    <div style={{ marginBottom: 10 }}>
                        <span className={getValueStatus(pickList.statusValue)}>{pickList.statusLabel}</span>
                    </div>
                    <div className={classes.grid}>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{`${t('batchlist:Date')} : ${pickList.date || '-'}`}</h5>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{`${t('batchlist:Batch')} #${batchIncrementId || '-'}`}</h5>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{`${t('batchlist:Picker')} : ${pickList.picker || '-'}`}</h5>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{`${t('batchlist:Total_SKU')} : ${pickList.totalItems}`}</h5>
                        </div>
                    </div>
                </div>
                {pickList.items
                    .slice()
                    .sort((a, b) => a.is_confirmed - b.is_confirmed)
                    .map((e) => (
                        <div
                            className={classes.content}
                            style={getColor(e.is_confirmed, e.qty_picked, e.qty_to_pick, pickList.statusValue === 'canceled')}
                        >
                            {pickList.statusValue === 'pick_complete'
                            || pickList.statusValue === 'pick_uncomplete'
                            || pickList.statusValue === 'canceled' ? (
                                <div className={classes.gridList}>
                                    <h5 className={classes.titleList} style={{ textAlign: 'left' }}>
                                        <span className={classes.th}>{t('batchlist:SKU')}</span>
                                        {' '}
                                        <br />
                                        <span className={classes.td}>{e.sku}</span>
                                    </h5>
                                    <h5 className={classes.titleList}>
                                        <span className={classes.th}>{t('batchlist:SKU')}</span>
                                        {' '}
                                        <br />
                                        <span className={classes.td}>{`${e.qty_picked}/${e.qty_to_pick}`}</span>
                                    </h5>
                                    <h5 className={classes.titleList}>
                                        <span className={classes.th}>{t('batchlist:LOCATION')}</span>
                                        {' '}
                                        <br />
                                        <span className={classes.td}>{e.bin_code || '-'}</span>
                                    </h5>
                                    <h5 className={classes.titleList} style={{ textAlign: 'right' }}>
                                        {e.is_confirmed ? (
                                            <span className={getIcon(e.qty_picked, e.qty_to_pick)} />
                                        ) : (
                                            <img className={classes.iconBarcode} src="/assets/img/iconbarcode.svg" alt="" />
                                        )}
                                    </h5>
                                </div>
                            ) : e.qty_picked === e.qty_to_pick ? (
                                <div className={classes.gridList}>
                                    <h5 className={classes.titleList} style={{ textAlign: 'left' }}>
                                        <span className={classes.th}>{t('batchlist:SKU')}</span>
                                        {' '}
                                        <br />
                                        <span className={classes.td}>{e.sku}</span>
                                    </h5>
                                    <h5 className={classes.titleList}>
                                        <span className={classes.th}>{t('batchlist:QTY')}</span>
                                        {' '}
                                        <br />
                                        <span className={classes.td}>{`${e.qty_picked}/${e.qty_to_pick}`}</span>
                                    </h5>
                                    <h5 className={classes.titleList}>
                                        <span className={classes.th}>{t('batchlist:LOCATION')}</span>
                                        {' '}
                                        <br />
                                        <span className={classes.td}>{e.bin_code || '-'}</span>
                                    </h5>
                                    <h5 className={classes.titleList} style={{ textAlign: 'right' }}>
                                        <span className={getIcon(e.qty_picked, e.qty_to_pick)} />
                                    </h5>
                                </div>
                            ) : (
                                <Link href={`/pickpack/batchlist/picklistitem/${e.entity_id}`}>
                                    <a>
                                        <div className={classes.gridList}>
                                            <h5 className={classes.titleList} style={{ textAlign: 'left' }}>
                                                <span className={classes.th}>{t('batchlist:SKU')}</span>
                                                {' '}
                                                <br />
                                                <span className={classes.td}>{e.sku}</span>
                                            </h5>
                                            <h5 className={classes.titleList}>
                                                <span className={classes.th}>{t('batchlist:QTY')}</span>
                                                {' '}
                                                <br />
                                                <span className={classes.td}>{`${e.qty_picked}/${e.qty_to_pick}`}</span>
                                            </h5>
                                            <h5 className={classes.titleList}>
                                                <span className={classes.th}>{t('batchlist:LOCATION')}</span>
                                                {' '}
                                                <br />
                                                <span className={classes.td}>{e.bin_code || '-'}</span>
                                            </h5>
                                            <h5 className={classes.titleList} style={{ textAlign: 'right' }}>
                                                {e.is_confirmed ? (
                                                    <span className={getIcon(e.qty_picked, e.qty_to_pick)} />
                                                ) : (
                                                    <img className={classes.iconBarcode} src="/assets/img/iconbarcode.svg" alt="" />
                                                )}
                                            </h5>
                                        </div>
                                    </a>
                                </Link>
                            )}
                        </div>
                    ))}
                {pickList.statusValue === 'pick_in_progress' ? (
                    <div className={classes.footer}>
                        <div style={{ width: '60%', display: 'inline-block', padding: 20 }}>
                            <h2>{pickList.itemsLeft}</h2>
                            <span>{t('batchlist:items_left_to_pick')}</span>
                        </div>
                        <button className={classes.btnFooter} type="submit" onClick={formikDone.handleSubmit}>
                            {t('batchlist:Done_Picking')}
                        </button>
                    </div>
                ) : null}
            </Paper>
        </>
    );
};

export default PickListEditContent;
