/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect, useState } from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import useStyles from '@modules/configurationorder/pages/default/components/style';
import clsx from 'clsx';

export const InputTable = (props) => {
    const {
        formik,
        name,
        label,
        comment,
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
                <div className={classes.formField} style={{ marginTop: '18px' }}>
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
                                    <th style={{ width: 'auto' }}>{t('orderconfiguration:Action')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formik.values[name].value?.length > 0
                                    && formik.values[name].value?.map((row, idx) => (
                                        <tr key={`${name}.value[${idx}]`}>
                                            {formik.values[name].form_fields?.map((col) => (
                                                <td key={idx}>
                                                    <TextField
                                                        variant="outlined"
                                                        name={`${name}.value[${idx}][${col.id}]`}
                                                        value={row[`${col.id}`]}
                                                        InputProps={{
                                                            className: classes.tableInput,
                                                        }}
                                                        onChange={formik.handleChange}
                                                    />
                                                </td>
                                            ))}
                                            <td>
                                                <img
                                                    src="/assets/img/trash.svg"
                                                    alt={t('orderconfiguration:Delete')}
                                                    style={{
                                                        height: 15, width: 'auto', cursor: 'pointer',
                                                    }}
                                                    onClick={() => {
                                                        const newValue = [...formik.values[name].value];
                                                        newValue.splice(idx, 1);
                                                        formik.setFieldValue(`${name}.value`, newValue);
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
                                                formik.values[name].form_fields?.reduce((acc, col) => ({ ...acc, [col?.id]: '' }), {}),
                                            ])}
                                            variant="contained"
                                        >
                                            {t('orderconfiguration:Add')}
                                        </Button>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                        {comment && (<span className={clsx(classes.label, classes.comment)}>{comment}</span>)}
                    </div>
                </div>
            </>
        );
    }
    return null;
};

export default InputTable;
