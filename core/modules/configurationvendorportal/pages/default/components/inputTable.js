/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect, useState } from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import Select from '@common_select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import useStyles from '@modules/configurationvendorportal/pages/default/components/style';
import clsx from 'clsx';

export const InputTable = (props) => {
    const {
        formik,
        name,
        label,
        comment,
        depends = null,
        error = null,
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
                <div className={clsx(classes.formField, 'field-child')} style={{ marginTop: '18px' }}>
                    <div className={classes.divLabel}>
                        <span className={classes.label}>{label}</span>
                    </div>
                    <div>
                        <table className={classes.table}>
                            <thead>
                                <tr>
                                    {formik.values[name].form_fields?.map((col, idx) => (
                                        <th key={idx}>{col?.label}</th>
                                    ))}
                                    <th style={{ width: 'auto' }}>{t('vendorconfiguration:Action')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formik.values[name].value?.length > 0
                                    && formik.values[name].value?.map((row, idx) => (
                                        <tr key={`${name}.value[${idx}]`}>
                                            {formik.values[name].form_fields?.map((col) => {
                                                return (
                                                    <td key={idx}>
                                                        {col.type === 'select' ? (
                                                            <Select
                                                                name={`${name}.value[${idx}][${col.id}]`}
                                                                value={row[`${col.id}`]}
                                                                onChange={formik.handleChange}
                                                                dataOptions={col.options}
                                                                error={error}
                                                                selectClasses={clsx(classes.fieldInput, 'field-select')}
                                                                formControlClasses={classes.selectControl}
                                                                enableEmpty={false}
                                                                fullWidth
                                                                disabled={formik.values[name].is_default}
                                                            />
                                                        ) : (
                                                            <TextField
                                                                variant="outlined"
                                                                name={`${name}.value[${idx}][${col.id}]`}
                                                                value={row[`${col.id}`]}
                                                                InputProps={{
                                                                    className: classes.tableInput,
                                                                }}
                                                                onChange={formik.handleChange}
                                                                disabled={formik.values[name].is_default}
                                                            />
                                                        )}
                                                    </td>
                                                );
                                            })}
                                            <td>
                                                <img
                                                    src="/assets/img/trash.svg"
                                                    alt={t('vendorconfiguration:Delete')}
                                                    style={{
                                                        height: 15,
                                                        width: 'auto',
                                                        cursor: formik.values[name].is_default ? 'unset' : 'pointer',
                                                        filter: formik.values[name].is_default ? 'invert(83%) sepia(4%) saturate(8%) hue-rotate(340deg) brightness(98%) contrast(86%)' : 'unset',
                                                    }}
                                                    onClick={() => {
                                                        if (!formik.values[name].is_default) {
                                                            const newValue = [...formik.values[name].value];
                                                            newValue.splice(idx, 1);
                                                            formik.setFieldValue(`${name}.value`, newValue);
                                                        }
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="3">
                                        <Button
                                            className={classes.btn}
                                            onClick={() => formik.setFieldValue(`${name}.value`, [
                                                ...formik.values[name].value,
                                                formik.values[name].form_fields?.reduce((acc, col) => (
                                                    { ...acc, [col?.id]: col.type === 'select' && col.options?.length ? col.options?.[0]?.value : '' }
                                                ), {}),
                                            ])}
                                            variant="contained"
                                            disabled={formik.values[name].is_default}
                                        >
                                            {t('vendorconfiguration:Add')}
                                        </Button>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
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
                                    label={t('vendorconfiguration:Use_system_value')}
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
                                label={t('vendorconfiguration:Use_system_value')}
                            />
                        </div>
                    )
                }
            </>
        );
    }
    return null;
};

export default InputTable;
