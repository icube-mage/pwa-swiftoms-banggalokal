import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import clsx from 'clsx';
import useStyles from '@modules/ecommercechannel/pages/integrate/components/storeModal/style';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const LocationCreateContent = (props) => {
    const {
        formik, open, handleClose, t,
    } = props;
    const classes = useStyles();

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth="true" classes={{ paper: classes.paper }}>
            <DialogTitle classes={{ root: classes.titleTop }}>{t('ecommercechannel:Create_New_Store')}</DialogTitle>
            <DialogContent classes={{ root: clsx(classes.content, classes.contentCounter) }}>

                <FormControl className={clsx(classes.formControl)}>
                    <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                        {t('ecommercechannel:Brand_Name')}
                    </InputLabel>
                    <TextField
                        className={classes.fieldInput}
                        variant="standard"
                        name="brand_name"
                        value={formik.values.brand_name}
                        onChange={formik.handleChange}
                        error={!!(formik.touched.brand_name && formik.errors.brand_name)}
                        helperText={(formik.touched.brand_name && formik.errors.brand_name) || ''}
                        InputProps={{
                            className: classes.fieldInput,
                        }}
                    />
                </FormControl>

                <FormControl className={clsx(classes.formControl)}>
                    <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                        {t('ecommercechannel:Brand_ID')}
                    </InputLabel>
                    <TextField
                        multiple
                        name="brand_id"
                        value={formik.values.brand_id}
                        onChange={formik.handleChange}
                        inputProps={{
                            autocomplete: 'off',
                        }}
                        className={classes.fieldInput}
                        variant="standard"
                        autoComplete="off"
                        error={!!(formik.touched.brand_id && formik.errors.brand_id)}
                        helperText={(formik.touched.brand_id && formik.errors.brand_id) || ''}
                    />
                </FormControl>

            </DialogContent>
            <div className={classes.formFieldButton}>
                <Button onClick={formik.handleSubmit} buttonType="primary-rounded">
                    {t('ecommercechannel:Submit')}
                </Button>
                <Button onClick={handleClose} buttonType="link" style={{ color: '#BE1F93' }}>
                    {t('ecommercechannel:Cancel')}
                </Button>
            </div>
        </Dialog>
    );
};

export default LocationCreateContent;
