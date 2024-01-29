import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import clsx from 'clsx';
import useStyles from '@modules/source/pages/list/components/editModal/style';

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
        formik.resetForm();
        handleClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth="true" classes={{ paper: classes.paper }}>
            <DialogTitle classes={{ root: classes.titleTop }}>{t('source:Edit_Stock')}</DialogTitle>
            <DialogContent classes={{ root: clsx(classes.content, classes.contentCounter) }}>

                <FormControl className={clsx(classes.formControl)}>
                    <InputLabel shrink>
                        {t('source:Location')}
                    </InputLabel>
                    <TextField
                        disabled
                        className={classes.fieldInput}
                        variant="standard"
                        name="loc_name"
                        value={formik.values.loc_name}
                    />
                </FormControl>

                <FormControl className={clsx(classes.formControl)}>
                    <InputLabel shrink>
                        {t('source:SKU')}
                    </InputLabel>
                    <TextField
                        disabled
                        className={classes.fieldInput}
                        variant="standard"
                        name="sku"
                        value={formik.values.sku}
                    />
                </FormControl>

                <FormControl className={clsx(classes.formControl, 'required')}>
                    <InputLabel shrink>
                        {t('source:Qty_Total')}
                    </InputLabel>
                    <TextField
                        className={classes.fieldInput}
                        variant="standard"
                        name="qty_total"
                        value={formik.values.qty_total}
                        onChange={formik.handleChange}
                        error={!!(formik.touched.qty_total && formik.errors.qty_total)}
                        helperText={(formik.touched.qty_total && formik.errors.qty_total) || ''}
                        InputProps={{
                            className: classes.fieldInput,
                        }}
                    />
                </FormControl>

                <FormControl className={clsx(classes.formControl)}>
                    <InputLabel shrink>
                        {t('source:Qty_Reserved')}
                    </InputLabel>
                    <TextField
                        disabled
                        className={classes.fieldInput}
                        variant="standard"
                        name="qty_reserved"
                        value={formik.values.qty_reserved}
                    />
                </FormControl>

                <FormControl className={clsx(classes.formControl)}>
                    <InputLabel shrink>
                        {t('source:Qty_Incoming')}
                    </InputLabel>
                    <TextField
                        disabled
                        className={classes.fieldInput}
                        variant="standard"
                        name="qty_incoming"
                        value={formik.values.qty_incoming}
                    />
                </FormControl>

                <FormControl className={clsx(classes.formControl)}>
                    <InputLabel shrink>
                        {t('source:Qty_Saleable')}
                    </InputLabel>
                    <TextField
                        disabled
                        className={classes.fieldInput}
                        variant="standard"
                        name="qty_saleable"
                        value={formik.values.qty_saleable}
                    />
                </FormControl>

                <FormControl className={clsx(classes.formControl, 'required')}>
                    <InputLabel shrink>
                        {t('source:Qty_Buffer')}
                    </InputLabel>
                    <TextField
                        className={classes.fieldInput}
                        variant="standard"
                        name="qty_buffer"
                        value={formik.values.qty_buffer}
                        onChange={formik.handleChange}
                        error={!!(formik.touched.qty_buffer && formik.errors.qty_buffer)}
                        helperText={(formik.touched.qty_buffer && formik.errors.qty_buffer) || ''}
                        InputProps={{
                            className: classes.fieldInput,
                        }}
                    />
                </FormControl>
            </DialogContent>
            <div className={classes.formFieldButton}>
                <Button onClick={formik.handleSubmit} buttonType="primary-rounded">
                    {t('source:Submit')}
                </Button>
                <Button onClick={onClose} buttonType="link" style={{ color: '#BE1F93' }}>
                    {t('source:Cancel')}
                </Button>
            </div>
        </Dialog>
    );
};

export default ApiModalContent;
