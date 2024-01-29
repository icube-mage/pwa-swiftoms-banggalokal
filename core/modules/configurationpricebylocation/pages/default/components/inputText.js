/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable max-len */
import React from 'react';
import TextField from '@common_textfield';
import clsx from 'clsx';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import useStyles from '@modules/configurationpricebylocation/pages/default/components/style';

export const InputText = (props) => {
    const {
        formik,
        name,
        label,
        comment,
        error = !!(formik.touched[name]?.value && formik.errors[name]?.value),
        helperText = (formik.touched[name]?.value && formik.errors[name]?.value) || '',
        canRestore = false,
        t,
    } = props;
    const classes = useStyles();
    return (
        <>
            <div className={classes.formField}>
                <div className={classes.divLabel}>
                    <span className={classes.label}>{label}</span>
                </div>
                <div className={classes.divField}>
                    <TextField
                        className={classes.fieldRoot}
                        variant="outlined"
                        id={`${name}`}
                        name={`${name}.value`}
                        value={formik.values[name].value}
                        onChange={formik.handleChange}
                        error={error}
                        helperText={helperText}
                        InputProps={{
                            className: classes.fieldInput,
                        }}
                        fullWidth
                        disabled={formik.values[name].is_default}
                        autoFocus={error && helperText}
                    />
                    {comment && (<span className={clsx(classes.label, classes.comment)}>{comment}</span>)}
                </div>
                {
                    canRestore && (
                        <div className="hidden-mobile">
                            <FormControlLabel
                                control={<Checkbox name={`${name}.is_default`} checked={formik.values[name].is_default} onChange={formik.handleChange} />}
                                className={classes.controlLabel}
                                classes={{ root: classes.rootLabel }}
                                style={{ marginTop: '4px' }}
                                label={t('pricebylocationconfiguration:Use_system_value')}
                            />
                        </div>
                    )
                }
            </div>
            {
                canRestore && (
                    <div className={clsx(classes.formFieldMobile, 'hidden-desktop')}>
                        <div />
                        <FormControlLabel
                            control={<Checkbox name={`${name}.is_default`} checked={formik.values[name].is_default} onChange={formik.handleChange} />}
                            className={classes.controlLabel}
                            classes={{ root: classes.rootLabel }}
                            label={t('pricebylocationconfiguration:Use_system_value')}
                        />
                    </div>
                )
            }
        </>
    );
};

export default InputText;
