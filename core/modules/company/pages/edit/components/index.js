/* eslint-disable no-unused-vars */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import useStyles from '@modules/company/pages/edit/components/style';

const CompanyEditContent = (props) => {
    const {
        formik, netsuiteConfig, logistixConfig, t,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Button className={classes.btnBack} onClick={() => router.push('/oms/company')} variant="contained" style={{ marginRight: 16 }}>
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
            <h2 className={classes.titleTop}>{t('company:Edit_Company')}</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('company:Company_Code')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="code"
                            value={formik.values.code}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.code && formik.errors.code)}
                            helperText={(formik.touched.code && formik.errors.code) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('company:Company_Name')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.name && formik.errors.name)}
                            helperText={(formik.touched.name && formik.errors.name) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    {
                        netsuiteConfig === '1' && (
                            <div className={classes.formField}>
                                <div className={classes.divLabel}>
                                    <span className={classes.label}>{t('company:Netsuite_ID')}</span>
                                </div>
                                <TextField
                                    className={classes.fieldRoot}
                                    variant="outlined"
                                    name="netsuite_id"
                                    value={formik.values.netsuite_id}
                                    onChange={formik.handleChange}
                                    error={!!(formik.touched.netsuite_id && formik.errors.netsuite_id)}
                                    helperText={(formik.touched.netsuite_id && formik.errors.netsuite_id) || ''}
                                    InputProps={{
                                        className: classes.fieldInput,
                                    }}
                                />
                            </div>
                        )
                    }
                    {
                        logistixConfig === '1' && (
                            <div className={classes.formField}>
                                <div className={classes.divLabel}>
                                    <span className={classes.label}>{t('company:Logistix_Credentials_Flag')}</span>
                                </div>
                                <TextField
                                    className={classes.fieldRoot}
                                    variant="outlined"
                                    name="logistix_credentials_flag"
                                    value={formik.values.logistix_credentials_flag}
                                    onChange={formik.handleChange}
                                    error={!!(formik.touched.logistix_credentials_flag && formik.errors.logistix_credentials_flag)}
                                    helperText={(formik.touched.logistix_credentials_flag && formik.errors.logistix_credentials_flag) || ''}
                                    InputProps={{
                                        className: classes.fieldInput,
                                    }}
                                />
                            </div>
                        )
                    }
                </div>
                <div className={classes.formFieldButton}>
                    <Button className={classes.btn} onClick={formik.handleSubmit} variant="contained">
                        {t('company:Submit')}
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default CompanyEditContent;
