/* eslint-disable react/destructuring-assignment */
import clsx from 'clsx';
import classNames from 'classnames';

import TextField from '@common_textfield';
import Autocomplete from '@common_autocomplete';
import Switch from '@common_switch';

import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';

import ImageUpload from '@sellermodules/catalog/plugins/ImageUpload';
import useStyles from '@sellermodules/catalog/plugins/Input/style';

const FormInput = (props) => {
    const {
        label = '', labelPosition = 'center', required = false, grid = 0, inputs = [], formik, helper = null, inputRef = null,
        inputType: inputTypeParent,
    } = props;
    const classes = useStyles();
    const numberReg = {
        integer: /[^\d]/g,
        float: /[^.\d]/g,
    };

    const renderComponent = (propsInput) => {
        const {
            multiline, inputType, options = [], rows = 5, disabled = false, name = '', primaryKey = 'value', type = 'string',
            labelKey = 'label', getBase64 = () => { }, formatFile = '.csv', adornText = 'Rp', placeholder = '', multiple,
        } = propsInput;
        switch (inputType) {
        case 'select':
            return (
                <Autocomplete
                    id={name}
                    name={name}
                    value={formik.values[name]}
                    onChange={(e) => formik.setFieldValue(name, e)}
                    options={options}
                    primaryKey={primaryKey}
                    labelKey={labelKey}
                    fullWidth
                    error={!!(formik.touched[name] && formik.errors[name])}
                    helperText={(formik.touched[name] && formik.errors[name]) || ''}
                    disabled={disabled}
                    multiple={multiple}
                    renderInput={(params) => (
                        <TextField
                            value={formik.values[name]}
                            placeholder={placeholder}
                            className={classes.textInput}
                            error={!!(formik.touched[name] && formik.errors[name])}
                            helperText={(formik.touched[name] && formik.errors[name]) || ''}
                            inputRef={inputRef}
                            {...params}
                        />
                    )}
                />
            );
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
        case 'image':
            return (
                <ImageUpload
                    name={name}
                    formik={formik}
                    error={!!(formik.touched[name] && formik.errors[name])}
                    helperText={(formik.touched[name] && formik.errors[name]) || ''}
                    getBase64={getBase64}
                    formatFile={formatFile}
                    {...props}
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
                    inputRef={inputRef}
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
                    onChange={(e) => formik.setFieldValue(name, type !== 'string'
                        ? e.target.value.replace(numberReg[type], '') : e.target.value)}
                    className={classes.textInput}
                    error={!!(formik.touched[name] && formik.errors[name])}
                    helperText={(formik.touched[name] && formik.errors[name]) || ''}
                    multiline={multiline}
                    minRows={rows}
                    maxRows={rows}
                    disabled={disabled}
                    placeholder={placeholder}
                    inputRef={inputRef}
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
                    {inputs.map((input, i) => (
                        <Grid item xs={12} sm={12 / grid} key={i}>
                            {renderComponent(input)}
                        </Grid>
                    ))}
                </Grid>
            </div>

        );
    }
    return (
        <div className={clsx(classes.formFieldsGrid, labelPosition, inputTypeParent)}>
            <InputLabel htmlFor={props.name} className={classNames(classes.label, required && classes.required)}>
                {label}
            </InputLabel>
            <div>
                {renderComponent(props)}
                {!!helper
                    && (
                        <div className={classes.helper}>
                            {helper}
                        </div>
                    )}
            </div>
        </div>
    );
};

export default FormInput;
