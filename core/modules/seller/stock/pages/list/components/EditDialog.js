/* eslint-disable no-useless-escape */
import clsx from 'clsx';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import TextField from '@common_textfield';
import Button from '@common_button';
import useStyles from '@sellermodules/stock/pages/list/components/style';

export const isEmpty = (value) => {
    if ([undefined, null, '', false, NaN].includes(value)) return true;
    if (value && value.length <= 0) return true;
    return false;
};

const EditStockContent = (props) => {
    const {
        t, detail, setDetail, onClose, open, handleEdit,
    } = props;
    const classes = useStyles();

    const numberReg = /[^\d]/g;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            classes={{ paper: classes.dialogContainer }}
            className={classes.dialogContainerRoot}
            fullWidth
        >
            <DialogTitle className={classes.dialogTitleContainer}>
                {t('sellerstock:Edit_Stock')}
            </DialogTitle>
            <DialogContent className={classes.content}>
                <div className="title">{t('sellerstock:Product_Name')}</div>
                {detail.product_name || '-'}
            </DialogContent>
            <DialogContent className={classes.content}>
                <div className="title">{t('sellerstock:SKU')}</div>
                {detail.vendor_sku || '-'}
            </DialogContent>
            <DialogContent className={classes.content}>
                <div className="title">{t('sellerstock:Location')}</div>
                {detail.location?.loc_name || '-'}
            </DialogContent>
            <DialogContent className={clsx(classes.content, 'last')}>
                <div className="title required">{t('sellerstock:QTY_STOCK')}</div>
                <TextField
                    value={detail.qty_saleable || ''}
                    onChange={(e) => setDetail((prev) => ({ ...prev, qty_saleable: e.target.value.replace(numberReg, '') }))}
                    className={classes.textInput}
                />
            </DialogContent>
            <DialogContent className={clsx(classes.content, 'button')}>
                <Button style={{ marginRight: 20 }} className={clsx(classes.btn, 'outlined')} onClick={onClose}>{t('sellerstock:Cancel')}</Button>
                <Button className={classes.btn} disabled={isEmpty(detail.qty_saleable)} onClick={handleEdit}>{t('sellerstock:Submit')}</Button>
            </DialogContent>
        </Dialog>
    );
};

export default EditStockContent;
