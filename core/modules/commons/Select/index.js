import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import useStyles from '@modules/commons/Select/style';
import { useTranslation } from '@i18n';

const CustomTextField = (props) => {
    const { t } = useTranslation('common');
    const {
        variant = 'outlined',
        value,
        onChange = () => {},
        inputProps,
        disabled,
        dataOptions = [],
        enableEmpty = true,
        emptyText = t('common:Please_Select'),
        formControlClasses = null,
        selectClasses = null,
        rootClasses = null,
        valueToMap = 'value',
        labelToMap = 'label',
        error = false,
        errorMessage = t('common:This_is_a_Required_field'),
        fullWidth = false,
        loading = false,
        multiple = false,
        ...other
    } = props;
    const classes = useStyles();
    return (
        <FormControl
            variant={variant}
            className={formControlClasses || (fullWidth ? classes.formControlFullWidth : classes.formControl)}
            error={error}
        >
            <Select
                native
                className={selectClasses || classes.select}
                classes={{ root: rootClasses || classes.root }}
                value={value}
                onChange={onChange}
                inputProps={inputProps}
                disabled={disabled || loading}
                multiple={multiple}
                {...other}
            >
                {loading ? (
                    <option aria-label="None" value="">
                        Loading...
                    </option>
                ) : (
                    <>
                        {dataOptions?.length === 0 && multiple ? (
                            <option aria-label="None" value="" className="placeholder">
                                {emptyText}
                            </option>
                        ) : null}
                        {enableEmpty && !multiple && (
                            <option aria-label="None" value="" className="placeholder">
                                {emptyText}
                            </option>
                        )}
                        {dataOptions?.map((option, idx) => (
                            <option key={idx} value={option[valueToMap]}>
                                {option[labelToMap]}
                            </option>
                        ))}
                    </>
                )}
            </Select>
            {error && <FormHelperText>{errorMessage}</FormHelperText>}
        </FormControl>
    );
};

export default CustomTextField;
