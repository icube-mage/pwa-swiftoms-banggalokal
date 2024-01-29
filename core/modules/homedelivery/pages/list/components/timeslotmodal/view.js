import React from 'react';
import Autocomplete from '@common_autocomplete';
import Button from '@common_button';
import clsx from 'clsx';
import useStyles from '@modules/homedelivery/pages/list/components/timeslotmodal/style';
import gqlService from '@modules/homedelivery/services/graphql';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const LocationCreateContent = (props) => {
    const {
        formik, open, handleClose, t,
    } = props;
    const classes = useStyles();
    const [getShipperPickupTimeslot, getShipperPickupTimeslotRes] = gqlService.getShipperPickupTimeslot();
    const timeSlotOptions = (getShipperPickupTimeslotRes?.data?.getShipperPickupTimeslot || []).map(
        (el) => ({ label: el?.pickup_time?.replaceAll('T', ' ').replaceAll('|', ' | '), pickup_time: el?.pickup_time }),
    );

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth="true" classes={{ paper: classes.paper }}>
            {/* <DialogTitle classes={{ root: classes.titleTop }}>{t('homedelivery:Shipper_Pickup_Timeslot')}</DialogTitle> */}
            <DialogContent classes={{ root: clsx(classes.content, classes.contentCounter) }}>

                <FormControl className={clsx(classes.formControl)}>
                    <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                        {t('homedelivery:Shipper_Pickup_Timeslot')}
                    </InputLabel>
                    <Autocomplete
                        variant="standard"
                        className={classes.autocompleteRoot}
                        mode="lazy"
                        value={timeSlotOptions.find(
                            (el) => el?.pickup_time === formik.values.pickup_time,
                        )}
                        onChange={(e) => formik.setFieldValue('pickup_time', e?.pickup_time)}
                        loading={getShipperPickupTimeslotRes.loading}
                        options={timeSlotOptions}
                        error={!!(formik.touched.pickup_time && formik.errors.pickup_time)}
                        helperText={(formik.touched.pickup_time && formik.errors.pickup_time) || ''}
                        getOptions={getShipperPickupTimeslot}
                        primaryKey="pickup_time"
                        labelKey="label"
                    />
                </FormControl>

            </DialogContent>
            <div className={classes.formFieldButton}>
                <Button onClick={formik.handleSubmit} buttonType="primary-rounded">
                    {t('homedelivery:Submit')}
                </Button>
                <Button onClick={handleClose} buttonType="link" style={{ color: '#BE1F93' }}>
                    {t('homedelivery:Cancel')}
                </Button>
            </div>
        </Dialog>
    );
};

export default LocationCreateContent;
