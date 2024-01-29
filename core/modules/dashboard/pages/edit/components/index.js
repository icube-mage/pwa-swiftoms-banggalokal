/* eslint-disable max-len */
import React, { useState } from 'react';
import clsx from 'clsx';
import useStyles from '@modules/dashboard/pages/edit/components/style';
import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import TextField from '@common_textfield';
import PhoneInput from '@common_phoneinput';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import GetScore from '@helper_passwordstrength';
import { useRouter } from 'next/router';

const EditUserFormContent = (props) => {
    const {
        formik,
        t,
        setDialCode,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const firstRenderPhone = React.useRef(true);

    const [changeEmail, setChangeEmail] = useState(false);
    const [changePassword, setChangePassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(t('dashboard:No_Password'));
    const [passwordError, setPasswordError] = useState('');

    const handleEmailField = (event) => {
        setChangeEmail(event.target.checked);
        formik.setFieldValue('changeEmail', !formik.values.changeEmail);
    };

    const handlePasswordField = (event) => {
        setChangePassword(event.target.checked);
        formik.setFieldValue('changePassword', !formik.values.changePassword);
    };

    const handleNewPassword = (event) => {
        setPasswordError('');

        const score = GetScore(event.target.value);

        setPasswordStrength(score.status);
        if (score.status === t('dashboard:No_Password') || score.status === 'Weak') {
            setPasswordError(score.message);
        }
    };

    return (
        <div>
            <Button
                className={clsx(classes.btnBack, 'buttonBack')}
                onClick={() => router.push('/')}
                variant="contained"
                style={{ marginRight: 16 }}
            >
                <ChevronLeftIcon style={{
                    fontSize: 30,
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
                />
            </Button>
            <h2 className={classes.titleTop}>{t('dashboard:Edit_My_Account')}</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.nameGrid}>
                        <div className={classes.nameGridCol}>
                            <TextField
                                autoFocus
                                className={classes.fieldInput}
                                name="firstname"
                                label={t('dashboard:Firstname')}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={formik.values.firstname}
                                onChange={formik.handleChange}
                                error={!!(formik.touched.firstname && formik.errors.firstname)}
                                helperText={(formik.touched.firstname && formik.errors.firstname) || ''}
                            />
                        </div>
                        <div className={classes.nameGridCol}>
                            <TextField
                                className={classes.fieldInput}
                                name="lastname"
                                label={t('dashboard:Lastname')}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={formik.values.lastname}
                                onChange={formik.handleChange}
                                error={!!(formik.touched.lastname && formik.errors.lastname)}
                                helperText={(formik.touched.lastname && formik.errors.lastname) || ''}
                            />
                        </div>
                    </div>

                    <TextField
                        className={clsx(classes.fieldInput, 'fieldInputSpace')}
                        name="customer_loc_code"
                        label={t('dashboard:Location_Code')}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        disabled
                        value={formik.values.customer_loc_code}

                    />

                    <TextField
                        className={clsx(classes.fieldInput, 'fieldInputSpace')}
                        name="customer_channel_code"
                        label={t('dashboard:Channel_Code')}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        disabled
                        value={formik.values.channel_code}
                    />

                    <PhoneInput
                        name="phone_number"
                        value={formik.values.phone_number}
                        onChange={(e, c) => {
                            formik.setFieldValue('phone_number', e);
                            setDialCode(c.dialCode);
                        }}
                        error={!!(formik.touched.phone_number && formik.errors.phone_number)}
                        helperText={(formik.touched.phone_number && formik.errors.phone_number) || ''}
                        containerClass={classes.fieldPhoneContainer}
                        rootClasses={classes.fieldPhoneRoot}
                        specialLabel="Phone Number"
                        onFocus={(e, c) => {
                            setDialCode(c.dialCode);
                            if (firstRenderPhone.current) {
                                firstRenderPhone.current = false;
                                e.target.blur();
                            }
                        }}
                        inputProps={{ autoFocus: true }}
                    />

                    <FormControl component="fieldset" className={clsx(classes.formControl, 'formControlSpace')}>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox className={clsx(classes.checkboxToggle)} checked={changeEmail} onChange={handleEmailField} name="changeEmail" />}
                                label={t('dashboard:Change_Email')}
                            />

                            <FormControlLabel
                                control={<Checkbox className={clsx(classes.checkboxToggle)} checked={changePassword} onChange={handlePasswordField} name="changePassword" />}
                                label={t('dashboard:Change_Password')}
                            />

                        </FormGroup>
                    </FormControl>

                    {changeEmail === true
                        && (
                            <TextField
                                className={clsx(classes.fieldInput, 'fieldInputSpace')}
                                name="email"
                                label={t('dashboard:Email')}
                                placeholder="name@example.com"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={!!(formik.touched.email && formik.errors.email)}
                                helperText={(formik.touched.email && formik.errors.email) || ''}
                            />
                        )}

                    {(changeEmail === true || changePassword === true)
                        && (
                            <TextField
                                className={clsx(classes.fieldInput, 'fieldInputSpace')}
                                name="currentPassword"
                                label={t('dashboard:Current_Password')}
                                type="password"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={formik.values.currentPassword}
                                onChange={formik.handleChange}
                                error={!!(formik.touched.currentPassword && formik.errors.currentPassword)}
                                helperText={(formik.touched.currentPassword && formik.errors.currentPassword) || ''}
                            />
                        )}

                    {changePassword === true
                        && (
                            <>
                                <TextField
                                    className={clsx(classes.fieldInput, 'fieldInputSpace')}
                                    name="newPassword"
                                    label={t('dashboard:New_Password')}
                                    type="password"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={formik.values.newPassword}
                                    onChange={(e) => { formik.handleChange(e); handleNewPassword(e); }}
                                    error={!!(formik.touched.newPassword && formik.errors.newPassword) || !!passwordError}
                                    helperText={(formik.touched.newPassword && formik.errors.newPassword) || passwordError || ''}
                                />

                                <Chip className={clsx(classes.passwordIndicator)} label={`${t('dashboard:Password_Strength')}: ${passwordStrength}`} />

                                <TextField
                                    className={clsx(classes.fieldInput, 'fieldInputSpace')}
                                    name="confirmPassword"
                                    label={t('dashboard:Confirm_New_Password')}
                                    type="password"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    error={!!(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                                    helperText={(formik.touched.confirmPassword && formik.errors.confirmPassword) || ''}
                                />
                            </>
                        )}
                </div>
                <div className={classes.formFieldButton}>
                    <Button
                        className={classes.btn}
                        onClick={formik.handleSubmit}
                        variant="contained"
                    >
                        {t('dashboard:Submit')}
                    </Button>
                </div>
            </Paper>
        </div>
    );
};

export default EditUserFormContent;
