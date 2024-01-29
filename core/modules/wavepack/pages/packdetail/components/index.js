/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-nested-ternary */
import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import useStyles from '@modules/wavepack/pages/packdetail/components/style';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import clsx from 'clsx';

const BatchListPickListContent = (props) => {
    const {
        packList, handleDone, showModal, setShowModal, nextShipment, t,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    const getValueStatus = (status) => {
        if (status === 'Pick Uncomplete' || status === 'Pack Uncomplete' || status === 'pick_iuncomplete' || status === 'pack_iuncomplete') {
            return classes.red;
        }
        if (status === 'Pick In Progress' || status === 'Pack In Progress' || status === 'pick_in_progress' || status === 'pack_in_progress') {
            return classes.orange;
        }
        return classes.gray;
    };

    const getIcon = (qty_packed, qty_to_pick) => {
        if (qty_to_pick === qty_packed) {
            return classes.checkmark;
        }
        return classes.exclamation;
    };

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push(`/pickpack/wavepack/packlist/${packList.pick_id}`)}
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
            <h2 className={classes.titleTop}>{`${t('packlist:Shipment')} #${packList.id}`}</h2>
            <Paper className={classes.container}>
                <div className={classes.headerContent}>
                    <div style={{ marginBottom: 10 }}>
                        <span className={getValueStatus(packList.statusLabel || packList.statusValue)}>
                            {packList.statusLabel || packList.statusValue}
                        </span>
                    </div>
                    <div style={{ marginBottom: 10 }}>
                        <span>{`${t('packlist:Order')}: #${packList.shipmentId}`}</span>
                    </div>
                    <div>
                        <span>{`${packList.firstName} ${packList.lastName}`}</span>
                    </div>
                    <div>
                        <span>{packList.telephone}</span>
                    </div>
                    <div>
                        <span>{packList.street}</span>
                    </div>
                    <div>
                        <span>{packList.city}</span>
                    </div>
                    <div>
                        <span>{`${packList.region} ${packList.postcode}, ${packList.country}`}</span>
                    </div>
                    <div style={{ margin: '10px 0' }}>
                        <span>{packList.shipping}</span>
                    </div>
                </div>
                {/* {packList.items.slice().sort((a, b) => a.is_confirmed - b.is_confirmed).map((e) => ( */}
                {packList.items?.map((list) => (
                    <div className={classes.content} key={list.shipment_id}>
                        <div className={classes.gridList}>
                            <div className={clsx(classes.divList, 'start')}>
                                {list.image_url ? (
                                    <img src={list.image_url} alt="item" className={classes.imgList} />
                                ) : (
                                    <img src="/assets/img/placeholder_image.jpg" className={classes.imgList} alt="item-preview" />
                                )}
                            </div>
                            <div style={{ textAlign: 'left', paddingLeft: 10 }}>
                                <h5 className={classes.titleList}>{t('packlist:ITEM')}</h5>
                                <h5 className={clsx(classes.bodyList, 'bold')} style={{ textAlign: 'left', fontSize: 14 }}>
                                    {list.name}
                                </h5>
                                <h5 className={classes.bodyList} style={{ textAlign: 'left' }}>
                                    {list.sku}
                                </h5>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <h5 className={classes.titleList}>{t('packlist:QTY')}</h5>
                                <h5
                                    className={clsx(classes.bodyList, 'bold', list.qty_packed > 0 && list.qty_packed < list.qty && 'red')}
                                    style={{ fontSize: 18 }}
                                >
                                    {`${list.qty_packed}/${list.qty}`}
                                </h5>
                            </div>
                            {list.qty_packed > 0 ? (
                                <div style={{ textAlign: 'center' }}>
                                    <h5 className={classes.bodyList} style={{ textAlign: 'right' }}>
                                        <span className={getIcon(list.qty_packed, list.qty)} />
                                    </h5>
                                </div>
                            ) : null}
                        </div>
                    </div>
                ))}
            </Paper>
            <div className={classes.footer}>
                <button className={classes.btnFooter} type="submit" onClick={handleDone}>
                    {t('packlist:Done_Packing')}
                </button>
                <button
                    className={classes.btnFooterDisabled}
                    type="submit"
                    onClick={() => router.push(`/pickpack/wavepack/packlist/scan/${packList.pick_id}/${packList.entityId}`)}
                >
                    {t('packlist:Start_Scanning')}
                </button>
            </div>
            <Modal
                className={classes.modal}
                open={showModal}
                onClose={() => setShowModal(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={showModal}>
                    <div className={classes.paper}>
                        <h1 className={classes.bodyList}>
                            <span className={classes.checkmarkModal} />
                        </h1>
                        <div style={{ height: 80 }} />
                        <h1 className={clsx(classes.bodyList, 'bold')} style={{ fontSize: 28 }}>
                            {t('packlist:Pack_Complete')}
                        </h1>
                        <div style={{ height: 23 }} />
                        {nextShipment && (
                            <button
                                className={classes.btnModal}
                                type="submit"
                                onClick={() => router.push(`/pickpack/wavepack/packlist/detail/${nextShipment}`)}
                            >
                                {t('packlist:Pack_Next_Shipment')}
                            </button>
                        )}
                        <div style={{ height: 18 }} />
                        <h5 className={classes.spanBack} onClick={() => router.push(`/pickpack/wavepack/packlist/${packList.pick_id}`)}>
                            {t('packlist:Back_to_Slot_List')}
                        </h5>
                    </div>
                </Fade>
            </Modal>
        </>
    );
};

export default BatchListPickListContent;
