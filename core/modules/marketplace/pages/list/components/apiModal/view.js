import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import clsx from 'clsx';
import useStyles from '@modules/marketplace/pages/list/components/apiModal/style';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const ApiModalContent = (props) => {
    const {
        formik,
        open,
        handleClose,
        t,
    } = props;
    const classes = useStyles();

    const onClose = () => {
        formik.setFieldValue('client_name', '');
        handleClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth classes={{ paper: classes.dialogContainer }}>
            <DialogTitle classes={{ root: classes.dialogTitleRoot }}>{t('marketplace:Register_Marketplace_API_Client_Key')}</DialogTitle>
            <DialogContent className={classes.content}>
                <FormControl className={clsx(classes.formControl)}>
                    <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                        {t('marketplace:Client_Name')}
                    </InputLabel>
                    <TextField
                        className={classes.fieldInput}
                        variant="standard"
                        name="client_name"
                        value={formik.values.client_name}
                        onChange={formik.handleChange}
                        error={!!(formik.touched.client_name && formik.errors.client_name)}
                        helperText={(formik.touched.client_name && formik.errors.client_name) || ''}
                        InputProps={{
                            className: classes.fieldInput,
                        }}
                    />
                </FormControl>
            </DialogContent>
            <div className={classes.formFieldButton}>
                <Button onClick={formik.handleSubmit} buttonType="primary-rounded">
                    {t('marketplace:Submit')}
                </Button>
                <Button onClick={onClose} buttonType="link" style={{ color: '#BE1F93' }}>
                    {t('marketplace:Cancel')}
                </Button>
            </div>
        </Dialog>
    );
};

export default ApiModalContent;
