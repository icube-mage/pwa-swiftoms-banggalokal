/* eslint-disable no-useless-escape */
import clsx from 'clsx';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import TextField from '@common_textfield';
import Button from '@common_button';
import { floatReg } from '@helper_regex';
import useStyles from '@modules/servicefee/pages/list/components/style';

export const isEmpty = (value) => {
    if ([undefined, null, '', false, NaN].includes(value)) return true;
    if (value && value.length <= 0) return true;
    return false;
};

const EditStockContent = (props) => {
    const {
        t, detail, setDetail, setOpen, open, formik,
    } = props;
    const classes = useStyles();

    const onClose = () => {
        setOpen(false);
        setDetail((prev) => ({ ...prev, fee: prev.fee_percent }));
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            classes={{ paper: classes.dialogContainer }}
            fullWidth
        >
            <DialogTitle className={classes.dialogTitleContainer}>
                {t('servicefee:Edit_Service_Fee')}
                <IconButton className={classes.closeButton} onClick={onClose}>
                    <CloseIcon className={classes.closeIcon} />
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.content}>
                <div className="title required">{t('servicefee:Category_Name')}</div>
                <TextField
                    value={detail.name}
                    className={classes.textInput}
                    disabled
                />
            </DialogContent>
            <DialogContent className={classes.content}>
                <div className="title required">{t('servicefee:Percent_Fee')}</div>
                <TextField
                    value={formik.values.fee}
                    onChange={(e) => formik.setFieldValue('fee', e.target.value.replace(floatReg, ''))}
                    className={classes.textInput}
                    error={!!(formik.touched?.fee && formik.errors?.fee)}
                    helperText={(formik.touched?.fee && formik.errors?.fee) || ''}
                />
            </DialogContent>
            <DialogContent className={clsx(classes.content, 'button')}>
                <Button style={{ marginRight: 20 }} className={clsx(classes.btn, 'outlined')} onClick={onClose}>{t('servicefee:Cancel')}</Button>
                <Button
                    className={classes.btn}
                    onClick={formik.handleSubmit}
                >
                    {t('servicefee:Submit')}
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default EditStockContent;
