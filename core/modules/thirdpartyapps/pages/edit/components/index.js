/* eslint-disable object-curly-newline */
import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';

import TextField from '@common_textfield';
import Button from '@common_button';
import Switch from '@common_switch';
import Checkbox from '@common_checkbox';
import Autocomplete from '@common_autocomplete';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { typeOptions } from '@modules/thirdpartyapps/helpers/index';
import useStyles from '@modules/thirdpartyapps/pages/edit/components/style';

const ThirdPartyEditContent = (props) => {
    const { t, formik, data, handleGenerate } = props;

    const router = useRouter();
    const classes = useStyles();

    const getClassByStatus = (status) => {
        if (status === 'connected') {
            return 'green';
        }
        if (status === 'disconnected') {
            return 'red';
        }
        return 'gray';
    };

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/vendorportal/thirdpartyapps')}
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
            <h2 className={classes.titleTop}>{t('company:Edit_Third_Party_Apps')}</h2>

            <Paper className={classes.container}>
                <div className={classes.content}>
                    <h5 className={classes.titleSmall}>{' '}</h5>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('thirdpartyapps:Vendor')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            disabled
                            value={data.vendor.company_name}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('thirdpartyapps:Status')}</span>
                        </div>
                        <Switch
                            name="status"
                            value={formik.values.status}
                            onChange={formik.handleChange}
                            trueLabel=""
                            falseLabel=""
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('thirdpartyapps:Type')}</span>
                        </div>
                        <Autocomplete
                            name="app_type"
                            variant="outlined"
                            className={classes.autocompleteRoot}
                            value={typeOptions.find((type) => type.value === formik.values.app_type)}
                            onChange={(e) => formik.setFieldValue('app_type', e.value)}
                            options={typeOptions}
                            primaryKey="value"
                            labelKey="label"
                            error={!!(formik.touched.app_type && formik.errors.app_type)}
                            helperText={(formik.touched.app_type && formik.errors.app_type) || ''}
                            disableClearable
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('thirdpartyapps:Integration_Status')}</span>
                        </div>
                        <div className={clsx(classes.statusContainer, getClassByStatus(data.integration_status))}>
                            {data.integration_status || 'Idle'}
                        </div>
                    </div>
                </div>

                <div className={classes.content}>
                    <h5 className={classes.titleSmall}>{t('thirdpartyapps:Open_API')}</h5>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('thirdpartyapps:Access_Token')}</span>
                        </div>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={9} lg={10}>
                                <TextField
                                    className={classes.fieldRoot}
                                    variant="outlined"
                                    name="access_token"
                                    value={formik.values.access_token}
                                    onChange={formik.handleChange}
                                    error={!!(formik.touched.access_token && formik.errors.access_token)}
                                    helperText={(formik.touched.access_token && formik.errors.access_token) || ''}
                                    InputProps={{
                                        className: classes.fieldInput,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} lg={2}>
                                <Button
                                    className={classes.btn}
                                    onClick={handleGenerate}
                                    variant="contained"
                                >
                                    {t('thirdpartyapps:Generate')}
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                    {formik.values.modules.map((mod, i) => (!mod.group.includes('webhook')
                        && (
                            <div className={clsx(classes.formField, 'mt10')} key={i}>
                                <div className={classes.divLabel}>
                                    <span className={classes.label}>{mod.label}</span>
                                </div>
                                <Grid container spacing={2}>
                                    {mod.modules.map((child, ic) => (
                                        <Grid item xs={12} sm={6} lg={4} xl={3} key={ic}>
                                            <Checkbox
                                                label={child.label}
                                                checked={formik.values.modules[i].modules[ic].status}
                                                setChecked={(e) => {
                                                    const val = e.target.checked;
                                                    formik.setFieldValue(`modules[${i}].modules[${ic}].status`, val);
                                                }}
                                                className={classes.checkboxOption}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </div>
                        )
                    ))}
                </div>

                <div className={classes.content}>
                    <h5 className={classes.titleSmall}>{t('thirdpartyapps:Webhook')}</h5>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('thirdpartyapps:Secret_Key')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="webhook_secret_key"
                            value={formik.values.webhook_secret_key}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.webhook_secret_key && formik.errors.webhook_secret_key)}
                            helperText={(formik.touched.webhook_secret_key && formik.errors.webhook_secret_key) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    {formik.values.modules.map((mod, i) => (mod.group.includes('webhook')
                        && (
                            <div className={classes.formField} key={i}>
                                <div className={classes.divLabel}>
                                    <span className={classes.label}>{t('thirdpartyapps:Order_Module')}</span>
                                </div>
                                <Grid container spacing={2}>
                                    {mod.modules.map((child, ic) => (
                                        <Grid item container spacing={2} key={ic}>
                                            <Grid item xs={12} md={5}>
                                                <Checkbox
                                                    label={child.label}
                                                    checked={formik.values.modules[i].modules[ic].status}
                                                    setChecked={(e) => {
                                                        const val = e.target.checked;
                                                        formik.setFieldValue(`modules[${i}].modules[${ic}].status`, val);
                                                        formik.setFieldValue(child.module_code, val);
                                                    }}
                                                    className={classes.checkboxOption}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={7}>
                                                <TextField
                                                    className={classes.fieldRoot}
                                                    variant="outlined"
                                                    name={`modules[${i}].modules[${ic}].webhook_url`}
                                                    value={formik.values[`${child.module_code}_url`]}
                                                    onChange={(e) => {
                                                        formik.handleChange(e);
                                                        formik.setFieldValue(`${child.module_code}_url`, e.target.value);
                                                    }}
                                                    error={!!(formik.touched[`${child.module_code}_url`]
                                                        && formik.errors[`${child.module_code}_url`])}
                                                    helperText={(formik.touched[`${child.module_code}_url`]
                                                        && formik.errors[`${child.module_code}_url`]) || ''}
                                                    InputProps={{
                                                        className: classes.fieldInput,
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                    ))}
                                </Grid>
                            </div>
                        )
                    ))}
                </div>

                <div className={classes.formFieldButton}>
                    <Button
                        className={classes.btn}
                        onClick={formik.handleSubmit}
                        variant="contained"
                    >
                        {t('thirdpartyapps:Submit')}
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default ThirdPartyEditContent;
