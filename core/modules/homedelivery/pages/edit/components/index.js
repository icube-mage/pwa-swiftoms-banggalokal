/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';

import TextField from '@common_textfield';
import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Autocomplete from '@common_autocomplete';
import FormDialog from '@common_formdialog';
import { formatPriceNumber } from '@helper_currency';
import TimeSlotModal from '@modules/homedelivery/pages/list/components/timeslotmodal';

import gqlService from '@modules/homedelivery/services/graphql';
import useStyles from '@modules/homedelivery/pages/edit/components/style';

import Paper from '@material-ui/core/Paper';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import CircularProgress from '@material-ui/core/CircularProgress';

const HomeDeliveryEditContent = (props) => {
    const {
        homeDelivery,
        formikConfirm,
        formikCantFullfill,
        formikPicked,
        formikCanceled,
        formikPacked,
        formikCourier,
        formikShipped,
        formikDelivered,
        formikNotes,
        formikCancelCourier,
        pickPackEnable,
        allowReallocation,
        handleClickTrack,
        dataTracking,
        dataTrackingError,
        loadingTracking,
        t,
        openTimeSlot,
        setOpenTimeSlot,
        openCancel,
        setOpenCancel,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const [getShipmentCancelReason, getShipmentCancelReasonRes] = gqlService.getShipmentCancelReason();
    const [getCourierOption, getCourierOptionRes] = gqlService.getCourierOption();

    const step = () => {
        switch (homeDelivery.statusValue) {
        case 'process_for_shipping':
        case 'pick_in_progress':
            return 1;
        case 'ready_for_pack':
        case 'pick_uncomplete':
            return 2;
        case 'ready_for_ship':
        case 'shipment_booked':
        case 'gosend_rejected':
            return 3;
        case 'order_shipped':
            return 4;
        case 'order_delivered':
            return 5;
        case 'canceled':
            return 6;
        case 'closed':
            return 7;
        default:
            return 0;
        }
    };

    const classBooked = (statusValue) => {
        if (statusValue === 'shipment_booked') {
            return clsx(classes.progressBar, 'progressBar-booked');
        }
        return classes.progressBar;
    };

    const bookCourierLabel = t('homedelivery:Book__Courier').split('$')[0] + homeDelivery.courier + t('homedelivery:Book__Courier').split('$')[1];
    const cancelCourierLabel = t('homedelivery:Cancel__Courier').split('$')[0] + homeDelivery.courier + t('homedelivery:Cancel__Courier').split('$')[1];

    return (
        <>
            <Button className={classes.btnBack} onClick={() => router.push('/shipment/homedelivery')} variant="contained" style={{ marginRight: 10 }}>
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
            <h2 className={classes.titleTop}>{`${t('homedelivery:Home_Delivery')} #${homeDelivery.shipmentNumber}`}</h2>
            <Paper className={classes.container}>
                <div className={classes.contentHeader}>
                    <div className={clsx('divHeader', 'hidden-mobile')}>
                        <h5 className="titleHeader">{t('homedelivery:Channel_Order_Number')}</h5>
                        <span className="spanHeader">{homeDelivery.orderNumber}</span>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeader">{t('homedelivery:Channel_Order_Date')}</h5>
                        <span className="spanHeader">{homeDelivery.date}</span>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeader">{t('homedelivery:Shipped_From')}</h5>
                        <span className="spanHeader">{homeDelivery.location}</span>
                    </div>
                </div>
                <div className={classes.content}>
                    <div className="hidden-desktop">
                        <h5 className={clsx(classes.title, 'jarak')}>
                            {`${t('homedelivery:Order_Number')} : `}
                            {homeDelivery.orderNumber}
                        </h5>
                        <h5 className={classes.title}>
                            {homeDelivery.statusLabel}
                        </h5>
                    </div>
                    {homeDelivery.allocation === 'cannot_fulfill' || step() === 0 || step() >= 6 ? (
                        <div className={classes.progressBarFail}>
                            <div className="step">
                                <img className="imgIcon" alt="" src="/assets/img/order_status/cannotfulfill.svg" />
                                <div className={clsx(classes.statusLabelActive, 'hidden-mobile')}>{homeDelivery.statusLabel}</div>
                            </div>
                        </div>
                    ) : (
                        <div className={classes.progressBarContainer}>
                            <div className={classBooked(homeDelivery.statusValue)}>
                                <div className="step line">
                                    <img className="imgIcon" alt="" src="/assets/img/order_status/processforpack.svg" />
                                    <div className={clsx(classes.statusLabelActive, 'hidden-mobile')}>
                                        {step() >= 1 && homeDelivery.allocation === 'confirmed'
                                            ? homeDelivery.statusValue === 'pick_in_progress'
                                                ? t('homedelivery:Pick_In_Progress')
                                                : t('homedelivery:Confirmed')
                                            : t('homedelivery:Process_for_Shipping')}
                                    </div>
                                </div>
                                <div className="step line">
                                    {step() >= 2 ? (
                                        <>
                                            <img className="imgIcon" alt="" src="/assets/img/order_status/readyforpack.svg" />
                                            <div className={clsx(classes.statusLabelActive, 'hidden-mobile')}>
                                                {homeDelivery.statusValue === 'pick_uncomplete' ? t('homedelivery:Pick_Incomplete') : t('homedelivery:Ready_for_Pack')}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <img className="imgIcon" alt="" src="/assets/img/order_status/readyforpack_gray.svg" />
                                            <div className={clsx(classes.statusLabelInactive, 'hidden-mobile')}>
                                                {homeDelivery.statusValue === 'pick_uncomplete' ? t('homedelivery:Pick_Incomplete') : t('homedelivery:Ready_for_Pack')}
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="step line">
                                    {step() >= 3 ? (
                                        <>
                                            <img className="imgIcon" alt="" src="/assets/img/order_status/readyforpickup.svg" />
                                            <div className={clsx(classes.statusLabelActive, 'hidden-mobile')}>{t('homedelivery:Ready_for_Ship')}</div>
                                        </>
                                    ) : (
                                        <>
                                            <img className="imgIcon" alt="" src="/assets/img/order_status/readyforpickup_gray.svg" />
                                            <div className={clsx(classes.statusLabelInactive, 'hidden-mobile')}>{t('homedelivery:Ready_for_Ship')}</div>
                                        </>
                                    )}
                                </div>
                                {homeDelivery.statusValue === 'shipment_booked'
                                    && (
                                        <div className="step line">
                                            <img className="imgIcon" alt="" src="/assets/img/order_status/shipmentbooked.svg" />
                                            <div className={clsx(classes.statusLabelActive, 'hidden-mobile')}>{t('homedelivery:Courier_Booked')}</div>
                                        </div>
                                    )}
                                <div className="step line">
                                    {step() >= 4 ? (
                                        <>
                                            <img className="imgIcon" alt="" src="/assets/img/order_status/ordershipped.svg" />
                                            <div className={clsx(classes.statusLabelActive, 'hidden-mobile')}>{t('homedelivery:Order_Shipped')}</div>
                                        </>
                                    ) : (
                                        <>
                                            <img className="imgIcon" alt="" src="/assets/img/order_status/ordershipped_gray.svg" />
                                            <div className={clsx(classes.statusLabelInactive, 'hidden-mobile')}>{t('homedelivery:Order_Shipped')}</div>
                                        </>
                                    )}
                                </div>
                                <div className="step">
                                    {step() >= 5 ? (
                                        <>
                                            <img className="imgIcon" alt="" src="/assets/img/order_status/customerpicked.svg" />
                                            <div className={clsx(classes.statusLabelActive, 'hidden-mobile')}>{t('homedelivery:Order_Delivered')}</div>
                                        </>
                                    ) : (
                                        <>
                                            <img className="imgIcon" alt="" src="/assets/img/order_status/customerpicked_gray.svg" />
                                            <div className={clsx(classes.statusLabelInactive, 'hidden-mobile')}>{t('homedelivery:Order_Delivered')}</div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    <hr />
                    <div className={classes.printProgress}>
                        {homeDelivery.statusValue === 'process_for_shipping' && !homeDelivery.allocation && (
                            <>
                                <div className={classes.formFieldButton}>
                                    <Button
                                        className={classes.btn}
                                        type="submit"
                                        onClick={formikConfirm.handleSubmit}
                                        variant="contained"
                                        buttonType="primary-rounded"
                                        style={{ marginRight: 10 }}
                                    >
                                        <CheckIcon style={{ marginRight: 10 }} />
                                        {t('homedelivery:Confirm')}
                                    </Button>
                                    <Button
                                        className={classes.btn}
                                        type="submit"
                                        onClick={formikCantFullfill.handleSubmit}
                                        variant="contained"
                                        buttonType="outlined-rounded"
                                        style={{ marginRight: 10 }}
                                    >
                                        <CloseIcon style={{ marginRight: 10 }} />
                                        {t('homedelivery:Cannot_Fulfill')}
                                    </Button>

                                    <FormDialog
                                        labelButton={t('homedelivery:Cancel')}
                                        titleDialog={t('homedelivery:Cancel')}
                                        open={openCancel}
                                        setOpen={setOpenCancel}
                                        message={(
                                            <>
                                                <span className={clsx(classes.spanLabel, classes.labelRequired)}>{t('homedelivery:Cancel_Reason')}</span>
                                                <Autocomplete
                                                    className={clsx(classes.autocompleteRoot, 'popup')}
                                                    mode="lazy"
                                                    value={formikCanceled.values.reason}
                                                    onChange={(e) => formikCanceled.setFieldValue('reason', e)}
                                                    loading={getShipmentCancelReasonRes.loading}
                                                    options={
                                                        getShipmentCancelReasonRes
                                                        && getShipmentCancelReasonRes.data
                                                        && getShipmentCancelReasonRes.data.getShipmentCancelReason
                                                    }
                                                    getOptions={getShipmentCancelReason}
                                                    error={!!(formikCanceled.touched.reason && formikCanceled.errors.reason)}
                                                    helperText={(formikCanceled.touched.reason && formikCanceled.errors.reason) || ''}
                                                    primaryKey="value"
                                                    labelKey="label"
                                                />
                                                <div className={classes.formFieldButton}>
                                                    <Button className={classes.btn} onClick={formikCanceled.handleSubmit} variant="contained">
                                                        {t('homedelivery:Submit')}
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    />
                                </div>
                            </>
                        )}

                        {homeDelivery.statusValue === 'process_for_shipping' && homeDelivery.allocation === 'cannot_fulfill' && (
                            <>
                                <div className={classes.formFieldButton}>
                                    <Button
                                        className={classes.btn}
                                        onClick={() => {
                                            if (!allowReallocation) {
                                                window.toastMessage({
                                                    open: true,
                                                    text: t('homedelivery:Access_Forbiden'),
                                                    variant: 'error',
                                                });
                                                return;
                                            }

                                            router.push(`/sales/shipment/edit/${homeDelivery.id}`);
                                        }}
                                        variant="contained"
                                    >
                                        {t('homedelivery:Reallocating_Order')}
                                    </Button>
                                </div>
                            </>
                        )}

                        {step() === 1 && homeDelivery.allocation === 'confirmed' && (
                            <>
                                <div className={classes.formFieldButton}>
                                    {pickPackEnable ? (
                                        <>
                                            <Button
                                                className={clsx(classes.btn, 'print')}
                                                onClick={() => window.open(`/printoms/pick/${homeDelivery.id}`)}
                                                variant="contained"
                                            >
                                                {t('homedelivery:Print_Pick_List')}
                                            </Button>
                                            <Button
                                                className={classes.btn}
                                                onClick={formikPicked.handleSubmit}
                                                variant="contained"
                                                style={{ marginLeft: 10, marginRight: 10 }}
                                            >
                                                <CheckIcon style={{ marginRight: 10 }} />
                                                {t('homedelivery:Mark_Pick_Complete')}
                                            </Button>
                                            <FormDialog
                                                labelButton={t('homedelivery:Cancel')}
                                                titleDialog={t('homedelivery:Cancel_Reason')}
                                                open={openCancel}
                                                setOpen={setOpenCancel}
                                                message={(
                                                    <>
                                                        <span className={clsx(classes.spanLabel, classes.labelRequired)}>{t('homedelivery:Cancel_Reason')}</span>
                                                        <Autocomplete
                                                            className={clsx(classes.autocompleteRoot, 'popup')}
                                                            mode="lazy"
                                                            value={formikCanceled.values.reason}
                                                            onChange={(e) => formikCanceled.setFieldValue('reason', e)}
                                                            loading={getShipmentCancelReasonRes.loading}
                                                            options={
                                                                getShipmentCancelReasonRes
                                                                && getShipmentCancelReasonRes.data
                                                                && getShipmentCancelReasonRes.data.getShipmentCancelReason
                                                            }
                                                            getOptions={getShipmentCancelReason}
                                                            error={!!(formikCanceled.touched.reason && formikCanceled.errors.reason)}
                                                            helperText={(formikCanceled.touched.reason && formikCanceled.errors.reason) || ''}
                                                            primaryKey="value"
                                                            labelKey="label"
                                                        />
                                                        <div className={classes.formFieldButton}>
                                                            <Button className={classes.btn} onClick={formikCanceled.handleSubmit} variant="contained">
                                                                {t('homedelivery:Submit')}
                                                            </Button>
                                                        </div>
                                                    </>
                                                )}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <div>
                                                {(homeDelivery.allowBookCourier && homeDelivery.statusValue !== 'pick_in_progress') && (
                                                    <Button
                                                        className={classes.btn}
                                                        onClick={formikCourier.handleSubmit}
                                                        variant="contained"
                                                        style={{ marginRight: 10 }}
                                                    >
                                                        {bookCourierLabel}
                                                    </Button>
                                                )}
                                                <FormDialog
                                                    labelButton={t('homedelivery:Cancel')}
                                                    titleDialog={t('homedelivery:Cancel_Reason')}
                                                    open={openCancel}
                                                    setOpen={setOpenCancel}
                                                    message={(
                                                        <>
                                                            <span className={clsx(classes.spanLabel, classes.labelRequired)}>{t('homedelivery:Cancel_Reason')}</span>
                                                            <Autocomplete
                                                                className={clsx(classes.autocompleteRoot, 'popup')}
                                                                mode="lazy"
                                                                value={formikCanceled.values.reason}
                                                                onChange={(e) => formikCanceled.setFieldValue('reason', e)}
                                                                loading={getShipmentCancelReasonRes.loading}
                                                                options={
                                                                    getShipmentCancelReasonRes
                                                                    && getShipmentCancelReasonRes.data
                                                                    && getShipmentCancelReasonRes.data.getShipmentCancelReason
                                                                }
                                                                getOptions={getShipmentCancelReason}
                                                                error={!!(formikCanceled.touched.reason && formikCanceled.errors.reason)}
                                                                helperText={(formikCanceled.touched.reason && formikCanceled.errors.reason) || ''}
                                                                primaryKey="value"
                                                                labelKey="label"
                                                            />
                                                            <div className={classes.formFieldButton}>
                                                                <Button className={classes.btn} onClick={formikCanceled.handleSubmit} variant="contained">
                                                                    {t('homedelivery:Submit')}
                                                                </Button>
                                                            </div>
                                                        </>
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <span className={classes.spanText}>{t('homedelivery:Or_enter_shipping_and_tracking_information')}</span>
                                                <Autocomplete
                                                    className={classes.autocompleteRoot}
                                                    mode="lazy"
                                                    value={formikShipped.values.carrier}
                                                    onChange={(e) => formikShipped.setFieldValue('carrier', e)}
                                                    loading={getCourierOptionRes.loading}
                                                    options={
                                                        getCourierOptionRes && getCourierOptionRes.data && getCourierOptionRes.data.getCourierOption
                                                    }
                                                    getOptions={getCourierOption}
                                                    error={!!(formikShipped.touched.carrier && formikShipped.errors.carrier)}
                                                    helperText={(formikShipped.touched.carrier && formikShipped.errors.carrier) || ''}
                                                    primaryKey="value"
                                                    labelKey="label"
                                                />
                                                <TextField
                                                    className={clsx(classes.fieldRoot, 'fieldCenter')}
                                                    label={t('homedelivery:Name')}
                                                    variant="outlined"
                                                    name="name"
                                                    value={formikShipped.values.name}
                                                    onChange={formikShipped.handleChange}
                                                    error={!!(formikShipped.touched.name && formikShipped.errors.name)}
                                                    helperText={(formikShipped.touched.name && formikShipped.errors.name) || ''}
                                                    InputProps={{
                                                        className: classes.fieldInput,
                                                    }}
                                                />
                                                <TextField
                                                    className={classes.fieldRoot}
                                                    label={t('homedelivery:AWB_Number')}
                                                    variant="outlined"
                                                    name="reference"
                                                    value={formikShipped.values.reference}
                                                    onChange={formikShipped.handleChange}
                                                    error={!!(formikShipped.touched.reference && formikShipped.errors.reference)}
                                                    helperText={(formikShipped.touched.reference && formikShipped.errors.reference) || ''}
                                                    InputProps={{
                                                        className: classes.fieldInput,
                                                    }}
                                                />
                                                <div className={classes.formFieldButton2}>
                                                    <Button className={classes.btn} onClick={formikShipped.handleSubmit} variant="contained">
                                                        {t('homedelivery:Order_Shipped')}
                                                    </Button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </>
                        )}

                        {step() === 2 && (
                            <>
                                <div className={classes.formFieldButton}>
                                    {pickPackEnable ? (
                                        <>
                                            <Button
                                                className={clsx(classes.btn, 'print')}
                                                onClick={() => window.open(`/printoms/pack/${homeDelivery.id}`)}
                                                variant="contained"
                                            >
                                                {t('homedelivery:Print_Pack_List')}
                                            </Button>
                                            <Button
                                                className={classes.btn}
                                                onClick={formikPacked.handleSubmit}
                                                variant="contained"
                                                style={{ marginLeft: 10, marginRight: 10 }}
                                            >
                                                <CheckIcon style={{ marginRight: 10 }} />
                                                {t('homedelivery:Mark_Pack_Complete')}
                                            </Button>
                                            <FormDialog
                                                labelButton={t('homedelivery:Cancel')}
                                                titleDialog={t('homedelivery:Cancel_Reason')}
                                                open={openCancel}
                                                setOpen={setOpenCancel}
                                                message={(
                                                    <>
                                                        <span className={clsx(classes.spanLabel, classes.labelRequired)}>{t('homedelivery:Cancel_Reason')}</span>
                                                        <Autocomplete
                                                            className={clsx(classes.autocompleteRoot, 'popup')}
                                                            mode="lazy"
                                                            value={formikCanceled.values.reason}
                                                            onChange={(e) => formikCanceled.setFieldValue('reason', e)}
                                                            loading={getShipmentCancelReasonRes.loading}
                                                            options={
                                                                getShipmentCancelReasonRes
                                                                && getShipmentCancelReasonRes.data
                                                                && getShipmentCancelReasonRes.data.getShipmentCancelReason
                                                            }
                                                            getOptions={getShipmentCancelReason}
                                                            error={!!(formikCanceled.touched.reason && formikCanceled.errors.reason)}
                                                            helperText={(formikCanceled.touched.reason && formikCanceled.errors.reason) || ''}
                                                            primaryKey="value"
                                                            labelKey="label"
                                                        />
                                                        <div className={classes.formFieldButton}>
                                                            <Button className={classes.btn} onClick={formikCanceled.handleSubmit} variant="contained">
                                                                {t('homedelivery:Submit')}
                                                            </Button>
                                                        </div>
                                                    </>
                                                )}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <div className={classes.formFieldButton}>
                                                <FormDialog
                                                    labelButton={t('homedelivery:Cancel')}
                                                    titleDialog={t('homedelivery:Cancel_Reason')}
                                                    open={openCancel}
                                                    setOpen={setOpenCancel}
                                                    message={(
                                                        <>
                                                            <span className={clsx(classes.spanLabel, classes.labelRequired)}>{t('homedelivery:Cancel_Reason')}</span>
                                                            <Autocomplete
                                                                className={clsx(classes.autocompleteRoot, 'popup')}
                                                                mode="lazy"
                                                                value={formikCanceled.values.reason}
                                                                onChange={(e) => formikCanceled.setFieldValue('reason', e)}
                                                                loading={getShipmentCancelReasonRes.loading}
                                                                options={
                                                                    getShipmentCancelReasonRes
                                                                    && getShipmentCancelReasonRes.data
                                                                    && getShipmentCancelReasonRes.data.getShipmentCancelReason
                                                                }
                                                                getOptions={getShipmentCancelReason}
                                                                error={!!(formikCanceled.touched.reason && formikCanceled.errors.reason)}
                                                                helperText={(formikCanceled.touched.reason && formikCanceled.errors.reason) || ''}
                                                                primaryKey="value"
                                                                labelKey="label"
                                                            />
                                                            <div className={classes.formFieldButton}>
                                                                <Button
                                                                    className={classes.btn}
                                                                    onClick={formikCanceled.handleSubmit}
                                                                    variant="contained"
                                                                >
                                                                    {t('homedelivery:Submit')}
                                                                </Button>
                                                            </div>
                                                        </>
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <span className={classes.spanText}>{t('homedelivery:Or_enter_shipping_and_tracking_information')}</span>
                                                <Autocomplete
                                                    className={classes.autocompleteRoot}
                                                    mode="lazy"
                                                    value={formikShipped.values.carrier}
                                                    onChange={(e) => formikShipped.setFieldValue('carrier', e)}
                                                    loading={getCourierOptionRes.loading}
                                                    options={
                                                        getCourierOptionRes && getCourierOptionRes.data && getCourierOptionRes.data.getCourierOption
                                                    }
                                                    getOptions={getCourierOption}
                                                    error={!!(formikShipped.touched.carrier && formikShipped.errors.carrier)}
                                                    helperText={(formikShipped.touched.carrier && formikShipped.errors.carrier) || ''}
                                                    primaryKey="value"
                                                    labelKey="label"
                                                />
                                                <TextField
                                                    className={clsx(classes.fieldRoot, 'fieldCenter')}
                                                    label={t('homedelivery:Name')}
                                                    variant="outlined"
                                                    name="name"
                                                    value={formikShipped.values.name}
                                                    onChange={formikShipped.handleChange}
                                                    error={!!(formikShipped.touched.name && formikShipped.errors.name)}
                                                    helperText={(formikShipped.touched.name && formikShipped.errors.name) || ''}
                                                    InputProps={{
                                                        className: classes.fieldInput,
                                                    }}
                                                />
                                                <TextField
                                                    className={classes.fieldRoot}
                                                    label={t('homedelivery:AWB_Number')}
                                                    variant="outlined"
                                                    name="reference"
                                                    value={formikShipped.values.reference}
                                                    onChange={formikShipped.handleChange}
                                                    error={!!(formikShipped.touched.reference && formikShipped.errors.reference)}
                                                    helperText={(formikShipped.touched.reference && formikShipped.errors.reference) || ''}
                                                    InputProps={{
                                                        className: classes.fieldInput,
                                                    }}
                                                />
                                                <div className={classes.formFieldButton2}>
                                                    <Button className={classes.btn} onClick={formikShipped.handleSubmit} variant="contained">
                                                        {t('homedelivery:Order_Shipped')}
                                                    </Button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </>
                        )}

                        {homeDelivery.statusValue === 'ready_for_ship' && (
                            <>
                                <div className={classes.formFieldButton}>
                                    {homeDelivery.allowBookCourier && (
                                        <Button
                                            className={classes.btn}
                                            onClick={formikCourier.handleSubmit}
                                            variant="contained"
                                            style={{ marginRight: 10 }}
                                        >
                                            {bookCourierLabel}
                                        </Button>
                                    )}

                                    <FormDialog
                                        labelButton={t('homedelivery:Cancel')}
                                        titleDialog={t('homedelivery:Cancel_Reason')}
                                        open={openCancel}
                                        setOpen={setOpenCancel}
                                        message={(
                                            <>
                                                <span className={clsx(classes.spanLabel, classes.labelRequired)}>{t('homedelivery:Cancel_Reason')}</span>
                                                <Autocomplete
                                                    className={clsx(classes.autocompleteRoot, 'popup')}
                                                    mode="lazy"
                                                    value={formikCanceled.values.reason}
                                                    onChange={(e) => formikCanceled.setFieldValue('reason', e)}
                                                    loading={getShipmentCancelReasonRes.loading}
                                                    options={
                                                        getShipmentCancelReasonRes
                                                        && getShipmentCancelReasonRes.data
                                                        && getShipmentCancelReasonRes.data.getShipmentCancelReason
                                                    }
                                                    getOptions={getShipmentCancelReason}
                                                    error={!!(formikCanceled.touched.reason && formikCanceled.errors.reason)}
                                                    helperText={(formikCanceled.touched.reason && formikCanceled.errors.reason) || ''}
                                                    primaryKey="value"
                                                    labelKey="label"
                                                />
                                                <div className={classes.formFieldButton}>
                                                    <Button className={classes.btn} onClick={formikCanceled.handleSubmit} variant="contained">
                                                        {t('homedelivery:Submit')}
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    />
                                </div>
                                <div>
                                    <span className={classes.spanText}>{t('homedelivery:Or_enter_shipping_and_tracking_information')}</span>
                                    <Autocomplete
                                        className={classes.autocompleteRoot}
                                        mode="lazy"
                                        value={formikShipped.values.carrier}
                                        onChange={(e) => formikShipped.setFieldValue('carrier', e)}
                                        loading={getCourierOptionRes.loading}
                                        options={getCourierOptionRes && getCourierOptionRes.data && getCourierOptionRes.data.getCourierOption}
                                        getOptions={getCourierOption}
                                        error={!!(formikShipped.touched.carrier && formikShipped.errors.carrier)}
                                        helperText={(formikShipped.touched.carrier && formikShipped.errors.carrier) || ''}
                                        primaryKey="value"
                                        labelKey="label"
                                    />
                                    <TextField
                                        className={clsx(classes.fieldRoot, 'fieldCenter')}
                                        label={t('homedelivery:Name')}
                                        variant="outlined"
                                        name="name"
                                        value={formikShipped.values.name}
                                        onChange={formikShipped.handleChange}
                                        error={!!(formikShipped.touched.name && formikShipped.errors.name)}
                                        helperText={(formikShipped.touched.name && formikShipped.errors.name) || ''}
                                        InputProps={{
                                            className: classes.fieldInput,
                                        }}
                                    />
                                    <TextField
                                        className={classes.fieldRoot}
                                        label={t('homedelivery:AWB_Number')}
                                        variant="outlined"
                                        name="reference"
                                        value={formikShipped.values.reference}
                                        onChange={formikShipped.handleChange}
                                        error={!!(formikShipped.touched.reference && formikShipped.errors.reference)}
                                        helperText={(formikShipped.touched.reference && formikShipped.errors.reference) || ''}
                                        InputProps={{
                                            className: classes.fieldInput,
                                        }}
                                    />
                                    <div className={classes.formFieldButton2}>
                                        <Button className={classes.btn} onClick={formikShipped.handleSubmit} variant="contained">
                                            {t('homedelivery:Order_Shipped')}
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )}

                        {homeDelivery.statusValue === 'shipment_booked' && (
                            <>
                                {homeDelivery.shippingMethod?.includes('gosend') && !homeDelivery.shippingMethod?.includes('shipper')
                                    ? (
                                        <div className={classes.formFieldButton}>
                                            <Button className={classes.btn} onClick={formikCancelCourier.handleSubmit} variant="contained" buttonType="outlined-rounded">
                                                {cancelCourierLabel}
                                            </Button>
                                        </div>
                                    ) : null}
                                <div>
                                    <span className={classes.spanText}>
                                        {homeDelivery.shippingMethod?.includes('gosend') && !homeDelivery.shippingMethod?.includes('shipper')
                                            ? t('homedelivery:Or_enter_shipping_and_tracking_information')
                                            : t('homedelivery:Enter_Shipping_and_Tracking_Information')}
                                    </span>
                                    <Autocomplete
                                        className={classes.autocompleteRoot}
                                        mode="lazy"
                                        value={formikShipped.values.carrier}
                                        onChange={(e) => formikShipped.setFieldValue('carrier', e)}
                                        loading={getCourierOptionRes.loading}
                                        options={getCourierOptionRes && getCourierOptionRes.data && getCourierOptionRes.data.getCourierOption}
                                        getOptions={getCourierOption}
                                        error={!!(formikShipped.touched.carrier && formikShipped.errors.carrier)}
                                        helperText={(formikShipped.touched.carrier && formikShipped.errors.carrier) || ''}
                                        primaryKey="value"
                                        labelKey="label"
                                    />
                                    <TextField
                                        className={clsx(classes.fieldRoot, 'fieldCenter')}
                                        label={t('homedelivery:Name')}
                                        variant="outlined"
                                        name="name"
                                        value={formikShipped.values.name}
                                        onChange={formikShipped.handleChange}
                                        error={!!(formikShipped.touched.name && formikShipped.errors.name)}
                                        helperText={(formikShipped.touched.name && formikShipped.errors.name) || ''}
                                        InputProps={{
                                            className: classes.fieldInput,
                                        }}
                                    />
                                    <TextField
                                        className={classes.fieldRoot}
                                        label={t('homedelivery:AWB_Number')}
                                        variant="outlined"
                                        name="reference"
                                        value={formikShipped.values.reference}
                                        onChange={formikShipped.handleChange}
                                        error={!!(formikShipped.touched.reference && formikShipped.errors.reference)}
                                        helperText={(formikShipped.touched.reference && formikShipped.errors.reference) || ''}
                                        InputProps={{
                                            className: classes.fieldInput,
                                        }}
                                    />
                                    <div className={classes.formFieldButton2}>
                                        <Button className={classes.btn} onClick={formikShipped.handleSubmit} variant="contained">
                                            {t('homedelivery:Order_Shipped')}
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )}

                        {homeDelivery.statusValue === 'gosend_rejected' && (
                            <>
                                {homeDelivery.allowBookCourier && (
                                    <div className={classes.formFieldButton}>
                                        <Button className={classes.btn} onClick={formikCourier.handleSubmit} variant="contained">
                                            {bookCourierLabel}
                                        </Button>
                                    </div>
                                )}

                                <div>
                                    <span className={classes.spanText}>
                                        {homeDelivery.allowBookCourier
                                            ? t('homedelivery:Or_enter_shipping_and_tracking_information')
                                            : t('homedelivery:Enter_Shipping_and_Tracking_Information')}
                                    </span>
                                    <Autocomplete
                                        className={classes.autocompleteRoot}
                                        mode="lazy"
                                        value={formikShipped.values.carrier}
                                        onChange={(e) => formikShipped.setFieldValue('carrier', e)}
                                        loading={getCourierOptionRes.loading}
                                        options={getCourierOptionRes && getCourierOptionRes.data && getCourierOptionRes.data.getCourierOption}
                                        getOptions={getCourierOption}
                                        error={!!(formikShipped.touched.carrier && formikShipped.errors.carrier)}
                                        helperText={(formikShipped.touched.carrier && formikShipped.errors.carrier) || ''}
                                        primaryKey="value"
                                        labelKey="label"
                                    />
                                    <TextField
                                        className={clsx(classes.fieldRoot, 'fieldCenter')}
                                        label={t('homedelivery:Name')}
                                        variant="outlined"
                                        name="name"
                                        value={formikShipped.values.name}
                                        onChange={formikShipped.handleChange}
                                        error={!!(formikShipped.touched.name && formikShipped.errors.name)}
                                        helperText={(formikShipped.touched.name && formikShipped.errors.name) || ''}
                                        InputProps={{
                                            className: classes.fieldInput,
                                        }}
                                    />
                                    <TextField
                                        className={classes.fieldRoot}
                                        label={t('homedelivery:AWB_Number')}
                                        variant="outlined"
                                        name="reference"
                                        value={formikShipped.values.reference}
                                        onChange={formikShipped.handleChange}
                                        error={!!(formikShipped.touched.reference && formikShipped.errors.reference)}
                                        helperText={(formikShipped.touched.reference && formikShipped.errors.reference) || ''}
                                        InputProps={{
                                            className: classes.fieldInput,
                                        }}
                                    />
                                    <div className={classes.formFieldButton2}>
                                        <Button className={classes.btn} onClick={formikShipped.handleSubmit} variant="contained">
                                            {t('homedelivery:Order_Shipped')}
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )}

                        {homeDelivery.statusValue === 'order_shipped' && (
                            <>
                                {homeDelivery.awb ? (
                                    <span className={classes.orderLabel} style={{ marginBottom: 10 }}>
                                        {`${t('homedelivery:AWB_Number')} : ${homeDelivery.awb.title} ${homeDelivery.awb.track_number}`}
                                    </span>
                                ) : (
                                    <span className={classes.orderLabel} style={{ marginBottom: 10 }}>
                                        {t('homedelivery:AWB_Number')}
                                        {' '}
                                        : -
                                    </span>
                                )}
                                <div className={classes.formFieldButton}>
                                    {homeDelivery.awb?.track_number ? (
                                        <Button
                                            className={classes.btn}
                                            type="submit"
                                            onClick={() => router.push(`/printoms/shippinglabel/${homeDelivery.id}`)}
                                            variant="contained"
                                            buttonType="outlined-rounded"
                                            style={{ marginRight: 10 }}
                                        >
                                            {t('homedelivery:Print_Shipping_Label')}
                                        </Button>
                                    ) : (
                                        null
                                    )}
                                    <Button
                                        style={{ marginRight: 10 }}
                                        className={classes.btn}
                                        onClick={formikDelivered.handleSubmit}
                                        variant="contained"
                                    >
                                        {t('homedelivery:Mark_as_Delivered')}
                                    </Button>
                                    {(homeDelivery.allowBookCourier)
                                        && (
                                            <FormDialog
                                                labelButton={t('homedelivery:Track')}
                                                titleDialog={(
                                                    <p className={classes.titleDialog}>{t('homedelivery:Track_History')}</p>
                                                )}
                                                message={(
                                                    <>
                                                        {loadingTracking ? (
                                                            <CircularProgress className={classes.progress} size={30} />
                                                        ) : (
                                                            <div className={classes.contentPopUp}>
                                                                {dataTrackingError ? (
                                                                    <div className="content-history">
                                                                        <p>{dataTrackingError}</p>
                                                                    </div>
                                                                ) : (
                                                                    <>
                                                                        {dataTracking?.slice(0).reverse().map((e) => {
                                                                            const date = new Date(e.created_at);
                                                                            return (
                                                                                <div className="content-history">
                                                                                    <p>
                                                                                        {date.toLocaleString('en-US', {
                                                                                            day: 'numeric',
                                                                                            year: 'numeric',
                                                                                            month: 'short',
                                                                                            hour: 'numeric',
                                                                                            minute: 'numeric',
                                                                                            second: 'numeric',
                                                                                        })}
                                                                                    </p>
                                                                                    <div className="description">
                                                                                        <p>{e.description}</p>
                                                                                    </div>
                                                                                </div>
                                                                            );
                                                                        })}
                                                                    </>
                                                                )}
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                                onClick={() => handleClickTrack()}
                                            />
                                        )}
                                </div>
                            </>
                        )}
                        {homeDelivery.statusValue === 'order_delivered' && (
                            <>
                                {homeDelivery.awb ? (
                                    <span className={classes.orderLabel}>
                                        {`${t('homedelivery:AWB_Number')} : ${homeDelivery.awb.title} ${homeDelivery.awb.track_number}`}
                                    </span>
                                ) : (
                                    <span className={classes.orderLabel}>
                                        {t('homedelivery:AWB_Number')}
                                        {' '}
                                        : -
                                    </span>
                                )}
                                <span className={classes.orderLabel} style={{ marginBottom: 10 }}>
                                    {`Delivered on : ${homeDelivery.updated} `}
                                </span>
                            </>
                        )}
                    </div>
                </div>
                <div className={classes.content}>
                    <div className={classes.grid}>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{t('homedelivery:Customer_Info')}</h5>
                            <span className={classes.orderLabel}>
                                <img className="imgIcon" alt="" src="/assets/img/icon_user.png" />
                                {`${homeDelivery.firstname} ${homeDelivery.lastname}`}
                            </span>
                            <span className={classes.orderLabel}>
                                <img className="imgIcon" alt="" src="/assets/img/icon_email.png" />
                                {homeDelivery.email}
                            </span>
                            <span className={classes.orderLabel}>
                                <img className="imgIcon" alt="" src="/assets/img/icon_phone.png" />
                                {homeDelivery.phone}
                            </span>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{t('homedelivery:Shipping_Address')}</h5>
                            <span className={classes.orderLabel}>{homeDelivery.shipping_address.street}</span>
                            <span className={classes.orderLabel}>{homeDelivery.shipping_address.city}</span>
                            <span className={classes.orderLabel}>
                                {`${homeDelivery.shipping_address.region}, ${homeDelivery.shipping_address.postcode}, ${homeDelivery.shipping_address.country_name}`}
                            </span>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>{t('homedelivery:Shipping_Method')}</h5>
                            {homeDelivery.courierLogo
                                ? <img src={homeDelivery.courierLogo} alt="courier-logo" className={classes.courierLogo} />
                                : null}
                            <span className={classes.orderLabel}>{homeDelivery.shipping || '-'}</span>
                            {!!(homeDelivery?.pickup_start_time || homeDelivery?.pickup_end_time)
                                && (
                                    <span className={classes.orderLabel}>
                                        {`${t('sellerorder:Pickup_Time')}: ${homeDelivery?.pickup_start_time || ''} - ${homeDelivery?.pickup_end_time || ''}`}
                                    </span>
                                )}
                        </div>
                    </div>
                    <div>
                        <h5 className={classes.titleSmall}>{t('homedelivery:Items_Shipped')}</h5>
                        <div style={{ overflowX: 'auto' }}>
                            <table className={classes.table}>
                                <tbody>
                                    <tr className={classes.tr}>
                                        <th className={classes.th} style={{ paddingLeft: 0 }}>
                                            {t('homedelivery:SKU_Product')}
                                        </th>
                                        <th className={classes.th}>{t('homedelivery:Name')}</th>
                                        <th className={classes.th} style={{ textAlign: 'right' }}>
                                            {t('homedelivery:Unit_Price')}
                                        </th>
                                        <th className={classes.th} style={{ textAlign: 'center' }}>
                                            {t('homedelivery:QTY')}
                                        </th>
                                        <th className={classes.th} style={{ textAlign: 'right' }}>
                                            {t('homedelivery:Subtotal')}
                                        </th>
                                    </tr>
                                    {homeDelivery.order?.map((e) => (
                                        <>
                                            <tr>
                                                <td className={classes.td} style={{ paddingLeft: 0 }}>
                                                    {e.sku}
                                                </td>
                                                <td className={classes.td}>{e.name}</td>
                                                <td className={classes.td} style={{ textAlign: 'right' }}>
                                                    {formatPriceNumber(e.base_price)}
                                                </td>
                                                <td className={classes.td} style={{ textAlign: 'center' }}>
                                                    {e.qty_shipped}
                                                </td>
                                                <td className={classes.td} style={{ textAlign: 'right' }}>
                                                    {formatPriceNumber(e.row_total)}
                                                </td>
                                            </tr>
                                            {e.bundle_children?.map((child) => (
                                                <tr>
                                                    <td className={classes.td} style={{ paddingLeft: 10 }}>
                                                        {`- ${child.sku}`}
                                                    </td>
                                                    <td className={classes.td}>{child.name}</td>
                                                    <td className={classes.td} style={{ textAlign: 'right' }}>
                                                        {formatPriceNumber(child.base_price)}
                                                    </td>
                                                    <td className={classes.td} style={{ textAlign: 'center' }}>
                                                        {child.qty_shipped}
                                                    </td>
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
                    <h5 className={classes.titleSmall}>{t('homedelivery:Status_History')}</h5>
                    <table className={classes.table}>
                        <tbody>
                            <tr className={classes.tr}>
                                <th className={classes.th} style={{ paddingLeft: 0 }}>
                                    {t('homedelivery:Date')}
                                </th>
                                <th className={classes.th}>{t('homedelivery:Status')}</th>
                                <th className={classes.th}>
                                    {t('homedelivery:Notes')}
                                    s
                                </th>
                            </tr>
                            {homeDelivery.history?.map((e) => {
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
                            })}
                        </tbody>
                    </table>
                </div>
                <div className={classes.content}>
                    <h5 className={classes.titleSmall}>{t('homedelivery:Notes_for_this_Shipment')}</h5>
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
                        <Button className={classes.btn} type="submit" onClick={formikNotes.handleSubmit} variant="contained">
                            {t('homedelivery:Save')}
                        </Button>
                    </div>
                </div>
            </Paper>
            {openTimeSlot && (
                <TimeSlotModal
                    open={openTimeSlot}
                    handleClose={() => setOpenTimeSlot(false)}
                    handleOpen={() => setOpenTimeSlot(true)}
                    idCourier={homeDelivery.id}
                    {...props}
                />
            )}
        </>
    );
};

export default HomeDeliveryEditContent;
