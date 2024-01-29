import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Collapse from '@material-ui/core/Collapse';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import Autocomplete from '@common_autocomplete';

import TextField from '@common_textfield';
import Button from '@common_button';

import Card from '@sellermodules/income/pages/withdrawal/components/Card';
import Form from '@sellermodules/income/pages/withdrawal/components/BankForm';
import Confirmation from '@sellermodules/income/pages/withdrawal/components/Confirmation';
import { inputNumber } from '@helper_text';
import { optionsSchedule } from '@sellermodules/income/helpers';
import { thousandSeparator } from '@helper_regex';

import useStyles from '@sellermodules/income/pages/withdrawal/components/style';

const IncomeWithdrawalContent = (props) => {
    const {
        balance, formikWithdraw, t, banks, Schedule, handleChecked,
        handleDeleteBank, minBalance, handleSetAsDefault, currency,
        open, setOpen, handleWithdraw, dataBankValidation,
    } = props;
    const router = useRouter();
    const classes = useStyles();
    const [expand, setExpand] = React.useState(false);
    const [actionValue, setActionValue] = React.useState(Schedule);

    const handleAction = (event) => {
        setActionValue(event.value);
        handleChecked(event.value);
    };

    return (
        <>
            <div className={classes.headerContainer}>
                <div className="left">
                    <IconButton aria-label="back" onClick={() => router.push('/seller/income/balance')}>
                        <ArrowBackOutlinedIcon />
                    </IconButton>
                    <h2 className="title">{t('sellerorder:Income_Page')}</h2>
                </div>
            </div>
            <Paper className={classes.container}>
                <Grid container spacing={6}>
                    <Grid item xs={12} md={6}>
                        <div className={classes.title}>
                            {t('sellerincome:Balance_Withdrawal')}
                        </div>
                        <div className={clsx(classes.flexContainer, 'between', 'border')}>
                            <div className={clsx(classes.subtitle, 'primary')}>
                                {t('sellerincome:Income_Balance')}
                            </div>
                            <div className={clsx(classes.subtitle, 'primary')}>
                                {balance.balance}
                            </div>
                        </div>
                        <div className={clsx(classes.flexContainer, 'between')}>
                            <span className={classes.label}>
                                {t('sellerincome:Withdrawal_Amount')}
                            </span>
                            <span
                                aria-hidden="true"
                                className={classes.label}
                                style={{ cursor: 'pointer' }}
                                onClick={() => formikWithdraw.setFieldValue('amount', dataBankValidation ? Number(balance.balance_raw)
                                    : Math.floor(Number(balance.balance_raw)))}
                            >
                                {t('sellerincome:Withdrawal_All')}
                            </span>
                        </div>
                        <div style={{ margin: '10px 0' }}>
                            <TextField
                                id="amount"
                                name="amount"
                                value={formikWithdraw.values.amount}
                                onChange={(e) => {
                                    let temp = inputNumber(e, formikWithdraw.values.amount, ['e', '-']);
                                    if (temp > Number(balance.balance_raw)) {
                                        temp = Number(balance.balance_raw);
                                    }
                                    formikWithdraw.setFieldValue('amount', temp);
                                }}
                                className={clsx(classes.textInput, 'adorn')}
                                type="number"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment className={classes.adornment} position="start">
                                            {currency}
                                        </InputAdornment>
                                    ),
                                    inputProps: { max: typeof balance.balance === 'number' ? Number(balance.balance_raw) : 0 },
                                }}
                                error={!!(formikWithdraw.touched.amount && formikWithdraw.errors.amount)}
                                helperText={(formikWithdraw.touched.amount && formikWithdraw.errors.amount) || ''}
                            />
                        </div>
                        <div className={clsx(classes.text, 'tnc')}>
                            <ul>
                                <li>
                                    {t('sellerincome:By_submitting_the_withdrawal_request_you_agree_to_the')}
                                    {' '}
                                    <Link href="/seller/seller-withdrawal-tnc">
                                        <a className={classes.link} target="_blank">
                                            {t('sellerincome:terms_and_conditions')}
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    {t('sellerincome:Minimum_withdrawal_amount_is_currency_min', {
                                        min: minBalance.toString().replace(thousandSeparator, ','),
                                        currency,
                                    })}
                                </li>
                            </ul>
                        </div>
                        <Grid container spacing={3}>
                            <Grid item xs={8}>
                                <Button
                                    className={clsx(classes.btn, 'big')}
                                    onClick={formikWithdraw.handleSubmit}
                                >
                                    {t('sellerincome:Withdraw_Balance')}
                                </Button>
                            </Grid>
                        </Grid>
                        {!!formikWithdraw.touched.beneficiary_id && !!formikWithdraw.errors.beneficiary_id
                            && (
                                <div className={classes.errorText}>
                                    {t("sellerincome:Please_Choose_your_bank_Account_If_you_didn't_have_one_please_add_your_bank_account")}
                                </div>
                            )}
                        <div className={classes.space} />
                        <div className={clsx(classes.title)}>
                            {t('sellerincome:Set_Withdrawal_Schedule')}
                        </div>
                        <div>
                            <Autocomplete
                                id="schedule"
                                name="schedule"
                                value={optionsSchedule.find((sch) => sch.value === actionValue)}
                                onChange={handleAction}
                                options={optionsSchedule}
                                primaryKey="id"
                                labelKey="label"
                                renderInput={(params) => (
                                    <TextField
                                        value={actionValue}
                                        className={classes.textInput}
                                        placeholder={t('sellerpromotion:Select_withdrawal_schedule')}
                                        {...params}
                                        helperText={
                                            t('sellerpromotion:Set_withdrawal_schedule_and_set_bank_as_default_to_enable_automatic_withdrawal')
                                        }
                                    />
                                )}
                            />
                        </div>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <div className={classes.title}>
                            {t('sellerincome:Bank_Account')}
                        </div>
                        {!!banks?.length
                            && (
                                <div className={classes.bankAccountContainer}>
                                    <FormControl className={classes.formControl}>
                                        <RadioGroup aria-label="position" name="position" defaultValue="top">
                                            {banks.map((account, i) => (
                                                <Card
                                                    {...account}
                                                    formik={formikWithdraw}
                                                    handleDeleteBank={handleDeleteBank}
                                                    handleSetAsDefault={handleSetAsDefault}
                                                    t={t}
                                                    key={i}
                                                />
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            )}
                        <div className={classes.flexContainer} style={{ cursor: 'pointer' }} onClick={() => setExpand(!expand)} aria-hidden="true">
                            <div className={clsx(classes.addIcon, expand && 'expand')}>
                                <span />
                                <span />
                            </div>
                            <div className={classes.label}>
                                {t('sellerincome:Add_Account')}
                            </div>
                        </div>
                        <div style={{ height: 20 }} />
                        <Collapse in={expand}>
                            <Form {...props} />
                        </Collapse>
                    </Grid>
                </Grid>
            </Paper>
            <Confirmation
                {...props}
                open={open}
                onConfirm={handleWithdraw}
                onCancel={() => setOpen(false)}
                data={formikWithdraw.values}
            />
        </>
    );
};

export default IncomeWithdrawalContent;
