import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#536777';
const borderColor = '#DDE1EC';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '16px 0',
        borderRadius: 16,
    },
    btnBack: {
        display: 'inline-block',
        borderRadius: '10px 0px 0px 10px',
        minWidth: 'unset',
        height: 36,
        width: 36,
        marginBottom: 6,
        [theme.breakpoints.down('xs')]: {
            marginLeft: 18,
        },
    },
    titleTop: {
        fontSize: 24,
        color: colorPurple,
        fontFamily: font,
        display: 'inline-block',
    },
    formField: {
        padding: 0,
        paddingBottom: 16,
    },
    formFieldButton: {
        padding: '24px 29px 30px 22px',
        [theme.breakpoints.down('xs')]: {
            padding: '20px 0px',
        },
    },
    formFieldButtonRight: {
        display: 'flex',
        justifyContent: 'end',
    },
    btn: {
        borderRadius: '20px !important',
    },
    btnSecondary: {
        margin: '0px 10px !important',
        borderRadius: '20px !important',
        backgroundColor: `${borderColor} !important`,
        color: `${colorPurple} !important`,
        '&:hover': {
            backgroundColor: `${borderColor} !important`,
        },
    },
    divLabel: {
        width: 300,
        display: 'inline-block',
        [theme.breakpoints.down('xs')]: {
            width: 140,
        },
    },
    label: {
        color: colorText,
        fontFamily: font,
        position: 'relative',
    },
    labelRequired: {
        '&::after': {
            content: "'*'",
            display: 'block',
            position: 'absolute',
            top: -9,
            right: -9,
            color: colorPurple,
            fontSize: 20,
        },
    },
    content: {
        borderBottom: '3px solid #F5F7FB',
        padding: '10px 29px 12px 22px',
    },
    fieldRoot: {
        width: 'calc(100% - 300px)',
        verticalAlign: 'middle',
        [theme.breakpoints.down('xs')]: {
            width: 'calc(100% - 140px)',
        },
    },
    fieldInput: {
        border: '1px solid',
        borderColor: colorText,
        borderRadius: 20,
        height: 36,
    },
    table: {
        borderCollapse: 'collapse',
        width: '100%',
    },
    tr: {
        borderBottom: '1px solid',
        borderBottomColor: borderColor,
        verticalAlign: 'top',
    },
    th: {
        textAlign: 'left',
        padding: '5px 0',
    },
    td: {
        padding: '5px 0',
        fontFamily: font,
        [theme.breakpoints.down('xs')]: {
            textAlign: 'center',
        },
    },
    fieldQty: {
        '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            display: 'none',
        },
        '&[type=number]': {
            '-moz-appearance': 'textfield',
        },
        width: 40,
        height: 30,
        textAlign: 'center',
    },
    btnRemove: {
        cursor: 'pointer',
    },
    autocomplete: {
        '& .MuiTextField-root': {
            width: '50%',
        },
        [theme.breakpoints.down('md')]: {
            '& .MuiTextField-root': {
                width: '100%',
            },
            '& .MuiInputBase-root': {
                padding: '0px !important',
            },
            '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
                padding: 10,
            },
        },
    },
    autocompleteRoot: {
        width: 'calc(100% - 300px)',
        verticalAlign: 'middle',
        display: 'inline-flex',
        '& .MuiOutlinedInput-root': {
            borderColor: colorText,
            borderRadius: 20,
            border: '1px solid',
            height: 36,
            padding: '0 9px',
        },
        [theme.breakpoints.down('xs')]: {
            width: 'calc(100% - 140px)',
        },
    },
}));

export default useStyles;
