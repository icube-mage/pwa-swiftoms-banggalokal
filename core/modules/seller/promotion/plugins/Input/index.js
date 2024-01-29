/* eslint-disable react/destructuring-assignment */
import clsx from 'clsx';
import classNames from 'classnames';

import TextField from '@common_textfield';
import Switch from '@common_switch';

import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';

import useStyles from '@sellermodules/promotion/plugins/Input/style';

const FormInput = (props) => {
    const {
        label = '', labelPosition = 'center', required = false, grid = 0, inputs = [], formik,
    } = props;
    const classes = useStyles();

    const numberReg = {
        integer: /[^\d]/g,
        float: /[^.\d]/g,
    };

    const renderComponent = (propsInput) => {
        const {
            multiline, inputType, rows = 5, disabled = false, name = '', type = 'string',
            adornText = 'Rp', placeholder = '',
        } = propsInput;
        switch (inputType) {
        case 'switch':
            return (
                <Switch
                    id={name}
                    name={name}
                    value={formik.values[name]}
                    onChange={formik.handleChange}
                    disabled={disabled}
                />
            );
        case 'date':
            if (name === 'from_date') {
                return (
                    <TextField
                        id={name}
                        name={name}
                        value={formik.values[name]}
                        onChange={(e) => formik.setFieldValue(name, e.target.value)}
                        className={classes.dateInput}
                        error={!!(formik.touched[name] && formik.errors[name])}
                        helperText={(formik.touched[name] && formik.errors[name]) || ''}
                        disabled={disabled}
                        placeholder={placeholder}
                        type={type}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onKeyDown={(e) => e.preventDefault()}
                    />
                );
            }
            return (
                <TextField
                    id={name}
                    name={name}
                    value={formik.values[name]}
                    onChange={(e) => formik.setFieldValue(name, e.target.value)}
                    className={classes.dateInput}
                    error={!!(formik.touched[name] && formik.errors[name])}
                    helperText={(formik.touched[name] && formik.errors[name]) || ''}
                    disabled={disabled}
                    placeholder={placeholder}
                    type={type}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        min: formik.values.from_date,
                    }}
                    onKeyDown={(e) => e.preventDefault()}
                />
            );
        case 'adornment':
            return (
                <TextField
                    id={name}
                    name={name}
                    value={formik.values[name]}
                    onChange={(e) => formik.setFieldValue(name, type !== 'string'
                        ? e.target.value.replace(numberReg[type], '') : e.target.value)}
                    className={clsx(classes.textInput, 'adorn')}
                    error={!!(formik.touched[name] && formik.errors[name])}
                    helperText={(formik.touched[name] && formik.errors[name]) || ''}
                    disabled={disabled}
                    placeholder={placeholder}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment className={classes.adornment} position="start">
                                {adornText}
                            </InputAdornment>
                        ),
                    }}
                />
            );
        default:
            return (
                <TextField
                    id={name}
                    name={name}
                    value={formik.values[name]}
                    type={type}
                    onChange={(e) => formik.setFieldValue(name, type !== 'string'
                        ? e.target.value.replace(numberReg[type], '') : e.target.value)}
                    className={classes.textInput}
                    error={!!(formik.touched[name] && formik.errors[name])}
                    helperText={(formik.touched[name] && formik.errors[name]) || ''}
                    multiline={multiline}
                    maxRows={rows}
                    minRows={rows}
                    disabled={disabled}
                    placeholder={placeholder}
                />
            );
        }
    };
    if (grid) {
        return (
            <div className={clsx(classes.formFieldsGrid, labelPosition, 'grid')}>
                <InputLabel htmlFor={props.name} className={classNames(classes.label, required && classes.required)}>
                    {label}
                </InputLabel>
                <Grid container spacing={3}>
                    {inputs.map((input) => (
                        <Grid item xs={12} sm={12 / grid}>
                            {renderComponent(input)}
                        </Grid>
                    ))}
                </Grid>
            </div>

        );
    }

    return (
        <div className={clsx(classes.formFieldsGrid, labelPosition)}>
            <InputLabel htmlFor={props.name} className={classNames(classes.label, required && classes.required)}>
                {label}
            </InputLabel>
            {renderComponent(props)}
        </div>
    );
};

export default FormInput;
