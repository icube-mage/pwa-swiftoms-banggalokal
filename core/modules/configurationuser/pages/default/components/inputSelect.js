/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect, useState } from 'react';
import Select from '@common_select';
import clsx from 'clsx';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import useStyles from '@modules/configurationuser/pages/default/components/style';

export const InputSelect = (props) => {
    const {
        formik,
        name,
        label,
        comment,
        options,
        error,
        canRestore = false,
        depends = null,
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
                <div className={classes.formField} style={{ marginTop: '8px' }}>
                    <div className={classes.divLabel}>
                        <span className={classes.label}>{label}</span>
                    </div>
                    <div className={classes.divField}>
                        <Select
                            name={`${name}.value`}
                            value={formik.values[name].value}
                            onChange={formik.handleChange}
                            dataOptions={options}
                            error={error}
                            selectClasses={classes.fieldInput}
                            formControlClasses={classes.selectControl}
                            enableEmpty={false}
                            fullWidth
                            disabled={formik.values[name].is_default}
                        />
                        {comment && (<span className={clsx(classes.label, classes.comment)} style={{ marginTop: '0' }}>{comment}</span>)}
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
                                    label={t('userconfiguration:Use_system_value')}
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
                                label={t('userconfiguration:Use_system_value')}
                            />
                        </div>
                    )
                }
            </>
        );
    }
    return null;
};

export default InputSelect;
