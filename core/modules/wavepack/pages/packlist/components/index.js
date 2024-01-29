/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-nested-ternary */
import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import useStyles from '@modules/wavepack/pages/packlist/components/style';
import Link from '@material-ui/core/Link';
import clsx from 'clsx';

const BatchListPickListContent = (props) => {
    const { packList, handleClick, t } = props;
    const classes = useStyles();
    const router = useRouter();

    const getValueStatus = (status) => {
        if (status === 'Pick Uncomplete' || status === 'Pack Uncomplete') {
            return classes.red;
        }
        if (status === 'Pick In Progress' || status === 'Pack In Progress') {
            return classes.orange;
        }
        return classes.gray;
    };

    return (
        <>
            <Button className={classes.btnBack} onClick={() => router.push('/pickpack/wavepack')} variant="contained" style={{ marginRight: 10 }}>
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
            <h2 className={classes.titleTop}>{`${t('packlist:Wave')} #${packList?.increment_id}`}</h2>
            <Paper className={classes.container}>
                <div className={classes.headerContent}>
                    <div style={{ marginBottom: 10 }}>
                        <span className={getValueStatus(packList.statusLabel)}>{packList.statusLabel}</span>
                    </div>
                    <div className={classes.grid}>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{`${t('packlist:Date')} : ${packList.date}`}</h5>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{`${t('packlist:Picker')} : ${packList.picker}`}</h5>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{`${t('packlist:Total_Shipment')} : ${packList.totalShipments}`}</h5>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{`${t('packlist:Total_SKU')} : ${packList.totalItems}`}</h5>
                        </div>
                    </div>
                </div>
                {/* {packList.items.slice().sort((a, b) => a.is_confirmed - b.is_confirmed).map((e) => ( */}
                {packList.items.map((list) => (
                    <div className={classes.content} key={list.shipment_id}>
                        <div className={classes.gridList}>
                            <div className={clsx(classes.divList, 'start')}>
                                <h5 className={clsx(classes.bodyList, 'left')}>
                                    {t('packlist:Shipment')}
                                    {' '}
                                    #
                                    {list.shipment_inc_id}
                                </h5>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                {list.slot_no?.map((e) => (
                                    <h5 className={clsx(classes.bodyList, 'size18')}>
                                        {t('packlist:Slot')}
                                        {e}
                                    </h5>
                                ))}
                            </div>
                            <div className={clsx(classes.divList, 'end')}>
                                {list.status.value === 'pick_uncomplete' || list.status.value === 'ready_for_pack' ? (
                                    <Link onClick={() => handleClick(list.shipment_id)}>
                                        <h5 className={classes.spanStart}>{t('packlist:Start_Packing')}</h5>
                                    </Link>
                                ) : (
                                    <h5 className={clsx(classes.bodyList)}>
                                        <span className={classes.checkmark} />
                                    </h5>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </Paper>
        </>
    );
};

export default BatchListPickListContent;
