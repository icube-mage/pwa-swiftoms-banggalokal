/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect, useState } from 'react';
import TextField from '@common_textfield';
import clsx from 'clsx';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import useStyles from '@modules/configurationwebstore/pages/default/components/style';

export const InputText = (props) => {
    const {
        formik,
        name,
        label,
        comment,
        error = !!(formik.touched[name]?.value && formik.errors[name]?.value),
        helperText = (formik.touched[name]?.value && formik.errors[name]?.value) || '',
        depends = null,
        canRestore = false,
        t,
    } = props;
    const classes = useStyles();
    const [displayComponent, setDisplayComponent] = useState(true);

    useEffect(() => {
        if (depends !== null) {
            if (formik.values[depends.field[0].id.replaceAll('/', '_')].value !== depends.field[0].value) {
                setDisplayComponent(false);
            } else {
                setDisplayComponent(true);
            }
        }
    }, [formik]);

    if (displayComponent) {
        return (
            <>
                <div className={classes.formField}>
                    <div className={classes.divLabel}>
                        <span className={classes.label}>{label}</span>
                    </div>
                    <div className={classes.divField}>
                        <TextField
                            className={clsx(classes.fieldRoot, 'fieldRoot')}
                            variant="outlined"
                            id={name}
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
                                    control={
                                        <Checkbox
                                            name={`${name}.is_default`}
                                            checked={formik.values[name].is_default}
                                            onChange={formik.handleChange}
                                        />
                                    }
                                    className={classes.controlLabel}
                                    classes={{ root: classes.rootLabel }}
                                    label={t('generalconfiguration:Use_system_value')}
                                />
                            </div>
                        )
                    }
                </div>
                {
                    canRestore && (
                        <div className={clsx(classes.formFieldMobile, 'hidden-desktop')}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name={`${name}.is_default`}
                                        checked={formik.values[name].is_default}
                                        onChange={formik.handleChange}
                                    />
                                }
                                className={classes.controlLabel}
                                classes={{ root: classes.rootLabel }}
                                label={t('generalconfiguration:Use_system_value')}
                            />
                        </div>
                    )
                }
            </>
        );
    }
    return null;
};

export default InputText;
