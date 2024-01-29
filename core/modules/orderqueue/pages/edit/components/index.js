/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable max-len */

import React, { useState } from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import useStyles from '@modules/orderqueue/pages/edit/components/style';
import clsx from 'clsx';
import { Formik, FieldArray } from 'formik';
import ModalFindProduct from '@modules/orderqueue/pages/edit/components/modalFindProduct';
import ModalAddProduct from '@modules/orderqueue/pages/edit/components/modalAddProduct';
import Item from '@modules/orderqueue/pages/edit/components/Item';
import ItemProcessing from '@modules/orderqueue/pages/edit/components/Item/itemProcessing';
import ConfirmDialog from '@common_confirmdialog';
import FormDialog from '@common_formdialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from 'next/link';

const OrderQueueEditContent = (props) => {
    const {
        handleAllocate, handleNew, orderQueue, parent, aclCheckData, initialValueEditItem, handleSubmitEdit, handleCancel,
        paymentLoading, paymentData, paymentError, handleViewDetail, handlePaymentApproval, t,
        getHistoryOrderItemListRes, dataShipment, isSales, handleSubmitEditProcessing, openDialog, setOpenDialog,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);

    const getClassByStatus = (status) => {
        if (status === 'failed') {
            return classes.statusFailed;
        }
        if (status === 'new') {
            return classes.statusProcessing;
        }
        if (status === 'allocating') {
            return classes.statusAllocating;
        }
        return classes.statusSuccess;
    };

    const [isModeEdit, setIsModeEdit] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [idxOpenModal, setIdxOpenModal] = useState(null);

    const handleOpenModal = (idx) => {
        setIdxOpenModal(idx);
        setIsModalOpen(true);
    };

    const defaultConfirmDialog = {
        title: t('order:Cancel_Order'),
        message: t('order:Are_you_sure_want_to_cancel_this_order'),
        onConfirm: async () => {
            await handleCancel();
        },
    };

    const [confirmDialogState, setConfirmDialogState] = useState(defaultConfirmDialog);

    const historyOrderItemList = getHistoryOrderItemListRes?.data?.getHistoryOrderItemList ?? [];
    const shipments = dataShipment?.getShipmentList?.items ?? [];

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push(parent ? `/order/${parent}` : '/order/allorder')}
                variant="contained"
                style={{ marginRight: 16 }}
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
            <h2 className={classes.titleTop}>
                {t('order:Detail_Order_')}
                {orderQueue.id}
            </h2>
            <Paper className={classes.container}>
                <div className={classes.contentHeader}>
                    <div className="divHeader">
                        <div className={getClassByStatus(orderQueue.status)}>{orderQueue.status.split('_').join(' ')}</div>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeaderWithIcon">
                            <img
                                src={orderQueue.channelIcon || '/assets/img/placeholder_image.jpg'}
                                alt=""
                                className="iconHeader"
                                onError={(event) => (event.target.style.display = 'none')}
                            />
                            {orderQueue.channelName}
                        </h5>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeader">{t('order:Channel_Order_Number')}</h5>
                        <span className="spanHeader">{orderQueue.channelOrderId || '-'}</span>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeader">{t('order:Channel_Order_Date')}</h5>
                        <span className="spanHeader">{orderQueue.createdAt || '-'}</span>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeader">{t('order:Last_Updated')}</h5>
                        <span className="spanHeader">{orderQueue.lastUpdated || '-'}</span>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeader">{t('order:Acceptance_Deadline')}</h5>
                        <span className="spanHeader">{orderQueue.acceptanceDeadline || '-'}</span>
                    </div>
                </div>

                {orderQueue.isAllowReallocate && (
                    <div className={classes.content}>
                        <div style={{ textAlign: 'center', marginBottom: 10 }}>
                            <div className={classes.orderLabel}>
                                {t('order:Order_status_is')}
                                {' '}
                                <span style={{ textTransform: 'capitalize', fontWeight: 600 }}>{orderQueue.status}</span>
                            </div>
                            <Button
                                className={classes.btn}
                                type="submit"
                                onClick={handleAllocate}
                                primary-roundedant="contained"
                                buttonType="primary-rounded"
                            >
                                {t('order:Set_as_Allocating')}
                            </Button>
                            <Button
                                className={clsx(classes.btn, 'btn-cancel')}
                                type="submit"
                                onClick={() => setOpenConfirmDialog(true)}
                                primary-rounded
                                variant="contained"
                                buttonType="primary-rounded"
                            >
                                {t('order:Cancel')}
                            </Button>
                        </div>
                    </div>
                )}

                {orderQueue.isAllowRecreate && (
                    <div className={classes.content}>
                        <div style={{ textAlign: 'center', marginBottom: 10 }}>
                            <div>
                                {t('order:Order_status_is')}
                                {' '}
                                <span style={{ textTransform: 'capitalize', fontWeight: 600 }}>{orderQueue.status}</span>
                            </div>
                            <Button
                                className={classes.btn}
                                type="submit"
                                onClick={handleNew}
                                primary-rounded
                                variant="contained"
                                buttonType="primary-rounded"
                            >
                                {t('order:Set_As_New')}
                            </Button>
                        </div>
                    </div>
                )}

                <div className={classes.content}>
                    <div className={classes.grid}>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{t('order:Customer_Info')}</h5>
                            <span className={classes.orderLabel}>
                                <img className="imgIcon" alt="" src="/assets/img/icon_user.png" />
                                {`${orderQueue.billing.firstname} ${orderQueue.billing.lastname}`}
                            </span>
                            <span className={classes.orderLabel}>
                                <img className="imgIcon" alt="" src="/assets/img/icon_email.png" />
                                {orderQueue.email}
                            </span>
                            <span className={classes.orderLabel}>
                                <img className="imgIcon" alt="" src="/assets/img/icon_phone.png" />
                                {orderQueue.billing.telephone}
                            </span>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{t('order:Billing_Address')}</h5>
                            <span className={classes.orderLabel}>{orderQueue.billing.street}</span>
                            <span className={classes.orderLabel}>{orderQueue.billing.city}</span>
                            <span className={classes.orderLabel}>
                                {`${orderQueue.billing.region}, 
                                ${orderQueue.billing.postcode}, ${orderQueue.billing.country_name}`}
                            </span>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{t('order:Shipping_Address')}</h5>
                            <span className={classes.orderLabel}>{orderQueue.shipping.street}</span>
                            <span className={classes.orderLabel}>{orderQueue.shipping.city}</span>
                            <span className={classes.orderLabel}>
                                {`${orderQueue.shipping.region},
                                ${orderQueue.shipping.postcode}, ${orderQueue.shipping.country_name}`}
                            </span>
                        </div>
                    </div>
                    <br />
                    <div className={classes.grid}>
                        <div className="grid-child" />
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{t('order:Payment_Method')}</h5>
                            <span className={classes.orderLabel} style={{ display: 'inline-block', marginRight: 5 }}>{orderQueue.channelPaymentMethod || '-'}</span>
                            {orderQueue.channelPaymentMethod
                                ? (
                                    <FormDialog
                                        labelButton={`(${t('order:View_Detail')})`}
                                        titleDialog={(
                                            <p className={classes.titleDialog}>{t('order:Payment_Information')}</p>
                                        )}
                                        open={openDialog}
                                        setOpen={setOpenDialog}
                                        message={(
                                            <>
                                                {paymentLoading ? (
                                                    <CircularProgress className={classes.progress} size={30} />
                                                ) : (
                                                    <div className={classes.contentPopUp}>
                                                        {paymentError ? (
                                                            <div>
                                                                <span>{paymentError}</span>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <div className="content-detail detailed">
                                                                    <span className="spanBold">{t('order:Bank')}</span>
                                                                    <span>{paymentData?.bank_name}</span>
                                                                    <span className="spanBold">{t('order:Destination_Account')}</span>
                                                                    <span>{paymentData?.destination_account}</span>
                                                                    <span className="spanBold">{t('order:Ref_Number')}</span>
                                                                    <span>{paymentData?.ref_number || '-'}</span>
                                                                    <span className="spanBold">{t('order:Amount_Paid')}</span>
                                                                    <span>{paymentData?.amount_paid}</span>
                                                                    <span className="spanBold">{t('order:Attachment')}</span>
                                                                    {paymentData?.attachment
                                                                        ? (
                                                                            <a
                                                                                href={paymentData?.attachment}
                                                                                download
                                                                                target="_blank"
                                                                                className="link-img"
                                                                                rel="noreferrer"
                                                                            >
                                                                                {t('order:Preview')}
                                                                                <img style={{ width: 20 }} className="imgIcon" alt="" src="/assets/img/icon_image.svg" />
                                                                            </a>
                                                                        )
                                                                        : <span>-</span>}
                                                                    <span className="spanBold">{t('order:Updated_At')}</span>
                                                                    <span>{paymentData?.created_at}</span>
                                                                    <span className="spanBold">{t('order:Approved_By')}</span>
                                                                    <span>{paymentData?.approved_by || '-'}</span>
                                                                </div>
                                                                {orderQueue.channel_order_status !== 'canceled' && (
                                                                    <>
                                                                        {!paymentData?.approved_by && (
                                                                            <div className={classes.formFieldButton}>
                                                                                <Button className={classes.btn} onClick={handlePaymentApproval} variant="contained">
                                                                                    {t('order:Approve_Payment')}
                                                                                </Button>
                                                                            </div>
                                                                        )}
                                                                    </>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </>
                                        )}
                                        onClick={handleViewDetail}
                                    />
                                )
                                : null}
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{t('order:Shipping_Method')}</h5>
                            <span className={classes.orderLabel}>{orderQueue.channelShippingMethod || '-'}</span>
                        </div>
                    </div>
                    <br />
                    <div style={{ width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <h5 className={classes.titleSmall}>{t('order:Items_Ordered')}</h5>
                            </div>
                            {parent === 'shipment_processing' && isModeEdit && (
                                <div>
                                    <Button
                                        style={{ height: '30px' }}
                                        className={classes.btn}
                                        onClick={() => {
                                            setIsModalAddOpen(true);
                                        }}
                                    >
                                        {t('order:Add')}
                                    </Button>
                                </div>
                            )}
                        </div>
                        <Formik initialValues={initialValueEditItem}>
                            {({
                                values, setFieldValue, setValues, touched, errors,
                            }) => (
                                <>
                                    <ModalAddProduct
                                        open={isModalAddOpen}
                                        handleClose={() => setIsModalAddOpen(false)}
                                        idx={values?.order_items?.length}
                                        values={values}
                                        setValues={setValues}
                                        setFieldValue={setFieldValue}
                                        initialValueEditItem={initialValueEditItem}
                                        t={t}
                                    />
                                    <ModalFindProduct
                                        open={isModalOpen}
                                        handleClose={() => setIsModalOpen(false)}
                                        idx={idxOpenModal}
                                        values={values}
                                        setFieldValue={setFieldValue}
                                        initialValueEditItem={initialValueEditItem}
                                        t={t}
                                    />
                                    <div style={{ overflowX: 'auto', overflowY: 'hidden' }}>
                                        <table className={classes.table}>
                                            <tbody>
                                                <tr className={classes.tr}>
                                                    <th className={classes.th} style={{ paddingLeft: 0 }}>
                                                        {t('order:SKU_Product')}
                                                    </th>
                                                    <th className={classes.th}>{t('order:Name')}</th>
                                                    <th className={classes.th}>
                                                        {t('order:Price')}
                                                    </th>
                                                    <th className={classes.th} style={{ textAlign: 'center' }}>
                                                        {t('order:Qty')}
                                                    </th>
                                                    <th className={classes.th}>
                                                        {t('order:Discount_Amount')}
                                                    </th>
                                                    <th className={classes.th}>{t('order:Location_Code')}</th>
                                                    {parent === 'shipment_processing'
                                                        ? <th className={classes.th}>{t('order:Replacement_For')}</th>
                                                        : <th className={classes.th}>{t('order:Pickup_At')}</th>}
                                                </tr>
                                                <FieldArray name="order_items">
                                                    {({ remove }) => (
                                                        <>
                                                            {values.order_items?.map((e, idx) => (
                                                                <>
                                                                    {parent === 'shipment_processing'
                                                                        ? (e.isChildOld ? null
                                                                            : (
                                                                                <ItemProcessing
                                                                                    channelCode={orderQueue.channelCode}
                                                                                    key={e?.id}
                                                                                    idx={idx}
                                                                                    aclCheckData={aclCheckData}
                                                                                    classes={classes}
                                                                                    setFieldValue={setFieldValue}
                                                                                    remove={remove}
                                                                                    isModeEdit={isModeEdit}
                                                                                    item={e}
                                                                                    values={values}
                                                                                    errors={errors}
                                                                                    touched={touched}
                                                                                    handleOpenModal={handleOpenModal}
                                                                                    setConfirmDialogState={setConfirmDialogState}
                                                                                    setOpenConfirmDialog={setOpenConfirmDialog}
                                                                                    t={t}
                                                                                    isChild={e?.isChild}
                                                                                    isChildOld={e?.isChildOld}
                                                                                />
                                                                            )
                                                                        )
                                                                        : (e.isChildOld ? null
                                                                            : (
                                                                                <Item
                                                                                    channelCode={orderQueue.channelCode}
                                                                                    key={e?.id}
                                                                                    idx={idx}
                                                                                    aclCheckData={aclCheckData}
                                                                                    classes={classes}
                                                                                    setFieldValue={setFieldValue}
                                                                                    remove={remove}
                                                                                    isModeEdit={isModeEdit}
                                                                                    item={e}
                                                                                    values={values}
                                                                                    errors={errors}
                                                                                    touched={touched}
                                                                                    t={t}
                                                                                    isChild={e?.isChild}
                                                                                />
                                                                            )
                                                                        )}
                                                                </>
                                                            ))}
                                                        </>
                                                    )}
                                                </FieldArray>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'end',
                                            alignItems: 'center',
                                            margin: '15px 0',
                                        }}
                                    >
                                        {aclCheckData && aclCheckData.isAccessAllowed && orderQueue.isAllowReallocate && !isSales && (
                                            <>
                                                <div>
                                                    <Button
                                                        style={{ height: '30px' }}
                                                        className={classes.btn}
                                                        onClick={() => {
                                                            if (isModeEdit) {
                                                                setConfirmDialogState({
                                                                    title: t('order:Confirmation'),
                                                                    message: t('order:There_will_be_no_salable_stock_checking_for_edited_items_Are_you_sure_you_want_to_edit_the_order_item'),
                                                                    onConfirm: async () => {
                                                                        await handleSubmitEdit(values);
                                                                    },
                                                                });
                                                                setOpenConfirmDialog(true);
                                                                return;
                                                            }
                                                            setConfirmDialogState(defaultConfirmDialog);
                                                            setIsModeEdit(true);
                                                        }}
                                                    >
                                                        {isModeEdit ? t('order:Save') : t('order:Edit_Order')}
                                                    </Button>
                                                </div>
                                                {isModeEdit && (
                                                    <div style={{ margin: '15px 15px 0px 15px' }}>
                                                        <button
                                                            type="button"
                                                            className={`link-button ${classes.btnClear}`}
                                                            onClick={() => {
                                                                setConfirmDialogState(defaultConfirmDialog);
                                                                setFieldValue('deleted_items', []);
                                                                setValues(initialValueEditItem);
                                                                setIsModeEdit(false);
                                                            }}
                                                        >
                                                            {t('order:Cancel')}
                                                        </button>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                        {parent === 'shipment_processing' && (
                                            <>
                                                <div>
                                                    <Button
                                                        style={{ height: '30px' }}
                                                        className={classes.btn}
                                                        onClick={async () => {
                                                            if (isModeEdit) {
                                                                await handleSubmitEditProcessing(values);
                                                            }
                                                            setIsModeEdit(true);
                                                        }}
                                                    >
                                                        {isModeEdit ? t('order:Save') : t('order:Edit_Order')}
                                                    </Button>
                                                </div>
                                                {isModeEdit && (
                                                    <div style={{ margin: '15px 15px 0px 15px' }}>
                                                        <button
                                                            type="button"
                                                            className={`link-button ${classes.btnClear}`}
                                                            onClick={() => {
                                                                setConfirmDialogState(defaultConfirmDialog);
                                                                setValues(initialValueEditItem);
                                                                setIsModeEdit(false);
                                                            }}
                                                        >
                                                            {t('order:Cancel')}
                                                        </button>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </>
                            )}
                        </Formik>
                    </div>
                </div>
                <div className={classes.content}>
                    <div className={classes.gridTotal}>
                        <div className="grid-child">
                            <h5 className={classes.titleSmallBlack}>{t('order:Order_Totals')}</h5>
                            <div className={classes.orderTotalContainer}>
                                <div className={classes.orderTotalItem}>{t('order:Subtotal')}</div>
                                <div className={classes.orderTotalItem} style={{ textAlign: 'right', paddingRight: '20px' }}>
                                    {orderQueue.subtotal || 0}
                                </div>
                            </div>
                            <div className={classes.orderTotalContainer}>
                                <div className={classes.orderTotalItem}>
                                    {t('order:Discount')}
                                    {orderQueue.couponCode && !orderQueue.onlyFreeShippingCouponCode
                                    && ` (${orderQueue.couponCode})`}
                                </div>
                                <div className={classes.orderTotalItem} style={{ textAlign: 'right', paddingRight: '20px' }}>
                                    {orderQueue.discount}
                                </div>
                            </div>
                            <div className={classes.orderTotalContainer}>
                                <div className={classes.orderTotalItem}>
                                    {t('order:Shipping__Handling')}
                                    {orderQueue.couponCode && !!orderQueue.onlyFreeShippingCouponCode
                                    && ` (${orderQueue.couponCode})`}
                                </div>
                                <div className={classes.orderTotalItem} style={{ textAlign: 'right', paddingRight: '20px' }}>
                                    {orderQueue.shippingCost || 0}
                                </div>
                            </div>
                            {orderQueue.aw_store_credit_amount
                                && (
                                    <div className={classes.orderTotalContainer}>
                                        <div className={classes.orderTotalItem}>{t('order:Store_Credit')}</div>
                                        <div className={classes.orderTotalItem} style={{ textAlign: 'right', paddingRight: '20px' }}>
                                            {orderQueue.aw_store_credit_amount}
                                        </div>
                                    </div>
                                )}
                            <div className={classes.orderTotalContainer}>
                                <div className={classes.orderTotalItem}>{t('order:Grand_Total')}</div>
                                <div className={classes.orderTotalItem} style={{ textAlign: 'right', paddingRight: '20px' }}>
                                    {orderQueue.grandTotal || 0}
                                </div>
                            </div>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmallBlack}>{t('order:Notes_for_This_Order')}</h5>
                            <span className={classes.dataSmallBlack}>{orderQueue.notes || '-'}</span>
                        </div>
                    </div>
                </div>
                {historyOrderItemList?.length > 0 && (
                    <div className={classes.content} style={{ marginBottom: '20px' }}>
                        <div>
                            <h5 className={classes.titleSmall}>Edit History</h5>
                        </div>
                        <div style={{ overflowX: 'auto', overflowY: 'hidden' }}>
                            <table className={classes.table}>
                                <thead>
                                    <tr className={classes.tr}>
                                        <th className={classes.th} style={{ paddingLeft: 0 }}>
                                            {t('order:Date')}
                                        </th>
                                        <th className={classes.th}>{t('order:User')}</th>
                                        <th className={classes.th}>{t('order:Comment')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {historyOrderItemList.map((e) => (
                                        <tr key={e?.id}>
                                            <td className={classes.td} style={{ paddingLeft: 0, padding: '10px 0px', verticalAlign: 'top' }}>
                                                {e?.created_at}
                                            </td>
                                            <td className={classes.td} style={{ verticalAlign: 'top', padding: '10px 0px' }}>
                                                {e?.created_by_name}
                                            </td>
                                            <td className={classes.td} style={{ verticalAlign: 'top', padding: '10px 0px' }}>
                                                <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                                                    {e?.comment?.map((elm, i) => (
                                                        <li key={i}>{elm}</li>
                                                    ))}
                                                </ul>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {shipments.length
                    ? (
                        <div className={classes.content}>
                            <div style={{ width: '100%' }}>
                                <div>
                                    <div>
                                        <h5 className={classes.titleSmall}>{t('order:Shipments')}</h5>
                                    </div>
                                </div>
                                <div style={{ overflowX: 'auto', overflowY: 'hidden' }}>
                                    <table className={classes.table}>
                                        <tbody>
                                            <tr className={classes.tr}>
                                                <th className={classes.th} style={{ paddingLeft: 0 }}>
                                                    {t('order:Shipment_Number')}
                                                </th>
                                                <th className={classes.th}>{t('order:Status')}</th>
                                                <th className={classes.th}>{t('order:Location')}</th>
                                                <th className={classes.th}>{t('order:Airwaybill_Number')}</th>
                                                <th className={classes.th}>{t('order:Action')}</th>
                                            </tr>
                                            {shipments.map((item, idx) => (
                                                <tr key={idx}>
                                                    <td className={classes.td} style={{ paddingLeft: 0 }}>
                                                        {item.increment_id}
                                                    </td>
                                                    <td className={classes.td}>{item.status.label || '-'}</td>
                                                    <td className={classes.td}>
                                                        {item.loc_code || '-'}
                                                    </td>
                                                    <td className={classes.td}>
                                                        {item.all_track.length ? item.all_track[0]?.track_number : '-'}
                                                    </td>
                                                    <td className={classes.td}>
                                                        <Link href={`/sales/shipment/edit/${item.entity_id}`}>
                                                            <a className="link-button">{t('order:View')}</a>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )
                    : null}
                <br />
            </Paper>

            <ConfirmDialog
                open={openConfirmDialog}
                onCancel={() => {
                    setOpenConfirmDialog(false);
                    setTimeout(() => setConfirmDialogState(defaultConfirmDialog), 200);
                }}
                onConfirm={async () => {
                    await confirmDialogState.onConfirm();
                    setOpenConfirmDialog(false);
                    setTimeout(() => setConfirmDialogState(defaultConfirmDialog), 200);
                }}
                title={confirmDialogState.title}
                message={confirmDialogState.message}
            />
        </>
    );
};

export default OrderQueueEditContent;
