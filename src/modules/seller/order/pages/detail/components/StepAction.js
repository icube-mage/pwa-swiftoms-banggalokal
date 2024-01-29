/* eslint-disable no-nested-ternary */
import clsx from 'clsx';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';

import Autocomplete from '@common_autocomplete';
import Button from '@common_button';
import FormDialog from '@common_formdialog';
import TextField from '@common_textfield';
import TextInfo from '@common_textinfo';

import { stepNumber } from '@sellermodules/order/helpers';
import useStyles from '@sellermodules/order/pages/detail/components/style';

const NewOrder = (props) => {
    const { t, handleCancel, handleConfirm } = props;
    const classes = useStyles();

    return (
        <Grid container spacing={3} justifyContent="center" alignItems="center">
            <Grid item xs={12} sm="auto">
                <Button className={clsx(classes.btnAction, 'outlined')} onClick={handleCancel}>
                    {t('sellerorder:Cancel_Order')}
                </Button>
            </Grid>
            <Grid item xs={12} sm="auto">
                <Button className={classes.btnAction} onClick={handleConfirm}>
                    {t('sellerorder:Confirm_Order')}
                </Button>
            </Grid>
        </Grid>
    );
};

const PackOrder = (props) => {
    const { t, handlePackOrder } = props;
    const classes = useStyles();

    return (
        <Grid container spacing={3} justifyContent="center" alignItems="center">
            <Grid item xs={12} sm="auto">
                <Button className={classes.btnAction} onClick={handlePackOrder}>
                    {t('pack_order')}
                </Button>
            </Grid>
        </Grid>
    );
};

const ReadyShip = (props) => {
    const {
        t, handleBook, dataAwb, handleDelivery, formik, getPickupTimeslotsRes, getPickupTimeslots, isPickupTime, open, setOpen,
    } = props;
    const classes = useStyles();
    const [time, setTime] = React.useState();

    const handlePickup = () => {
        window.backdropLoader(true);
        getPickupTimeslots();
    };

    const renderAwbComponent = () => {
        switch (dataAwb) {
        case 'auto_awb':
            return (
                <Button
                    className={classes.btnAction}
                    onClick={() => (getPickupTimeslotsRes?.data?.getPickupTimeslots?.length
                        ? setOpen(true) : isPickupTime ? handlePickup() : handleBook())}
                >
                    {t('sellerorder:Book_Courier')}
                </Button>
            );
        case 'manual_awb':
        case 'manual_awb_mp':
            return (
                <div className={classes.awbContainer}>
                    <TextField
                        className={classes.awbInput}
                        id="awb_number"
                        name="awb_number"
                        value={formik.values.awb_number}
                        onChange={(e) => formik.setFieldValue('awb_number', e.target.value)}
                        label="AWB Number"
                        variant="outlined"
                        error={!!(formik.touched.awb_number && formik.errors.awb_number)}
                        helperText={(formik.touched.awb_number && formik.errors.awb_number) || ''}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            className: classes.fieldInput,
                        }}
                        required
                    />
                    <Button className={classes.btnAction} onClick={formik.handleSubmit}>
                        {t('sellerorder:In_Delivery')}
                    </Button>
                </div>
            );
        case 'no_awb':
        case 'auto_awb_mp':
            return (
                <div className={classes.flex}>
                    <Button className={classes.btnAction} onClick={handleDelivery}>
                        {t('sellerorder:In_Delivery')}
                    </Button>
                    {dataAwb === 'auto_awb_mp'
                        && (
                            <TextInfo
                                textHelp={t('sellerorder:Click_the_button_to_generate_a_receipt_number_from_Marketplace')}
                                textHelpPlacement="bottom"
                                size={20}
                            />
                        )}
                </div>
            );
        default:
            return null;
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
            {!!dataAwb && renderAwbComponent()}
            <Dialog open={open} onClose={() => setOpen(false)} className={classes.wrapperDialog}>
                <DialogTitle>
                    {t('sellerorder:Select_Pickup_Time_Slot')}
                    <IconButton className={classes.closeButtonDialog} onClick={() => setOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <div className={classes.contentDialogForm}>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            value={time}
                            onChange={setTime}
                            placeholder={t('sellerorder:Select_Pickup_Time_Slot')}
                            primaryKey="value"
                            labelKey="label"
                            options={getPickupTimeslotsRes?.data?.getPickupTimeslots || []}
                            fullWidth
                            disableClearable
                        />
                    </div>
                    <div className={classes.contentDialog}>
                        <Button
                            disabled={!time}
                            className={clsx(classes.btnAction, !time && 'disabled')}
                            style={{ width: 200 }}
                            onClick={() => handleBook(time?.value, setOpen, setTime)}
                        >
                            {t('sellerorder:Book_Courier')}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

const InDelivery = (props) => {
    const {
        t, data, loadingTracking, dataTrackingError, dataTracking, handleClickTrack, handleOrderDelivered,
        handleCancelDelivery, dataAwb,
    } = props;
    const classes = useStyles();

    const renderAwbComponent = () => {
        switch (dataAwb) {
        case 'auto_awb':
            return (
                <div style={{ marginRight: 15 }}>
                    <FormDialog
                        labelButton={t('sellerorder:Track_Order')}
                        classButton={classes.btnAction}
                        titleDialog={(
                            <p className={classes.titleDialog}>{t('homedelivery:Track_History')}</p>
                        )}
                        message={(
                            <>
                                {loadingTracking ? (
                                    <div style={{ minHeight: 80, position: 'relative' }}>
                                        <CircularProgress className={classes.progress} size={30} />
                                    </div>
                                ) : (
                                    <div className={classes.contentPopUp}>
                                        {dataTrackingError ? (
                                            <div className="content-history">
                                                <p>{dataTrackingError}</p>
                                            </div>
                                        ) : (dataTracking?.slice(0).reverse().map((e) => {
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
                                        }))}
                                    </div>
                                )}
                            </>
                        )}
                        onClick={() => handleClickTrack()}
                    />
                </div>
            );
        case 'manual_awb':
        case 'no_awb':
            return (
                <Button
                    className={clsx(classes.btnAction, 'outlined')}
                    style={{ marginRight: 10 }}
                    onClick={() => handleCancelDelivery()}
                >
                    {t('sellerorder:Cancel_Delivery')}
                </Button>
            );
        default:
            return (
                <div style={{ marginLeft: 5 }}>
                    <Button
                        className={classes.btnAction}
                        onClick={() => handleOrderDelivered()}
                    >
                        {t('sellerorder:Order_Delivered')}
                    </Button>
                </div>
            );
        }
    };

    return (
        <div>
            <div className={classes.textAction}>
                <span className="bold">{t('sellerorder:AWB_Number')}</span>
                {' '}
                :
                {' '}
                {data.tracks.track_number || '-'}
            </div>
            { data.tracks.track_number && (
                <div className={classes.printAction}>
                    <a href={`/seller/order/printlabel/${data.entity_id}`} target="_blank" rel="noreferrer">
                        {t('sellerorder:Print_Label')}
                    </a>
                    <span style={{ margin: '0 10px' }}>|</span>
                    <a href={`/seller/order/printinvoice/${data.entity_id}`} target="_blank" rel="noreferrer">
                        {t('sellerorder:Print_Invoice')}
                    </a>
                </div>
            )}
            <div style={{ height: 15 }} />
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                {!!dataAwb && renderAwbComponent()}
            </div>
        </div>
    );
};

const Delivered = (props) => {
    const { t, data } = props;
    const classes = useStyles();

    return (
        <div>
            <div className={classes.textAction}>
                <span className="bold">{t('sellerorder:AWB_Number')}</span>
                {' '}
                :
                {' '}
                {data.tracks.track_number || '-'}
            </div>
            { data.tracks.track_number && (
                <div className={classes.printAction}>
                    <a href={`/seller/order/printlabel/${data.entity_id}`} target="_blank" rel="noreferrer">
                        {t('sellerorder:Print_Label')}
                    </a>
                    <span style={{ margin: '0 10px' }}>|</span>
                    <a href={`/seller/order/printinvoice/${data.entity_id}`} target="_blank" rel="noreferrer">
                        {t('sellerorder:Print_Invoice')}
                    </a>
                </div>
            )}
            <div style={{ height: 15 }} />
            <div className={classes.textAction}>
                <span className="bold">{t('sellerorder:Order_Delivered')}</span>
                {' '}
                :
                {' '}
                {data.history?.[data.history?.length - 1]?.created_at || '-'}
            </div>
        </div>
    );
};

const StepActionComponent = (props) => {
    const { data } = props;

    const classes = useStyles();
    const stepActive = stepNumber(data.status?.code);

    const renderComponent = () => {
        switch (stepActive) {
        case 0:
            return <NewOrder {...props} />;
        case 1:
            return <PackOrder {...props} />;
        case 2:
            return <ReadyShip {...props} />;
        case 3:
            return <InDelivery {...props} />;
        case 4:
            return <Delivered {...props} />;
        default:
            return <div />;
        }
    };

    return (
        <div className={classes.actionContainer}>
            {renderComponent()}
        </div>
    );
};

export default StepActionComponent;
