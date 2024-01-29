/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import Link from 'next/link';
import LinkUi from '@material-ui/core/Link';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import useStyles from '@modules/batchlist/pages/edit/components/style';
import CancelIcon from '@material-ui/icons/Cancel';
import ConfirmDialog from 'core/modules/commons/ConfirmDialog';

const BatchListEditContent = (props) => {
    const {
        batchList, handleClick, formikStartSorting, handleCancelPickBatch, allowCancel, t,
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

    const getIcon = (status) => {
        if (status === 'pick_in_progress' || status === 'sorting_in_progress') {
            return classes.loading;
        }
        if (status === 'pick_uncomplete' || status === 'canceled') {
            return classes.exclamation;
        }
        return classes.checkmark;
    };

    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

    return (
        <>
            <ConfirmDialog
                open={openConfirmDialog}
                onCancel={() => setOpenConfirmDialog(false)}
                onConfirm={async () => {
                    window.backdropLoader(true);
                    handleCancelPickBatch();

                    setOpenConfirmDialog(false);
                }}
                title={t('batchlist:Confirmation')}
                message={t('batchlist:Are_you_sure_want_to_cancel_this_batch')}
            />
            <div className={classes.headerContainer}>
                <div>
                    <Button
                        className={classes.btnBack}
                        onClick={() => router.push('/pickpack/batchlist')}
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
                    <h2 className={classes.titleTop}>{`Batch #${batchList?.increment_id ?? ''}`}</h2>
                </div>
                {batchList.statusValue !== 'canceled' && allowCancel && (
                    <div>
                        <Button
                            className={classes.btnHeaderAction}
                            onClick={() => setOpenConfirmDialog(true)}
                            variant="contained"
                            style={{ marginRight: 10 }}
                        >
                            {t('batchlist:Cancel')}
                        </Button>
                    </div>
                )}
            </div>

            <Paper className={classes.container}>
                <div className={classes.headerContent}>
                    <div style={{ marginBottom: 10 }}>
                        <span className={getValueStatus(batchList.statusValue)}>{batchList.statusLabel}</span>
                    </div>
                    <div className={classes.grid}>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{`${t('batchlist:Date')} : ${batchList.date}`}</h5>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{`${t('batchlist:Total_Shipment')} : ${batchList.totalShipments}`}</h5>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{`${t('batchlist:Pick_List')} : ${batchList.picklist.length}`}</h5>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{`${t('batchlist:Total_SKU')} : ${batchList.totalItems}`}</h5>
                        </div>
                    </div>
                </div>
                {batchList.picklist.map((e) => (
                    <div className={clsx(classes.content, e.status.value)}>
                        <LinkUi onClick={() => handleClick(e.entity_id, e.status.value)}>
                            <div className={classes.gridList}>
                                <h5 className={classes.titleList} style={{ textAlign: 'left' }}>
                                    {`${t('batchlist:Pick_List')} ${e?.increment_id ?? e?.entity_id}`}
                                </h5>
                                <h5 className={classes.titleList}>{`${e.total_items} ${t('batchlist:SKU')}`}</h5>
                                <h5 className={classes.titleList}>{e.picked_by ? <>{`${t('batchlist:Picked_by')} ${e.picked_by}`}</> : null}</h5>
                                <h5 className={classes.titleList} style={{ textAlign: 'right' }}>
                                    {e.status.value === 'canceled' ? (
                                        <CancelIcon className={classes.iconCancel} />
                                    ) : !(e.status.value === 'new') ? (
                                        <span className={getIcon(e.status.value)} />
                                    ) : (
                                        <span className={classes.spanStart}>{t('batchlist:Start_Picking')}</span>
                                    )}
                                </h5>
                            </div>
                        </LinkUi>
                    </div>
                ))}
                {(batchList.statusValue === 'pick_complete' || batchList.statusValue === 'pick_uncomplete') && (
                    <>
                        <div className={classes.footer}>
                            <button className={classes.btnFooter} type="submit" onClick={formikStartSorting.handleSubmit}>
                                Start Sorting
                            </button>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0px' }}>
                            <Link href={`/pickpack/batchlist/sortinglist/${batchList?.id}`}>
                                <a className={classes.linkBack}>See Sorting List</a>
                            </Link>
                        </div>
                    </>
                )}
                {(batchList.statusValue === 'sort_uncomplete' || batchList.statusValue === 'sort_in_progress') && (
                    <>
                        <div className={classes.footer}>
                            <button
                                className={classes.btnFooter}
                                type="submit"
                                onClick={() => router.push(`/pickpack/batchlist/edit/sorting/${batchList.id}`)}
                            >
                                Continue Sorting
                            </button>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0px' }}>
                            <Link href={`/pickpack/batchlist/sortinglist/${batchList?.id}`}>
                                <a className={classes.linkBack}>See Sorting List</a>
                            </Link>
                        </div>
                    </>
                )}
            </Paper>
        </>
    );
};

export default BatchListEditContent;
