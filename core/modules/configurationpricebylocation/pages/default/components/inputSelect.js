/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable max-len */
import React from 'react';
import Select from '@common_select';
import clsx from 'clsx';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import useStyles from '@modules/configurationpricebylocation/pages/default/components/style';

export const InputSelect = (props) => {
    const {
        formik,
        name,
        label,
        comment,
        options,
        error,
        canRestore = false,
        t,
    } = props;
    const classes = useStyles();

    return (
        <>
            <div className={classes.formField}>
                <div className={classes.divLabel}>
                    <span className={classes.label} style={{ marginTop: '8px' }}>{label}</span>
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
                    {comment && (<span className={clsx(classes.label, classes.comment)}>{comment}</span>)}
                </div>
                {
                    canRestore && (
                        <div className="hidden-mobile">
                            <FormControlLabel
                                control={<Checkbox name={`${name}.is_default`} checked={formik.values[name].is_default} onChange={formik.handleChange} />}
                                className={classes.controlLabel}
                                classes={{ root: classes.rootLabel }}
                                label={t('pricebylocationconfiguration:Use_system_value')}
                                style={{ marginTop: '12px' }}
                            />
                        </div>
                    )
                }
            </div>
            {
                canRestore && (
                    <div className={clsx(classes.formFieldMobile, 'hidden-desktop')}>
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

export default InputSelect;
