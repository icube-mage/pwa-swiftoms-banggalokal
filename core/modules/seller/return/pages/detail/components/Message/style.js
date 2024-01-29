import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, PRIMARY_DARK, TABLE_GRAY, GRAY_LIGHT,
} from '@theme_color';

const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const useStyles = makeStyles((theme) => ({
    btnAction: {
        marginTop: 20,
        boxShadow: 'none',
        borderRadius: 6,
        padding: 6,
        width: 200,
        height: 42,
        background: 'transparent',
        border: `1px solid ${PRIMARY}`,
        color: PRIMARY,
        '&:hover': {
            background: 'transparent',
            border: `1px solid ${PRIMARY_DARK}`,
            color: PRIMARY_DARK,
            boxShadow: 'none',
        },
    },
    checkbox: {
        '&.MuiCheckbox-colorSecondary.Mui-checked': {
            color: PRIMARY,
        },
        '&.MuiCheckbox-root': {
            color: GRAY_LIGHT,
            borderRadius: 4,
        },
        '&.MuiIconButton-colorSecondary:hover': {
            backgroundColor: 'transparent',
        },
        '&.MuiCheckbox-colorSecondary.Mui-disabled': {
            color: GRAY_LIGHT,
        },
        '&.MuiButtonBase-root.Mui-disabled': {
            cursor: 'not-allowed',
            pointerEvents: 'auto',
        },
        '&.disabled': {
            '&.MuiCheckbox-root': {
                color: TABLE_GRAY,
            },
            '& .MuiIconButton-label': {
                backgroundColor: GRAY_LIGHT,
                borderRadius: 4,
            },
        },
        marginLeft: 0,
    },
    controlLabel: {
        '& .MuiFormControlLabel-label': {
            fontFamily: font,
            fontSize: 13,
            fontWeight: 'bold',
        },
        '& .MuiCheckbox-colorSecondary.Mui-checked': {
            color: PRIMARY,
        },
        '& .MuiCheckbox-root': {
            color: GRAY_LIGHT,
            borderRadius: 4,
        },
        '&.MuiFormControlLabel-root': {
            marginBottom: 0,
            color: PRIMARY_DARK,
        },
        '& .MuiSvgIcon-root': {
            height: 18,
            width: 18,
        },
    },
    textInput: {
        width: '100%',
        '&:hover': {
            '& .MuiInput-underline:before': {
                borderBottom: 'none',
            },
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottom: 'none',
        },
        '& .MuiInput-underline:before': {
            borderBottom: 'none',
        },
        '& .MuiInput-root': {
            border: `1px solid ${GRAY_LIGHT}`,
            backgroundColor: 'white',
            borderRadius: 6,
            padding: 10,
            fontSize: '0.875rem',

        },
        '& .MuiAutocomplete-inputRoot': {
            minHeight: 42,
            borderBottom: 'none',
            paddingTop: 10,
            paddingBottom: 10,
        },
        '& .MuiInput-underline.Mui-disabled:before': {
            borderBottomStyle: 'none',
        },
        '& .MuiInputBase-input::placeholder': {
            color: PRIMARY_DARK,
            fontSize: 13,
        },
        '&.MuiInputBase-input.Mui-disabled': {
            cursor: 'not-alowed',
        },
    },
    checkDiv: {
        display: 'flex',
        gap: 20,
        [theme.breakpoints.down('sm')]: {
            display: 'block',
        },
    },
    messageContent: {
        padding: '0 30px',
    },
    messageContainer: {
        paddingTop: 20,
    },
    message: {
        marginBottom: 20,
        paddingBottom: 10,
        borderBottom: `1px solid ${GRAY_LIGHT}`,
        '& .bold': {
            fontWeight: 'bold',
        },
        color: PRIMARY_DARK,
        '&.right': {
            textAlign: 'right',
        },
    },
}));

export default useStyles;
