/* eslint-disable array-callback-return */
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { PRIMARY } from '@theme_color';

const useStyles = makeStyles(() => ({
    error: {
        '& .form-control': {
            borderColor: 'red !important',
            borderBottom: '2px solid',
        },
    },
    disabled: {
        '& :disabled': {
            color: 'rgba(0, 0, 0, 0.38)',
        },
    },
    root: {
        '& .react-tel-input .form-control': {
            '&:focus': {
                boxShadow: `0 0 0 1px ${PRIMARY}`,
                borderColor: PRIMARY,
            },
        },
    },
}));

const CustomPhoneInput = (props) => {
    const {
        disabled,
        prefix = '',
        containerClass,
        error = false,
        helperText = '',
        rootClasses,
        specialLabel = null,
        variant = 'outlined',
        name = 'telephone',
        inputProps = {},
        ...other
    } = props;
    const classes = useStyles();

    return (
        <FormControl error={error} classes={{ root: clsx(classes.root, rootClasses) }}>
            <PhoneInput
                disabled={disabled}
                country="id"
                placeholder="621234567890"
                enableSearch
                autoFormat={false}
                specialLabel={specialLabel}
                prefix={prefix}
                containerClass={clsx(containerClass, error && classes.error, disabled && classes.disabled)}
                inputProps={{
                    ...inputProps,
                    name,
                }}
                {...other}
            />
            {error && <FormHelperText variant={variant}>{helperText}</FormHelperText>}
        </FormControl>
    );
};

export default CustomPhoneInput;
