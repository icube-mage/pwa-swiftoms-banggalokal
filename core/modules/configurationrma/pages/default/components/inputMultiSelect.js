import React, { useEffect, useState } from 'react';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import useStyles from '@modules/configurationrma/pages/default/components/style';
import clsx from 'clsx';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const MultipleSelect = (props) => {
    const {
        formik,
        name,
        label,
        options,
        comment,
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
                <div className={classes.formField} style={{ marginTop: '18px' }}>
                    <div className={classes.divLabel}>
                        <span className={classes.label} style={{ marginTop: '-8px' }}>{label}</span>
                    </div>
                    <div className={classes.divField}>
                        <Select
                            multiple
                            value={Array.isArray(formik.values[name].value) ? formik.values[name].value : formik.values[name].value.split(',')}
                            name={name.value}
                            onChange={(event) => formik.setFieldValue(`${name}.value`, event.target.value)}
                            input={<Input />}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                            fullWidth
                            style={{ marginBottom: '16px' }}
                            disabled={formik.values[name].is_default}
                        >
                            {options.map((option, index) => (
                                <MenuItem key={index} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                        {comment && (<span className={clsx(classes.label, classes.comment)}>{comment}</span>)}
                    </div>
                    {
                        canRestore && (
                            <div className="hidden-mobile">
                                <FormControlLabel
                                    control={(
                                        <Checkbox
                                            name={`${name}.is_default`}
                                            checked={formik.values[name].is_default}
                                            onChange={formik.handleChange}
                                        />
                                    )}
                                    className={classes.controlLabel}
                                    classes={{ root: classes.rootLabel }}
                                    label={t('returnconfiguration:Use_system_value')}
                                />
                            </div>
                        )
                    }
                </div>
                {
                    canRestore && (
                        <div className={clsx(classes.formFieldMobile, 'hidden-desktop')}>
                            <FormControlLabel
                                control={(
                                    <Checkbox
                                        name={`${name}.is_default`}
                                        checked={formik.values[name].is_default}
                                        onChange={formik.handleChange}
                                    />
                                )}
                                className={classes.controlLabel}
                                classes={{ root: classes.rootLabel }}
                                label={t('returnconfiguration:Use_system_value')}
                            />
                        </div>
                    )
                }
            </>
        );
    }
    return null;
};

export default MultipleSelect;
