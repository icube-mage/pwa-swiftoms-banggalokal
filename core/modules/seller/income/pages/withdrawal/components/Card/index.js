import clsx from 'clsx';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';

import Radio from '@material-ui/core/Radio';

import Button from '@common_button';
import useStyles from '@sellermodules/income/pages/withdrawal/components/Card/style';

const IncomeListContent = ({
    entity_id, bank_name, account_number, bank_logo, formik, is_default,
    handleDeleteBank, name, handleSetAsDefault, t,
}) => {
    const classes = useStyles();

    const handelDefault = (id) => {
        handleSetAsDefault(id);
    };

    return (
        <Paper className={classes.container}>
            <Grid container spacing={2} className={classes.gridContainer}>
                <Grid item xs={1}>
                    <Radio
                        checked={formik.values.beneficiary_id === entity_id}
                        onChange={() => formik.setFieldValue('beneficiary_id', Number(entity_id))}
                        value={entity_id}
                        className={classes.radio}
                    />
                </Grid>
                <Grid item xs={11} lg={4}>
                    {bank_logo
                        ? (
                            <div
                                className={classes.bankImg}
                                style={{
                                    backgroundImage: `url(${bank_logo || '/assets/img/bank.svg'})`,
                                }}
                            />
                        )
                        : (
                            <div
                                className={classes.bankImg}
                            >
                                <img src="/assets/img/bank.svg" className="placeholder" alt="bank-place" />
                            </div>
                        )}
                </Grid>
                <Grid item xs={12} lg={7} className={classes.wallet}>
                    <span className={classes.text}>{bank_name || '-'}</span>
                    <br />
                    <span className={clsx(classes.text, 'big')}>{account_number}</span>
                    <br />
                    <span className={classes.text}>
                        a.n
                        {' '}
                        {name}
                    </span>
                    <div className={classes.buttonDefault}>
                        {is_default
                            ? (
                                <div className={classes.default}>
                                    <Button
                                        buttonType="outlined"
                                        onClick={() => handelDefault(entity_id)}
                                        className={clsx(classes.btn, 'primary')}
                                    >
                                        {t('sellerincome:Set_As_Default')}
                                    </Button>
                                </div>
                            )
                            : (
                                <div className={classes.default}>
                                    <Button
                                        onClick={() => handelDefault(entity_id)}
                                        className={classes.btn}
                                    >
                                        {t('sellerincome:Set_As_Default')}
                                    </Button>
                                </div>
                            )}
                        <div className={classes.remove}>
                            <Button
                                onClick={() => handleDeleteBank(entity_id)}
                                className={classes.btn}
                            >
                                <div className="icon">
                                    <CloseIcon />
                                </div>
                                {t('sellerincome:Remove')}
                            </Button>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Paper>

    );
};

export default IncomeListContent;
