import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import Button from '@common_button';
import TextField from '@common_textfield';
import Autocomplete from '@common_autocomplete';
import Switch from '@common_switch';
import PhoneInput from '@common_phoneinput';

import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';

import GetScore from '@helper_passwordstrength';

import CategoryTree from '@sellermodules/manageuser/plugins/CategoryTree';
import useStyles from '@sellermodules/manageuser/pages/create/components/style';

const colorWeak = '#FF4B47';
const colorMedium = '#FFA500';
const colorStrong = '#87D6A8';
const colorVeryStrong = '#00C853';

const CatalogOrganizeContent = (props) => {
    const {
        t, formik, setDialCode, dataLoc, loadLoc,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const firstRenderPhone = React.useRef(true);

    const [passwordError, setPasswordError] = useState('');
    const [passwordErrorStatus, setPasswordErrorStatus] = useState('');

    const getColor = (status) => {
        switch (status) {
        case 'Weak':
            return colorWeak;
        case 'Medium':
            return colorMedium;
        case 'Strong':
            return colorStrong;
        case 'Very Strong':
            return colorVeryStrong;
        default:
            return colorWeak;
        }
    };

    const getSize = (status) => {
        switch (status) {
        case 'Weak':
            return '25%';
        case 'Medium':
            return '50%';
        case 'Strong':
            return '75%';
        case 'Very Strong':
            return '100%';
        default:
            return '25%';
        }
    };

    const getMarginBottom = () => {
        if (formik.touched.password && formik.errors.password) {
            return 10;
        } if (passwordError) {
            return 40;
        }
        return -10;
    };

    useEffect(() => {
        if (formik.values.password) {
            const passwordScore = GetScore(formik.values.password, 8, 3);
            setPasswordError(`${passwordScore.message ? `${passwordScore.message} or password too common` : ''}`);
            setPasswordErrorStatus(passwordScore.status);
        }
    }, [formik.values.password]);

    useEffect(() => {
        if (!formik.isSubmitting) return;
        const keys = Object.keys(formik.errors);
        if (keys.length > 0) {
            const keyName = keys[0];
            const node = document.getElementsByName(keyName);
            if (node.length) {
                node[0].scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
                node[0].focus();
            }
        }
    }, [formik]);

    return (
        <div className={classes.container}>
            <div className={classes.headerContainer}>
                <div className="left">
                    <IconButton aria-label="back" onClick={() => router.push('/seller/manageuser')}>
                        <ArrowBackOutlinedIcon />
                    </IconButton>
                    <h2 className={classes.title}>{t('sellermanageuser:Manage_User')}</h2>
                </div>
                <Button
                    className={clsx(classes.btn, passwordError && 'disabled')}
                    startIcon={<img alt="" src="/assets/img/save-white.svg" className="icon" />}
                    onClick={formik.handleSubmit}
                    disabled={passwordError}
                >
                    {t('sellermanageuser:Save')}
                </Button>
            </div>
            <Paper className={classes.paper}>
                <h2 className={clsx(classes.title, 'paper')}>{t('sellermanageuser:Create_User')}</h2>
                <div className={classes.formFieldsGrid}>
                    <InputLabel htmlFor="name" className={classNames(classes.label, classes.required)}>
                        {t('sellermanageuser:Name')}
                    </InputLabel>
                    <div>
                        <TextField
                            id="name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            className={classes.textInput}
                            error={!!(formik.touched.name && formik.errors.name)}
                            helperText={(formik.touched.name && formik.errors.name) || ''}
                        />
                    </div>
                </div>
                <div className={classes.formFieldsGrid}>
                    <InputLabel htmlFor="email" className={classNames(classes.label, classes.required)}>
                        {t('sellermanageuser:Email')}
                    </InputLabel>
                    <div>
                        <TextField
                            id="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            className={classes.textInput}
                            error={!!(formik.touched.email && formik.errors.email)}
                            helperText={(formik.touched.email && formik.errors.email) || ''}
                        />
                    </div>
                </div>
                <div className={classes.formFieldsGrid}>
                    <InputLabel htmlFor="telephone" className={classNames(classes.label, classes.required)}>
                        {t('sellermanageuser:Phone')}
                    </InputLabel>
                    <div>
                        <PhoneInput
                            name="telephone"
                            value={formik.values.telephone}
                            onChange={(e, c) => {
                                formik.setFieldValue('telephone', e);
                                setDialCode(c.dialCode);
                            }}
                            error={!!(formik.touched.telephone && formik.errors.telephone)}
                            helperText={(formik.touched.telephone && formik.errors.telephone) || ''}
                            containerClass={classes.fieldPhoneContainer}
                            rootClasses={classes.fieldPhoneRoot}
                            variant="standard"
                            onBlur={() => formik.setFieldTouched('telephone', true)}
                            onFocus={(e, c) => {
                                setDialCode(c.dialCode);
                                if (firstRenderPhone.current) {
                                    firstRenderPhone.current = false;
                                    e.target.blur();
                                }
                            }}
                            inputProps={{ autoFocus: true }}
                        />
                    </div>
                </div>
                <div className={classes.formFieldsGrid}>
                    <InputLabel htmlFor="customer_loc_code" className={classNames(classes.label, classes.required)}>
                        {t('sellermanageuser:Location')}
                    </InputLabel>
                    <Autocomplete
                        id="customer_loc_code"
                        name="customer_loc_code"
                        value={formik.values.customer_loc_code}
                        onChange={(e) => formik.setFieldValue('customer_loc_code', e)}
                        options={dataLoc}
                        loading={loadLoc}
                        primaryKey="loc_code"
                        labelKey="loc_name"
                        fullWidth
                        error={!!(formik.touched.customer_loc_code && formik.errors.customer_loc_code)}
                        helperText={(formik.touched.customer_loc_code && formik.errors.customer_loc_code) || ''}
                        placeholder={t('sellermanageuser:Multiselect')}
                        multiple
                        renderInput={(params) => (
                            <TextField
                                value={formik.values.customer_loc_code}
                                className={clsx(classes.textInput, 'multi')}
                                error={!!(formik.touched.customer_loc_code && formik.errors.customer_loc_code)}
                                helperText={(formik.touched.customer_loc_code && formik.errors.customer_loc_code) || ''}
                                {...params}
                            />
                        )}
                    />
                </div>
                <div className={classes.formFieldsGrid}>
                    <InputLabel htmlFor="password" className={classNames(classes.label, classes.required)}>
                        {t('sellermanageuser:Password')}
                    </InputLabel>
                    <div>
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            className={clsx(classes.textInput, passwordError && 'error')}
                            error={passwordError !== '' || !!(formik.touched.password && formik.errors.password)}
                            helperText={(formik.touched.password && formik.errors.password) || passwordError}
                            onBlur={formik.handleBlur}
                            inputProps={{
                                autocomplete: 'new-password',
                                form: {
                                    autocomplete: 'off',
                                },
                            }}
                        />
                        <div
                            style={{ marginBottom: getMarginBottom() }}
                            className={classes.passwordDiv}
                        >
                            <div className={classes.errorDiv}>
                                <div
                                    className={classes.errorBar}
                                    style={{
                                        width: getSize(passwordErrorStatus),
                                        backgroundColor: getColor(passwordErrorStatus),
                                    }}
                                />
                            </div>
                            <div className={classes.errorStatus} style={{ color: getColor(passwordErrorStatus) }}>
                                {passwordErrorStatus}
                            </div>
                        </div>
                    </div>
                </div>
            </Paper>
            <Paper className={classes.paper}>
                <h2 className={clsx(classes.title, 'paper')}>{t('sellermanageuser:Assign_Access')}</h2>
                <div className={classes.formFieldsGrid}>
                    <InputLabel htmlFor="use_group_acl" className={classes.label}>
                        {t('sellermanageuser:Use_Group_ACL')}
                    </InputLabel>
                    <div>
                        <Switch
                            name="use_group_acl"
                            value={formik.values.use_group_acl}
                            onChange={formik.handleChange}
                        />
                    </div>
                </div>
                {!formik.values.use_group_acl
                    && <CategoryTree {...props} name="acl_code" />}
            </Paper>
        </div>
    );
};

export default CatalogOrganizeContent;
