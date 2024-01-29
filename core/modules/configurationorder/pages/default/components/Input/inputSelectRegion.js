/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import useStyles from '@modules/configurationorder/pages/default/components/style';
import locationGqlService from '@modules/location/services/graphql';
import Select from '@common_select';

export const InputSelect = (props) => {
    const {
        formik,
        name,
        label,
        comment,
        error,
        canRestore = false,
        depends = null,
        t,
    } = props;
    const classes = useStyles();

    const [getCountry, getCountryRes] = locationGqlService.getCountry();
    const [displayComponent, setDisplayComponent] = useState(true);
    const [countryOptions, setCountryOptions] = React.useState([{ id: 0, name: '*' }]);

    useEffect(() => {
        if (depends !== null) {
            if (formik.values[depends.field[0].id.replaceAll('/', '_')].value !== depends.field[0].value) {
                setDisplayComponent(false);
            } else {
                setDisplayComponent(true);
            }
        }
    }, [formik]);

    React.useEffect(() => {
        if (formik.values.tax_defaults_country.value) {
            getCountry({
                variables: { id: formik.values.tax_defaults_country.value },
            });
        }
    }, [formik.values.tax_defaults_country.value]);

    React.useEffect(() => {
        if (getCountryRes.data?.country?.available_regions?.length) {
            setCountryOptions([{ id: 0, name: '*' }, ...getCountryRes.data?.country?.available_regions]);
        } else {
            setCountryOptions([{ id: 0, name: '*' }]);
        }

        if (!getCountryRes.loading && getCountryRes.called) {
            const isExist = getCountryRes.data?.country
                ?.available_regions?.find((region) => String(region?.id) === String(formik.values[name]?.value));
            if (!isExist) {
                formik.setFieldValue(`${name}.value`, '0');
            }
        }
    }, [getCountryRes.data]);

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
                            onChange={(e) => formik.setFieldValue(`${name}.value`, String(e.target.value))}
                            dataOptions={countryOptions}
                            error={error}
                            selectClasses={classes.fieldInput}
                            formControlClasses={classes.selectControl}
                            enableEmpty={false}
                            fullWidth
                            disabled={!formik.values.tax_defaults_country.value || formik.values[name].is_default}
                            valueToMap="id"
                            labelToMap="name"
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
                                    label={t('orderconfiguration:Use_system_value')}
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
                                label={t('orderconfiguration:Use_system_value')}
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
