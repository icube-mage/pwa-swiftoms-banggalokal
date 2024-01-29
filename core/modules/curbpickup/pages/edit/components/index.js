/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import useStyles from '@modules/curbpickup/pages/edit/components/style';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';

const CurbPickupEditContent = (props) => {
    const {
        curbPickup,
        formikConfirm,
        formikCantFullfill,
        formikPicked,
        formikPacked,
        formikComplete,
        t,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/shipment/curbpickup')}
                variant="contained"
                style={{ marginRight: 10 }}
            >
                <ChevronLeftIcon style={{
                    fontSize: 30,
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
                />
            </Button>
            <h2 className={classes.titleTop}>
                {`${t('curbsidepickup:Shipment')} #`}
                {curbPickup.shipmentNumber}
            </h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <h5 className={clsx(classes.title, 'jarak')}>
                        {`${t('curbsidepickup:Order_Number')} : `}
                        {curbPickup.orderNumber}
                    </h5>
                    <h5 className={classes.title}>
                        {curbPickup.status}
                    </h5>
                    <div className={classes.progressBar}>
                        <div className="step line">
                            <img className="imgIcon" alt="" src="/assets/img/order_status/processforpack.svg" />
                        </div>
                        <div className="step line">
                            {(curbPickup.statusValue === 'process_for_shipping') ? (
                                <img className="imgIcon" alt="" src="/assets/img/order_status/readyforpack_gray.svg" />
                            ) : <img className="imgIcon" alt="" src="/assets/img/order_status/readyforpack.svg" />}
                        </div>
                        <div className="step line">
                            {(curbPickup.statusValue === 'process_for_shipping') || (curbPickup.statusValue === 'ready_for_pack') ? (
                                <img className="imgIcon" alt="" src="/assets/img/order_status/readyforpickup_gray.svg" />
                            ) : <img className="imgIcon" alt="" src="/assets/img/order_status/readyforpickup.svg" />}
                        </div>
                        <div className="step line">
                            {(curbPickup.statusValue === 'customer_waiting') || (curbPickup.statusValue === 'customer_picked_up') ? (
                                <img className="imgIcon" alt="" src="/assets/img/order_status/customerwaiting.svg" />
                            ) : <img className="imgIcon" alt="" src="/assets/img/order_status/customerwaiting_gray.svg" />}
                        </div>
                        <div className="step">
                            {!(curbPickup.statusValue === 'customer_picked_up') ? (
                                <img className="imgIcon" alt="" src="/assets/img/order_status/customerpicked_gray.svg" />
                            ) : <img className="imgIcon" alt="" src="/assets/img/order_status/customerpicked.svg" />}
                        </div>
                    </div>
                    <hr />
                    <div className={classes.printProgress}>
                        {(curbPickup.statusValue === 'process_for_shipping') && (
                            <>
                                {t('curbsidepickup:Order_for_curbside_pickup_at')}
                                {' '}
                                {curbPickup.location}
                                <div className={classes.formFieldButton}>
                                    {!(curbPickup.allocation) ? (
                                        <>
                                            <Button
                                                className={classes.btn}
                                                type="submit"
                                                onClick={formikConfirm.handleSubmit}
                                                variant="contained"
                                            >
                                                <CheckIcon style={{ marginRight: 10 }} />
                                                {t('curbsidepickup:Confirm')}
                                            </Button>
                                            <Button
                                                className={classes.btn}
                                                type="submit"
                                                onClick={formikCantFullfill.handleSubmit}
                                                variant="contained"
                                                buttonType="outlined-rounded"
                                                style={{ marginLeft: 10 }}
                                            >
                                                <CloseIcon style={{ marginRight: 10 }} />
                                                {t('curbsidepickup:Cannot_Fulfill')}
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button
                                                className={clsx(classes.btn, 'print')}
                                                onClick={() => window.open(`/printoms/pick/${curbPickup.id}`)}
                                                variant="contained"
                                            >
                                                {t('curbsidepickup:Print_Pick_List')}
                                            </Button>
                                            <br />
                                            <Button
                                                className={classes.btn}
                                                type="submit"
                                                onClick={formikPicked.handleSubmit}
                                                variant="contained"
                                            >
                                                <CheckIcon style={{ marginRight: 10 }} />
                                                {t('curbsidepickup:Mark_Pick_Complete')}
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                        {(curbPickup.statusValue === 'ready_for_pack') && (
                            <>
                                {t('curbsidepickup:the_packing_order_is_ready_to_be_processed')}
                                <div className={classes.formFieldButton}>
                                    <Button
                                        className={clsx(classes.btn, 'print')}
                                        onClick={() => window.open(`/printoms/pack/${curbPickup.id}`)}
                                        variant="contained"
                                    >
                                        {t('curbsidepickup:Print_Pack_List')}
                                    </Button>
                                    <br />
                                    <Button
                                        className={classes.btn}
                                        onClick={formikPacked.handleSubmit}
                                        variant="contained"
                                    >
                                        {t('curbsidepickup:Mark_Pack_Complete')}
                                    </Button>
                                </div>
                            </>
                        )}
                        {(curbPickup.statusValue === 'ready_for_pickup') && (
                            <>
                                {t('curbsidepickup:Customer_is_filling_out_form')}
                                <br />
                                <div className={classes.formFieldButton}>
                                    <Button
                                        className={classes.btn}
                                        onClick={formikComplete.handleSubmit}
                                        variant="contained"
                                    >
                                        {t('curbsidepickup:Customer_Picked_Up')}
                                    </Button>
                                </div>
                            </>
                        )}
                        {(curbPickup.statusValue === 'customer_waiting') && (
                            <>
                                {t('curbsidepickup:Customer_has_been_waiting_since')}
                                {' '}
                                {curbPickup.pickup.created_at}
                                <div className={classes.formFieldButton}>
                                    <Button
                                        className={classes.btn}
                                        onClick={formikComplete.handleSubmit}
                                        variant="contained"
                                    >
                                        {t('curbsidepickup:Customer_Picked_Up')}
                                    </Button>
                                </div>
                            </>
                        )}
                        {(curbPickup.statusValue === 'customer_picked_up') && (
                            <>
                                {t('curbsidepickup:Customer_picked_up_on')}
                                <br />
                                {(curbPickup.track) ? (
                                    <>
                                        {curbPickup.track[0].created_at}
                                    </>
                                ) : <></>}
                            </>
                        )}
                    </div>
                </div>
                <div className={classes.content}>
                    <div>
                        <h5 className={classes.titleSmall}>{t('curbsidepickup:Pickup_Info')}</h5>
                        {(curbPickup.pickup) ? (
                            <>
                                <span className={classes.orderLabel}>
                                    {curbPickup.pickup.name || '-'}
                                </span>
                                <span className={classes.orderLabel}>
                                    {t('curbsidepickup:Pickup_')}
                                    {' '}
                                    {curbPickup.locName || '-'}
                                </span>
                                <span className={classes.orderLabel}>
                                    {t('curbsidepickup:Pickup_Details_')}
                                    {' '}
                                    {curbPickup.pickup.loc_details || '-'}
                                </span>
                                <span className={classes.orderLabel}>
                                    {t('curbsidepickup:Vehicle_Plate_Number_')}
                                    {' '}
                                    {curbPickup.pickup.vehicle_number || '-'}
                                </span>
                                <span className={classes.orderLabel}>
                                    {t('curbsidepickup:Vehicle_Description_')}
                                    {' '}
                                    {curbPickup.pickup.vehicle_desc || '-'}
                                </span>
                                <span className={classes.orderLabel}>
                                    {t('curbsidepickup:Notes_')}
                                    {' '}
                                    {curbPickup.pickup.notes || '-'}
                                </span>
                            </>
                        ) : <span className={classes.orderLabel}>-</span>}
                    </div>
                    <div>
                        <h5 className={classes.titleSmall}>{t('curbsidepickup:Customer_Info')}</h5>
                        <span className={classes.orderLabel}>
                            <img className="imgIcon" alt="" src="/assets/img/icon_user.png" />
                            {curbPickup.firstname}
                        </span>
                        <span className={classes.orderLabel}>
                            <img className="imgIcon" alt="" src="/assets/img/icon_phone.png" />
                            {curbPickup.shippingPhone}
                        </span>
                    </div>
                    <div>
                        <h5 className={classes.titleSmall}>{t('curbsidepickup:Items_Shipped')}</h5>
                        <div style={{ overflowX: 'auto' }}>
                            <table className={classes.table}>
                                <tbody>
                                    <tr className={classes.tr}>
                                        <th className={classes.th} style={{ paddingLeft: 0 }}>{t('curbsidepickup:SKU_Product')}</th>
                                        <th className={classes.th}>{t('curbsidepickup:Name')}</th>
                                        <th className={classes.th}>{t('curbsidepickup:Unit_Price')}</th>
                                        <th className={classes.th}>{t('curbsidepickup:QTY')}</th>
                                        <th className={classes.th}>{t('curbsidepickup:Subtotal')}</th>
                                    </tr>
                                    {curbPickup.order.map((e) => (
                                        <>
                                            <tr>
                                                <td className={classes.td} style={{ paddingLeft: 0 }}>{e.sku}</td>
                                                <td className={classes.td}>{e.name}</td>
                                                <td className={classes.td}>{e.price}</td>
                                                <td className={classes.td} style={{ textAlign: 'center' }}>{e.qty}</td>
                                                <td className={classes.td}>{e.row_total}</td>
                                            </tr>
                                            {e.bundle_children?.map((child) => (
                                                <tr>
                                                    <td className={classes.td} style={{ paddingLeft: 10 }}>{`- ${child.sku}`}</td>
                                                    <td className={classes.td}>{child.name}</td>
                                                    <td className={classes.td}>{child.price}</td>
                                                    <td className={classes.td} style={{ textAlign: 'center' }}>{child.qty}</td>
                                                </tr>
                                            ))}
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <span className={classes.orderLabel} style={{ fontWeight: '700' }}>
                            {t('curbsidepickup:Total_')}
                            {curbPickup.total}
                        </span>
                    </div>
                </div>
            </Paper>
        </>
    );
};

export default CurbPickupEditContent;
