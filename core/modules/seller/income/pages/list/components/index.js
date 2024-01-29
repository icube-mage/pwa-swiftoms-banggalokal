/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-newline */
import clsx from 'clsx';
import { useRouter } from 'next/router';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';

import Button from '@common_button';

import TableBalance from '@sellermodules/income/pages/list/components/Table/tableBalance';
import TableWithdraw from '@sellermodules/income/pages/list/components/Table/tableWithdraw';

import DialogDetail from '@sellermodules/income/pages/list/components/DialogDetail';
import { thousandSeparator } from '@helper_regex';
import useStyles from '@sellermodules/income/pages/list/components/style';

const IncomeListContent = (props) => {
    const { getSellerBalanceHistory, getSellerWithdrawalHistory, currency, handleExport,
        data, dataWithdraw, loading, loadingWithdraw, t, balance, minBalance, statusFilter } = props;
    const classes = useStyles();
    const router = useRouter();
    const { history } = router.query;
    const [detail, setDetail] = React.useState({});
    const [open, setOpen] = React.useState(false);

    const balanceList = (data && data.getSellerBalanceHistory && data.getSellerBalanceHistory.items) || [];
    const balanceTotal = (data && data.getSellerBalanceHistory && data.getSellerBalanceHistory.total_count) || 0;

    const withdrawList = (dataWithdraw && dataWithdraw.getSellerWithdrawalHistory && dataWithdraw.getSellerWithdrawalHistory.items) || [];
    const withdrawTotal = (dataWithdraw && dataWithdraw.getSellerWithdrawalHistory && dataWithdraw.getSellerWithdrawalHistory.total_count) || 0;

    const columns = [
        { field: 'created_at', headerName: t('sellerincome:Transaction_Date'), sortable: true, initialSort: 'DESC' },
        { field: 'order_number', headerName: t('sellerincome:Order_Number') },
        { field: 'amount', headerName: t('sellerincome:Amount'), sortable: true },
        { field: 'action', headerName: t('sellerincome:Action') },
    ];

    const rows = balanceList.map((b) => ({
        ...b,
        action: (
            <span className={classes.seeDetails} aria-hidden="true" onClick={() => { setOpen(true); setDetail(b); }}>
                {t('sellerincome:See_Details')}
            </span>),
    }));

    const columnsWithdraw = [
        { field: 'created_at', headerName: t('sellerincome:Transaction_Date'), sortable: true, initialSort: 'DESC' },
        { field: 'account_number', headerName: t('sellerincome:Bank_Account') },
        { field: 'amount', headerName: t('sellerincome:Amount'), sortable: true },
        { field: 'fee', headerName: t('sellerincome:Fee') },
        { field: 'status', headerName: t('sellerincome:Status') },
    ];

    const rowsWithdraw = withdrawList.map((w) => ({
        ...w,
        status: (
            <div className={classes.status}>
                {w.status}
                {w.status === 'failed' && !!w.error_message
                    && (
                        <Tooltip
                            title={w.error_message}
                            arrow
                            classes={{ tooltip: classes.tooltip }}
                        >
                            <img src="/assets/img/tooltip_icon.svg" alt="tip" />
                        </Tooltip>
                    )}
            </div>
        ),
    }));

    return (
        <>
            <Paper className={classes.container}>
                <div className={classes.title}>
                    {t('sellerincome:Balance_Details')}
                </div>
                <Grid container spacing={3} className={classes.wallet}>
                    <Grid item xs={12} sm="auto">
                        <img src="/assets/img/wallet.svg" alt="wallet" />
                        <span className={clsx(classes.text, 'primary')}>{balance}</span>
                    </Grid>
                    <Grid item xs={12} sm>
                        <Button className={classes.btn} onClick={() => router.push('/seller/income/withdrawal')}>
                            {t('sellerincome:Withdraw_Balance')}
                        </Button>
                    </Grid>
                </Grid>
                <div className={classes.subtitle}>
                    {t('sellerincome:Withdrawal_Information')}
                </div>
                <Grid container>
                    <Grid item xs={12} sm={6} className={classes.infoContainer}>
                        <img className="icon" src="/assets/img/money.svg" alt="money" />
                        <span className={classes.text}>
                            {t('sellerincome:Minimum_withdrawal_amount_is_currency_min', {
                                min: minBalance.toString().replace(thousandSeparator, ','),
                                currency,
                            })}
                        </span>
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.infoContainer}>
                        <img className="icon" src="/assets/img/time.svg" alt="time" />
                        <span className={classes.text}>{t('sellerincome:Disbursement_of_funds_will_be_processed_within_1x24_hours')}</span>
                    </Grid>
                    {/* <Grid item xs={12} sm={6} className={clsx(classes.infoContainer, 'bottom')}>
                        <img className="icon" src="/assets/img/adminfee.svg" alt="adminfee" />
                        <span className={classes.text}>{t('sellerincome:Withdrawal_of_funds_to_Bank_BCA_will_not_be_subject_to_administration_fees_if_withdrawals_are_made_to_other_banks_an_administration_fee_of_Rp6500_will_be_charged')}</span>
                    </Grid> */}
                    <Grid item xs={12} sm={6} className={clsx(classes.infoContainer, 'bottom')}>
                        <img className="icon" src="/assets/img/cs.svg" alt="cs" />
                        <span className={classes.text}>{t('sellerincome:If_the_balance_has_not_been_entered_within_the_specified_time_please_contact_our_Customer_Service')}</span>
                    </Grid>
                </Grid>
            </Paper>

            {history === 'withdraw' ? (
                <TableWithdraw
                    header={t('sellerincome:Income')}
                    columns={columnsWithdraw}
                    getRows={getSellerWithdrawalHistory}
                    rows={rowsWithdraw}
                    loading={loadingWithdraw}
                    count={withdrawTotal}
                    searchPlaceholder={t('sellerincome:Search_for_order_number')}
                    handleExport={handleExport}
                    statusFilter={statusFilter}
                    t={t}
                />
            ) : (
                <TableBalance
                    header={t('sellerincome:Income')}
                    columns={columns}
                    getRows={getSellerBalanceHistory}
                    rows={rows}
                    loading={loading}
                    count={balanceTotal}
                    searchPlaceholder={t('sellerincome:Search_for_order_number')}
                    handleExport={handleExport}
                    t={t}
                />
            )}
            <DialogDetail t={t} detail={detail} open={open} setOpen={setOpen} />
        </>
    );
};

export default IncomeListContent;
