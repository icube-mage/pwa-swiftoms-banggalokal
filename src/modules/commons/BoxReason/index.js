import React from 'react';
import Autocomplete from '@common_autocomplete';
import TextField from '@common_textfield';
import Button from '@common_button/index';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY_DARK, BORDER_COLOR, WHITE, PRIMARY,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    labelInput: {
        fontWeight: 'bold',
        fontSize: 15,
        position: 'relative',
        width: 'fit-content',
        marginTop: 30,
        marginBottom: 10,
        '&::after': {
            content: "'*'",
            display: 'block',
            position: 'absolute',
            top: 0,
            right: -9,
            color: PRIMARY,
            fontSize: 14,
        },
    },
    textInput: {
        width: '100%',
        marginBottom: 30,
        '& .MuiInput-underline:before': {
            borderBottom: `1px solid ${BORDER_COLOR}`,
        },
        '&:hover': {
            '& .MuiInput-underline:before': {
                borderBottom: `1px solid ${BORDER_COLOR}`,
            },
        },
        '& .MuiInput-root': {
            backgroundColor: WHITE,
            borderRadius: 4,
            padding: '2px 10px',
            border: `1px solid ${BORDER_COLOR}`,
            width: '100%',
        },
        '& .MuiInputBase-input::placeholder': {
            color: PRIMARY_DARK,
            fontSize: 13,
        },
        '& .MuiAutocomplete-inputRoot': {
            height: 38,
            backgroundColor: WHITE,
            borderBottom: 'none',
        },
    },
    rootButton: {
        width: 200,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
        height: 42,
    },
}));

const BoxReason = ({
    t,
    inputData,
    onCallbackReason,
}) => {
    const classes = useStyles();

    const input_type = inputData?.input_type;
    const input_options = inputData?.options || [];
    const IS_OPTIONS = input_type?.toLowerCase() === 'options';

    const formik = useFormik({
        initialValues: {
            reason: IS_OPTIONS ? null : '',
        },
        validationSchema: Yup.object().shape({
            // form-information
            reason: Yup.string()
                .typeError(t('sellercatalog:This_is_a_Required_field'))
                .required(t('sellercatalog:This_is_a_Required_field'))
                .max(1000, t('sellerstock:Maximum_value_is_max', { max: 1000 })),
        }),
        onSubmit: (values) => {
            onCallbackReason(values);
        },
    });

    if (!inputData) return <div>{t('common:Data not found!')}</div>;
    if (IS_OPTIONS) {
        return (
            <div className="box-reason-options">
                <div className={classes.labelInput}>
                    {t('common:Choose_Reason')}
                </div>
                <Autocomplete
                    name="reason"
                    variant="standard"
                    className={classes.textInput}
                    value={formik.values.reason}
                    onChange={(e) => formik.setFieldValue('reason', e)}
                    options={input_options}
                    primaryKey="label"
                    labelKey="label"
                    error={!!(formik.touched.reason && formik.errors.reason)}
                    helperText={(formik.touched.reason && formik.errors.reason) || ''}
                />
                <Button
                    classes={{ root: classes.rootButton }}
                    onClick={formik.handleSubmit}
                >
                    {t('common:Submit')}
                </Button>
            </div>
        );
    }
    return (
        <div className="box-reason-input">
            <div className={classes.labelInput}>
                {t('common:Choose_Reason')}
            </div>
            <TextField
                name="reason"
                variant="standard"
                className={classes.textInput}
                value={formik.values.reason}
                onChange={(e) => formik.setFieldValue('reason', e)}
                error={!!(formik.touched.reason && formik.errors.reason)}
                helperText={(formik.touched.reason && formik.errors.reason) || ''}
                multiline
                minRows={10}
                maxRows={10}
            />
            <Button
                classes={{ root: classes.rootButton }}
                onClick={formik.handleSubmit}
            >
                {t('common:Submit')}
            </Button>
        </div>
    );
};

export default BoxReason;
