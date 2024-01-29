/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-case-declarations */
import clsx from 'clsx';
import classNames from 'classnames';

import TextField from '@common_textfield/index';
import Autocomplete from '@common_autocomplete/index';
import Switch from '@common_switch';

import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextEditor from '@common_texteditor';

import ImageUpload from '@sellermodules/catalog/plugins/ImageUpload/index';
import InputTree from '@sellermodules/catalog/plugins/InputTree/index';
import useStyles from '@sellermodules/catalog/plugins/Input/style';

const FormInput = (props) => {
    const {
        classNameContainer,
        classNameContent,
        classNameLabelContainer,
        label = '',
        labelHelper,
        labelPosition = 'center',
        required = false,
        grid = 0,
        inputs = [],
        formik,
        helper = null,
        inputRef = null,
        inputType: inputTypeParent,
        formGrid,
        useSwitchLabel,
        labelOptional,
        onSelectSearchChange,
        onSelectSearchCallback,
        setIsDirty,
        valueSpesificKey,
        labelStart,
        hint,
        currency,
        moreElement = '',
        gridSize = [],
    } = props;
    const classes = useStyles({ formGrid });
    const numberReg = {
        integer: /[^\d]/g,
        float: /[^.\d]/g,
    };

    const renderComponent = (propsInput) => {
        const {
            multiline,
            inputType,
            options = [],
            rows = 5,
            disabled = false,
            name = '',
            primaryKey = 'value',
            type = 'string',
            labelKey = 'label',
            getBase64 = () => { },
            formatFile = '.csv',
            startAdornment = true,
            adornText = 'Rp',
            endAdornment = false,
            endAdornmentComponent,
            placeholder = '',
            multiple,
            className,
            enableCounter,
            maxChar,
            textHelp,
            onBlur = true,
            disableClearable = false,
        } = propsInput;
        switch (inputType) {
        case 'select':
            let value = null;
            if (formik.values[name]) {
                value = valueSpesificKey ? { [valueSpesificKey]: formik.values[name] } : formik.values[name];
            }
            return (
                <Autocomplete
                    className="input-autocomplete"
                    id={name}
                    name={name}
                    value={value}
                    onChange={(e) => {
                        let setValue = null;
                        if (e) {
                            setValue = valueSpesificKey ? e[valueSpesificKey] : e;
                        }
                        formik.setFieldValue(name, setValue);
                    }}
                    options={options}
                    primaryKey={primaryKey}
                    labelKey={labelKey}
                    fullWidth
                    error={!!(formik.touched[name] && formik.errors[name])}
                    helperText={(formik.touched[name] && formik.errors[name]) || ''}
                    disabled={disabled}
                    multiple={multiple}
                    disableClearable={disableClearable}
                    renderInput={(params) => (
                        <TextField
                            value={value}
                            placeholder={placeholder}
                            className={clsx(classes.textInput, className)}
                            error={!!(formik.touched[name] && formik.errors[name])}
                            helperText={(formik.touched[name] && formik.errors[name]) || ''}
                            inputRef={inputRef}
                            onChange={() => {
                                if (setIsDirty) setIsDirty(true);
                            }}
                            {...params}
                        />
                    )}
                />
            );

        case 'select-search':
            return (
                <>
                    <Autocomplete
                        className="input-autocomplete"
                        id={name}
                        name={name}
                        value={formik.values[name]}
                        onChange={(e) => {
                            formik.setFieldValue(name, e);
                            onSelectSearchCallback({ e, name });
                        }}
                        options={options}
                        primaryKey={primaryKey}
                        labelKey={labelKey}
                        fullWidth
                        error={!!formik.errors[name]}
                        helperText={formik.errors[name] || ''}
                        disabled={disabled}
                        multiple={multiple}
                        renderInput={(params) => (
                            <TextField
                                value={formik.values[name]}
                                placeholder={placeholder}
                                className={clsx(classes.textInput, className)}
                                error={!!formik.errors[name]}
                                helperText={formik.errors[name] || ''}
                                inputRef={inputRef}
                                onChange={(e) => {
                                    onSelectSearchChange({ e, name });
                                    if (setIsDirty) setIsDirty(true);
                                }}
                                {...params}
                            />
                        )}
                    />
                    <p style={{ color: '#adadad', fontSize: 13, marginTop: 5 }}>
                        <i>{hint}</i>
                    </p>
                </>
            );
        case 'input-tree':
            /** pastikan format treeData
                     * {
                     * key  -> unique-nya
                     * name -> label-nya
                     * value -> hanya di-child terakhir
                     * tree -> urutan tree-nya (pertama dimulai 0)
                     * children -> array objek recursive-nya
                     * }
                     */
            return (
                <>
                    <InputTree {...props} />
                </>
            );
        case 'switch':
            return (
                <Switch
                    useLabel={useSwitchLabel}
                    className={clsx(className)}
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
                    className={clsx(className)}
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
                    onChange={(e) => {
                        formik.setFieldValue(name, type !== 'string' ? e.target.value.replace(numberReg[type], '') : e.target.value);
                        if (setIsDirty) setIsDirty(true);
                    }}
                    onBlur={(e) => {
                        if (onBlur === true) {
                            let val = e.target.value;
                            if (type !== 'string' && val) {
                                val = val.replace(numberReg[type], '');
                                val = parseFloat(val);
                                if (val % 1 === 0) {
                                    formik.setFieldValue(name, parseInt(val, 8));
                                }
                            }
                            formik.setFieldValue(name, val);
                        }
                    }}
                    className={clsx(classes.textInput, 'adorn', className)}
                    error={!!(formik.touched[name] && formik.errors[name])}
                    helperText={(formik.touched[name] && formik.errors[name]) || ''}
                    disabled={disabled}
                    placeholder={placeholder}
                    inputRef={inputRef}
                    InputProps={{
                        endAdornment: endAdornment && endAdornmentComponent,
                        startAdornment: startAdornment && (
                            <InputAdornment className={classes.adornment} position="start">
                                {adornText}
                            </InputAdornment>
                        ),
                    }}
                />
            );
        case 'price':
            return (
                <TextField
                    id={name}
                    name={name}
                    value={formik.values[name]}
                    onChange={(e) => {
                        formik.setFieldValue(name, new Intl.NumberFormat('en-US').format(e.target.value.replace(/[^0-9]/g, '')));
                        if (setIsDirty) setIsDirty(true);
                    }}
                    onBlur={(e) => {
                        if (onBlur === true) {
                            let val = e.target.value;
                            if (type !== 'string' && val) {
                                val = val.replace(numberReg[type], '');
                                val = parseFloat(val);
                                if (val % 1 === 0) {
                                    formik.setFieldValue(name, parseInt(val, 8));
                                }
                            }
                            formik.setFieldValue(name, val);
                        }
                    }}
                    className={clsx(classes.textInput, 'adorn', className)}
                    error={!!(formik.touched[name] && formik.errors[name])}
                    helperText={(formik.touched[name] && formik.errors[name]) || ''}
                    disabled={disabled}
                    placeholder={placeholder}
                    inputRef={inputRef}
                    InputProps={{
                        endAdornment: endAdornment && endAdornmentComponent,
                        startAdornment: startAdornment && (
                            <InputAdornment className={classes.adornment} position="start">
                                {currency}
                            </InputAdornment>
                        ),
                    }}
                />
            );
        case 'description':
            return (
                <TextEditor
                    id={name}
                    className={clsx(classes.textInput, className)}
                    name={name}
                    value={formik.values[name]}
                    onChange={(e) => formik.setFieldValue(name, e)}
                />
            );
        default:
            return (
                <TextField
                    id={name}
                    name={name}
                    value={formik.values[name]}
                    onChange={(e) => {
                        formik.setFieldValue(name, type !== 'string' ? e.target.value.replace(numberReg[type], '') : e.target.value);
                        if (setIsDirty) setIsDirty(true);
                    }}
                    onBlur={(e) => {
                        if (onBlur === true) {
                            let val = e.target.value;
                            if (type !== 'string' && val) {
                                val = val.replace(numberReg[type], '');
                                val = parseFloat(val);
                                if (val % 1 === 0) {
                                    formik.setFieldValue(name, parseInt(val, 8));
                                }
                            }
                            formik.setFieldValue(name, val);
                        }
                    }}
                    inputProps={{ maxLength: maxChar }}
                    className={clsx(classes.textInput, className)}
                    error={!!(formik.touched[name] && formik.errors[name])}
                    helperText={(
                        <Box component="span" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            {enableCounter && <span>{`${textHelp}`}</span>}
                            <span>{(formik.touched[name] && formik.errors[name]) || ''}</span>
                            {enableCounter && <span>{`${String(formik.values[name]).length} / ${maxChar}`}</span>}
                        </Box>
                    )}
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
            <div className={clsx(classes.formFieldsGrid, labelPosition, 'grid', classNameContainer)}>
                <InputLabel htmlFor={props.name} className={classNames(classes.label, required && classes.required)}>
                    {label}
                </InputLabel>
                <Grid container spacing={3}>
                    {inputs.map((input, i) => (
                        <Grid item xs={12} sm={gridSize?.length ? gridSize[i] : 12 / grid} key={i}>
                            {renderComponent(input)}
                            {moreElement}
                        </Grid>
                    ))}
                </Grid>
            </div>
        );
    }
    return (
        <div className={clsx(classNameContainer, classes.formFieldsGrid, labelPosition, inputTypeParent, labelStart && classes.formFieldsGridStart)}>
            <div className={classNames('form-label-container', classNameLabelContainer)}>
                <InputLabel htmlFor={props.name} className={classNames('form-label', classes.label, required && classes.required)}>
                    {label}
                    {labelOptional && (
                        <span className="optional-label">
                            (
                            {labelOptional}
                            )
                        </span>
                    )}
                </InputLabel>
                {labelHelper}
            </div>
            <div className={classNames('form-content', classNameContent)}>
                {renderComponent(props)}
                {!!helper && <div className={classNames(classes.helper, 'form-content-helper')}>{helper}</div>}
                {moreElement}
            </div>
        </div>
    );
};

export default FormInput;
