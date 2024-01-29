import { makeStyles } from '@material-ui/core/styles';

const titleFont = 'normal normal bold 22px/22px "Roboto", "Helvetica", "Arial", sans-serif';
const colorPurple = '#BE1F93';
const textFont = 'normal normal normal 14px/17px "Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#536777';

const useStyles = makeStyles((theme) => ({
    paper: {
        borderRadius: 16,
    },
    textTitle: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: '24px 24px 10px 24px',
        color: colorPurple,
        textAlign: 'center',
        font: titleFont,
    },
    textTitleChild: {
        font: textFont,
        margin: 0,
        marginTop: 8,
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        },
    },
    contentCounter: {
        margin: '20px auto',
        overflow: 'hidden',
        width: '100%',
        fontSize: '24px',
    },
    counterNumber: {
        fontSize: '24px',
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        [theme.breakpoints.down('xs')]: {
            fontSize: '18px',
        },
    },
    btn: {
        borderRadius: 20,
        boxShadow: 'none',
        border: '1px solid',
        borderColor: colorPurple,
        letterSpacing: 0,
        textTransform: 'capitalize',
        padding: '5px 25px',
        '&.print': {
            background: '#FFFFFF',
            color: colorPurple,
        },
        '&.Mui-disabled': {
            borderColor: 'rgba(0, 0, 0, 0.12)',
        },
        '&.noMargin': {
            marginTop: 0,
        },
        height: 40,
        width: 100,
    },
    textFooter: {
        font: textFont,
        textDecoration: 'underline',
        color: colorPurple,
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        margin: 12,
    },
    fieldRoot: {
        width: '100%',
        verticalAlign: 'middle',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },
    fieldInput: {
        border: '1px solid',
        borderColor: colorText,
        borderRadius: 20,
        height: 36,
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formField: {
        margin: '7px 0px',
    },
    autocompleteRoot: {
        width: '100%',
        display: 'inline-flex',
        '& .MuiOutlinedInput-root': {
            borderColor: colorText,
            borderRadius: 20,
            border: '1px solid',
            height: 36,
            padding: '0 9px',
        },
        margin: '10px auto',

        '& .MuiInputBase-input': {
            padding: '8.5px 14px',
            width: '50%',
        },
        borderRadius: 20,
    },
    btnClear: {
        cursor: 'pointer',
        outline: 'none',
        background: 'none',
        border: 'none',
        font: titleFont,
    },
    fieldQty: {
        '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            display: 'none',
        },
        '&[type=number]': {
            '-moz-appearance': 'textfield',
        },
        verticalAlign: 'middle',
        display: 'inline-flex',
        width: '100%',
        height: 36,
        textAlign: 'center',
        borderRadius: 20,
        padding: '0px 5px',
        border: '1px solid',
        borderColor: colorText,
        margin: '10px auto',
    },
    label: {
        font: textFont,
        fontSize: '16px',
        fontWeight: 'bold',
        padding: '0px 10px',
    },
    inputProductContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        paddingRight: '10px',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            paddingRight: '0px',
        },
    },
}));

export default useStyles;
