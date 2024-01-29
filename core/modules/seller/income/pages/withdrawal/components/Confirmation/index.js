/* eslint-disable no-nested-ternary */
import clsx from 'clsx';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Button from '@common_button';
import { breakPointsUp } from '@helper_theme';
import { thousandSeparator } from '@helper_regex';
import useStyles from '@sellermodules/income/pages/withdrawal/components/Confirmation/style';

const ConfirmationDialog = (props) => {
    const {
        open = false,
        onConfirm,
        onCancel,
        data = {},
        t,
        currency,
        banks = [],
        minBalance,
        dataBankValidation,
    } = props;
    const isDesktop = breakPointsUp('md');
    const classes = useStyles();
    const selectedBank = banks.find((bank) => bank.entity_id === data.beneficiary_id);
    const fee = selectedBank?.withdrawal_fee_type ? selectedBank?.withdrawal_fee_type === 'percent_of_amount'
        ? (Number(selectedBank?.withdrawal_fee) * Number(data?.amount)) / 100
        : Number(selectedBank?.withdrawal_fee) : 0;
    const amount = Number(data?.amount) - (!dataBankValidation ? Math.ceil(fee) : fee);
    const disableSubmit = amount < Number(minBalance);

    const formatPrice = (price, isPrice) => {
        const splitPrice = price.toString().split('.');
        splitPrice[0] = splitPrice[0].toString().replace(thousandSeparator, ',');
        if (!dataBankValidation && isPrice) {
            return splitPrice[0];
        }
        return splitPrice.join('.');
    };
    return (
        <Dialog
            open={open}
            onClose={onCancel}
            fullWidth
            className={classes.container}
        >
            <IconButton className={classes.closeButton} onClick={onCancel}>
                <CloseIcon className={classes.closeIcon} />
            </IconButton>
            <DialogTitle className={classes.title}>{t('sellerincome:Withdrawal_Confirmation')}</DialogTitle>
            <DialogTitle className={classes.subtitle}>{t('sellerincome:You_will_get')}</DialogTitle>
            <DialogTitle className={classes.title}>
                {`${currency} ${formatPrice(amount > 0 ? amount : 0, true)}`}
            </DialogTitle>
            <DialogContent className={classes.content}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={6} sm={6}>
                        {t('sellerincome:Withdraw_to')}
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <Box display={isDesktop ? 'flex' : 'block'} justifyContent="flex-end" alignItems="center" textAlign="-webkit-right">
                            <div
                                className={classes.bankImg}
                                style={{
                                    backgroundImage: `url(${selectedBank?.bank_logo || '/assets/img/bank.svg'})`,
                                }}
                            />
                            {selectedBank?.account_number}
                        </Box>
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        {t('sellerincome:Fee')}
                    </Grid>
                    <Grid item xs={6}>
                        <Box display="flex" justifyContent="flex-end">
                            {`${currency} ${formatPrice(!dataBankValidation ? Math.ceil(fee) : fee)}`}
                        </Box>
                    </Grid>
                </Grid>

                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={6}>
                        {t('sellerincome:Withdrawal_Amount')}
                    </Grid>
                    <Grid item xs={6}>
                        <Box display="flex" justifyContent="flex-end">
                            {`${currency} ${formatPrice(Number(data?.amount), true)}`}
                        </Box>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions className={classes.actions}>
                <Button
                    className={clsx(classes.btn, disableSubmit && 'disabled')}
                    disabled={disableSubmit}
                    onClick={onConfirm}
                    color="primary"
                >
                    {t('sellerincome:Confirm')}
                </Button>
            </DialogActions>
            {disableSubmit
                && (
                    <DialogActions className={classes.errors}>
                        {t('sellerincome:Minimum_withdrawal_amount_is_currency_min',
                            { min: formatPrice(minBalance), currency })}
                    </DialogActions>
                )}
        </Dialog>
    );
};

export default ConfirmationDialog;
