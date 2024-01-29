/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-duplicate-props */
import TextField from '@material-ui/core/TextField';
import { useTranslation } from '@i18n';

const CustomTextField = (props) => {
    const { t } = useTranslation('common');
    const {
        variant = 'standard',
        InputProps,
        inputProps,
        disabled,
        ...other
    } = props;
    return (
        <TextField
            disabled={disabled}
            variant={variant}
            InputProps={{
                ...InputProps,
                autoComplete: 'no-autocomplete',
            }}
            inputProps={{
                ...inputProps,
                autoComplete: 'no-autocomplete',
            }}
            {...other}
        />
    );
};

export default CustomTextField;
