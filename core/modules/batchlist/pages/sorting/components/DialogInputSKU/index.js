/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import Button from '@common_button';
import TextField from '@common_textfield';
import useStyles from '@modules/batchlist/pages/sorting/components/DialogInputSKU/style';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import clsx from 'clsx';

const DialogInputSKU = (props) => {
    const {
        open, handleClose, formik, t,
    } = props;
    const classes = useStyles();

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth="true" classes={{ paper: classes.paper }}>
            <DialogTitle classes={{ root: classes.textTitle }}>{t('batchlist:Input_SKU')}</DialogTitle>
            <DialogContent classes={{ root: clsx(classes.content, classes.contentCounter) }}>
                <form
                    className={classes.formContainer}
                    onSubmit={(e) => {
                        handleClose();
                        formik.handleSubmit(e);
                    }}
                >
                    <div className={classes.formField}>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="sku"
                            value={formik.values.sku}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.sku && formik.errors.sku)}
                            helperText={(formik.touched.sku && formik.errors.sku) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <Button type="submit" className={classes.btn} variant="contained">
                            {t('batchlist:Submit')}
                        </Button>
                    </div>
                </form>
            </DialogContent>
            <DialogContent classes={{ root: classes.content }}>
                <button
                    type="button"
                    className={classes.textFooter}
                    onClick={() => {
                        formik.resetForm();
                        handleClose();
                    }}
                >
                    {t('batchlist:Cancel')}
                </button>
            </DialogContent>
        </Dialog>
    );
};

export default DialogInputSKU;
