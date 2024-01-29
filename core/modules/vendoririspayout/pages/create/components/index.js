/* eslint-disable no-unused-vars */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@common_autocomplete';
import gqlService from '@modules/vendoririspayout/services/graphql';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import useStyles from '@modules/vendoririspayout/pages/create/components/style';

const CompanyCreateContent = (props) => {
    const { formik, balance, t } = props;
    const classes = useStyles();
    const router = useRouter();

    const [getVendorIrisBeneficiariesList, getVendorIrisBeneficiariesListRes] = gqlService.getVendorIrisBeneficiariesList();
    React.useEffect(() => {
        getVendorIrisBeneficiariesList();
    }, []);

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/vendorportal/vendoririspayout')}
                variant="contained"
                style={{ marginRight: 16 }}
            >
                <ChevronLeftIcon
                    style={{
                        fontSize: 30,
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                />
            </Button>
            <h2 className={classes.titleTop}>{t('vendoririspayout:Create_Payout')}</h2>
            <Paper className={clsx(classes.container, classes.balanceContainer)}>
                <div className={classes.content}>
                    <div className={clsx(classes.formField, classes.balanceValue)}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label)}>{t('vendoririspayout:Balance')}</span>
                        </div>
                        <div className={classes.fieldRoot}>
                            <Typography variant="p">
                                <b>{balance}</b>
                            </Typography>
                        </div>
                    </div>
                </div>
            </Paper>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('vendoririspayout:Beneficiaries')}</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            value={formik.values.beneficiaryId}
                            onChange={(e) => formik.setFieldValue('beneficiaryId', e)}
                            options={[
                                {
                                    entity_id: getVendorIrisBeneficiariesListRes
                                                && getVendorIrisBeneficiariesListRes.data
                                                && getVendorIrisBeneficiariesListRes.data.getVendorIrisBeneficiariesList
                                                && getVendorIrisBeneficiariesListRes.data.getVendorIrisBeneficiariesList.entity_id,
                                    name: getVendorIrisBeneficiariesListRes
                                                && getVendorIrisBeneficiariesListRes.data
                                                && getVendorIrisBeneficiariesListRes.data.getVendorIrisBeneficiariesList
                                                && getVendorIrisBeneficiariesListRes.data.getVendorIrisBeneficiariesList.name,
                                },
                            ]}
                            error={!!(formik.touched.beneficiaryId && formik.errors.beneficiaryId)}
                            helperText={(formik.touched.beneficiaryId && formik.errors.beneficiaryId) || ''}
                            primaryKey="entity_id"
                            labelKey="name"
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('vendoririspayout:Amount')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="amount"
                            value={formik.values.amount}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.amount && formik.errors.amount)}
                            helperText={(formik.touched.amount && formik.errors.amount) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('vendoririspayout:Notes')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="notes"
                            value={formik.values.notes}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.notes && formik.errors.notes)}
                            helperText={(formik.touched.notes && formik.errors.notes) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                </div>
                <div className={classes.formFieldButton}>
                    <Button className={classes.btn} onClick={formik.handleSubmit} variant="contained">
                        {t('vendoririspayout:Submit')}
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default CompanyCreateContent;
