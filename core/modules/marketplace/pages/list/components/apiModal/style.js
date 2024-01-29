import { makeStyles } from '@material-ui/core/styles';
import {
    TEXT_COLOR, PRIMARY, GRAY_TITLE,
} from '@theme_color';

const font = '"Roboto", "Helvetica", "Arial", sans-serif';

const useStyles = makeStyles(() => ({
    dialogContainer: {
        padding: '25px 20px',
        borderRadius: 5,
        margin: '20px 0',
        boxShadow: '0px 3px 25px #00000066',
        overflowX: 'hidden',
        color: TEXT_COLOR,
    },
    dialogTitleRoot: {
        color: PRIMARY,
        '& .MuiTypography-root': {
            fontWeight: 'bold',
        },
    },
    content: {
        fontSize: 14,
        marginBottom: 20,
        '&.MuiDialogContent-root': {
            overflowY: 'visible',
        },
    },
    formControl: {
        width: '100%',
        marginBottom: 20,
        '& .MuiInputLabel-formControl': {
            textTransform: 'uppercase',
            color: GRAY_TITLE,
            fontSize: 16,
            '&::after': {
                content: "'*'",
                display: 'block',
                position: 'absolute',
                top: -9,
                right: -9,
                color: PRIMARY,
                fontSize: 20,
            },
        },
        '& .MuiSelect-select.MuiSelect-select': {
            fontSize: 14,
            fontFamily: font,
        },
        '&.disabled': {
            '& .MuiSelect-select.MuiSelect-select': {
                fontSize: 14,
                fontFamily: font,
                color: GRAY_TITLE,
            },
        },
    },
    fieldInput: {
        '& .MuiInputBase-input': {
            paddingTop: 20,
            width: '100%',
        },
        '& .MuiOutlinedInput-input:-webkit-autofill': {
            height: 0,
        },
    },
    formFieldButton: {
        paddingLeft: 20,
    },
}));

export default useStyles;
