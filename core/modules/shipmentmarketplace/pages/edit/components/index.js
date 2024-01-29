/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Autocomplete from '@common_autocomplete';
import FormDialog from '@common_formdialog';
import gqlService from '@modules/shipmentmarketplace/services/graphql';
import clsx from 'clsx';
import useStyles from '@modules/shipmentmarketplace/pages/edit/components/style';
import CheckIcon from '@material-ui/icons/Check';
import { formatPriceNumber } from '@helper_currency';

const ShipmentMarketplaceEditContent = (props) => {
    const {
        shipmentMarketplace,
        formikConfirm,
        formikPicked,
        formikCanceled,
        formikPacked,
        formikShipped,
        formikDelivered,
        formikNotes,
        dataConfig,
        t,
        openCancel,
        setOpenCancel,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const [getMarketplaceCancelReason, getMarketplaceCancelReasonRes] = gqlService.getMarketplaceCancelReason();
    const [getCourierOption, getCourierOptionRes] = gqlService.getCourierOption();

    const step = () => {
        switch (shipmentMarketplace.statusValue) {
        case 'process_for_shipping':
        case 'pick_in_progress':
            return 1;
        case 'ready_for_pack':
        case 'pick_uncomplete':
            return 2;
        case 'ready_for_ship':
            return 3;
        case 'order_shipped':
            return 4;
        case 'order_delivered':
            return 5;
        default:
            return 0;
        }
    };

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/shipment/shipmentmarketplace')}
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
                {`${t('shipmentmarketplace:Marketplace')} #${shipmentMarketplace.shipmentNumber}`}
            </h2>
            <div style={{ position: 'relative' }}>
                <img
                    className={classes.headerImg}
                    alt=""
                    src={shipmentMarketplace.channelIcon}
                    onError={(event) => event.target.style.display = 'none'}
                />
            </div>
            <Paper className={classes.container}>
                <div className={classes.contentHeader}>
                    <div className="divHeader">
                        <h5 className="titleHeader">
                            {t('shipmentmarketplace:Channel_Order_Number')}
                        </h5>
                        <span className="spanHeader">{shipmentMarketplace.channelId}</span>
                    </div>
                    <div className={clsx('divHeader', 'hidden-mobile')}>
                        <h5 className="titleHeader">
                            {/* {`${shipmentMarketplace.marketplaceName || 'Marketplace'} ${t('shipmentmarketplace:marketplace:orderNumber')}`} */}
                            {t('shipmentmarketplace:Marketplace_Order_Number')}
                        </h5>
                        <span className="spanHeader">{shipmentMarketplace.orderNumber}</span>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeader">
                            {t('shipmentmarketplace:Channel_Order_Date')}
                        </h5>
                        <span className="spanHeader">{shipmentMarketplace.date}</span>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeader">
                            {t('shipmentmarketplace:Shipped_From')}
                        </h5>
                        <span className="spanHeader">{shipmentMarketplace.location}</span>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeader">
                            {t('shipmentmarketplace:Marketplace_Order_Status')}
                        </h5>
                        <span className="spanHeader">{shipmentMarketplace.marketplaceOrderStatus}</span>
                    </div>
                </div>
                <div className={classes.content}>
                    <div className="hidden-desktop">
                        <h5 className={clsx(classes.title, 'jarak')}>
                            {`${t('shipmentmarketplace:Order_Number')} : `}
                            {shipmentMarketplace.orderNumber}
                        </h5>
                        <h5 className={classes.title}>
                            {shipmentMarketplace.statusLabel}
                        </h5>
                    </div>
                    {(shipmentMarketplace.statusValue === 'canceled' || shipmentMarketplace.statusValue === 'closed') ? (
                        <div className={classes.progressBarFail}>
                            <div className="step">
                                <img className="imgIcon" alt="" src="/assets/img/order_status/cannotfulfill.svg" />
                                <div className={clsx(classes.statusLabelActive, 'hidden-mobile')}>
                                    {shipmentMarketplace.statusLabel}
                                </div>
                            </div>
                        </div>
                    )

                        : (
                            <div className={classes.progressBarContainer}>
                                <div className={classes.progressBar}>
                                    <div className="step line">
                                        <img className="imgIcon" alt="" src="/assets/img/order_status/processforpack.svg" />
                                        <div className={clsx(classes.statusLabelActive, 'hidden-mobile')}>
                                            {step() >= 1 && shipmentMarketplace.allocation === 'confirmed'
                                                ? shipmentMarketplace.statusValue === 'pick_in_progress'
                                                    ? t('shipmentmarketplace:Pick_In_Progress')
                                                    : t('shipmentmarketplace:Confirmed') : t('shipmentmarketplace:Process_for_Shipping')}
                                        </div>
                                    </div>
                                    <div className="step line">
                                        {step() >= 2 ? (
                                            <>
                                                <img className="imgIcon" alt="" src="/assets/img/order_status/readyforpack.svg" />
                                                <div className={clsx(classes.statusLabelActive, 'hidden-mobile')}>
                                                    {shipmentMarketplace.statusValue === 'pick_uncomplete'
                                                        ? t('shipmentmarketplace:Pick_Incomplete') : t('shipmentmarketplace:Ready_for_Pack')}
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <img className="imgIcon" alt="" src="/assets/img/order_status/readyforpack_gray.svg" />
                                                <div className={clsx(classes.statusLabelInactive, 'hidden-mobile')}>
                                                    {shipmentMarketplace.statusValue === 'pick_uncomplete'
                                                        ? t('shipmentmarketplace:Pick_Uncomplete') : t('shipmentmarketplace:Ready_for_Pack')}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div className="step line">
                                        {step() >= 3 ? (
                                            <>
                                                <img className="imgIcon" alt="" src="/assets/img/order_status/readyforpickup.svg" />
                                                <div className={clsx(classes.statusLabelActive, 'hidden-mobile')}>
                                                    {t('shipmentmarketplace:Ready_for_Ship')}
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <img className="imgIcon" alt="" src="/assets/img/order_status/readyforpickup_gray.svg" />
                                                <div className={clsx(classes.statusLabelInactive, 'hidden-mobile')}>
                                                    {t('shipmentmarketplace:Ready_for_Ship')}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div className="step line">
                                        {step() >= 4 ? (
                                            <>
                                                <img className="imgIcon" alt="" src="/assets/img/order_status/ordershipped.svg" />
                                                <div className={clsx(classes.statusLabelActive, 'hidden-mobile')}>
                                                    {t('shipmentmarketplace:Order_Shipped')}
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                {' '}
                                                <img className="imgIcon" alt="" src="/assets/img/order_status/ordershipped_gray.svg" />
                                                <div className={clsx(classes.statusLabelInactive, 'hidden-mobile')}>
                                                    {t('shipmentmarketplace:Order_Shipped')}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div className="step">
                                        {step() >= 5 ? (
                                            <>
                                                <img className="imgIcon" alt="" src="/assets/img/order_status/customerpicked.svg" />
                                                <div className={clsx(classes.statusLabelActive, 'hidden-mobile')}>
                                                    {t('shipmentmarketplace:Order_Delivered')}
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <img className="imgIcon" alt="" src="/assets/img/order_status/customerpicked_gray.svg" />
                                                <div className={clsx(classes.statusLabelInactive, 'hidden-mobile')}>
                                                    {t('shipmentmarketplace:Order_Delivered')}
                                                </div>

                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    <hr />
                    <div className={classes.printProgress}>
                        {(shipmentMarketplace.statusValue === 'process_for_shipping'
                            && !shipmentMarketplace.allocation) && (
                            <>
                                <div className={classes.formFieldButton}>
                                    <>
                                        <Button
                                            className={classes.btn}
                                            type="submit"
                                            onClick={formikConfirm.handleSubmit}
                                            variant="contained"
                                            style={{ marginRight: 10 }}
                                        >
                                            <CheckIcon style={{ marginRight: 10 }} />
                                            {t('shipmentmarketplace:Confirm')}
                                        </Button>
                                        <FormDialog
                                            labelButton={t('shipmentmarketplace:Cancel')}
                                            titleDialog={t('shipmentmarketplace:Cancel_Reason')}
                                            onClick={() => getMarketplaceCancelReason({
                                                variables: {
                                                    code: shipmentMarketplace.marketplaceCode,
                                                },
                                            })}
                                            open={openCancel}
                                            setOpen={setOpenCancel}
                                            message={(
                                                <>
                                                    <span className={clsx(classes.spanLabel, classes.labelRequired)}>{t('shipmentmarketplace:Cancel_Reason')}</span>
                                                    {getMarketplaceCancelReasonRes.data?.getMarketplaceCancelReason
                                                            && getMarketplaceCancelReasonRes.data?.getMarketplaceCancelReason?.length
                                                        ? (
                                                            <Autocomplete
                                                                className={clsx(classes.autocompleteRoot, 'popup')}
                                                                mode="server"
                                                                value={getMarketplaceCancelReasonRes.data?.getMarketplaceCancelReason?.find(
                                                                    (opt) => opt.value === formikCanceled.values.reason,
                                                                )}
                                                                onChange={(e) => formikCanceled.setFieldValue('reason', e.value)}
                                                                loading={getMarketplaceCancelReasonRes.loading}
                                                                options={
                                                                        getMarketplaceCancelReasonRes?.data?.getMarketplaceCancelReason || []
                                                                }
                                                                getOptions={getMarketplaceCancelReason}
                                                                error={!!(formikCanceled.touched.reason && formikCanceled.errors.reason)}
                                                                helperText={(formikCanceled.touched.reason && formikCanceled.errors.reason) || ''}
                                                                primaryKey="value"
                                                                labelKey="label"
                                                                getOptionsVariables={{
                                                                    variables: {
                                                                        code: shipmentMarketplace.marketplaceCode,
                                                                    },
                                                                }}
                                                            />
                                                        )
                                                        : (
                                                            <TextField
                                                                className={classes.cancelFieldRoot}
                                                                variant="outlined"
                                                                name="reason"
                                                                value={formikCanceled.values.reason}
                                                                onChange={formikCanceled.handleChange}
                                                                error={!!(formikCanceled.touched.reason && formikCanceled.errors.reason)}
                                                                helperText={(formikCanceled.touched.reason && formikCanceled.errors.reason) || ''}
                                                                InputProps={{
                                                                    className: classes.cancelFieldInput,
                                                                }}
                                                            />
                                                        )}
                                                    <div className={classes.formFieldButton}>
                                                        <Button
                                                            className={classes.btn}
                                                            onClick={formikCanceled.handleSubmit}
                                                            variant="contained"
                                                        >
                                                            {t('shipmentmarketplace:Submit')}
                                                        </Button>
                                                    </div>
                                                </>
                                            )}
                                        />
                                    </>
                                </div>
                            </>
                        )}

                        {((shipmentMarketplace.statusValue === 'process_for_shipping'
                            || shipmentMarketplace.statusValue === 'pick_in_progress')
                            && shipmentMarketplace.allocation) && (
                            <>
                                {dataConfig
                                    ? (
                                        <>
                                            <div className={classes.formFieldButton}>
                                                <Button
                                                    className={clsx(classes.btn, 'print')}
                                                    onClick={() => window.open(`/printoms/pick/${shipmentMarketplace.id}`)}
                                                    variant="contained"
                                                >
                                                    {t('shipmentmarketplace:Print_Pick_List')}
                                                </Button>

                                                <Button
                                                    className={classes.btn}
                                                    onClick={formikPicked.handleSubmit}
                                                    variant="contained"
                                                    style={{ marginLeft: 10 }}
                                                >
                                                    <CheckIcon style={{ marginRight: 10 }} />
                                                    {t('shipmentmarketplace:Mark_Pick_Complete')}
                                                </Button>
                                            </div>
                                        </>
                                    )
                                    : (
                                        <>
                                            <span className={classes.spanText}>{t('shipmentmarketplace:Enter_shipping_and_tracking_information')}</span>
                                            <TextField
                                                className={classes.fieldRoot}
                                                label={t('shipmentmarketplace:AWB_Number')}
                                                variant="outlined"
                                                name="awb"
                                                value={formikShipped.values.awb}
                                                onChange={formikShipped.handleChange}
                                                error={!!(formikShipped.touched.awb && formikShipped.errors.awb)}
                                                helperText={(formikShipped.touched.awb && formikShipped.errors.awb) || ''}
                                                InputProps={{
                                                    className: classes.fieldInput,
                                                }}
                                                style={{ marginBottom: 0 }}
                                            />
                                            <div className={classes.formFieldButton}>
                                                <Button
                                                    className={classes.btn}
                                                    onClick={formikShipped.handleSubmit}
                                                    variant="contained"
                                                >
                                                    {t('shipmentmarketplace:Order_Shipped')}
                                                </Button>
                                            </div>
                                        </>
                                    )}
                            </>
                        )}

                        {(shipmentMarketplace.statusValue === 'ready_for_pack'
                            || shipmentMarketplace.statusValue === 'pick_uncomplete') && (
                            <>
                                {dataConfig
                                    ? (
                                        <>
                                            <div className={classes.formFieldButton}>
                                                <Button
                                                    className={clsx(classes.btn, 'print')}
                                                    onClick={() => window.open(`/printoms/pack/${shipmentMarketplace.id}`)}
                                                    variant="contained"
                                                >
                                                    {t('shipmentmarketplace:Print_Pack_List')}
                                                </Button>

                                                <Button
                                                    className={classes.btn}
                                                    onClick={formikPacked.handleSubmit}
                                                    variant="contained"
                                                    style={{ marginLeft: 10 }}

                                                >
                                                    <CheckIcon style={{ marginRight: 10 }} />
                                                    {t('shipmentmarketplace:Mark_Pack_Complete')}
                                                </Button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <span className={classes.spanText}>{t('shipmentmarketplace:Enter_shipping_and_tracking_information')}</span>
                                            <TextField
                                                className={classes.fieldRoot}
                                                label={t('shipmentmarketplace:AWB_Number')}
                                                variant="outlined"
                                                name="awb"
                                                value={formikShipped.values.awb}
                                                onChange={formikShipped.handleChange}
                                                error={!!(formikShipped.touched.awb && formikShipped.errors.awb)}
                                                helperText={(formikShipped.touched.awb && formikShipped.errors.awb) || ''}
                                                InputProps={{
                                                    className: classes.fieldInput,
                                                }}
                                                style={{ marginBottom: 0 }}
                                            />
                                            <div className={classes.formFieldButton}>
                                                <Button
                                                    className={classes.btn}
                                                    onClick={formikShipped.handleSubmit}
                                                    variant="contained"
                                                >
                                                    {t('shipmentmarketplace:Order_Shipped')}
                                                </Button>
                                            </div>
                                        </>
                                    )}

                            </>
                        )}

                        {(shipmentMarketplace.statusValue === 'ready_for_ship') && (
                            <>
                                <div>
                                    <span className={classes.spanText}>{t('shipmentmarketplace:Enter_shipping_and_tracking_information')}</span>
                                    <TextField
                                        className={classes.fieldRoot}
                                        label={t('shipmentmarketplace:AWB_Number')}
                                        variant="outlined"
                                        name="awb"
                                        value={formikShipped.values.awb}
                                        onChange={formikShipped.handleChange}
                                        error={!!(formikShipped.touched.awb && formikShipped.errors.awb)}
                                        helperText={(formikShipped.touched.awb && formikShipped.errors.awb) || ''}
                                        InputProps={{
                                            className: classes.fieldInput,
                                        }}
                                    />
                                    <div className={classes.formFieldButton2}>
                                        <Button
                                            className={classes.btn}
                                            onClick={formikShipped.handleSubmit}
                                            variant="contained"
                                        >
                                            {t('shipmentmarketplace:Order_Shipped')}
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )}
                        {(shipmentMarketplace.statusValue === 'order_shipped' && !shipmentMarketplace.awb) && (
                            <div>
                                <span className={classes.spanText}>{t('shipmentmarketplace:Enter_shipping_and_tracking_information')}</span>
                                <TextField
                                    className={classes.fieldRoot}
                                    label={t('shipmentmarketplace:AWB_Number')}
                                    variant="outlined"
                                    name="awb"
                                    value={formikShipped.values.awb}
                                    onChange={formikShipped.handleChange}
                                    error={!!(formikShipped.touched.awb && formikShipped.errors.awb)}
                                    helperText={(formikShipped.touched.awb && formikShipped.errors.awb) || ''}
                                    InputProps={{
                                        className: classes.fieldInput,
                                    }}
                                />
                                <div className={classes.formFieldButton2}>
                                    <Button
                                        className={classes.btn}
                                        onClick={formikShipped.handleSubmit}
                                        variant="contained"
                                    >
                                        {t('shipmentmarketplace:Order_Shipped')}
                                    </Button>
                                </div>
                            </div>
                        )}
                        {(shipmentMarketplace.statusValue === 'order_shipped' && (shipmentMarketplace.awb)) && (
                            <>
                                {(shipmentMarketplace.awb) ? (
                                    <span className={classes.orderLabel} style={{ marginBottom: 10 }}>
                                        {`${t('shipmentmarketplace:AWB_Number')} : ${shipmentMarketplace.awb.title} ${shipmentMarketplace.awb.track_number}`}
                                    </span>
                                ) : (
                                    <span className={classes.orderLabel} style={{ marginBottom: 10 }}>
                                        {t('shipmentmarketplace:AWB_Number')}
                                        {' '}
                                        : -
                                    </span>
                                )}
                                <div className={classes.formFieldButton2}>
                                    {shipmentMarketplace.awb?.track_number ? (
                                        <Button
                                            className={classes.btn}
                                            type="submit"
                                            onClick={() => router.push(`/printoms/shippinglabel/${shipmentMarketplace.id}`)}
                                            variant="contained"
                                            buttonType="outlined-rounded"
                                            style={{ marginRight: 10 }}
                                        >
                                            {t('shipmentmarketplace:Print_Shipping_Label')}
                                        </Button>
                                    ) : (
                                        null
                                    )}
                                    <Button
                                        className={classes.btn}
                                        onClick={formikDelivered.handleSubmit}
                                        variant="contained"
                                    >
                                        {t('shipmentmarketplace:Mark_as_Delivered')}
                                    </Button>
                                </div>
                            </>
                        )}
                        {(shipmentMarketplace.statusValue === 'order_delivered') && (
                            <>
                                {(shipmentMarketplace.awb) ? (
                                    <span className={classes.orderLabel}>
                                        {`${t('shipmentmarketplace:AWB_Number')} : ${shipmentMarketplace.awb.title} ${shipmentMarketplace.awb.track_number}`}
                                    </span>
                                ) : (
                                    <span className={classes.orderLabel}>
                                        {t('shipmentmarketplace:AWB_Number')}
                                        {' '}
                                        : -
                                    </span>
                                )}
                                <span className={classes.orderLabel} style={{ marginBottom: 10 }}>
                                    {`Delivered on : ${shipmentMarketplace.updated} `}
                                </span>
                            </>
                        )}
                    </div>
                </div>
                <div className={classes.content}>
                    <div className={classes.grid}>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{t('shipmentmarketplace:Customer_Info')}</h5>
                            <span className={classes.orderLabel}>
                                <img className="imgIcon" alt="" src="/assets/img/icon_user.png" />
                                {`${shipmentMarketplace.firstname} ${shipmentMarketplace.lastname}`}
                            </span>
                            <span className={classes.orderLabel}>
                                <img className="imgIcon" alt="" src="/assets/img/icon_email.png" />
                                {shipmentMarketplace.email}
                            </span>
                            <span className={classes.orderLabel}>
                                <img className="imgIcon" alt="" src="/assets/img/icon_phone.png" />
                                {shipmentMarketplace.phone}
                            </span>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{t('shipmentmarketplace:Shipping_Address')}</h5>
                            <span className={classes.orderLabel}>{shipmentMarketplace.shippingAddress.street}</span>
                            <span className={classes.orderLabel}>{shipmentMarketplace.shippingAddress.city}</span>
                            <span className={classes.orderLabel}>
                                {`${shipmentMarketplace.shippingAddress.region}, ${shipmentMarketplace.shippingAddress.postcode}, ${shipmentMarketplace.shippingAddress.country_name}`}
                            </span>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{t('shipmentmarketplace:Shipping_Method')}</h5>
                            <span className={classes.orderLabel}>{`${shipmentMarketplace.method} (AWB Source : ${shipmentMarketplace.awbSource})`}</span>
                        </div>
                    </div>
                    <div>
                        <h5 className={classes.titleSmall}>{t('shipmentmarketplace:Items_Shipped')}</h5>
                        <div style={{ overflowX: 'auto' }}>
                            <table className={classes.table}>
                                <tbody>
                                    <tr className={classes.tr}>
                                        <th className={classes.th} style={{ paddingLeft: 0 }}>{t('shipmentmarketplace:SKU')}</th>
                                        <th className={classes.th}>{t('shipmentmarketplace:Name')}</th>
                                        <th className={classes.th} style={{ textAlign: 'right' }}>{t('shipmentmarketplace:Unit_Price')}</th>
                                        <th className={classes.th} style={{ textAlign: 'center' }}>{t('shipmentmarketplace:QTY')}</th>
                                        <th className={classes.th} style={{ textAlign: 'right' }}>{t('shipmentmarketplace:Subtotal')}</th>
                                    </tr>
                                    {shipmentMarketplace.order?.map((e) => (
                                        <>
                                            <tr>
                                                <td className={classes.td} style={{ paddingLeft: 0 }}>{e.sku}</td>
                                                <td className={classes.td}>{e.name}</td>
                                                <td className={classes.td} style={{ textAlign: 'right' }}>{formatPriceNumber(e.base_price)}</td>
                                                <td className={classes.td} style={{ textAlign: 'center' }}>{e.qty_shipped}</td>
                                                <td className={classes.td} style={{ textAlign: 'right' }}>{formatPriceNumber(e.row_total)}</td>
                                            </tr>
                                            {e.bundle_children?.map((child) => (
                                                <tr>
                                                    <td className={classes.td} style={{ paddingLeft: 10 }}>{`- ${child.sku}`}</td>
                                                    <td className={classes.td}>{child.name}</td>
                                                    <td className={classes.td} style={{ textAlign: 'right' }}>{formatPriceNumber(child.base_price)}</td>
                                                    <td className={classes.td} style={{ textAlign: 'center' }}>{child.qty_shipped}</td>
                                                </tr>
                                            ))}
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className={classes.content}>
                    <h5 className={classes.titleSmall}>{t('shipmentmarketplace:Status_History')}</h5>
                    <table className={classes.table}>
                        <tbody>
                            <tr className={classes.tr}>
                                <th className={classes.th} style={{ paddingLeft: 0 }}>{t('shipmentmarketplace:Date')}</th>
                                <th className={classes.th}>{t('shipmentmarketplace:Status')}</th>
                                <th className={classes.th}>{t('shipmentmarketplace:Notes')}</th>
                            </tr>
                            {shipmentMarketplace.history && shipmentMarketplace.history.length ? shipmentMarketplace.history.map((e) => {
                                const date = new Date(e.created_at);
                                return (
                                    <tr>
                                        <td className={classes.td} style={{ paddingLeft: 0 }}>
                                            {date.toLocaleString('en-US', {
                                                day: 'numeric',
                                                year: 'numeric',
                                                month: 'short',
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                second: 'numeric',
                                            })}
                                        </td>
                                        <td className={clsx(classes.td, 'status')}>{e.status.split('_').join(' ')}</td>
                                        <td className={classes.td}>{e.comment}</td>
                                    </tr>
                                );
                            })
                                : (
                                    <tr>
                                        <td className={classes.td} style={{ paddingLeft: 0 }}>-</td>
                                        <td className={classes.td}>-</td>
                                        <td className={classes.td}>-</td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>
                <div className={classes.content}>
                    <h5 className={classes.titleSmall}>{t('shipmentmarketplace:Notes_for_this_Shipment')}</h5>
                    <TextField
                        className={clsx(classes.fieldRoot, 'fieldNotes')}
                        variant="outlined"
                        multiline
                        rows={4}
                        name="notes"
                        value={formikNotes.values.notes}
                        onChange={formikNotes.handleChange}
                        error={!!(formikNotes.touched.notes && formikNotes.errors.notes)}
                        helperText={(formikNotes.touched.notes && formikNotes.errors.notes) || ''}
                    />
                    <div className={classes.formFieldButton}>
                        <Button
                            className={classes.btn}
                            type="submit"
                            onClick={formikNotes.handleSubmit}
                            variant="contained"
                        >
                            {t('shipmentmarketplace:Save')}
                        </Button>
                    </div>
                </div>
            </Paper>
        </>
    );
};

export default ShipmentMarketplaceEditContent;
